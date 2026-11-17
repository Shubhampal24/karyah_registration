import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const clay = (color, roughness = 0.35, metalness = 0.08) => (
  <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
);

export function AnimalMascot({ species, isHovered, scale = 1 }) {
  const rootRef = useRef();

  useFrame((state, delta) => {
    if (!rootRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating breathing animation
    rootRef.current.position.y = Math.sin(t * 2) * 0.06;
    // Interactive rotation on hover
    const targetRotY = isHovered ? Math.sin(t * 3) * 0.35 : Math.sin(t * 0.8) * 0.12;
    rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, targetRotY, delta * 4);
    // Slight head tilt
    rootRef.current.rotation.z = Math.sin(t * 1.5) * 0.03;
  });
  
  return (
    <group ref={rootRef} scale={scale} position={[0, -0.1, 0]}>
      {/* Universal Pedestal / Clay Base */}
      <mesh position={[0, -0.65, 0]} receiveShadow>
        <cylinderGeometry args={[1.2, 1.3, 0.18, 32]} />
        {clay('#F3ECE0', 0.6)}
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.04, 32]} />
        {clay('#FF8A1F', 0.3)}
      </mesh>

      {/* Render Specific 3D Clay Animal */}
      {species === 'bear' && <BearMascot />}
      {species === 'cat' && <CatMascot />}
      {species === 'owl' && <OwlMascot />}
      {species === 'beaver' && <BeaverMascot />}
      {species === 'fox' && <FoxMascot />}
      {species === 'otter' && <OtterMascot />}
      {species === 'dog' && <DogMascot />}
      {species === 'rabbit' && <RabbitMascot />}
      {species === 'lion' && <LionMascot />}
      {species === 'rhino' && <RhinoMascot />}
      {species === 'squirrel' && <SquirrelMascot />}
      {species === 'elephant' && <ElephantMascot />}
      {species === 'hamster' && <HamsterMascot />}
      {species === 'bulldog' && <BulldogMascot />}
      {species === 'bull' && <BullMascot />}
      {species === 'badger' && <BadgerMascot />}
      {species === 'tortoise' && <TortoiseMascot />}
      {species === 'dove' && <DoveMascot />}
      {species === 'penguin' && <PenguinMascot />}
      {species === 'eagle' && <EagleMascot />}
    </group>
  );
}

