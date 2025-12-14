
export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => {
    const hex = c.toString(16).toUpperCase();
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Calculates Euclidean distance between two colors suitable for scoring.
 * Max distance (between black and white) is sqrt(255^2 * 3) ~= 441.67
 */
export const calculateColorDistance = (c1: [number, number, number], c2: [number, number, number]): number => {
  return Math.sqrt(
    Math.pow(c2[0] - c1[0], 2) + 
    Math.pow(c2[1] - c1[1], 2) + 
    Math.pow(c2[2] - c1[2], 2)
  );
};
