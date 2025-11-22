import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  // Configura aquí tus datos
  const PHONE_NUMBER = "573017014244"; 
  const MESSAGE = "Hola, estoy interesado en la preventa de La Gaceta del Inglés.";
  
  // Codificamos el mensaje para URL
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      {/* Efecto de onda (ping) para llamar la atención */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 group-hover:hidden"></span>
      
      <FaWhatsapp size={32} className="relative" />
    </a>
  );
}