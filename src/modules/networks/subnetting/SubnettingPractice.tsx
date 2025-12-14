import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { calculateSubnet } from './logic';
import styles from './Subnetting.module.scss';
import clsx from 'clsx';

export const SubnettingPractice: React.FC = () => {
  const { t } = useTranslation('subnetting');
  const [targetIp, setTargetIp] = useState('');
  const [targetCidr, setTargetCidr] = useState(24);
  const [targetType, setTargetType] = useState<'network' | 'broadcast' | 'hosts'>('broadcast');
  
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [streak, setStreak] = useState(0);

  const generateProblem = () => {
    // Random IP
    const ip = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
    // Random CIDR /16 to /30
    const cidr = Math.floor(Math.random() * (30 - 16 + 1)) + 16;
    const type = Math.random() > 0.6 ? 'broadcast' : Math.random() > 0.3 ? 'network' : 'hosts';

    setTargetIp(ip);
    setTargetCidr(cidr);
    setTargetType(type);
    setUserAnswer('');
    setFeedback('idle');
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const handleSubmit = () => {
    const result = calculateSubnet(targetIp, targetCidr);
    if (!result) return;

    let correct = '';
    if (targetType === 'network') correct = result.network;
    else if (targetType === 'broadcast') correct = result.broadcast;
    else if (targetType === 'hosts') correct = result.hosts.toString();

    if (userAnswer.trim() === correct) {
      setFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(generateProblem, 1500);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  const getQuestionText = () => {
    switch (targetType) {
      case 'network': return t('label_network');
      case 'broadcast': return t('label_broadcast');
      case 'hosts': return t('label_hosts');
      default: return '';
    }
  };

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
             <h2 className={styles.title}>{t('practice_title')}</h2>
             <span style={{ fontFamily: 'JetBrains Mono', color: '#4ade80' }}>{t('streak', { ns: 'common' })}: {streak}</span>
          </div>

          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <p className={styles.label}>{t('label_calculate')}</p>
            <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0', color: '#fff' }}>{getQuestionText()}</h3>
            <p className={styles.label}>{t('label_for')}</p>
            <div style={{ fontSize: '2rem', fontFamily: 'JetBrains Mono', marginTop: '1rem' }}>
              {targetIp} / {targetCidr}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <CoreBaseInput
              value={userAnswer}
              onChangeValue={setUserAnswer}
              placeholder={targetType === 'hosts' ? '123' : 'x.x.x.x'}
              className={clsx(
                feedback === 'correct' && 'border-green-500 text-green-500', 
                feedback === 'incorrect' && 'border-red-500 text-red-500'
              )}
            />
          </div>

          <FUIButton onClick={handleSubmit}>{t('execute', { ns: 'common' })}</FUIButton>

          {feedback === 'incorrect' && (
             <p style={{ color: '#ff6b6b', fontFamily: 'JetBrains Mono' }}>{t('incorrect_try_again', { ns: 'common' })}</p>
          )}
        </div>
      </FUIGlassPanel>
    </div>
  );
};
