import React from 'react';

export default function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.85} color="#FFF7ED" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#FFFBF5"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <directionalLight
        position={[-5, 3, -4]}
        intensity={0.4}
        color="#FFEDD5"
      />
      <pointLight position={[0, -2, 2]} intensity={0.25} color="#FED7AA" />
    </>
  );
}
