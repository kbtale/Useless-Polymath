export type RGBTuple = [r: number, g: number, b: number];

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export const MAX_RGB_COLOR_DISTANCE = Math.sqrt(3 * (255 ** 2));

export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (channel: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(channel)));
    const hex = clamped.toString(16).toUpperCase();
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const calculateColorDistance = (
  colorA: RGBTuple,
  colorB: RGBTuple,
): number => {
  return Math.sqrt(
    (colorB[0] - colorA[0]) ** 2 +
      (colorB[1] - colorA[1]) ** 2 +
      (colorB[2] - colorA[2]) ** 2,
  );
};

export const calculateColorScore = (distance: number): number => {
  if (distance <= 0) return 100;
  const scoreFraction = 1 - distance / MAX_RGB_COLOR_DISTANCE;
  return Math.max(0, Math.min(100, Math.round(scoreFraction * 100)));
};
