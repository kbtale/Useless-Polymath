import { describe, expect, it } from 'vitest';
import { BRAILLE_MAP, getBraillePattern } from './logic';

describe('Braille Logic', () => {
  it('contains braille mappings for letters and numbers', () => {
    expect(BRAILLE_MAP.A).toEqual([1]);
    expect(BRAILLE_MAP.B).toEqual([1, 2]);
    expect(BRAILLE_MAP[' ']).toEqual([]);
  });

  it('generates 6-dot boolean pattern for characters', () => {
    const patternA = getBraillePattern('A');
    expect(patternA.length).toBe(6);
    expect(patternA).toEqual([true, false, false, false, false, false]);

    const patternB = getBraillePattern('b');
    expect(patternB).toEqual([true, true, false, false, false, false]);
  });

  it('returns all false dots for spaces and unknown characters', () => {
    expect(getBraillePattern(' ')).toEqual([false, false, false, false, false, false]);
    expect(getBraillePattern('@')).toEqual([false, false, false, false, false, false]);
  });
});
