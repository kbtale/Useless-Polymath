export const WeekdayIndex = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
} as const;

export type WeekdayIndex = (typeof WeekdayIndex)[keyof typeof WeekdayIndex];

export const DAY_KEYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

export type WeekdayKey = (typeof DAY_KEYS)[number];

export interface DoomsdayStep {
  titleKey: string;
  input: string;
  result: string;
  details?: string;
}

export interface DoomsdayLog {
  steps: DoomsdayStep[];
  finalDayIndex: WeekdayIndex;
  finalNumber: number;
}

export const getDoomsday = (year: number): WeekdayIndex => {
  const century = Math.floor(year / 100);
  const centuryAnchorDay = (5 * (century % 4) + 2) % 7;

  const twoDigitYear = year % 100;
  const dozensOfYears = Math.floor(twoDigitYear / 12);
  const remainderYears = twoDigitYear % 12;
  const leapYearsInRemainder = Math.floor(remainderYears / 4);

  const yearDoomsdayOffset =
    (centuryAnchorDay + dozensOfYears + remainderYears + leapYearsInRemainder) % 7;
  return (((yearDoomsdayOffset % 7) + 7) % 7) as WeekdayIndex;
};

export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const getDayOfWeek = (year: number, month: number, day: number): WeekdayIndex => {
  const { finalDayIndex } = calculateDoomsdayWithLog(year, month, day);
  return finalDayIndex;
};

export const calculateDoomsdayWithLog = (year: number, month: number, day: number): DoomsdayLog => {
  const safeYear = Number.isFinite(year) ? Math.floor(year) : 2025;
  const safeMonth = Number.isFinite(month) ? Math.min(Math.max(1, Math.floor(month)), 12) : 1;
  const safeDay = Number.isFinite(day) ? Math.min(Math.max(1, Math.floor(day)), 31) : 1;

  const steps: DoomsdayStep[] = [];

  const century = Math.floor(safeYear / 100);
  const centuryAnchorDay = (((5 * (century % 4) + 2) % 7) + 7) % 7;
  steps.push({
    titleKey: 'step_century_anchor',
    input: `Year ${safeYear} (Century ${century})`,
    result: String(centuryAnchorDay),
    details: `Anchor for ${century}00s is ${centuryAnchorDay}`,
  });

  const twoDigitYear = ((safeYear % 100) + 100) % 100;
  const dozensOfYears = Math.floor(twoDigitYear / 12);
  const remainderYears = twoDigitYear % 12;
  const leapYearsInRemainder = Math.floor(remainderYears / 4);
  const yearDoomsday =
    (((centuryAnchorDay + dozensOfYears + remainderYears + leapYearsInRemainder) % 7) + 7) % 7;

  steps.push({
    titleKey: 'step_year_anchor',
    input: `Year XX${twoDigitYear.toString().padStart(2, '0')}`,
    result: String(yearDoomsday),
    details: `(${dozensOfYears} * 12) + ${remainderYears} + (${leapYearsInRemainder} leap days) = Doomsday ${yearDoomsday}`,
  });

  const isCurrentYearLeap = isLeapYear(safeYear);
  const monthDoomsdayAnchors = [
    isCurrentYearLeap ? 4 : 3,
    isCurrentYearLeap ? 29 : 28,
    14,
    4,
    9,
    6,
    11,
    8,
    5,
    10,
    7,
    12,
  ];
  const monthAnchorDay = monthDoomsdayAnchors[safeMonth - 1] ?? 4;
  steps.push({
    titleKey: 'step_month_anchor',
    input: `${safeMonth}/${safeDay} (Leap: ${isCurrentYearLeap})`,
    result: `${safeMonth}/${monthAnchorDay}`,
    details: `Doomsday for month ${safeMonth} is day ${monthAnchorDay}`,
  });

  const targetDayDifference = safeDay - monthAnchorDay;
  let computedWeekday = (((yearDoomsday + targetDayDifference) % 7) + 7) % 7;
  if (Number.isNaN(computedWeekday) || computedWeekday < 0 || computedWeekday > 6) {
    computedWeekday = 0;
  }

  steps.push({
    titleKey: 'step_summation',
    input: `Target ${safeDay} vs Anchor ${monthAnchorDay}`,
    result: String(computedWeekday),
    details: `Diff: ${targetDayDifference} days. (${yearDoomsday} + ${targetDayDifference}) mod 7 = ${computedWeekday}`,
  });

  const finalDayIndex = computedWeekday as WeekdayIndex;

  return {
    steps,
    finalDayIndex,
    finalNumber: computedWeekday,
  };
};
