import { describe, expect, it } from 'vitest';
import { ELEMENTS, getElementByNumber, getElementBySymbol } from './logic';

describe('Periodic Table Logic', () => {
  it('contains 103 elements', () => {
    expect(ELEMENTS.length).toBe(103);
  });

  it('retrieves element by symbol case-insensitively', () => {
    const hydrogen = getElementBySymbol('H');
    expect(hydrogen).toBeDefined();
    expect(hydrogen?.number).toBe(1);
    expect(hydrogen?.category).toBe('nonmetal');

    const gold = getElementBySymbol('au');
    expect(gold).toBeDefined();
    expect(gold?.number).toBe(79);
    expect(gold?.category).toBe('transition');
  });

  it('retrieves element by atomic number', () => {
    const helium = getElementByNumber(2);
    expect(helium).toBeDefined();
    expect(helium?.symbol).toBe('He');
    expect(helium?.category).toBe('noble');
  });

  it('returns undefined for nonexistent elements', () => {
    expect(getElementBySymbol('Zz')).toBeUndefined();
    expect(getElementByNumber(999)).toBeUndefined();
  });
});
