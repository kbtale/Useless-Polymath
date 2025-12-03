import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { COMMON_ZONES, calculateDestinationTime } from './logic';

export const TimeZonesTool: React.FC = () => {
  const [originId, setOriginId] = useState('utc');
  const [destId, setDestId] = useState('tokyo');
  const [hour, setHour] = useState(12);

  const origin = COMMON_ZONES.find(z => z.id === originId) || COMMON_ZONES[0];
  const dest = COMMON_ZONES.find(z => z.id === destId) || COMMON_ZONES[3];

  const result = calculateDestinationTime(hour, origin.offset, dest.offset);

  return (
    <FUIGlassPanel style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'Rajdhani', color: '#00F3FF', marginTop: 0 }}>TIME // SYNC</h2>
      
      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Origin */}
        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontFamily: 'Rajdhani' }}>ORIGIN</label>
          <select 
            value={originId}
            onChange={(e) => setOriginId(e.target.value)}
            style={{ 
              width: '100%', 
              background: 'rgba(0,0,0,0.5)', 
              color: 'white', 
              border: '1px solid #00F3FF',
              padding: '0.5rem',
              fontFamily: 'Orbitron',
              marginBottom: '1rem'
            }}
          >
            {COMMON_ZONES.map(z => (
              <option key={z.id} value={z.id}>{z.name} (UTC{z.offset >= 0 ? '+' : ''}{z.offset})</option>
            ))}
          </select>
          
          <input 
            type="range" 
            min="0" 
            max="23" 
            value={hour} 
            onChange={(e) => setHour(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ textAlign: 'center', fontFamily: 'Orbitron', fontSize: '2rem', color: 'white' }}>
            {hour.toString().padStart(2, '0')}:00
          </div>
        </div>

        {/* Destination */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontFamily: 'Rajdhani' }}>DESTINATION</label>
          <select 
            value={destId}
            onChange={(e) => setDestId(e.target.value)}
            style={{ 
              width: '100%', 
              background: 'rgba(0,0,0,0.5)', 
              color: 'white', 
              border: '1px solid #BD00FF',
              padding: '0.5rem',
              fontFamily: 'Orbitron',
              marginBottom: '1rem'
            }}
          >
            {COMMON_ZONES.map(z => (
              <option key={z.id} value={z.id}>{z.name} (UTC{z.offset >= 0 ? '+' : ''}{z.offset})</option>
            ))}
          </select>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Orbitron', fontSize: '3rem', color: '#BD00FF', textShadow: '0 0 10px rgba(189,0,255,0.5)' }}>
              {result.hour.toString().padStart(2, '0')}:00
            </div>
            <div style={{ fontFamily: 'Rajdhani', color: 'rgba(255,255,255,0.5)' }}>
              {result.dayOffset === 0 ? 'SAME DAY' : result.dayOffset > 0 ? 'NEXT DAY (+1)' : 'PREVIOUS DAY (-1)'}
            </div>
          </div>
        </div>
      </div>
    </FUIGlassPanel>
  );
};