// 1. Builder Bear (Civil Contractor)
function BearMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Body & Orange Vest */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <sphereGeometry args={[0.5, 24, 24]} />
        {clay('#B45309')}
      </mesh>
      <mesh position={[0, -0.05, 0.05]} castShadow>
        <cylinderGeometry args={[0.42, 0.46, 0.4, 24]} />
        {clay('#FF8A1F')}
      </mesh>
      {/* Bear Head */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <sphereGeometry args={[0.42, 24, 24]} />
        {clay('#B45309')}
      </mesh>
      {/* Muzzle */}
      <mesh position={[0, 0.38, 0.28]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        {clay('#FDE68A')}
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0.44, 0.42]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        {clay('#1E1E1E')}
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.14, 0.52, 0.35]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        {clay('#1E1E1E')}
      </mesh>
      <mesh position={[0.14, 0.52, 0.35]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        {clay('#1E1E1E')}
      </mesh>
      {/* Bear Ears */}
      <mesh position={[-0.32, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        {clay('#B45309')}
      </mesh>
      <mesh position={[0.32, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        {clay('#B45309')}
      </mesh>
      {/* Yellow Safety Hardhat */}
      <mesh position={[0, 0.78, 0.05]} castShadow>
        <sphereGeometry args={[0.4, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        {clay('#FACC15')}
      </mesh>
      {/* Hardhat Brim */}
      <mesh position={[0, 0.76, 0.12]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.05, 24]} />
        {clay('#FACC15')}
      </mesh>
    </group>
  );
}

// 2. Designer Cat (Interior Designer)
function CatMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Body */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <sphereGeometry args={[0.45, 24, 24]} />
        {clay('#FDBA74')}
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <sphereGeometry args={[0.4, 24, 24]} />
        {clay('#FDBA74')}
      </mesh>
      {/* Pointy Cat Ears */}
      <mesh position={[-0.26, 0.8, 0]} rotation={[0, 0, 0.2]} castShadow>
        <coneGeometry args={[0.16, 0.35, 16]} />
        {clay('#F97316')}
      </mesh>
      <mesh position={[0.26, 0.8, 0]} rotation={[0, 0, -0.2]} castShadow>
        <coneGeometry args={[0.16, 0.35, 16]} />
        {clay('#F97316')}
      </mesh>
      {/* Eyes & Nose */}
      <mesh position={[-0.13, 0.46, 0.35]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        {clay('#0D9488')}
      </mesh>
      <mesh position={[0.13, 0.46, 0.35]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        {clay('#0D9488')}
      </mesh>
      <mesh position={[0, 0.38, 0.38]}>
        <coneGeometry args={[0.04, 0.04, 3]} rotation={[Math.PI, 0, 0]} />
        {clay('#F43F5E')}
      </mesh>
      {/* Designer Beret */}
      <mesh position={[-0.08, 0.8, 0.05]} rotation={[0.2, 0, 0.3]} castShadow>
        <cylinderGeometry args={[0.34, 0.28, 0.12, 24]} />
        {clay('#4338CA')}
      </mesh>
      {/* Color Palette in hand */}
      <mesh position={[0.45, 0.05, 0.2]} rotation={[0.4, 0.3, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.03, 16]} />
        {clay('#FDE047')}
      </mesh>
    </group>
  );
}

// 3. Wise Owl (Architect)
function OwlMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Owl Body */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <sphereGeometry args={[0.5, 24, 24]} scale={[0.9, 1.2, 0.9]} />
        {clay('#475569')}
      </mesh>
      {/* White Chest Feathers */}
      <mesh position={[0, 0.05, 0.25]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} scale={[0.8, 1.0, 0.4]} />
        {clay('#F1F5F9')}
      </mesh>
      {/* Big Owl Eyes */}
      <mesh position={[-0.18, 0.38, 0.38]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        {clay('#FDE047')}
      </mesh>
      <mesh position={[-0.18, 0.38, 0.48]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        {clay('#0F172A')}
      </mesh>
      <mesh position={[0.18, 0.38, 0.38]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        {clay('#FDE047')}
      </mesh>
      <mesh position={[0.18, 0.38, 0.48]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        {clay('#0F172A')}
      </mesh>
      {/* Glasses Frame */}
      <mesh position={[-0.18, 0.38, 0.45]}>
        <torusGeometry args={[0.14, 0.02, 8, 24]} />
        {clay('#D97706')}
      </mesh>
      <mesh position={[0.18, 0.38, 0.45]}>
        <torusGeometry args={[0.14, 0.02, 8, 24]} />
        {clay('#D97706')}
      </mesh>
      {/* Beak */}
      <mesh position={[0, 0.27, 0.44]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.08, 0.16, 12]} />
        {clay('#F97316')}
      </mesh>
      {/* Architect Blueprint Roll */}
      <mesh position={[0.4, 0.1, 0.2]} rotation={[0.3, 0.2, 0.7]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        {clay('#38BDF8')}
      </mesh>
    </group>
  );
}

// 4. Craftsman Beaver (Carpenter)
function BeaverMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Beaver Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.48, 24, 24]} />
        {clay('#78350F')}
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.48, 0.05]} castShadow>
        <sphereGeometry args={[0.4, 24, 24]} />
        {clay('#78350F')}
      </mesh>
      {/* Cheeks / Snout */}
      <mesh position={[0, 0.38, 0.32]}>
        <sphereGeometry args={[0.2, 16, 16]} scale={[1.2, 0.8, 0.8]} />
        {clay('#B45309')}
      </mesh>
      {/* Big White Buck Teeth */}
      <mesh position={[-0.05, 0.24, 0.44]}>
        <boxGeometry args={[0.08, 0.12, 0.04]} />
        {clay('#FFFFFF')}
      </mesh>
      <mesh position={[0.05, 0.24, 0.44]}>
        <boxGeometry args={[0.08, 0.12, 0.04]} />
        {clay('#FFFFFF')}
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0.42, 0.46]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        {clay('#1E1E1E')}
      </mesh>
      {/* Ears */}
      <mesh position={[-0.28, 0.8, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        {clay('#451A03')}
      </mesh>
      <mesh position={[0.28, 0.8, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        {clay('#451A03')}
      </mesh>
      {/* Red Carpenter Cap */}
      <mesh position={[0, 0.78, 0.08]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.15, 24]} />
        {clay('#DC2626')}
      </mesh>
    </group>
  );
}

// 5. Sparks Fox (Electrician)
function FoxMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Fox Body */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <sphereGeometry args={[0.46, 24, 24]} />
        {clay('#EA580C')}
      </mesh>
      {/* White chest bib */}
      <mesh position={[0, -0.02, 0.28]}>
        <sphereGeometry args={[0.25, 16, 16]} scale={[0.8, 1.2, 0.4]} />
        {clay('#FFFBEB')}
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.46, 0]} castShadow>
        <sphereGeometry args={[0.38, 24, 24]} />
        {clay('#EA580C')}
      </mesh>
      {/* Fox Snout */}
      <mesh position={[0, 0.38, 0.35]} rotation={[0.3, 0, 0]}>
        <coneGeometry args={[0.16, 0.32, 16]} />
        {clay('#FFFBEB')}
      </mesh>
      <mesh position={[0, 0.46, 0.49]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        {clay('#1E1E1E')}
      </mesh>
      {/* Tall Pointy Fox Ears with White Tips */}
      <mesh position={[-0.24, 0.84, 0]} rotation={[0, 0, 0.25]} castShadow>
        <coneGeometry args={[0.15, 0.4, 16]} />
        {clay('#EA580C')}
      </mesh>
      <mesh position={[-0.28, 0.98, 0]} rotation={[0, 0, 0.25]}>
        <coneGeometry args={[0.08, 0.16, 16]} />
        {clay('#FFFBEB')}
      </mesh>
      <mesh position={[0.24, 0.84, 0]} rotation={[0, 0, -0.25]} castShadow>
        <coneGeometry args={[0.15, 0.4, 16]} />
        {clay('#EA580C')}
      </mesh>
      <mesh position={[0.28, 0.98, 0]} rotation={[0, 0, -0.25]}>
        <coneGeometry args={[0.08, 0.16, 16]} />
        {clay('#FFFBEB')}
      </mesh>
      {/* Safety Goggles on forehead */}
      <mesh position={[0, 0.62, 0.26]}>
        <boxGeometry args={[0.5, 0.14, 0.1]} />
        {clay('#0284C7')}
      </mesh>
    </group>
  );
}

