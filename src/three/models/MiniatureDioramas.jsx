import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Common clay materials
const clayMat = (color, roughness = 0.4, metalness = 0.1) => (
  <meshStandardMaterial
    color={color}
    roughness={roughness}
    metalness={metalness}
  />
);

export function DioramaModel({ type, isHovered }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Gentle floating idle motion
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 1.5) * 0.08;
    
    // Smooth rotation when hovered vs idle
    const targetRotation = isHovered ? Math.PI * 0.25 : Math.sin(time * 0.5) * 0.15;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation,
      delta * 4
    );

    // Target scale
    const targetScale = isHovered ? 1.08 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Base Pedestal for miniature world feeling */}
      <mesh position={[0, -0.7, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.6, 0.2, 32]} />
        <meshStandardMaterial color="#F3EADF" roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.58, 0]} receiveShadow>
        <cylinderGeometry args={[1.4, 1.4, 0.05, 32]} />
        <meshStandardMaterial color="#FF8A1F" roughness={0.3} />
      </mesh>

      {/* Unique 3D Scenes */}
      {type === 'interior_room' && <InteriorRoomDiorama />}
      {type === 'construction_site' && <CivilContractorDiorama />}
      {type === 'architect_building' && <ArchitectDiorama />}
      {type === 'procurement_boxes' && <ProcurementDiorama />}
      {type === 'electrician_panel' && <ElectricianDiorama />}
      {type === 'plumbing_valves' && <PlumbingDiorama />}
      {type === 'carpenter_workbench' && <CarpenterDiorama />}
      {type === 'supervisor_desk' && <SupervisorDiorama />}
      {type === 'project_manager_tower' && <ProjectManagerDiorama />}
      {type === 'structural_engineer' && <StructuralDiorama />}
      {type === 'painter_studio' && <PainterDiorama />}
      {type === 'material_pallet' && <MaterialSupplierDiorama />}
      {type === 'interior_worker' && <InteriorLabourDiorama />}
      {type === 'construction_worker' && <ConstructionLabourDiorama />}
      {type === 'welding_frame' && <FabricatorDiorama />}
      {type === 'brick_wall' && <MasonDiorama />}
      {type === 'flooring_tiles' && <FlooringDiorama />}
      {type === 'pop_ceiling' && <PopCeilingDiorama />}
      {type === 'hvac_unit' && <HvacDiorama />}
      {type === 'safety_checkpoint' && <SafetyDiorama />}
    </group>
  );
}

// 1. Interior Room Diorama
function InteriorRoomDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Walls */}
      <mesh position={[-0.8, 0.4, 0]} castShadow>
        <boxGeometry args={[0.1, 1.6, 1.6]} />
        {clayMat('#FDBA74')}
      </mesh>
      <mesh position={[0, 0.4, -0.8]} castShadow>
        <boxGeometry args={[1.7, 1.6, 0.1]} />
        {clayMat('#FED7AA')}
      </mesh>
      {/* Curved Modern Sofa */}
      <mesh position={[0, -0.2, -0.2]} castShadow>
        <boxGeometry args={[1.1, 0.4, 0.55]} />
        {clayMat('#EA580C')}
      </mesh>
      <mesh position={[0, 0.1, -0.42]} castShadow>
        <boxGeometry args={[1.1, 0.4, 0.2]} />
        {clayMat('#C2410C')}
      </mesh>
      {/* Table & Lamp */}
      <mesh position={[0.4, -0.3, 0.3]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
        {clayMat('#78350F')}
      </mesh>
      {/* Floor Lamp */}
      <mesh position={[-0.5, 0.2, -0.4]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.2, 12]} />
        {clayMat('#451A03')}
      </mesh>
      <mesh position={[-0.5, 0.8, -0.4]} castShadow>
        <coneGeometry args={[0.22, 0.25, 16]} />
        {clayMat('#FFF7ED')}
      </mesh>
      {/* Plant */}
      <mesh position={[-0.45, -0.35, 0.4]} castShadow>
        <cylinderGeometry args={[0.15, 0.12, 0.25, 12]} />
        {clayMat('#EA580C')}
      </mesh>
      <mesh position={[-0.45, -0.1, 0.4]}>
        <sphereGeometry args={[0.16, 8, 8]} />
        {clayMat('#15803D')}
      </mesh>
    </group>
  );
}

