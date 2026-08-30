import { describe, expect, it } from 'vitest';
import { fromRoman, isValidRoman, toRoman } from './logic';

describe('Roman Numerals Logic', () => {
  it('converts decimal numbers to roman numerals', () => {
    expect(toRoman(1)).toBe('I');
    expect(toRoman(4)).toBe('IV');
    expect(toRoman(9)).toBe('IX');
    expect(toRoman(42)).toBe('XLII');
    expect(toRoman(1994)).toBe('MCMXCIV');
    expect(toRoman(3999)).toBe('MMMCMXCIX');
  });

  it('returns empty string for out of bounds numbers', () => {
    expect(toRoman(0)).toBe('');
    expect(toRoman(4000)).toBe('');
  });

  it('converts roman numerals to decimal numbers', () => {
    expect(fromRoman('I')).toBe(1);
    expect(fromRoman('IV')).toBe(4);
    expect(fromRoman('IX')).toBe(9);
    expect(fromRoman('mcmxciv')).toBe(1994);
  });

  it('returns NaN for invalid roman numeral characters', () => {
    expect(Number.isNaN(fromRoman('ABC'))).toBe(true);
  });

  it('validates roman numeral syntax', () => {
    expect(isValidRoman('XIV')).toBe(true);
    expect(isValidRoman('MMXXIV')).toBe(true);
    expect(isValidRoman('IIII')).toBe(false);
    expect(isValidRoman('')).toBe(false);
  });
});
