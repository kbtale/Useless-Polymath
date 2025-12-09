import { describe, it, expect } from 'vitest';
import { decimalToBinary, binaryToDecimal, getActivePowers } from './logic';

describe('Binary Logic', () => {
  it('should convert decimal to binary correctly', () => {
    expect(decimalToBinary(0)).toBe('00000000');
    expect(decimalToBinary(255)).toBe('11111111');
    expect(decimalToBinary(5)).toBe('00000101');
    expect(decimalToBinary(10)).toBe('00001010');
  });

  it('should convert binary to decimal correctly', () => {
    expect(binaryToDecimal('00000000')).toBe(0);
    expect(binaryToDecimal('11111111')).toBe(255);
    expect(binaryToDecimal('00000101')).toBe(5);
  });

  it('should return active powers correctly', () => {
    // 4 + 1 = 5
    expect(getActivePowers(5)).toEqual([4, 1]);
    // 8 + 2 = 10
    expect(getActivePowers(10)).toEqual([8, 2]);
    expect(getActivePowers(255)).toEqual([128, 64, 32, 16, 8, 4, 2, 1]);
    expect(getActivePowers(0)).toEqual([]);
  });

  it('should handle edge cases', () => {
    expect(() => decimalToBinary(256)).toThrow();
    expect(() => decimalToBinary(-1)).toThrow();
    // Not 8 bits
    expect(() => binaryToDecimal('101')).toThrow();
  });
});
