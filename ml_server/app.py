from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import traceback

app = Flask(__name__)
CORS(app)


RISK_MODEL_PATH = "model/rf_model.pkl"
FEATURE_COLS_PATH = "model/feature_columns.pkl"
LE_RISK_PATH = "model/le_risk.pkl"

# Load assets
risk_model = joblib.load(RISK_MODEL_PATH)
feature_columns = joblib.load(FEATURE_COLS_PATH)
le_risk = joblib.load(LE_RISK_PATH)

@app.route("/health")
def health():
    return jsonify({"status": "ok", "model": "risk-only"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)

        record = {k: data.get(k, 0) for k in feature_columns}

        df = pd.DataFrame([record], columns=feature_columns)
        df = df.apply(pd.to_numeric, errors="coerce").fillna(0)

        encoded_pred = risk_model.predict(df)[0]
        risk_label = le_risk.inverse_transform([encoded_pred])[0]

        return jsonify({"risk": risk_label})

    except Exception as e:
        print("🔥 Error:", traceback.format_exc())
        return jsonify({"error": "prediction_failed", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
