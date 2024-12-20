import React, { useState } from 'react';
import StockAnalysis from './components/StockAnalysis';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <StockAnalysis />
      </main>
    </div>
  );
}

export default App;