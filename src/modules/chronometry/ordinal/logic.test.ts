import { describe, it, expect } from 'vitest';
import { isLeapYear, getDaysInMonth, getOrdinalDate, getMonthFromOrdinal } from './logic';

describe('Ordinal Logic', () => {
  it('should detect leap years correctly', () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2023)).toBe(false);
    expect(isLeapYear(1900)).toBe(false);
    expect(isLeapYear(2000)).toBe(true);
  });

  it('should return the number of days in a month', () => {
    expect(getDaysInMonth(2, 2024)).toBe(29);
    expect(getDaysInMonth(2, 2023)).toBe(28);
  });

  it('should calculate the ordinal date of the year', () => {
    expect(getOrdinalDate(1, 1, 2025).ordinal).toBe(1);
    expect(getOrdinalDate(31, 12, 2025).ordinal).toBe(365);
  });

  it('should roundtrip ordinal dates back to month and day', () => {
    expect(getMonthFromOrdinal(365, 2025)).toEqual({ month: 12, day: 31 });
    expect(getMonthFromOrdinal(1, 2025)).toEqual({ month: 1, day: 1 });
  });
});