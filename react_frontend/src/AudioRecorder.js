

// // import React, { useState, useEffect } from 'react';
// // import { ReactMic } from 'react-mic';
// // import axios from 'axios';

// // const AudioRecorder = () => {
// //   const [isRecording, setIsRecording] = useState(false);
// //   const [audioBlob, setAudioBlob] = useState(null);
// //   const [predictions, setPredictions] = useState(null);
// //   const [predictionError, setPredictionError] = useState(null);

// //   const onStartRecording = () => {
// //     setIsRecording(true);
// //   };

// //   const onStopRecording = (recordedBlob) => {
// //     setIsRecording(false);
// //     setAudioBlob(recordedBlob.blob);
// //   };

// //   const onSaveAudioAndPredict = async () => {
// //     console.log('Predicting...');

// //     if (audioBlob) {
// //       try {
// //         const formData = new FormData();
// //         formData.append('audio', new Blob([audioBlob], { type: 'audio/webm' }));

// //         const response = await axios.post('http://localhost:5000/predict', formData, {
// //           headers: {
// //             'Content-Type': 'multipart/form-data',
// //           },
// //         });

// //         // Update the state with the predictions
// //         setPredictions(response.data);
// //         setPredictionError(null); // Reset prediction error

// //       } catch (error) {
// //         console.error('Error predicting:', error);
// //         setPredictionError('Error predicting: ' + error.message);
// //       }
// //     } else {
// //       console.log('No audio to predict.');
// //     }
// //   };

// //   useEffect(() => {
// //     // Additional processing or actions after recording stops
// //     // This can include sending the audioBlob to the backend for prediction
// //   }, [audioBlob]);

// //   const onFrequencyData = (frequencyData) => {
// //     // Additional logic for frequency data processing
// //   };

// //   return (
// //     <div style={{
// //       backgroundColor: 'white',
// //       padding: '20px',
// //       borderRadius: '8px',
// //       boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
// //       overflow: 'hidden',
// //       margin: 'auto',
// //       marginTop: '30px', // Adjust the top margin as needed
// //       marginBottom: '30px',
// //       width: '300px', // Adjust the width as needed
// //       height: '500px', // Adjust the height as needed
// //       display: 'flex',
// //       flexDirection: 'column',
// //       alignItems: 'center',
// //     }}>
// //       <h2 style={{ marginBottom: '20px' }}>SPEAK IN YOUR MIC</h2>
// //       <ReactMic
// //         record={isRecording}
// //         onStop={onStopRecording}
// //         onStart={onStartRecording}
// //         mimeType="audio/webm"
// //         style={{ width: '100%', height: '100%' }}
// //         onData={onFrequencyData}
// //       />
// //       <div style={{ marginTop: '20px' }}>
// //         <button onClick={onStartRecording} disabled={isRecording}>
// //           Start Recording
// //         </button> 
// //         <button onClick={onStopRecording} disabled={!isRecording}>
// //           Stop Recording
// //         </button>
// //         <button className="button-predict" onClick={onSaveAudioAndPredict} disabled={!audioBlob}>
// //           Predict
// //         </button>
// //       </div>

// //       {predictions && (
// //         <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '10px', borderRadius: '8px' }}>
// //           <h2>Predictions:</h2>
// //           <p>Emotion: {predictions.predicted_emotion}</p>
// //           <p>Gender: {predictions.predicted_gender}</p>
// //           <p>Age: {predictions.predicted_age}</p>
// //         </div>
// //       )}

// //       {predictionError && (
// //         <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '10px', borderRadius: '8px' }}>
// //           <h2>Error:</h2>
// //           <p>{predictionError}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AudioRecorder;













// import React, { useState, useEffect } from 'react';
// import { ReactMic } from 'react-mic';
// import axios from 'axios';
// import Chart from 'chart.js/auto';

// const AudioDetection = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [predictions, setPredictions] = useState(null);
//   const [predictionError, setPredictionError] = useState(null);
//   const [chartData, setChartData] = useState(null);

//   const onStartRecording = () => {
//     setIsRecording(true);
//   };

//   const onStopRecording = (recordedBlob) => {
//     setIsRecording(false);
//     setAudioBlob(recordedBlob.blob);
//   };

//   const handlePredict = async () => {
//     try {
//       if (!audioBlob) {
//         setPredictionError('No audio to predict.');
//         return;
//       }

