export const calculateDoublingTime = (rate: number): number => {
  if (rate <= 0) return Infinity;
  return 72 / rate;
};

export const preciseDoublingTime = (rate: number): number => {
  if (rate <= 0) return Infinity;
  return Math.log(2) / Math.log(1 + rate / 100);
};
