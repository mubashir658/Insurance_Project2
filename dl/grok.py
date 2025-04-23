import json
import sys
import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder
from tensorflow.keras.models import load_model
import joblib
import os

class CustomerProminencePredictor:
    def __init__(self):
        # Get the directory of the current script
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.model_path = os.path.join(base_dir, 'prominence_model.h5')
        self.scaler_path = os.path.join(base_dir, 'scaler.save')
        self.columns_path = os.path.join(base_dir, 'training_columns.save')
        self.le_income_path = os.path.join(base_dir, 'le_income.save')
        self.le_num_policies_path = os.path.join(base_dir, 'le_num_policies.save')

        # Check for missing files
        missing_files = []
        for path in [self.model_path, self.scaler_path, self.columns_path, self.le_income_path, self.le_num_policies_path]:
            if not os.path.exists(path):
                missing_files.append(path)
        if missing_files:
            raise FileNotFoundError(f"Missing model files: {', '.join(missing_files)}")

        self.scaler = joblib.load(self.scaler_path)
        self.model = load_model(self.model_path)
        self.all_columns = joblib.load(self.columns_path)
        self.le_income = joblib.load(self.le_income_path)
        self.le_num_policies = joblib.load(self.le_num_policies_path)

    def preprocess_input(self, input_data):
        data = pd.DataFrame([input_data])

        # Map '0L-5L' to a supported income range (e.g., '2L-5L')
        income_map = {'0L-5L': '2L-5L'}  # Adjust based on le_income.classes_
        data['income'] = data['income'].replace(income_map)

        try:
            data['income'] = self.le_income.transform([data['income'].iloc[0]])
        except ValueError as e:
            raise ValueError(f"Income value {data['income'].iloc[0]} not in le_income.classes_: {self.le_income.classes_}")

        try:
            data['num_policies'] = self.le_num_policies.transform([data['num_policies'].iloc[0]])
        except ValueError as e:
            raise ValueError(f"Num policies value {data['num_policies'].iloc[0]} not in le_num_policies.classes_: {self.le_num_policies.classes_}")

        data['type_of_policy'] = {'Silver': 0, 'Gold': 1, 'Platinum': 2}[data['type_of_policy'].iloc[0]]

        gender_map = {'Male': [0, 1], 'Female': [1, 0]}
        data['gender_Female'], data['gender_Male'] = gender_map[data['gender'].iloc[0]]
        data.drop('gender', axis=1, inplace=True)

        area_map = {'Urban': [0, 1], 'Rural': [1, 0]}
        data['area_Rural'], data['area_Urban'] = area_map[data['area'].iloc[0]]
        data.drop('area', axis=1, inplace=True)

        qual_map = {'Bachelor': [1, 0, 0], 'High School': [0, 1, 0], 'Others': [0, 0, 1]}
        data['qualification_Bachelor'], data['qualification_High School'], data['qualification_Others'] = qual_map[data['qualification'].iloc[0]]
        data.drop('qualification', axis=1, inplace=True)

        policy_map = {'A': [1, 0, 0], 'B': [0, 1, 0], 'C': [0, 0, 1]}
        data['policy_A'], data['policy_B'], data['policy_C'] = policy_map[data['policy'].iloc[0]]
        data.drop('policy', axis=1, inplace=True)

        numeric_cols = ['income', 'claim_amount', 'vintage', 'type_of_policy']
        data[numeric_cols] = self.scaler.transform(data[numeric_cols])

        data['claim_income_ratio'] = data['claim_amount'] / (data['income'] + 1e-6)
        data['policy_vintage'] = data['type_of_policy'] * data['vintage']

        for col in self.all_columns:
            if col not in data.columns:
                data[col] = 0
        return data[self.all_columns]

    def predict_prominence(self, input_data):
        processed_data = self.preprocess_input(input_data)
        confidence = self.model.predict(processed_data, verbose=0)[0][0]
        prediction = int(confidence >= 0.5)
        return {
            'prominent': 'Yes' if prediction else 'No',
            'confidence': float(confidence) if prediction else float(1 - confidence),
            'probability_prominent': float(confidence),
            'interpretation': 'Above median CLTV' if prediction else 'Below median CLTV'
        }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Invalid input: Expected path to JSON file as argument"}))
        sys.exit(1)

    try:
        json_file_path = sys.argv[1]
        if not os.path.exists(json_file_path):
            print(json.dumps({"error": f"JSON file not found: {json_file_path}"}))
            sys.exit(1)

        with open(json_file_path, 'r') as f:
            input_data = json.load(f)

        predictor = CustomerProminencePredictor()
        result = predictor.predict_prominence(input_data)
        print(json.dumps(result))
    except json.JSONDecodeError as e:
        print(json.dumps({"error": f"JSON parsing error: {str(e)}"}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)