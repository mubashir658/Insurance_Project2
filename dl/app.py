from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
import logging
import os

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# ---------------------------------------------------
# LOAD MODEL AND SCALER
# ---------------------------------------------------
try:
    model = tf.keras.models.load_model("prominence_model.h5", compile=False)
    scaler = joblib.load("scaler.pkl")
    app.logger.info("Model and scaler loaded successfully.")
except Exception as e:
    app.logger.error(f"Error loading model or scaler: {str(e)}")
    raise e

# ---------------------------------------------------
# NUMERICAL COLUMNS
# ---------------------------------------------------
numerical_cols = ["age", "bmi", "dependents", "hospital_visits_last_year"]

# ---------------------------------------------------
# EXPECTED COLUMNS
# ---------------------------------------------------
expected_columns = [
    "age", "bmi", "smoker", "dependents", "hospital_visits_last_year",
    "chronic_disease", "physical_activity_level", "alcohol_consumption",
    "gender", "income",
    "pre_existing_conditions_0", "pre_existing_conditions_1",
    "pre_existing_conditions_2", "pre_existing_conditions_3",
    "pre_existing_conditions_4"
]

# ---------------------------------------------------
# VALID CATEGORICAL VALUES
# ---------------------------------------------------
valid_categorical_values = {
    "smoker": [0, 1],
    "chronic_disease": [0, 1],
    "gender": [0, 1],
    "physical_activity_level": [0, 1, 2],
    "alcohol_consumption": [0, 1, 2],
    "income": [0, 1, 2],
    "pre_existing_conditions": [0, 1, 2, 3, 4]
}

@app.route("/")
def home():
    return jsonify({"message": "Insurance Risk Prediction API Running"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        input_data = {
            "age": float(data.get("age", 0)),
            "bmi": float(data.get("bmi", 0)),
            "smoker": int(data.get("smoker", -1)),
            "dependents": int(data.get("dependents", 0)),
            "hospital_visits_last_year": int(data.get("hospital_visits_last_year", 0)),
            "chronic_disease": int(data.get("chronic_disease", -1)),
            "physical_activity_level": int(data.get("physical_activity_level", -1)),
            "alcohol_consumption": int(data.get("alcohol_consumption", -1)),
            "gender": int(data.get("gender", -1)),
            "income": int(data.get("income", -1)),
            "pre_existing_conditions": int(data.get("pre_existing_conditions", -1))
        }

        # Validations
        if input_data["age"] < 18 or input_data["age"] > 100:
            return jsonify({"error": "Age must be between 18 and 100"}), 400
        if input_data["bmi"] < 10 or input_data["bmi"] > 50:
            return jsonify({"error": "BMI must be between 10 and 50"}), 400
        if input_data["dependents"] < 0 or input_data["dependents"] > 10:
            return jsonify({"error": "Dependents must be between 0 and 10"}), 400
        if input_data["hospital_visits_last_year"] < 0 or input_data["hospital_visits_last_year"] > 50:
            return jsonify({"error": "Hospital visits must be between 0 and 50"}), 400

        for col, valid_vals in valid_categorical_values.items():
            if input_data[col] not in valid_vals:
                return jsonify({"error": f"Invalid value for {col}"}), 400

        # Create DataFrame
        df = pd.DataFrame([input_data])

        # Scale numerical columns
        df[numerical_cols] = scaler.transform(df[numerical_cols])

        # One Hot Encoding
        df = pd.get_dummies(df, columns=["pre_existing_conditions"], 
                           prefix="pre_existing_conditions", dtype=int)

        # Ensure all columns
        for col in expected_columns:
            if col not in df.columns:
                df[col] = 0

        df = df[expected_columns]

        # Predict
        prediction = model.predict(df, verbose=0)
        probability = float(prediction[0][0])
        risk = 1 if probability >= 0.5 else 0

        result = "High Risk" if risk == 1 else "Low Risk"

        return jsonify({
            "result": result,
            "probability": round(probability, 4)
        })

    except Exception as e:
        app.logger.error(str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 7860))
    app.run(host="0.0.0.0", port=port)