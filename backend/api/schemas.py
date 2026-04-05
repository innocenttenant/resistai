from pydantic import BaseModel

class PredictionRequest(BaseModel):
    age: float
    gender: int
    diabetes: int
    hypertension: int
    hospital_before: int
    infection_freq: int
    bacteria_name: str