// 6. River Otter (Plumber)
function OtterMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Otter Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.46, 0.8, 24]} />
        {clay('#78350F')}
      </mesh>
      {/* Otter Head */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.38, 24, 24]} />
        {clay('#78350F')}
      </mesh>
      {/* Whiskers Snout */}
      <mesh position={[0, 0.42, 0.28]}>
        <sphereGeometry args={[0.2, 16, 16]} scale={[1.3, 0.7, 0.8]} />
        {clay('#FEF3C7')}
      </mesh>
      <mesh position={[0, 0.46, 0.42]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        {clay('#1E1E1E')}
      </mesh>
      {/* Plumber Blue Cap */}
      <mesh position={[0, 0.78, 0.05]} rotation={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.36, 0.38, 0.12, 24]} />
        {clay('#0284C7')}
      </mesh>
      {/* Red Pipe Wrench in hand */}
      <mesh position={[0.42, 0.1, 0.2]} rotation={[0.4, 0, -0.6]}>
        <boxGeometry args={[0.1, 0.55, 0.06]} />
        {clay('#DC2626')}
      </mesh>
    </group>
  );
}

// 7. Guardian Dog (Site Supervisor)
function DogMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Dog Body with High-Vis Orange Vest */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <sphereGeometry args={[0.48, 24, 24]} />
        {clay('#D97706')}
      </mesh>
      <mesh position={[0, -0.02, 0.05]}>
        <cylinderGeometry args={[0.42, 0.45, 0.4, 24]} />
        {clay('#FF8A1F')}
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.46, 0]} castShadow>
        <sphereGeometry args={[0.4, 24, 24]} />
        {clay('#D97706')}
      </mesh>
      {/* Floppy Dog Ears */}
      <mesh position={[-0.34, 0.48, 0]} rotation={[0, 0, 0.4]} castShadow>
        <cylinderGeometry args={[0.1, 0.16, 0.4, 16]} />
        {clay('#92400E')}
      </mesh>
      <mesh position={[0.34, 0.48, 0]} rotation={[0, 0, -0.4]} castShadow>
        <cylinderGeometry args={[0.1, 0.16, 0.4, 16]} />
        {clay('#92400E')}
      </mesh>
      {/* Muzzle & Nose */}
      <mesh position={[0, 0.38, 0.32]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        {clay('#FDE68A')}
      </mesh>
      <mesh position={[0, 0.44, 0.46]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        {clay('#1E1E1E')}
      </mesh>
      {/* Yellow Supervisor Helmet */}
      <mesh position={[0, 0.8, 0.05]}>
        <sphereGeometry args={[0.38, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        {clay('#FACC15')}
      </mesh>
      {/* Walkie Talkie */}
      <mesh position={[-0.42, 0.1, 0.2]}>
        <boxGeometry args={[0.12, 0.28, 0.08]} />
        {clay('#1E293B')}
      </mesh>
    </group>
  );
}

// 8. Artisan Rabbit (Painter)
function RabbitMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Rabbit Body */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <sphereGeometry args={[0.45, 24, 24]} />
        {clay('#F8FAFC')}
      </mesh>
      {/* Overalls with colorful paint blobs */}
      <mesh position={[0, -0.1, 0.05]}>
        <cylinderGeometry args={[0.4, 0.44, 0.35, 24]} />
        {clay('#38BDF8')}
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.44, 0]} castShadow>
        <sphereGeometry args={[0.38, 24, 24]} />
        {clay('#F8FAFC')}
      </mesh>
      {/* Long Bunny Ears */}
      <mesh position={[-0.18, 0.95, 0]} rotation={[0, 0, 0.15]} castShadow>
        <cylinderGeometry args={[0.07, 0.12, 0.7, 16]} />
        {clay('#F8FAFC')}
      </mesh>
      <mesh position={[-0.18, 0.95, 0.04]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.04, 0.08, 0.55, 16]} />
        {clay('#F472B6')}
      </mesh>
      <mesh position={[0.18, 0.95, 0]} rotation={[0, 0, -0.15]} castShadow>
        <cylinderGeometry args={[0.07, 0.12, 0.7, 16]} />
        {clay('#F8FAFC')}
      </mesh>
      <mesh position={[0.18, 0.95, 0.04]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.04, 0.08, 0.55, 16]} />
        {clay('#F472B6')}
      </mesh>
      {/* Paint Roller in paw */}
      <mesh position={[0.45, 0.2, 0.2]} rotation={[0.4, 0, 0.6]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
        {clay('#FF8A1F')}
      </mesh>
    </group>
  );
}

