from flask import Flask, request, jsonify, Response
import cv2
import numpy as np
import os

app = Flask(__name__)

# Face detection and recognition setup
faceDetect = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("trainer/trainingData.yml")

name_mapping = {
    1: "lambarki",
    2: "ait_hsain",
    25: "hamza",
    77: "bassa",
    44: "younes",
    299: "sbe3",
    10: "lghari9",
    17153842687: "barbara",
    6: "houdayfa",
}
CONFIDENCE_THRESHOLD = 60

# Webcam feed for real-time detection
def generate_frames():
    cam = cv2.VideoCapture(0)
    while True:
        ret, frame = cam.read()
        if not ret:
            break
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = faceDetect.detectMultiScale(gray, 1.1, 8)

        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
            id, conf = recognizer.predict(gray[y:y + h, x:x + w])

            name = name_mapping.get(id, "Unknown")
            if conf > CONFIDENCE_THRESHOLD:
                name = "Unknown"

            cv2.putText(frame, name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cam.release()

@app.route('/webcam')
def webcam_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# Endpoint for image upload
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    npimg = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = faceDetect.detectMultiScale(gray, 1.1, 8)

    results = []
    for (x, y, w, h) in faces:
        id, conf = recognizer.predict(gray[y:y + h, x:x + w])
        name = name_mapping.get(id, "Unknown")
        if conf > CONFIDENCE_THRESHOLD:
            name = "Unknown"
        results.append({'name': name, 'confidence': conf})

    return jsonify({'faces': results})

if __name__ == '__main__':
    app.run(debug=True)
