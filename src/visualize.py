import pandas as pd
import matplotlib.pyplot as plt

def show_summary(processed_path="data/processed.csv"):
    df = pd.read_csv(processed_path, parse_dates=["date"])
    orgs = df["org"].unique()

    for org in orgs:
        temp = df[df["org"] == org]
        plt.figure(figsize=(8,4))
        plt.plot(temp["date"], temp["revenue"], label="Revenue")
        plt.plot(temp["date"], -temp["expenses"], label="Expenses")
        plt.plot(temp["date"], temp["net_income"], label="Net Income", linestyle="--")
        plt.title(f"Financial Overview - {org}")
        plt.legend()
        plt.tight_layout()
        plt.savefig(f"data/{org}_overview.png")
        plt.close()
    print("✅ Overview plots saved in data/ folder")

if __name__ == "__main__":
    show_summary()
