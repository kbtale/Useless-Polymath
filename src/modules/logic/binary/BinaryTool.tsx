import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { BitBulb } from './components/BitBulb';
import { getActivePowers } from './logic';

export const BinaryTool: React.FC = () => {
  const [value, setValue] = useState(0);
  const activePowers = getActivePowers(value);

  const toggleBit = (bitValue: number) => {
    if (activePowers.includes(bitValue)) {
      setValue(v => v - bitValue);
    } else {
      setValue(v => v + bitValue);
    }
  };

  return (
    <FUIGlassPanel style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'Rajdhani', color: '#00F3FF', marginTop: 0 }}>BINARY // VISUALIZER</h2>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '1rem', 
        padding: '2rem 0',
        flexWrap: 'wrap'
      }}>
        {[128, 64, 32, 16, 8, 4, 2, 1].map(bit => (
          <BitBulb 
            key={bit} 
            value={bit} 
            active={activePowers.includes(bit)} 
            onClick={() => toggleBit(bit)} 
          />
        ))}
      </div>

      <div style={{ 
        textAlign: 'center', 
        borderTop: '1px solid rgba(0, 243, 255, 0.3)', 
        paddingTop: '1rem',
        marginTop: '1rem'
      }}>
        <div style={{ fontFamily: 'Rajdhani', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>DECIMAL VALUE</div>
        <div style={{ 
          fontFamily: 'Orbitron', 
          fontSize: '3rem', 
          color: '#00F3FF',
          textShadow: '0 0 20px rgba(0, 243, 255, 0.5)'
        }}>
          {value}
        </div>
        <div style={{ 
          fontFamily: 'Rajdhani', 
          color: 'rgba(255,255,255,0.5)', 
          marginTop: '0.5rem',
          fontSize: '1.2rem'
        }}>
          {activePowers.length > 0 
            ? activePowers.join(' + ') + ' = ' + value
            : '0 = 0'}
        </div>
      </div>
    </FUIGlassPanel>
  );
};
