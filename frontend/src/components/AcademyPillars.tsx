export default function AcademyPillars() {
  const pillars = [
    {
      id: 1,
      title: "Tu Tutor Nativo 24/7",
      description: "Convierte a la Inteligencia Artificial en tu compañero de práctica inagotable. Habla a cualquier hora, sin juicios y a tu propio ritmo.",
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Adiós a la Parálisis",
      description: "Las reglas gramaticales te bloquean al hablar. Nuestro enfoque resetea tu mente para que absorbas el idioma de forma natural.",
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Vocabulario Contextual",
      description: "No memorices listas inútiles. Aprende exactamente las palabras y frases que los nativos usan en la vida real y en el trabajo.",
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-white py-24 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">
            La Filosofía de la Gaceta
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
            Aprender inglés está roto. <br/> Nosotros lo arreglamos.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Las academias tradicionales te enseñan a pasar exámenes. Nosotros te damos el sistema para que hackees tu aprendizaje y logres fluidez real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pillars.map((pillar) => (
            <div 
              key={pillar.id} 
              className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors duration-300"
            >
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-indigo-100">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {pillar.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}