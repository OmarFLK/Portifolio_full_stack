interface NavigatorConnection {
  saveData?: boolean;
}

interface HeavyVisualEnvironment {
  width: number;
  finePointer: boolean;
  hover: boolean;
  reducedMotion: boolean;
  saveData: boolean;
  deviceMemory?: number;
}

export function shouldEnableHeavyVisuals(environment: HeavyVisualEnvironment): boolean {
  return (
    environment.width >= 1280 &&
    environment.finePointer &&
    environment.hover &&
    !environment.reducedMotion &&
    !environment.saveData &&
    (environment.deviceMemory === undefined || environment.deviceMemory >= 4)
  );
}

export function readHeavyVisualEnvironment(): HeavyVisualEnvironment {
  const navigatorWithHints = navigator as Navigator & {
    connection?: NavigatorConnection;
    deviceMemory?: number;
  };

  return {
    width: window.innerWidth,
    finePointer: window.matchMedia('(pointer: fine)').matches,
    hover: window.matchMedia('(hover: hover)').matches,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    saveData: Boolean(navigatorWithHints.connection?.saveData),
    deviceMemory: navigatorWithHints.deviceMemory,
  };
}
