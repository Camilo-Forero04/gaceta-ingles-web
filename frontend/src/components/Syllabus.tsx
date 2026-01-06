import { FaCheckCircle, FaRobot, FaMicrophoneAlt, FaBrain, FaGift, FaLock, FaWhatsapp } from "react-icons/fa";

const modules = [
  {
    title: "Módulo 1: El reseteo Mental",
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

        {/* --- EL BONUS "VIP / INCALCULABLE" (MODIFICADO A WHATSAPP) --- */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-8 shadow-sm">
          {/* Elemento decorativo de fondo */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-green-400 rounded-full opacity-5 blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            
            {/* Lado Izquierdo: Texto persuasivo */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-14 w-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shadow-sm border border-green-200 mt-1">
                {/* Ícono de WhatsApp actualizado */}
                <FaWhatsapp size={28} />
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-wider">
                        Solo en Preventa
                    </span>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200 uppercase tracking-wider">
                        Empieza Hoy Mismo
                    </span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 leading-tight">
                  BONUS VIP: Challenge de Speaking (20 Días)
                </h3>
                <p className="text-gray-600 mt-2 leading-relaxed max-w-xl text-sm md:text-base">
                  No esperes al lanzamiento. Acceso inmediato a nuestro <strong>Grupo Privado de WhatsApp</strong>. 
                  Recibe una misión diaria para <span className="italic text-gray-500">perder el miedo a hablar con soporte real.</span>
                </p>
              </div>
            </div>

            {/* Lado Derecho: La caja de "Incalculable" */}
            <div className="flex-shrink-0">
                <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl border-2 border-green-100 shadow-sm flex flex-col items-center justify-center min-w-[180px]">
                    <div className="text-green-500 mb-2">
                        <FaLock size={20} />
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Valor Real</p>
                    <p className="text-sm font-bold text-gray-800 text-center leading-tight">
                        Incalculable <br/> (Acceso Cerrado)
                    </p>
                </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}