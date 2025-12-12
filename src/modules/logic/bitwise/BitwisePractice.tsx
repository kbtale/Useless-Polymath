import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBitRow } from '../../../components/core/CoreBitRow';
import { FUIButton } from '../../../components/core/FUIButton';
import { calculateBitwise } from './logic';
import type { BitwiseOperation } from './logic';
import styles from './Bitwise.module.scss';
import { useTranslation } from 'react-i18next';

export const BitwisePractice: React.FC = () => {
  const { t } = useTranslation(['bitwise', 'common']);

  const [question, setQuestion] = useState<{a: number, b: number, op: BitwiseOperation} | null>(null);
  const [userResult, setUserResult] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  if (!question) {
    // Init question
    generateQuestion();
  }

  function generateQuestion() {
    const ops: BitwiseOperation[] = ['AND', 'OR', 'XOR']; // SImple ops for now
    const nextOp = ops[Math.floor(Math.random() * ops.length)];
    const a = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    
    setQuestion({ a, b, op: nextOp });
    setUserResult(0);
    setFeedback(null);
  }

  const checkAnswer = () => {
    if (!question) return;
    const expected = calculateBitwise(question.a, question.b, question.op);
    
    if (userResult === expected) {
        setFeedback('correct');
        setScore(s => s + 10 + streak * 2);
        setStreak(s => s + 1);
        setTimeout(generateQuestion, 1500);
    } else {
        setFeedback('incorrect');
        setStreak(0);
    }
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('practice_mode', { ns: 'common' })}</h2>
      
      <div className={styles.practiceContainer}>
        
         <div className={styles.scoreBoard}>
            <div>{t('score', { ns: 'common' })}: <span>{score}</span></div>
            <div>{t('streak', { ns: 'common' })}: <span>{streak}</span></div>
        </div>

        {question && (
            <div className={styles.toolLayout} style={{ width: '100%' }}>
                
                <div className={styles.bitRowWrapper}>
                    <div className={styles.sectionTitle}>A ({question.a})</div>
                    <CoreBitRow value={question.a} onChange={() => {}} bits={8} interactive={false} />
                </div>

                <div className={styles.operatorDisplay}>
                    {question.op}
                </div>

                <div className={styles.bitRowWrapper}>
                    <div className={styles.sectionTitle}>B ({question.b})</div>
                    <CoreBitRow value={question.b} onChange={() => {}} bits={8} interactive={false} />
                </div>

                <div className={styles.resultWrapper}>
                    <div className={styles.sectionTitle}>{t('result_click')} ({userResult})</div>
                    <CoreBitRow 
                        value={userResult} 
                        onChange={setUserResult} 
                        bits={8} 
                        interactive={true} 
                    />
                </div>
            </div>
        )}

        {feedback === 'correct' ? (
             <div className={`${styles.feedback} ${styles.correct}`}>CORRECT</div>
        ) : feedback === 'incorrect' ? (
             <div className={`${styles.feedback} ${styles.incorrect}`}>INCORRECT</div>
        ) : (
            <FUIButton onClick={checkAnswer}>CHECK</FUIButton>
        )}

      </div>
    </FUIGlassPanel>
  );
};
