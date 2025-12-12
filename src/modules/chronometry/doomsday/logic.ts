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
  // Anchor day for the century
  const century = Math.floor(year / 100);
  const anchor = (5 * (century % 4) + 2) % 7;

  // Year part
  const yearPart = year % 100;
  const a = Math.floor(yearPart / 12);
  const b = yearPart % 12;
  const c = Math.floor(b / 4);

  return (anchor + a + b + c) % 7;
};

export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

export const getDayOfWeek = (year: number, month: number, day: number): number => {
  const { finalNumber } = calculateDoomsdayWithLog(year, month, day);
  return finalNumber;
};

export const calculateDoomsdayWithLog = (year: number, month: number, day: number): DoomsdayLog => {
  const steps = [];
  
  // 1. Century Anchor
  const century = Math.floor(year / 100);
  const anchor = (5 * (century % 4) + 2) % 7;
  steps.push({
    title: 'STEP 01 :: CENTURY ANCHOR',
    input: `Year ${year} (Century ${century})`,
    result: DAYS[anchor].toUpperCase(),
    details: `Anchor for ${century}00s is ${anchor} (${DAYS[anchor]})`
  });

  // 2. Year Part
  const yearPart = year % 100;
  const a = Math.floor(yearPart / 12);
  const b = yearPart % 12;
  const c = Math.floor(b / 4);
  const yearDoomsday = (anchor + a + b + c) % 7;
  steps.push({
    title: 'STEP 02 :: YEAR ANCHOR',
    input: `Year XX${yearPart}`,
    result: DAYS[yearDoomsday].toUpperCase(),
    details: `(${a} * 12) + ${b} + (${c} leap days) = Doomsday ${yearDoomsday}`
  });

  // 3. Month Anchor
  const leap = isLeapYear(year);
  const monthDoomsdays = [
    leap ? 4 : 3,  // Jan
    leap ? 29 : 28, // Feb
    14, // Mar
    4,  // Apr
    9,  // May
    6,  // Jun
    11, // Jul
    8,  // Aug
    5,  // Sep
    10, // Oct
    7,  // Nov
    12  // Dec
  ];
  const monthAnchorDay = monthDoomsdays[month - 1];
  steps.push({
    title: 'STEP 03 :: MONTH ANCHOR',
    input: `${month}/${day} (Leap: ${leap})`,
    result: `${month}/${monthAnchorDay}`,
    details: `Doomsday for month ${month} is the ${monthAnchorDay}${getDaySuffix(monthAnchorDay)}`
  });

  // 4. Summation
  const diff = day - monthAnchorDay;
  let result = (yearDoomsday + diff) % 7;
  if (result < 0) result += 7;

  steps.push({
    title: 'STEP 04 :: SUMMATION',
    input: `Target ${day} vs Anchor ${monthAnchorDay}`,
    result: DAYS[result].toUpperCase(),
    details: `Diff: ${diff} days. (${yearDoomsday} + ${diff}) mod 7 = ${result}`
  });

  return {
    steps,
    finalDay: DAYS[result],
    finalNumber: result
  };
};

const getDaySuffix = (d: number) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
