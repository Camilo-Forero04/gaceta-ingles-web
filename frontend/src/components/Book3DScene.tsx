// frontend/src/components/Book3DScene.tsx
"use client";

import React, { useRef, Suspense } from "react"; // <--- 1. AQUÍ AGREGAMOS Suspense
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function BookModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const coverTexture = useTexture("/book_cover_texture.jpg");
  
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
        
        {/* FRENTE - Tu Portada */}
        <meshStandardMaterial attach="material-4" map={coverTexture} roughness={0.4} metalness={0.1} />
        
        {/* ATRÁS */}
        <meshStandardMaterial attach="material-5" color={bookPaperColor} roughness={0.6} />
      </mesh>
    </Float>
  );
}

export default function Book3DScene() {
  return (
    <div className="h-[500px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0, 9], fov: 40 }}> {/* Alejé un poco la cámara (9) y bajé el FOV para menos distorsión */}
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
            <BookModel />
            <Environment preset="city" />
        </Suspense>

        <ContactShadows position={[0, -2.8, 0]} opacity={0.4} scale={10} blur={2.5} far={4.5} />
      </Canvas>
    </div>
  );
}