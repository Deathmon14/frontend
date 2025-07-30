import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Sphere, 
  MeshDistortMaterial, 
  OrbitControls,
  Float,
  Text3D,
  Environment,
  Sparkles,
  Stars
} from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

// Floating Event Elements
const FloatingElement: React.FC<{ position: [number, number, number]; color: string }> = ({ 
  position, 
  color 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.4, 32, 16]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

// Main 3D Hero Scene
const HeroScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const elements = useMemo(() => [
    { position: [-3, 2, -2] as [number, number, number], color: '#667eea' },
    { position: [3, -1, -1] as [number, number, number], color: '#764ba2' },
    { position: [-2, -2, 1] as [number, number, number], color: '#f093fb' },
    { position: [2, 1, 2] as [number, number, number], color: '#4facfe' },
    { position: [0, 3, 0] as [number, number, number], color: '#a855f7' },
  ], []);

  return (
    <group ref={groupRef}>
      <Environment preset="sunset" />
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0.5} />
      
      {/* Main central sphere with distortion */}
      <Float speed={2} rotationIntensity={1} floatIntensity={3}>
        <Sphere args={[1.5, 64, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#667eea"
            attach="material"
            distort={0.6}
            speed={1.5}
            roughness={0.2}
            metalness={0.9}
          />
        </Sphere>
      </Float>

      {/* Floating event elements */}
      {elements.map((element, index) => (
        <FloatingElement
          key={index}
          position={element.position}
          color={element.color}
        />
      ))}

      {/* Sparkles for magical effect */}
      <Sparkles
        count={100}
        scale={10}
        size={3}
        speed={0.4}
        color="#ffffff"
      />

      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#764ba2" intensity={0.5} />
    </group>
  );
};

// Main 3D Hero Component
export const Hero3D: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`w-full h-full ${className || ''}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <HeroScene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 2.8}
        />
      </Canvas>
    </div>
  );
};

// Simpler 3D background for cards
export const Card3DBackground: React.FC<{ 
  className?: string; 
  color?: string;
  intensity?: number;
}> = ({ 
  className, 
  color = '#667eea',
  intensity = 0.3
}) => {
  return (
    <div className={`absolute inset-0 ${className || ''}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[1, 32, 16]} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={intensity}
              speed={1}
              roughness={0.4}
              metalness={0.6}
              transparent
              opacity={0.6}
            />
          </Sphere>
        </Float>
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 2, 2]} intensity={0.5} />
      </Canvas>
    </div>
  );
};