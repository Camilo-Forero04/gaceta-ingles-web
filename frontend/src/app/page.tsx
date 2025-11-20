import PresaleHero from "../components/PresaleHero";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Componente Navbar (Pendiente) */}
      <nav className="p-4 border-b text-center text-sm text-gray-400">
        [ Navbar: La Gaceta del Inglés ]
      </nav>

      {/* Componente Hero */}
      <PresaleHero />

      {/* Componente Footer (Pendiente) */}
      <footer className="p-10 border-t text-center text-sm text-gray-400 mt-10">
        © 2025 La Gaceta del Inglés. Todos los derechos reservados.
      </footer>
    </main>
  );
}