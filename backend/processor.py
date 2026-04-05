import pandas as pd
import joblib
import os
from sklearn.preprocessing import LabelEncoder

def clean_data():
    raw_path = 'data/raw/Bacteria_dataset_Multiresictance.csv'
    
    if not os.path.exists(raw_path):
        print(f"Error: Raw data file not found at {raw_path}")
        return

    df = pd.read_csv(raw_path)
    
    # 1. Standardize Age and Gender (Extract and Replace)
    split = df['age/gender'].str.split('/', expand=True)
    df['age'] = pd.to_numeric(split[0], errors='coerce')
    df['gender'] = split[1].str.strip().str.upper().map({'M': 0, 'F': 1})

    # 2. Map Clinical Indicators (Overwrite original columns)
    def map_clinical(val):
        v = str(val).lower().strip()
        if v in ['yes', '1.0', '1', 'true']: return 1
        return 0

    clinical_cols = ['Diabetes', 'Hypertension', 'Hospital_before']
    for col in clinical_cols:
        df[col] = df[col].apply(map_clinical)

    # 3. Handle Infection Frequency (Overwrite "unknown", "error", etc. with 0)
    # This specifically removes the "unknown" text you noticed
    df['Infection_Freq'] = pd.to_numeric(df['Infection_Freq'], errors='coerce').fillna(0)
    df['exposure_score'] = df['Hospital_before'] * (df['Infection_Freq'] + 1)

    # 4. Universal Antibiotic Mapping (Safety-First)
    def map_resistance(val):
        if pd.isna(val): return 0
        v = str(val).strip().upper()
        # R, I, and Intermediate are mapped to 1 (Resistant) for Clinical Safety
        if v in ['R', 'RESISTANT', 'I', 'INTERMEDIATE']:
            return 1
        return 0 # All other terms (S, s, unknown, etc.) become 0

    # List of every possible antibiotic column in your dataset
    all_drugs = [
        'AMX/AMP', 'AMC', 'CZ', 'FOX', 'CTX/CRO', 'IPM', 'GEN', 'AN', 
        'Acide nalidixique', 'ofx', 'CIP', 'C', 'Co-trimoxazole', 'Furanes', 'colistine'
    ]
    
    for d in all_drugs:
        if d in df.columns:
            df[d] = df[d].apply(map_resistance)

    # 5. Pathogen Encoding
    le = LabelEncoder()
    # Extracts "Escherichia coli" from "S290 Escherichia coli"
    df['bacteria_name'] = df['Souches'].str.split(' ', n=1).str[1]
    df['bac_encoded'] = le.fit_transform(df['bacteria_name'].astype(str))
    
    # 6. Final Clean-Up: Drop raw text columns to keep the file pure
    # We remove the columns we've already extracted data from
    cols_to_drop = ['age/gender', 'Souches', 'Notes', 'Collection_Date']
    df_final = df.drop(columns=[c for c in cols_to_drop if c in df.columns])
    
    # Remove records where critical demographics (Age/Gender) are missing
    df_final = df_final.dropna(subset=['age', 'gender'])
    
    # Save artifacts
    os.makedirs('models/encoders', exist_ok=True)
    os.makedirs('data/processed', exist_ok=True)
    joblib.dump(le, 'models/encoders/bacteria_encoder.pkl')
    
    df_final.to_csv('data/processed/cleaned.csv', index=False)
    
    print(f"Processing Complete: {len(df_final)} records sanitized.")

if __name__ == "__main__":
    clean_data()
