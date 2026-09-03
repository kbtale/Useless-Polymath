import { describe, it, expect } from 'vitest';
import {
  calculateLuhnSum,
  calculateCheckDigit,
  isValidLuhn,
  generateLuhnNumber,
} from './logic';

describe('Luhn Algorithm Logic', () => {
  it('should calculate the Luhn weighted sum', () => {
    expect(calculateLuhnSum('79927398713')).toBe(70);
  });

  it('should calculate the check digit', () => {
    expect(calculateCheckDigit('7992739871')).toBe(3);
  });

  it('should validate Luhn numbers', () => {
    expect(isValidLuhn('79927398713')).toBe(true);
    expect(isValidLuhn('79927398710')).toBe(false);
  });

  it('should reject single-digit inputs', () => {
    expect(isValidLuhn('7')).toBe(false);
  });

  it('should generate valid Luhn numbers of the requested length', () => {
    const generated = generateLuhnNumber(16);
    expect(generated).toMatch(/^\d{16}$/);
    expect(isValidLuhn(generated)).toBe(true);
  });
});