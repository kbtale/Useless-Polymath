
export const charToCode = (char: string): number => {
  if (!char) return 0;
  return char.charCodeAt(0);
};

export const codeToChar = (code: number): string => {
  if (isNaN(code) || code < 0 || code > 65535) return '';
  return String.fromCharCode(code);
};

// Generate printable range (32-126) for grid
export const getPrintableAscii = () => {
  const arr = [];
  for (let i = 32; i <= 126; i++) {
    arr.push({ code: i, char: String.fromCharCode(i) });
  }
  return arr;
};