//       const formData = new FormData();
//       formData.append('audio', new Blob([audioBlob], { type: 'audio/webm' }));

//       const response = await axios.post('http://localhost:5000/predict', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const predictionData = response.data;
//       sortPredictions(predictionData);
//       setPredictions(predictionData); // Store predictions in state
//       setPredictionError(null); // Reset prediction error
//       generateChartData(predictionData);

//     } catch (error) {
//       console.error('Error predicting:', error);
//       setPredictionError('Error predicting: ' + error.message);
//     }
//   };

//   const sortPredictions = (predictionData) => {
//     const emotionProbabilities = predictionData.emotion_probabilities.map((prob, index) => ({
//       emotion: getEmotionLabel(index),
//       probability: prob
//     }));
  
//     emotionProbabilities.sort((a, b) => b.probability - a.probability);
  
//     predictionData.top3_emotions = emotionProbabilities.slice(0, 3).map(({emotion, probability}) => ({
//       emotion,
//       probability: Math.floor(probability * 100)
//     }));
//   };
  


//   const getGender = () => {
//     const genderProbabilities = predictions.gender_probabilities;
//     return genderProbabilities[0] > genderProbabilities[1] ? "Female" : "Male";
//   };



//   const getEmotionLabel = (index) => {
//     switch (index) {
//       case 0:
//         return "Anger";
//       case 1:
//         return "Disgust";
//       case 2:
//         return "Fear";
//       case 3:
//         return "Happiness";
//       case 4:
//         return "Neutral";
//       case 5:
//         return "Sadness";
//       default:
//         return "";
//     }
//   };


//   const generateChartData = (predictionData) => {
//     const labels = predictionData.emotion_probabilities.map((_, index) => getEmotionLabel(index));
//     const data = predictionData.emotion_probabilities.map(prob => Math.floor(prob * 100));
  
//     setChartData({
//       labels: labels,
//       datasets: [{
//         data: data,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)'
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)'
//         ],
//         borderWidth: 1
//       }]
//     });
//   };
  


//   useEffect(() => {
//     if (chartData) {
//       const ctx = document.getElementById('emotion-chart');
//       if (ctx) {
//         new Chart(ctx, {
//           type: 'bar',
//           data: chartData,
//           options: {
//             scales: {
//               y: {
//                 beginAtZero: true,
//                 max: 100,
//                 ticks: {
//                   font: {
//                     weight: 'bold',
//                     color: 'black' // Make y-axis ticks black
//                   }
//                 }
//               },
//               x: {
//                 ticks: {
//                   font: {
//                     weight: 'bold',
//                     color: 'black' // Make x-axis ticks black
//                   }
//                 }
//               }
//             },
//             plugins: {
//               legend: {
//                 display: false // Hide legend
//               },
//               tooltip: {
//                 enabled: false // Disable tooltip
//               }
//             },
//             animation: {
//               onComplete: function () {
//                 const chartInstance = this.chart;
//                 if (chartInstance) {
//                   const ctx = chartInstance.ctx;
//                   if (ctx) {
//                     ctx.textAlign = 'center';
//                     ctx.textBaseline = 'bottom';
//                     this.data.datasets.forEach(function (dataset, i) {
//                       const meta = chartInstance.controller.getDatasetMeta(i);
//                       if (meta && meta.data) {
//                         meta.data.forEach(function (bar, index) {
//                           const data = dataset.data[index];
//                           ctx.fillText(data + '%', bar.x, bar.y - 5); // Adjust position of label
//                         });
//                       }
//                     });
//                   }
//                 }
//               }
//             }
//           }
//         });
//       }
//     }
//   }, [chartData]);
  





//   return (
//     <div className="audio-detection-container">
//       <h1>Record your audio</h1>
//       <ReactMic
//         record={isRecording}
//         onStop={onStopRecording}
//         onStart={onStartRecording}
//         mimeType="audio/webm"
//         style={{ width: '100%' }}
//       />
//       <div>
//         <button onClick={onStartRecording} disabled={isRecording}>
//           Start Recording
//         </button>
//         <button onClick={onStopRecording} disabled={!isRecording}>
//           Stop Recording
//         </button>
//         <button className="button-predict" onClick={handlePredict} disabled={!audioBlob}>
//           Predict
//         </button>
//       </div>
//       {predictions && (
//   <div className="prediction-container">
//     <h2>Emotions</h2>
//     <canvas id="emotion-chart" width="100" height="100"></canvas>
//     <div className="prediction-details">
//   <p className="prediction-heading"><strong>Gender:</strong> {getGender()}</p>
//   <p className="prediction-heading"><strong>Age:</strong> {predictions.age}</p>
// </div>


