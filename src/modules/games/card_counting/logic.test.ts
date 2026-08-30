import { describe, expect, it } from 'vitest';
import { createStandardDeck, dealCard, getHiLoValue, shuffleDeck, SUITS, type Card } from './logic';

describe('Card Counting Logic', () => {
  it('creates 52-card deck with 13 cards per suit', () => {
    const deck = createStandardDeck();
    expect(deck.length).toBe(52);

    for (const suit of SUITS) {
      const suitCards = deck.filter((c) => c.suit === suit);
      expect(suitCards.length).toBe(13);
    }
  });

  it('maps card ranks to Hi-Lo values', () => {
    expect(getHiLoValue('2')).toBe(1);
    expect(getHiLoValue('6')).toBe(1);
    expect(getHiLoValue('7')).toBe(0);
    expect(getHiLoValue('8')).toBe(0);
    expect(getHiLoValue('9')).toBe(0);
    expect(getHiLoValue('10')).toBe(-1);
    expect(getHiLoValue('J')).toBe(-1);
    expect(getHiLoValue('Q')).toBe(-1);
    expect(getHiLoValue('K')).toBe(-1);
    expect(getHiLoValue('A')).toBe(-1);
  });

  it('calculates total count of 0 for complete deck', () => {
    const deck = createStandardDeck();
    const totalCount = deck.reduce((acc, card) => acc + getHiLoValue(card.rank), 0);
    expect(totalCount).toBe(0);
  });

  it('shuffles deck without mutating source deck', () => {
    const original = createStandardDeck();
    const originalCopy = [...original];
    const shuffled = shuffleDeck(original);

    expect(shuffled.length).toBe(52);
    expect(original).toEqual(originalCopy);
    expect(shuffled).not.toBe(original);
  });

  it('deals card and returns remaining deck', () => {
    const deck = createStandardDeck();
    const { card, remainingDeck } = dealCard(deck);

    expect(card).toBeDefined();
    expect(remainingDeck.length).toBe(51);
    expect(deck.length).toBe(52);
  });

  it('handles empty deck', () => {
    const emptyDeck: Card[] = [];
    const { card, remainingDeck } = dealCard(emptyDeck);

    expect(card).toBeUndefined();
    expect(remainingDeck).toEqual([]);
  });
});
