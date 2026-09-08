'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { LuxuryCar3D } from '../3d/LuxuryCar3D';
import { Car, Sparkles, Compass } from 'lucide-react';

const DrivingRoadScene: React.FC = () => {
  const roadRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (roadRef.current) {
      // Endless highway movement effect
      roadRef.current.position.z = (roadRef.current.position.z + delta * 8) % 10;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2.2, 5.5]} fov={50} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color="#FFF5EA" />
      <directionalLight position={[-10, 10, -10]} intensity={0.6} color="#D4AF37" />
      <Environment preset="night" />

      {/* Car Mesh positioned on highway */}
      <group position={[0, -0.1, 0]}>
        <LuxuryCar3D interactive={false} />
      </group>

      {/* Endless Moving Road & Streetlights */}
      <group ref={roadRef}>
        {/* Asphalt Road Plane */}
        <mesh position={[0, -0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 100]} />
          <meshStandardMaterial color="#0B0B10" roughness={0.8} />
        </mesh>

        {/* Glowing Golden Center Road Lines */}
        {[-30, -20, -10, 0, 10, 20, 30].map((z, idx) => (
          <mesh key={idx} position={[0, -0.24, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.25, 4]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={2} />
          </mesh>
        ))}

        {/* Side Streetlight Poles */}
        {[-25, -15, -5, 5, 15, 25].map((z, idx) => (
          <group key={idx}>
            <mesh position={[-5, 2, z]}>
              <cylinderGeometry args={[0.08, 0.08, 4.5]} />
              <meshStandardMaterial color="#222" />
            </mesh>
            <mesh position={[-5, 4.25, z]}>
              <sphereGeometry args={[0.25]} />
              <meshStandardMaterial color="#FFDF6D" emissive="#FFDF6D" emissiveIntensity={3} />
            </mesh>

            <mesh position={[5, 2, z]}>
              <cylinderGeometry args={[0.08, 0.08, 4.5]} />
              <meshStandardMaterial color="#222" />
            </mesh>
            <mesh position={[5, 4.25, z]}>
              <sphereGeometry args={[0.25]} />
              <meshStandardMaterial color="#FFDF6D" emissive="#FFDF6D" emissiveIntensity={3} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
};

export const ScrollRoad3D: React.FC = () => {
  return (
    <section className="relative py-16 bg-obsidian border-y border-gold/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-serif font-bold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
            <Compass className="w-3.5 h-3.5 text-gold animate-spin" />
            <span>Smooth Highway Experience</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-light uppercase tracking-wider">
            CINEMATIC 3D ROADWAY JOURNEY
          </h2>
          <p className="text-xs text-gray-400 font-light">
            Whisper-quiet air suspension, acoustic double-pane glazing, and active noise cancellation.
          </p>
        </div>

        {/* 3D Highway Canvas View */}
        <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-gold/25 shadow-2xl bg-black">
          <Canvas gl={{ antialias: true, alpha: true }}>
            <DrivingRoadScene />
          </Canvas>

          {/* Ambient Overlay Banner */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-center justify-between bg-obsidian-card/85 backdrop-blur-md border border-gold/30 p-4 rounded-2xl text-xs">
            <div className="flex items-center space-x-3">
              <Car className="w-5 h-5 text-gold" />
              <div>
                <span className="font-serif font-bold text-gold-light block">
                  ACTIVE NOISE CANCELLATION CABIN
                </span>
                <span className="text-[10px] text-gray-400">
                  Adaptive air ride suspension dampens Manhattan cobblestones & highway bumps
                </span>
              </div>
            </div>
            <span className="mt-2 sm:mt-0 font-mono text-gold text-xs font-bold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
              60 FPS SMOOTH RIDE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
