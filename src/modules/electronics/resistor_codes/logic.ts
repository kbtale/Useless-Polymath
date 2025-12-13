
export const BAND_COLORS = [
  { name: 'black', value: 0, multipliers: { 4: 1, 5: 1 }, tolerance: null, hex: '#000000', text: '#FFFFFF' },
  { name: 'brown', value: 1, multipliers: { 4: 10, 5: 10 }, tolerance: 1, hex: '#8B4513', text: '#FFFFFF' },
  { name: 'red', value: 2, multipliers: { 4: 100, 5: 100 }, tolerance: 2, hex: '#FF0000', text: '#FFFFFF' },
  { name: 'orange', value: 3, multipliers: { 4: 1000, 5: 1000 }, tolerance: null, hex: '#FFA500', text: '#000000' },
  { name: 'yellow', value: 4, multipliers: { 4: 10000, 5: 10000 }, tolerance: null, hex: '#FFFF00', text: '#000000' },
  { name: 'green', value: 5, multipliers: { 4: 100000, 5: 100000 }, tolerance: 0.5, hex: '#008000', text: '#FFFFFF' },
  { name: 'blue', value: 6, multipliers: { 4: 1000000, 5: 1000000 }, tolerance: 0.25, hex: '#0000FF', text: '#FFFFFF' },
  { name: 'violet', value: 7, multipliers: { 4: 10000000, 5: 10000000 }, tolerance: 0.1, hex: '#EE82EE', text: '#000000' },
  { name: 'grey', value: 8, multipliers: { 4: 100000000, 5: 100000000 }, tolerance: 0.05, hex: '#808080', text: '#FFFFFF' },
  { name: 'white', value: 9, multipliers: { 4: 1000000000, 5: 1000000000 }, tolerance: null, hex: '#FFFFFF', text: '#000000' },
  { name: 'gold', value: null, multipliers: { 4: 0.1, 5: 0.1 }, tolerance: 5, hex: '#FFD700', text: '#000000' },
  { name: 'silver', value: null, multipliers: { 4: 0.01, 5: 0.01 }, tolerance: 10, hex: '#C0C0C0', text: '#000000' },
];

export interface ResistorState {
  bands: string[]; // Array of color names
  mode: 4 | 5;
}

export const calculateResistance = (bands: string[], mode: 4 | 5) => {
  const getBand = (color: string) => BAND_COLORS.find(b => b.name === color);
  
  let value = 0;
  let multiplier = 1;
  let tolerance = 20; // Default if no tolerance band

  if (mode === 4) {
    const b1 = getBand(bands[0])?.value ?? 0;
    const b2 = getBand(bands[1])?.value ?? 0;
    const b3 = getBand(bands[2])?.multipliers[4] ?? 1;
    const b4 = getBand(bands[3])?.tolerance ?? 20;
    
    value = (b1 * 10 + b2) * b3;
    multiplier = b3;
    tolerance = b4;
    
  } else {
    const b1 = getBand(bands[0])?.value ?? 0;
    const b2 = getBand(bands[1])?.value ?? 0;
    const b3 = getBand(bands[2])?.value ?? 0;
    const b4 = getBand(bands[3])?.multipliers[5] ?? 1;
    const b5 = getBand(bands[4])?.tolerance ?? 20;

    value = (b1 * 100 + b2 * 10 + b3) * b4;
    multiplier = b4;
    tolerance = b5;
  }

  return { value, tolerance, multiplier };
};

export const formatOhms = (ohms: number): string => {
  if (ohms >= 1000000000) return `${(ohms / 1000000000).toFixed(1).replace(/\.0$/, '')}GΩ`;
  if (ohms >= 1000000) return `${(ohms / 1000000).toFixed(1).replace(/\.0$/, '')}MΩ`;
  if (ohms >= 1000) return `${(ohms / 1000).toFixed(1).replace(/\.0$/, '')}kΩ`;
  return `${ohms}Ω`;
};

export const getRandomResistor = (mode: 4 | 5) => {
  const validDigits = BAND_COLORS.filter(c => c.value !== null).map(c => c.name);
  const validMultipliers = BAND_COLORS.filter(c => c.multipliers[mode] !== undefined).map(c => c.name);
  // Simplified tolerance pool for practice
  const validTolerances = ['gold', 'silver', 'brown', 'red']; 

  const b1 = validDigits[Math.floor(Math.random() * (validDigits.length - 1)) + 1]; // First digit can't be black (0) usually
  const b2 = validDigits[Math.floor(Math.random() * validDigits.length)];
  const b3 = mode === 5 ? validDigits[Math.floor(Math.random() * validDigits.length)] : null;
  const mult = validMultipliers[Math.floor(Math.random() * validMultipliers.length)];
  const tol = validTolerances[Math.floor(Math.random() * validTolerances.length)];

  if (mode === 4) return [b1, b2, mult, tol];
  return [b1, b2, b3!, mult, tol];
};
