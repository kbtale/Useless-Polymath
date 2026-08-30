import { describe, expect, it } from 'vitest';
import { calculateResistance, formatOhms, getRandomResistor } from './logic';

describe('Resistor Codes Logic', () => {
  it('calculates standard 4-band resistor values accurately', () => {
    const result = calculateResistance(['brown', 'black', 'red', 'gold'], 4);
    expect(result.value).toBe(1000);
    expect(result.tolerance).toBe(5);
    expect(result.multiplier).toBe(100);
  });

  it('calculates standard 5-band resistor values accurately', () => {
    const result = calculateResistance(['yellow', 'violet', 'black', 'red', 'brown'], 5);
    expect(result.value).toBe(47000);
    expect(result.tolerance).toBe(1);
    expect(result.multiplier).toBe(100);
  });

  it('accurately computes fractional gold and silver multipliers without floating-point errors', () => {
    const goldResult = calculateResistance(['brown', 'red', 'gold', 'gold'], 4);
    expect(goldResult.value).toBe(1.2);

    const silverResult = calculateResistance(['brown', 'red', 'silver', 'gold'], 4);
    expect(silverResult.value).toBe(0.12);
  });

  it('formats ohms properly into readable engineering units with SI prefixes', () => {
    expect(formatOhms(0.12)).toBe('0.12Ω');
    expect(formatOhms(1.2)).toBe('1.2Ω');
    expect(formatOhms(47)).toBe('47Ω');
    expect(formatOhms(1000)).toBe('1kΩ');
    expect(formatOhms(4700)).toBe('4.7kΩ');
    expect(formatOhms(1000000)).toBe('1MΩ');
    expect(formatOhms(2200000)).toBe('2.2MΩ');
    expect(formatOhms(1000000000)).toBe('1GΩ');
  });

  it('generates valid random resistor configurations for 4 and 5 band modes', () => {
    const r4 = getRandomResistor(4);
    expect(r4.length).toBe(4);
    const res4 = calculateResistance(r4, 4);
    expect(res4.value).toBeGreaterThan(0);

    const r5 = getRandomResistor(5);
    expect(r5.length).toBe(5);
    const res5 = calculateResistance(r5, 5);
    expect(res5.value).toBeGreaterThan(0);
  });
});
