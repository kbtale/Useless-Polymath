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
  // Doomsday for the year
  const doomsday = getDoomsday(year);

  // Doomsdays for each month
  // Jan/Feb depend on leap year
  const leap = isLeapYear(year);
  const monthDoomsdays = [
    leap ? 4 : 3,  // Jan (4th or 3rd)
    leap ? 29 : 28, // Feb (29th or 28th)
    14, // Mar (Pi day)
    4,  // Apr (4/4)
    9,  // May (9/5)
    6,  // Jun (6/6)
    11, // Jul (11/7)
    8,  // Aug (8/8)
    5,  // Sep (5/9)
    10, // Oct (10/10)
    7,  // Nov (7/11)
    12  // Dec (12/12)
  ];

  const monthDoomsday = monthDoomsdays[month - 1];
  
  // Calculate difference
  const diff = day - monthDoomsday;
  
  // Result
  let result = (doomsday + diff) % 7;
  if (result < 0) result += 7;
  
  return result;
};

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
