import pandas as pd
import os
from typing import Tuple
from sklearn.preprocessing import LabelEncoder, StandardScaler

# --- Path Configuration ---
DATA_PATH = r"C:\Users\kvrus\OneDrive\Desktop\Everything\Projects\Python\financial_analytics_system\data\Sample - Superstore.csv"

# --- 1️⃣ Load Dataset ---
def load_dataset(path: str = DATA_PATH) -> pd.DataFrame:
    """Load the Superstore dataset safely with validation."""
    if not os.path.exists(path):
        raise FileNotFoundError(f"❌ Dataset not found at: {path}")
    df = pd.read_csv(path, encoding='utf-8', low_memory=False)
    print(f"✅ Loaded dataset with {len(df)} rows and {len(df.columns)} columns.")
    return df


# --- 2️⃣ Basic Cleaning ---
def clean_dataset(df: pd.DataFrame) -> pd.DataFrame:
    """Basic cleaning: drop duplicates, handle missing values, normalize column names."""
    df = df.drop_duplicates()
    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")
    df = df.fillna(0)
    return df


# --- 3️⃣ Encode Categorical Features ---
def encode_features(df: pd.DataFrame) -> Tuple[pd.DataFrame, dict]:
    """Label encode all categorical columns and return the encoders used."""
    encoders = {}
    for col in df.select_dtypes(include=['object']).columns:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        encoders[col] = le
    return df, encoders


# --- 4️⃣ Scale Numerical Columns ---
def scale_features(df: pd.DataFrame) -> Tuple[pd.DataFrame, StandardScaler]:
    """Standard scale numeric columns."""
    scaler = StandardScaler()
    numeric_cols = df.select_dtypes(include=['int64', 'float64']).columns
    df[numeric_cols] = scaler.fit_transform(df[numeric_cols])
    return df, scaler


# --- 5️⃣ Save Processed Data (Optional) ---
def save_processed_data(df: pd.DataFrame, filename: str = "processed_superstore.csv"):
    """Save cleaned dataset for reuse."""
    out_path = os.path.join(os.path.dirname(DATA_PATH), filename)
    df.to_csv(out_path, index=False)
    print(f"💾 Processed data saved to {out_path}")
