"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

// Sub-componente para leer la URL de forma segura
function GraciasContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("id");

  // 🟢 CORRECCIÓN: Usamos la librería, no window.fbq directo
  useEffect(() => {
    if (transactionId) {
      import("react-facebook-pixel")
        .then((module) => {
          const ReactPixel = module.default;
          
          // Init opcional por seguridad (aunque el wrapper ya lo hace)
          // ReactPixel.init("TU_PIXEL_ID"); 
          
          ReactPixel.track("Purchase", {
            currency: "COP",
            value: 26700, 
            content_name: "La Gaceta del Inglés (Preventa)",
            order_id: transactionId 
          });
          
          console.log("✅ Evento Purchase enviado vía librería para:", transactionId);
        })
        .catch((error) => console.error("Error cargando Pixel:", error));
    }
  }, [transactionId]);

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 h-full">
      <div className="w-full max-w-md bg-white py-8 px-6 shadow-xl rounded-2xl text-center border border-gray-100">
        
        {/* Check Animado */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 animate-bounce">
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          ¡Reserva Exitosa!
        </h2>
        
        <p className="text-gray-500 mb-6">
          Tu referencia de pago es: <br/>
          <span className="font-mono text-xs bg-gray-100 p-1 px-2 rounded mt-1 inline-block">
            {transactionId || "Procesando..."}
          </span>
        </p>

        <div className="border-t border-gray-100 pt-6 text-left space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Próximos pasos:</h3>
          
          <div className="flex items-start gap-3">
            <div className="mt-1 bg-blue-100 p-1 rounded-full">
               <span className="text-sm">🎟️</span>
            </div>
            <p className="text-sm text-gray-600">
              Tu cupo para la preventa ha quedado 100% asegurado.
            </p>
          </div>

          <div className="flex items-start gap-3 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
            <div className="mt-0.5">
               <span className="text-lg">📅</span>
            </div>
            <div className="text-sm text-gray-700">
              El <span className="font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded mx-1">1 de Diciembre</span> 
              recibirás el eBook automáticamente en tu correo.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 bg-yellow-100 p-1 rounded-full">
               <span className="text-sm">🛡️</span>
            </div>
            <p className="text-sm text-gray-600">
              Revisa tu carpeta de <strong>Spam</strong> o Promociones, a veces el correo se esconde ahí.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link 
            href="/"
            className="block w-full py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all transform hover:-translate-y-0.5"
          >
            Volver al Inicio
          </Link>
        </div>

      </div>
    </div>
  );
}

// Componente Principal
export default function GraciasPage() {
  return (
    <Suspense fallback={<div className="text-center p-20">Verificando pago...</div>}>
      <GraciasContent />
    </Suspense>
  );
}