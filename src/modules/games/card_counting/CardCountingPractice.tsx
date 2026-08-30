import clsx from 'clsx';
import type React from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import styles from './CardCounting.module.scss';
import { type Card, createStandardDeck, dealCard, getHiLoValue, shuffleDeck } from './logic';

const CardDisplay: React.FC<{ card: Card }> = memo(({ card }) => {
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
});

export const CardCountingPractice: React.FC = () => {
  const { t } = useTranslation('card_counting');

  const [, setDeck] = useState<Card[]>(() => shuffleDeck(createStandardDeck()));
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [trueRunningCount, setTrueRunningCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && !isFinished) {
      interval = setInterval(() => {
        setDeck((prevDeck) => {
          const { card, remainingDeck } = dealCard(prevDeck);
          if (card) {
            setCurrentCard(card);
            setTrueRunningCount((prev) => prev + getHiLoValue(card.rank));
          } else {
            setIsFinished(true);
            setIsActive(false);
            setCurrentCard(null);
          }
          return remainingDeck;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isActive, isFinished]);

  const startDrill = useCallback(() => {
    setDeck(shuffleDeck(createStandardDeck()));
    setIsActive(true);
    setIsFinished(false);
    setTrueRunningCount(0);
    setCurrentCard(null);
    setFeedback(null);
    setInput('');
  }, []);

  const checkAnswer = useCallback(() => {
    const val = parseInt(input, 10);
    if (Number.isNaN(val)) return;

    if (val === trueRunningCount) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  }, [input, trueRunningCount]);

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('practice_title')}</h2>

      <div className={styles.practiceContainer}>
        <div className={styles.dealerTable}>
          {isActive && currentCard ? (
            <CardDisplay card={currentCard} />
          ) : (
            <div
              style={{
                color: 'var(--text-dim, rgba(255,255,255,0.5))',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {isFinished ? t('feedback_finished') : t('practice_prompt')}
            </div>
          )}
        </div>

        {!isActive && !isFinished && (
          <FUIButton onClick={startDrill} variant="solid">
            Start
          </FUIButton>
        )}

        {isFinished && (
          <div
            style={{
              width: '100%',
              maxWidth: '300px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <p className={styles.label} style={{ textAlign: 'center' }}>
              {t('practice_question')}
            </p>

            <CoreBaseInput
              id="card-counting-answer-input"
              aria-label={t('practice_question')}
              value={input}
              onChangeValue={setInput}
              onEnter={checkAnswer}
              placeholder="0"
              className={styles.countInput}
              allowedChars={/^[0-9-]*$/}
            />

            {!feedback && (
              <FUIButton onClick={checkAnswer} variant="solid" style={{ width: '100%' }}>
                {t('submit')}
              </FUIButton>
            )}

            {feedback && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem',
                  color:
                    feedback === 'correct'
                      ? 'var(--text-highlight, #4ade80)'
                      : 'var(--color-error, #f87171)',
                  border: `1px solid ${
                    feedback === 'correct'
                      ? 'var(--text-highlight, #4ade80)'
                      : 'var(--color-error, #f87171)'
                  }`,
                  background: 'var(--bg-canvas)',
                  fontFamily: 'var(--font-mono)',
                  textAlign: 'center',
                }}
              >
                {t(feedback === 'correct' ? 'feedback_correct' : 'feedback_incorrect', {
                  count: trueRunningCount,
                })}
              </div>
            )}

            {feedback && (
              <FUIButton onClick={startDrill} variant="outline" style={{ marginTop: '1rem' }}>
                Retry
              </FUIButton>
            )}
          </div>
        )}
      </div>
    </FUIGlassPanel>
  );
};
