import { useEffect, useState } from 'react';
import { readHeavyVisualEnvironment, shouldEnableHeavyVisuals } from '../utils/heavyVisuals';

export function useHeavyVisuals(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(shouldEnableHeavyVisuals(readHeavyVisualEnvironment()));
    const mediaQueries = [
      window.matchMedia('(pointer: fine)'),
      window.matchMedia('(hover: hover)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
    ];

    update();
    window.addEventListener('resize', update, { passive: true });
    mediaQueries.forEach((media) => media.addEventListener('change', update));

    return () => {
      window.removeEventListener('resize', update);
      mediaQueries.forEach((media) => media.removeEventListener('change', update));
    };
  }, []);

  return enabled;
}
