import { describe, expect, it } from 'vitest';
import { calculateBitwise } from './logic';

describe('Bitwise Logic (8-Bit Unsigned)', () => {
  it('handles 8-bit unsigned NOT operations correctly without negative integers', () => {
    expect(calculateBitwise(0, 0, 'NOT')).toBe(255);
    expect(calculateBitwise(255, 0, 'NOT')).toBe(0);
    expect(calculateBitwise(170, 0, 'NOT')).toBe(85);
    expect(calculateBitwise(1, 0, 'NOT')).toBe(254);
  });

  it('calculates binary bitwise operations accurately', () => {
    expect(calculateBitwise(255, 15, 'AND')).toBe(15);
    expect(calculateBitwise(240, 15, 'OR')).toBe(255);
    expect(calculateBitwise(255, 15, 'XOR')).toBe(240);
  });

  it('handles bit shifts constrained to 8-bit unsigned range', () => {
    expect(calculateBitwise(1, 7, 'LSHIFT')).toBe(128);
    expect(calculateBitwise(128, 1, 'LSHIFT')).toBe(0);
    expect(calculateBitwise(128, 1, 'RSHIFT')).toBe(64);
  });

  it('returns 0 for invalid operations', () => {
    expect(calculateBitwise(10, 5, 'INVALID' as any)).toBe(0);
  });
});
