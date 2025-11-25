"use client"; 

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
// import Image from "next/image"; // Descomenta si usas next/image para el placeholder

// Import dinámico del libro. 
// NOTA: No definimos 'loading' aquí para controlar la carga manualmente en el componente padre y reducir TBT.
const Book3DScene = dynamic(() => import("./Book3DScene"), { 
  ssr: false,
});

export default function PresaleHero() {
  const [isLoading, setIsLoading] = useState(false);
  // Estado para diferir la carga del 3D
  const [load3D, setLoad3D] = useState(false);
  
  // --- LÓGICA DEL CONTADOR ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  const PRECIO_FULL = 49000;
  const PRECIO_PREVENTA = 26700;
  const AHORRO = Math.round(((PRECIO_FULL - PRECIO_PREVENTA) / PRECIO_FULL) * 100);
  const TARGET_DATE = "2025-12-01T23:59:59"; 

  useEffect(() => {
    setIsMounted(true);

    // 1. ESTRATEGIA DE RENDIMIENTO: Retrasar el 3D
    // Esperamos 2.5 segundos o requestIdleCallback para cargar el 3D.
    // Esto permite que el texto y el botón (LCP y TBT) carguen instantáneamente sin bloqueos.
    const load3DTimer = setTimeout(() => {
      setLoad3D(true);
    }, 2500);

    // Lógica del contador
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

    return () => {
      clearInterval(interval);
      clearTimeout(load3DTimer);
    };
  }, []);

  // --- LÓGICA DE PAGO REAL ---
  const handlePurchase = async () => {
    // Lazy load del Pixel solo al hacer clic (ahorra JS inicial)
    const ReactPixel = (await import("react-facebook-pixel")).default;
    ReactPixel.track("InitiateCheckout", {
        currency: "COP",
        value: 26700,
        content_name: "La Gaceta del Inglés (Preventa)"
    });

    setIsLoading(true);

    try {
       const response = await fetch('https://gaceta-ingles-web-production.up.railway.app/payment/presale-info');
       if (!response.ok) throw new Error("Error conectando con el servidor de pagos");
       const data = await response.json();

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
      
      {/* 1. ZONA DE TEXTO (VA PRIMERO - CRÍTICO PARA LCP) */}
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

            {/* Título - Prioridad de renderizado */}
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4 leading-tight">
              Desbloquea tu fluidez con <span className="text-indigo-600 block lg:inline">el Método IA SPOKEN</span>
            </h1>
            
            <p className="mt-2 text-base text-gray-500 sm:text-lg md:text-xl mb-6 leading-relaxed">
              Las academias te enseñan a memorizar. La IA te enseña a hablar. Únete a la revolución y ahorra un <strong>{AHORRO}%</strong> antes del lanzamiento oficial.
            </p>

            {/* Contador */}
            {isMounted ? (
              <div className="flex flex-wrap gap-3 mb-6">
                <CounterBox value={timeLeft.days} label="Días" />
                <CounterBox value={timeLeft.hours} label="Horas" />
                <CounterBox value={timeLeft.minutes} label="Min" />
                <CounterBox value={timeLeft.seconds} label="Seg" />
                <div className="flex items-center text-xs text-red-600 font-medium animate-pulse ml-1 bg-red-50 px-2 py-1 rounded-full">
                  ⚠️ ¡La oferta termina pronto!
                </div>
              </div>
            ) : (
               // Placeholder del contador para evitar salto de diseño (CLS)
               <div className="h-[58px] w-[300px] bg-gray-100 rounded-lg mb-6 animate-pulse"></div>
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
      <div className="w-full h-[350px] lg:w-1/2 lg:h-auto bg-gray-50 relative z-0 flex items-center justify-center lg:order-2 overflow-hidden">
        
        {/* SOLUCIÓN MAESTRA AL TBT:
           Mostramos una IMAGEN estática primero. Solo cargamos el 3D pesado (load3D) 
           después de 2.5 segundos. 
        */}

           <div className="absolute inset-0 w-full h-full animate-fade-in">
              <Book3DScene />
           </div>
        
      

      </div>

    </section>
  );
}

function CounterBox({ value, label }: { value: number, label: string }) {
  return (
    <div className="flex flex-col items-center bg-white border-2 border-gray-100 p-2 rounded-lg min-w-[60px] shadow-sm">
      <span className="text-xl font-extrabold text-indigo-600 leading-none">{value}</span>
      <span className="text-[9px] font-bold text-gray-400 uppercase mt-1">{label}</span>
    </div>
  );
}