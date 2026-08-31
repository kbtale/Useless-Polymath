import { type ComponentType, type LazyExoticComponent, lazy } from 'react';

const lazyWithRetry = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
): LazyExoticComponent<T> => {
  return lazy(async () => {
    const isBrowser = typeof window !== 'undefined';
    const hasReloaded = isBrowser && window.sessionStorage?.getItem('vite_chunk_retry') === 'true';
    try {
      const module = await factory();
      if (isBrowser) {
        window.sessionStorage?.removeItem('vite_chunk_retry');
      }
      return module;
    } catch (error) {
      if (isBrowser && !hasReloaded) {
        window.sessionStorage?.setItem('vite_chunk_retry', 'true');
        window.location.reload();
      }
      throw error;
    }
  });
};

export interface ModuleDefinition {
  id: string;
  tool: ComponentType;
  practice: ComponentType;
}

export const MODULE_REGISTRY: Record<string, ModuleDefinition> = {
  doomsday: {
    id: 'doomsday',
    tool: lazyWithRetry(() =>
      import('@/modules/chronometry/doomsday/DoomsdayTool').then((m) => ({
        default: m.DoomsdayTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/chronometry/doomsday/DoomsdayPractice').then((m) => ({
        default: m.DoomsdayPractice,
      })),
    ),
  },
  time_zones: {
    id: 'time_zones',
    tool: lazyWithRetry(() =>
      import('@/modules/chronometry/timezones/TimeZonesTool').then((m) => ({
        default: m.TimeZonesTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/chronometry/timezones/TimeZonesPractice').then((m) => ({
        default: m.TimeZonesPractice,
      })),
    ),
  },
  moon: {
    id: 'moon',
    tool: lazyWithRetry(() =>
      import('@/modules/chronometry/moon/MoonTool').then((m) => ({
        default: m.MoonTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/chronometry/moon/MoonPractice').then((m) => ({
        default: m.MoonPractice,
      })),
    ),
  },
  ordinal: {
    id: 'ordinal',
    tool: lazyWithRetry(() =>
      import('@/modules/chronometry/ordinal/CalendarOrdinalTool').then((m) => ({
        default: m.CalendarOrdinalTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/chronometry/ordinal/CalendarOrdinalPractice').then((m) => ({
        default: m.CalendarOrdinalPractice,
      })),
    ),
  },
  binary: {
    id: 'binary',
    tool: lazyWithRetry(() =>
      import('@/modules/logic/binary/BinaryTool').then((m) => ({
        default: m.BinaryTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/logic/binary/BinaryPractice').then((m) => ({
        default: m.BinaryPractice,
      })),
    ),
  },
  bitwise: {
    id: 'bitwise',
    tool: lazyWithRetry(() =>
      import('@/modules/logic/bitwise/BitwiseTool').then((m) => ({
        default: m.BitwiseTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/logic/bitwise/BitwisePractice').then((m) => ({
        default: m.BitwisePractice,
      })),
    ),
  },
  roman_numerals: {
    id: 'roman_numerals',
    tool: lazyWithRetry(() =>
      import('@/modules/logic/roman_numerals/RomanTool').then((m) => ({
        default: m.RomanTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/logic/roman_numerals/RomanPractice').then((m) => ({
        default: m.RomanPractice,
      })),
    ),
  },
  hexadecimal: {
    id: 'hexadecimal',
    tool: lazyWithRetry(() =>
      import('@/modules/logic/hex/HexTool').then((m) => ({
        default: m.HexTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/logic/hex/HexPractice').then((m) => ({
        default: m.HexPractice,
      })),
    ),
  },
  rule_72: {
    id: 'rule_72',
    tool: lazyWithRetry(() =>
      import('@/modules/logic/rule_72/Rule72Tool').then((m) => ({
        default: m.Rule72Tool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/logic/rule_72/Rule72Practice').then((m) => ({
        default: m.Rule72Practice,
      })),
    ),
  },
  nato_alphabet: {
    id: 'nato_alphabet',
    tool: lazyWithRetry(() =>
      import('@/modules/cryptography/nato_alphabet/NatoTool').then((m) => ({
        default: m.NatoTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/cryptography/nato_alphabet/NatoPractice').then((m) => ({
        default: m.NatoPractice,
      })),
    ),
  },
  caesar_cipher: {
    id: 'caesar_cipher',
    tool: lazyWithRetry(() =>
      import('@/modules/cryptography/caesar_cipher/CaesarTool').then((m) => ({
        default: m.CaesarTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/cryptography/caesar_cipher/CaesarPractice').then((m) => ({
        default: m.CaesarPractice,
      })),
    ),
  },
  morse_code: {
    id: 'morse_code',
    tool: lazyWithRetry(() =>
      import('@/modules/cryptography/morse_code/MorseTool').then((m) => ({
        default: m.MorseTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/cryptography/morse_code/MorsePractice').then((m) => ({
        default: m.MorsePractice,
      })),
    ),
  },
  braille: {
    id: 'braille',
    tool: lazyWithRetry(() =>
      import('@/modules/cryptography/braille/BrailleTool').then((m) => ({
        default: m.BrailleTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/cryptography/braille/BraillePractice').then((m) => ({
        default: m.BraillePractice,
      })),
    ),
  },
  semaphore: {
    id: 'semaphore',
    tool: lazyWithRetry(() =>
      import('@/modules/cryptography/semaphore/SemaphoreTool').then((m) => ({
        default: m.SemaphoreTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/cryptography/semaphore/SemaphorePractice').then((m) => ({
        default: m.SemaphorePractice,
      })),
    ),
  },
  periodic_table: {
    id: 'periodic_table',
    tool: lazyWithRetry(() =>
      import('@/modules/science/periodic_table/PeriodicTableTool').then((m) => ({
        default: m.PeriodicTableTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/science/periodic_table/PeriodicTablePractice').then((m) => ({
        default: m.PeriodicTablePractice,
      })),
    ),
  },
  thermodynamics: {
    id: 'thermodynamics',
    tool: lazyWithRetry(() =>
      import('@/modules/science/thermodynamics/ThermodynamicsTool').then((m) => ({
        default: m.ThermodynamicsTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/science/thermodynamics/ThermodynamicsPractice').then((m) => ({
        default: m.ThermodynamicsPractice,
      })),
    ),
  },
  resistor_codes: {
    id: 'resistor_codes',
    tool: lazyWithRetry(() =>
      import('@/modules/electronics/resistor_codes/ResistorTool').then((m) => ({
        default: m.ResistorTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/electronics/resistor_codes/ResistorPractice').then((m) => ({
        default: m.ResistorPractice,
      })),
    ),
  },
  card_counting: {
    id: 'card_counting',
    tool: lazyWithRetry(() =>
      import('@/modules/games/card_counting/CardCountingTool').then((m) => ({
        default: m.CardCountingTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/games/card_counting/CardCountingPractice').then((m) => ({
        default: m.CardCountingPractice,
      })),
    ),
  },
  luhn_algorithm: {
    id: 'luhn_algorithm',
    tool: lazyWithRetry(() =>
      import('@/modules/logic/luhn_algorithm/LuhnTool').then((m) => ({
        default: m.LuhnTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/logic/luhn_algorithm/LuhnPractice').then((m) => ({
        default: m.LuhnPractice,
      })),
    ),
  },
  ean_13: {
    id: 'ean_13',
    tool: lazyWithRetry(() =>
      import('@/modules/logic/ean_13/EanTool').then((m) => ({
        default: m.EanTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/logic/ean_13/EanPractice').then((m) => ({
        default: m.EanPractice,
      })),
    ),
  },
  subnetting: {
    id: 'subnetting',
    tool: lazyWithRetry(() =>
      import('@/modules/networks/subnetting/SubnettingTool').then((m) => ({
        default: m.SubnettingTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/networks/subnetting/SubnettingPractice').then((m) => ({
        default: m.SubnettingPractice,
      })),
    ),
  },
  color_theory: {
    id: 'color_theory',
    tool: lazyWithRetry(() =>
      import('@/modules/networks/color_theory/ColorTheoryTool').then((m) => ({
        default: m.ColorTheoryTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/networks/color_theory/ColorTheoryPractice').then((m) => ({
        default: m.ColorTheoryPractice,
      })),
    ),
  },
  ascii: {
    id: 'ascii',
    tool: lazyWithRetry(() =>
      import('@/modules/networks/ascii/AsciiTool').then((m) => ({
        default: m.AsciiTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/networks/ascii/AsciiPractice').then((m) => ({
        default: m.AsciiPractice,
      })),
    ),
  },
  storage_units: {
    id: 'storage_units',
    tool: lazyWithRetry(() =>
      import('@/modules/networks/storage_units/StorageUnitsTool').then((m) => ({
        default: m.StorageUnitsTool,
      })),
    ),
    practice: lazyWithRetry(() =>
      import('@/modules/networks/storage_units/StorageUnitsPractice').then((m) => ({
        default: m.StorageUnitsPractice,
      })),
    ),
  },
};

export const getModuleDefinition = (id: string): ModuleDefinition | undefined => {
  return MODULE_REGISTRY[id];
};
