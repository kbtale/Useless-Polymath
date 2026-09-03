import { describe, it, expect } from 'vitest';
import { rgbToHex, calculateColorDistance } from './logic';

describe('Color Theory Logic', () => {
  it('should convert RGB values to hex', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#FF0000');
    expect(rgbToHex(0, 0, 0)).toBe('#000000');
    expect(rgbToHex(255, 255, 255)).toBe('#FFFFFF');
  });

  it('should zero-pad single-digit hex channels', () => {
    expect(rgbToHex(1, 2, 3)).toBe('#010203');
  });

  it('should return zero distance for identical colors', () => {
    expect(calculateColorDistance([255, 0, 0], [255, 0, 0])).toBe(0);
  });

  it('should calculate the maximum distance between black and white', () => {
    expect(calculateColorDistance([0, 0, 0], [255, 255, 255])).toBeCloseTo(441.67, 2);
  });
});