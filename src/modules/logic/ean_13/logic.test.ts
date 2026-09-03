import { describe, it, expect } from 'vitest';
import { calculateEanChecksum, isValidEan13, generateEan13 } from './logic';

describe('EAN-13 Logic', () => {
  it('should calculate the checksum digit', () => {
    expect(calculateEanChecksum('400638133393')).toBe(1);
  });

  it('should validate EAN-13 numbers', () => {
    expect(isValidEan13('4006381333931')).toBe(true);
    expect(isValidEan13('4006381333932')).toBe(false);
  });

  it('should reject inputs shorter than 13 digits', () => {
    expect(isValidEan13('123')).toBe(false);
  });

  it('should generate valid EAN-13 numbers', () => {
    const generated = generateEan13();
    expect(generated).toMatch(/^\d{13}$/);
    expect(isValidEan13(generated)).toBe(true);
  });
});