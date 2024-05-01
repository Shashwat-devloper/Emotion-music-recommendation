from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import numpy as np
from tensorflow.keras.models import load_model
from keras.optimizers import Adam
from PIL import Image
from numpy import asarray

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/api/predict-emotion',methods=['POST'])
@cross_origin(supports_credentials=True)
def predict_emotion():
    if 'image' not in request.files:
        errorResult = {"status": False, "message": "file not found!"}
        return jsonify(errorResult)

    model_path = "/home/arihant1224/mysite/emotion_model4.h5"
    model = load_model(model_path)
    model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

    file = request.files['image']
    img = Image.open(file.stream)
    picture_size = 48
    img = img.resize((picture_size, picture_size))
    img = asarray(img)
    img = np.dot(img[...,:3], [0.2989, 0.5870, 0.1140])

    my_dict = {'angry': 0,
     'disgust': 1,
     'fear': 2,
     'happy': 3,
     'neutral': 4,
     'sad': 5,
     'surprise': 6
    }

    img = np.expand_dims(img, axis = -1)
    img = np.expand_dims(img, axis = 0)
    index = np.argmax(model.predict(img))
    result = list(my_dict.keys())[list(my_dict.values()).index(index)]

    output = {"status": True, "data": result}
    return jsonify(output)
