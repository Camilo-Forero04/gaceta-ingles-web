import type { Metadata } from "next";
import PresaleHero from "../../components/PresaleHero";
import Syllabus from "../../components/Syllabus";
import Guarantee from "../../components/Guarantee";

export const metadata: Metadata = {
  title: "eBook Desbloquea tu Fluidez - Método IA SPOKEN",
  description:
    "El manual práctico para hablar inglés usando Inteligencia Artificial como tu tutor nativo 24/7. Incluye Speaking Challenge de 20 días por WhatsApp.",
  alternates: { canonical: "/ebook" },
};

export default function EbookPage() {
  return (
    <div className="min-h-screen bg-white">
      <PresaleHero />
      <Syllabus />
      <Guarantee />
    </div>
  );
}
