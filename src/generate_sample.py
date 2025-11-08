import pandas as pd
import numpy as np

def generate_data():
    dates = pd.date_range("2022-01-01", "2024-06-01", freq="MS")
    rows = []
    for org in ["SME_A", "SME_B"]:
        revenue = np.round(np.linspace(10000, 20000, len(dates)) * (1 + np.random.normal(0, 0.05, len(dates))), 2)
        expenses = np.round(revenue * (0.6 + np.random.normal(0, 0.03, len(dates))), 2)
        for d, r, e in zip(dates, revenue, expenses):
            rows.append([d, org, "revenue", r])
            rows.append([d, org, "expenses", -e])
    df = pd.DataFrame(rows, columns=["date", "org", "category", "amount"])
    df.to_csv("data/sample_sme_financials.csv", index=False)
    print("✅ Sample data generated at data/sample_sme_financials.csv")

if __name__ == "__main__":
    generate_data()