// 2. Civil Contractor Diorama
function CivilContractorDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Crane Tower */}
      <mesh position={[-0.4, 0.5, -0.3]} castShadow>
        <boxGeometry args={[0.16, 1.8, 0.16]} />
        {clayMat('#FF8A1F')}
      </mesh>
      {/* Crane Jib */}
      <mesh position={[0.1, 1.35, -0.3]} castShadow>
        <boxGeometry args={[1.4, 0.12, 0.14]} />
        {clayMat('#FF8A1F')}
      </mesh>
      {/* Cable & Load */}
      <mesh position={[0.5, 0.8, -0.3]}>
        <cylinderGeometry args={[0.015, 0.015, 1.0]} />
        {clayMat('#52525B')}
      </mesh>
      <mesh position={[0.5, 0.25, -0.3]} castShadow>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        {clayMat('#94A3B8')}
      </mesh>
      {/* Hardhat on pedestal */}
      <mesh position={[-0.1, -0.35, 0.4]} castShadow>
        <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        {clayMat('#FACC15')}
      </mesh>
      {/* Safety Traffic Cone */}
      <mesh position={[0.5, -0.3, 0.3]} castShadow>
        <coneGeometry args={[0.2, 0.45, 16]} />
        {clayMat('#EA580C')}
      </mesh>
    </group>
  );
}

// 3. Architect Diorama
function ArchitectDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Architectural Villa Block */}
      <mesh position={[-0.2, 0.1, -0.1]} castShadow>
        <boxGeometry args={[0.9, 0.9, 0.8]} />
        {clayMat('#F8FAFC')}
      </mesh>
      {/* Cantilever balcony */}
      <mesh position={[0.25, 0.3, 0.1]} castShadow>
        <boxGeometry args={[0.7, 0.1, 0.7]} />
        {clayMat('#38BDF8')}
      </mesh>
      {/* Architectural Blueprint Sheet */}
      <mesh position={[0.1, -0.42, 0.4]} rotation={[-Math.PI * 0.45, 0, 0.2]} receiveShadow>
        <planeGeometry args={[1.1, 0.7]} />
        {clayMat('#0284C7')}
      </mesh>
      {/* Triangular Scale / Ruler */}
      <mesh position={[-0.4, -0.4, 0.5]} rotation={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 3]} />
        {clayMat('#F59E0B')}
      </mesh>
    </group>
  );
}

// 4. Procurement Diorama
function ProcurementDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Wooden Pallet */}
      <mesh position={[0, -0.48, 0]} receiveShadow>
        <boxGeometry args={[1.3, 0.12, 1.1]} />
        {clayMat('#A16207')}
      </mesh>
      {/* Stacked Cargo Boxes */}
      <mesh position={[-0.3, -0.18, -0.1]} castShadow>
        <boxGeometry args={[0.55, 0.48, 0.55]} />
        {clayMat('#D97706')}
      </mesh>
      <mesh position={[0.3, -0.18, -0.1]} castShadow>
        <boxGeometry args={[0.5, 0.48, 0.5]} />
        {clayMat('#B45309')}
      </mesh>
      <mesh position={[0, 0.25, -0.1]} castShadow>
        <boxGeometry args={[0.45, 0.42, 0.45]} />
        {clayMat('#EA580C')}
      </mesh>
      {/* Clipboard */}
      <mesh position={[0.35, -0.2, 0.4]} rotation={[-0.4, -0.3, 0]} castShadow>
        <boxGeometry args={[0.35, 0.45, 0.04]} />
        {clayMat('#F1F5F9')}
      </mesh>
      {/* Supply Barrel */}
      <mesh position={[-0.4, -0.2, 0.35]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.45, 16]} />
        {clayMat('#0284C7')}
      </mesh>
    </group>
  );
}

