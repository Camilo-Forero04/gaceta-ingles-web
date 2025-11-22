"use client"; 

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Import dinámico del libro
const Book3DScene = dynamic(() => import("./Book3DScene"), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="animate-pulse text-gray-400 text-sm font-medium">Cargando experiencia 3D...</div>
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
  // ---------------------------

  const handlePurchase = async () => {
    // (Tu lógica de compra sigue igual...)
    alert("Lógica de compra (simplificada para el ejemplo de diseño)");
  };

  return (
    // 1. CONTENEDOR PRINCIPAL FLEX:
    // - 'flex flex-col': En móvil, los elementos se apilan verticalmente.
    // - 'lg:flex-row': En escritorio, se ponen uno al lado del otro.
    // - 'min-h-[90vh]': Asegura que la sección tenga buena altura en escritorio.
    <section className="relative bg-white overflow-hidden flex flex-col lg:flex-row max-w-7xl mx-auto min-h-[auto] lg:min-h-[90vh]">
      
      {/* 2. ZONA DEL LIBRO 3D (SECCIÓN DERECHA/SUPERIOR):
        - 'w-full lg:w-1/2': Ocupa todo el ancho en móvil, la mitad en escritorio.
        - 'h-[50vh] min-h-[400px]': En móvil, le damos una altura considerable para que el libro luzca.
        - 'lg:h-auto': En escritorio, la altura se adapta al contenedor padre.
        - 'lg:order-2': En escritorio, va a la derecha (segundo lugar).
        - 'bg-gray-50': Un fondo gris sutil para diferenciar el área 3D.
      */}
      <div className="w-full h-[50vh] min-h-[450px] lg:w-1/2 lg:h-auto bg-gray-50 lg:order-2 relative z-0">
        <Book3DScene />
        {/* Decoración sutil de fondo opcional */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40 lg:hidden pointer-events-none"></div>
      </div>

      {/* 3. ZONA DE TEXTO (SECCIÓN IZQUIERDA/INFERIOR):
        - 'w-full lg:w-1/2': Ancho completo móvil, mitad escritorio.
        - 'flex items-center': Centra el contenido verticalmente en escritorio.
        - 'p-6 sm:p-12 lg:p-16': Buen espaciado interno para que el texto respire.
        - 'lg:order-1': En escritorio, va a la izquierda (primer lugar).
        - 'z-10 bg-white': Asegura que el texto esté sobre cualquier elemento y tenga fondo blanco.
      */}
      <div className="w-full lg:w-1/2 flex items-center z-10 bg-white p-6 sm:px-12 sm:py-16 lg:p-16 lg:order-1">
        <div className="w-full max-w-xl mx-auto lg:mx-0">
            {/* Etiqueta */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-6">
              <span className="flex h-2 w-2 relative mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Fase de Preventa Activa
            </div>

            {/* Título Principal */}
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6 leading-tight">
              Desbloquea tu fluidez con <span className="text-indigo-600 block lg:inline">el Método IA SPOKEN</span>
            </h1>
            
            {/* Subtítulo */}
            <p className="mt-3 text-base text-gray-500 sm:text-lg md:text-xl mb-8 leading-relaxed">
              Las academias te enseñan a memorizar. La IA te enseña a hablar. Únete a la revolución y ahorra un <strong>{AHORRO}%</strong> antes del lanzamiento oficial.
            </p>

            {/* Contador */}
            {isMounted && (
              <div className="flex flex-wrap gap-3 mb-8">
                {/* (He simplificado un poco el diseño de las cajitas del contador para que se vean más limpias) */}
                <CounterBox value={timeLeft.days} label="Días" />
                <CounterBox value={timeLeft.hours} label="Horas" />
                <CounterBox value={timeLeft.minutes} label="Min" />
                <div className="flex items-center text-sm text-red-600 font-medium animate-pulse ml-2 bg-red-50 px-3 py-1 rounded-full">
                  ⚠️ ¡La oferta termina pronto!
                </div>
              </div>
            )}

            {/* Precios */}
            <div className="flex items-center gap-4 mb-8">
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
            <div className="mt-8">
                <button
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className={`w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1 transition-all shadow-lg hover:shadow-indigo-500/30 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? "Procesando..." : "Reservar mi Copia Ahora 👉"}
                </button>
                <p className="mt-4 text-xs text-gray-400 flex items-center">
                  🔒 Pago 100% seguro procesado por Wompi Colombia.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}

// Pequeño componente auxiliar para las cajitas del contador (para limpiar el código principal)
function CounterBox({ value, label }: { value: number, label: string }) {
  return (
    <div className="flex flex-col items-center bg-white border-2 border-gray-100 p-3 rounded-xl min-w-[65px] shadow-sm">
      <span className="text-2xl font-extrabold text-indigo-600 leading-none">{value}</span>
      <span className="text-[10px] font-bold text-gray-400 uppercase mt-1">{label}</span>
    </div>
  );
}