export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function mapDocumentScroll(
  scrollY: number,
  documentHeight: number,
  viewportHeight: number,
): number {
  const available = Math.max(1, documentHeight - viewportHeight);
  return clamp(scrollY / available);
}

export function interpolateKeyframes(progress: number, values: number[]): number {
  if (values.length === 0) return 0;
  if (values.length === 1) return values[0] ?? 0;

  const normalized = clamp(progress) * (values.length - 1);
  const index = Math.min(values.length - 2, Math.floor(normalized));
  const localProgress = normalized - index;
  const start = values[index] ?? 0;
  const end = values[index + 1] ?? start;

  return start + (end - start) * localProgress;
}
