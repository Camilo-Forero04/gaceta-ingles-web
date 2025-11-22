"use client"; 

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Import dinámico del libro para evitar errores de SSR
const Book3DScene = dynamic(() => import("./Book3DScene"), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="animate-pulse text-gray-400 text-sm font-medium">Cargando libro...</div>
    </div>
  )
});

export default function PresaleHero() {
  const [isLoading, setIsLoading] = useState(false);
  
  // --- LÓGICA DEL CONTADOR ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  const PRECIO_FULL = 49000;
  const PRECIO_PREVENTA = 26700;
  const AHORRO = Math.round(((PRECIO_FULL - PRECIO_PREVENTA) / PRECIO_FULL) * 100);
  const TARGET_DATE = "2025-12-15T00:00:00"; 

  useEffect(() => {
    setIsMounted(true);
    const target = new Date(TARGET_DATE).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // --- LÓGICA DE PAGO REAL ---
  const handlePurchase = async () => {
    // 1. Pixel de Meta
    const ReactPixel = (await import("react-facebook-pixel")).default;
    ReactPixel.track("InitiateCheckout", {
        currency: "COP",
        value: 26700,
        content_name: "La Gaceta del Inglés (Preventa)"
    });

    setIsLoading(true);

    try {
       // 2. Pedir firma al Backend (Producción)
       const response = await fetch('https://gaceta-ingles-web-production.up.railway.app/payment/presale-info');
       
       if (!response.ok) throw new Error("Error conectando con el servidor de pagos");
       
       const data = await response.json();

       // 3. Abrir Widget de Wompi REAL
       if (typeof (window as any).WidgetCheckout !== 'undefined') {
          const checkout = new (window as any).WidgetCheckout({
            currency: 'COP',
            amountInCents: Number(data.amountInCents),
            reference: data.reference,
            publicKey: data.publicKey,
            signature: { integrity: data.signature }, 
            redirectUrl: 'https://www.gacetaingles.com/gracias',
            taxInCents: { vat: 0, consumption: 0 }
          });
          
          checkout.open((result: any) => {
            const transaction = result.transaction;
            if (transaction.status === 'APPROVED') {
                window.location.href = `/gracias?id=${transaction.id}`;
            }
          });
       } else {
           alert("El sistema de pagos está cargando. Intenta de nuevo en 2 segundos.");
       }

    } catch (e) {
        console.error(e);
        alert("Hubo un error al iniciar el pago.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <section className="relative bg-white overflow-hidden flex flex-col lg:flex-row max-w-7xl mx-auto min-h-[auto] lg:min-h-[90vh]">
      
      {/* 1. ZONA DE TEXTO (VA PRIMERO) */}
      {/* En móvil: Padding pequeño (px-4) y padding vertical ajustado. En Desktop: Padding grande. */}
      <div className="w-full lg:w-1/2 flex items-center z-10 bg-white px-4 pt-8 pb-4 sm:px-12 lg:p-10 lg:order-1">
        <div className="w-full max-w-xl mx-auto lg:mx-0">
            
            {/* Etiqueta */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4">
              <span className="flex h-2 w-2 relative mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Fase de Preventa Activa
            </div>

            {/* Título */}
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4 leading-tight">
              Desbloquea tu fluidez con <span className="text-indigo-600 block lg:inline">el Método IA SPOKEN</span>
            </h1>
            
            {/* Subtítulo */}
            <p className="mt-2 text-base text-gray-500 sm:text-lg md:text-xl mb-6 leading-relaxed">
              Las academias te enseñan a memorizar. La IA te enseña a hablar. Únete a la revolución y ahorra un <strong>{AHORRO}%</strong> antes del lanzamiento oficial.
            </p>

            {/* Contador */}
            {isMounted && (
              <div className="flex flex-wrap gap-3 mb-6">
                <CounterBox value={timeLeft.days} label="Días" />
                <CounterBox value={timeLeft.hours} label="Horas" />
                <CounterBox value={timeLeft.minutes} label="Min" />
                <CounterBox value={timeLeft.seconds} label="Seg" />
                <div className="flex items-center text-xs text-red-600 font-medium animate-pulse ml-1 bg-red-50 px-2 py-1 rounded-full">
                  ⚠️ ¡La oferta termina pronto!
                </div>
              </div>
            )}

            {/* Precios */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                  ${PRECIO_PREVENTA.toLocaleString('es-CO')}
                  </span>
                  <span className="text-base text-gray-500 font-medium">COP</span>
              </div>
              <span className="text-xl text-gray-400 line-through decoration-red-500/70 decoration-2">
                ${PRECIO_FULL.toLocaleString('es-CO')}
              </span>
            </div>

            {/* Botón de Compra */}
            <div className="mt-4">
                <button
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className={`w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1 transition-all shadow-lg hover:shadow-indigo-500/30 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? "Procesando..." : "Reservar mi Copia Ahora 👉"}
                </button>
                <p className="mt-3 text-xs text-gray-400 flex items-center">
                  🔒 Pago 100% seguro procesado por Wompi Colombia.
                </p>
            </div>
        </div>
      </div>

      {/* 2. ZONA DEL LIBRO 3D (VA SEGUNDO) */}
      {/* Altura fija de 350px en móvil para que se vea bien */}
      <div className="w-full h-[350px] lg:w-1/2 lg:h-auto bg-gray-50 relative z-0 flex items-center justify-center lg:order-2">
        <Book3DScene />
        {/* Degradado para suavizar la unión en móvil */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-gray-50 lg:hidden pointer-events-none"></div>
      </div>

    </section>
  );
}

// Componente auxiliar
function CounterBox({ value, label }: { value: number, label: string }) {
  return (
    <div className="flex flex-col items-center bg-white border-2 border-gray-100 p-2 rounded-lg min-w-[60px] shadow-sm">
      <span className="text-xl font-extrabold text-indigo-600 leading-none">{value}</span>
      <span className="text-[9px] font-bold text-gray-400 uppercase mt-1">{label}</span>
    </div>
  );
}