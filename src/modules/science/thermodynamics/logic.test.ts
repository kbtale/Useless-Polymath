import { describe, expect, it } from 'vitest';
import {
  BENCHMARKS,
  celsiusToFahrenheit,
  celsiusToFahrenheitMental,
  fahrenheitToCelsius,
} from './logic';

describe('Thermodynamics Logic', () => {
  it('converts celsius to fahrenheit', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });

  it('converts fahrenheit to celsius', () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
    expect(fahrenheitToCelsius(212)).toBe(100);
    expect(fahrenheitToCelsius(-40)).toBe(-40);
  });

  it('calculates mental math approximation', () => {
    expect(celsiusToFahrenheitMental(0)).toBe(30);
    expect(celsiusToFahrenheitMental(20)).toBe(70);
    expect(celsiusToFahrenheitMental(30)).toBe(90);
  });

  it('contains expected benchmark points', () => {
    expect(BENCHMARKS.length).toBe(5);
    expect(BENCHMARKS[0].celsius).toBe(0);
    expect(BENCHMARKS[0].fahrenheit).toBe(32);
  });
});
