import pandas as pd

def preprocess(input_path="data/sample_sme_financials.csv", output_path="data/processed.csv"):
    df = pd.read_csv(input_path, parse_dates=["date"])
    
    # Aggregate by month, org, category
    agg = df.groupby(["org", pd.Grouper(key="date", freq="M"), "category"])["amount"].sum().reset_index()
    pivot = agg.pivot_table(index=["org", "date"], columns="category", values="amount", fill_value=0).reset_index()
    
    # Calculate net income and rolling averages
    pivot["net_income"] = pivot["revenue"] + pivot["expenses"]
    pivot["revenue_rolling_3m"] = pivot.groupby("org")["revenue"].rolling(3).mean().reset_index(level=0, drop=True)
    pivot["expense_rolling_3m"] = pivot.groupby("org")["expenses"].rolling(3).mean().reset_index(level=0, drop=True)
    
    pivot.to_csv(output_path, index=False)
    print(f"✅ Processed data saved to {output_path}")

    return pivot

if __name__ == "__main__":
    preprocess()
