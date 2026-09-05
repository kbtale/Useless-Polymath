import { describe, it, expect } from 'vitest';
import { NATO_DICTIONARY, toNato } from './logic';

describe('NATO Alphabet Logic', () => {
  it('should map letters to NATO words', () => {
    expect(NATO_DICTIONARY.A).toBe('Alpha');
    expect(toNato('A')).toEqual([{ char: 'A', word: 'Alpha' }]);
  });

  it('should map a sequence of letters', () => {
    expect(toNato('ABC')).toEqual([
      { char: 'A', word: 'Alpha' },
      { char: 'B', word: 'Bravo' },
      { char: 'C', word: 'Charlie' },
    ]);
  });

  it('should map digits to NATO words', () => {
    expect(toNato('A1')).toEqual([
      { char: 'A', word: 'Alpha' },
      { char: '1', word: 'One' },
    ]);
  });

  it('should return a null word for unsupported characters', () => {
    expect(toNato('!')).toEqual([{ char: '!', word: null }]);
  });
});