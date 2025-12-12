
export type BitwiseOperation = 'AND' | 'OR' | 'XOR' | 'NOT' | 'LSHIFT' | 'RSHIFT';

export const calculateBitwise = (a: number, b: number, op: BitwiseOperation): number => {
  switch (op) {
    case 'AND': return a & b;
    case 'OR': return a | b;
    case 'XOR': return a ^ b;
    case 'NOT': return ~a; // Usually we care about a specific bit width, but JS handles 32-bit signed
    case 'LSHIFT': return a << b;
    case 'RSHIFT': return a >> b;
    default: return 0;
  }
};

// Helper to keep numbers within 8-bit or 16-bit range if desired, 
// though JS bitwise ops are 32-bit signed integers.
// We'll stick to displaying what the CoreBitRow handles (usually 8 or 16 bits).

export const OPERATIONS: { value: BitwiseOperation; label: string }[] = [
  { value: 'AND', label: 'AND (&)' },
  { value: 'OR', label: 'OR (|)' },
  { value: 'XOR', label: 'XOR (^)' },
  { value: 'NOT', label: 'NOT (~)' },
  { value: 'LSHIFT', label: 'LEFT SHIFT (<<)' },
  { value: 'RSHIFT', label: 'RIGHT SHIFT (>>)' },
];
