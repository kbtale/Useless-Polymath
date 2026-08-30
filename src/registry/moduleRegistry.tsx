import { type ComponentType, lazy } from 'react';

export interface ModuleDefinition {
  id: string;
  tool: ComponentType;
  practice: ComponentType;
}

export const MODULE_REGISTRY: Record<string, ModuleDefinition> = {
  doomsday: {
    id: 'doomsday',
    tool: lazy(() =>
      import('../modules/chronometry/doomsday/DoomsdayTool').then((m) => ({
        default: m.DoomsdayTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/chronometry/doomsday/DoomsdayPractice').then((m) => ({
        default: m.DoomsdayPractice,
      })),
    ),
  },
  time_zones: {
    id: 'time_zones',
    tool: lazy(() =>
      import('../modules/chronometry/timezones/TimeZonesTool').then((m) => ({
        default: m.TimeZonesTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/chronometry/timezones/TimeZonesPractice').then((m) => ({
        default: m.TimeZonesPractice,
      })),
    ),
  },
  moon: {
    id: 'moon',
    tool: lazy(() =>
      import('../modules/chronometry/moon/MoonTool').then((m) => ({
        default: m.MoonTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/chronometry/moon/MoonPractice').then((m) => ({
        default: m.MoonPractice,
      })),
    ),
  },
  ordinal: {
    id: 'ordinal',
    tool: lazy(() =>
      import('../modules/chronometry/ordinal/CalendarOrdinalTool').then((m) => ({
        default: m.CalendarOrdinalTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/chronometry/ordinal/CalendarOrdinalPractice').then((m) => ({
        default: m.CalendarOrdinalPractice,
      })),
    ),
  },
  binary: {
    id: 'binary',
    tool: lazy(() =>
      import('../modules/logic/binary/BinaryTool').then((m) => ({
        default: m.BinaryTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/logic/binary/BinaryPractice').then((m) => ({
        default: m.BinaryPractice,
      })),
    ),
  },
  bitwise: {
    id: 'bitwise',
    tool: lazy(() =>
      import('../modules/logic/bitwise/BitwiseTool').then((m) => ({
        default: m.BitwiseTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/logic/bitwise/BitwisePractice').then((m) => ({
        default: m.BitwisePractice,
      })),
    ),
  },
  roman_numerals: {
    id: 'roman_numerals',
    tool: lazy(() =>
      import('../modules/logic/roman_numerals/RomanTool').then((m) => ({
        default: m.RomanTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/logic/roman_numerals/RomanPractice').then((m) => ({
        default: m.RomanPractice,
      })),
    ),
  },
  hexadecimal: {
    id: 'hexadecimal',
    tool: lazy(() =>
      import('../modules/logic/hex/HexTool').then((m) => ({
        default: m.HexTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/logic/hex/HexPractice').then((m) => ({
        default: m.HexPractice,
      })),
    ),
  },
  rule_72: {
    id: 'rule_72',
    tool: lazy(() =>
      import('../modules/logic/rule_72/Rule72Tool').then((m) => ({
        default: m.Rule72Tool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/logic/rule_72/Rule72Practice').then((m) => ({
        default: m.Rule72Practice,
      })),
    ),
  },
  nato_alphabet: {
    id: 'nato_alphabet',
    tool: lazy(() =>
      import('../modules/cryptography/nato_alphabet/NatoTool').then((m) => ({
        default: m.NatoTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/cryptography/nato_alphabet/NatoPractice').then((m) => ({
        default: m.NatoPractice,
      })),
    ),
  },
  caesar_cipher: {
    id: 'caesar_cipher',
    tool: lazy(() =>
      import('../modules/cryptography/caesar_cipher/CaesarTool').then((m) => ({
        default: m.CaesarTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/cryptography/caesar_cipher/CaesarPractice').then((m) => ({
        default: m.CaesarPractice,
      })),
    ),
  },
  morse_code: {
    id: 'morse_code',
    tool: lazy(() =>
      import('../modules/cryptography/morse_code/MorseTool').then((m) => ({
        default: m.MorseTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/cryptography/morse_code/MorsePractice').then((m) => ({
        default: m.MorsePractice,
      })),
    ),
  },
  braille: {
    id: 'braille',
    tool: lazy(() =>
      import('../modules/cryptography/braille/BrailleTool').then((m) => ({
        default: m.BrailleTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/cryptography/braille/BraillePractice').then((m) => ({
        default: m.BraillePractice,
      })),
    ),
  },
  semaphore: {
    id: 'semaphore',
    tool: lazy(() =>
      import('../modules/cryptography/semaphore/SemaphoreTool').then((m) => ({
        default: m.SemaphoreTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/cryptography/semaphore/SemaphorePractice').then((m) => ({
        default: m.SemaphorePractice,
      })),
    ),
  },
  periodic_table: {
    id: 'periodic_table',
    tool: lazy(() =>
      import('../modules/science/periodic_table/PeriodicTableTool').then((m) => ({
        default: m.PeriodicTableTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/science/periodic_table/PeriodicTablePractice').then((m) => ({
        default: m.PeriodicTablePractice,
      })),
    ),
  },
  thermodynamics: {
    id: 'thermodynamics',
    tool: lazy(() =>
      import('../modules/science/thermodynamics/ThermodynamicsTool').then((m) => ({
        default: m.ThermodynamicsTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/science/thermodynamics/ThermodynamicsPractice').then((m) => ({
        default: m.ThermodynamicsPractice,
      })),
    ),
  },
  resistor_codes: {
    id: 'resistor_codes',
    tool: lazy(() =>
      import('../modules/electronics/resistor_codes/ResistorTool').then((m) => ({
        default: m.ResistorTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/electronics/resistor_codes/ResistorPractice').then((m) => ({
        default: m.ResistorPractice,
      })),
    ),
  },
  card_counting: {
    id: 'card_counting',
    tool: lazy(() =>
      import('../modules/games/card_counting/CardCountingTool').then((m) => ({
        default: m.CardCountingTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/games/card_counting/CardCountingPractice').then((m) => ({
        default: m.CardCountingPractice,
      })),
    ),
  },
  luhn_algorithm: {
    id: 'luhn_algorithm',
    tool: lazy(() =>
      import('../modules/logic/luhn_algorithm/LuhnTool').then((m) => ({
        default: m.LuhnTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/logic/luhn_algorithm/LuhnPractice').then((m) => ({
        default: m.LuhnPractice,
      })),
    ),
  },
  ean_13: {
    id: 'ean_13',
    tool: lazy(() =>
      import('../modules/logic/ean_13/EanTool').then((m) => ({
        default: m.EanTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/logic/ean_13/EanPractice').then((m) => ({
        default: m.EanPractice,
      })),
    ),
  },
  subnetting: {
    id: 'subnetting',
    tool: lazy(() =>
      import('../modules/networks/subnetting/SubnettingTool').then((m) => ({
        default: m.SubnettingTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/networks/subnetting/SubnettingPractice').then((m) => ({
        default: m.SubnettingPractice,
      })),
    ),
  },
  color_theory: {
    id: 'color_theory',
    tool: lazy(() =>
      import('../modules/networks/color_theory/ColorTheoryTool').then((m) => ({
        default: m.ColorTheoryTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/networks/color_theory/ColorTheoryPractice').then((m) => ({
        default: m.ColorTheoryPractice,
      })),
    ),
  },
  ascii: {
    id: 'ascii',
    tool: lazy(() =>
      import('../modules/networks/ascii/AsciiTool').then((m) => ({
        default: m.AsciiTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/networks/ascii/AsciiPractice').then((m) => ({
        default: m.AsciiPractice,
      })),
    ),
  },
  storage_units: {
    id: 'storage_units',
    tool: lazy(() =>
      import('../modules/networks/storage_units/StorageUnitsTool').then((m) => ({
        default: m.StorageUnitsTool,
      })),
    ),
    practice: lazy(() =>
      import('../modules/networks/storage_units/StorageUnitsPractice').then((m) => ({
        default: m.StorageUnitsPractice,
      })),
    ),
  },
};

export const getModuleDefinition = (id: string): ModuleDefinition | undefined => {
  return MODULE_REGISTRY[id];
};
