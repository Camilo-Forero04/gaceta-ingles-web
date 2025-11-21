// frontend/src/components/Book3DScene.tsx
"use client";

import React, { useRef, Suspense } from "react"; // <--- 1. AQUÍ AGREGAMOS Suspense
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function BookModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const coverTexture = useTexture("/book_cover_texture.jpg?v=2");
  
  // Configuración para que la textura se estire bien si es necesario
  coverTexture.center.set(0.5, 0.5); 
  
  const bookPaperColor = new THREE.Color("#FDFBF7");

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
        meshRef.current.rotation.y = Math.sin(t / 4) * 0.3;
        meshRef.current.rotation.x = Math.cos(t / 3) * 0.05;
    }
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={0.6} 
      floatingRange={[-0.05, 0.05]}
    >
      {/* 2. AJUSTA LAS DIMENSIONES AQUÍ 
         args = [ANCHO, ALTO, GROSOR]
         
         - He aumentado el ancho a 3.5 y alto a 5 para que se vea más grande.
         - He bajado el grosor a 0.2 para que se vea más elegante (menos ladrillo).
      */}
      <mesh ref={meshRef} castShadow receiveShadow rotation={[0, -0.3, 0]}>
        <boxGeometry args={[3.5, 5, 0.2]} /> 
        
        {/* Materiales */}
        <meshStandardMaterial attach="material-0" color={"#EEECE5"} roughness={0.9} />
        <meshStandardMaterial attach="material-1" color={bookPaperColor} roughness={0.6} />
        <meshStandardMaterial attach="material-2" color={bookPaperColor} roughness={0.9} />
        <meshStandardMaterial attach="material-3" color={bookPaperColor} roughness={0.9} />
        
        <meshStandardMaterial 
            attach="material-4" 
            map={coverTexture} 
            color="white" // Agrega esto por si la textura falla
            roughness={0.4} 
            metalness={0.1} 
        />
        
        {/* ATRÁS */}
        <meshStandardMaterial attach="material-5" color={bookPaperColor} roughness={0.6} />
      </mesh>
    </Float>
  );
}

export default function Book3DScene() {
  return (
    // CAMBIO AQUÍ: Quitamos h-[500px] y ponemos h-full
    <div className="h-full w-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none">
      <Canvas shadows camera={{ position: [0, 0, 9], fov: 40 }}>
         {/* ... resto del código igual ... */}
      </Canvas>
    </div>
  );
}