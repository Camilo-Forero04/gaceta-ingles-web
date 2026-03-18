import Link from 'next/link';

export default function HomeHero() {
  return (
    <section className="relative bg-white pt-24 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-medium text-sm mb-8">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
          Revolucionando el aprendizaje de idiomas
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          Deja de estudiar inglés. <br />
          <span className="text-indigo-600">Empieza a hablarlo.</span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-10">
          En La Gaceta del Inglés combinamos Inteligencia Artificial y práctica conversacional real para que pierdas el miedo y hackees tu fluidez en tiempo récord.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Botón principal que lleva a la landing del libro */}
          <Link 
            href="/libro" 
            className="px-8 py-4 text-lg font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30"
          >
            Conoce el Método IA SPOKEN
          </Link>
          
          {/* Botón secundario para generar comunidad */}
          <Link 
            href="#comunidad" 
            className="px-8 py-4 text-lg font-bold rounded-full text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
          >
            Únete a la Comunidad
          </Link>
        </div>
      </div>
      
      {/* Elemento decorativo de fondo suave (opcional para mantener el minimalismo) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>
    </section>
  );
}