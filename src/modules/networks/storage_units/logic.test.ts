import { describe, it, expect } from 'vitest';
import {
  UNITS,
  convertStorage,
  formatValue,
  generatePracticeProblem,
  calculateAnswer,
} from './logic';

describe('Storage Units Logic', () => {
  it('should define the standard unit hierarchy', () => {
    expect(UNITS.map((unit) => unit.label)).toEqual(['B', 'KB', 'MB', 'GB', 'TB', 'PB']);
  });

  it('should convert storage across all units', () => {
    const entries = convertStorage(1, 3);
    expect(entries).toHaveLength(UNITS.length);
    const megabytes = entries.find((entry) => entry.unit === 'MB');
    expect(megabytes?.value).toBe(1024);
  });

  it('should calculate a direct unit conversion', () => {
    expect(calculateAnswer(1, 3, 2)).toBe(1024);
  });

  it('should format values', () => {
    expect(formatValue(0)).toBe('0');
    expect(formatValue(1024)).toBe((1024).toLocaleString());
  });

  it('should generate valid practice problems', () => {
    const problem = generatePracticeProblem();
    expect(problem.fromIdx).toBeGreaterThanOrEqual(0);
    expect(problem.fromIdx).toBeLessThan(UNITS.length);
    expect(problem.toIdx).toBeGreaterThanOrEqual(0);
    expect(problem.toIdx).toBeLessThan(UNITS.length);
    expect(problem.fromIdx).not.toBe(problem.toIdx);
    expect(problem.amount).toBeGreaterThan(0);
  });
});