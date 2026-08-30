import { describe, it, expect } from 'vitest';
import { calculateDestinationTime } from './logic';

describe('Time Zones Logic', () => {
  it('should calculate same timezone correctly', () => {
    const result = calculateDestinationTime(12, 0, 0);
    expect(result).toEqual({ hour: 12, dayOffset: 0 });
  });

  it('should calculate simple forward difference', () => {
    const result = calculateDestinationTime(12, 0, 1);
    expect(result).toEqual({ hour: 13, dayOffset: 0 });
  });

  it('should calculate simple backward difference', () => {
    const result = calculateDestinationTime(12, 0, -5);
    expect(result).toEqual({ hour: 7, dayOffset: 0 });
  });

  it('should handle day rollover (next day)', () => {
    const result = calculateDestinationTime(23, 0, 9);
    expect(result).toEqual({ hour: 8, dayOffset: 1 });
  });

  it('should handle day rollover (previous day)', () => {
    const result = calculateDestinationTime(2, 0, -5);
    expect(result).toEqual({ hour: 21, dayOffset: -1 });
  });

  it('should handle complex offset to offset', () => {
    const result = calculateDestinationTime(20, -5, 9);
    expect(result).toEqual({ hour: 10, dayOffset: 1 });
  });
});
