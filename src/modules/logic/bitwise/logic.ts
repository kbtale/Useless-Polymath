export type BitwiseOperation = 'AND' | 'OR' | 'XOR' | 'NOT' | 'LSHIFT' | 'RSHIFT';

export const calculateBitwise = (a: number, b: number, op: BitwiseOperation): number => {
  switch (op) {
    case 'AND':
      return a & b & 0xff;
    case 'OR':
      return (a | b) & 0xff;
    case 'XOR':
      return (a ^ b) & 0xff;
    case 'NOT':
      return ~a & 0xff;
    case 'LSHIFT':
      return (a << b) & 0xff;
    case 'RSHIFT':
      return (a >>> b) & 0xff;
    default:
      return 0;
  }
};

export const OPERATIONS: { value: BitwiseOperation; label: string }[] = [
  { value: 'AND', label: 'AND (&)' },
  { value: 'OR', label: 'OR (|)' },
  { value: 'XOR', label: 'XOR (^)' },
  { value: 'NOT', label: 'NOT (~)' },
  { value: 'LSHIFT', label: 'LEFT SHIFT (<<)' },
  { value: 'RSHIFT', label: 'RIGHT SHIFT (>>)' },
];
