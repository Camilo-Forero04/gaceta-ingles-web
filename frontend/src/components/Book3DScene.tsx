"use client";



import React, { useRef } from "react";

import { Canvas, useFrame } from "@react-three/fiber";

import { useTexture, Environment, Float, ContactShadows } from "@react-three/drei";

import * as THREE from "three";



function BookModel() {

  const meshRef = useRef<THREE.Mesh>(null);

 

  // Cargamos la textura (mantenemos el v=2 por seguridad de caché)

  const coverTexture = useTexture("/book_cover_texture.avif?v=2");

  coverTexture.center.set(0.5, 0.5);

 

  const bookPaperColor = new THREE.Color("#FDFBF7");



  useFrame((state) => {

    const t = state.clock.getElapsedTime();

    if (meshRef.current) {

        // Rotación suave y elegante

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

       

        <meshStandardMaterial

            attach="material-4"

            map={coverTexture}

            color="#ffffff"      // Mantenemos el blanco puro

            roughness={0.8}      // ALTO: Para que sea mate (sin brillo)

            metalness={0.0}      // Nada metálico

            envMapIntensity={0.5} // BAJO: Reducimos los reflejos del entorno

        />

       

        {/* ATRÁS */}

        <meshStandardMaterial attach="material-5" color={bookPaperColor} roughness={0.6} />

      </mesh>

    </Float>

  );

}



export default function Book3DScene() {

  return (

    // ✨ LIMPIEZA: Quitamos el borde rojo y el z-50

    <div className="h-full w-full flex items-center justify-center pointer-events-none">

      <Canvas shadows camera={{ position: [0, 0, 9], fov: 40 }}>

       

        {/* 💡 ILUMINACIÓN CINEMÁTICA: Bajamos la luz ambiente para recuperar sombras */}

        <ambientLight intensity={0.6} />

        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} castShadow />

        <pointLight position={[-10, -10, -10]} intensity={0.5} />

       

        {/* Ya no necesitamos Suspense aquí porque lo maneja el dynamic import del padre */}

        <BookModel />

        <Environment preset="city" />



        <ContactShadows position={[0, -2.8, 0]} opacity={0.4} scale={10} blur={2.5} far={4.5} />

      </Canvas>

    </div>

  );

}