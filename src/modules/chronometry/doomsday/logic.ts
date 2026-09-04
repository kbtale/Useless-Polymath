export interface DoomsdayLog {
  steps: {
    titleKey: string;
    input: string;
    result: string;
    details?: string;
  }[];
  finalDayIndex: number;
  finalNumber: number;
}

export const getDoomsday = (year: number): number => {
  const century = Math.floor(year / 100);
  const anchor = (5 * (century % 4) + 2) % 7;

  const yearPart = year % 100;
  const a = Math.floor(yearPart / 12);
  const b = yearPart % 12;
  const c = Math.floor(b / 4);

  return (anchor + a + b + c) % 7;
};

export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const getDayOfWeek = (year: number, month: number, day: number): number => {
  const { finalNumber } = calculateDoomsdayWithLog(year, month, day);
  return finalNumber;
};

export const calculateDoomsdayWithLog = (year: number, month: number, day: number): DoomsdayLog => {
  const safeYear = Number.isFinite(year) ? Math.floor(year) : 2025;
  const safeMonth = Number.isFinite(month) ? Math.min(Math.max(1, Math.floor(month)), 12) : 1;
  const safeDay = Number.isFinite(day) ? Math.min(Math.max(1, Math.floor(day)), 31) : 1;

  const steps = [];

  const century = Math.floor(safeYear / 100);
  const anchor = (((5 * (century % 4) + 2) % 7) + 7) % 7;
  steps.push({
    titleKey: 'step_century_anchor',
    input: `Year ${safeYear} (Century ${century})`,
    result: String(anchor),
    details: `Anchor for ${century}00s is ${anchor}`,
  });

  const yearPart = ((safeYear % 100) + 100) % 100;
  const a = Math.floor(yearPart / 12);
  const b = yearPart % 12;
  const c = Math.floor(b / 4);
  const yearDoomsday = (((anchor + a + b + c) % 7) + 7) % 7;
  steps.push({
    titleKey: 'step_year_anchor',
    input: `Year XX${yearPart.toString().padStart(2, '0')}`,
    result: String(yearDoomsday),
    details: `(${a} * 12) + ${b} + (${c} leap days) = Doomsday ${yearDoomsday}`,
  });

  const leap = isLeapYear(safeYear);
  const monthDoomsdays = [leap ? 4 : 3, leap ? 29 : 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12];
  const monthAnchorDay = monthDoomsdays[safeMonth - 1] ?? 4;
  steps.push({
    titleKey: 'step_month_anchor',
    input: `${safeMonth}/${safeDay} (Leap: ${leap})`,
    result: `${safeMonth}/${monthAnchorDay}`,
    details: `Doomsday for month ${safeMonth} is day ${monthAnchorDay}`,
  });

  const diff = safeDay - monthAnchorDay;
  let result = (((yearDoomsday + diff) % 7) + 7) % 7;
  if (Number.isNaN(result) || result < 0 || result > 6) result = 0;

  steps.push({
    titleKey: 'step_summation',
    input: `Target ${safeDay} vs Anchor ${monthAnchorDay}`,
    result: String(result),
    details: `Diff: ${diff} days. (${yearDoomsday} + ${diff}) mod 7 = ${result}`,
  });

  return {
    steps,
    finalDayIndex: result,
    finalNumber: result,
  };
};

export const DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;