export interface SemaphoreAngle {
  readonly left: number;
  readonly right: number;
}

export const SEMAPHORE_MAP: Record<string, SemaphoreAngle> = {
  a: { left: 225, right: 180 },
  b: { left: 270, right: 180 },
  c: { left: 315, right: 180 },
  d: { left: 0, right: 180 },
  e: { left: 180, right: 45 },
  f: { left: 180, right: 90 },
  g: { left: 180, right: 135 },
  h: { left: 225, right: 270 },
  i: { left: 225, right: 315 },
  j: { left: 0, right: 90 },
  k: { left: 225, right: 0 },
  l: { left: 270, right: 45 },
  m: { left: 270, right: 90 },
  n: { left: 270, right: 135 },
  o: { left: 315, right: 270 },
  p: { left: 0, right: 270 },
  q: { left: 315, right: 45 },
  r: { left: 315, right: 90 },
  s: { left: 315, right: 135 },
  t: { left: 0, right: 315 },
  u: { left: 315, right: 0 },
  v: { left: 135, right: 0 },
  w: { left: 90, right: 45 },
  x: { left: 135, right: 45 },
  y: { left: 315, right: 90 },
  z: { left: 135, right: 90 },
  rest: { left: 180, right: 180 },
};

export const getSemaphorePattern = (char: string): SemaphoreAngle => {
  const lower = char.toLowerCase();

  if (/[0-9]/.test(lower)) {
    const numMap: Record<string, string> = {
      '1': 'a',
      '2': 'b',
      '3': 'c',
      '4': 'd',
      '5': 'e',
      '6': 'f',
      '7': 'g',
      '8': 'h',
      '9': 'i',
      '0': 'k',
    };
    return SEMAPHORE_MAP[numMap[lower] || 'rest'];
  }

  return SEMAPHORE_MAP[lower] || SEMAPHORE_MAP.rest;
};
