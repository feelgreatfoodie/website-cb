import * as THREE from 'three';

export interface SceneManagerOptions {
  canvas: HTMLCanvasElement;
  pixelRatio?: number;
  antialias?: boolean;
}

export class SceneManager {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  clock: THREE.Clock;
  private animationId: number | null = null;
  private onUpdate: ((delta: number, elapsed: number) => void) | null = null;

  constructor({ canvas, pixelRatio = 1, antialias = true }: SceneManagerOptions) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 1, 5);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(pixelRatio, 2));
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.clock = new THREE.Clock();
  }

  setUpdateCallback(cb: (delta: number, elapsed: number) => void) {
    this.onUpdate = cb;
  }

  start() {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      const delta = this.clock.getDelta();
      const elapsed = this.clock.getElapsedTime();
      this.onUpdate?.(delta, elapsed);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  dispose() {
    this.stop();
    this.renderer.dispose();
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
  }
}
