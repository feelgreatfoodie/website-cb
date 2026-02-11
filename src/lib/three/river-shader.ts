import * as THREE from 'three';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmplitude;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;

    vec3 pos = position;
    float wave1 = sin(pos.x * 2.0 + uTime * 0.8) * uAmplitude;
    float wave2 = sin(pos.x * 3.5 + uTime * 1.2) * uAmplitude * 0.5;
    float wave3 = cos(pos.z * 1.5 + uTime * 0.6) * uAmplitude * 0.3;
    pos.y += wave1 + wave2 + wave3;

    vElevation = pos.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorDeep;
  uniform vec3 uColorLight;
  uniform vec3 uColorAccent;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Mix between deep purple and river blue based on UV and elevation
    float mixFactor = smoothstep(-0.1, 0.1, vElevation) * 0.6 + vUv.y * 0.4;
    vec3 color = mix(uColorDeep, uColorLight, mixFactor);

    // Add flowing accent highlights
    float highlight = sin(vUv.x * 20.0 - uTime * 2.0) * 0.5 + 0.5;
    highlight *= smoothstep(0.3, 0.7, vUv.y);
    color = mix(color, uColorAccent, highlight * 0.15);

    // Soft alpha fade at edges
    float alpha = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
    alpha *= smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);

    gl_FragColor = vec4(color, alpha * 0.85);
  }
`;

interface RiverColors {
  deep: number;
  light: number;
  accent: number;
}

export function createRiverMesh(
  width = 12,
  depth = 8,
  segments = 128,
  colors?: RiverColors
): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(width, depth, segments, segments);
  geometry.rotateX(-Math.PI * 0.45);

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uAmplitude: { value: 0.08 },
      uColorDeep: { value: new THREE.Color(colors?.deep ?? 0x2e004b) },
      uColorLight: { value: new THREE.Color(colors?.light ?? 0x1e90ff) },
      uColorAccent: { value: new THREE.Color(colors?.accent ?? 0x00ffff) },
    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, -0.5, 0);
  return mesh;
}

export function updateRiverTime(mesh: THREE.Mesh, elapsed: number) {
  const material = mesh.material as THREE.ShaderMaterial;
  material.uniforms.uTime.value = elapsed;
}
