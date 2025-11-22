import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
// IMPORTAMOS EL WRAPPER, NO EL PIXEL DIRECTO NI EL DYNAMIC AQUÍ
import PixelWrapper from "../components/PixelWrapper"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        {/* Usamos el componente intermediario seguro */}
        <PixelWrapper />
        <Navbar />
        
        {children}

        <Footer />
        
        <Script 
          src="https://checkout.wompi.co/widget.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}