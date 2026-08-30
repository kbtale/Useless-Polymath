import { describe, expect, it } from 'vitest';
import { getModuleDefinition, MODULE_REGISTRY } from './moduleRegistry';

describe('Module Registry', () => {
  it('registers all 24 tool modules', () => {
    const expectedModules = [
      'doomsday',
      'time_zones',
      'moon',
      'ordinal',
      'binary',
      'bitwise',
      'roman_numerals',
      'hexadecimal',
      'rule_72',
      'nato_alphabet',
      'caesar_cipher',
      'morse_code',
      'braille',
      'semaphore',
      'periodic_table',
      'thermodynamics',
      'resistor_codes',
      'card_counting',
      'luhn_algorithm',
      'ean_13',
      'subnetting',
      'color_theory',
      'ascii',
      'storage_units',
    ];

    expect(Object.keys(MODULE_REGISTRY).length).toBe(24);
    for (const id of expectedModules) {
      expect(MODULE_REGISTRY[id]).toBeDefined();
      expect(MODULE_REGISTRY[id].tool).toBeDefined();
      expect(MODULE_REGISTRY[id].practice).toBeDefined();
    }
  });

  it('retrieves module definition by id or undefined for unknown id', () => {
    expect(getModuleDefinition('doomsday')).toBeDefined();
    expect(getModuleDefinition('non_existent_module')).toBeUndefined();
  });
});
