
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
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

export const CardCountingPractice: React.FC = () => {
  const { t } = useTranslation('card_counting');
  
  const [deck] = useState(() => new Deck()); // Single deck instance for now
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [trueRunningCount, setTrueRunningCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Interval for auto-dealing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && !isFinished) {
      interval = setInterval(() => {
        const card = deck.deal();
        if (card) {
          setCurrentCard(card);
          setTrueRunningCount(prev => prev + getHiLoValue(card.rank));
        } else {
          setIsFinished(true);
          setIsActive(false);
          setCurrentCard(null);
        }
      }, 1500); // 1.5s per card speed
    }
    return () => clearInterval(interval);
  }, [isActive, isFinished, deck]);

  const startDrill = () => {
    deck.reset();
    deck.shuffle();
    setIsActive(true);
    setIsFinished(false);
    setTrueRunningCount(0);
    setCurrentCard(null);
    setFeedback(null);
    setInput('');
  };

  const checkAnswer = () => {
    const val = parseInt(input, 10);
    if (isNaN(val)) return;

    if (val === trueRunningCount) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('practice_title')}</h2>
      
      <div className={styles.practiceContainer}>
        <div className={styles.dealerTable}>
          {isActive && currentCard ? (
            <CardDisplay card={currentCard} />
          ) : (
             <div style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
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
          <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p className={styles.label} style={{ textAlign: 'center' }}>{t('practice_question')}</p>
            
            <CoreBaseInput 
              value={input}
              onChangeValue={setInput}
              onEnter={checkAnswer}
              placeholder="0"
              className="text-center font-mono text-xl"
              allowedChars={/^[0-9\-]*$/}
            />

            {!feedback && (
              <FUIButton onClick={checkAnswer} variant="solid" style={{ width: '100%' }}>
                {t('submit')}
              </FUIButton>
            )}

            {feedback && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '0.5rem', 
                color: feedback === 'correct' ? '#4ade80' : '#f87171',
                border: `1px solid ${feedback === 'correct' ? '#4ade80' : '#f87171'}`,
                background: 'rgba(0,0,0,0.2)',
                fontFamily: 'monospace',
                textAlign: 'center'
              }}>
                {t(feedback === 'correct' ? 'feedback_correct' : 'feedback_incorrect', { count: trueRunningCount })}
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
