import pandas as pd
import joblib
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

def train_rf_model():
    data_path = 'data/processed/cleaned.csv'
    if not os.path.exists(data_path):
        print("Error: cleaned.csv not found. Did you run processor.py?")
        return

    df = pd.read_csv(data_path)
    
    # 1. Explicit Targets and Features (The Fix)
    targets = ['AMX/AMP', 'AMC', 'CZ', 'FOX', 'CTX/CRO', 'IPM', 'GEN', 'AN', 'CIP']
    
    # We strictly define the numeric columns we engineered, locking out any rogue text data
    features = [
        'age', 'gender', 'Diabetes', 'Hypertension', 
        'Hospital_before', 'Infection_Freq', 'exposure_score', 'bac_encoded'
    ]
    
    X = df[features]
    y = df[targets]

    # 2. The Precision Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print(f"Starting Platinum Training Session (Random Forest)...")
    print(f"Training on {len(X_train)} records, Testing on {len(X_test)} records.")

    # 3. Initialize the Random Forest Engine
    base_model = RandomForestClassifier(
        n_estimators=200,
        max_depth=15,
        min_samples_split=5,
        random_state=42,
        n_jobs=-1
    )
    
    model = MultiOutputClassifier(base_model)
    
    print("Training the Multi-Output Forest (This may take a few seconds)...")
    model.fit(X_train, y_train)

    # 4. Advanced Clinical Evaluation
    y_pred = model.predict(X_test)
    
    print("\n" + "="*35)
    print(" FINAL ACCURACY PER ANTIBIOTIC ")
    print("="*35)
    
    for i, drug in enumerate(targets):
        score = accuracy_score(y_test.iloc[:, i], y_pred[:, i])
        print(f"{drug.ljust(10)} : {score:.2%}")

    exact_match = accuracy_score(y_test, y_pred)
    print("\n" + "="*35)
    print(f"Overall Exact Match Score: {exact_match:.2%}")
    print("="*35)

    # 5. Save the Brain State
    os.makedirs('models', exist_ok=True)
    joblib.dump(model, 'models/resistai_rf_model.pkl')
    joblib.dump(features, 'models/feature_names.pkl')
    
    print("\nSuccess: Random Forest Brain and Feature DNA saved to /models/")

if __name__ == "__main__":
    train_rf_model()
