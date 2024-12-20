import React from 'react';
import { AnalysisResult } from '../types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface StockResultsProps {
  data: AnalysisResult;
  symbol: string;
  period: string;
}

const StockResults = ({ data, symbol, period }: StockResultsProps) => {
  const chartData = [
    { name: 'Current', price: data.current_price },
    { name: 'Predicted', price: data.predicted_price }
  ];

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Analysis Results for {symbol}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Price Information</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600">Current Price:</dt>
              <dd className="font-medium">${data.current_price.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Predicted Price:</dt>
              <dd className="font-medium">${data.predicted_price.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">20-day SMA:</dt>
              <dd className="font-medium">${data.sma_20.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">50-day SMA:</dt>
              <dd className="font-medium">${data.sma_50.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">RSI:</dt>
              <dd className="font-medium">{data.rsi.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">ML Model Accuracy:</dt>
              <dd className="font-medium">{(data.model_accuracy * 100).toFixed(2)}%</dd>
            </div>
          </dl>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Price Prediction</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#3B82F6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Recommendation</h3>
        <p className="text-xl font-bold text-blue-600">{data.recommendation}</p>
        <p className="mt-2 text-gray-600">{data.reasoning}</p>
      </div>
    </div>
  );
};

export default StockResults;