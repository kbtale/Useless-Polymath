export interface Benchmark {
  celsius: number;
  fahrenheit: number;
  labelKey: string; 
}

export const celsiusToFahrenheit = (c: number): number => (c * 9) / 5 + 32;

export const fahrenheitToCelsius = (f: number): number => ((f - 32) * 5) / 9;

export const celsiusToFahrenheitMental = (c: number): number => c * 2 + 30;

export const BENCHMARKS: Benchmark[] = [
  { celsius: 0, fahrenheit: 32, labelKey: 'benchmark_freezing' },
  { celsius: 10, fahrenheit: 50, labelKey: 'benchmark_cool' },
  { celsius: 20, fahrenheit: 68, labelKey: 'benchmark_room' },
  { celsius: 30, fahrenheit: 86, labelKey: 'benchmark_hot' },
  { celsius: 100, fahrenheit: 212, labelKey: 'benchmark_boiling' },
];
