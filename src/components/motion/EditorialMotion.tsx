import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface EditorialMotionProps {
  scopeRef: RefObject<HTMLDivElement | null>;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function EditorialMotion({ scopeRef }: EditorialMotionProps) {
  useGSAP(
    () => {
      const heroTimeline = gsap.timeline({
        defaults: { duration: 0.72, ease: 'power3.out' },
      });

      heroTimeline.from('[data-hero]', {
        y: 28,
        stagger: 0.08,
        clearProps: 'transform',
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 34,
          duration: 0.68,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<SVGPathElement>('[data-draw] path').forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: path,
            start: 'top 90%',
            once: true,
          },
        });
      });

      const resultMetrics = gsap.utils.toArray<HTMLElement>('[data-result-metric]');

      if (resultMetrics.length > 0) {
        gsap.from(resultMetrics, {
          y: 26,
          duration: 0.72,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#resultados',
            start: 'top 76%',
            once: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>('[data-result-counter]').forEach((counter) => {
        const target = Number(counter.dataset.resultCounter);
        const value = { current: 0 };

        if (!Number.isFinite(target)) {
          return;
        }

        gsap.to(value, {
          current: target,
          duration: 0.9,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = String(Math.round(value.current));
          },
          scrollTrigger: {
            trigger: counter,
            start: 'top 84%',
            once: true,
          },
        });
      });

      gsap.from('[data-result-line]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.78,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '#resultados',
          start: 'top 72%',
          once: true,
        },
      });

    },
    { scope: scopeRef },
  );

  return null;
}
