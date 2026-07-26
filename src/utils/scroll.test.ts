import { describe, expect, it } from 'vitest';
import { clamp, interpolateKeyframes, mapDocumentScroll } from './scroll';

describe('clamp', () => {
  it('keeps values inside the default range', () => {
    expect(clamp(-0.25)).toBe(0);
    expect(clamp(0.4)).toBe(0.4);
    expect(clamp(1.25)).toBe(1);
  });

  it('supports a custom range', () => {
    expect(clamp(8, 10, 20)).toBe(10);
    expect(clamp(14, 10, 20)).toBe(14);
    expect(clamp(24, 10, 20)).toBe(20);
  });
});

describe('mapDocumentScroll', () => {
  it('maps document scroll to normalized progress', () => {
    expect(mapDocumentScroll(0, 3000, 1000)).toBe(0);
    expect(mapDocumentScroll(1000, 3000, 1000)).toBe(0.5);
    expect(mapDocumentScroll(2000, 3000, 1000)).toBe(1);
  });

  it('clamps overscroll and handles documents without scrollable space', () => {
    expect(mapDocumentScroll(-100, 3000, 1000)).toBe(0);
    expect(mapDocumentScroll(2500, 3000, 1000)).toBe(1);
    expect(mapDocumentScroll(0, 800, 1000)).toBe(0);
    expect(mapDocumentScroll(1, 800, 1000)).toBe(1);
  });
});

describe('interpolateKeyframes', () => {
  it('returns a safe value for empty and single-value keyframes', () => {
    expect(interpolateKeyframes(0.5, [])).toBe(0);
    expect(interpolateKeyframes(0.5, [42])).toBe(42);
  });

  it('interpolates each segment and clamps progress', () => {
    const values = [0, 10, -10];

    expect(interpolateKeyframes(-1, values)).toBe(0);
    expect(interpolateKeyframes(0.25, values)).toBeCloseTo(5);
    expect(interpolateKeyframes(0.5, values)).toBe(10);
    expect(interpolateKeyframes(0.75, values)).toBeCloseTo(0);
    expect(interpolateKeyframes(2, values)).toBe(-10);
  });
});
