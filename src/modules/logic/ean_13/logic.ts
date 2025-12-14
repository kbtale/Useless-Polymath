
export const calculateEanChecksum = (input: string): number => {
  // We only care about the first 12 digits for calculation
  const digits = input.slice(0, 12).split('').map(Number);
  
  let sumOdd = 0;  // Positions 1, 3, 5... (Indices 0, 2, 4...)
  let sumEven = 0; // Positions 2, 4, 6... (Indices 1, 3, 5...)

  digits.forEach((d, i) => {
    if (i % 2 === 0) {
      sumOdd += d;
    } else {
      sumEven += d;
    }
  });

  const total = sumOdd + (sumEven * 3);
  const remainder = total % 10;
  return remainder === 0 ? 0 : 10 - remainder;
};

export const isValidEan13 = (input: string): boolean => {
  const clean = input.replace(/\D/g, '');
  if (clean.length !== 13) return false;
  
  const checkDigit = Number(clean[12]);
  const calculated = calculateEanChecksum(clean);
  return checkDigit === calculated;
};

export const generateEan13 = (): string => {
  let prefix = '';
  // Generate 12 random digits
  for (let i = 0; i < 12; i++) {
    prefix += Math.floor(Math.random() * 10);
  }
  const check = calculateEanChecksum(prefix);
  return prefix + check;
};
