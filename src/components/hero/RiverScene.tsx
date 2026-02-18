'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SceneManager } from '@/lib/three/scene-manager';
import { createRiverMesh, updateRiverTime } from '@/lib/three/river-shader';
import { ParticleSystem } from '@/lib/three/particle-system';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useDeviceType } from '@/lib/hooks/useDeviceType';
import { usePalette } from '@/lib/palette-context';

export function RiverScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const managerRef = useRef<SceneManager | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [webglFailed] = useState(() => !SceneManager.isWebGLAvailable());
  const prefersReduced = useReducedMotion();
  const device = useDeviceType();
  const { colors, int: intColors } = usePalette();

  // Pause render loop when off-screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const manager = managerRef.current;
    if (!manager) return;
    if (isVisible) {
      manager.start();
    } else {
      manager.stop();
    }
  }, [isVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const manager = new SceneManager({
      canvas,
      pixelRatio: isMobile
        ? Math.min(window.devicePixelRatio, 1.5)
        : Math.min(window.devicePixelRatio, 2),
    });

    // Add subtle ambient light
    const ambient = new THREE.AmbientLight(intColors.accent, 0.3);
    manager.scene.add(ambient);

    // Create river with palette colors
    const river = createRiverMesh(12, 8, 128, {
      deep: intColors.background,
      light: intColors.accent,
      accent: intColors.stream1,
    });
    manager.scene.add(river);

    // Create particles
    const particles = new ParticleSystem({
      count: device.particleCount,
      spread: { x: 10, y: 4, z: 6 },
      color: new THREE.Color(intColors.accent),
      size: device.type === 'mobile' ? 0.04 : 0.03,
      speed: 0.2,
    });
    manager.scene.add(particles.points);

    // Second particle layer (stream1 accents)
    const accentParticles = new ParticleSystem({
      count: Math.floor(device.particleCount * 0.3),
      spread: { x: 8, y: 3, z: 4 },
      color: new THREE.Color(intColors.stream1),
      size: 0.02,
      speed: 0.15,
    });
    manager.scene.add(accentParticles.points);

    manager.setUpdateCallback((delta, elapsed) => {
      updateRiverTime(river, elapsed);
      particles.update(delta);
      accentParticles.update(delta);
    });

    managerRef.current = manager;
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
      managerRef.current = null;
    };
  }, [prefersReduced, device, intColors]);

  if (prefersReduced || webglFailed) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.accent}22 50%, ${colors.background} 100%)`,
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
