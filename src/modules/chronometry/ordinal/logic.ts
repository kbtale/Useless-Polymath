export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

export const getDaysInMonth = (month: number, year: number): number => {
  const days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) return 29;
  return days[month];
};

export const getOrdinalDate = (day: number, month: number, year: number) => {
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(year)) daysInMonth[2] = 29;

  let ordinal = 0;
  for (let i = 1; i < month; i++) {
    ordinal += daysInMonth[i];
  }
  ordinal += day;

  const totalDays = isLeapYear(year) ? 366 : 365;
  const percentage = (ordinal / totalDays) * 100;

  return {
    ordinal,
    totalDays,
    percentage: percentage.toFixed(2),
    remaining: totalDays - ordinal
  };
};

export const getMonthFromOrdinal = (ordinal: number, year: number) => {
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(year)) daysInMonth[2] = 29;

  let currentOrdinal = ordinal;
  let month = 1;

  while (currentOrdinal > daysInMonth[month]) {
    currentOrdinal -= daysInMonth[month];
    month++;
  }

  return { month, day: currentOrdinal };
};
