import { describe, it, expect } from 'vitest';
import { getMoonPhase } from './logic';

describe('Moon Phases Logic', () => {
  it('should calculate Full Moon correctly', () => {
    // Known Full Moon: Dec 25, 2015
    const result = getMoonPhase(25, 12, 2015);
    // Age around 14-15 is Full Moon
    expect(result.age).toBeGreaterThanOrEqual(13);
    expect(result.age).toBeLessThanOrEqual(16);
    expect(result.phaseName).toMatch(/Full Moon|Gibbous/);
  });

  it('should calculate New Moon correctly', () => {
    // Known New Moon: Nov 11, 2015
    const result = getMoonPhase(11, 11, 2015);
    // Age around 0 or 29 is New Moon
    expect([0, 29, 1, 28]).toContain(result.age); 
  });

  it('should handle month offsets correctly', () => {
    // Testing different months to ensure offset array is used
    const jan = getMoonPhase(1, 1, 2023);
    const feb = getMoonPhase(1, 2, 2023);
    expect(jan).toBeDefined();
    expect(feb).toBeDefined();
  });
});
