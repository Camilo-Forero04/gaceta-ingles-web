import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // <--- 1. IMPORTAR ESTO
import "./globals.css";
import dynamic from "next/dynamic";

// Esto desactiva el SSR (Server Side Rendering) para este componente
const FacebookPixel = dynamic(() => import("../components/FacebookPixel"), { 
  ssr: false 
});

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
        <FacebookPixel />  {/* <--- 2. AGREGAR AQUÍ (Invisible) */}
        
        {children}
        
        <Script 
          src="https://checkout.wompi.co/widget.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}