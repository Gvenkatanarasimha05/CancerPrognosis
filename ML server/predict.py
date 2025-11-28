# predict.py
import os
import pandas as pd
import numpy as np
import joblib

# Check if model exists
if not os.path.exists('model/rf_model.pkl'):
    raise FileNotFoundError(" Model not found. Please run 'train_model.py' first.")

# Load artifacts
print("Loading model and encoders...")
model = joblib.load('model/rf_model.pkl')
le_cancer = joblib.load('model/le_cancer.pkl')
le_risk = joblib.load('model/le_risk.pkl')
feature_columns = joblib.load('model/feature_columns.pkl')

# Load new data
new_df = pd.read_csv('new_patients.csv')
print(f" Loaded {len(new_df)} new patient(s).")

# Validate columns
missing = set(feature_columns) - set(new_df.columns)
if missing:
    raise ValueError(f"❌ Missing columns in new  {missing}")

X_new = new_df[feature_columns].copy()

# Safe encoding for Cancer_Type (handle unseen labels)
def safe_encode(series, encoder):
    mask = series.isin(encoder.classes_)
    encoded = np.full(len(series), -1, dtype=int)
    encoded[mask] = encoder.transform(series[mask])
    return encoded

X_new['Cancer_Type'] = safe_encode(X_new['Cancer_Type'], le_cancer)

# Predict
pred_encoded = model.predict(X_new)
pred_proba = model.predict_proba(X_new)
pred_labels = le_risk.inverse_transform(pred_encoded)

# Prepare result
result = new_df.copy()
result['Predicted_Risk_Level'] = pred_labels
for i, cls in enumerate(le_risk.classes_):
    result[f'Prob_{cls}'] = pred_proba[:, i]

# Output
print("\n" + "="*60)
print(" PREDICTION RESULTS")
print("="*60)
print(result[['Predicted_Risk_Level'] + [f'Prob_{c}' for c in le_risk.classes_]].to_string(index=False))

# Save output
result.to_csv('predicted_risks.csv', index=False)
print(f"\n Full results saved to 'predicted_risks.csv'")