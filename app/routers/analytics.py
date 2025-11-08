from fastapi import APIRouter, HTTPException
import pandas as pd
import os

router = APIRouter()
DATA_PATH = "data/superstore_sales.csv"

def load_data():
    if not os.path.exists(DATA_PATH):
        raise HTTPException(status_code=404, detail="Dataset not found")
    return pd.read_csv(DATA_PATH)

@router.get("/state")
def analytics_by_state(state: str):
    df = load_data()
    filtered = df[df["State"] == state]
    if filtered.empty:
        raise HTTPException(status_code=404, detail="No data for this state")
    return [
        {
            "State": state,
            "Sales": filtered["Sales"].sum(),
            "Profit": filtered["Profit"].sum()
        }
    ]

@router.get("/city")
def analytics_by_city(city: str):
    df = load_data()
    filtered = df[df["City"] == city]
    if filtered.empty:
        raise HTTPException(status_code=404, detail="No data for this city")
    return [
        {
            "City": city,
            "Sales": filtered["Sales"].sum(),
            "Profit": filtered["Profit"].sum()
        }
    ]

@router.get("/product")
def analytics_by_product(product: str):
    df = load_data()
    filtered = df[df["Product Name"] == product]
    if filtered.empty:
        raise HTTPException(status_code=404, detail="No data for this product")
    return [
        {
            "Product": product,
            "Sales": filtered["Sales"].sum(),
            "Profit": filtered["Profit"].sum()
        }
    ]
