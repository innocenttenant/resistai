import os
import joblib
import pandas as pd
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv

# 1. Load Security Keys & Initialize Supabase
load_dotenv() # This grabs your URL and KEY from the .env file
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = None
try:
    if SUPABASE_URL and SUPABASE_KEY:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("Supabase client initialized.")
    else:
        print("Supabase skipped (keys missing).")
except Exception as e:
    print(f"Supabase init error: {e}")

# 2. Setup FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for local development
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Load the "Brain" and "Feature DNA"
# We go up one level from /api to find the /models folder
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'resistai_rf_model.pkl')
ENCODER_PATH = os.path.join(BASE_DIR, 'models', 'encoders', 'bacteria_encoder.pkl')
FEATURES_PATH = os.path.join(BASE_DIR, 'models', 'feature_names.pkl')

try:
    model = joblib.load(MODEL_PATH)
    le = joblib.load(ENCODER_PATH)
    feature_names = joblib.load(FEATURES_PATH)
    print("AI Brain & Encoders loaded successfully.")
except Exception as e:
    print(f"Error loading models: {e}")

# 4. Data Schemas
from api.schemas import PredictionRequest

# 5. The Prediction & Logging Engine
@app.post("/predict")
async def predict(request: PredictionRequest):
    try:
        # A. Translate Bacteria Name
        try:
            bac_encoded = le.transform([request.bacteria_name])[0]
        except:
            bac_encoded = 0 # Default if bacteria is unknown

        # B. Replicate Engineering Logic
        exposure_score = request.hospital_before * (request.infection_freq + 1)

        # C. Prepare Input for Random Forest
        input_data = pd.DataFrame([[
            request.age, request.gender, request.diabetes, request.hypertension,
            request.hospital_before, request.infection_freq, exposure_score, bac_encoded
        ]], columns=feature_names)

        # D. Run Prediction
        # Random Forest returns probabilities for each drug
        probs = model.predict_proba(input_data)
        drugs = ['AMX/AMP', 'AMC', 'CZ', 'FOX', 'CTX/CRO', 'IPM', 'GEN', 'AN', 'CIP']
        
        results = []
        for i, drug in enumerate(drugs):
            # Probability of resistance (class 1)
            risk = float(probs[i][0][1] * 100)
            status = "High Risk" if risk > 60 else "Moderate" if risk > 30 else "Low Risk"
            results.append({"drug": drug, "risk": round(risk, 2), "status": status})

        # Sort to find the safest (lowest risk) option
        results.sort(key=lambda x: x['risk'])
        top_option = results[0]

        # E. LOG TO SUPABASE (The "Phase 3" Integration)
        log_data = {
            "age": request.age,
            "gender": request.gender,
            "diabetes": request.diabetes,
            "hypertension": request.hypertension,
            "hospital_before": request.hospital_before,
            "infection_freq": request.infection_freq,
            "bacteria_name": request.bacteria_name,
            "recommended_drug": top_option['drug'],
            "risk_score": top_option['risk'],
            "status": top_option['status']
        }
        
        # This sends the data to your cloud table
        if supabase:
            try:
                supabase.table("patient_records").insert(log_data).execute()
            except Exception as e:
                print(f"Supabase logging failed: {e}")

        return {
            "top_drug": top_option['drug'],
            "all_results": results
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
