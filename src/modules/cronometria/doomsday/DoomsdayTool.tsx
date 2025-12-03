import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { getDayOfWeek, DAYS } from './logic';

export const DoomsdayTool: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    const [y, m, d] = date.split('-').map(Number);
    const dayIndex = getDayOfWeek(y, m, d);
    setResult(DAYS[dayIndex]);
  };

  return (
    <FUIGlassPanel style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'Rajdhani', color: '#00F3FF', marginTop: 0 }}>CHRONO // CALCULATOR</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Rajdhani' }}>TARGET DATE</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          style={{ 
            background: 'rgba(0,0,0,0.3)', 
            border: '1px solid rgba(0,243,255,0.3)', 
            color: 'white', 
            padding: '0.5rem',
            fontFamily: 'Rajdhani',
            fontSize: '1.2rem'
          }}
        />
        <FUIButton onClick={handleCalculate}>CALCULATE</FUIButton>
        
        {result && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>RESULT</div>
            <div style={{ fontSize: '2rem', color: '#00F3FF', fontFamily: 'Orbitron', textShadow: '0 0 10px rgba(0,243,255,0.5)' }}>
              {result.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </FUIGlassPanel>
  );
};
