import sys
import os
import cv2
import numpy as np
from PyQt5.QtWidgets import ( 
    QApplication, QMainWindow, QPushButton, QVBoxLayout, QFileDialog, QWidget, QInputDialog, QLabel, QMessageBox
)


HAAR_CASCADE_FILE = "haarcascade_frontalface_default.xml"
TRAINER_FILE = "trainer/trainingData.yml"
DATASET_DIR = "dataSet"
TRAINER_DIR = "trainer"


name_mapping = {
    1: "lambarki",
    2: "ait_hsain",
    25: "hamza",
    77: "bassa",
    44: "younes",
    299: "sbe3",
    10: "lghari9",
    6: "houdayfa",
    17153842687:"Hmed_TbouGuissa",
}

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Face Recognition System")
        self.setGeometry(100, 100, 600, 400)

        # Buttons
        self.dataset_button = QPushButton("Create Dataset", self)
        self.train_button = QPushButton("Train Recognizer", self)
        self.detect_button = QPushButton("Detect Faces", self)
        self.quit_button = QPushButton("Close Webcam", self)

        # Button Actions
        self.dataset_button.clicked.connect(self.create_dataset)
        self.train_button.clicked.connect(self.train_recognizer)
        self.detect_button.clicked.connect(self.detect_faces)
        self.quit_button.clicked.connect(self.close_webcam)

        # Layout
        layout = QVBoxLayout()
        layout.addWidget(self.dataset_button)
        layout.addWidget(self.train_button)
        layout.addWidget(self.detect_button)
        layout.addWidget(self.quit_button)

        # Central Widget
        central_widget = QWidget()
        central_widget.setLayout(layout)
        self.setCentralWidget(central_widget)

        # Webcam window flag
        self.webcam_active = False

    def create_dataset(self):
        """Create a dataset by capturing images from a webcam."""
        detector = cv2.CascadeClassifier(HAAR_CASCADE_FILE)
        user_id, ok = QInputDialog.getText(self, "Input User ID", "Enter User ID:")
        if not ok or not user_id.strip():
            return

        user_id = user_id.strip()
        sample_num = 0

        cam = cv2.VideoCapture(0)
        while True:
            ret, img = cam.read()
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = detector.detectMultiScale(gray, 1.1, 8)

            for (x, y, w, h) in faces:
                sample_num += 1
                cv2.imwrite(f"{DATASET_DIR}/User.{user_id}.{sample_num}.jpg", gray[y:y+h, x:x+w])
                cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
                cv2.imshow("Creating Dataset", img)

            if cv2.waitKey(100) & 0xFF == ord('q') or sample_num >= 50:
                break

        cam.release()
        cv2.destroyAllWindows()
        QMessageBox.information(self, "Dataset Creation", f"Dataset created for User ID: {user_id}")

    def train_recognizer(self):
        """Train the recognizer using the dataset."""
        recognizer = cv2.face.LBPHFaceRecognizer_create()
        detector = cv2.CascadeClassifier(HAAR_CASCADE_FILE)

        def get_images_and_labels(path):
            image_paths = [os.path.join(path, f) for f in os.listdir(path) if f.endswith(".jpg")]
            face_samples = []
            ids = []

            for image_path in image_paths:
                gray_img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
                user_id = int(os.path.split(image_path)[-1].split(".")[1])
                face_samples.append(gray_img)
                ids.append(user_id)

            return face_samples, ids

        faces, ids = get_images_and_labels(DATASET_DIR)

        
        ids = np.array(ids)

        recognizer.train(faces, ids)

        if not os.path.exists(TRAINER_DIR):
            os.makedirs(TRAINER_DIR)
        recognizer.write(TRAINER_FILE)

        QMessageBox.information(self, "Training", "Training completed successfully!")

    def detect_faces(self):
        """Detect and recognize faces using webcam or image upload."""
        recognizer = cv2.face.LBPHFaceRecognizer_create()
        recognizer.read(TRAINER_FILE)
        detector = cv2.CascadeClassifier(HAAR_CASCADE_FILE)

        choice, ok = QInputDialog.getItem(
            self, "Choose Detection Method", "Select an option:", ["Webcam", "Image Upload"], 0, False
        )
        if not ok:
            return

        if choice == "Webcam":
            self.start_webcam_detection(detector, recognizer)
        elif choice == "Image Upload":
            self.upload_image_and_detect(detector, recognizer)

    def start_webcam_detection(self, detector, recognizer):
        """Start webcam detection and recognize faces."""
        self.webcam_active = True
        cam = cv2.VideoCapture(0)
        while self.webcam_active:
            ret, img = cam.read()
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = detector.detectMultiScale(gray, 1.1, 8)

            for (x, y, w, h) in faces:
                cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
                id, conf = recognizer.predict(gray[y:y+h, x:x+w])
                name = name_mapping.get(id, "Unknown") if conf < 60 else "Unknown"
                cv2.putText(img, name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

            cv2.imshow("Face Detection", img)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cam.release()
        cv2.destroyAllWindows()

    def upload_image_and_detect(self, detector, recognizer):
        """Detect faces in an uploaded image."""
        file_path, _ = QFileDialog.getOpenFileName(self, "Select Image File")
        if not file_path:
            return

        img = cv2.imread(file_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = detector.detectMultiScale(gray, 1.1, 8)

        for (x, y, w, h) in faces:
            cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
            id, conf = recognizer.predict(gray[y:y+h, x:x+w])
            name = name_mapping.get(id, "Unknown") if conf < 60 else "Unknown"
            cv2.putText(img, name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        cv2.imshow("Face Detection", img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    def close_webcam(self):
        """Close the webcam."""
        self.webcam_active = False
        cv2.destroyAllWindows()
        QMessageBox.information(self, "Webcam", "Webcam closed.")

if __name__ == "__main__":
    
    os.makedirs(DATASET_DIR, exist_ok=True)
    os.makedirs(TRAINER_DIR, exist_ok=True)

    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
