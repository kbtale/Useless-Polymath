export const calculateDoublingTime = (rate: number): number => {
  if (rate <= 0) return Infinity; // Technically never sums to double if 0 or negative
  return 72 / rate;
};

export const preciseDoublingTime = (rate: number): number => {
    if (rate <= 0) return Infinity;
    // ln(2) / ln(1 + r/100)
    return Math.log(2) / Math.log(1 + (rate / 100));
};
