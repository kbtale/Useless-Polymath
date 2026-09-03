import { describe, it, expect } from 'vitest';
import { MORSE_CODE, REVERSE_MORSE, encodeMode, decodeMorse } from './logic';

describe('Morse Code Logic', () => {
  it('should map characters to Morse code', () => {
    expect(MORSE_CODE['A']).toBe('.-');
    expect(REVERSE_MORSE['.-']).toBe('A');
  });

  it('should encode text to Morse code', () => {
    expect(encodeMode('SOS')).toBe('... --- ...');
  });

  it('should decode Morse code to text', () => {
    expect(decodeMorse('... --- ...')).toBe('SOS');
  });

  it('should roundtrip encode and decode', () => {
    expect(decodeMorse(encodeMode('HELLO'))).toBe('HELLO');
  });

  it('should separate words with a slash', () => {
    expect(encodeMode('HELLO WORLD')).toBe('.... . .-.. .-.. --- / .-- --- .-. .-.. -..');
    expect(MORSE_CODE[' ']).toBe('/');
  });

  it('should use a question mark for unknown characters', () => {
    expect(encodeMode('§')).toBe('?');
    expect(decodeMorse('?')).toBe('?');
  });
});