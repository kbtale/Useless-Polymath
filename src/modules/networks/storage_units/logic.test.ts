import { describe, it, expect } from 'vitest';
import {
  STORAGE_UNITS,
  UNITS,
  convertStorage,
  convertStorageBySymbol,
  formatValue,
  generatePracticeProblem,
  calculateAnswer,
} from './logic';

describe('Storage Units Logic', () => {
  it('should define the standard unit hierarchy', () => {
    expect(STORAGE_UNITS.map((unit) => unit.symbol)).toEqual(['B', 'KB', 'MB', 'GB', 'TB', 'PB']);
    expect(UNITS).toBe(STORAGE_UNITS);
  });

  it('should convert storage across all units by symbol', () => {
    const entries = convertStorageBySymbol(1, 'GB');
    expect(entries).toHaveLength(STORAGE_UNITS.length);
    const megabytes = entries.find((entry) => entry.unit === 'MB');
    expect(megabytes?.value).toBe(1024);
  });

  it('should convert storage by numeric index for backward compatibility', () => {
    const entries = convertStorage(1, 3);
    expect(entries).toHaveLength(STORAGE_UNITS.length);
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
    expect(problem.fromIdx).toBeLessThan(STORAGE_UNITS.length);
    expect(problem.toIdx).toBeGreaterThanOrEqual(0);
    expect(problem.toIdx).toBeLessThan(STORAGE_UNITS.length);
    expect(problem.fromIdx).not.toBe(problem.toIdx);
    expect(problem.fromSymbol).toBe(STORAGE_UNITS[problem.fromIdx].symbol);
    expect(problem.toSymbol).toBe(STORAGE_UNITS[problem.toIdx].symbol);
    expect(problem.amount).toBeGreaterThan(0);
  });
});