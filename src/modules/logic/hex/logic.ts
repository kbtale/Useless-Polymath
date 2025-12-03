export const decimalToHex = (n: number): string => {
  if (n < 0) throw new Error("Negative numbers not supported");
  return n.toString(16).toUpperCase();
};

export const hexToDecimal = (h: string): number => {
  if (!/^[0-9A-Fa-f]+$/.test(h)) throw new Error("Invalid hex string");
  return parseInt(h, 16);
};

export const hexToBinary = (h: string): string => {
  const decimal = hexToDecimal(h);
  return decimal.toString(2).padStart(h.length * 4, '0');
};
