import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { clamp, interpolateKeyframes, mapDocumentScroll } from '../../utils/scroll';
import styles from './DesktopStarScene.module.css';

export interface DesktopStarSceneProps {
  onReady?: () => void;
}

const MAX_PIXEL_RATIO = 1.5;

function createStarShape(): THREE.Shape {
  const shape = new THREE.Shape();
  const outerRadius = 1;
  const innerRadius = 0.44;

  for (let point = 0; point < 10; point += 1) {
    const radius = point % 2 === 0 ? outerRadius : innerRadius;
    const angle = -Math.PI / 2 + (point * Math.PI) / 5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    if (point === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }

  shape.closePath();
  return shape;
}

function scrollProgress(): number {
  return mapDocumentScroll(
    window.scrollY,
    document.documentElement.scrollHeight,
    window.innerHeight,
  );
}

export default function DesktopStarScene({ onReady }: DesktopStarSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        depth: true,
        powerPreference: 'high-performance',
        premultipliedAlpha: true,
        stencil: false,
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.tabIndex = -1;
    container.append(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 20);
    camera.position.set(0, 0, 4.45);

    const starGeometry = new THREE.ExtrudeGeometry(createStarShape(), {
      bevelEnabled: true,
      bevelOffset: 0,
      bevelSegments: 5,
      bevelSize: 0.075,
      bevelThickness: 0.085,
      curveSegments: 2,
      depth: 0.3,
      steps: 1,
    });
    starGeometry.center();

    const starMaterial = new THREE.MeshPhysicalMaterial({
      clearcoat: 0.9,
      clearcoatRoughness: 0.18,
      color: 0xffd400,
      metalness: 0.68,
      roughness: 0.24,
    });
    const starMesh = new THREE.Mesh(starGeometry, starMaterial);

    const edgeGeometry = new THREE.EdgesGeometry(starGeometry, 24);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x1a1600,
      transparent: true,
      opacity: 0.58,
    });
    const starEdges = new THREE.LineSegments(edgeGeometry, edgeMaterial);

    const starGroup = new THREE.Group();
    starGroup.add(starMesh, starEdges);
    scene.add(starGroup);

    const ambientLight = new THREE.HemisphereLight(0xfff4bd, 0x27230d, 2.25);
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.6);
    keyLight.position.set(2.5, 3.5, 4);
    const rimLight = new THREE.PointLight(0xffb800, 22, 8, 1.8);
    rimLight.position.set(-2.4, -1.2, 2.7);
    scene.add(ambientLight, keyLight, rimLight);

    const pointer = new THREE.Vector2();
    let frameId: number | null = null;
    let disposed = false;
    let hasAnnouncedReady = false;

    const render = () => {
      frameId = null;

      if (disposed || document.visibilityState === 'hidden') {
        return;
      }

      const progress = scrollProgress();
      starGroup.position.x = -0.12 + pointer.x * 0.16;
      starGroup.position.y =
        interpolateKeyframes(progress, [0.68, 0.18, -0.18, -0.72]) - pointer.y * 0.1;
      starGroup.rotation.x = 0.24 + progress * Math.PI * 0.68 - pointer.y * 0.2;
      starGroup.rotation.y = -0.38 + progress * Math.PI * 1.05 + pointer.x * 0.52;
      starGroup.rotation.z = progress * Math.PI * 2.2 + pointer.x * 0.18;

      const scale = interpolateKeyframes(progress, [0.88, 0.925, 0.835, 0.88]);
      starGroup.scale.setScalar(scale);
      keyLight.position.x = 2.5 + pointer.x * 1.5;
      keyLight.position.y = 3.5 - pointer.y;
      rimLight.position.x = -2.4 - pointer.x;
      rimLight.position.y = -1.2 + pointer.y;

      renderer.render(scene, camera);

      if (!hasAnnouncedReady) {
        hasAnnouncedReady = true;
        onReady?.();
      }
    };

    const scheduleRender = () => {
      if (frameId === null && !disposed) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const safeWidth = Math.max(1, Math.round(width));
      const safeHeight = Math.max(1, Math.round(height));

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
      renderer.setSize(safeWidth, safeHeight, false);
      camera.aspect = safeWidth / safeHeight;
      camera.updateProjectionMatrix();
      scheduleRender();
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.set(
        clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1),
        clamp(-(event.clientY / window.innerHeight) * 2 + 1, -1, 1),
      );
      scheduleRender();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        scheduleRender();
      }
    };

    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize);
    resizeObserver?.observe(container);
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', scheduleRender, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resize();

    return () => {
      disposed = true;

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      resizeObserver?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', scheduleRender);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      scene.remove(starGroup, ambientLight, keyLight, rimLight);
      starGeometry.dispose();
      edgeGeometry.dispose();
      starMaterial.dispose();
      edgeMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [onReady]);

  return <div ref={containerRef} className={styles.scene} aria-hidden="true" />;
}
