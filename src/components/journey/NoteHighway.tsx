'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { SceneManager } from '@/lib/three/scene-manager';
import { AmbientStream } from '@/lib/three/ambient-stream';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useDeviceType } from '@/lib/hooks/useDeviceType';
import { usePalette } from '@/lib/palette-context';

interface NoteHighwayProps {
  scrollSpeed: number;
  pausedStreams: { data: boolean; sales: boolean; poker: boolean };
}

const STREAM_IDS = ['data', 'sales', 'poker'] as const;
const STREAM_LANES = [-1, 0, 1];

const PARTICLE_COUNTS = { desktop: 40, tablet: 25, mobile: 15 };

export function NoteHighway({ scrollSpeed, pausedStreams }: NoteHighwayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamsRef = useRef<Map<string, AmbientStream>>(new Map());
  const prefersReduced = useReducedMotion();
  const device = useDeviceType();
  const { int: intColors, colors } = usePalette();

  const streamColors = [intColors.stream1, intColors.stream2, intColors.stream3];

  const initScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;

    const manager = new SceneManager({
      canvas,
      pixelRatio: device.pixelRatio,
    });

    manager.camera.position.set(0, 0, 5);
    manager.camera.lookAt(0, 0, 0);

    const particleCount = PARTICLE_COUNTS[device.type];

    STREAM_IDS.forEach((id, i) => {
      const stream = new AmbientStream({
        color: new THREE.Color(streamColors[i]),
        count: particleCount,
        speed: 0.01,
        lane: STREAM_LANES[i],
      });
      streamsRef.current.set(id, stream);
      manager.scene.add(stream.group);
    });

    manager.setUpdateCallback((delta, elapsed) => {
      streamsRef.current.forEach((stream) => {
        stream.update(delta, elapsed, scrollSpeed);
      });
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
      streamsRef.current.forEach((s) => s.dispose());
      streamsRef.current.clear();
      manager.dispose();
    };
  }, [prefersReduced, device, scrollSpeed, streamColors]);

  useEffect(() => {
    const cleanup = initScene();
    return cleanup;
  }, [initScene]);

  // Sync pause state
  useEffect(() => {
    STREAM_IDS.forEach((id) => {
      const stream = streamsRef.current.get(id);
      stream?.setPaused(pausedStreams[id]);
    });
  }, [pausedStreams]);

  if (prefersReduced) {
    const hexColors = [colors.stream1, colors.stream2, colors.stream3];
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex gap-8">
          {STREAM_IDS.map((id, i) => (
            <div
              key={id}
              className="h-32 w-1 rounded-full opacity-40"
              style={{ background: hexColors[i] }}
            />
          ))}
        </div>
      </div>
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
