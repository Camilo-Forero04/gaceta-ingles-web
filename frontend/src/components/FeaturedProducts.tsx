import Link from 'next/link';
// Si prefieres usar tu Book3DScene en lugar de una imagen estática, 
// puedes importarlo aquí: import Book3DScene from './Book3DScene';

export default function FeaturedProducts() {
  return (
    <section className="bg-slate-50 py-24" id="programas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Comienza tu transformación
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Herramientas prácticas y directas al grano para que dejes la teoría y domines la conversación real.
          </p>
        </div>

        {/* Grid de Productos (Actualmente 1, pero listo para crecer) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          
          {/* Tarjeta del E-book */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col max-w-sm mx-auto w-full">
            
            {/* Imagen / Mockup */}
            <div className="bg-slate-100 aspect-[4/3] relative flex items-center justify-center overflow-hidden p-6">
              {/* Etiqueta de Preventa */}
              <div className="absolute top-4 left-4 bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full z-10">
                Fase de Preventa
              </div>
              
              {/* Aquí puedes reemplazar este div por tu <Book3DScene /> o un <Image /> de Next.js con la portada */}
              <div className="w-3/4 h-full bg-white shadow-lg rounded-r-md border-l-4 border-indigo-600 flex items-center justify-center p-4 text-center group-hover:scale-105 transition-transform duration-500">
                <span className="font-black text-slate-800 text-xl leading-tight">
                  DESBLOQUEA <br/> TU FLUIDEZ <br/> EN INGLÉS
                </span>
              </div>
            </div>

            {/* Contenido de la Tarjeta */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                El Método IA SPOKEN
              </h3>
              <p className="text-slate-600 text-sm mb-6 flex-grow">
                De la parálisis por análisis a la conversación real sin miedo. Configura la IA como tu tutor nativo 24/7.
              </p>
              
              {/* Precios */}
              <div className="flex items-end gap-2 mb-6">
                <span className="text-3xl font-black text-slate-900">$26.700</span>
                <span className="text-sm text-slate-400 line-through mb-1">COP $49.000</span>
              </div>

              {/* Botón CTA */}
              <Link 
                href="/libro" 
                className="block w-full text-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors"
              >
                Ver Detalles y Reservar
              </Link>
            </div>
          </div>

          {/* Tarjeta "Próximamente" (Opcional, para dar sensación de academia) */}
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center p-8 text-center max-w-sm mx-auto w-full opacity-60">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Nuevos Programas</h3>
            <p className="text-slate-500 text-sm">
              Pronto habilitaremos inmersiones conversacionales y más herramientas.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}