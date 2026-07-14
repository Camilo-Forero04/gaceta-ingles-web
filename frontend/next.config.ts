import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // 1. Forzar compresión Gzip/Brotli (Reduce el tamaño de transferencia)
  compress: true, 

  // 2. Optimización de Imágenes
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // 3. Tree Shaking de librerías grandes
  experimental: {
    optimizePackageImports: ['react-icons', 'three', '@react-three/drei', '@react-three/fiber'],
  },
};

export default nextConfig;