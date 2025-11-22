"use client"; 

import Image from "next/image";
import { useState, useEffect } from "react"; // <--- Agregamos useEffect
import dynamic from "next/dynamic";

// Import dinámico del libro para evitar errores de SSR
const Book3DScene = dynamic(() => import("./Book3DScene"), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse text-gray-400 text-sm font-medium">Cargando libro...</div>
    </div>
  )
});

export default function PresaleHero() {
  const [isLoading, setIsLoading] = useState(false);
  
  // --- LÓGICA DEL CONTADOR ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false); // Para evitar errores de hidratación

  const PRECIO_FULL = 49000;
  const PRECIO_PREVENTA = 26700;
  const AHORRO = Math.round(((PRECIO_FULL - PRECIO_PREVENTA) / PRECIO_FULL) * 100);
  // FECHA LÍMITE (Formato: AÑO-MES-DIA T HORA:MIN:SEG)
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
        clearInterval(interval); // Si llega a 0, detiene el contador
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // ---------------------------

  const handlePurchase = async () => {
    // 1. Pixel de Meta (Intención)
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
            // expirationTime y taxInCents quitados para evitar errores
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
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          
          <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-6">
                <span className="flex h-2 w-2 relative mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Fase de Preventa Activa
              </div>

              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
                <span className="block xl:inline">Desbloquea tu fluidez con</span>{" "}
                <span className="block text-indigo-600 xl:inline">el Método IA SPOKEN</span>
              </h1>
              
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 mb-6">
                Las academias te enseñan a memorizar. La IA te enseña a hablar. Únete a la revolución y ahorra un <strong>{AHORRO}%</strong> antes del lanzamiento oficial.
              </p>

              {/* --- BLOQUE DEL CONTADOR (NUEVO) --- */}
              {isMounted && (
                <div className="flex flex-wrap gap-4 mb-8 sm:justify-center lg:justify-start">
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-200 p-2 rounded-lg min-w-[70px]">
                    <span className="text-2xl font-bold text-indigo-600">{timeLeft.days}</span>
                    <span className="text-xs text-gray-500 uppercase">Días</span>
                  </div>
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-200 p-2 rounded-lg min-w-[70px]">
                    <span className="text-2xl font-bold text-indigo-600">{timeLeft.hours}</span>
                    <span className="text-xs text-gray-500 uppercase">Horas</span>
                  </div>
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-200 p-2 rounded-lg min-w-[70px]">
                    <span className="text-2xl font-bold text-indigo-600">{timeLeft.minutes}</span>
                    <span className="text-xs text-gray-500 uppercase">Min</span>
                  </div>
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-200 p-2 rounded-lg min-w-[70px]">
                    <span className="text-2xl font-bold text-indigo-600">{timeLeft.seconds}</span>
                    <span className="text-xs text-gray-500 uppercase">Seg</span>
                  </div>
                  <div className="flex items-center text-sm text-red-500 font-medium animate-pulse ml-2">
                    ⚠️ ¡La oferta termina pronto!
                  </div>
                </div>
              )}
              {/* ----------------------------------- */}

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 sm:justify-center lg:justify-start">
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold text-gray-900">
                    ${PRECIO_PREVENTA.toLocaleString('es-CO')}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">COP</span>
                </div>
                <span className="text-xl text-gray-400 line-through decoration-red-500 decoration-2">
                  ${PRECIO_FULL.toLocaleString('es-CO')}
                </span>
              </div>

              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={handlePurchase}
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? "Procesando..." : "Reservar mi Copia Ahora"}
                  </button>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-400 sm:text-center lg:text-left">
                🔒 Pago 100% seguro procesado por Wompi Colombia.
              </p>
            </div>
          </main>
        </div>
      </div>
      
      {/* Zona de Imagen 3D */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50 flex items-center justify-center h-[450px] lg:h-full">
        <Book3DScene />
      </div>
    </div>
  );
}