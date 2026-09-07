export type StorageUnitSymbol = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';

export interface StorageUnitDefinition {
  symbol: StorageUnitSymbol;
  label: string;
  bytes: number;
}

export const STORAGE_UNITS: readonly StorageUnitDefinition[] = [
  { symbol: 'B', label: 'B', bytes: 1 },
  { symbol: 'KB', label: 'KB', bytes: 1024 },
  { symbol: 'MB', label: 'MB', bytes: 1024 ** 2 },
  { symbol: 'GB', label: 'GB', bytes: 1024 ** 3 },
  { symbol: 'TB', label: 'TB', bytes: 1024 ** 4 },
  { symbol: 'PB', label: 'PB', bytes: 1024 ** 5 },
] as const;

export const UNITS = STORAGE_UNITS;

export interface ConversionResult {
  unit: StorageUnitSymbol;
  value: number;
  formatted: string;
}

export const formatValue = (value: number): string => {
  if (value === 0) return '0';
  if (value >= 1_000_000) return value.toExponential(4);
  if (value < 0.0001) return value.toExponential(4);
  if (Number.isInteger(value)) return value.toLocaleString();
  return value.toLocaleString(undefined, { maximumFractionDigits: 4 });
};

export const convertStorageBySymbol = (
  amount: number,
  fromUnitSymbol: StorageUnitSymbol,
): ConversionResult[] => {
  if (Number.isNaN(amount) || amount < 0) return [];

  const fromUnit = STORAGE_UNITS.find((unit) => unit.symbol === fromUnitSymbol) ?? STORAGE_UNITS[0];
  const totalBytes = amount * fromUnit.bytes;

  return STORAGE_UNITS.map((unit) => {
    const value = totalBytes / unit.bytes;
    return {
      unit: unit.symbol,
      value,
      formatted: formatValue(value),
    };
  });
};

export const convertStorage = (amount: number, fromUnitIdx: number): ConversionResult[] => {
  if (
    Number.isNaN(amount) ||
    amount < 0 ||
    fromUnitIdx < 0 ||
    fromUnitIdx >= STORAGE_UNITS.length
  ) {
    return [];
  }
  return convertStorageBySymbol(amount, STORAGE_UNITS[fromUnitIdx].symbol);
};

export interface PracticeProblem {
  fromIdx: number;
  toIdx: number;
  fromSymbol: StorageUnitSymbol;
  toSymbol: StorageUnitSymbol;
  amount: number;
}

export const generatePracticeProblem = (): PracticeProblem => {
  const fromIdx = Math.floor(Math.random() * STORAGE_UNITS.length);
  let toIdx = Math.floor(Math.random() * STORAGE_UNITS.length);
  while (toIdx === fromIdx) {
    toIdx = Math.floor(Math.random() * STORAGE_UNITS.length);
  }
  const amount = 2 ** Math.floor(Math.random() * 10);

  return {
    fromIdx,
    toIdx,
    fromSymbol: STORAGE_UNITS[fromIdx].symbol,
    toSymbol: STORAGE_UNITS[toIdx].symbol,
    amount,
  };
};

export const calculateAnswer = (amount: number, fromIdx: number, toIdx: number): number => {
  const fromUnit = STORAGE_UNITS[fromIdx] ?? STORAGE_UNITS[0];
  const toUnit = STORAGE_UNITS[toIdx] ?? STORAGE_UNITS[0];
  const totalBytes = amount * fromUnit.bytes;
  return totalBytes / toUnit.bytes;
};
