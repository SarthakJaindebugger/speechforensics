
// App.js
import React, { useState } from 'react';
import AudioDetection from './AudioDetection';
import AudioRecorder from './AudioRecorder';
import './AudioDetection.css'; // Import the CSS file for styling
import micImage from './mic-image.jpg'; // Import the image
//import micImage2 from './mic2.jpeg'; // Import the image



const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <h1>Speech Forensics Application</h1>
      <div className="button-container">

      <button
          className={selectedOption === 'recordAudio' ? 'active' : ''}
          onClick={() => handleOptionClick('recordAudio')}
        >
          <img
            src={micImage}  // Use the imported image
            alt="Record New Audio"
            style={{ width: '85px', height: '80px' }}
          />
        </button>


        <span className="or-divider">or</span>

        <button
          className={selectedOption === 'selectFile' ? 'active' : ''}
          onClick={() => handleOptionClick('selectFile')}
        >
          UPLOAD AUDIO
        </button>
        
        
      </div>
      {selectedOption === 'selectFile' && (
        <div className="audio-card">
          <AudioDetection />
        </div>
      )}
      {selectedOption === 'recordAudio' && (
        <div className="audio-card">
          <AudioRecorder />
        </div>
      )}
    </div>
  );
};

export default App;