// 5. Electrician Diorama
function ElectricianDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Breaker Box Housing */}
      <mesh position={[0, 0.1, -0.2]} castShadow>
        <boxGeometry args={[1.0, 1.2, 0.35]} />
        {clayMat('#94A3B8')}
      </mesh>
      {/* Interior Switch Rows */}
      <mesh position={[0, 0.3, -0.01]} castShadow>
        <boxGeometry args={[0.7, 0.2, 0.08]} />
        {clayMat('#1E293B')}
      </mesh>
      <mesh position={[0, -0.05, -0.01]} castShadow>
        <boxGeometry args={[0.7, 0.2, 0.08]} />
        {clayMat('#1E293B')}
      </mesh>
      {/* Toggle switches */}
      {[-0.22, -0.08, 0.08, 0.22].map((x, i) => (
        <mesh key={i} position={[x, 0.3, 0.05]}>
          <boxGeometry args={[0.06, 0.12, 0.06]} />
          {clayMat(i % 2 === 0 ? '#FF8A1F' : '#10B981')}
        </mesh>
      ))}
      {/* Conduit Pipe & Cables */}
      <mesh position={[0.4, 0.5, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.8]} />
        {clayMat('#64748B')}
      </mesh>
      {/* Multimeter */}
      <mesh position={[-0.3, -0.32, 0.35]} rotation={[0.4, 0.2, 0]} castShadow>
        <boxGeometry args={[0.25, 0.4, 0.1]} />
        {clayMat('#F59E0B')}
      </mesh>
    </group>
  );
}

// 6. Plumber Diorama
function PlumbingDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Main vertical pipe */}
      <mesh position={[-0.2, 0.1, -0.1]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 1.3, 16]} />
        {clayMat('#0284C7')}
      </mesh>
      {/* Horizontal pipe intersection */}
      <mesh position={[0.2, 0.3, -0.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.0, 16]} />
        {clayMat('#38BDF8')}
      </mesh>
      {/* Red Valve Wheel */}
      <mesh position={[0.1, 0.3, 0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.22, 0.05, 12, 24]} />
        {clayMat('#DC2626')}
      </mesh>
      {/* Pressure Gauge */}
      <mesh position={[-0.2, 0.55, 0.08]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 24]} rotation={[Math.PI / 2, 0, 0]} />
        {clayMat('#F8FAFC')}
      </mesh>
      {/* Droplet */}
      <mesh position={[0.45, -0.1, -0.1]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        {clayMat('#60A5FA')}
      </mesh>
    </group>
  );
}

// 7. Carpenter Diorama
function CarpenterDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Workbench top */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[1.4, 0.18, 0.8]} />
        {clayMat('#78350F')}
      </mesh>
      {/* Workbench Legs */}
      {[[-0.55, -0.25, -0.3], [0.55, -0.25, -0.3], [-0.55, -0.25, 0.3], [0.55, -0.25, 0.3]].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
          {clayMat('#451A03')}
        </mesh>
      ))}
      {/* Wooden Hand Plane Tool */}
      <mesh position={[-0.2, 0.22, 0.1]} rotation={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.4, 0.15, 0.15]} />
        {clayMat('#B45309')}
      </mesh>
      {/* Hammer */}
      <mesh position={[0.25, 0.2, -0.15]} rotation={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.45]} />
        {clayMat('#D97706')}
      </mesh>
      <mesh position={[0.3, 0.23, -0.15]}>
        <boxGeometry args={[0.16, 0.08, 0.08]} />
        {clayMat('#475569')}
      </mesh>
    </group>
  );
}

// 8. Site Supervisor Diorama
function SupervisorDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Tripod legs for surveyor tool */}
      <mesh position={[-0.2, -0.1, -0.1]} rotation={[0.2, 0, -0.2]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.0]} />
        {clayMat('#F59E0B')}
      </mesh>
      <mesh position={[0.2, -0.1, -0.1]} rotation={[0.2, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.0]} />
        {clayMat('#F59E0B')}
      </mesh>
      <mesh position={[0, -0.1, 0.2]} rotation={[-0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.0]} />
        {clayMat('#F59E0B')}
      </mesh>
      {/* Optical Level Device */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.5, 0.2, 0.2]} />
        {clayMat('#EA580C')}
      </mesh>
      {/* Safety Hat */}
      <mesh position={[0.35, -0.35, 0.4]} castShadow>
        <sphereGeometry args={[0.22, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        {clayMat('#FACC15')}
      </mesh>
      {/* Walkie Talkie */}
      <mesh position={[-0.45, -0.3, 0.3]} castShadow>
        <boxGeometry args={[0.12, 0.28, 0.08]} />
        {clayMat('#1E293B')}
      </mesh>
    </group>
  );
}

