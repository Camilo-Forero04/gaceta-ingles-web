"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function BookModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Asegúrate de que este nombre coincida con tu archivo en public
  const coverTexture = useTexture("/book_cover_texture.jpg?v=2"); 
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
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6} floatingRange={[-0.05, 0.05]}>
      <mesh ref={meshRef} castShadow receiveShadow rotation={[0, -0.3, 0]}>
        <boxGeometry args={[3.2, 5, 0.2]} /> 
        
        {/* Materiales */}
        <meshStandardMaterial attach="material-0" color={"#EEECE5"} roughness={0.9} />
        <meshStandardMaterial attach="material-1" color={bookPaperColor} roughness={0.6} />
        <meshStandardMaterial attach="material-2" color={bookPaperColor} roughness={0.9} />
        <meshStandardMaterial attach="material-3" color={bookPaperColor} roughness={0.9} />
        
        {/* FRENTE - Tu Portada con luz propia para que no se vea oscura */}
        <meshStandardMaterial 
            attach="material-4" 
            map={coverTexture} 
            roughness={0.8} 
            metalness={0.0} 
            emissive={"white"} 
            emissiveIntensity={0.1} 
        />
        
        {/* ATRÁS */}
        <meshStandardMaterial attach="material-5" color={bookPaperColor} roughness={0.6} />
      </mesh>
    </Float>
  );
}

export default function Book3DScene() {
  return (
    // 👇 BORDE ROJO TEMPORAL PARA DIAGNÓSTICO
    <div className="h-full w-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none border-4 border-red-500 z-50">
      <Canvas shadows camera={{ position: [0, 0, 9], fov: 40 }}>
        
        {/* ILUMINACIÓN "A PRUEBA DE FALLOS" */}
        <ambientLight intensity={2.0} /> {/* Luz ambiental muy fuerte */}
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1.0} />
        
        <Suspense fallback={null}>
            <BookModel />
            <Environment preset="city" />
        </Suspense>

        <ContactShadows position={[0, -2.8, 0]} opacity={0.4} scale={10} blur={2.5} far={4.5} />
      </Canvas>
    </div>
  );
}