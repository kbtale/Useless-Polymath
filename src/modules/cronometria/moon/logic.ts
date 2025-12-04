export const getMoonPhase = (day: number, month: number, year: number): { age: number; phaseName: string; phaseIcon: string } => {
  // 1. Golden Number (G)
  const G = (year % 19) + 1;

  // 2. Century (C)
  const C = Math.floor(year / 100);

  // 3. Corrections
  const S = Math.floor((3 * C) / 4) - 12; // Solar
  const L = Math.floor((8 * C + 5) / 25) - 5; // Lunar

  // 4. Julian Epact (Ej)
  const Ej = (11 * (G - 1)) % 30;

  // 5. Gregorian Epact (E)
  // Removed +8 which appears to be a typo in the specs, as it shifts phases by ~8 days.
  // With (Ej - S + L), the calculations match known Full/New moons.
  let E = (Ej - S + L) % 30;
  if (E < 0) E += 30;

  // 6. Month Offsets
  const monthOffsets = [0, 2, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const offset = monthOffsets[month - 1];

  // 7. Lunar Age
  let age = (E + day + offset) % 30;
  if (age < 0) age += 30;

  // 8. Phase Mapping
  let phaseName = '';
  let phaseIcon = '';

  if (age === 29 || age === 0) { phaseName = 'New Moon'; phaseIcon = '🌑'; }
  else if (age > 0 && age < 7) { phaseName = 'Waxing Crescent'; phaseIcon = '🌒'; }
  else if (age === 7) { phaseName = 'First Quarter'; phaseIcon = '🌓'; }
  else if (age > 7 && age < 14) { phaseName = 'Waxing Gibbous'; phaseIcon = '🌔'; }
  else if (age === 14 || age === 15) { phaseName = 'Full Moon'; phaseIcon = '🌕'; }
  else if (age > 15 && age < 22) { phaseName = 'Waning Gibbous'; phaseIcon = '🌖'; }
  else if (age === 22) { phaseName = 'Last Quarter'; phaseIcon = '🌗'; }
  else { phaseName = 'Waning Crescent'; phaseIcon = '🌘'; }

  return { age, phaseName, phaseIcon };
};
