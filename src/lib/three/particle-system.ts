import * as THREE from 'three';

export interface ParticleSystemOptions {
  count: number;
  spread: { x: number; y: number; z: number };
  color: THREE.Color;
  size?: number;
  speed?: number;
}

export class ParticleSystem {
  points: THREE.Points;
  private velocities: Float32Array;
  private spread: { x: number; y: number; z: number };
  private speed: number;

  constructor({
    count,
    spread,
    color,
    size = 0.03,
    speed = 0.3,
  }: ParticleSystemOptions) {
    this.spread = spread;
    this.speed = speed;

    const positions = new Float32Array(count * 3);
    const alphas = new Float32Array(count);
    this.velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread.x;
      positions[i3 + 1] = (Math.random() - 0.5) * spread.y;
      positions[i3 + 2] = (Math.random() - 0.5) * spread.z;

      this.velocities[i3] = (Math.random() - 0.5) * 0.02;
      this.velocities[i3 + 1] = Math.random() * 0.01 + 0.005;
      this.velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      alphas[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: color },
        size: { value: size },
        opacity: { value: 0.6 },
      },
      vertexShader: `
        attribute float alpha;
        uniform float size;
        varying float vAlpha;

        void main() {
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / length(mvPosition.xyz));
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        varying float vAlpha;

        void main() {
          // Make round particles
          vec2 center = gl_PointCoord - vec2(0.5);
          if (length(center) > 0.5) discard;

          gl_FragColor = vec4(color, opacity * vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.points = new THREE.Points(geometry, material);
  }

  update(delta: number) {
    const positions = this.points.geometry.attributes.position
      .array as Float32Array;
    const alphas = this.points.geometry.attributes.alpha.array as Float32Array;
    const count = positions.length / 3;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] += this.velocities[i3] * this.speed * delta * 60;
      positions[i3 + 1] += this.velocities[i3 + 1] * this.speed * delta * 60;
      positions[i3 + 2] += this.velocities[i3 + 2] * this.speed * delta * 60;

      // Pulse alpha
      alphas[i] = Math.sin(Date.now() * 0.001 + i) * 0.3 + 0.5;

      // Reset particles that drift too far
      if (
        Math.abs(positions[i3]) > this.spread.x * 0.5 ||
        positions[i3 + 1] > this.spread.y * 0.5 ||
        positions[i3 + 1] < -this.spread.y * 0.5
      ) {
        positions[i3] = (Math.random() - 0.5) * this.spread.x * 0.5;
        positions[i3 + 1] = -this.spread.y * 0.3;
        positions[i3 + 2] = (Math.random() - 0.5) * this.spread.z;
      }
    }

    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.alpha.needsUpdate = true;
  }

  dispose() {
    this.points.geometry.dispose();
    (this.points.material as THREE.ShaderMaterial).dispose();
  }
}
