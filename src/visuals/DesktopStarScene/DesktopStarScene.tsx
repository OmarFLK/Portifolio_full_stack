import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { clamp } from '../../utils/scroll';
import styles from './DesktopStarScene.module.css';

export interface DesktopStarSceneProps {
  onReady?: () => void;
  onUnavailable?: () => void;
}

interface StarPose {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
}

interface StarWaypoint {
  label: string;
  selector: string;
  mode: 'hero' | 'gutter' | 'slot' | 'hidden';
  side?: 'left' | 'right';
  safeSelector?: string;
  slotSelector?: string;
  minWidth?: number;
  triggerY?: number;
  y: number;
  scale: number;
  opacity: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
}

interface ResolvedWaypoint {
  label: string;
  scroll: number;
  pose: StarPose;
}

const MAX_PIXEL_RATIO = 1.5;
const VIEWPORT_PADDING = 16;
const CONTENT_GAP = 32;

const STAR_WAYPOINTS: StarWaypoint[] = [
  {
    label: 'hero',
    selector: '#hero',
    mode: 'hero',
    side: 'right',
    y: 0.24,
    scale: 1.12,
    opacity: 0.2,
    rotationX: 0.14,
    rotationY: -0.28,
    rotationZ: -0.18,
  },
  {
    label: 'about',
    selector: '#about',
    mode: 'gutter',
    side: 'right',
    safeSelector: '[data-star-safe="about"]',
    minWidth: 1600,
    y: 0.5,
    scale: 0.72,
    opacity: 0.5,
    rotationX: 0.28,
    rotationY: 0.32,
    rotationZ: 0.5,
  },
  {
    label: 'projects',
    selector: '#projects',
    mode: 'hidden',
    y: 0.6,
    scale: 0.64,
    opacity: 0,
    rotationX: 0.22,
    rotationY: 0.5,
    rotationZ: 0.94,
  },
  {
    label: 'project-verithaz',
    selector: '[data-project-id="verithaz"]',
    mode: 'hidden',
    y: 0.52,
    scale: 0.64,
    opacity: 0,
    rotationX: 0.2,
    rotationY: 0.58,
    rotationZ: 1.12,
  },
  {
    label: 'project-vira-price',
    selector: '[data-project-id="vira-price"]',
    mode: 'hidden',
    y: 0.48,
    scale: 0.64,
    opacity: 0,
    rotationX: 0.18,
    rotationY: 0.64,
    rotationZ: 1.3,
  },
  {
    label: 'project-lead-enrichment',
    selector: '[data-project-id="lead-enrichment"]',
    mode: 'hidden',
    y: 0.52,
    scale: 0.64,
    opacity: 0,
    rotationX: 0.16,
    rotationY: 0.7,
    rotationZ: 1.48,
  },
  {
    label: 'project-educore',
    selector: '[data-project-id="educore"]',
    mode: 'hidden',
    y: 0.48,
    scale: 0.64,
    opacity: 0,
    rotationX: 0.14,
    rotationY: 0.76,
    rotationZ: 1.66,
  },
  {
    label: 'project-open-source',
    selector: '[data-project-id="open-source-lab"]',
    mode: 'hidden',
    y: 0.5,
    scale: 0.64,
    opacity: 0,
    rotationX: 0.12,
    rotationY: 0.82,
    rotationZ: 1.84,
  },
  {
    label: 'results',
    selector: '#resultados',
    mode: 'slot',
    slotSelector: '[data-star-anchor="results"]',
    side: 'right',
    triggerY: 0.05,
    y: 0.25,
    scale: 0.78,
    opacity: 0.72,
    rotationX: 0.24,
    rotationY: -0.24,
    rotationZ: Math.PI,
  },
  {
    label: 'results-metrics',
    selector: '[data-star-waypoint="results-metrics"]',
    mode: 'hidden',
    triggerY: 0.39,
    y: 0.16,
    scale: 0.68,
    opacity: 0,
    rotationX: 0.28,
    rotationY: -0.08,
    rotationZ: 3.56,
  },
  {
    label: 'experience',
    selector: '#experience',
    mode: 'gutter',
    side: 'right',
    safeSelector: '[data-star-safe="experience"]',
    minWidth: 1700,
    y: 0.48,
    scale: 0.67,
    opacity: 0.34,
    rotationX: 0.32,
    rotationY: 0.26,
    rotationZ: 3.64,
  },
  {
    label: 'skills',
    selector: '#skills',
    mode: 'hidden',
    y: 0.58,
    scale: 0.62,
    opacity: 0,
    rotationX: 0.22,
    rotationY: 0.52,
    rotationZ: 4.08,
  },
  {
    label: 'education',
    selector: '#education',
    mode: 'gutter',
    side: 'left',
    safeSelector: '[data-star-safe="education"]',
    minWidth: 1800,
    y: 0.44,
    scale: 0.65,
    opacity: 0.3,
    rotationX: 0.18,
    rotationY: -0.36,
    rotationZ: 4.56,
  },
  {
    label: 'laboratory',
    selector: '#laboratory',
    mode: 'hidden',
    y: 0.54,
    scale: 0.58,
    opacity: 0,
    rotationX: 0.14,
    rotationY: -0.28,
    rotationZ: 4.96,
  },
  {
    label: 'contact',
    selector: '#contact',
    mode: 'gutter',
    side: 'right',
    safeSelector: '[data-star-safe="contact"]',
    minWidth: 1800,
    y: 0.58,
    scale: 0.54,
    opacity: 0.24,
    rotationX: 0.1,
    rotationY: 0.18,
    rotationZ: 5.38,
  },
  {
    label: 'footer',
    selector: 'footer',
    mode: 'hidden',
    y: 0.66,
    scale: 0.46,
    opacity: 0,
    rotationX: 0.08,
    rotationY: 0.1,
    rotationZ: 5.76,
  },
];

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

