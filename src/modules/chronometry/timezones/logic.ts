export interface TimeZone {
  id: string;
  name: string;
  offset: number;
}

export const COMMON_ZONES: TimeZone[] = [
  { id: 'utc', name: 'UTC (London)', offset: 0 },
  { id: 'ny', name: 'New York (EST)', offset: -5 },
  { id: 'la', name: 'Los Angeles (PST)', offset: -8 },
  { id: 'tokyo', name: 'Tokyo (JST)', offset: 9 },
  { id: 'sydney', name: 'Sydney (AEDT)', offset: 11 },
  { id: 'paris', name: 'Paris (CET)', offset: 1 },
  { id: 'moscow', name: 'Moscow (MSK)', offset: 3 },
];

export const calculateDestinationTime = (
  localHour: number,
  originOffset: number,
  destOffset: number,
): { hour: number; dayOffset: number } => {
  const utcHour = localHour - originOffset;

  let destHour = utcHour + destOffset;
  let dayOffset = 0;

  while (destHour >= 24) {
    destHour -= 24;
    dayOffset += 1;
  }
  while (destHour < 0) {
    destHour += 24;
    dayOffset -= 1;
  }

  return { hour: destHour, dayOffset };
};
