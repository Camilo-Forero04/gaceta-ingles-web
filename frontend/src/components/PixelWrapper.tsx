"use client"; // <--- Esto lo convierte en Componente Cliente

import dynamic from "next/dynamic";

// Aquí SÍ podemos usar ssr: false porque estamos en un entorno de cliente
const FacebookPixel = dynamic(() => import("./FacebookPixel"), { 
  ssr: false 
});

export default function PixelWrapper() {
  return <FacebookPixel />;
}