import { describe, it, expect } from 'vitest';
import { charToCode, codeToChar, getPrintableAscii } from './logic';

describe('ASCII Logic', () => {
  it('should convert characters to ASCII codes', () => {
    expect(charToCode('A')).toBe(65);
    expect(charToCode('0')).toBe(48);
  });

  it('should convert ASCII codes to characters', () => {
    expect(codeToChar(65)).toBe('A');
  });

  it('should roundtrip characters through codes', () => {
    expect(codeToChar(charToCode('Z'))).toBe('Z');
  });

  it('should list printable ASCII characters from 32 to 126', () => {
    const printable = getPrintableAscii();
    expect(printable).toHaveLength(95);
    expect(printable[0]).toEqual({ code: 32, char: ' ' });
    expect(printable[printable.length - 1]).toEqual({ code: 126, char: '~' });
  });
});