import { describe, expect, it } from 'vitest';
import { shouldEnableHeavyVisuals } from './heavyVisuals';

const eligibleEnvironment = {
  width: 1280,
  finePointer: true,
  hover: true,
  reducedMotion: false,
  saveData: false,
  webglSupported: true,
};

describe('shouldEnableHeavyVisuals', () => {
  it('enables desktop enhancements at the eligibility boundary', () => {
    expect(shouldEnableHeavyVisuals(eligibleEnvironment)).toBe(true);
    expect(
      shouldEnableHeavyVisuals({
        ...eligibleEnvironment,
        deviceMemory: 4,
      }),
    ).toBe(true);
  });

  it.each([
    ['a narrow viewport', { width: 1279 }],
    ['a coarse pointer', { finePointer: false }],
    ['a device without hover', { hover: false }],
    ['reduced-motion preference', { reducedMotion: true }],
    ['data-saving preference', { saveData: true }],
    ['missing WebGL support', { webglSupported: false }],
    ['less than 4 GB of reported memory', { deviceMemory: 3 }],
  ])('disables desktop enhancements for %s', (_reason, override) => {
    expect(
      shouldEnableHeavyVisuals({
        ...eligibleEnvironment,
        ...override,
      }),
    ).toBe(false);
  });
});
