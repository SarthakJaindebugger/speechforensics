// Recorder.js

import React, { useState } from 'react';  // Import React and useState only once
import ReactMic from 'react-mic';

const Recorder = ({ onRecordingComplete }) => {

  const [record, setRecord] = useState(false);

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
    onRecordingComplete(); // Trigger the callback when recording stops
  };

  return (
    <div className="recorder-container">
      <ReactMic record={record} className="sound-wave" onStop={stopRecording} strokeColor="#000000" />
      <div className="record-button-container">
        <button onClick={startRecording} disabled={record}>
          Record
        </button>
        <button onClick={stopRecording} disabled={!record}>
          Stop Recording
        </button>
      </div>
    </div>
  );
};

export default Recorder;