// 9. Leader Lion (Project Manager)
function LionMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Lion Body */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <sphereGeometry args={[0.5, 24, 24]} />
        {clay('#F59E0B')}
      </mesh>
      {/* Voluminous Fluffy Mane */}
      <mesh position={[0, 0.45, -0.05]} castShadow>
        <torusGeometry args={[0.42, 0.22, 16, 24]} />
        {clay('#B45309')}
      </mesh>
      {/* Lion Head */}
      <mesh position={[0, 0.45, 0.08]} castShadow>
        <sphereGeometry args={[0.38, 24, 24]} />
        {clay('#F59E0B')}
      </mesh>
      {/* Snout & Whiskers */}
      <mesh position={[0, 0.36, 0.36]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        {clay('#FEF3C7')}
      </mesh>
      <mesh position={[0, 0.42, 0.48]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        {clay('#1E1E1E')}
      </mesh>
      {/* White Milestone Tablet */}
      <mesh position={[0.42, 0.05, 0.25]} rotation={[0.3, -0.3, 0]}>
        <boxGeometry args={[0.35, 0.45, 0.04]} />
        {clay('#F8FAFC')}
      </mesh>
    </group>
  );
}

// 10. Titan Rhino (Structural Engineer)
function RhinoMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Sturdy Grey Body */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <sphereGeometry args={[0.52, 24, 24]} scale={[1.1, 1.0, 1.0]} />
        {clay('#64748B')}
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.45, 0.05]} castShadow>
        <sphereGeometry args={[0.42, 24, 24]} />
        {clay('#64748B')}
      </mesh>
      {/* Big Rhino Horn */}
      <mesh position={[0, 0.48, 0.45]} rotation={[0.7, 0, 0]}>
        <coneGeometry args={[0.12, 0.32, 16]} />
        {clay('#E2E8F0')}
      </mesh>
      {/* Industrial Hardhat */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.4, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        {clay('#4F46E5')}
      </mesh>
      {/* Steel Girder Section */}
      <mesh position={[0.48, 0.1, 0.15]} rotation={[0, 0, 0.6]}>
        <boxGeometry args={[0.12, 0.6, 0.12]} />
        {clay('#1E293B')}
      </mesh>
    </group>
  );
}

