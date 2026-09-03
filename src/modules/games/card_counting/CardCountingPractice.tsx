import clsx from 'clsx';
import type React from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '@/components/core/CoreBaseInput';
import { FUIButton } from '@/components/core/FUIButton';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
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
      <div className={styles.cornerFlipped}>
        <span>{card.rank}</span>
        <span>{suitSymbol}</span>
      </div>
    </div>
  );
});

export const CardCountingPractice: React.FC = () => {
  const { t } = useTranslation(['card_counting', 'common']);

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
            <div className={styles.promptPlaceholder}>
              {isFinished ? t('feedback_finished') : t('practice_prompt')}
            </div>
          )}
        </div>

        {!isActive && !isFinished && (
          <FUIButton onClick={startDrill} variant="solid">
            {t('start', { ns: 'common' })}
          </FUIButton>
        )}

        {isFinished && (
          <div className={styles.answerColumn}>
            <p className={clsx(styles.label, styles.labelCenter)}>
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
              <FUIButton onClick={checkAnswer} variant="solid" className={styles.wideButton}>
                {t('submit')}
              </FUIButton>
            )}

            {feedback && (
              <div
                className={styles.feedbackBox}
                style={{
                  color:
                    feedback === 'correct'
                      ? 'var(--text-highlight)'
                      : 'var(--color-error)',
                  border: `1px solid ${
                    feedback === 'correct' ? 'var(--text-highlight)' : 'var(--color-error)'
                  }`,
                }}
              >
                {t(feedback === 'correct' ? 'feedback_correct' : 'feedback_incorrect', {
                  count: trueRunningCount,
                })}
              </div>
            )}

            {feedback && (
              <FUIButton onClick={startDrill} variant="outline" className={clsx(styles.wideButton, styles.retryButton)}>
                {t('retry', { ns: 'common' })}
              </FUIButton>
            )}
          </div>
        )}
      </div>
    </FUIGlassPanel>
  );
};
