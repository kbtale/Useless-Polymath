import { describe, it, expect } from 'vitest';
import { getDayOfWeek, isLeapYear } from './logic';

describe('Doomsday Algorithm', () => {
  it('should correctly identify leap years', () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2023)).toBe(false);
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(1900)).toBe(false);
  });

  it('should calculate the correct day of the week', () => {
    expect(getDayOfWeek(2023, 12, 2)).toBe(6);

    expect(getDayOfWeek(2024, 2, 29)).toBe(4);

    expect(getDayOfWeek(2000, 1, 1)).toBe(6);
  });
});
