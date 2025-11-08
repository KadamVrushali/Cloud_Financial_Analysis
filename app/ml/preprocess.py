import pandas as pd
from sklearn.model_selection import train_test_split
from app.utils import load_dataset, clean_dataset, encode_features, scale_features

def prepare_ml_data(target_column: str = "sales"):
    """
    Full preprocessing pipeline for ML:
    1. Load + clean dataset
    2. Encode + scale features
    3. Split into train/test sets
    """
    # Step 1: Load + clean
    df = load_dataset()
    df = clean_dataset(df)

    # Step 2: Encode + scale
    df, _ = encode_features(df)
    df, _ = scale_features(df)

    # Step 3: Verify target column
    if target_column not in df.columns:
        raise ValueError(f"Target column '{target_column}' not found in dataset columns: {list(df.columns)}")

    # Step 4: Split into features and target
    X = df.drop(columns=[target_column])
    y = df[target_column]

    # Step 5: Split train/test
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    print(f"✅ Data ready for training: {X_train.shape[0]} train rows, {X_test.shape[0]} test rows.")
    return X_train, X_test, y_train, y_test
