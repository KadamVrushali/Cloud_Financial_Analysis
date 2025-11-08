from prophet import Prophet
import pandas as pd
import matplotlib.pyplot as plt
import os

def train_forecast(data_path="data/processed.csv", output_dir="models"):
    os.makedirs(output_dir, exist_ok=True)
    df = pd.read_csv(data_path, parse_dates=["date"])
    
    results = []
    for org in df["org"].unique():
        temp = df[df["org"] == org]
        ts = temp[["date", "revenue"]].rename(columns={"date": "ds", "revenue": "y"})
        
        model = Prophet(yearly_seasonality=True, weekly_seasonality=False)
        model.fit(ts)
        
        future = model.make_future_dataframe(periods=12, freq="M")
        forecast = model.predict(future)
        
        # Save forecast
        forecast.to_csv(f"{output_dir}/{org}_forecast.csv", index=False)
        
        # Plot
        model.plot(forecast)
        plt.title(f"Revenue Forecast for {org}")
        plt.tight_layout()
        plt.savefig(f"{output_dir}/{org}_forecast_plot.png")
        plt.close()
        
        results.append((org, forecast["yhat"].iloc[-12:].mean()))
    
    print("✅ Forecasting done. Results saved in 'models/' directory.")
    return results

if __name__ == "__main__":
    train_forecast()
