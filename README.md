Face Recognition System for Missing People:

This project is a face recognition application designed to help identify missing people. The application provides two primary functionalities:

  Admin Functionality: Allows an admin to add new faces to the system, train the recognition model, and manage the dataset.
  User Functionality: Allows users to scan and identify faces using the trained model.

Features:

  Create Dataset: Admin can capture images using a webcam or upload image files to add new persons to the dataset.
  Train Recognizer: The admin can train the recognition model using the dataset.
  Face Detection and Recognition: Users can scan faces (via webcam or uploaded images) and check if they are recognized by the system.

Technologies Used:
  Programming Language: Python
  GUI Library: PyQt5
  Face Detection: OpenCV (Haar Cascade)
  Face Recognition: LBPH (Local Binary Patterns Histograms)
  Data Storage: Images stored in the dataSet folder, and the model saved as trainingData.yml in the trainer folder.
  
Setup Instructions:
  1. Prerequisites
  Ensure you have the following installed:

  Python 3.x
  OpenCV library
  PyQt5 library
  Numpy library
  
Install the required Python libraries with:
  pip install opencv-python PyQt5 numpy
  
  2. Clone the Repository
  Clone this repository to your local machine:
    git clone https://github.com/aymanoski69/Face-recognition-MissingPeople-.git

  cd Face-recognition-MissingPeople-
  
  

  3. Run the Application
  Run the application using:
    python APP.py

Usage:

  Admin Interface:
  Click "Create Dataset" to capture images of a new user (enter a unique user ID when prompted).
  Click "Train Recognizer" to train the face recognition model using the dataset.
  User Interface:
  Click "Detect Faces" to identify individuals from a webcam feed or an uploaded image.

