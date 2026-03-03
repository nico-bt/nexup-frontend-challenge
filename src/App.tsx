import React from 'react';
import './App.css';
import { ProductManager } from './components/ProductManager';
import { Header } from './components/Header';

const App: React.FC = () => {
  return (
    <div className="container">
      <Header />
      <ProductManager />
    </div>
  );
};

export default App;
