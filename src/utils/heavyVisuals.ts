interface NavigatorConnection {
  saveData?: boolean;
}

interface HeavyVisualEnvironment {
  width: number;
  finePointer: boolean;
  hover: boolean;
  reducedMotion: boolean;
  saveData: boolean;
  webglSupported: boolean;
  deviceMemory?: number;
}

let cachedWebGLSupport: boolean | undefined;

function supportsWebGL(): boolean {
  if (cachedWebGLSupport !== undefined) {
    return cachedWebGLSupport;
  }

  if (
    typeof window === 'undefined' ||
    (typeof window.WebGLRenderingContext === 'undefined' &&
      typeof window.WebGL2RenderingContext === 'undefined')
  ) {
    cachedWebGLSupport = false;
    return cachedWebGLSupport;
  }

  try {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ??
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true });

    cachedWebGLSupport = context !== null;
    context?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    cachedWebGLSupport = false;
  }

  return cachedWebGLSupport;
}

export function shouldEnableHeavyVisuals(environment: HeavyVisualEnvironment): boolean {
  return (
    environment.width >= 1280 &&
    environment.finePointer &&
    environment.hover &&
    !environment.reducedMotion &&
    !environment.saveData &&
    environment.webglSupported &&
    (environment.deviceMemory === undefined || environment.deviceMemory >= 4)
  );
}

export function readHeavyVisualEnvironment(): HeavyVisualEnvironment {
  const navigatorWithHints = navigator as Navigator & {
    connection?: NavigatorConnection;
    deviceMemory?: number;
  };
  const width = window.innerWidth;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const hover = window.matchMedia('(hover: hover)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean(navigatorWithHints.connection?.saveData);
  const deviceMemory = navigatorWithHints.deviceMemory;
  const canAttemptWebGL =
    width >= 1280 &&
    finePointer &&
    hover &&
    !reducedMotion &&
    !saveData &&
    (deviceMemory === undefined || deviceMemory >= 4);

  return {
    width,
    finePointer,
    hover,
    reducedMotion,
    saveData,
    webglSupported: canAttemptWebGL && supportsWebGL(),
    deviceMemory,
  };
}