// 9. Project Manager Diorama
function ProjectManagerDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Tower structure with glass facets */}
      <mesh position={[-0.2, 0.3, -0.2]} castShadow>
        <boxGeometry args={[0.7, 1.4, 0.7]} />
        {clayMat('#0284C7', 0.2, 0.3)}
      </mesh>
      {/* Milestone Blocks */}
      <mesh position={[0.3, -0.25, 0.1]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        {clayMat('#FF8A1F')}
      </mesh>
      <mesh position={[0.3, 0.1, 0.1]} castShadow>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        {clayMat('#10B981')}
      </mesh>
      {/* Celebration Milestone Star */}
      <mesh position={[0.3, 0.45, 0.1]}>
        <octahedronGeometry args={[0.14]} />
        {clayMat('#FACC15')}
      </mesh>
      {/* Analytics Chart Ring */}
      <mesh position={[-0.1, -0.3, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.06, 16, 32]} />
        {clayMat('#6366F1')}
      </mesh>
    </group>
  );
}

// 10. Structural Engineer Diorama
function StructuralDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Concrete Base Footings */}
      <mesh position={[-0.45, -0.4, -0.3]} castShadow>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        {clayMat('#94A3B8')}
      </mesh>
      <mesh position={[0.45, -0.4, -0.3]} castShadow>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        {clayMat('#94A3B8')}
      </mesh>
      {/* Vertical I-Beam Columns */}
      <mesh position={[-0.45, 0.3, -0.3]} castShadow>
        <boxGeometry args={[0.1, 1.4, 0.1]} />
        {clayMat('#4F46E5')}
      </mesh>
      <mesh position={[0.45, 0.3, -0.3]} castShadow>
        <boxGeometry args={[0.1, 1.4, 0.1]} />
        {clayMat('#4F46E5')}
      </mesh>
      {/* Top Beam */}
      <mesh position={[0, 0.95, -0.3]} castShadow>
        <boxGeometry args={[1.1, 0.1, 0.1]} />
        {clayMat('#4F46E5')}
      </mesh>
      {/* Cross Truss Braces */}
      <mesh position={[0, 0.3, -0.3]} rotation={[0, 0, 0.7]}>
        <boxGeometry args={[1.3, 0.05, 0.05]} />
        {clayMat('#818CF8')}
      </mesh>
      <mesh position={[0, 0.3, -0.3]} rotation={[0, 0, -0.7]}>
        <boxGeometry args={[1.3, 0.05, 0.05]} />
        {clayMat('#818CF8')}
      </mesh>
    </group>
  );
}

// 11. Painter Diorama
function PainterDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Painter Ladder */}
      <mesh position={[-0.35, 0.2, -0.2]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[0.35, 1.4, 0.05]} />
        {clayMat('#B45309')}
      </mesh>
      {/* Paint Buckets with Dripping Acrylic */}
      <mesh position={[0.2, -0.3, 0.1]} castShadow>
        <cylinderGeometry args={[0.22, 0.18, 0.42, 16]} />
        {clayMat('#E2E8F0')}
      </mesh>
      <mesh position={[0.2, -0.08, 0.1]}>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 16]} />
        {clayMat('#FF8A1F')}
      </mesh>
      {/* Paint Roller & Tray */}
      <mesh position={[-0.1, -0.4, 0.35]} rotation={[0.2, 0.4, 0]} castShadow>
        <boxGeometry args={[0.45, 0.08, 0.3]} />
        {clayMat('#1E293B')}
      </mesh>
      <mesh position={[0.35, 0.1, 0.2]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.07, 0.07, 0.28, 16]} />
        {clayMat('#EC4899')}
      </mesh>
    </group>
  );
}

// 12. Material Supplier Diorama
function MaterialSupplierDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Heavy Wooden Skid */}
      <mesh position={[0, -0.48, 0]} receiveShadow>
        <boxGeometry args={[1.3, 0.1, 1.2]} />
        {clayMat('#A16207')}
      </mesh>
      {/* Stack of Cement Bags */}
      {[-0.3, 0.3].map((x, i) => (
        <mesh key={i} position={[x, -0.3, -0.15]} castShadow>
          <boxGeometry args={[0.5, 0.24, 0.65]} />
          {clayMat('#94A3B8')}
        </mesh>
      ))}
      <mesh position={[0, -0.06, -0.15]} castShadow>
        <boxGeometry args={[0.52, 0.24, 0.65]} />
        {clayMat('#CBD5E1')}
      </mesh>
      {/* Aggregate / Sand Mound */}
      <mesh position={[0.25, -0.35, 0.35]} castShadow>
        <sphereGeometry args={[0.3, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        {clayMat('#D97706')}
      </mesh>
      {/* Stack of Red Bricks */}
      <mesh position={[-0.35, -0.35, 0.35]} castShadow>
        <boxGeometry args={[0.35, 0.25, 0.35]} />
        {clayMat('#B91C1C')}
      </mesh>
    </group>
  );
}

