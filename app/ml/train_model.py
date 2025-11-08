import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder
import joblib
import os

DATA_PATH = "data/superstore_sales.csv"
MODEL_PATH = "app/ml/model.pkl"

def train_and_save_model():
    if not os.path.exists(DATA_PATH):
        print("No dataset found, skipping training.")
        return

    df = pd.read_csv(DATA_PATH)
    features = ["Quantity", "Discount", "Category", "Sub-Category", "Region"]
    target = "Sales"

    for col in ["Category", "Sub-Category", "Region"]:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        df[col] = le.transform(df[col])
        joblib.dump(le, f"app/ml/{col}_encoder.pkl")

    X = df[features]
    y = df[target]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = LinearRegression()
    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    print(f"Model trained successfully. R² Score: {score:.3f}")

    encoders = {col: joblib.load(f"app/ml/{col}_encoder.pkl") for col in ["Category", "Sub-Category", "Region"]}
    joblib.dump({"model": model, "encoders": encoders}, MODEL_PATH)
