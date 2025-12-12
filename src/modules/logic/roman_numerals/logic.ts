
export const toRoman = (num: number): string => {
  if (num < 1 || num > 3999) return '';
  const val = [
    1000, 900, 500, 400,
    100, 90, 50, 40,
    10, 9, 5, 4,
    1
  ];
  const syms = [
    'M', 'CM', 'D', 'CD',
    'C', 'XC', 'L', 'XL',
    'X', 'IX', 'V', 'IV',
    'I'
  ];
  let result = '';
  for (let i = 0; i < val.length; i++) {
    while (num >= val[i]) {
      num -= val[i];
      result += syms[i];
    }
  }
  return result;
};

export const fromRoman = (str: string): number => {
  const roman = str.toUpperCase();
  const val: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50,
    C: 100, D: 500, M: 1000
  };

  let num = 0;
  for (let i = 0; i < roman.length; i++) {
    const cur = val[roman[i]];
    const next = val[roman[i + 1]];

    if (cur === undefined) return NaN; // Invalid char

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
  // Basic structural regex check (not perfect but strict enough for most inputs)
  // M{0,3} = 0-3000
  // (CM|CD|D?C{0,3}) = 900, 400, 0-800
  // (XC|XL|L?X{0,3}) = 90, 40, 0-80
  // (IX|IV|V?I{0,3}) = 9, 4, 0-8
  const regex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  return regex.test(str.toUpperCase());
};
