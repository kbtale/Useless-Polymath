import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIButton } from '@/components/core/FUIButton';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import styles from './CardCounting.module.scss';
import { type Card, createStandardDeck, dealCard, getHiLoValue, shuffleDeck } from './logic';

const CardDisplay: React.FC<{ card: Card }> = ({ card }) => {
  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  const suitSymbol = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠',
  }[card.suit];

  return (
    <div className={clsx(styles.card, isRed ? styles.red : styles.black)}>
      <div className={styles.corner}>
        <span>{card.rank}</span>
        <span>{suitSymbol}</span>
      </div>
      <div className={styles.center}>{suitSymbol}</div>
      <div className={styles.corner} style={{ transform: 'rotate(180deg)' }}>
        <span>{card.rank}</span>
        <span>{suitSymbol}</span>
      </div>
    </div>
  );
};

export const CardCountingTool: React.FC = () => {
  const { t } = useTranslation('card_counting');
  const [deck, setDeck] = useState<Card[]>(() => shuffleDeck(createStandardDeck()));
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [runningCount, setRunningCount] = useState(0);

  const handleDeal = () => {
    setDeck((prevDeck) => {
      const { card, remainingDeck } = dealCard(prevDeck);
      if (card) {
        setCurrentCard(card);
        setRunningCount((prev) => prev + getHiLoValue(card.rank));
      }
      return remainingDeck;
    });
  };

  const handleReset = () => {
    setDeck(shuffleDeck(createStandardDeck()));
    setCurrentCard(null);
    setRunningCount(0);
  };

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
          <h2 className={styles.title}>{t('title')}</h2>

          <div className={styles.dealerTable}>
            {currentCard ? (
              <CardDisplay card={currentCard} />
            ) : (
              <div style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                [DECK READY]
              </div>
            )}
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>{t('label_running_count')}</span>
              <span className={styles.statValue}>{runningCount}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>{t('label_cards_left')}</span>
              <span className={styles.statValue}>{deck.length}</span>
            </div>
          </div>

          <div className={styles.controls}>
            <FUIButton onClick={handleDeal} disabled={deck.length === 0} variant="solid">
              {t('action_deal')}
            </FUIButton>
            <FUIButton onClick={handleReset} variant="outline">
              {t('action_reset')}
            </FUIButton>
          </div>
        </div>
      </FUIGlassPanel>
    </div>
  );
};
