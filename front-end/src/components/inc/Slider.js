import React, { useState } from 'react';
import './Slider.css';
import WebcamFeed from './WebcamFeed/WebcamFeed';

function Slides() {
  const [useWebcam, setUseWebcam] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState(null); // Store backend response
  const [isLoading, setIsLoading] = useState(false); // For loading state

  const handleToggle = () => {
    setUseWebcam(!useWebcam);
    setRecognitionResult(null); // Reset results when switching modes
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];

    if (!file) {
      alert('Please select a file before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setRecognitionResult(data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while processing the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${require('../images/slides1.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 0',
      }}
    >
      <div className="container text-center text-white">
        <h1 className="display-4">Find Missing Person</h1>
        <h3 className="lead">
          Upload a photo or use the webcam for real-time recognition.
        </h3>

        <button className="btn btn-secondary mt-3" onClick={handleToggle}>
          {useWebcam ? 'Switch to Upload' : 'Switch to Webcam'}
        </button>

        {useWebcam ? (
          <WebcamFeed />
        ) : (
          <form onSubmit={handleUpload}>
            <div className="input-group mt-4">
              <input
                type="file"
                className="form-control"
                name="file"
                id="file-upload"
                accept="image/*"
                required
              />
              <button type="submit" className="btn btn-primary btn-lg">
                {isLoading ? 'Processing...' : 'Upload Image'}
              </button>
            </div>
          </form>
        )}

        <h4 className="mt-3">
          For best results, please upload a clear, recent photo of the missing person.
        </h4>

        {/* Display Recognition Results */}
        {recognitionResult && (
          <div className="mt-4 recognition-result">
            <h3>Recognition Results:</h3>
            {recognitionResult.faces.map((face, index) => (
              <div key={index}>
                <p>
                  {face.name === 'Unknown'
                    ? `Face detected with confidence ${face.confidence.toFixed(2)}%, but not recognized.`
                    : `Recognized as ${face.name} with confidence ${face.confidence.toFixed(2)}%.`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Slides;
