import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { decimalToHex, hexToDecimal } from './logic';

export const HexTool: React.FC = () => {
  const [dec, setDec] = useState('255');
  const [hex, setHex] = useState('FF');
  const [bin, setBin] = useState('11111111');

  const handleDecChange = (val: string) => {
    setDec(val);
    if (!val) { setHex(''); setBin(''); return; }
    try {
      const n = parseInt(val);
      if (isNaN(n)) return;
      setHex(decimalToHex(n));
      setBin(n.toString(2).padStart(8, '0'));
    } catch (e) { /* ignore */ }
  };

  const handleHexChange = (val: string) => {
    setHex(val.toUpperCase());
    if (!val) { setDec(''); setBin(''); return; }
    try {
      const n = hexToDecimal(val);
      setDec(n.toString());
      setBin(n.toString(2).padStart(8, '0'));
    } catch (e) { /* ignore */ }
  };

  return (
    <FUIGlassPanel style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'Rajdhani', color: '#00F3FF', marginTop: 0 }}>HEX // CONVERTER</h2>
      
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontFamily: 'Rajdhani', marginBottom: '0.5rem' }}>DECIMAL (Base 10)</label>
          <input 
            type="number" 
            value={dec}
            onChange={(e) => handleDecChange(e.target.value)}
            style={{ 
              width: '100%',
              background: 'rgba(0,0,0,0.3)', 
              border: '1px solid rgba(0,243,255,0.3)', 
              color: 'white', 
              padding: '1rem',
              fontFamily: 'Orbitron',
              fontSize: '1.5rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontFamily: 'Rajdhani', marginBottom: '0.5rem' }}>HEXADECIMAL (Base 16)</label>
          <input 
            type="text" 
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            style={{ 
              width: '100%',
              background: 'rgba(0,0,0,0.3)', 
              border: '1px solid #BD00FF', 
              color: '#BD00FF', 
              padding: '1rem',
              fontFamily: 'Orbitron',
              fontSize: '1.5rem',
              textShadow: '0 0 10px rgba(189, 0, 255, 0.5)'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontFamily: 'Rajdhani', marginBottom: '0.5rem' }}>BINARY (Base 2)</label>
          <div style={{ 
            fontFamily: 'Orbitron', 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '2px'
          }}>
            {bin.match(/.{1,4}/g)?.join(' ') || bin}
          </div>
        </div>
      </div>
    </FUIGlassPanel>
  );
};
