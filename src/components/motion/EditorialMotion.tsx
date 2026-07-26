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

      gsap.to('[data-liquid="hero"]', {
        yPercent: 12,
        rotate: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-liquid="hero"]',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    },
    { scope: scopeRef },
  );

  return null;
}
