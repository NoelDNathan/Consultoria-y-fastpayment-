
import React from 'react';

interface HomeProps {
  onNavigate: (page: 'home' | 'fastpay' | 'consultancy' | 'payments') => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="pks-home-container">
      <section className="text-center py-28 px-6 bg-white">
        <h1 className="text-5xl md:text-7xl font-black text-[#003366] mb-8 tracking-tighter">
          Impulsamos tu <span className="text-[#FF8C00]">Logística</span>
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
          ¿Necesitas liquidez inmediata, transformar tu empresa o gestionar tus transacciones? 
          Selecciona tu solución.
        </p>
      </section>

      <div className="pks-home">
        <div className="pks-card-portal group" onClick={() => onNavigate('fastpay')}>
          <i className="fa-solid fa-bolt-lightning group-hover:scale-110 transition-transform"></i>
          <h2 className="text-3xl font-black mb-6">Fast Payment</h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">Convierte tus facturas en liquidez en menos de 24h. Sin esperas, sin burocracia, sin avales bancarios.</p>
          <span className="pks-btn-primary py-4 px-10 text-base">Cálculo de Liquidez</span>
        </div>

        <div className="pks-card-portal group" onClick={() => onNavigate('payments')}>
          <i className="fa-solid fa-wallet group-hover:scale-110 transition-transform"></i>
          <h2 className="text-3xl font-black mb-6">Gestión de Pagos</h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">Recibe tus anticipos y gestiona tus pagos a proveedores con múltiples métodos integrados.</p>
          <span className="pks-btn-primary py-4 px-10 text-base bg-[#003366]">Centro de Pagos</span>
        </div>

        <div className="pks-card-portal group" onClick={() => onNavigate('consultancy')}>
          <i className="fa-solid fa-compass group-hover:scale-110 transition-transform"></i>
          <h2 className="text-3xl font-black mb-6">Consultoría</h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">Reingeniería logística para dueños que quieren recuperar su tiempo y maximizar su rentabilidad neta.</p>
          <span className="pks-btn-primary py-4 px-10 text-base bg-[#002244] opacity-80">Ver Programa</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
