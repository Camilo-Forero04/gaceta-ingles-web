import HomeHero from '../components/HomeHero';
import AcademyPillars from '../components/AcademyPillars';
import FeaturedProducts from '../components/FeaturedProducts';

// Navbar, Footer y WhatsAppButton se renderizan globalmente en layout.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* 1. La propuesta de valor de La Gaceta */}
      <HomeHero />

      {/* 2. Por qué el método es diferente (IA, sin gramática aburrida) */}
      <AcademyPillars />

      {/* 3. Productos (el e-book actual) */}
      <FeaturedProducts />
    </div>
  );
}
