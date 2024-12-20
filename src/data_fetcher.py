import yfinance as yf
import pandas as pd

def fetch_stock_data(symbol, period='1y'):
    """Fetch stock data using Yahoo Finance"""
    try:
        ticker = yf.Ticker(symbol)
        df = ticker.history(period=period)
        
        if df.empty:
            raise ValueError(f"No data found for {symbol}")
            
        return df
        
    except Exception as e:
        raise Exception(f"Failed to fetch data for {symbol}: {str(e)}")