
// // Sarthak@2024

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AudioDetection.css';
// import Chart from 'chart.js/auto';

// const AudioDetection = () => {
//   const [audioFile, setAudioFile] = useState(null);
//   const [predictions, setPredictions] = useState(null);
//   const [predictionError, setPredictionError] = useState(null);
//   const [chartData, setChartData] = useState(null);

//   const handleFileChange = (e) => {
//     setAudioFile(e.target.files[0]);
//   };

//   const handlePredict = async () => {
//     try {
//       if (!audioFile) {
//         setPredictionError('Please select an audio file.');
//         return;
//       }

//       const formData = new FormData();
//       formData.append('audio', audioFile);

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
//     predictionData.emotion_probabilities.sort((a, b) => b - a);
//     predictionData.top3_emotions = predictionData.emotion_probabilities.slice(0, 3).map((prob, index) => ({
//       emotion: getEmotionLabel(index),
//       probability: Math.floor(Math.abs(prob) * 100)
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
  
//     const formattedData = predictionData.emotion_probabilities.map(prob => (prob * 100).toFixed(4) + '%');
  
//     setChartData({
//       labels: labels,
//       datasets: [{
//         label: 'Emotion Probability (%)',
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
//         borderWidth: 1,
//         datalabels: {
//           display: true,
//           align: 'center',
//           anchor: 'center',
//           formatter: function(value, context) {
//             return formattedData[context.dataIndex];
//           }
//         }
//       }]
//     });
//   };
  



//   useEffect(() => {
//     if (chartData) {
//       const ctx = document.getElementById('emotion-chart');
//       new Chart(ctx, {
//         type: 'bar',
//         data: chartData,
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//               max: 100
//             }
//           }
//         }
//       });
//     }
//   }, [chartData]);

//   return (
//     <div className="audio-detection-container">
//       <h1>Select an audio file from your device</h1>
//       <div className="file-upload-container">
//         <label htmlFor="file-upload" className="file-upload-label">
//           Click to choose
//           <input type="file" accept="audio/*" id="file-upload" onChange={handleFileChange} />
//         </label>
//         {audioFile && <p className="chosen-file">Chosen File: <em>{audioFile.name}</em></p>}
//       </div>
//       <button className="button-predict" onClick={handlePredict}>Make predictions</button>

//       {predictions && (
//         <div className="prediction-container">
//           <h2>Predictions:</h2>
//           <canvas id="emotion-chart" width="400" height="400"></canvas>
//           <p>Gender: {getGender()}</p>
//           <p>Age: {predictions.age}</p>
//         </div>
//       )}

//       {predictionError && (
//         <div className="error-container">
//           <h2>Error:</h2>
//           <p>{predictionError}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AudioDetection;









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AudioDetection.css';
import Chart from 'chart.js/auto';

const AudioDetection = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [predictionError, setPredictionError] = useState(null);
  const [chartData, setChartData] = useState(null);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handlePredict = async () => {
    try {
      if (!audioFile) {
        setPredictionError('Please select an audio file.');
        return;
      }

      const formData = new FormData();
      formData.append('audio', audioFile);

      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const predictionData = response.data;
      sortPredictions(predictionData);
      setPredictions(predictionData); // Store predictions in state
      setPredictionError(null); // Reset prediction error
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
      const ctx = document.getElementById('emotion-chart');
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
                    color: 'black' // Make y-axis ticks black
                  }
                }
              },
              x: {
                ticks: {
                  font: {
                    weight: 'bold',
                    color: 'black' // Make x-axis ticks black
                  }
                }
              }
            },
            plugins: {
              legend: {
                display: false // Hide legend
              },
              tooltip: {
                enabled: false // Disable tooltip
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
                          ctx.fillText(data + '%', bar.x, bar.y - 5); // Adjust position of label
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
    <div className="audio-detection-container">
      <h1>Select an audio file from your device</h1>
      <div className="file-upload-container">
        <label htmlFor="file-upload" className="file-upload-label">
          Click to choose
          <input type="file" accept="audio/*" id="file-upload" onChange={handleFileChange} />
        </label>
        {audioFile && <p className="chosen-file">Chosen File: <em>{audioFile.name}</em></p>}
      </div>
      <button className="button-predict" onClick={handlePredict}>Make predictions</button>


{predictions && (
  <div className="prediction-container">
    <h2>Emotions</h2>
    <canvas id="emotion-chart" width="100" height="100"></canvas>
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
