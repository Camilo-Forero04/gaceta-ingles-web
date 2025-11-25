"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment, Float, ContactShadows } from "@react-three/drei";
// 👇 CAMBIO CLAVE: Ya no importamos todo (*), solo lo que usamos (Color, Mesh)
import { Color, type Mesh } from "three";

function BookModel() {
  // Usamos el tipo específico 'Mesh' en lugar de 'THREE.Mesh'
  const meshRef = useRef<Mesh>(null);
  
  const coverTexture = useTexture("/book_cover_texture.avif?v=2"); 
  coverTexture.center.set(0.5, 0.5); 
  
  // Usamos 'new Color' directo, sin el prefijo THREE.
  const bookPaperColor = new Color("#FDFBF7");

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
        
        <meshStandardMaterial attach="material-0" color={"#EEECE5"} roughness={0.9} />
        <meshStandardMaterial attach="material-1" color={bookPaperColor} roughness={0.6} />
        <meshStandardMaterial attach="material-2" color={bookPaperColor} roughness={0.9} />
        <meshStandardMaterial attach="material-3" color={bookPaperColor} roughness={0.9} />
        
        <meshStandardMaterial 
            attach="material-4" 
            map={coverTexture} 
            color="#fafafa" 
            roughness={0.5} 
            metalness={0.0} 
            envMapIntensity={0.8} 
        />
        
        <meshStandardMaterial attach="material-5" color={bookPaperColor} roughness={0.6} />
      </mesh>
    </Float>
  );
}

export default function Book3DScene() {
  return (
    <div className="h-full w-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none">
      {/* Mantenemos el dpr bajo para rendimiento en móviles */}
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 35 }}>
        
        <ambientLight intensity={0.4} /> 
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.0} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <BookModel />
        <Environment preset="city" />
        
        {/* Mantenemos la optimización de frames=1 */}
        <ContactShadows position={[0, -2.8, 0]} opacity={0.4} scale={10} blur={2.5} far={4.5} resolution={256} frames={1} />
      </Canvas>
    </div>
  );
}