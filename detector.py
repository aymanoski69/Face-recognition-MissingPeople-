import cv2
import numpy as np
import os

faceDetect = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("trainer/trainingData.yml")

font = cv2.FONT_HERSHEY_SIMPLEX
name_mapping = {
    1: "lambarki",
    2: "ait_hsain",
    25: "hamza",
    77: "bassa",
    44: "younes",
    299: "sbe3",
    10: "lghari9",
    17153842687 :"barbara",
    6:"houdayfa",
}
CONFIDENCE_THRESHOLD = 60  # Adjust based on testing to avoid false positives

choice = input("Enter '1' to use webcam or '2' to upload an image: ")

if choice == '1':
    # Webcam
    cam = cv2.VideoCapture(0)

    while True:
        ret, img = cam.read()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = faceDetect.detectMultiScale(gray, 1.1, 8)
        for (x, y, w, h) in faces:
            cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
            id, conf = recognizer.predict(gray[y:y + h, x:x + w])

            # Determine name based on ID and confidence level
            name = name_mapping.get(id, "Unknown")
            if conf > CONFIDENCE_THRESHOLD:
                name = "Unknown"

            cv2.putText(img, name, (x, y + h), font, 1, (0, 0, 255), 2)

        # Resize the image for display if it's too large
        display_img = cv2.resize(img, (800, int(img.shape[0] * 800 / img.shape[1]))) if img.shape[1] > 800 else img
        cv2.imshow("Face", display_img)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cam.release()

elif choice == '2':
    # Image Upload
    image_path = input("Enter the path to the image file: ")

    # Check if file exists
    if not os.path.exists(image_path):
        print("Image file not found.")
    else:
        img = cv2.imread(image_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = faceDetect.detectMultiScale(gray, 1.1, 8)
        for (x, y, w, h) in faces:
            cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
            id, conf = recognizer.predict(gray[y:y + h, x:x + w])

            # Determine name based on ID and confidence level
            name = name_mapping.get(id, "Unknown")
            if conf > CONFIDENCE_THRESHOLD:
                name = "Unknown"

            cv2.putText(img, name, (x, y + h), font, 1, (0, 0, 255), 2)

        # Resize the image for display if it's too large
        display_img = cv2.resize(img, (800, int(img.shape[0] * 800 / img.shape[1]))) if img.shape[1] > 800 else img
        cv2.imshow("Face", display_img)
        cv2.waitKey(0)

cv2.destroyAllWindows()
