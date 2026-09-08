'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { LuxuryCar3D } from './LuxuryCar3D';
import { ConfiguratorPanel } from './ConfiguratorPanel';
import { Loader2, Car, Sparkles } from 'lucide-react';

export const FleetCanvas: React.FC = () => {
  return (
    <div className="relative w-full h-[650px] lg:h-[750px] bg-gradient-to-b from-obsidian via-obsidian-elevated to-obsidian rounded-3xl overflow-hidden border border-gold/20 shadow-2xl">
      {/* Background Lighting & Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-6 left-8 z-10">
        <div className="flex items-center space-x-2 text-xs font-serif tracking-widest text-gold uppercase bg-obsidian-card/80 border border-gold/30 px-3 py-1.5 rounded-full backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" />
          <span>Interactive 3D Studio Showcase</span>
        </div>
      </div>

      {/* 3D Canvas Rendering Engine */}
      <div className="w-full h-full">
        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center space-y-3 bg-obsidian">
              <Loader2 className="w-8 h-8 text-gold animate-spin" />
              <p className="text-xs font-serif tracking-widest text-gold-light uppercase">
                Rendering 3D Luxury Mesh Shaders...
              </p>
            </div>
          }
        >
          <Canvas shadows gl={{ antialias: true, alpha: true }}>
            <LuxuryCar3D interactive />
          </Canvas>
        </Suspense>
      </div>

      {/* Floating Control Panel */}
      <div className="absolute top-6 right-6 z-20 hidden md:block">
        <ConfiguratorPanel />
      </div>

      {/* Mobile Control Panel Drawer (Collapsible) */}
      <div className="md:hidden absolute bottom-4 left-4 right-4 z-20">
        <ConfiguratorPanel />
      </div>
    </div>
  );
};
