import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import StudioLights from '../lights/StudioLights';
import { AnimalMascot } from '../models/AnimalMascots';

function SpatialCard({ profession, position, onSelect }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetZ = hovered ? position[2] + 0.6 : position[2];
    const targetScale = hovered ? 1.15 : 1.0;

    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      delta * 6
    );
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 6
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(profession);
      }}
    >
      {/* 3D Floating Base Plinth */}
      <mesh position={[0, -0.7, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.35, 1.45, 0.22, 32]} />
        <meshStandardMaterial
          color={hovered ? '#FF8A1F' : '#FFFFFF'}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Orange Accent Ring */}
      <mesh position={[0, -0.57, 0]}>
        <cylinderGeometry args={[1.25, 1.25, 0.05, 32]} />
        <meshStandardMaterial color="#FF8A1F" roughness={0.3} />
      </mesh>

      {/* 3D Animal Mascot Character */}
      <AnimalMascot
        species={profession.species}
        isHovered={hovered}
        scale={0.9}
      />

      {/* Floating 3D UI Label Badge attached to the 3D entity */}
      <Html
        position={[0, -1.15, 0]}
        center
        distanceFactor={9}
        className="pointer-events-none select-none"
      >
        <div
          className={`px-4 py-2 rounded-2xl text-center whitespace-nowrap transition-all duration-300 shadow-soft border ${
            hovered
              ? 'bg-[#FF8A1F] text-white border-white scale-110 shadow-soft-hover'
              : 'bg-white/95 text-[#202020] border-[#EFE8DE]'
          }`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">
            {profession.animal}
          </div>
          <div className="text-sm font-extrabold">{profession.name}</div>
          <div className="text-[9px] font-semibold mt-0.5 opacity-90">
            Tap to Register →
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function Spatial3DGrid({ professions, onSelectProfession }) {
  // 4 columns x 5 rows in 3D space
  const COLS = 4;
  const GAP_X = 3.4;
  const GAP_Y = 3.2;

  return (
    <div className="w-full h-[78vh] sm:h-[82vh] relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FFF6EB] to-[#FFEED9] border border-[#EFE8DE] shadow-soft">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 12], fov: 48 }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <StudioLights />

        <group position={[0, 0, 0]}>
          {professions.map((prof, idx) => {
            const col = idx % COLS;
            const row = Math.floor(idx / COLS);
            const posX = (col - (COLS - 1) / 2) * GAP_X;
            const posY = ((Math.ceil(professions.length / COLS) - 1) / 2 - row) * GAP_Y;
            return (
              <SpatialCard
                key={prof.id || prof.slug}
                profession={prof}
                position={[posX, posY, 0]}
                onSelect={onSelectProfession}
              />
            );
          })}
        </group>

        {/* Smooth Orbit Controls with restricted tilt */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 3}
          minDistance={6}
          maxDistance={18}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Floating 3D Controls Helper */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#EFE8DE] text-xs font-semibold text-[#77716B] shadow-sm flex items-center gap-3 pointer-events-none">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF8A1F] animate-pulse"></span>
          Drag to Orbit 3D Grid
        </span>
        <span>•</span>
        <span>Scroll to Zoom</span>
        <span>•</span>
        <span className="text-[#FF8A1F]">Click any 3D Mascot to Register</span>
      </div>
    </div>
  );
}
