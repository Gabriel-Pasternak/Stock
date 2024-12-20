from utils.indicators import calculate_sma, calculate_rsi
from ml_predictor import MLPredictor

class StockAnalyzer:
    def __init__(self, data):
        self.data = data
        self.ml_predictor = MLPredictor(data)
        
    def analyze(self):
        """Perform comprehensive analysis"""
        if len(self.data) < 20:
            raise ValueError("Insufficient data for analysis. Please select a longer time period.")
            
        current_price = self.data['Close'].iloc[-1]
        
        # Calculate technical indicators
        sma_20 = self.data['Close'].rolling(window=min(20, len(self.data))).mean().iloc[-1]
        sma_50 = self.data['Close'].rolling(window=min(50, len(self.data))).mean().iloc[-1]
        
        # Calculate RSI with adjusted period for small datasets
        rsi_period = min(14, len(self.data) - 1)
        delta = self.data['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=rsi_period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=rsi_period).mean()
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs)).iloc[-1]
        
        try:
            # Train ML model and get prediction
            model_accuracy = self.ml_predictor.train_model()
            predicted_price = self.ml_predictor.predict_next_price()
        except ValueError as e:
            # If ML fails, use simple moving average prediction
            model_accuracy = 0
            predicted_price = sma_20
        
        return {
            'current_price': current_price,
            'sma_20': sma_20,
            'sma_50': sma_50,
            'rsi': rsi,
            'predicted_price': predicted_price,
            'model_accuracy': model_accuracy
        }
        
    def get_recommendation(self):
        """Generate trading recommendation"""
        analysis = self.analyze()
        
        current_price = analysis['current_price']
        predicted_price = analysis['predicted_price']
        rsi = analysis['rsi']
        sma_20 = analysis['sma_20']
        sma_50 = analysis['sma_50']
        
        # Price prediction signal
        price_signal = "BULLISH" if predicted_price > current_price else "BEARISH"
        
        # Decision logic
        if rsi > 70:
            return "SELL", f"RSI indicates overbought conditions (RSI: {rsi:.2f}). ML predicts: ${predicted_price:.2f} ({price_signal})"
        elif rsi < 30:
            return "BUY", f"RSI indicates oversold conditions (RSI: {rsi:.2f}). ML predicts: ${predicted_price:.2f} ({price_signal})"
        elif current_price > sma_20 and predicted_price > current_price:
            return "BUY", f"Upward trend confirmed by ML prediction: ${predicted_price:.2f} ({price_signal})"
        elif current_price < sma_20 and predicted_price < current_price:
            return "SELL", f"Downward trend confirmed by ML prediction: ${predicted_price:.2f} ({price_signal})"
        else:
            return "HOLD", f"No clear trend. ML predicts: ${predicted_price:.2f} ({price_signal})"