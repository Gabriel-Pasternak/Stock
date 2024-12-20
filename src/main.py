from data_fetcher import fetch_stock_data
from stock_analyzer import StockAnalyzer
import sys

def validate_symbol(symbol):
    """Validate the input symbol"""
    if not symbol or not isinstance(symbol, str):
        return False
    return True

def main():
    print("Advanced Stock Analysis Tool")
    print("-" * 50)
    
    try:
        # Get user input
        if len(sys.argv) > 1:
            symbol = sys.argv[1].upper()
        else:
            symbol = input("Enter stock/index symbol (e.g., AAPL, ^GSPC): ").upper()
        
        if not validate_symbol(symbol):
            raise ValueError("Invalid symbol provided")
            
        # Get analysis period
        period = input("Enter analysis period (1d/5d/1mo/3mo/6mo/1y/2y/5y/10y/ytd/max) [default: 1y]: ")
        if not period:
            period = "1y"
            
        # Fetch stock data
        print(f"\nFetching data for {symbol}...")
        data = fetch_stock_data(symbol, period)
        
        # Create analyzer instance
        print("Analyzing data and training ML model...")
        analyzer = StockAnalyzer(data)
        
        # Get analysis and recommendation
        analysis = analyzer.analyze()
        recommendation, reasoning = analyzer.get_recommendation()
        
        # Display results
        print("\nAnalysis Results:")
        print(f"Symbol: {symbol}")
        print(f"Period: {period}")
        print(f"Current Price: ${analysis['current_price']:.2f}")
        print(f"20-day SMA: ${analysis['sma_20']:.2f}")
        print(f"50-day SMA: ${analysis['sma_50']:.2f}")
        print(f"RSI: {analysis['rsi']:.2f}")
        print(f"ML Model Accuracy: {analysis['model_accuracy']:.2%}")
        print(f"Predicted Next Price: ${analysis['predicted_price']:.2f}")
        print(f"\nRecommendation: {recommendation}")
        print(f"Reasoning: {reasoning}")
        
    except KeyboardInterrupt:
        print("\nAnalysis cancelled by user")
        sys.exit(0)
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()