
export const UNITS = [
  { label: 'KB', power10: 3, power2: 10 },
  { label: 'MB', power10: 6, power2: 20 },
  { label: 'GB', power10: 9, power2: 30 },
  { label: 'TB', power10: 12, power2: 40 },
  { label: 'PB', power10: 15, power2: 50 },
];

export const calculateStorage = (amount: number, unitIndex: number) => {
  if (isNaN(amount)) return null;
  const unit = UNITS[unitIndex];
  
  // Marketed (Decimal) Bytes
  const marketBytes = amount * Math.pow(10, unit.power10);

  // Binary Bytes (IEC) represented in the SAME UNIT (e.g. displayed as "GB" but really GiB math)
  // Windows takes bytes and divides by 1024^power.
  // So: MarketBytes / (2^power2)
  const windowsValue = marketBytes / Math.pow(2, unit.power2);
  
  return {
    marketBytes,
    windowsValue,
    unitLabel: unit.label, // Windows uses same label 'GB' for GiB usually
    diffPercent: ((amount - windowsValue) / amount) * 100
  };
};
