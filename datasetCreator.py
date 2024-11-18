import cv2
import os


detector = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')


Id = input('Enter Your ID: ')
method = input("Enter '1' to use webcam or '2' to upload images: ")

sampleNum = 0
output_dir = "dataSet"


if not os.path.exists(output_dir):
    os.makedirs(output_dir)
#webcam
if method == '1':

    cam = cv2.VideoCapture(0)

    while True:
        ret, img = cam.read()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = detector.detectMultiScale(gray, 1.1, 8)
        for (x, y, w, h) in faces:
            sampleNum += 1
            cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
            # Save captured image to dataSet folder
            cv2.imwrite(f"{output_dir}/User.{Id}.{sampleNum}.jpg", gray[y:y + h, x:x + w])
            cv2.imshow('Face', img)

        if cv2.waitKey(100) & 0xFF == ord('q'):
            break
        elif sampleNum >=50:
            break

    cam.release()
    cv2.destroyAllWindows()
#image path
elif method == '2':

    while True:
        image_path = input("Enter the path to the image file (or type 'done' to finish): ")
        if image_path.lower() == 'done':
            break
        if not os.path.exists(image_path):
            print("File not found, please try again.")
            continue

        img = cv2.imread(image_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = detector.detectMultiScale(gray, 1.3, 5)
        for (x, y, w, h) in faces:
            sampleNum += 1

            cv2.imwrite(f"{output_dir}/User.{Id}.{sampleNum}.jpg", gray[y:y + h, x:x + w])
            cv2.imshow('Face', gray[y:y + h, x:x + w])
            cv2.waitKey(100)

        print(f"Image {image_path} processed.")

    cv2.destroyAllWindows()

print("Dataset creation complete.")
