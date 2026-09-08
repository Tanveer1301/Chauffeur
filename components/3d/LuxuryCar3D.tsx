'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useFleetStore } from '@/store/useFleetStore';

interface LuxuryCar3DProps {
  interactive?: boolean;
}

export const LuxuryCar3D: React.FC<LuxuryCar3DProps> = ({ interactive = true }) => {
  const groupRef = useRef<THREE.Group>(null);

  const {
    paintColor,
    paintFinish,
    rimStyle,
    tintLevel,
    interiorMode,
    autoRotate,
    selectedVehicleId,
  } = useFleetStore();

  // Smooth rotation
  useFrame((_, delta) => {
    if (autoRotate && groupRef.current && interactive) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  // Calculate material properties from finish
  const getMaterialProps = () => {
    switch (paintFinish) {
      case 'satin':
        return { metalness: 0.4, roughness: 0.5, clearcoat: 0.1 };
      case 'pearl':
        return { metalness: 0.85, roughness: 0.1, clearcoat: 1.0, clearcoatRoughness: 0.05 };
      case 'metallic':
      default:
        return { metalness: 0.9, roughness: 0.2, clearcoat: 0.8, clearcoatRoughness: 0.1 };
    }
  };

  const matProps = getMaterialProps();

  // Rim color logic
  const getRimColor = () => {
    if (rimStyle === 'gold-spoke') return '#D4AF37';
    if (rimStyle === 'black-concave') return '#1A1A24';
    return '#E5E7EB'; // Chrome
  };

  const rimColor = getRimColor();

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={interiorMode ? [0, 1.2, 0.2] : [3.8, 1.6, 4.8]}
        fov={45}
      />
      {interactive && (
        <OrbitControls
          enablePan={false}
          minDistance={ interiorMode ? 0.1 : 3 }
          maxDistance={ interiorMode ? 1.5 : 8 }
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.05}
          dampingFactor={0.05}
        />
      )}

      {/* Studio Lighting Setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={1.5} color="#FFF5EA" castShadow />
      <directionalLight position={[-10, 10, -10]} intensity={0.8} color="#D4AF37" />
      <spotLight position={[0, 10, 0]} intensity={1.2} color="#FFFFFF" angle={0.6} penumbra={0.8} />

      <Environment preset="city" />

      <Float speed={1.5} rotationIntensity={0.02} floatIntensity={0.05}>
        <group ref={groupRef} position={[0, -0.2, 0]}>
          {/* Main Vehicle Body Mesh */}
          <mesh castShadow receiveShadow position={[0, 0.7, 0]}>
            <boxGeometry args={selectedVehicleId === 'suv' ? [2.1, 1.3, 4.8] : selectedVehicleId === 'sprinter' ? [2.2, 1.9, 5.2] : [2.0, 0.9, 4.5]} />
            <meshPhysicalMaterial
              color={paintColor}
              metalness={matProps.metalness}
              roughness={matProps.roughness}
              clearcoat={matProps.clearcoat}
              clearcoatRoughness={matProps.clearcoatRoughness}
              reflectivity={1.0}
            />
          </mesh>

          {/* Roof & Cabin Curve */}
          <mesh castShadow receiveShadow position={[0, 1.3, -0.2]}>
            <boxGeometry args={selectedVehicleId === 'suv' ? [1.9, 0.7, 2.8] : selectedVehicleId === 'sprinter' ? [2.1, 1.1, 3.2] : [1.7, 0.65, 2.3]} />
            <meshPhysicalMaterial
              color={paintColor}
              metalness={matProps.metalness}
              roughness={matProps.roughness}
              clearcoat={matProps.clearcoat}
            />
          </mesh>

          {/* Tinted Windows */}
          <mesh position={[0, 1.32, -0.2]}>
            <boxGeometry args={selectedVehicleId === 'suv' ? [1.92, 0.62, 2.7] : selectedVehicleId === 'sprinter' ? [2.12, 1.02, 3.1] : [1.72, 0.58, 2.2]} />
            <meshPhysicalMaterial
              color="#050508"
              transparent
              opacity={tintLevel}
              roughness={0.05}
              transmission={1 - tintLevel}
              ior={1.5}
            />
          </mesh>

          {/* Front Windshield Glass */}
          <mesh position={[0, 1.25, 1.0]} rotation={[-0.45, 0, 0]}>
            <planeGeometry args={[1.6, 0.8]} />
            <meshPhysicalMaterial
              color="#0A0A10"
              transparent
              opacity={tintLevel * 0.9}
              transmission={1 - tintLevel}
              roughness={0.05}
            />
          </mesh>

          {/* Gold Chrome Grille */}
          <mesh position={[0, 0.65, 2.26]}>
            <planeGeometry args={[1.4, 0.5]} />
            <meshStandardMaterial
              color="#D4AF37"
              metalness={0.95}
              roughness={0.15}
              emissive="#3A2A07"
            />
          </mesh>

          {/* Headlights (LED Crystal Daytime Lights) */}
          <mesh position={[-0.75, 0.75, 2.26]}>
            <boxGeometry args={[0.35, 0.15, 0.05]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#E2F0FF" emissiveIntensity={3} />
          </mesh>
          <mesh position={[0.75, 0.75, 2.26]}>
            <boxGeometry args={[0.35, 0.15, 0.05]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#E2F0FF" emissiveIntensity={3} />
          </mesh>

          {/* Taillights */}
          <mesh position={[-0.75, 0.75, -2.26]}>
            <boxGeometry args={[0.4, 0.12, 0.05]} />
            <meshStandardMaterial color="#FF1A1A" emissive="#FF0000" emissiveIntensity={2.5} />
          </mesh>
          <mesh position={[0.75, 0.75, -2.26]}>
            <boxGeometry args={[0.4, 0.12, 0.05]} />
            <meshStandardMaterial color="#FF1A1A" emissive="#FF0000" emissiveIntensity={2.5} />
          </mesh>

          {/* Wheels (4 Wheels with customizable Rims) */}
          {[
            [-0.95, 0.35, 1.4],
            [0.95, 0.35, 1.4],
            [-0.95, 0.35, -1.4],
            [0.95, 0.35, -1.4],
          ].map(([x, y, z], idx) => (
            <group key={idx} position={[x, y, z]} rotation={[0, 0, Math.PI / 2]}>
              {/* Outer Rubber Tire */}
              <mesh castShadow>
                <cylinderGeometry args={[0.38, 0.38, 0.28, 32]} />
                <meshStandardMaterial color="#111116" roughness={0.9} />
              </mesh>
              {/* Alloy Rim Mesh */}
              <mesh position={[0, 0.01, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.29, 24]} />
                <meshStandardMaterial
                  color={rimColor}
                  metalness={0.95}
                  roughness={0.15}
                />
              </mesh>
              {/* Center Emblem */}
              <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
                <meshStandardMaterial color="#D4AF37" metalness={1.0} roughness={0.1} />
              </mesh>
            </group>
          ))}

          {/* Interior Leather Cabin (Visible in Interior Mode) */}
          {interiorMode && (
            <group position={[0, 0.9, -0.1]}>
              {/* Leather Seats */}
              <mesh position={[-0.45, 0, 0.2]}>
                <boxGeometry args={[0.6, 0.5, 0.6]} />
                <meshStandardMaterial color="#3E2723" roughness={0.6} />
              </mesh>
              <mesh position={[0.45, 0, 0.2]}>
                <boxGeometry args={[0.6, 0.5, 0.6]} />
                <meshStandardMaterial color="#3E2723" roughness={0.6} />
              </mesh>
              {/* Steering Wheel */}
              <mesh position={[0.45, 0.3, 0.6]} rotation={[0.4, 0, 0]}>
                <torusGeometry args={[0.18, 0.03, 16, 32]} />
                <meshStandardMaterial color="#1A1A24" metalness={0.8} />
              </mesh>
              {/* Ambient Gold Strip */}
              <mesh position={[0, 0.25, 0.7]}>
                <boxGeometry args={[1.5, 0.03, 0.02]} />
                <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={1.5} />
              </mesh>
            </group>
          )}
        </group>
      </Float>

      {/* Realistic Ground Shadow & Reflection Floor */}
      <ContactShadows
        position={[0, -0.22, 0]}
        opacity={0.7}
        scale={10}
        blur={2}
        far={4}
      />
    </>
  );
};
