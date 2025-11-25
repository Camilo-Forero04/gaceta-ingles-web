"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// 1. EXTRAEMOS LA IMAGEN FALSA A UN COMPONENTE
// Esto asegura que sea idéntica tanto en la espera inicial como durante la carga
const BookPlaceholder = () => (
  <div className="flex items-center justify-center h-full w-full p-10 animate-pulse-subtle">
    <img 
      src="/book_cover_texture.avif?v=2" 
      alt="Libro Método IA SPOKEN"
      className="w-auto h-[80%] max-h-[400px] object-contain drop-shadow-2xl shadow-black/50"
      style={{ 
        transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
        boxShadow: '20px 20px 60px rgba(0,0,0,0.3)'
      }} 
    />
  </div>
);

// 2. CONFIGURAMOS EL DYNAMIC CON LA IMAGEN COMO "LOADING"
// Si el internet es lento, Next.js mostrará BookPlaceholder mientras descarga el 3D
const Book3DScene = dynamic(() => import("./Book3DScene"), {
  ssr: false,
  loading: () => <BookPlaceholder />, // <--- ¡AQUÍ ESTÁ LA MAGIA!
});

export default function PresaleHero() {
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [show3D, setShow3D] = useState(false);

  const PRECIO_FULL = 49000;
  const PRECIO_PREVENTA = 26700;
  const AHORRO = Math.round(((PRECIO_FULL - PRECIO_PREVENTA) / PRECIO_FULL) * 100);
  const TARGET_DATE = "2025-12-01T23:59:59";

  // Lógica de activación (Igual que antes)
  useEffect(() => {
    const start3D = () => {
      setShow3D(true);
      window.removeEventListener("scroll", start3D);
      window.removeEventListener("mousemove", start3D);
      window.removeEventListener("touchstart", start3D);
    };
    window.addEventListener("scroll", start3D, { passive: true });
    window.addEventListener("mousemove", start3D, { passive: true });
    window.addEventListener("touchstart", start3D, { passive: true });
    return () => {
      window.removeEventListener("scroll", start3D);
      window.removeEventListener("mousemove", start3D);
      window.removeEventListener("touchstart", start3D);
    };
  }, []);

  // Lógica del contador (Igual que antes)
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

  // Lógica de Pago (Tu lógica original)
  const handlePurchase = async () => {
     // ... (Pega aquí tu lógica de handlePurchase intacta)
  };

  return (
    <section className="relative bg-white overflow-hidden flex flex-col lg:flex-row max-w-7xl mx-auto min-h-[auto] lg:min-h-[90vh]">
      
      {/* 1. ZONA DE TEXTO (Sin cambios) */}
      <div className="w-full lg:w-1/2 flex items-center z-10 bg-white px-4 pt-8 pb-4 sm:px-12 lg:p-10 lg:order-1">
         {/* ... (Todo tu contenido de texto igual que antes) ... */}
         {/* Para no hacer el código gigante, asumo que dejas esta parte igual */}
         <div className="w-full max-w-xl mx-auto lg:mx-0">
             {/* ... Títulos, precios, botones ... */}
             {/* COPIA AQUÍ EL CONTENIDO DE LA COLUMNA IZQUIERDA DE TU CÓDIGO ANTERIOR */}
             
             {/* Resumen visual para que sepas dónde va: */}
             <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4">
                 Fase de Preventa Activa
             </div>
             <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4 leading-tight">
                 Desbloquea tu fluidez con <span className="text-indigo-600 block lg:inline">el Método IA SPOKEN</span>
             </h1>
             <p className="mt-2 text-base text-gray-500 sm:text-lg md:text-xl mb-6 leading-relaxed">
                  Las academias te enseñan a memorizar. La IA te enseña a hablar. Únete a la revolución y ahorra un <strong>{AHORRO}%</strong> antes del lanzamiento oficial.
             </p>
             {isMounted && (
               <div className="flex flex-wrap gap-3 mb-6">
                 <CounterBox value={timeLeft.days} label="Días" />
                 <CounterBox value={timeLeft.hours} label="Horas" />
                 <CounterBox value={timeLeft.minutes} label="Min" />
                 <CounterBox value={timeLeft.seconds} label="Seg" />
               </div>
             )}
             <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl sm:text-5xl font-extrabold text-gray-900">${PRECIO_PREVENTA.toLocaleString('es-CO')}</span>
                <span className="text-xl text-gray-400 line-through">${PRECIO_FULL.toLocaleString('es-CO')}</span>
             </div>
             <button onClick={handlePurchase} disabled={isLoading} className="w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg">
                {isLoading ? "Procesando..." : "Reservar mi Copia Ahora 👉"}
             </button>
         </div>
      </div>

      {/* 2. ZONA DEL LIBRO (MEJORADA) */}
      <div className="w-full h-[350px] lg:w-1/2 lg:h-auto bg-gray-50 relative z-0 flex items-center justify-center lg:order-2">
        {show3D ? (
            // Cuando el usuario interactúa, cargamos el 3D
            // Gracias al prop 'loading', si tarda, seguirá mostrando el BookPlaceholder
            <div className="w-full h-full animate-in fade-in duration-700">
                <Book3DScene />
            </div>
        ) : (
            // Estado inicial estático (antes de tocar nada)
            <BookPlaceholder />
        )}
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