function getElementDocumentTop(element: Element): number {
  return element.getBoundingClientRect().top + window.scrollY;
}

function getSafeBounds(selector: string): { left: number; right: number } | null {
  const element = document.querySelector<HTMLElement>(selector);

  if (!element) {
    return null;
  }

  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);
  const paddingLeft = Number.parseFloat(style.paddingLeft) || 0;
  const paddingRight = Number.parseFloat(style.paddingRight) || 0;

  return {
    left: rect.left + paddingLeft,
    right: rect.right - paddingRight,
  };
}

function resolvePose(waypoint: StarWaypoint, baseSize: number): StarPose {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const scaledSize = baseSize * waypoint.scale;
  const centeredY = clamp(
    viewportHeight * waypoint.y - scaledSize / 2,
    VIEWPORT_PADDING,
    Math.max(VIEWPORT_PADDING, viewportHeight - scaledSize - VIEWPORT_PADDING),
  );
  let x = viewportWidth - scaledSize - VIEWPORT_PADDING;
  let opacity = waypoint.opacity;

  if (waypoint.mode === 'hero') {
    const pageInset = clamp(viewportWidth * 0.04, 28, 80);
    x = viewportWidth - scaledSize - pageInset;
  } else if (waypoint.mode === 'slot' && waypoint.slotSelector) {
    const slot = document.querySelector<HTMLElement>(waypoint.slotSelector);
    const slotRect = slot?.getBoundingClientRect();

    if (slotRect) {
      x = clamp(
        slotRect.left + (slotRect.width - scaledSize) / 2,
        VIEWPORT_PADDING,
        viewportWidth - scaledSize - VIEWPORT_PADDING,
      );
    }
  } else if (waypoint.mode === 'gutter') {
    const safeBounds = waypoint.safeSelector ? getSafeBounds(waypoint.safeSelector) : null;
    const belowMinimumWidth = viewportWidth < (waypoint.minWidth ?? 0);

    if (!safeBounds || belowMinimumWidth) {
      opacity = 0;
    } else if (waypoint.side === 'left') {
      const available = safeBounds.left;

      if (available < scaledSize + CONTENT_GAP + VIEWPORT_PADDING) {
        opacity = 0;
      } else {
        x = (available - scaledSize) / 2;
      }
    } else {
      const available = viewportWidth - safeBounds.right;

      if (available < scaledSize + CONTENT_GAP + VIEWPORT_PADDING) {
        opacity = 0;
      } else {
        x = safeBounds.right + (available - scaledSize) / 2;
      }
    }
  } else if (waypoint.mode === 'hidden') {
    opacity = 0;
  }

  return {
    x: clamp(x, -scaledSize * 0.1, viewportWidth - scaledSize * 0.9),
    y: centeredY,
    scale: waypoint.scale,
    opacity,
    rotationX: waypoint.rotationX,
    rotationY: waypoint.rotationY,
    rotationZ: waypoint.rotationZ,
  };
}

