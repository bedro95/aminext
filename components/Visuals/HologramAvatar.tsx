"use client";

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function AvatarParticles({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const points = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const count = 5000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create a humanoid silhouette
      const t = Math.random() * Math.PI * 2;
      const h = (Math.random() - 0.5) * 4; // Height
      const r = (1 - Math.abs(h / 2)) * 0.8 + 0.2; // Taper for body
      
      pos[i * 3] = Math.cos(t) * r;
      pos[i * 3 + 1] = h;
      pos[i * 3 + 2] = Math.sin(t) * r;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (points.current) {
      const time = state.clock.elapsedTime;
      points.current.rotation.y += 0.002;
      
      // Follow mouse/touch
      const targetX = (mouseX * viewport.width) / 2;
      const targetY = (mouseY * viewport.height) / 2;
      points.current.position.x += (targetX - points.current.position.x) * 0.05;
      points.current.position.y += (targetY - points.current.position.y) * 0.05;

      // Breathing + Glitch
      points.current.scale.setScalar(1 + Math.sin(time * 2) * 0.02);
      if (Math.random() > 0.97) {
        points.current.position.x += (Math.random() - 0.5) * 0.1;
      }
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00FFCC"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function HologramAvatar() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setMouse({
        x: (x / window.innerWidth) * 2 - 1,
        y: -(y / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <AvatarParticles mouseX={mouse.x} mouseY={mouse.y} />
      </Canvas>
    </div>
  );
}
