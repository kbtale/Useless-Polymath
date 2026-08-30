export const calculateEanChecksum = (input: string): number => {
  const digits = input.slice(0, 12).split('').map(Number);

  let sumOdd = 0;
  let sumEven = 0;

  digits.forEach((d, i) => {
    if (i % 2 === 0) {
      sumOdd += d;
    } else {
      sumEven += d;
    }
  });

  const total = sumOdd + sumEven * 3;
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
  for (let i = 0; i < 12; i++) {
    prefix += Math.floor(Math.random() * 10);
  }
  const check = calculateEanChecksum(prefix);
  return prefix + check;
};
