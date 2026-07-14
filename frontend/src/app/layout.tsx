import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import PixelWrapper from "../components/PixelWrapper"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

// Optimización de fuente: swap para que el texto se vea de inmediato
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', 
  preload: true
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gacetaingles.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "La Gaceta del Inglés - Desbloquea tu Fluidez",
    template: "%s | La Gaceta del Inglés",
  },
  description:
    "Aprende inglés real con el Método IA SPOKEN: combina Inteligencia Artificial y práctica conversacional para hablar sin miedo.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: "La Gaceta del Inglés",
    title: "La Gaceta del Inglés - Desbloquea tu Fluidez",
    description:
      "Aprende inglés real con el Método IA SPOKEN: combina Inteligencia Artificial y práctica conversacional para hablar sin miedo.",
    images: [
      {
        url: "/book_cover_texture_2.avif",
        width: 800,
        height: 1000,
        alt: "eBook Desbloquea tu Fluidez - Método IA SPOKEN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Gaceta del Inglés - Desbloquea tu Fluidez",
    description:
      "Aprende inglés real con el Método IA SPOKEN: IA + práctica conversacional para hablar sin miedo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* 🚀 OPTIMIZACIÓN DE VELOCIDAD: Abrir túnel con Wompi antes de tiempo */}
        <link rel="preconnect" href="https://checkout.wompi.co" />
        <link rel="dns-prefetch" href="https://checkout.wompi.co" />
      </head>

      {/* Estructura Flex para que el Footer siempre esté abajo */}
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <PixelWrapper />
        
        <Navbar />
        
        {/* pt-16: Espacio para que la barra de navegación no tape el título */}
        {/* flex-grow: Empuja el footer hacia abajo */}
        <main className="flex-grow pt-16">
          {children}
        </main>

        <Footer />
        
        <WhatsAppButton />
        
        <Script 
          src="https://checkout.wompi.co/widget.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}