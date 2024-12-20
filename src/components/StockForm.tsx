import React, { useState } from 'react';

interface StockFormProps {
  onSubmit: (symbol: string, period: string) => void;
  isLoading: boolean;
}

const StockForm = ({ onSubmit, isLoading }: StockFormProps) => {
  const [symbol, setSymbol] = useState('');
  const [period, setPeriod] = useState('1y');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(symbol.toUpperCase(), period);
  };

  const periods = [
    { value: '1d', label: '1 Day' },
    { value: '5d', label: '5 Days' },
    { value: '1mo', label: '1 Month' },
    { value: '3mo', label: '3 Months' },
    { value: '6mo', label: '6 Months' },
    { value: '1y', label: '1 Year' },
    { value: '2y', label: '2 Years' },
    { value: '5y', label: '5 Years' },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
          Stock Symbol
        </label>
        <input
          type="text"
          id="symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="e.g., AAPL, MSFT"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="period" className="block text-sm font-medium text-gray-700">
          Analysis Period
        </label>
        <select
          id="period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {periods.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Stock'}
      </button>
    </form>
  );
};

export default StockForm;