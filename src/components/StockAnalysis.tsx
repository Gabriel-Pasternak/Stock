import React, { useState } from 'react';
import StockForm from './StockForm';
import StockResults from './StockResults';
import { useStockAnalysis } from '../hooks/useStockAnalysis';

const StockAnalysis = () => {
  const [symbol, setSymbol] = useState('');
  const [period, setPeriod] = useState('1y');
  
  const { data, isLoading, error, analyze } = useStockAnalysis();

  const handleSubmit = async (formSymbol: string, formPeriod: string) => {
    setSymbol(formSymbol);
    setPeriod(formPeriod);
    await analyze(formSymbol, formPeriod);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <StockForm onSubmit={handleSubmit} isLoading={isLoading} />
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error.message}
        </div>
      )}
      {data && <StockResults data={data} symbol={symbol} period={period} />}
    </div>
  );
};

export default StockAnalysis;