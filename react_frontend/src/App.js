
// // App.js
// import React, { useState } from 'react';
// import AudioDetection from './AudioDetection';
// import AudioRecorder from './AudioRecorder';
// import './AudioDetection.css'; // Import the CSS file for styling
// import micImage from './mic-image.jpg'; // Import the image
// //import micImage2 from './mic2.jpeg'; // Import the image



// const App = () => {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//   };

//   return (
//     <div>
//       <h1>RENDER Application</h1>
//       <div className="button-container">



//         <button
//           className={selectedOption === 'selectFile' ? 'active' : ''}
//           onClick={() => handleOptionClick('selectFile')}
//         >
//           UPLOAD AUDIO
//         </button>
        
        
//       </div>
//       {selectedOption === 'selectFile' && (
//         <div className="audio-card">
//           <AudioDetection />
//         </div>
//       )}
//       {selectedOption === 'recordAudio' && (
//         <div className="audio-card">
//           <AudioRecorder />
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;




import React, { useState, useEffect } from 'react';
import AudioDetection from './AudioDetection';
import AudioRecorder from './AudioRecorder';
import './AudioDetection.css'; // Import the CSS file for styling
import micImage from './mic-image.jpg'; // Import the image

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Set selectedOption to 'selectFile' when the component mounts
    setSelectedOption('selectFile');
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <h1>RENDER Application</h1>
      <div className="button-container">
        {/* The "Upload Audio" button is removed from here */}
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
