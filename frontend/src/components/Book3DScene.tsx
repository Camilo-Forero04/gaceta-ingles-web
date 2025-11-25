"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment, Float, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";

// Pre-cargamos la textura para que esté lista antes del render
useTexture.preload("/book_cover_texture.avif?v=2");

function BookModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  // Estado para la animación de entrada
  const [mounted, setMounted] = useState(false);

  // Textura
  const coverTexture = useTexture("/book_cover_texture.avif?v=2");
  coverTexture.center.set(0.5, 0.5); // Centrar textura por si acaso
  
  // Colores reutilizables (mejora memoria)
  const bookPaperColor = new THREE.Color("#FDFBF7");
  const whiteColor = new THREE.Color("#ffffff");

  // Activar animación de entrada al montar
  useEffect(() => {
    setMounted(true);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
        // 1. Animación de "Idle" (flotando y rotando)
        meshRef.current.rotation.y = Math.sin(t / 4) * 0.3;
        meshRef.current.rotation.x = Math.cos(t / 3) * 0.05;

        // 2. Animación de ENTRADA "Bonita" (Lerp)
        // Si está montado, la escala va hacia 1. Si no, es 0.
        // El '4 * delta' controla la velocidad del efecto "pop"
        const targetScale = mounted ? 1 : 0;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 4 * delta);
    }
  });

  return (
    <Float 
      speed={2.5}         // Un poco más rápido para que se sienta vivo
      rotationIntensity={0.4} 
      floatIntensity={0.5} 
      floatingRange={[-0.05, 0.05]}
    >
      {/* Iniciamos con escala 0 para que el useFrame haga el efecto de crecer */}
      <mesh ref={meshRef} castShadow receiveShadow rotation={[0, -0.3, 0]} scale={[0,0,0]}> 
        <boxGeometry args={[3.2, 5, 0.2]} />
        
        {/* Materiales optimizados */}
        {/* Bordes/Papel */}
        <meshStandardMaterial attach="material-0" color="#EEECE5" roughness={0.9} />
        <meshStandardMaterial attach="material-1" color={bookPaperColor} roughness={0.6} />
        <meshStandardMaterial attach="material-2" color={bookPaperColor} roughness={0.9} />
        <meshStandardMaterial attach="material-3" color={bookPaperColor} roughness={0.9} />
        
        {/* Portada */}
        <meshStandardMaterial
            attach="material-4"
            map={coverTexture}
            color={whiteColor}
            roughness={0.8}       // Mate elegante
            metalness={0.1}       // Un toque mínimo de metalicidad ayuda a captar mejor la luz
            envMapIntensity={0.8} // Aumentado ligeramente para resaltar colores
        />
        
        {/* Contraportada */}
        <meshStandardMaterial attach="material-5" color={bookPaperColor} roughness={0.6} />
      </mesh>
    </Float>
  );
}

// Loader simple mientras carga la textura interna (opcional, pero buena práctica)
function Loader() {
  return (
    <Html center>
      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
    </Html>
  )
}

export default function Book3DScene() {
  return (
    <div className="h-full w-full flex items-center justify-center pointer-events-none fade-in-element">
      <Canvas 
        shadows 
        dpr={[1, 2]} // 🔥 CRÍTICO: Limita pixel ratio a 2x para móviles (evita sobrecalentamiento)
        camera={{ position: [0, 0, 9], fov: 40 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }} // Suavizado de bordes
      >
        
        {/* Iluminación mejorada para resaltar el libro */}
        <ambientLight intensity={0.7} />
        <spotLight 
            position={[10, 15, 10]} 
            angle={0.4} 
            penumbra={1} 
            intensity={1.2} 
            castShadow 
            shadow-bias={-0.0001} // Evita artefactos en la sombra
        />
        {/* Luz de contra (Rim light) para separar el libro del fondo */}
        <spotLight position={[-5, 5, -5]} intensity={0.5} color="#e0e7ff" />

        <React.Suspense fallback={<Loader />}>
            <BookModel />
            <Environment preset="city" />
        </React.Suspense>

        {/* Sombras de contacto más suaves */}
        <ContactShadows 
            position={[0, -2.8, 0]} 
            opacity={0.35} 
            scale={12} 
            blur={2.8} 
            far={5} 
            resolution={256} // Baja resolución para mejor performance (suficiente para sombra difusa)
        />
      </Canvas>
    </div>
  );
}