// 11. Cargo Squirrel (Procurement)
function SquirrelMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Body */}
      <mesh position={[0, -0.08, 0]} castShadow>
        <sphereGeometry args={[0.44, 24, 24]} />
        {clay('#9A3412')}
      </mesh>
      {/* Fluffy Bushy Tail in back */}
      <mesh position={[0, 0.25, -0.38]} rotation={[-0.4, 0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.32, 0.8, 16]} />
        {clay('#9A3412')}
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.44, 0.05]} castShadow>
        <sphereGeometry args={[0.38, 24, 24]} />
        {clay('#9A3412')}
      </mesh>
      {/* Ears */}
      <mesh position={[-0.22, 0.8, 0]}>
        <coneGeometry args={[0.1, 0.25, 12]} />
        {clay('#9A3412')}
      </mesh>
      <mesh position={[0.22, 0.8, 0]}>
        <coneGeometry args={[0.1, 0.25, 12]} />
        {clay('#9A3412')}
      </mesh>
      {/* Cargo Package Box */}
      <mesh position={[0, 0.05, 0.4]} castShadow>
        <boxGeometry args={[0.36, 0.32, 0.36]} />
        {clay('#D97706')}
      </mesh>
    </group>
  );
}

// 12. Logistics Elephant (Material Supplier)
function ElephantMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Elephant Body */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <sphereGeometry args={[0.54, 24, 24]} />
        {clay('#94A3B8')}
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.46, 0.05]} castShadow>
        <sphereGeometry args={[0.44, 24, 24]} />
        {clay('#94A3B8')}
      </mesh>
      {/* Curved Trunk */}
      <mesh position={[0, 0.28, 0.48]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.16, 0.5, 16]} />
        {clay('#94A3B8')}
      </mesh>
      {/* Huge Elephant Ears */}
      <mesh position={[-0.45, 0.48, 0]} rotation={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 16]} />
        {clay('#94A3B8')}
      </mesh>
      <mesh position={[0.45, 0.48, 0]} rotation={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 16]} />
        {clay('#94A3B8')}
      </mesh>
      {/* Yellow Safety Helmet */}
      <mesh position={[0, 0.84, 0.05]}>
        <sphereGeometry args={[0.42, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        {clay('#FACC15')}
      </mesh>
    </group>
  );
}

