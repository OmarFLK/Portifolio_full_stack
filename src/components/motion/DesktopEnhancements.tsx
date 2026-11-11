import { Component, lazy, Suspense, useEffect, type ReactNode, type RefObject } from 'react';
import { useHeavyVisuals } from '../../hooks/useHeavyVisuals';

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

function ActiveDesktopScene({ scopeRef }: { scopeRef: RefObject<HTMLDivElement | null> }) {
  return (
    <>
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

  return enabled ? <ActiveDesktopScene scopeRef={scopeRef} /> : null;
}
