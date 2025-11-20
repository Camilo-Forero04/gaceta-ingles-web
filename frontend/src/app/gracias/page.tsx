"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ReactPixel from "react-facebook-pixel"; // <--- Importar
import { useEffect } from "react";

// Sub-componente para leer la URL de forma segura
function GraciasContent() {

    const searchParams = useSearchParams();
    const transactionId = searchParams.get("id"); // Leemos el ID que nos mandó el redirect


  // Disparar el evento SOLO una vez cuando carga la página
  useEffect(() => {
    if (transactionId) {
      ReactPixel.track("Purchase", {
        currency: "COP",
        value: 26700, // El valor de la venta
        content_name: "La Gaceta del Inglés",
        order_id: transactionId // Para que Facebook no duplique conversiones
      });
    }
  }, [transactionId]);
    
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          
          {/* Círculo Verde con Check */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            ¡Reserva Exitosa!
          </h2>
          
          <div className="text-sm text-gray-500 mb-8 bg-gray-100 p-3 rounded-md border border-gray-200">
            Referencia: <span className="font-mono text-gray-800">{transactionId || "N/A"}</span>
          </div>

          <div className="border-t border-gray-200 pt-6 text-left">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Próximos pasos:</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">📧</span>
                Tu cupo para la preventa ha quedado asegurado.
              </li>
              <li className="flex items-start">
                <span className="mr-2">📅</span>
                El <strong>15 de Diciembre</strong> recibirás el eBook automáticamente en tu correo.
              </li>
              <li className="flex items-start">
                <span className="mr-2">🛡️</span>
                Revisa tu carpeta de Spam ese día por si acaso.
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <Link 
              href="/"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

// Componente Principal (Loader mientras lee la URL)
export default function GraciasPage() {
  return (
    <Suspense fallback={<div className="text-center p-20">Verificando pago...</div>}>
      <GraciasContent />
    </Suspense>
  );
}