function avoidProtectedContent(
  pose: StarPose,
  baseSize: number,
  waypointScroll: number,
  waypointElement: Element,
): StarPose {
  if (pose.opacity <= 0.005) {
    return pose;
  }

  const scaledSize = baseSize * pose.scale;
  const protectedElements = [
    ...(waypointElement.matches('[data-star-protected]') ? [waypointElement] : []),
    ...waypointElement.querySelectorAll<HTMLElement>('[data-star-protected]'),
  ];
  const sceneBounds = {
    top: pose.y,
    right: pose.x + scaledSize,
    bottom: pose.y + scaledSize,
    left: pose.x,
  };
  const overlapsProtectedContent = protectedElements.some((element) => {
    const rect = element.getBoundingClientRect();
    const documentTop = rect.top + window.scrollY;
    const viewportTopAtWaypoint = documentTop - waypointScroll;
    const protectedBounds = {
      top: viewportTopAtWaypoint - CONTENT_GAP,
      right: rect.right + CONTENT_GAP,
      bottom: viewportTopAtWaypoint + rect.height + CONTENT_GAP,
      left: rect.left - CONTENT_GAP,
    };

    return (
      sceneBounds.left < protectedBounds.right &&
      sceneBounds.right > protectedBounds.left &&
      sceneBounds.top < protectedBounds.bottom &&
      sceneBounds.bottom > protectedBounds.top
    );
  });

  return overlapsProtectedContent ? { ...pose, opacity: 0 } : pose;
}

function resolveWaypoints(baseSize: number): ResolvedWaypoint[] {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  let previousScroll = 0;

  return STAR_WAYPOINTS.flatMap((waypoint, index) => {
    const element = document.querySelector(waypoint.selector);

    if (!element) {
      return [];
    }

    const rawScroll =
      index === 0
        ? 0
        : getElementDocumentTop(element) -
          window.innerHeight * (waypoint.triggerY ?? (waypoint.mode === 'hidden' ? 0.58 : 0.46));
    const scroll = clamp(Math.max(previousScroll, rawScroll), 0, maxScroll);
    const pose = avoidProtectedContent(resolvePose(waypoint, baseSize), baseSize, scroll, element);
    previousScroll = scroll;

    return [
      {
        label: waypoint.label,
        scroll,
        pose,
      },
    ];
  });
}

gsap.registerPlugin(ScrollTrigger);

