from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
import logging

# ---------------------------------------------------
# FLASK APP SETUP
# ---------------------------------------------------

app = Flask(__name__)
CORS(app)

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# ---------------------------------------------------
# LOAD MODEL AND SCALER
# ---------------------------------------------------

try:
    model = tf.keras.models.load_model('prominence_model.h5')

    scaler = joblib.load('scaler.pkl')

    app.logger.info("Model and scaler loaded successfully.")

except Exception as e:
    app.logger.error(f"Error loading model or scaler: {str(e)}")
    raise e

# ---------------------------------------------------
# FEATURE CONFIGURATION
# ---------------------------------------------------

numerical_cols = [
    'age',
    'bmi',
    'dependents',
    'hospital_visits_last_year'
]

categorical_label_cols = [
    'smoker',
    'chronic_disease',
    'gender',
    'physical_activity_level',
    'alcohol_consumption',
    'income'
]

pre_existing_conditions_options = [0, 1, 2, 3, 4]

# ---------------------------------------------------
# VALIDATION RULES
# ---------------------------------------------------

valid_categorical_values = {

    'smoker': [0, 1],

    'chronic_disease': [0, 1],

    'gender': [0, 1],

    'physical_activity_level': [0, 1, 2],

    'alcohol_consumption': [0, 1, 2],

    'income': [0, 1, 2],

    'pre_existing_conditions': [0, 1, 2, 3, 4]
}

# ---------------------------------------------------
# PREDICTION ROUTE
# ---------------------------------------------------

@app.route('/predict', methods=['POST'])
def predict():

    app.logger.info("Received prediction request.")

    try:

        data = request.get_json()

        if not data:
            raise ValueError("No input data provided")

        # ---------------------------------------------------
        # GET INPUT DATA
        # ---------------------------------------------------

        input_data = {

            'age': float(data.get('age', 0)),

            'bmi': float(data.get('bmi', 0)),

            'smoker': int(data.get('smoker', -1)),

            'dependents': int(data.get('dependents', 0)),

            'hospital_visits_last_year': int(
                data.get('hospital_visits_last_year', 0)
            ),

            'chronic_disease': int(
                data.get('chronic_disease', -1)
            ),

            'physical_activity_level': int(
                data.get('physical_activity_level', -1)
            ),

            'alcohol_consumption': int(
                data.get('alcohol_consumption', -1)
            ),

            'gender': int(data.get('gender', -1)),

            'income': int(data.get('income', -1)),

            'pre_existing_conditions': int(
                data.get('pre_existing_conditions', -1)
            )
        }

        app.logger.debug(f"Input Data: {input_data}")

        # ---------------------------------------------------
        # VALIDATIONS
        # ---------------------------------------------------

        if input_data['age'] < 18 or input_data['age'] > 100:
            raise ValueError("Age must be between 18 and 100")

        if input_data['bmi'] < 10 or input_data['bmi'] > 50:
            raise ValueError("BMI must be between 10 and 50")

        if input_data['dependents'] < 0 or input_data['dependents'] > 10:
            raise ValueError("Dependents must be between 0 and 10")

        if (
            input_data['hospital_visits_last_year'] < 0
            or
            input_data['hospital_visits_last_year'] > 50
        ):
            raise ValueError(
                "Hospital visits must be between 0 and 50"
            )

        for col in categorical_label_cols + ['pre_existing_conditions']:

            if input_data[col] not in valid_categorical_values[col]:

                raise ValueError(
                    f"Invalid value for {col}: "
                    f"{input_data[col]}"
                )

        # ---------------------------------------------------
        # DATAFRAME
        # ---------------------------------------------------

        df = pd.DataFrame([input_data])

        app.logger.debug(f"Input DataFrame:\n{df}")

        # ---------------------------------------------------
        # FEATURE SCALING
        # ---------------------------------------------------

        df[numerical_cols] = scaler.transform(
            df[numerical_cols]
        )

        app.logger.debug(
            f"After Scaling:\n{df}"
        )

        # ---------------------------------------------------
        # ONE-HOT ENCODING
        # ---------------------------------------------------

        df = pd.get_dummies(
            df,
            columns=['pre_existing_conditions'],
            prefix='pre_existing_conditions',
            dtype=int
        )

        # ---------------------------------------------------
        # ENSURE ALL COLUMNS EXIST
        # ---------------------------------------------------

        expected_columns = [

            'age',
            'bmi',
            'smoker',
            'dependents',
            'hospital_visits_last_year',
            'chronic_disease',
            'physical_activity_level',
            'alcohol_consumption',
            'gender',
            'income',

            'pre_existing_conditions_0',
            'pre_existing_conditions_1',
            'pre_existing_conditions_2',
            'pre_existing_conditions_3',
            'pre_existing_conditions_4'
        ]

        for col in expected_columns:

            if col not in df.columns:
                df[col] = 0

        # FINAL COLUMN ORDER

        df = df[expected_columns]

        app.logger.debug(
            f"Final Processed DataFrame:\n{df}"
        )

        # ---------------------------------------------------
        # MODEL PREDICTION
        # ---------------------------------------------------

        prediction = model.predict(df)

        probability = float(prediction[0][0])

        risk = 1 if probability >= 0.5 else 0

        result = "High Risk" if risk == 1 else "Low Risk"

        app.logger.info(
            f"Prediction Result: {result}"
        )

        # ---------------------------------------------------
        # RESPONSE
        # ---------------------------------------------------

        return jsonify({

            "result": result,

            "probability": round(probability, 4)

        })

    except Exception as e:

        app.logger.error(
            f"Error during prediction: {str(e)}"
        )

        return jsonify({

            "error": f"Prediction failed: {str(e)}"

        }), 400

# ---------------------------------------------------
# RUN APP
# ---------------------------------------------------

if __name__ == '__main__':

    import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))

    app.run(
        host='0.0.0.0',
        port=port
    )