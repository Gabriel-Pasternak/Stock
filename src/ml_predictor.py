import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor

class MLPredictor:
    def __init__(self, data):
        self.data = data
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        
    def prepare_features(self):
        """Prepare features for ML model"""
        df = self.data.copy()
        
        # Create features
        df['SMA_20'] = df['Close'].rolling(window=20).mean()
        df['SMA_50'] = df['Close'].rolling(window=50).mean()
        df['Volume_MA'] = df['Volume'].rolling(window=20).mean()
        
        # Create target (next day's price)
        df['Target'] = df['Close'].shift(-1)
        
        # Drop NaN values
        df = df.dropna()
        
        # Select features
        features = ['Close', 'Volume', 'SMA_20', 'SMA_50', 'Volume_MA']
        X = df[features]
        y = df['Target']
        
        return X, y
        
    def train_model(self):
        """Train the ML model"""
        X, y = self.prepare_features()
        
        # Check if we have enough data
        if len(X) < 60:  # Minimum required data points
            raise ValueError("Insufficient data for analysis. Please select a longer time period.")
            
        # Determine test size based on data length
        test_size = min(0.2, 1/3)  # Use smaller test size for smaller datasets
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train model
        self.model.fit(X_train_scaled, y_train)
        
        return self.model.score(X_test_scaled, y_test)
        
    def predict_next_price(self):
        """Predict next day's price"""
        X, _ = self.prepare_features()
        if len(X) < 60:
            return self.data['Close'].iloc[-1]  # Return current price if insufficient data
            
        last_data = X.iloc[-1:].copy()
        last_data_scaled = self.scaler.transform(last_data)
        prediction = self.model.predict(last_data_scaled)[0]
        
        return prediction