export default function DesktopStarScene({ onReady, onUnavailable }: DesktopStarSceneProps) {
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
      onUnavailable?.();
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.04;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.tabIndex = -1;
    container.append(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);

    const starGeometry = new THREE.ExtrudeGeometry(createStarShape(), {
      bevelEnabled: true,
      bevelOffset: 0,
      bevelSegments: 4,
      bevelSize: 0.05,
      bevelThickness: 0.045,
      curveSegments: 2,
      depth: 0.14,
      steps: 1,
    });
    starGeometry.center();
    starGeometry.computeBoundingSphere();

    const boundingRadius = starGeometry.boundingSphere?.radius ?? 1.1;
    const cameraDistance =
      (boundingRadius / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2))) * 1.2;
    camera.position.set(0, 0, cameraDistance);
    camera.near = Math.max(0.05, cameraDistance - boundingRadius * 2.5);
    camera.far = cameraDistance + boundingRadius * 4;
    camera.updateProjectionMatrix();

    const faceMaterial = new THREE.MeshPhysicalMaterial({
      clearcoat: 0.62,
      clearcoatRoughness: 0.26,
      color: 0xffd400,
      metalness: 0.3,
      roughness: 0.36,
    });
    const sideMaterial = new THREE.MeshPhysicalMaterial({
      clearcoat: 0.38,
      clearcoatRoughness: 0.34,
      color: 0xa97800,
      metalness: 0.22,
      roughness: 0.42,
    });
    const starMesh = new THREE.Mesh(starGeometry, [faceMaterial, sideMaterial]);

    const edgeGeometry = new THREE.EdgesGeometry(starGeometry, 28);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x7c5c00,
      transparent: true,
      opacity: 0.42,
    });
    const starEdges = new THREE.LineSegments(edgeGeometry, edgeMaterial);

    const starGroup = new THREE.Group();
    starGroup.add(starMesh, starEdges);
    scene.add(starGroup);

    const ambientLight = new THREE.HemisphereLight(0xfff5c7, 0x6c5200, 2.05);
    const keyLight = new THREE.DirectionalLight(0xfffdf7, 4.2);
    keyLight.position.set(2.8, 3.6, 4.5);
    const fillLight = new THREE.PointLight(0xffc21a, 13, 8, 1.9);
    fillLight.position.set(-2.3, -1.1, 2.6);
    scene.add(ambientLight, keyLight, fillLight);

    const pose: StarPose = {
      x: window.innerWidth,
      y: 0,
      scale: 1,
      opacity: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
    };
    let frameId: number | null = null;
    let rebuildFrameId: number | null = null;
    let timeline: gsap.core.Timeline | null = null;
    let starScrollTrigger: ScrollTrigger | null = null;
    let disposed = false;
    let hasAnnouncedReady = false;

    const render = () => {
      frameId = null;

      if (disposed || document.visibilityState === 'hidden') {
        return;
      }

      starGroup.rotation.set(pose.rotationX, pose.rotationY, pose.rotationZ);
      starGroup.visible = pose.opacity > 0.005;
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

    const applyPose = () => {
      gsap.set(container, {
        x: pose.x,
        y: pose.y,
        scale: pose.scale,
        opacity: pose.opacity,
      });
      scheduleRender();
    };

    const destroyTimeline = () => {
      starScrollTrigger?.kill();
      starScrollTrigger = null;
      timeline?.kill();
      timeline = null;
    };

    const buildTimeline = () => {
      destroyTimeline();

      const baseSize = Math.max(1, container.offsetWidth);
      const waypoints = resolveWaypoints(baseSize);
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

      if (waypoints.length === 0) {
        return;
      }

      Object.assign(pose, waypoints[0]?.pose);
      applyPose();

      const durationMarker = { value: 0 };
      const nextTimeline = gsap.timeline({
        paused: true,
        onUpdate: applyPose,
      });
      nextTimeline.to(durationMarker, { value: 1, duration: maxScroll, ease: 'none' }, 0);
      nextTimeline.addLabel(waypoints[0]?.label ?? 'hero', 0);

      for (let index = 1; index < waypoints.length; index += 1) {
        const previous = waypoints[index - 1];
        const current = waypoints[index];

        if (!previous || !current) {
          continue;
        }

        const segmentStart = previous.scroll;
        const segmentEnd = Math.max(segmentStart + 1, current.scroll);
        const segmentDuration = segmentEnd - segmentStart;
        const transitionDuration = Math.min(segmentDuration, window.innerHeight * 0.34);
        const transitionStart = segmentEnd - transitionDuration;

        nextTimeline.addLabel(current.label, segmentEnd);

        if (current.pose.opacity <= 0.005 && previous.pose.opacity <= 0.005) {
          nextTimeline.set(
            pose,
            {
              ...current.pose,
              opacity: 0,
            },
            segmentEnd,
          );
        } else if (current.pose.opacity <= 0.005) {
          const maxExitDelta = clamp(window.innerHeight * 0.1, 64, 96);
          const desiredDelta = current.pose.y - previous.pose.y;
          const exitScale = Math.max(current.pose.scale, previous.pose.scale * 0.94);
          const exitSize = baseSize * exitScale;
          const exitY = clamp(
            previous.pose.y + clamp(desiredDelta, -maxExitDelta, maxExitDelta),
            VIEWPORT_PADDING,
            Math.max(VIEWPORT_PADDING, window.innerHeight - exitSize - VIEWPORT_PADDING),
          );
          const motionDuration = transitionDuration * 0.62;
          const fadeDuration = transitionDuration - motionDuration;

          nextTimeline.to(
            pose,
            {
              y: exitY,
              scale: exitScale,
              rotationX: current.pose.rotationX,
              rotationY: current.pose.rotationY,
              rotationZ: current.pose.rotationZ,
              duration: motionDuration,
              ease: 'none',
            },
            transitionStart,
          );

          nextTimeline.to(
            pose,
            {
              opacity: 0,
              duration: fadeDuration,
              ease: 'power2.inOut',
            },
            transitionStart + motionDuration,
          );

          nextTimeline.set(
            pose,
            {
              ...current.pose,
              opacity: 0,
            },
            segmentEnd,
          );
        } else if (previous.pose.opacity <= 0.005) {
          const entryOffset = clamp(window.innerHeight * 0.08, 56, 88);
          const entrySize = baseSize * current.pose.scale;

          nextTimeline.set(
            pose,
            {
              x: current.pose.x,
              y: clamp(
                current.pose.y - entryOffset,
                VIEWPORT_PADDING,
                Math.max(VIEWPORT_PADDING, window.innerHeight - entrySize - VIEWPORT_PADDING),
              ),
              scale: current.pose.scale,
              opacity: 0,
              rotationX: current.pose.rotationX,
              rotationY: current.pose.rotationY,
              rotationZ: current.pose.rotationZ,
            },
            transitionStart,
          );
          nextTimeline.to(
            pose,
            {
              ...current.pose,
              duration: transitionDuration,
              ease: 'power3.inOut',
            },
            transitionStart,
          );
        } else {
          nextTimeline.to(
            pose,
            {
              ...current.pose,
              duration: segmentDuration,
              ease: 'power2.inOut',
            },
            segmentStart,
          );
        }
      }

      timeline = nextTimeline;
      starScrollTrigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'max',
        scrub: 0.4,
        animation: nextTimeline,
        invalidateOnRefresh: true,
      });
      ScrollTrigger.update();
      scheduleRender();
    };

    const resizeRenderer = () => {
      const size = Math.max(1, Math.round(container.offsetWidth));
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
      renderer.setSize(size, size, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      scheduleRender();
    };

    const scheduleRebuild = () => {
      resizeRenderer();

      if (rebuildFrameId !== null) {
        window.cancelAnimationFrame(rebuildFrameId);
      }

      rebuildFrameId = window.requestAnimationFrame(() => {
        rebuildFrameId = null;
        buildTimeline();
        ScrollTrigger.refresh();
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        scheduleRender();
      }
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      onUnavailable?.();
    };

    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resizeRenderer);
    const layoutObserver =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(scheduleRebuild);
    const layoutElements = document.querySelectorAll(
      'main, [data-star-waypoint], [data-star-protected], [data-star-safe]',
    );

    resizeObserver?.observe(container);
    layoutElements.forEach((element) => layoutObserver?.observe(element));
    window.addEventListener('resize', scheduleRebuild, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    resizeRenderer();
    buildTimeline();
    ScrollTrigger.refresh();
    void document.fonts?.ready.then(() => {
      if (!disposed) {
        scheduleRebuild();
      }
    });

    return () => {
      disposed = true;
      destroyTimeline();

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      if (rebuildFrameId !== null) {
        window.cancelAnimationFrame(rebuildFrameId);
      }

      resizeObserver?.disconnect();
      layoutObserver?.disconnect();
      window.removeEventListener('resize', scheduleRebuild);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);

      scene.remove(starGroup, ambientLight, keyLight, fillLight);
      starGeometry.dispose();
      edgeGeometry.dispose();
      faceMaterial.dispose();
      sideMaterial.dispose();
      edgeMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [onReady, onUnavailable]);

  return <div ref={containerRef} className={styles.scene} aria-hidden="true" data-star-scene />;
}
