import React, { useState, useEffect } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { BitBulb } from './components/BitBulb';
import { getActivePowers } from './logic';
import styles from './Binary.module.scss';
import clsx from 'clsx';

export const BinaryPractice: React.FC = () => {
  const [target, setTarget] = useState(0);
  const [current, setCurrent] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mode, setMode] = useState<'read' | 'write'>('write');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [inputValue, setInputValue] = useState('');

  const generateTarget = () => {
    setTarget(Math.floor(Math.random() * 255) + 1);
    setCurrent(0);
    setInputValue('');
    setFeedback(null);
  };

  useEffect(() => {
    generateTarget();
  }, [mode]);

  const activePowers = getActivePowers(current);
  const targetPowers = getActivePowers(target);

  const toggleBit = (bitValue: number) => {
    if (mode === 'read') return; // Read only in read mode
    
    let newValue = current;
    if (activePowers.includes(bitValue)) {
      newValue -= bitValue;
    } else {
      newValue += bitValue;
    }
    setCurrent(newValue);
    
    // Auto-check in write mode
    if (newValue === target) {
      handleSuccess();
    }
  };

  const handleSuccess = () => {
    setFeedback('correct');
    setStreak(s => s + 1);
    setTimeout(generateTarget, 1000);
  };

  const checkReadAnswer = () => {
    if (parseInt(inputValue) === target) {
      handleSuccess();
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.controls}>
          <FUIButton variant={mode === 'write' ? 'solid' : 'outline'} onClick={() => setMode('write')}>WRITE (DEC to BIN)</FUIButton>
          <FUIButton variant={mode === 'read' ? 'solid' : 'outline'} onClick={() => setMode('read')}>READ (BIN to DEC)</FUIButton>
        </div>
        <div className={styles.streak}>STREAK: {streak}</div>
      </div>

      <div className={styles.targetDisplay}>
        <div className={styles.label}>TARGET</div>
        {mode === 'write' ? (
          <div className={styles.targetValue}>{target}</div>
        ) : (
          <div className={styles.bulbContainer}>
             {[128, 64, 32, 16, 8, 4, 2, 1].map(bit => (
              <BitBulb 
                key={bit} 
                value={bit} 
                active={targetPowers.includes(bit)} 
                onClick={() => {}} 
                disabled
              />
            ))}
          </div>
        )}
      </div>

      {mode === 'write' && (
        <div className={styles.bulbContainer}>
          {[128, 64, 32, 16, 8, 4, 2, 1].map(bit => (
            <BitBulb 
              key={bit} 
              value={bit} 
              active={activePowers.includes(bit)} 
              onClick={() => toggleBit(bit)} 
            />
          ))}
        </div>
      )}

      {mode === 'read' && (
        <div className={styles.inputArea}>
          <input 
            type="number" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkReadAnswer()}
            placeholder="Enter Decimal Value"
            className={styles.input}
          />
          <FUIButton onClick={checkReadAnswer}>CHECK</FUIButton>
        </div>
      )}

      {feedback && (
        <div className={clsx(styles.feedback, styles[feedback])}>
          {feedback === 'correct' ? 'SYSTEM SYNCED' : 'SYNC FAILURE'}
        </div>
      )}
    </FUIGlassPanel>
  );
};