// 13. Interior Labour Diorama (Artisan Mascot)
function InteriorLabourDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Stylized Mascot Clay Worker */}
      <mesh position={[0, -0.1, 0]} castShadow>
        {/* Torso with Orange Apron */}
        <cylinderGeometry args={[0.25, 0.3, 0.55, 16]} />
        {clayMat('#EA580C')}
      </mesh>
      {/* Mascot Head */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.26, 16, 16]} />
        {clayMat('#FDBA74')}
      </mesh>
      {/* Safety Goggles */}
      <mesh position={[0, 0.38, 0.22]}>
        <boxGeometry args={[0.3, 0.1, 0.08]} />
        {clayMat('#38BDF8')}
      </mesh>
      {/* Cordless Drill Tool */}
      <mesh position={[0.38, 0.05, 0.15]} rotation={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[0.18, 0.24, 0.1]} />
        {clayMat('#10B981')}
      </mesh>
      {/* Finishing Board */}
      <mesh position={[-0.4, 0.1, 0]} castShadow>
        <boxGeometry args={[0.06, 0.8, 0.5]} />
        {clayMat('#F59E0B')}
      </mesh>
    </group>
  );
}

// 14. Construction Labour Diorama
function ConstructionLabourDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Mascot Torso with Reflective Vest */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.32, 0.6, 16]} />
        {clayMat('#FF8A1F')}
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <sphereGeometry args={[0.26, 16, 16]} />
        {clayMat('#FED7AA')}
      </mesh>
      {/* Yellow Safety Hardhat */}
      <mesh position={[0, 0.52, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        {clayMat('#FACC15')}
      </mesh>
      {/* Heavy Wheelbarrow */}
      <mesh position={[0.4, -0.35, 0.1]} castShadow>
        <boxGeometry args={[0.45, 0.22, 0.35]} />
        {clayMat('#64748B')}
      </mesh>
      {/* Wheel */}
      <mesh position={[0.65, -0.45, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 16]} />
        {clayMat('#1E293B')}
      </mesh>
    </group>
  );
}

// 15. Fabricator Diorama
function FabricatorDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Metal Frame Corner */}
      <mesh position={[0, 0.1, -0.1]} castShadow>
        <torusGeometry args={[0.55, 0.08, 12, 4]} rotation={[0, 0, Math.PI / 4]} />
        {clayMat('#475569', 0.2, 0.4)}
      </mesh>
      {/* Welding Shield Mask */}
      <mesh position={[-0.3, -0.2, 0.3]} rotation={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.35, 0.45, 0.2]} />
        {clayMat('#1E293B')}
      </mesh>
      <mesh position={[-0.3, -0.15, 0.41]}>
        <boxGeometry args={[0.22, 0.08, 0.02]} />
        {clayMat('#38BDF8')}
      </mesh>
      {/* Welding Torch with soft spark glow */}
      <mesh position={[0.3, -0.1, 0.2]} rotation={[0.4, -0.6, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5]} />
        {clayMat('#EA580C')}
      </mesh>
      <mesh position={[0.2, 0.08, 0.05]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshBasicMaterial color="#FDBA74" />
      </mesh>
    </group>
  );
}

// 16. Mason Diorama
function MasonDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Brick Wall Section */}
      {[-0.3, -0.1, 0.1, 0.3].map((y, rowIdx) => (
        <mesh key={rowIdx} position={[rowIdx % 2 === 0 ? 0 : 0.08, y, -0.1]} castShadow>
          <boxGeometry args={[1.0, 0.16, 0.35]} />
          {clayMat('#B91C1C')}
        </mesh>
      ))}
      {/* Mortar bucket */}
      <mesh position={[-0.45, -0.35, 0.35]} castShadow>
        <cylinderGeometry args={[0.2, 0.16, 0.3, 16]} />
        {clayMat('#64748B')}
      </mesh>
      {/* Metal Trowel with cement dollop */}
      <mesh position={[0.3, -0.25, 0.3]} rotation={[-0.3, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.02, 0.04, 3]} />
        {clayMat('#94A3B8')}
      </mesh>
    </group>
  );
}

