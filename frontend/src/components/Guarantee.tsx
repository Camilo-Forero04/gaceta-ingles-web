import { FaShieldAlt, FaLock, FaCloudDownloadAlt } from "react-icons/fa";

export default function Guarantee() {
  return (
    <section className="bg-gray-50 py-16 border-t border-gray-200" id="garantia">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título de la Sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Compra con total <span className="text-indigo-600">Tranquilidad</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Hemos eliminado todo el riesgo para ti. Solo preocúpate por aprender.
          </p>
        </div>

        {/* Grid de Beneficios */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* 1. Pago Seguro */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-md">
            <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <FaLock size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pagos Encriptados</h3>
            <p className="text-gray-500 text-sm">
              Tus datos viajan con seguridad bancaria a través de Wompi. Nosotros nunca vemos tu tarjeta.
            </p>
          </div>

          {/* 2. Garantía de Satisfacción */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-md relative overflow-hidden">
            {/* Cinta decorativa */}
            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-green-500 rounded-bl-full opacity-20"></div>
            
            <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <FaShieldAlt size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Garantía de 7 Días post-lanzamiento</h3>
            <p className="text-gray-500 text-sm">
              Si el contenido del libro no cumple tus expectativas, te devolvemos el 100% de tu dinero sin preguntas.
            </p>
          </div>

          {/* 3. Acceso Vitalicio */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-md">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <FaCloudDownloadAlt size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Acceso Vitalicio</h3>
            <p className="text-gray-500 text-sm">
              Una vez lo descargues, el archivo es tuyo para siempre. Sin suscripciones ni pagos mensuales.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}