from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import io
import os

router = APIRouter()
DATA_PATH = "data/superstore_sales.csv"

@router.get("/")
def get_dataset_summary():
    if not os.path.exists(DATA_PATH):
        raise HTTPException(status_code=404, detail="Dataset not found")
    try:
        df = pd.read_csv(DATA_PATH, encoding="ISO-8859-1")  # safer encoding
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading dataset: {str(e)}")
    
    return {
        "rows": len(df),
        "columns": list(df.columns),
        "sample": df.head(5).to_dict(orient="records")
    }

@router.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("ISO-8859-1")))  # handle special chars
        os.makedirs(os.path.dirname(DATA_PATH), exist_ok=True)  # ensure folder exists
        df.to_csv(DATA_PATH, index=False)
        return {"message": "Dataset uploaded successfully", "rows": len(df)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload dataset: {str(e)}")

@router.delete("/delete")
def delete_dataset():
    if os.path.exists(DATA_PATH):
        os.remove(DATA_PATH)
        return {"message": "Dataset deleted"}
    raise HTTPException(status_code=404, detail="No dataset found to delete")
