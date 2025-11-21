// frontend/src/components/Book3DScene.tsx
"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function BookModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  // Cargar la textura de la portada desde la carpeta public
  const coverTexture = useTexture("/book_cover_texture.png");
  // Configurar color de fondo de la portada para que coincida con el resto del libro
  const bookPaperColor = new THREE.Color("#FDFBF7"); // Un blanco hueso similar al fondo de tu portada

  // Animación suave en cada frame
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
        // Rotación suave en el eje Y
        meshRef.current.rotation.y = Math.sin(t / 3) * 0.3;
        // Inclinación muy sutil en X para dinamismo
        meshRef.current.rotation.x = Math.sin(t / 2) * 0.05;
    }
  });

  return (
    <Float 
      speed={2} // Velocidad de la animación de flotación
      rotationIntensity={0.5} // Intensidad de la rotación aleatoria
      floatIntensity={1} // Intensidad de la flotación arriba/abajo
      floatingRange={[-0.1, 0.1]} // Rango de movimiento
    >
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Geometría de caja: [ancho, alto, profundidad] */}
        <boxGeometry args={[3, 4.3, 0.4]} />
        
        {/* Materiales para las 6 caras de la caja */}
        {/* El orden suele ser: derecha, izquierda, arriba, abajo, FRENTE, atrás */}
        
        {/* Lados (páginas) - un poco más oscuros */}
        <meshStandardMaterial attach="material-0" color={"#EEECE5"} roughness={0.9} />
        <meshStandardMaterial attach="material-1" color={"#EEECE5"} roughness={0.9} />
        {/* Arriba/Abajo */}
        <meshStandardMaterial attach="material-2" color={bookPaperColor} roughness={0.9} />
        <meshStandardMaterial attach="material-3" color={bookPaperColor} roughness={0.9} />
        
        {/* FRENTE - Tu portada */}
        <meshStandardMaterial attach="material-4" map={coverTexture} roughness={0.4} metalness={0.1} />
        
        {/* ATRÁS - Color sólido */}
        <meshStandardMaterial attach="material-5" color={bookPaperColor} roughness={0.9} />
      </mesh>
    </Float>
  );
}

export default function Book3DScene() {
  return (
    <div className="h-[500px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Iluminación */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* El Libro */}
        <BookModel />

        {/* Sombra de contacto en el suelo para realismo */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />

        {/* Entorno para reflejos sutiles */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}