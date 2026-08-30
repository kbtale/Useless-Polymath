export const ROMAN_VALUE_MAP: Readonly<Record<string, number>> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

const ROMAN_SYMBOLS = [
  'M',
  'CM',
  'D',
  'CD',
  'C',
  'XC',
  'L',
  'XL',
  'X',
  'IX',
  'V',
  'IV',
  'I',
] as const;
const ROMAN_VALUES = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1] as const;

export const toRoman = (num: number): string => {
  if (num < 1 || num > 3999) return '';
  let remaining = num;
  let result = '';
  for (let i = 0; i < ROMAN_VALUES.length; i++) {
    while (remaining >= ROMAN_VALUES[i]) {
      remaining -= ROMAN_VALUES[i];
      result += ROMAN_SYMBOLS[i];
    }
  }
  return result;
};

export const fromRoman = (str: string): number => {
  const roman = str.toUpperCase();
  let num = 0;
  for (let i = 0; i < roman.length; i++) {
    const cur = ROMAN_VALUE_MAP[roman[i]];
    const next = ROMAN_VALUE_MAP[roman[i + 1]];

    if (cur === undefined) return Number.NaN;

    if (next && cur < next) {
      num -= cur;
    } else {
      num += cur;
    }
  }
  return num;
};

export const isValidRoman = (str: string): boolean => {
  if (!str) return false;
  const regex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  return regex.test(str.toUpperCase());
};