// 17. Flooring Specialist Diorama
function FlooringDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Checkerboard Tile Surface */}
      <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.4, 1.4]} />
        {clayMat('#0D9488')}
      </mesh>
      {/* Floating angled tile being set */}
      <mesh position={[0, 0.05, 0]} rotation={[0.3, -0.3, 0.1]} castShadow>
        <boxGeometry args={[0.6, 0.06, 0.6]} />
        {clayMat('#F8FAFC')}
      </mesh>
      {/* Rubber Mallet Hammer */}
      <mesh position={[0.35, -0.1, 0.35]} rotation={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.4]} />
        {clayMat('#A16207')}
      </mesh>
      <mesh position={[0.42, -0.05, 0.35]}>
        <cylinderGeometry args={[0.08, 0.08, 0.18, 16]} />
        {clayMat('#1E293B')}
      </mesh>
    </group>
  );
}

// 18. POP Technician Diorama
function PopCeilingDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Stepped False Ceiling Gypsum Cove */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.4, 0.1, 1.4]} />
        {clayMat('#F1F5F9')}
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.0, 0.1, 1.0]} />
        {clayMat('#FFFFFF')}
      </mesh>
      {/* Warm Ambient Cove Glow light ring */}
      <mesh position={[0, 0.38, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.04, 12, 24]} />
        <meshBasicMaterial color="#FFB703" />
      </mesh>
      {/* Plaster Hawk Plate & Spatula */}
      <mesh position={[-0.2, -0.2, 0.3]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.45, 0.04, 0.45]} />
        {clayMat('#CBD5E1')}
      </mesh>
      <mesh position={[0.3, -0.25, 0.35]} rotation={[0.2, 0.5, 0]} castShadow>
        <boxGeometry args={[0.12, 0.32, 0.04]} />
        {clayMat('#FF8A1F')}
      </mesh>
    </group>
  );
}

// 19. HVAC Technician Diorama
function HvacDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* Outdoor Air Conditioner Unit */}
      <mesh position={[0, 0, -0.1]} castShadow>
        <boxGeometry args={[1.1, 0.9, 0.6]} />
        {clayMat('#E2E8F0')}
      </mesh>
      {/* Fan Grille */}
      <mesh position={[0, 0, 0.22]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]} />
        {clayMat('#1E293B')}
      </mesh>
      {/* Flex duct coil */}
      <mesh position={[-0.3, -0.25, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.18, 0.07, 12, 24]} />
        {clayMat('#94A3B8')}
      </mesh>
      {/* Digital Thermostat Display */}
      <mesh position={[0.4, -0.3, 0.4]} castShadow>
        <boxGeometry args={[0.22, 0.25, 0.06]} />
        {clayMat('#2563EB')}
      </mesh>
    </group>
  );
}

// 20. Safety Officer Diorama
function SafetyDiorama() {
  return (
    <group scale={0.75} position={[0, 0, 0]}>
      {/* First Aid Emergency Kit Box */}
      <mesh position={[-0.2, -0.1, -0.1]} castShadow>
        <boxGeometry args={[0.65, 0.5, 0.35]} />
        {clayMat('#FFFFFF')}
      </mesh>
      {/* Green Safety Cross */}
      <mesh position={[-0.2, -0.1, 0.09]}>
        <boxGeometry args={[0.3, 0.08, 0.02]} />
        {clayMat('#16A34A')}
      </mesh>
      <mesh position={[-0.2, -0.1, 0.09]}>
        <boxGeometry args={[0.08, 0.3, 0.02]} />
        {clayMat('#16A34A')}
      </mesh>
      {/* Bright Traffic Safety Cones */}
      <mesh position={[0.35, -0.28, 0.2]} castShadow>
        <coneGeometry args={[0.18, 0.45, 16]} />
        {clayMat('#EA580C')}
      </mesh>
      {/* Safety Harness Badge */}
      <mesh position={[0.3, 0.25, -0.1]}>
        <torusGeometry args={[0.18, 0.04, 12, 24]} />
        {clayMat('#FACC15')}
      </mesh>
    </group>
  );
}
