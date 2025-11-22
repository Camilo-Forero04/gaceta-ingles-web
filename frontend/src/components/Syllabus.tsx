import { FaCheckCircle, FaRobot, FaMicrophoneAlt, FaBrain } from "react-icons/fa";

const modules = [
  {
    title: "Módulo 1: Desprogramación",
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
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

        {/* Botón intermedio para el que ya se convenció */}
        <div className="mt-12 text-center">
            <p className="text-sm text-gray-400 mb-4 italic">
                + Bonus: Lista de Prompts Secretos de Regalo 🎁
            </p>
        </div>

      </div>
    </section>
  );
}