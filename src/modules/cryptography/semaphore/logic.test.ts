import { describe, expect, it } from 'vitest';
import { getSemaphorePattern, SEMAPHORE_MAP } from './logic';

describe('Semaphore Logic', () => {
  it('contains angles for all alphabet letters', () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (const char of alphabet) {
      expect(SEMAPHORE_MAP[char]).toBeDefined();
      expect(typeof SEMAPHORE_MAP[char].left).toBe('number');
      expect(typeof SEMAPHORE_MAP[char].right).toBe('number');
    }
  });

  it('retrieves pattern for letters case-insensitively', () => {
    expect(getSemaphorePattern('A')).toEqual({ left: 225, right: 180 });
    expect(getSemaphorePattern('a')).toEqual({ left: 225, right: 180 });
  });

  it('maps numbers to corresponding semaphore letter angles', () => {
    expect(getSemaphorePattern('1')).toEqual(SEMAPHORE_MAP.a);
    expect(getSemaphorePattern('0')).toEqual(SEMAPHORE_MAP.k);
  });

  it('returns rest position for unknown characters', () => {
    expect(getSemaphorePattern('?')).toEqual(SEMAPHORE_MAP.rest);
  });
});
