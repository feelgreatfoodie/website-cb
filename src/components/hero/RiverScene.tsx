'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useDeviceType } from '@/lib/hooks/useDeviceType';
import { usePalette } from '@/lib/palette-context';

export function RiverScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const managerRef = useRef<import('@/lib/three/scene-manager').SceneManager | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const prefersReduced = useReducedMotion();
  const device = useDeviceType();
  const { colors, int: intColors } = usePalette();

  const nav = typeof navigator !== 'undefined' ? navigator as Navigator & {
    connection?: { effectiveType?: string; saveData?: boolean };
  } : null;
  const isSlowConnection = nav?.connection?.effectiveType === '2g' ||
    nav?.connection?.effectiveType === 'slow-2g' ||
    nav?.connection?.saveData === true;

  // Check WebGL on mount
  useEffect(() => {
    import('@/lib/three/scene-manager').then(({ SceneManager }) => {
      if (!SceneManager.isWebGLAvailable()) setWebglFailed(true);
    });
  }, []);

  // Observe visibility
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

  // Start/stop render loop based on visibility
  useEffect(() => {
    const manager = managerRef.current;
    if (!manager) return;
    if (isVisible) {
      manager.start();
    } else {
      manager.stop();
    }
  }, [isVisible]);

  // Deferred init — only create meshes/materials when first visible
  const initScene = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || initialized || prefersReduced || webglFailed || isSlowConnection) return;

    const [THREE, { SceneManager }, { createRiverMesh, updateRiverTime }, { ParticleSystem }] =
      await Promise.all([
        import('three'),
        import('@/lib/three/scene-manager'),
        import('@/lib/three/river-shader'),
        import('@/lib/three/particle-system'),
      ]);

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

    // Create river with palette colors — simplified geometry on mobile
    const segments = device.type === 'mobile' ? 64 : 128;
    const river = createRiverMesh(12, 8, segments, {
      deep: intColors.background,
      light: intColors.accent,
      accent: intColors.stream1,
    });
    manager.scene.add(river);

    // Create particles — reduced count on mobile
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
    setInitialized(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      particles.dispose();
      accentParticles.dispose();
      manager.dispose();
      managerRef.current = null;
    };
  }, [initialized, prefersReduced, webglFailed, isSlowConnection, device, intColors]);

  // Trigger init when first visible
  useEffect(() => {
    if (isVisible && !initialized && !prefersReduced && !webglFailed && !isSlowConnection) {
      const cleanup = initScene();
      return () => {
        cleanup?.then((fn) => fn?.());
      };
    }
  }, [isVisible, initialized, prefersReduced, webglFailed, isSlowConnection, initScene]);

  if (prefersReduced || webglFailed || isSlowConnection) {
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