//   </div>
// )}
      

      
//     </div>
//   );
// };

// export default AudioDetection;






import React, { useState, useEffect, useRef } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';
import Chart from 'chart.js/auto';

const AudioDetection = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [predictionError, setPredictionError] = useState(null);
  const [chartData, setChartData] = useState(null);
  const chartCanvasRef = useRef(null);

  const onStartRecording = () => {
    setIsRecording(true);
  };

  const onStopRecording = (recordedBlob) => {
    setIsRecording(false);
    setAudioBlob(recordedBlob.blob);
  };

  const handlePredict = async () => {
    try {
      if (!audioBlob) {
        setPredictionError('No audio to predict.');
        return;
      }

      const formData = new FormData();
      formData.append('audio', new Blob([audioBlob], { type: 'audio/webm' }));

      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const predictionData = response.data;
      sortPredictions(predictionData);
      setPredictions(predictionData);
      setPredictionError(null);
      generateChartData(predictionData);
    } catch (error) {
      console.error('Error predicting:', error);
      setPredictionError('Error predicting: ' + error.message);
    }
  };

  const sortPredictions = (predictionData) => {
    const emotionProbabilities = predictionData.emotion_probabilities.map((prob, index) => ({
      emotion: getEmotionLabel(index),
      probability: prob
    }));
  
    emotionProbabilities.sort((a, b) => b.probability - a.probability);
  
    predictionData.top3_emotions = emotionProbabilities.slice(0, 3).map(({emotion, probability}) => ({
      emotion,
      probability: Math.floor(probability * 100)
    }));
  };

  const getGender = () => {
    const genderProbabilities = predictions.gender_probabilities;
    return genderProbabilities[0] > genderProbabilities[1] ? "Female" : "Male";
  };

  const getEmotionLabel = (index) => {
    switch (index) {
      case 0:
        return "Anger";
      case 1:
        return "Disgust";
      case 2:
        return "Fear";
      case 3:
        return "Happiness";
      case 4:
        return "Neutral";
      case 5:
        return "Sadness";
      default:
        return "";
    }
  };

  const generateChartData = (predictionData) => {
    const labels = predictionData.emotion_probabilities.map((_, index) => getEmotionLabel(index));
    const data = predictionData.emotion_probabilities.map(prob => Math.floor(prob * 100));
  
    setChartData({
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    });
  };

  useEffect(() => {
    if (chartData) {
      const ctx = chartCanvasRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  font: {
                    weight: 'bold',
                    color: 'black'
                  }
                }
              },
              x: {
                ticks: {
                  font: {
                    weight: 'bold',
                    color: 'black'
                  }
                }
              }
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: false
              }
            },
            animation: {
              onComplete: function () {
                const chartInstance = this.chart;
                if (chartInstance) {
                  const ctx = chartInstance.ctx;
                  if (ctx) {
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset, i) {
                      const meta = chartInstance.controller.getDatasetMeta(i);
                      if (meta && meta.data) {
                        meta.data.forEach(function (bar, index) {
                          const data = dataset.data[index];
                          ctx.fillText(data + '%', bar.x, bar.y - 5);
                        });
                      }
                    });
                  }
                }
              }
            }
          }
        });
      }
    }
  }, [chartData]);

  return (
    <div className="audio-detection-container" style={{ overflow: 'hidden' }}>
      <h1>Record your audio</h1>
      <ReactMic
        record={isRecording}
        onStop={onStopRecording}
        onStart={onStartRecording}
        mimeType="audio/webm"
        style={{ width: '100%' }}
      />
      <div>
        <button onClick={onStartRecording} disabled={isRecording}>
          Start Recording
        </button>
        <button onClick={onStopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
        <button className="button-predict" onClick={handlePredict} disabled={!audioBlob}>
          Predict
        </button>
      </div>
      {predictions && (
        <div className="prediction-container">
          <h2>Emotions</h2>
          <canvas ref={chartCanvasRef} style={{ width: '100%', height: 'auto' }}></canvas>
          <div className="prediction-details">
            <p className="prediction-heading"><strong>Gender:</strong> {getGender()}</p>
            <p className="prediction-heading"><strong>Age:</strong> {predictions.age}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioDetection;
