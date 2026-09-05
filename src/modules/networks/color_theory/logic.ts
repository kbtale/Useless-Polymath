export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => {
    const hex = c.toString(16).toUpperCase();
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const calculateColorDistance = (
  c1: [number, number, number],
  c2: [number, number, number],
): number => {
  return Math.sqrt(
    (c2[0] - c1[0]) ** 2 + (c2[1] - c1[1]) ** 2 + (c2[2] - c1[2]) ** 2,
  );
};
