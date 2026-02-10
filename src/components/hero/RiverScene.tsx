'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SceneManager } from '@/lib/three/scene-manager';
import { createRiverMesh, updateRiverTime } from '@/lib/three/river-shader';
import { ParticleSystem } from '@/lib/three/particle-system';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useDeviceType } from '@/lib/hooks/useDeviceType';

export function RiverScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();
  const device = useDeviceType();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;

    const manager = new SceneManager({
      canvas,
      pixelRatio: device.pixelRatio,
    });

    // Add subtle ambient light
    const ambient = new THREE.AmbientLight(0x1e90ff, 0.3);
    manager.scene.add(ambient);

    // Create river
    const river = createRiverMesh();
    manager.scene.add(river);

    // Create particles
    const particles = new ParticleSystem({
      count: device.particleCount,
      spread: { x: 10, y: 4, z: 6 },
      color: new THREE.Color(0x1e90ff),
      size: device.type === 'mobile' ? 0.04 : 0.03,
      speed: 0.2,
    });
    manager.scene.add(particles.points);

    // Second particle layer (cyan accents)
    const accentParticles = new ParticleSystem({
      count: Math.floor(device.particleCount * 0.3),
      spread: { x: 8, y: 3, z: 4 },
      color: new THREE.Color(0x00ffff),
      size: 0.02,
      speed: 0.15,
    });
    manager.scene.add(accentParticles.points);

    manager.setUpdateCallback((delta, elapsed) => {
      updateRiverTime(river, elapsed);
      particles.update(delta);
      accentParticles.update(delta);
    });

    manager.start();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const { clientWidth, clientHeight } = canvas.parentElement;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
      manager.resize(clientWidth, clientHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      particles.dispose();
      accentParticles.dispose();
      manager.dispose();
    };
  }, [prefersReduced, device]);

  if (prefersReduced) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #2E004B 0%, #1E90FF22 50%, #2E004B 100%)',
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
