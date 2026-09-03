import { describe, it, expect } from 'vitest';
import { calculateDoublingTime, preciseDoublingTime } from './logic';

describe('Rule of 72 Logic', () => {
  it('should calculate doubling time with the rule of 72', () => {
    expect(calculateDoublingTime(6)).toBe(12);
    expect(calculateDoublingTime(8)).toBe(9);
  });

  it('should return Infinity for non-positive rates', () => {
    expect(calculateDoublingTime(0)).toBe(Infinity);
  });

  it('should return Infinity for non-positive precise rates', () => {
    expect(preciseDoublingTime(0)).toBe(Infinity);
  });

  it('should calculate precise doubling time', () => {
    expect(preciseDoublingTime(6)).toBeCloseTo(11.9, 1);
    expect(preciseDoublingTime(10)).toBeCloseTo(7.27, 2);
  });
});