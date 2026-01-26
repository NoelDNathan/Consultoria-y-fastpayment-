
import React, { useState } from 'react';
import Home from './components/Home';
import FastPayment from './components/FastPayment';
import Consultancy from './components/Consultancy';
import Payments from './components/Payments';
import './styles.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'fastpay' | 'consultancy' | 'payments'>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'fastpay': return <FastPayment />;
      case 'consultancy': return <Consultancy />;
      case 'payments': return <Payments />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="pks-app">
      <nav className="pks-nav">
        <div className="pks-nav__logo" onClick={() => setCurrentPage('home')}>
          PACKENGERS <span style={{color: 'var(--pks-color-secondary)'}}>+</span>
        </div>
        <div className="pks-nav__links">
          <button className={`pks-nav__link bg-transparent border-none cursor-pointer ${currentPage === 'home' ? 'opacity-100' : ''}`} onClick={() => setCurrentPage('home')}>Inicio</button>
          <button className={`pks-nav__link bg-transparent border-none cursor-pointer ${currentPage === 'fastpay' ? 'opacity-100' : ''}`} onClick={() => setCurrentPage('fastpay')}>Fast Payment</button>
          <button className={`pks-nav__link bg-transparent border-none cursor-pointer ${currentPage === 'consultancy' ? 'opacity-100' : ''}`} onClick={() => setCurrentPage('consultancy')}>Consultoría</button>
          <button className={`pks-nav__link bg-transparent border-none cursor-pointer ${currentPage === 'payments' ? 'opacity-100' : ''}`} onClick={() => setCurrentPage('payments')}>Pagos</button>
        </div>
      </nav>

      <main>
        {renderPage()}
      </main>

      <footer className="bg-[#002244] text-white py-8 text-center mt-20">
        <p>&copy; 2024 Packengers. Soluciones logísticas inteligentes.</p>
      </footer>
    </div>
  );
};

export default App;
