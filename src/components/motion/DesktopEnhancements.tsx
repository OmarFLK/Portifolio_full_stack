import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { useHeavyVisuals } from '../../hooks/useHeavyVisuals';
import styles from './DesktopEnhancements.module.css';

const LazyDesktopStarScene = lazy(async () => {
  const module = await import('../../visuals/DesktopStarScene/DesktopStarScene');
  return { default: module.default };
});

const LazyEditorialMotion = lazy(() => import('./EditorialMotion'));

interface SceneErrorBoundaryProps {
  children: ReactNode;
}

interface SceneErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<SceneErrorBoundaryProps, SceneErrorBoundaryState> {
  public state: SceneErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true };
  }

  public render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function StaticStarPoster({ muted = false }: { muted?: boolean }) {
  const className = muted ? `${styles.poster} ${styles.posterMuted}` : styles.poster;

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 220 220" role="presentation">
        <path
          d="m110 8 23.8 73.2h77L148.5 126l23.8 73.2L110 154l-62.3 45.2L71.5 126 9.2 81.2h77Z"
          fill="currentColor"
          stroke="#111"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <path d="M19 28h26M32 15v26M175 190h28" fill="none" stroke="#111" strokeWidth="3" />
      </svg>
    </div>
  );
}

function ActiveDesktopScene({ scopeRef }: { scopeRef: RefObject<HTMLDivElement | null> }) {
  const [sceneReady, setSceneReady] = useState(false);
  const handleReady = useCallback(() => setSceneReady(true), []);

  return (
    <>
      <StaticStarPoster muted={sceneReady} />
      <SceneErrorBoundary>
        <Suspense fallback={null}>
          <LazyDesktopStarScene onReady={handleReady} />
        </Suspense>
      </SceneErrorBoundary>
      <SceneErrorBoundary>
        <Suspense fallback={null}>
          <LazyEditorialMotion scopeRef={scopeRef} />
        </Suspense>
      </SceneErrorBoundary>
    </>
  );
}

function useDesktopSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    let cancelled = false;
    let dispose: (() => void) | undefined;

    const setup = async () => {
      try {
        const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);

        if (cancelled) {
          return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
          anchors: true,
          autoRaf: false,
          lerp: 0.11,
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 0.9,
        });
        const updateScrollTrigger = () => ScrollTrigger.update();
        const updateLenis = (time: number) => lenis.raf(time * 1000);

        lenis.on('scroll', updateScrollTrigger);
        gsap.ticker.add(updateLenis);
        ScrollTrigger.refresh();

        dispose = () => {
          gsap.ticker.remove(updateLenis);
          lenis.off('scroll', updateScrollTrigger);
          lenis.destroy();
          ScrollTrigger.refresh();
        };

        if (cancelled) {
          dispose();
        }
      } catch {
        // Native scrolling remains the complete, intentional fallback.
      }
    };

    void setup();

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [enabled]);
}

export function DesktopEnhancements({ scopeRef }: { scopeRef: RefObject<HTMLDivElement | null> }) {
  const enabled = useHeavyVisuals();
  useDesktopSmoothScroll(enabled);

  return enabled ? <ActiveDesktopScene scopeRef={scopeRef} /> : <StaticStarPoster />;
}
