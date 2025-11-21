"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para aumentar la sombra cuando baja
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out 
      ${isScrolled ? "bg-white/80 shadow-md" : "bg-white/60"} 
      backdrop-blur-md border-b border-gray-200/50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
        <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              {/* - Reemplaza "/logo-gaceta.png" por el nombre EXACTO de tu archivo en public.
                 - Ajusta el width y height para que se vea bien (ej: 150x40, 120x35, etc).
                 - La clase "h-10 w-auto" asegura que la altura sea fija y el ancho se adapte.
              */}
              <Image 
                src="/logo-gaceta.png" 
                alt="Logo La Gaceta del Inglés" 
                width={150} 
                height={40} 
                className="h-10 w-auto object-contain cursor-pointer transition-opacity hover:opacity-90"
                priority // Carga el logo rápido
              />
            </Link>
          </div>

          {/* ENLACES (Desktop) */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Método
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Temario
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Garantía
            </a>
          </nav>

          {/* BOTÓN DE ACCIÓN */}
          <div className="flex items-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-transform transform hover:scale-105"
            >
              Reservar Cupo
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}