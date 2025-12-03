import React, { useState, useEffect } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { BitBulb } from './components/BitBulb';
import { getActivePowers } from './logic';

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
    <FUIGlassPanel style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <FUIButton variant={mode === 'write' ? 'solid' : 'outline'} onClick={() => setMode('write')}>WRITE (DEC to BIN)</FUIButton>
          <FUIButton variant={mode === 'read' ? 'solid' : 'outline'} onClick={() => setMode('read')}>READ (BIN to DEC)</FUIButton>
        </div>
        <div style={{ fontFamily: 'Orbitron', color: '#FFD700' }}>STREAK: {streak}</div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontFamily: 'Rajdhani', color: 'rgba(255,255,255,0.7)' }}>TARGET</div>
        {mode === 'write' ? (
          <div style={{ fontSize: '3rem', fontFamily: 'Orbitron', color: '#BD00FF' }}>{target}</div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <input 
            type="number" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkReadAnswer()}
            placeholder="Enter Decimal Value"
            style={{ 
              background: 'rgba(0,0,0,0.3)', 
              border: '1px solid rgba(0,243,255,0.3)', 
              color: 'white', 
              padding: '0.5rem',
              fontFamily: 'Orbitron',
              fontSize: '1.5rem',
              width: '200px',
              textAlign: 'center'
            }}
          />
          <FUIButton onClick={checkReadAnswer}>CHECK</FUIButton>
        </div>
      )}

      {feedback && (
        <div style={{ 
          marginTop: '2rem', 
          textAlign: 'center', 
          padding: '1rem',
          background: feedback === 'correct' ? 'rgba(0, 243, 255, 0.2)' : 'rgba(255, 0, 60, 0.2)',
          border: `1px solid ${feedback === 'correct' ? '#00F3FF' : '#FF003C'}`,
          color: feedback === 'correct' ? '#00F3FF' : '#FF003C',
          fontFamily: 'Orbitron'
        }}>
          {feedback === 'correct' ? 'SYSTEM SYNCED' : 'SYNC FAILURE'}
        </div>
      )}
    </FUIGlassPanel>
  );
};
