from fastapi import APIRouter
from pydantic import BaseModel
import joblib
import pandas as pd
import os

router = APIRouter()
MODEL_PATH = "app/ml/model.pkl"

class PredictInput(BaseModel):
    Quantity: int
    Discount: float
    Category: str
    Sub_Category: str
    Region: str

@router.post("/")
def predict_sales(data: PredictInput):
    if not os.path.exists(MODEL_PATH):
        return {"error": "Model not trained yet"}
    
    model_data = joblib.load(MODEL_PATH)
    model = model_data["model"]
    encoders = model_data["encoders"]

    # Prepare input
    input_dict = data.dict()
    df = pd.DataFrame([input_dict])

    for col, encoder in encoders.items():
        df[col] = encoder.transform(df[col])

    prediction = model.predict(df)[0]
    return {"predicted_sales": round(prediction, 2)}
