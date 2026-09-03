import { describe, it, expect } from 'vitest';
import { encrypt, decrypt, ROT13 } from './logic';

describe('Caesar Cipher Logic', () => {
  it('should encrypt text with a shift', () => {
    expect(encrypt('ABC', 3)).toBe('DEF');
  });

  it('should decrypt text with a shift', () => {
    expect(decrypt('DEF', 3)).toBe('ABC');
  });

  it('should apply the ROT13 cipher', () => {
    expect(ROT13('HELLO')).toBe('URYYB');
    expect(ROT13(ROT13('HELLO'))).toBe('HELLO');
  });

  it('should preserve non-alphabetic characters and case', () => {
    expect(encrypt('Hello, World!', 5)).toBe('Mjqqt, Btwqi!');
    expect(encrypt('abc', 1)).toBe('bcd');
  });
});