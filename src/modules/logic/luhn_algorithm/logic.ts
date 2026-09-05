const doubleAndSumDigits = (digit: number): number => {
  const doubled = digit * 2;
  return doubled > 9 ? doubled - 9 : doubled;
};

export const calculateLuhnSum = (numericString: string): number => {
  const digits = numericString.replace(/\D/g, '').split('').map(Number);
  let checksumTotal = 0;
  let shouldDoubleCurrentDigit = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let processedDigit = digits[i];
    if (shouldDoubleCurrentDigit) {
      processedDigit = doubleAndSumDigits(processedDigit);
    }
    checksumTotal += processedDigit;
    shouldDoubleCurrentDigit = !shouldDoubleCurrentDigit;
  }
  return checksumTotal;
};

export const calculateCheckDigit = (payloadWithoutCheckDigit: string): number => {
  const checkSumWithZeroPadded = calculateLuhnSum(`${payloadWithoutCheckDigit}0`);
  const remainder = checkSumWithZeroPadded % 10;
  return remainder === 0 ? 0 : 10 - remainder;
};

export const isValidLuhn = (candidateNumber: string): boolean => {
  const sanitized = candidateNumber.replace(/\D/g, '');
  if (sanitized.length < 2) return false;
  return calculateLuhnSum(sanitized) % 10 === 0;
};

export const generateLuhnNumber = (totalLength: number): string => {
  let basePayload = '';
  for (let i = 0; i < totalLength - 1; i++) {
    basePayload += Math.floor(Math.random() * 10);
  }
  const checkDigit = calculateCheckDigit(basePayload);
  return `${basePayload}${checkDigit}`;
};
