# app/main.py
from fastapi import FastAPI, Depends
from app.routers import dataset, analytics, prediction
from app.models import database
import pandas as pd
import os

app = FastAPI(title="Financial Analytics System")

# --- 1️⃣ Initialize Database ---
database.init_db()

# --- 2️⃣ Register Routers ---
app.include_router(dataset.router, prefix="/dataset", tags=["Dataset"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
app.include_router(prediction.router, prefix="/prediction", tags=["Prediction"])

# --- 3️⃣ Load Dataset from Data Folder ---
DATA_PATH = r"C:\Users\kvrus\OneDrive\Desktop\Everything\Projects\Python\financial_analytics_system\data\Sample - Superstore.csv"

if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(f"Dataset not found at: {DATA_PATH}")

# Load once at startup
df = pd.read_csv(DATA_PATH, encoding='ISO-8859-1')
print(f"✅ Loaded dataset with {len(df)} records and {len(df.columns)} columns.")

# --- 4️⃣ Dependency to share df across routers ---
def get_df():
    return df

# --- 5️⃣ Root endpoint ---
@app.get("/")
def root():
    return {"message": "Financial Analytics System API is running."}
