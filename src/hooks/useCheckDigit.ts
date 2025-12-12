import { useState, useCallback } from 'react';

type Algorithm = 'luhn' | 'ean13';

export const useCheckDigit = (algorithm: Algorithm) => {
  const [isValid, setIsValid] = useState(false);
  const [checkDigit, setCheckDigit] = useState<number | null>(null);

  const calculate = useCallback((input: string) => {
    // Remove non-numeric chars
    const cleanInput = input.replace(/\D/g, '');
    
    if (!cleanInput) {
      setIsValid(false);
      setCheckDigit(null);
      return;
    }

    if (algorithm === 'luhn') {
      // Luhn Algorithm
      // 1. Double every second digit from the right
      // 2. Sum all digits (if result > 9, sum digits of result or subtract 9)
      // 3. Total sum % 10 === 0
      
      let sum = 0;
      let shouldDouble = false; // Start from right (check digit included usually, or calculated?)
      // Use case: Input includes check digit -> verify.
      // Input excludes check digit -> calculate.
      
      // Let's assume input is the payload + check digit candidate for validation
      // loop backwards
      for (let i = cleanInput.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanInput.charAt(i));

        if (shouldDouble) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
      }
      
      setIsValid(sum % 10 === 0);
      
      // Calculate check digit for a PAYLOAD (input without check digit)
      // This is slightly distinct.
      // E.g. generateCheckDigit
    } else if (algorithm === 'ean13') {
      // EAN-13 (also EAN-8, UPC, etc uses similar weightings)
      // Weights 1 and 3 somewhat alternating.
      // From right: check digit is pos 0 (weight 1?), pos 1 (weight 3)...
      // Check digit = (10 - (sum % 10)) % 10
      
      // Validation:
      if (cleanInput.length !== 13) {
          // EAN-13 specific
          // For generic, maybe strict length not required?
      }
      
      let sum = 0;
      // Loop all including check digit
      for (let i = 0; i < cleanInput.length; i++) {
         const digit = parseInt(cleanInput.charAt(i));
         // Determining weight depends on length matching standard
         // EAN-13: last digit (13th, index 12) is check.
         // digit at 0 (odd pos from left) -> weight 1
         // digit at 1 (even pos from left) -> weight 3
         // ...
         // Actually weights alternate 1, 3, 1, 3... for first 12.
         
         const weight = (i % 2 === 0) ? 1 : 3;
         sum += digit * weight;
      }
       
      setIsValid(sum % 10 === 0);
    }
  }, [algorithm]);

  const generateCheckDigit = useCallback((payload: string): number => {
    const cleanPayload = payload.replace(/\D/g, '');
    
    if (algorithm === 'luhn') {
        let sum = 0;
        let shouldDouble = true; // For the NEXT digit (which would be check digit's neighbor), we double?
        // Wait, standard: from rightmost payload digit, moving left:
        // payload: ... d2 d1 d0
        // check digit will be at right. So d0 is at index 1 relative to check digit.
        // So d0 doubles.
        
        for (let i = cleanPayload.length - 1; i >= 0; i--) {
            let digit = parseInt(cleanPayload.charAt(i));
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        
        return (10 - (sum % 10)) % 10;
        
    } else { // EAN-13 (payload length 12)
        let sum = 0;
        for (let i = 0; i < cleanPayload.length; i++) {
            const digit = parseInt(cleanPayload.charAt(i));
            // Weights 1, 3, 1, 3... 
            const weight = (i % 2 === 0) ? 1 : 3;
            sum += digit * weight;
        }
        return (10 - (sum % 10)) % 10;
    }
  }, [algorithm]);

  return { isValid, checkDigit, calculate, generateCheckDigit };
};
