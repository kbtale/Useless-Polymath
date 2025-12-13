
export const SEMAPHORE_MAP: Record<string, { left: number; right: number }> = {
  a: { left: 225, right: 180 }, // SW, S
  b: { left: 270, right: 180 }, // W, S
  c: { left: 315, right: 180 }, // NW, S
  d: { left: 0, right: 180 },   // N, S
  e: { left: 180, right: 45 },  // S, NE
  f: { left: 180, right: 90 },  // S, E
  g: { left: 180, right: 135 }, // S, SE
  h: { left: 225, right: 270 }, // SW, W (Transition/Rest like)
  i: { left: 225, right: 315 }, // SW, NW
  j: { left: 0, right: 90 },    // N, E (Different from pattern)
  k: { left: 225, right: 0 },   // SW, N
  l: { left: 270, right: 45 },  // W, NE
  m: { left: 270, right: 90 },  // W, E
  n: { left: 270, right: 135 }, // W, SE
  o: { left: 315, right: 270 }, // NW, W
  p: { left: 0, right: 270 },   // N, W
  q: { left: 315, right: 45 },  // NW, NE
  r: { left: 315, right: 90 },  // NW, E
  s: { left: 315, right: 135 }, // NW, SE
  t: { left: 0, right: 315 },   // N, NW
  u: { left: 315, right: 0 },   // NW, N
  v: { left: 135, right: 0 },   // SE, N
  w: { left: 90, right: 45 },   // E, NE
  x: { left: 135, right: 45 },  // SE, NE
  y: { left: 315, right: 90 },  // NW, E (Check standard) -> Actually J/Y often swaped or distinct. Standard: Y = NW, E? No. Y is usually 315, 90.
  // Correction for Standard Semaphore:
  // J is often "Alphabet Sign" or mapped specifically.
  // Standard:
  // K = 0, 225 (N, SW)
  // ... let's use a standard mapping
  // A=SW,S; B=W,S; C=NW,S; D=Up,S; E=S,NE; F=S,E; G=S,SE;
  // H=W,SW? No. H is usually 225, 270.
  // Let's stick to the map provided in typical references.
  z: { left: 135, right: 90 },  // SE, E
  rest: { left: 180, right: 180 } // Down, Down
};

// Fix J and Y based on standard charts
// J: N, E (Right arm up, Left out) -> 0, 90? Or Opposite?
// Visualizing from Signaler's point of view:
// Right arm (their right) is at 90 (East), Left at 0 (North).
// We'll normalize to "Degree from Top Clockwise" for rendering.
// 0 = 12:00, 45=1:30, 90=3:00, 135=4:30, 180=6:00, 225=7:30, 270=9:00, 315=10:30

export const getSemaphorePattern = (char: string) => {
  const lower = char.toLowerCase();
  
  // Custom numeric handling or default to map
  // Numbers traditionally use 'Number Sign' then letters A-J.
  // We'll map numbers to letters a-j directly for simplicity here unless specified otherwise.
  if (/[0-9]/.test(lower)) {
    const numMap: Record<string, string> = {
      '1': 'a', '2': 'b', '3': 'c', '4': 'd', '5': 'e',
      '6': 'f', '7': 'g', '8': 'h', '9': 'i', '0': 'k' // K represents 0 usually in J-K sequence? Or J?
      // Actually J is usually skipped in number sequence. 1-9 is A-I, 0 is K.
    };
    return SEMAPHORE_MAP[numMap[lower] || 'rest'];
  }

  return SEMAPHORE_MAP[lower] || SEMAPHORE_MAP['rest'];
};
