export const decimalToBinary = (n: number): string => {
  if (n < 0 || n > 255) throw new Error("Value out of byte range (0-255)");
  return n.toString(2).padStart(8, '0');
};

export const binaryToDecimal = (b: string): number => {
  if (!/^[01]{8}$/.test(b)) throw new Error("Invalid binary string (must be 8 bits)");
  return parseInt(b, 2);
};

export const getActivePowers = (n: number): number[] => {
  if (n < 0 || n > 255) return [];
  const powers: number[] = [];
  let current = n;
  
  // Check powers from 128 down to 1
  [128, 64, 32, 16, 8, 4, 2, 1].forEach(power => {
    if (current >= power) {
      powers.push(power);
      current -= power;
    }
  });
  
  return powers;
};
