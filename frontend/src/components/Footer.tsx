import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* 1. LOGO (Blanco o Invertido para fondo oscuro) */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <Image 
              src="/logo-gaceta-blanco.avif" 
              alt="Logo La Gaceta del Inglés" 
              width={50}  // Ajusta este ancho si es necesario
              height={22}  // Ajusta este alto si es necesario
              className="h-auto w-auto" // Mantiene la proporción
            />
          </Link>
        </div>

        {/* 2. ENLACES DE NAVEGACIÓN */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-sm font-medium text-gray-400">
          <Link href="#" className="hover:text-white transition-colors">
            Sobre Nosotros
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Política de Privacidad
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Términos y Condiciones
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Soporte
          </Link>
        </nav>

        {/* 3. REDES SOCIALES */}
        <div className="flex gap-6 mb-12">
            <a 
            href="https://wa.me/573017014244?text=Hola..."
            target="_blank"
            className="text-gray-400 hover:text-[#25D366] hover:scale-110 transition-all"
          >
            <FaWhatsapp size={22} />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61582472553487" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
            <FaFacebookF size={20} />
          </a>
          <a href="https://www.instagram.com/gacetaingles" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
            <FaInstagram size={22} />
          </a>
          <a href="https://www.tiktok.com/@gacetaingles" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
            <FaTiktok size={20} />
          </a>
          <a href="https://x.com/gacetaIngles" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
            <FaTwitter size={20} />
          </a>
        </div>

        {/* 4. LÍNEA DIVISORIA Y COPYRIGHT */}
        <div className="w-full border-t border-gray-800 pt-8 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} La Gaceta del Inglés. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Hecho con ❤️ en Colombia.
          </p>
        </div>

      </div>
    </footer>
  );
}