# from flask import Flask, request, jsonify, render_template_string
# from werkzeug.utils import secure_filename
# from speechbrain.inference.classifiers import EncoderClassifier
# import torchaudio
# import numpy as np
# import tensorflow as tf
# import logging
# from tabulate import tabulate
# import os

# app = Flask(__name__)

# # Define the upload folder
# UPLOAD_FOLDER = 'uploads'
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# # Load the pre-trained encoder classifier
# try:
#     encoder_classifier = EncoderClassifier.from_hparams(
#         source="speechbrain/spkrec-xvect-voxceleb",
#         savedir="pretrained_models3/spkrec-xvect-voxceleb"
#     )
#     logging.info("Pretrained encoder classifier loaded successfully.")
# except Exception as e:
#     logging.error(f"Error loading pretrained encoder classifier: {e}")
#     raise e

# # Load your model
# your_model_path = "/mnt/c/Users/shubh/OneDrive/Desktop/ML Projects/speech_forensics_devyani/sarthak_new_xvector.h5"

# try:
#     model = tf.keras.models.load_model(your_model_path)
#     logging.info("Model loaded successfully.")
# except Exception as e:
#     logging.error(f"Error loading the model: {e}")
#     raise e


# def extract_xvector_features(path, target_sample_rate=16000):
#     try:
#         logging.info(f"Processing audio file: {path}")

#         signal, original_sample_rate = torchaudio.load(path)
#         logging.info(f"Original sample rate: {original_sample_rate}")

#         if original_sample_rate != target_sample_rate:
#             logging.info("Resampling audio...")
#             resample = torchaudio.transforms.Resample(original_sample_rate, target_sample_rate)
#             signal = resample(signal)

#         if signal.shape[0] > 1:
#             logging.info("Converting stereo to mono...")
#             signal = signal.mean(dim=0, keepdim=True)

#         logging.info("Extracting X-vector embeddings...")
#         embeddings = encoder_classifier.encode_batch(signal)
#         xvector_features = embeddings.mean(dim=1).squeeze().numpy()

#         logging.info("X-vector extraction successful.")
#         return xvector_features

#     except Exception as e:
#         logging.error(f"Ignoring {path} because audio is of 0 seconds or an error occurred: {e}")
#         return None


# def make_predictions(xvector_features):
#     try:
#         logging.info("Making predictions...")

#         output = model.predict(xvector_features.reshape(1, -1))

#         logging.info("Predictions:")
#         return output

#     except Exception as e:
#         logging.error(f"Prediction error: {e}")
#         return None



# @app.route('/')
# def home():
#     return """
#     <!DOCTYPE html>
#     <html lang="en">
#     <head>
#         <meta charset="UTF-8">
#         <meta name="viewport" content="width=device-width, initial-scale=1.0">
#         <title>Speech Recognition API</title>
#     </head>
#     <body>
#         <h1>Welcome to the Speech Recognition API!</h1>
#         <form action="/predict" method="post" enctype="multipart/form-data">
#             <label for="audio_file">Select an audio file (WAV format):</label><br>
#             <input type="file" id="audio_file" name="audio" accept=".wav"><br><br>
#             <input type="submit" value="Predict">
#         </form>
#     </body>
#     </html>
#     """




# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Check if the request has the file part
#         if 'audio' not in request.files:
#             return jsonify({'error': 'No audio file provided'}), 400

#         audio_file = request.files['audio']

#         if audio_file.filename == '':
#             return jsonify({'error': 'No selected audio file'}), 400

#         logging.info(f"Received request for prediction with audio file: {audio_file.filename}")

#         # Save the uploaded file with an absolute path
#         filename = secure_filename(audio_file.filename)
#         audio_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         audio_file.save(audio_path)

#         xvector_features = extract_xvector_features(audio_path)

#         if xvector_features is not None:
#             predictions = make_predictions(xvector_features)

#             # Extract values from the prediction array
#             emotion_probabilities = predictions[0][0]
#             age = int(predictions[1][0][0])
#             gender_probabilities = predictions[2][0]

#             # Create tables
#             emotion_labels = ['Anger', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sadness']
#             emotion_table = [[emotion_label, f"{probability * 100:.2f}%"] for emotion_label, probability in zip(emotion_labels, emotion_probabilities)]
#             age_table = [["Age", age]]
#             gender_table = [["Female", f"{gender_probabilities[0] * 100:.2f}%"], ["Male", f"{gender_probabilities[1] * 100:.2f}%"]]

#             # Print tables using tabulate
#             formatted_emotion_table = tabulate(emotion_table, headers=["Emotion", "Probability (%)"], tablefmt="fancy_grid")
#             formatted_age_table = tabulate(age_table, headers=["Entity", "Value"], tablefmt="fancy_grid")
#             formatted_gender_table = tabulate(gender_table, headers=["Gender", "Probability (%)"], tablefmt="fancy_grid")

#             return jsonify({
#                 'emotion_table': formatted_emotion_table,
#                 'age_table': formatted_age_table,
#                 'gender_table': formatted_gender_table
#             })

#         else:
#             return jsonify({'error': 'Feature extraction failed.'}), 400

#     except Exception as e:
#         logging.error(f"Unexpected error: {e}")
#         return jsonify({'error': 'Internal server error.'}), 500


















# if __name__ == '__main__':
#     app.run(debug=True)


























from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from speechbrain.inference.classifiers import EncoderClassifier
import torchaudio
import numpy as np
import tensorflow as tf
import logging
import os

from flask_cors import CORS
...
app = Flask(__name__)
CORS(app)




