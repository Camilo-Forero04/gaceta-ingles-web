import PresaleHero from "../components/PresaleHero";
import Syllabus from "../components/Syllabus"; // <--- 1. Importar Temario
import Guarantee from "../components/Guarantee";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Componente Hero */}
      <PresaleHero />

      <Syllabus />

      <Guarantee />

    </main>
  );
}