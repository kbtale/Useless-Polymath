import { useCallback } from 'react';

export const useBaseConversion = () => {
  const convert = useCallback((value: string, fromBase: number, toBase: number): string => {
    if (!value) return '';

    // Handle large numbers? standard parseInt/toString handles up to base 36.
    // Base 64 would require custom logic.
    // Bases: 2 (Bin), 8 (Oct), 10 (Dec), 16 (Hex).
    
    try {
        const decimalValue = parseInt(value, fromBase);
        if (isNaN(decimalValue)) return 'NaN';
        
        if (toBase === 10) return decimalValue.toString();
        
        const result = decimalValue.toString(toBase);
        return toBase === 16 ? result.toUpperCase() : result;
    } catch (e) {
        return 'Error';
    }
  }, []);

  const isValidChar = useCallback((char: string, base: number): boolean => {
    // Regex generation based on base
    if (base === 2) return /[0-1]/.test(char);
    if (base === 8) return /[0-7]/.test(char);
    if (base === 10) return /[0-9]/.test(char);
    if (base === 16) return /[0-9A-Fa-f]/.test(char);
    return true;
  }, []);

  return { convert, isValidChar };
};
