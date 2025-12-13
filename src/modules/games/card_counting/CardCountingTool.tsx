
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreMarkdownRenderer } from '../../../components/core/CoreMarkdownRenderer';
import { FUIButton } from '../../../components/core/FUIButton';
import { Deck, getHiLoValue } from './logic';
import type { Card } from './logic';
import styles from './CardCounting.module.scss';
import clsx from 'clsx';

const CardDisplay: React.FC<{ card: Card }> = ({ card }) => {
  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  const suitSymbol = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
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
  const [deck, setDeck] = useState(() => {
    const d = new Deck();
    d.shuffle();
    return d;
  });
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [runningCount, setRunningCount] = useState(0);
  const [cardsLeft, setCardsLeft] = useState(52);

  const handleDeal = () => {
    const card = deck.deal();
    if (card) {
      setCurrentCard(card);
      setRunningCount(prev => prev + getHiLoValue(card.rank));
      setCardsLeft(deck.remaining);
    }
  };

  const handleReset = () => {
    const d = new Deck();
    d.shuffle();
    setDeck(d);
    setCurrentCard(null);
    setRunningCount(0);
    setCardsLeft(52);
  };

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
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
            <span className={styles.statValue}>{cardsLeft}</span>
          </div>
        </div>

        <div className={styles.controls}>
          <FUIButton onClick={handleDeal} disabled={cardsLeft === 0} variant="solid">
            {t('action_deal')}
          </FUIButton>
          <FUIButton onClick={handleReset} variant="outline">
            {t('action_reset')}
          </FUIButton>
        </div>
      </FUIGlassPanel>

      <FUIGlassPanel className={styles.panel}>
        <CoreMarkdownRenderer content={t('guide')} />
      </FUIGlassPanel>
    </div>
  );
};
