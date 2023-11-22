
from __future__ import division, print_function
import sys
import os
import glob
import re
import numpy as np
import tensorflow as tf
import tensorflow as tf

from tensorflow.compat.v1 import ConfigProto
from tensorflow.compat.v1 import InteractiveSession

config = ConfigProto()
config.gpu_options.per_process_gpu_memory_fraction = 0.2
config.gpu_options.allow_growth = True
session = InteractiveSession(config=config)

from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

from flask import Flask, redirect, url_for, request, render_template
from werkzeug.utils import secure_filename

app = Flask(__name__)

MODEL_PATH ='model_vgg16.h5'

model = load_model(MODEL_PATH)


def model_predict(img_path, model):
    print(img_path)
    img = image.load_img(img_path, target_size=(224, 224))

    x = image.img_to_array(img)
    x=x/255
    x = np.expand_dims(x, axis=0)
   
    preds = model.predict(x)
    preds=np.argmax(preds, axis=1)
    if preds==0:
        preds="Cataract"
    elif preds==1:
        preds="Diabetic Retinopathy"
    elif preds==2:
        preds="Glaucoma"
    elif preds==3:
        preds="Normal"
    else:
        preds="Please enter correct Image"
    return preds


@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')

@app.route('/feedback', methods=['GET'])
def feedback():
    return render_template('feedback.html')

@app.route('/about', methods=['GET'])
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET'])
def contact():
    return render_template('contact.html')

@app.route('/prediction', methods=['GET'])
def prediction():
    prediction_results = [
        {
            'disease_name': 'Glaucoma',
            'disease_description': 'Glaucoma is a group of eye conditions that damage the optic nerve...'
        },
        {
            'disease_name': 'Cataract',
            'disease_description': 'Cataracts are a clouding of the lens in the eye which leads to a decrease in vision...'
        },
    ]
    return render_template('prediction.html',prediction_results=prediction_results)

@app.route('/get_started', methods=['POST'])
def get_started():
    return redirect(url_for('prediction'))

@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        f = request.files['file']

        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        preds = model_predict(file_path, model)
        result=preds
        return result
    return None


if __name__ == '__main__':
    app.run(port=5001,debug=True) 