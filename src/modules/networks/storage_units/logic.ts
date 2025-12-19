
export const UNITS = [
  { label: 'B', bytes: 1 },
  { label: 'KB', bytes: 1024 },
  { label: 'MB', bytes: 1024 ** 2 },
  { label: 'GB', bytes: 1024 ** 3 },
  { label: 'TB', bytes: 1024 ** 4 },
  { label: 'PB', bytes: 1024 ** 5 },
];

export interface ConversionResult {
  unit: string;
  value: number;
  formatted: string;
}

export const convertStorage = (amount: number, fromUnitIdx: number): ConversionResult[] => {
  if (isNaN(amount) || amount < 0) return [];
  
  const fromUnit = UNITS[fromUnitIdx];
  const totalBytes = amount * fromUnit.bytes;
  
  return UNITS.map((unit) => {
    const value = totalBytes / unit.bytes;
    return {
      unit: unit.label,
      value,
      formatted: formatValue(value),
    };
  });
};

export const formatValue = (value: number): string => {
  if (value === 0) return '0';
  if (value >= 1_000_000) return value.toExponential(4);
  if (value < 0.0001) return value.toExponential(4);
  if (Number.isInteger(value)) return value.toLocaleString();
  return value.toLocaleString(undefined, { maximumFractionDigits: 4 });
};

// For practice mode: convert between two random units
export const generatePracticeProblem = () => {
  const fromIdx = Math.floor(Math.random() * UNITS.length);
  let toIdx = Math.floor(Math.random() * UNITS.length);
  while (toIdx === fromIdx) {
    toIdx = Math.floor(Math.random() * UNITS.length);
  }
  const amount = Math.pow(2, Math.floor(Math.random() * 10)); // Powers of 2 for clean answers
  
  return { fromIdx, toIdx, amount };
};

export const calculateAnswer = (amount: number, fromIdx: number, toIdx: number): number => {
  const fromUnit = UNITS[fromIdx];
  const toUnit = UNITS[toIdx];
  const bytes = amount * fromUnit.bytes;
  return bytes / toUnit.bytes;
};
