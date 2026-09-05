import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePracticeStreak } from '@/hooks/usePracticeStreak';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import { CoreBaseInput } from '@/components/core/CoreBaseInput';
import { FUIButton } from '@/components/core/FUIButton';
import { calculateSubnet } from './logic';
import styles from './Subnetting.module.scss';
import clsx from 'clsx';

export const SubnettingPractice: React.FC = () => {
  const { streak, setStreak } = usePracticeStreak('subnetting');
  const getRandomProblem = () => {
    const ip = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
    const cidr = Math.floor(Math.random() * (30 - 16 + 1)) + 16;
    const type = Math.random() > 0.6 ? 'broadcast' : Math.random() > 0.3 ? 'network' : 'hosts';
    return { ip, cidr, type };
  };

  const { t } = useTranslation('subnetting');
  const [problem, setProblem] = useState(getRandomProblem);
  const targetIp = problem.ip;
  const targetCidr = problem.cidr;
  const targetType = problem.type;

  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const generateProblem = () => {
    setProblem(getRandomProblem());
    setUserAnswer('');
    setFeedback('idle');
  };

  const handleSubmit = () => {
    const result = calculateSubnet(targetIp, targetCidr);
    if (!result) return;

    let correct = '';
    if (targetType === 'network') correct = result.network;
    else if (targetType === 'broadcast') correct = result.broadcast;
    else if (targetType === 'hosts') correct = result.hosts.toString();

    if (userAnswer.trim() === correct) {
      setFeedback('correct');
      setStreak((s) => s + 1);
      setTimeout(generateProblem, 1500);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  const getQuestionText = () => {
    switch (targetType) {
      case 'network':
        return t('label_network');
      case 'broadcast':
        return t('label_broadcast');
      case 'hosts':
        return t('label_hosts');
      default:
        return '';
    }
  };

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
          <div className={styles.headerRow}>
            <h2 className={styles.title}>{t('practice_title')}</h2>
            <span className={styles.streakValue}>
              {t('streak', { ns: 'common' })}: {streak}
            </span>
          </div>

          <div className={styles.questionBlock}>
            <p className={styles.label}>{t('label_calculate')}</p>
            <h3 className={styles.questionTitle}>{getQuestionText()}</h3>
            <p className={styles.label}>{t('label_for')}</p>
            <div className={styles.ipDisplay}>
              {targetIp} / {targetCidr}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <CoreBaseInput
              value={userAnswer}
              onChangeValue={setUserAnswer}
              placeholder={targetType === 'hosts' ? '123' : 'x.x.x.x'}
              className={clsx(
                styles.practiceInput,
                feedback === 'correct' && styles.correct,
                feedback === 'incorrect' && styles.incorrect,
              )}
            />
          </div>

          <FUIButton onClick={handleSubmit}>{t('submit', { ns: 'common' })}</FUIButton>

          {feedback === 'incorrect' && (
            <p className={styles.errorText}>
              {t('incorrect_try_again', { ns: 'common' })}
            </p>
          )}
        </div>
      </FUIGlassPanel>
    </div>
  );
};
