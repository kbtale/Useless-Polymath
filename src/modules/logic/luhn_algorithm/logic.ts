export const calculateLuhnSum = (number: string): number => {
  const digits = number.replace(/\D/g, '').split('').map(Number);
  let sum = 0;
  let isDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits[i];
    if (isDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    isDouble = !isDouble;
  }
  return sum;
};

export const calculateCheckDigit = (number: string): number => {
  const sum = calculateLuhnSum(`${number}0`);
  return sum % 10 === 0 ? 0 : 10 - (sum % 10);
};

export const isValidLuhn = (number: string): boolean => {
  if (number.length < 2) return false;
  return calculateLuhnSum(number) % 10 === 0;
};

export const generateLuhnNumber = (length: number): string => {
  let num = '';
  for (let i = 0; i < length - 1; i++) {
    num += Math.floor(Math.random() * 10);
  }
  const check = calculateCheckDigit(num);
  return num + check;
};
