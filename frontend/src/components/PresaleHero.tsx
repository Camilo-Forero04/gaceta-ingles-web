"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useWompiCheckout } from "../hooks/useWompiCheckout";

// --- 1. COMPONENTE PLACEHOLDER ---
// Se muestra antes de que el usuario interactúe y mientras el 3D se descarga.
const BookPlaceholder = () => (
  <div className="flex items-center justify-center h-full w-full p-10">
    {/* Imagen estática optimizada que imita la posición del 3D */}
    <Image
      src="/book_cover_texture_2.avif"
      alt="Libro Método IA SPOKEN"
      width={320}
      height={400}
      priority
      className="w-auto h-[80%] max-h-[400px] object-contain drop-shadow-2xl shadow-black/50"
      style={{
        // Truco CSS para simular 3D sin cargar Three.js
        transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
        boxShadow: '20px 20px 60px rgba(0,0,0,0.3)'
      }}
    />
  </div>
);

// --- 2. IMPORTACIÓN DINÁMICA INTELIGENTE ---
// La propiedad 'loading' asegura que si el 3D tarda en bajar,
// el usuario sigue viendo la portada (Placeholder) en lugar de un hueco blanco.
const Book3DScene = dynamic(() => import("./Book3DScene"), {
  ssr: false,
  loading: () => <BookPlaceholder />,
});

export default function PresaleHero() {
  // Lógica de pago compartida (Wompi + Pixel)
  const { handlePurchase, isLoading } = useWompiCheckout("Hero");

  // Estado de Rendimiento: Controla cuándo se inyecta el 3D real
  const [show3D, setShow3D] = useState(false);

  // Precio de exhibición (el precio real lo firma el backend)
  const PRECIO = 49000;

  // --- A. LÓGICA DE RENDIMIENTO (INTERACCIÓN) ---
  useEffect(() => {
    const start3D = () => {
      setShow3D(true);
      // Limpiamos listeners inmediatamente para liberar memoria
      window.removeEventListener("scroll", start3D);
      window.removeEventListener("mousemove", start3D);
      window.removeEventListener("touchstart", start3D);
    };

    // Escuchamos la primera señal de vida del usuario
    window.addEventListener("scroll", start3D, { passive: true });
    window.addEventListener("mousemove", start3D, { passive: true });
    window.addEventListener("touchstart", start3D, { passive: true });

    return () => {
      window.removeEventListener("scroll", start3D);
      window.removeEventListener("mousemove", start3D);
      window.removeEventListener("touchstart", start3D);
    };
  }, []);

  return (
    <section className="relative bg-white overflow-hidden flex flex-col lg:flex-row max-w-7xl mx-auto min-h-[auto] lg:min-h-[90vh]">
      
      {/* 1. ZONA DE TEXTO (IZQUIERDA) */}
      <div className="w-full lg:w-1/2 flex items-center z-10 bg-white px-4 pt-8 pb-4 sm:px-12 lg:p-10 lg:order-1">
        <div className="w-full max-w-xl mx-auto lg:mx-0">
            
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4">
              <span className="flex h-2 w-2 relative mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Disponible Ahora
            </div>

            {/* Título */}
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4 leading-tight">
              Desbloquea tu fluidez con <span className="text-indigo-600 block lg:inline">el Método IA SPOKEN</span>
            </h1>
            
            {/* Subtítulo */}
            <p className="mt-2 text-base text-gray-500 sm:text-lg md:text-xl mb-6 leading-relaxed">
              Las academias te enseñan a memorizar. La IA te enseña a hablar. Únete a la revolución con el Método IA SPOKEN.
            </p>

            {/* Precio */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                  ${PRECIO.toLocaleString('es-CO')}
                  </span>
                  <span className="text-base text-gray-500 font-medium">COP</span>
              </div>
            </div>

            {/* Botón de Compra */}
            <div className="mt-4">
                <button
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className={`w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1 transition-all shadow-lg hover:shadow-indigo-500/30 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? "Procesando..." : "Comprar mi Copia Ahora 👉"}
                </button>
                <p className="mt-3 text-xs text-gray-400 flex items-center">
                  🔒 Pago 100% seguro procesado por Wompi Colombia.
                </p>
            </div>
        </div>
      </div>

      {/* 2. ZONA DEL LIBRO (DERECHA) */}
      <div className="w-full h-[350px] lg:w-1/2 lg:h-auto bg-gray-50 relative z-0 flex items-center justify-center lg:order-2">
        {show3D ? (
            // A. USUARIO INTERACTUÓ: Intentamos cargar el 3D.
            // Si tarda en cargar, 'dynamic' mostrará <BookPlaceholder /> automáticamente.
            <div className="w-full h-full">
                <Book3DScene />
            </div>
        ) : (
            // B. ESTADO INICIAL: Mostramos la imagen estática.
            // Esto es lo que ve Google y el usuario antes de tocar la pantalla.
            <BookPlaceholder />
        )}
      </div>

    </section>
  );
}
