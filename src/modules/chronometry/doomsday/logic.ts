export interface DoomsdayLog {
  steps: {
    title: string;
    input: string;
    result: string;
    details?: string;
  }[];
  finalDay: string;
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
    title: 'Century Anchor',
    input: `Year ${safeYear} (Century ${century})`,
    result: DAYS[anchor] || DAYS[0],
    details: `Anchor for ${century}00s is ${anchor} (${DAYS[anchor] || DAYS[0]})`,
  });

  const yearPart = ((safeYear % 100) + 100) % 100;
  const a = Math.floor(yearPart / 12);
  const b = yearPart % 12;
  const c = Math.floor(b / 4);
  const yearDoomsday = (((anchor + a + b + c) % 7) + 7) % 7;
  steps.push({
    title: 'Year Anchor',
    input: `Year XX${yearPart.toString().padStart(2, '0')}`,
    result: DAYS[yearDoomsday] || DAYS[0],
    details: `(${a} * 12) + ${b} + (${c} leap days) = Doomsday ${yearDoomsday}`,
  });

  const leap = isLeapYear(safeYear);
  const monthDoomsdays = [leap ? 4 : 3, leap ? 29 : 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12];
  const monthAnchorDay = monthDoomsdays[safeMonth - 1] ?? 4;
  steps.push({
    title: 'Month Anchor',
    input: `${safeMonth}/${safeDay} (Leap: ${leap})`,
    result: `${safeMonth}/${monthAnchorDay}`,
    details: `Doomsday for month ${safeMonth} is the ${monthAnchorDay}${getDaySuffix(monthAnchorDay)}`,
  });

  const diff = safeDay - monthAnchorDay;
  let result = (((yearDoomsday + diff) % 7) + 7) % 7;
  if (Number.isNaN(result) || result < 0 || result > 6) result = 0;

  const finalDayName = DAYS[result] || DAYS[0];

  steps.push({
    title: 'Summation',
    input: `Target ${safeDay} vs Anchor ${monthAnchorDay}`,
    result: finalDayName,
    details: `Diff: ${diff} days. (${yearDoomsday} + ${diff}) mod 7 = ${result}`,
  });

  return {
    steps,
    finalDay: finalDayName,
    finalNumber: result,
  };
};

const getDaySuffix = (d: number) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
