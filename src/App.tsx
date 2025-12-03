import { AppShell } from './components/layout/AppShell';
import { DoomsdayTool } from './modules/cronometria/doomsday/DoomsdayTool';
import { DoomsdayPractice } from './modules/cronometria/doomsday/DoomsdayPractice';
import { BinaryTool } from './modules/logic/binary/BinaryTool';
import { BinaryPractice } from './modules/logic/binary/BinaryPractice';
import { HexTool } from './modules/logic/hex/HexTool';
import { HexPractice } from './modules/logic/hex/HexPractice';
import { TimeZonesTool } from './modules/cronometria/timezones/TimeZonesTool';
import { TimeZonesPractice } from './modules/cronometria/timezones/TimeZonesPractice';
import { useState } from 'react';
import { FUIButton } from './components/core/FUIButton';

function App() {
  const [mode, setMode] = useState<'tool' | 'practice'>('tool');
  const [activeModuleId, setActiveModuleId] = useState('doomsday');

  const renderModule = () => {
    switch (activeModuleId) {
      case 'doomsday':
        return mode === 'tool' ? <DoomsdayTool /> : <DoomsdayPractice />;
      case 'timezones':
        return mode === 'tool' ? <TimeZonesTool /> : <TimeZonesPractice />;
      case 'binary':
        return mode === 'tool' ? <BinaryTool /> : <BinaryPractice />;
      case 'hex':
        return mode === 'tool' ? <HexTool /> : <HexPractice />;
      default:
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'Orbitron', color: '#00F3FF' }}>MODULE: {activeModuleId.toUpperCase()}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>// SYSTEM STATUS: OFFLINE</p>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>// AWAITING IMPLEMENTATION...</p>
          </div>
        );
    }
  };

  return (
    <AppShell activeModule={activeModuleId} onModuleChange={setActiveModuleId}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
          <FUIButton 
            variant={mode === 'tool' ? 'solid' : 'outline'} 
            onClick={() => setMode('tool')}
          >
            TOOL / VISUALIZER
          </FUIButton>
          <FUIButton 
            variant={mode === 'practice' ? 'solid' : 'outline'} 
            onClick={() => setMode('practice')}
          >
            PRACTICE / GAME
          </FUIButton>
        </div>

        {renderModule()}
      </div>
    </AppShell>
  );
}

export default App;
