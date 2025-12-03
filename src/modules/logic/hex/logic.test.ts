import { describe, it, expect } from 'vitest';
import { decimalToHex, hexToDecimal, hexToBinary } from './logic';

describe('Hexadecimal Logic', () => {
  it('should convert decimal to hex correctly', () => {
    expect(decimalToHex(0)).toBe('0');
    expect(decimalToHex(10)).toBe('A');
    expect(decimalToHex(15)).toBe('F');
    expect(decimalToHex(16)).toBe('10');
    expect(decimalToHex(255)).toBe('FF');
  });

  it('should convert hex to decimal correctly', () => {
    expect(hexToDecimal('0')).toBe(0);
    expect(hexToDecimal('A')).toBe(10);
    expect(hexToDecimal('F')).toBe(15);
    expect(hexToDecimal('10')).toBe(16);
    expect(hexToDecimal('FF')).toBe(255);
  });

  it('should convert hex to binary correctly', () => {
    expect(hexToBinary('F')).toBe('1111');
    expect(hexToBinary('A')).toBe('1010');
    expect(hexToBinary('0')).toBe('0000');
  });

  it('should handle invalid inputs', () => {
    expect(() => hexToDecimal('G')).toThrow();
    expect(() => decimalToHex(-1)).toThrow();
  });
});
