import { describe, it, expect } from 'vitest';
import { calculateDestinationTime } from './logic';

describe('Time Zones Logic', () => {
  it('should calculate same timezone correctly', () => {
    const result = calculateDestinationTime(12, 0, 0);
    expect(result).toEqual({ hour: 12, dayOffset: 0 });
  });

  it('should calculate simple forward difference', () => {
    // London (0) 12:00 -> Paris (+1)
    const result = calculateDestinationTime(12, 0, 1);
    expect(result).toEqual({ hour: 13, dayOffset: 0 });
  });

  it('should calculate simple backward difference', () => {
    // London (0) 12:00 -> NY (-5)
    const result = calculateDestinationTime(12, 0, -5);
    expect(result).toEqual({ hour: 7, dayOffset: 0 });
  });

  it('should handle day rollover (next day)', () => {
    // London (0) 23:00 -> Tokyo (+9) = 32:00 -> 08:00 next day
    const result = calculateDestinationTime(23, 0, 9);
    expect(result).toEqual({ hour: 8, dayOffset: 1 });
  });

  it('should handle day rollover (previous day)', () => {
    // London (0) 02:00 -> NY (-5) = -3:00 -> 21:00 prev day
    const result = calculateDestinationTime(2, 0, -5);
    expect(result).toEqual({ hour: 21, dayOffset: -1 });
  });

  it('should handle complex offset to offset', () => {
    // NY (-5) 20:00 -> Tokyo (+9)
    // UTC = 20 - (-5) = 25 (01:00 next day)
    // Dest = 25 + 9 = 34 -> 10:00 (next day)
    // Wait, let's trace:
    // UTC = 20 + 5 = 25.
    // Dest = 25 + 9 = 34.
    // 34 - 24 = 10. Day offset +1.
    const result = calculateDestinationTime(20, -5, 9);
    expect(result).toEqual({ hour: 10, dayOffset: 1 });
  });
});