# Define the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load the pre-trained encoder classifier
try:
    encoder_classifier = EncoderClassifier.from_hparams(
        source="speechbrain/spkrec-xvect-voxceleb",
        savedir="pretrained_models3/spkrec-xvect-voxceleb"
    )
    logging.info("Pretrained encoder classifier loaded successfully.")
except Exception as e:
    logging.error(f"Error loading pretrained encoder classifier: {e}")
    raise e

# Load your model
your_model_path = "/mnt/c/Users/shubh/OneDrive/Desktop/ML Projects/speech_forensics_devyani/sarthak_new_xvector.h5"

try:
    model = tf.keras.models.load_model(your_model_path)
    logging.info("Model loaded successfully.")
except Exception as e:
    logging.error(f"Error loading the model: {e}")
    raise e


def extract_xvector_features(path, target_sample_rate=16000):
    try:
        logging.info(f"Processing audio file: {path}")

        signal, original_sample_rate = torchaudio.load(path)
        logging.info(f"Original sample rate: {original_sample_rate}")

        if original_sample_rate != target_sample_rate:
            logging.info("Resampling audio...")
            resample = torchaudio.transforms.Resample(original_sample_rate, target_sample_rate)
            signal = resample(signal)

        if signal.shape[0] > 1:
            logging.info("Converting stereo to mono...")
            signal = signal.mean(dim=0, keepdim=True)

        logging.info("Extracting X-vector embeddings...")
        embeddings = encoder_classifier.encode_batch(signal)
        xvector_features = embeddings.mean(dim=1).squeeze().numpy()

        logging.info("X-vector extraction successful.")
        return xvector_features

    except Exception as e:
        logging.error(f"Ignoring {path} because audio is of 0 seconds or an error occurred: {e}")
        return None


def make_predictions(xvector_features):
    try:
        logging.info("Making predictions...")

        output = model.predict(xvector_features.reshape(1, -1))

        logging.info("Predictions:")
        return output

    except Exception as e:
        logging.error(f"Prediction error: {e}")
        return None




@app.route('/')
def home():
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Speech Recognition API</title>
    </head>
    <body>
        <h1>Welcome to the Speech Recognition API!</h1>
        <form action="/predict" method="post" enctype="multipart/form-data">
            <label for="audio_file">Select an audio file (WAV format):</label><br>
            <input type="file" id="audio_file" name="audio" accept=".wav"><br><br>
            <input type="submit" value="Predict">
        </form>
    </body>
    </html>
    """


# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Check if the request has the file part
#         if 'audio' not in request.files:
#             return jsonify({'error': 'No audio file provided'}), 400

#         audio_file = request.files['audio']

#         if audio_file.filename == '':
#             return jsonify({'error': 'No selected audio file'}), 400

#         logging.info(f"Received request for prediction with audio file: {audio_file.filename}")

#         # Save the uploaded file with an absolute path
#         filename = secure_filename(audio_file.filename)
#         audio_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         audio_file.save(audio_path)

#         xvector_features = extract_xvector_features(audio_path)

#         if xvector_features is not None:
#             predictions = make_predictions(xvector_features)

#             # Extract values from the prediction array
#             emotion_probabilities = predictions[0][0]
#             age = int(predictions[1][0][0])
#             gender_probabilities = predictions[2][0]

#             # Printing age
#             print("Age:", age)

#             # Printing emotions
#             emotions = ['Anger', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sadness']
#             for idx, emotion in enumerate(emotions):
#                 print(f"{emotion}: {emotion_probabilities[idx]}")

#             # Printing gender
#             gender = ['Female', 'Male']
#             for idx, prob in enumerate(gender_probabilities):
#                 print(f"Gender: {gender[idx]} - Probability: {prob}")

#             return jsonify({
#                 'emotion_probabilities': emotion_probabilities.tolist(),
#                 'age': age,
#                 'gender_probabilities': gender_probabilities.tolist()
#             })

#         else:
#             return jsonify({'error': 'Feature extraction failed.'}), 400

#     except Exception as e:
#         logging.error(f"Unexpected error: {e}")
#         return jsonify({'error': 'Internal server error.'}), 500


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if the request has the file part
        if 'audio' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400

        audio_file = request.files['audio']

        if audio_file.filename == '':
            return jsonify({'error': 'No selected audio file'}), 400

        logging.info(f"Received request for prediction with audio file: {audio_file.filename}")

        # Save the uploaded file with an absolute path
        filename = secure_filename(audio_file.filename)
        audio_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        audio_file.save(audio_path)

        xvector_features = extract_xvector_features(audio_path)

        if xvector_features is not None:
            predictions = make_predictions(xvector_features)

            # Extract values from the prediction array
            emotion_probabilities = predictions[0][0]
            age = int(predictions[1][0][0])
            gender_probabilities = predictions[2][0]

            # Printing age
            print("Age:", age)

            # Printing emotions
            emotions = ['Anger', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sadness']
            for idx, emotion in enumerate(emotions):
                print(f"{emotion}: {emotion_probabilities[idx]}")

            # Printing gender
            gender = ['Female', 'Male']
            for idx, prob in enumerate(gender_probabilities):
                print(f"Gender: {gender[idx]} - Probability: {prob}")

            return jsonify({
                'emotion_probabilities': emotion_probabilities.tolist(),
                'age': age,
                'gender_probabilities': gender_probabilities.tolist(),
                'predicted_gender': gender[np.argmax(gender_probabilities)],
                'predicted_age': age
            })

        else:
            return jsonify({'error': 'Feature extraction failed.'}), 400

    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({'error': 'Internal server error.'}), 500





if __name__ == '__main__':
    app.run(debug=True)
