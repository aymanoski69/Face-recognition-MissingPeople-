import React from 'react';

function WebcamFeed() {
  return (
    <div className="webcam-container">
      <h3 className="text-center">Real-Time Face Recognition</h3>
      <div className="webcam-feed">
        <img
          src="http://localhost:5000/webcam"
          alt="Webcam Feed"
          style={{ width: '100%', maxHeight: '500px' }}
        />
      </div>
    </div>
  );
}

export default WebcamFeed;
