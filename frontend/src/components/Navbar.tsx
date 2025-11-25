"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // <--- Nuevo estado para carga

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

  // --- LÓGICA DE PAGO (Copiada del Hero para que funcione aquí también) ---
  const handlePurchase = async () => {
    setIsLoading(true);

    try {
       // 1. Pixel de Meta (Import dinámico)
       const ReactPixel = (await import("react-facebook-pixel")).default;
       ReactPixel.track("InitiateCheckout", {
           currency: "COP",
           value: 26700,
           content_name: "La Gaceta del Inglés (Preventa - Navbar)" // Etiqueta diferente para saber que vino del menú
       });

       // 2. Pedir firma al Backend (Railway)
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
  // -----------------------------------------------------------------------

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
              <Image 
                src="/logo-gaceta.avif" 
                alt="Logo La Gaceta del Inglés" 
                width={150} 
                height={40} 
                className="h-10 w-auto object-contain cursor-pointer transition-opacity hover:opacity-90"
                priority 
              />
            </Link>
          </div>

          {/* ENLACES (Desktop) */}
          <nav className="hidden md:flex space-x-8">
            <Link href="#temario" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Temario
            </Link>
            <Link href="#metodo" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Método
            </Link>
            <Link href="#garantia" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Garantía
            </Link>
          </nav>

          {/* BOTÓN DE ACCIÓN (ACTUALIZADO) */}
          <div className="flex items-center">
            <button 
              onClick={handlePurchase} // <--- Ahora llama al pago
              disabled={isLoading}     // <--- Se desactiva si está cargando
              className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center min-w-[140px]
              ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
            >
              {isLoading ? (
                // Spinner pequeño de carga
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Cargando...
                </span>
              ) : (
                "Reservar Copia"
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}