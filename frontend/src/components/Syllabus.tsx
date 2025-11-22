import { FaCheckCircle, FaRobot, FaMicrophoneAlt, FaBrain, FaGift, FaLockOpen } from "react-icons/fa";

const modules = [
  {
    title: "Módulo 1: Reseteo Mental",
    description: "Por qué tu cerebro se bloquea al hablar y cómo la IA elimina ese miedo en 24 horas.",
    icon: <FaBrain className="text-white" size={20} />,
    color: "bg-pink-500"
  },
  {
    title: "Módulo 2: El Método IA Spoken",
    description: "Configura ChatGPT para que sea tu tutor nativo privado disponible 24/7 (Prompts exactos incluidos).",
    icon: <FaRobot className="text-white" size={20} />,
    color: "bg-indigo-500"
  },
  {
    title: "Módulo 3: Fonética sin Dolor",
    description: "Técnicas de 'Shadowing' con IA para que dejes de sonar como robot y tengas ritmo natural.",
    icon: <FaMicrophoneAlt className="text-white" size={20} />,
    color: "bg-blue-500"
  },
  {
    title: "Módulo 4: Vocabulario Contextual",
    description: "Deja de memorizar listas. Aprende las 1000 palabras que realmente usan los nativos en el trabajo y la vida.",
    icon: <FaCheckCircle className="text-white" size={20} />,
    color: "bg-green-500"
  }
];

export default function Syllabus() {
  return (
    <section className="py-20 bg-white" id="temario">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Lo que vas a <span className="text-indigo-600">Dominar</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Este no es un libro de gramática. Es un manual práctico paso a paso para hackear tu aprendizaje usando Inteligencia Artificial.
          </p>
        </div>

        {/* GRID DE MÓDULOS */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-12">
          {modules.map((module, index) => (
            <div 
              key={index} 
              className="relative flex items-start p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl ${module.color} shadow-lg mr-4`}>
                {module.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {module.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- EL BONUS "GOLDEN TICKET" --- */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 p-8 shadow-sm">
          {/* Elemento decorativo de fondo */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-400 rounded-full opacity-10 blur-2xl"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 h-16 w-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shadow-sm border border-orange-200">
                <FaGift size={30} />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2 justify-center md:justify-start">
                  BONUS DE ACCIÓN RÁPIDA
                  <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full border border-orange-200">Limitado</span>
                </h3>
                <p className="text-gray-700 font-medium mt-1">
                  La Bóveda de Prompts Prohibidos
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Copia y pega estos comandos secretos en ChatGPT para que actúe como profesor de Cambridge.
                </p>
              </div>
            </div>

            <div className="text-center bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-orange-100 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Valor Real</p>
              <p className="text-2xl font-bold text-gray-400 line-through">$15 USD</p>
              <p className="text-lg font-extrabold text-green-600 mt-1">¡GRATIS HOY!</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}