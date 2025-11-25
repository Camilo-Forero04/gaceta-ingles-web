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

export const metadata: Metadata = {
  title: "La Gaceta del Inglés - Preventa",
  description: "Domina el inglés real sin rellenos.",
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