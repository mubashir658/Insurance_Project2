from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

try:
    model = tf.keras.models.load_model('prominence_model.h5')
    scaler = joblib.load('scaler.pkl')
    label_encoders = {
        'smoker': joblib.load('le_smoker.pkl'),
        'chronic_disease': joblib.load('le_chronic_disease.pkl'),
        'gender': joblib.load('le_gender.pkl'),
        'physical_activity_level': joblib.load('le_physical_activity_level.pkl'),
        'alcohol_consumption': joblib.load('le_alcohol_consumption.pkl'),
        'income': joblib.load('le_income.pkl')
    }
    app.logger.info("Model and preprocessors loaded successfully.")
except Exception as e:
    app.logger.error(f"Error loading model or preprocessors: {str(e)}")
    raise e

numerical_cols = ['age', 'bmi', 'dependents', 'hospital_visits_last_year']
categorical_label_cols = ['smoker', 'chronic_disease', 'gender', 'physical_activity_level', 'alcohol_consumption', 'income']
pre_existing_conditions_options = [0, 1, 2, 3, 4]  # cancer, diabetes, hypertension, none, asthma
valid_categorical_values = {
    'smoker': [0, 1],  # 0: no, 1: yes
    'chronic_disease': [0, 1],  # 0: no, 1: yes
    'gender': [0, 1],  # 0: male, 1: female
    'physical_activity_level': [0, 1, 2],  # 0: sedentary, 1: moderate, 2: active
    'alcohol_consumption': [0, 1, 2],  # 0: none, 1: moderate, 2: heavy
    'income': [0, 1, 2],  # 0: low, 1: average, 2: high
    'pre_existing_conditions': pre_existing_conditions_options
}

@app.route('/predict', methods=['POST'])
def predict():
    app.logger.info("Received prediction request.")
    try:
        data = request.get_json()
        if not data:
            raise ValueError("No input data provided")

        input_data = {
            'age': float(data.get('age', 0)),
            'bmi': float(data.get('bmi', 0)),
            'smoker': int(data.get('smoker', -1)),
            'dependents': int(data.get('dependents', 0)),
            'hospital_visits_last_year': int(data.get('hospital_visits_last_year', 0)),
            'chronic_disease': int(data.get('chronic_disease', -1)),
            'physical_activity_level': int(data.get('physical_activity_level', -1)),
            'alcohol_consumption': int(data.get('alcohol_consumption', -1)),
            'gender': int(data.get('gender', -1)),
            'income': int(data.get('income', -1)),
            'pre_existing_conditions': int(data.get('pre_existing_conditions', -1))
        }
        app.logger.debug(f"Input data: {input_data}")

        if input_data['age'] < 18 or input_data['age'] > 100:
            raise ValueError("Age must be between 18 and 100")
        if input_data['bmi'] < 10 or input_data['bmi'] > 50:
            raise ValueError("BMI must be between 10 and 50")
        if input_data['dependents'] < 0 or input_data['dependents'] > 10:
            raise ValueError("Dependents must be between 0 and 10")
        if input_data['hospital_visits_last_year'] < 0 or input_data['hospital_visits_last_year'] > 50:
            raise ValueError("Hospital visits must be between 0 and 50")

        for col in categorical_label_cols + ['pre_existing_conditions']:
            if input_data[col] not in valid_categorical_values[col]:
                raise ValueError(f"Invalid value for {col}: {input_data[col]}. Must be one of {valid_categorical_values[col]}")

        df = pd.DataFrame([input_data])
        app.logger.debug(f"Input DataFrame:\n{df}")

        df[numerical_cols] = scaler.transform(df[numerical_cols])
        app.logger.debug(f"After scaling numerical features:\n{df}")

        # Categorical features are already encoded numerically
        app.logger.debug(f"After label encoding (already numerical):\n{df}")

        df = pd.get_dummies(df, columns=['pre_existing_conditions'], prefix='pre_existing_conditions', dtype=int)
        for condition in pre_existing_conditions_options:
            col_name = f'pre_existing_conditions_{condition}'
            if col_name not in df.columns:
                df[col_name] = 0
        if 'pre_existing_conditions_4' in df.columns:
            df = df.drop(columns=['pre_existing_conditions_4'])  # Drop asthma
        app.logger.debug(f"After one-hot encoding:\n{df}")

        expected_columns = [
            'age', 'bmi', 'smoker', 'dependents', 'hospital_visits_last_year',
            'chronic_disease', 'physical_activity_level', 'alcohol_consumption',
            'gender', 'income', 'pre_existing_conditions_0',
            'pre_existing_conditions_1', 'pre_existing_conditions_2',
            'pre_existing_conditions_3'
        ]
        df = df[expected_columns]
        app.logger.debug(f"Final preprocessed DataFrame:\n{df}")

        prediction = model.predict(df)
        app.logger.debug(f"Prediction output: {prediction}")
        prominence = 1 if prediction[0] >= 0.5 else 0
        result = "Prominent" if prominence == 1 else "Not Prominent"
        app.logger.info(f"Prediction result: {result}")

        return jsonify({"result": result, "probability": float(prediction[0])})
    except Exception as e:
        app.logger.error(f"Error during prediction: {str(e)}")
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 400

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)