// 13. Handy Hamster (Interior Labour)
function HamsterMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Chubby Round Body */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <sphereGeometry args={[0.5, 24, 24]} scale={[1.1, 0.9, 1.0]} />
        {clay('#FDBA74')}
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.44, 0.05]} castShadow>
        <sphereGeometry args={[0.4, 24, 24]} />
        {clay('#FDBA74')}
      </mesh>
      {/* Big Chubby Cheeks */}
      <mesh position={[-0.24, 0.36, 0.26]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        {clay('#FED7AA')}
      </mesh>
      <mesh position={[0.24, 0.36, 0.26]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        {clay('#FED7AA')}
      </mesh>
      {/* Cordless Drill in hand */}
      <mesh position={[0.44, 0.05, 0.25]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[0.18, 0.24, 0.1]} />
        {clay('#10B981')}
      </mesh>
    </group>
  );
}

// 14. Hardy Bulldog (Construction Labour)
function BulldogMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Sturdy Body & Orange Vest */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <sphereGeometry args={[0.52, 24, 24]} />
        {clay('#A16207')}
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.46, 0.48, 0.4, 24]} />
        {clay('#FF8A1F')}
      </mesh>
      {/* Broad Bulldog Head */}
      <mesh position={[0, 0.44, 0.05]} castShadow>
        <sphereGeometry args={[0.42, 24, 24]} scale={[1.2, 0.9, 1.0]} />
        {clay('#A16207')}
      </mesh>
      {/* Jowls & Snout */}
      <mesh position={[0, 0.32, 0.36]}>
        <boxGeometry args={[0.34, 0.2, 0.18]} />
        {clay('#FDE68A')}
      </mesh>
      <mesh position={[0, 0.38, 0.46]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        {clay('#1E1E1E')}
      </mesh>
      {/* Construction Helmet */}
      <mesh position={[0, 0.78, 0.05]}>
        <sphereGeometry args={[0.42, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        {clay('#FACC15')}
      </mesh>
    </group>
  );
}

// 15. Forge Bull (Fabricator)
function BullMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Bull Body */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <sphereGeometry args={[0.52, 24, 24]} />
        {clay('#334155')}
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.46, 0]} castShadow>
        <sphereGeometry args={[0.42, 24, 24]} />
        {clay('#334155')}
      </mesh>
      {/* Curved Horns */}
      <mesh position={[-0.38, 0.78, 0]} rotation={[0, 0, 0.7]}>
        <coneGeometry args={[0.1, 0.38, 16]} />
        {clay('#F1F5F9')}
      </mesh>
      <mesh position={[0.38, 0.78, 0]} rotation={[0, 0, -0.7]}>
        <coneGeometry args={[0.1, 0.38, 16]} />
        {clay('#F1F5F9')}
      </mesh>
      {/* Welding Shield Visor */}
      <mesh position={[0, 0.42, 0.34]}>
        <boxGeometry args={[0.4, 0.45, 0.12]} />
        {clay('#0F172A')}
      </mesh>
      <mesh position={[0, 0.46, 0.41]}>
        <boxGeometry args={[0.26, 0.08, 0.02]} />
        {clay('#38BDF8')}
      </mesh>
    </group>
  );
}

// 16. Stone Badger (Mason)
function BadgerMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Badger Body */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <sphereGeometry args={[0.48, 24, 24]} />
        {clay('#475569')}
      </mesh>
      {/* Head with Black & White Face Stripe */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <sphereGeometry args={[0.4, 24, 24]} />
        {clay('#F8FAFC')}
      </mesh>
      <mesh position={[-0.14, 0.45, 0.28]}>
        <boxGeometry args={[0.1, 0.36, 0.18]} />
        {clay('#1E293B')}
      </mesh>
      <mesh position={[0.14, 0.45, 0.28]}>
        <boxGeometry args={[0.1, 0.36, 0.18]} />
        {clay('#1E293B')}
      </mesh>
      {/* Brick in hand */}
      <mesh position={[0.44, 0.1, 0.2]} rotation={[0.3, 0.4, 0]}>
        <boxGeometry args={[0.3, 0.15, 0.15]} />
        {clay('#B91C1C')}
      </mesh>
    </group>
  );
}

