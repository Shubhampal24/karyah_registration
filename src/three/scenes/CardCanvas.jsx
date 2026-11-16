import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import StudioLights from '../lights/StudioLights';
import { AnimalMascot } from '../models/AnimalMascots';

class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn('WebGL fallback activated:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function CardCanvas({ species = 'bear', isHovered }) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  const fallbackView = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF5EA] to-[#FFE8D1] rounded-2xl p-4">
      <div className="w-16 h-16 rounded-2xl bg-white shadow-soft flex items-center justify-center text-3xl mb-2 border border-[#EFE8DE]">
        🐾
      </div>
      <div className="h-1.5 w-10 bg-[#FF8A1F]/30 rounded-full"></div>
    </div>
  );

  if (!webglSupported) {
    return fallbackView;
  }

  return (
    <div className="w-full h-full relative cursor-pointer select-none">
      <WebGLErrorBoundary fallback={fallbackView}>
        <Canvas
          shadows
          camera={{ position: [0, 0.9, 2.8], fov: 44 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true,
          }}
          className="w-full h-full"
        >
          <StudioLights />
          <Suspense fallback={null}>
            <AnimalMascot species={species} isHovered={isHovered} scale={0.95} />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
