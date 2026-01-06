import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // 1. Forzar compresión Gzip/Brotli (Reduce el tamaño de transferencia)
  compress: true, 

  // 2. Optimización de Imágenes
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // 3. Optimización de CSS Crítico
  experimental: {
    optimizeCss: true,
    // Agregamos esto para ayudar al Tree Shaking de librerías grandes
    optimizePackageImports: ['react-icons', 'three', '@react-three/drei', '@react-three/fiber'],
  },
};

export default nextConfig;