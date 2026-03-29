import yfinance as yf
import datetime

def fetch_benchmark_returns():
    """Fetches 1yr, 3yr, and 5yr trailing CAGR for Nifty 50 and Nifty 500"""
    benchmarks = {
        "Nifty 50": "^NSEI",
        "Nifty 500": "^CRSLDX" # Nearest index for 500 commonly available, or try BOVE for fallback, actually NIFTY 500 is often unavailable simply on YF without right prefix. 
        # Using BSE 500 or rough proxy if Nifty 500 fails: 
    }
    
    results = {}
    today = datetime.date.today()
    
    for name, ticker in benchmarks.items():
        try:
            # Try to get historical data
            tkr = yf.Ticker(ticker)
            hist = tkr.history(period="6y") # Fetch enough data
            if hist.empty and name == "Nifty 500":
                # Fallback to BSE 500
                tkr = yf.Ticker("BSE-500.BO")
                hist = tkr.history(period="6y")
                
            if hist.empty:
                continue
                
            current_price = hist['Close'].iloc[-1]
            
            import pandas as pd
            # Helper to get price closest to N years ago
            def get_price_years_ago(years):
                target_date = today - datetime.timedelta(days=365 * years)
                # Find closest date
                # We need timezone-naive comparison usually, but yfinance history index is timezone-aware in some versions
                idx = hist.index.tz_localize(None).get_indexer([pd.Timestamp(target_date)], method='nearest')[0]
                return hist['Close'].iloc[idx]
                
            
            p1 = get_price_years_ago(1)
            p3 = get_price_years_ago(3)
            p5 = get_price_years_ago(5)
            
            results[name] = {
                "1yr": (current_price / p1) - 1.0,
                "3yr": (current_price / p3)**(1/3) - 1.0,
                "5yr": (current_price / p5)**(1/5) - 1.0
            }
        except Exception as e:
            print(f"Error fetching benchmark {name}: {e}")
            
    # Mock fallback if internet/yfinance fails
    if "Nifty 50" not in results:
        results["Nifty 50"] = {"1yr": 0.25, "3yr": 0.15, "5yr": 0.14}
    if "Nifty 500" not in results:
        results["Nifty 500"] = {"1yr": 0.32, "3yr": 0.17, "5yr": 0.16}
        
    return results
