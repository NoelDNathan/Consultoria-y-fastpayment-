import React, { useState } from "react";

const FastPayment: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [days, setDays] = useState<number>(30);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPdfUploaded, setIsPdfUploaded] = useState(false);
  const [isDataVerified, setIsDataVerified] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const calculateReceived = () => {
    const baseRate = 3;
    const extraDays = Math.max(0, days - 30);
    const variableRate = extraDays * (3 / 90);
    const totalCommissionRate = baseRate + variableRate;
    const commission = (amount * totalCommissionRate) / 100;
    return Number((amount - commission).toFixed(2));
  };

  const received = calculateReceived();

  const handleUploadPdf = () => {
    setIsPdfUploaded(true);
    setIsDataVerified(false);
    setStatusMessage({ text: "Factura simulada cargada correctamente", type: "success" });
  };

  const handleVerifyData = () => {
    if (!isPdfUploaded) {
      setStatusMessage({ text: "Primero sube la factura en PDF", type: "error" });
      return;
    }

    setIsDataVerified(true);
    setStatusMessage({ text: "Datos verificados correctamente", type: "success" });
  };

  const handleRequestTransfer = () => {
    if (amount <= 0) {
      setStatusMessage({ text: "Sin saldo para procesar", type: "error" });
      return;
    }
    if (!isPdfUploaded) {
      setStatusMessage({ text: "Primero sube la factura en PDF", type: "error" });
      return;
    }
    if (!isDataVerified) {
      setStatusMessage({ text: "Verifica tus datos antes de solicitar", type: "error" });
      return;
    }

    setIsProcessing(true);
    setStatusMessage(null);

    setTimeout(() => {
      setStatusMessage({
        text: "¡Listo! Así de fácil puedes solicitar un adelanto de tu factura.",
        type: "success",
      });
      setIsProcessing(false);
      setTimeout(() => setStatusMessage(null), 5000);
    }, 800);
  };

  const dayOptions = [
    { value: 30, rate: "3%" },
    { value: 45, rate: "3.5%" },
    { value: 60, rate: "4%" },
    { value: 90, rate: "5%" },
    { value: 120, rate: "6%" },
  ];

  return (
    <div className="pks-fastpayment-container">
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="bg-blue-100 text-[#003366] px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-6 inline-block">
              Liquidez Inmediata
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-[#003366] mb-8">
              ¿Qué es <span className="text-[#FF8C00]">Fast Payment</span>?
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Es nuestra solución financiera diseñada exclusivamente para transportistas.
              Transformamos tus facturas pendientes en efectivo en menos de 24 horas. Elimina la
              espera de 60, 90 o 120 días y mantén tu flota en movimiento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                num: "1",
                title: "Sube tu Factura",
                desc: "Carga la documentación de tu envío directamente en nuestra plataforma segura.",
              },
              {
                num: "2",
                title: "Validación Exprés",
                desc: "Nuestro equipo analiza el riesgo y valida la factura en un máximo de 4 horas.",
              },
              {
                icon: "fa-euro-sign",
                title: "Cobro al Instante",
                desc: "Recibe el importe neto de forma inmediata. Paga gasoil, nóminas y seguros hoy.",
              },
            ].map((step, i) => (
              <article
                key={i}
                className="p-10 rounded-3xl bg-gray-50 border border-gray-100 text-center transition-all hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-20 h-20 bg-[#003366] text-white rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-bold">
                  {step.num || <i className={`fa-solid ${step.icon}`}></i>}
                </div>
                <h3 className="font-bold text-2xl text-[#003366] mb-6">{step.title}</h3>
                <p className="text-gray-600 text-lg">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-50 border-t border-gray-200">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-[#003366] uppercase tracking-tight">
            Simulador de Liquidación
          </h2>
          <p className="text-xl text-gray-500 mt-4">Calcula tu flujo de caja en tiempo real.</p>
        </div>

        <div className="pks-calculator max-w-2xl mx-auto">
          <div className="mb-10">
            <label className="text-sm font-black text-gray-400 uppercase tracking-widest block mb-4">
              Importe Factura
            </label>
            <div className="relative">
              <input
                type="number"
                className="w-full p-6 text-4xl font-black bg-white border-2 border-gray-100 rounded-3xl outline-none focus:border-[#FF8C00] transition-all"
                value={amount}
                min="0"
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              />
              <span className="absolute right-6 top-6 text-4xl font-bold text-[#003366]">€</span>
            </div>
          </div>

          <div className="mb-10">
            <label className="text-sm font-black text-gray-400 uppercase tracking-widest block mb-4">
              Días para el vencimiento
            </label>
            <div className="grid grid-cols-5 gap-4">
              {dayOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
                    days === opt.value
                      ? "border-[#FF8C00] bg-[#FFF8F0] shadow-md scale-105"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                  onClick={() => setDays(opt.value)}
                >
                  <strong className="text-xl">{opt.value}</strong>
                  <span className="text-[#FF8C00] text-xs font-bold uppercase">{opt.rate}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] border-2 border-dashed border-[#003366]/20 text-center">
            <h4 className="text-[#003366] font-bold uppercase tracking-wider text-sm mb-4">
              Neto a transferir
            </h4>
            <div className="text-6xl font-black text-[#003366] mb-2">
              {received.toLocaleString("es-ES")} <span className="text-3xl">€</span>
            </div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
              Sin gastos ocultos · Transferencia SEPA inmediata
            </p>
          </div>

          <div className="mt-8">
            <div className="grid gap-4">
              <button
                onClick={handleUploadPdf}
                className="w-full p-5 bg-white text-[#003366] text-lg font-black uppercase rounded-2xl border-2 border-gray-100 hover:border-[#FF8C00] transition-all"
              >
                {isPdfUploaded ? "Factura Subida" : "Subir PDF"}
              </button>

              <button
                onClick={handleVerifyData}
                disabled={!isPdfUploaded}
                className="w-full p-5 bg-[#003366] text-white text-lg font-black uppercase rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Verificar Datos
              </button>
            </div>

            <button
              onClick={handleRequestTransfer}
              disabled={isProcessing || !isDataVerified}
              className="w-full mt-4 p-6 bg-[#FF8C00] text-white text-xl font-black uppercase rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Procesando..." : "Solicitar Transferencia"}
            </button>

            {statusMessage && (
              <div
                className={`mt-4 p-4 rounded-xl text-center font-bold uppercase tracking-widest animate-fadeIn ${
                  statusMessage.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <i
                  className={`fa-solid ${
                    statusMessage.type === "success" ? "fa-check-circle" : "fa-circle-xmark"
                  } mr-2`}
                ></i>
                {statusMessage.text}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FastPayment;
