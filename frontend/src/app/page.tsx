import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import HomeHero from '../components/HomeHero'; // Lo crearemos ahora
import AcademyPillars from '../components/AcademyPillars'; // Lo crearemos ahora
import FeaturedProducts from '../components/FeaturedProducts'; // Lo crearemos ahora

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      
      {/* 1. La propuesta de valor de La Gaceta */}
      <HomeHero />

      {/* 2. Por qué su método es diferente (IA, sin gramática aburrida) */}
      <AcademyPillars />

      {/* 3. Redirección a tus productos (El e-book actual) */}
      <FeaturedProducts />

      <Footer />
      <WhatsAppButton />
    </main>
  );
}