// 17. Master Tortoise (Flooring Specialist)
function TortoiseMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Green Shell Dome in back */}
      <mesh position={[0, 0.1, -0.1]} castShadow>
        <sphereGeometry args={[0.54, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} rotation={[-Math.PI / 2, 0, 0]} />
        {clay('#047857')}
      </mesh>
      {/* Head poking forward */}
      <mesh position={[0, 0.42, 0.25]} castShadow>
        <sphereGeometry args={[0.32, 24, 24]} />
        {clay('#10B981')}
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.68, 0.25]}>
        <cylinderGeometry args={[0.26, 0.28, 0.1, 24]} />
        {clay('#0D9488')}
      </mesh>
      {/* Ceramic Tile */}
      <mesh position={[0, -0.3, 0.4]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.45, 0.04, 0.45]} />
        {clay('#F8FAFC')}
      </mesh>
    </group>
  );
}

// 18. Plaster Dove (POP Technician)
function DoveMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Pure White Dove Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.46, 24, 24]} />
        {clay('#FFFFFF')}
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.48, 0.05]} castShadow>
        <sphereGeometry args={[0.36, 24, 24]} />
        {clay('#FFFFFF')}
      </mesh>
      {/* Beak */}
      <mesh position={[0, 0.42, 0.38]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.07, 0.18, 12]} />
        {clay('#F59E0B')}
      </mesh>
      {/* Plasterer Cap */}
      <mesh position={[0, 0.78, 0.05]}>
        <cylinderGeometry args={[0.32, 0.36, 0.12, 24]} />
        {clay('#78716C')}
      </mesh>
    </group>
  );
}

// 19. Cool Penguin (HVAC Technician)
function PenguinMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Black Tuxedo Body */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <sphereGeometry args={[0.48, 24, 24]} scale={[0.9, 1.2, 0.9]} />
        {clay('#0F172A')}
      </mesh>
      {/* White Belly */}
      <mesh position={[0, 0.05, 0.22]}>
        <sphereGeometry args={[0.35, 16, 16]} scale={[0.8, 1.1, 0.3]} />
        {clay('#FFFFFF')}
      </mesh>
      {/* Orange Beak */}
      <mesh position={[0, 0.42, 0.4]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.09, 0.22, 16]} />
        {clay('#F97316')}
      </mesh>
      {/* Cozy Blue Scarf */}
      <mesh position={[0, 0.32, 0.08]}>
        <torusGeometry args={[0.36, 0.08, 12, 24]} />
        {clay('#2563EB')}
      </mesh>
    </group>
  );
}

// 20. Inspector Eagle (Safety Officer)
function EagleMascot() {
  return (
    <group position={[0, 0, 0]}>
      {/* Eagle Body & Neon Safety Vest */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <sphereGeometry args={[0.48, 24, 24]} />
        {clay('#451A03')}
      </mesh>
      <mesh position={[0, -0.02, 0.05]}>
        <cylinderGeometry args={[0.42, 0.46, 0.4, 24]} />
        {clay('#16A34A')}
      </mesh>
      {/* White Feathered Head */}
      <mesh position={[0, 0.46, 0]} castShadow>
        <sphereGeometry args={[0.38, 24, 24]} />
        {clay('#FFFFFF')}
      </mesh>
      {/* Curved Yellow Beak */}
      <mesh position={[0, 0.4, 0.38]} rotation={[0.5, 0, 0]}>
        <coneGeometry args={[0.1, 0.25, 16]} />
        {clay('#FACC15')}
      </mesh>
      {/* Safety Badge */}
      <mesh position={[0, 0.08, 0.46]}>
        <octahedronGeometry args={[0.08]} />
        {clay('#FACC15')}
      </mesh>
    </group>
  );
}
