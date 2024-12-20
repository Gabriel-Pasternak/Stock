import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold">Stock Analysis Tool</h1>
        <p className="mt-2 text-blue-100">Advanced stock analysis with ML predictions</p>
      </div>
    </header>
  );
};

export default Header;