
import React, { useState } from 'react';

const Payments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'receive' | 'pay'>('receive');
  const [iban, setIban] = useState('');

  return (
    <div className="pks-payments-landing">
      <header className="bg-[#003366] text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-black mb-4">Centro de Pagos Inteligente</h1>
        <p className="text-xl opacity-80 max-w-2xl mx-auto">Toda tu actividad financiera en un solo lugar. Control total de tus cobros y pagos.</p>
      </header>

      <div className="max-w-6xl mx-auto -mt-12 px-6">
        <div className="bg-white rounded-3xl shadow-3xl overflow-hidden">
          {/* Tabs Selector */}
          <div className="flex border-b">
            <button 
              onClick={() => setActiveTab('receive')}
              className={`flex-1 py-8 text-xl font-black uppercase tracking-widest transition-all ${activeTab === 'receive' ? 'text-[#FF8C00] border-b-4 border-[#FF8C00]' : 'text-gray-400 hover:text-[#003366]'}`}
            >
              <i className="fa-solid fa-hand-holding-dollar mr-3"></i> Recibir Pagos
            </button>
            <button 
              onClick={() => setActiveTab('pay')}
              className={`flex-1 py-8 text-xl font-black uppercase tracking-widest transition-all ${activeTab === 'pay' ? 'text-[#FF8C00] border-b-4 border-[#FF8C00]' : 'text-gray-400 hover:text-[#003366]'}`}
            >
              <i className="fa-solid fa-credit-card mr-3"></i> Realizar Pagos
            </button>
          </div>

          <div className="p-10 md:p-16">
            {activeTab === 'receive' ? (
              <div className="space-y-12">
                {/* Balances */}
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="bg-blue-50 p-10 rounded-[40px] border-2 border-[#003366]/10">
                    <h3 className="text-sm font-black text-[#003366] uppercase mb-4 opacity-60">Balance Disponible</h3>
                    <div className="text-6xl font-black text-[#003366] mb-8">4.580,00 <span className="text-3xl font-bold">€</span></div>
                    <button className="pks-btn-primary w-full py-6">Solicitar Retiro Inmediato</button>
                  </div>
                  <div className="bg-orange-50 p-10 rounded-[40px] border-2 border-[#FF8C00]/10">
                    <h3 className="text-sm font-black text-[#FF8C00] uppercase mb-4 opacity-60">Filtro Fast Payment (En Proceso)</h3>
                    <div className="text-6xl font-black text-[#FF8C00] mb-8">12.240,00 <span className="text-3xl font-bold">€</span></div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-tighter">Liquidación estimada: Hoy antes de las 18:00h</p>
                  </div>
                </div>

                {/* NUEVA SECCIÓN: Registro de IBAN */}
                <div className="bg-white p-10 rounded-[40px] border-2 border-gray-100 shadow-sm">
                  <h3 className="text-xl font-black text-[#003366] mb-6 uppercase tracking-tighter">
                    <i className="fa-solid fa-building-columns mr-3 text-[#FF8C00]"></i> Cuenta Bancaria de Destino (IBAN)
                  </h3>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        placeholder="ES00 0000 0000 0000 0000 0000" 
                        className="w-full p-5 text-lg border-2 border-gray-200 rounded-2xl outline-none focus:border-[#003366] bg-gray-50 transition-all font-mono"
                        value={iban}
                        onChange={(e) => setIban(e.target.value.toUpperCase())}
                      />
                      <i className="fa-solid fa-shield-halved absolute right-5 top-1/2 -translate-y-1/2 text-gray-300"></i>
                    </div>
                    <button className="bg-[#003366] text-white px-10 py-5 rounded-2xl font-bold uppercase hover:bg-[#002244] transition-all shadow-lg active:scale-95">
                      Registrar IBAN
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest flex items-center gap-2">
                    <i className="fa-solid fa-circle-info text-[#FF8C00]"></i>
                    Este número será utilizado para todas tus liquidaciones automáticas de Fast Payment.
                  </p>
                </div>

                {/* Historial */}
                <div className="mt-12">
                  <h3 className="text-2xl font-black text-[#003366] mb-8 uppercase tracking-tighter">Últimos cobros recibidos</h3>
                  <div className="space-y-4">
                    {[
                      { ref: 'FP-8890', client: 'Logística García S.L.', amount: '2.400,00 €', status: 'Completado', date: 'Hace 2 horas' },
                      { ref: 'FP-8888', client: 'Transportes TransMer', amount: '1.150,00 €', status: 'Completado', date: 'Ayer' },
                      { ref: 'FP-8885', client: 'Envios Express', amount: '3.900,00 €', status: 'En revisión', date: '01/05/2024' }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <div>
                          <p className="font-black text-[#003366] mb-1">{item.client}</p>
                          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{item.ref} · {item.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black text-[#003366]">{item.amount}</p>
                          <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${item.status === 'Completado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-black text-[#003366] mb-4">¿Cómo deseas pagar?</h2>
                  <p className="text-gray-500">Selecciona el método que mejor se adapte a tus necesidades. Todas las transacciones están encriptadas con seguridad militar.</p>
                </div>

                {/* Grid de métodos de pago */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Google Pay - Redirección externa */}
                  <a 
                    href="https://pay.google.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-4 p-8 border-2 border-gray-100 rounded-3xl hover:border-black transition-all bg-white group cursor-pointer no-underline"
                  >
                    <img src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-6" />
                    <span className="text-xl font-black text-black">Pay</span>
                  </a>

                  {/* PayPal - Redirección externa */}
                  <a 
                    href="https://www.paypal.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-4 p-8 border-2 border-gray-100 rounded-3xl hover:border-[#003087] transition-all bg-[#003087]/5 group cursor-pointer no-underline"
                  >
                    <i className="fa-brands fa-paypal text-3xl text-[#003087]"></i>
                    <span className="text-xl font-black text-[#003087]">PayPal</span>
                  </a>

                  {/* Amazon Pay - Redirección externa */}
                  <a 
                    href="https://pay.amazon.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-4 p-8 border-2 border-gray-100 rounded-3xl hover:border-[#FF9900] transition-all bg-white group cursor-pointer no-underline"
                  >
                    <i className="fa-brands fa-amazon text-3xl text-[#FF9900]"></i>
                    <span className="text-xl font-black text-black">Amazon Pay</span>
                  </a>

                  {/* Tarjeta de Crédito - Gestión local */}
                  <button className="flex items-center justify-center gap-4 p-8 border-2 border-gray-100 rounded-3xl hover:border-[#003366] transition-all bg-white group">
                    <i className="fa-solid fa-credit-card text-3xl text-[#003366]"></i>
                    <span className="text-xl font-black text-[#003366]">Tarjeta Bancaria</span>
                  </button>
                </div>

                {/* Formulario de Pago con Tarjeta */}
                <div className="bg-gray-50 p-10 rounded-[40px] border-2 border-dashed border-gray-200">
                  <h3 className="text-sm font-black uppercase text-gray-400 mb-8 tracking-widest text-center">Datos de Facturación Rápidos</h3>
                  <div className="space-y-6">
                    <input type="text" placeholder="Número de Tarjeta" className="w-full p-5 text-lg border-2 border-gray-200 rounded-2xl outline-none focus:border-[#003366] bg-white" />
                    <div className="grid grid-cols-2 gap-6">
                      <input type="text" placeholder="MM / YY" className="p-5 text-lg border-2 border-gray-200 rounded-2xl outline-none focus:border-[#003366] bg-white" />
                      <input type="text" placeholder="CVC" className="p-5 text-lg border-2 border-gray-200 rounded-2xl outline-none focus:border-[#003366] bg-white" />
                    </div>
                    <button className="w-full bg-[#003366] text-white py-6 rounded-2xl text-xl font-black uppercase shadow-2xl hover:scale-105 transition-all">
                      Confirmar y Pagar
                    </button>
                  </div>
                </div>

                <div className="flex justify-center gap-8 opacity-40 grayscale">
                  <i className="fa-brands fa-cc-visa text-4xl"></i>
                  <i className="fa-brands fa-cc-mastercard text-4xl"></i>
                  <i className="fa-brands fa-cc-apple-pay text-4xl"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
