import { AppShell } from './components/layout/AppShell';
import { DoomsdayTool } from './modules/cronometria/doomsday/DoomsdayTool';
import { DoomsdayPractice } from './modules/cronometria/doomsday/DoomsdayPractice';
import { BinaryTool } from './modules/logic/binary/BinaryTool';
import { BinaryPractice } from './modules/logic/binary/BinaryPractice';
import { HexTool } from './modules/logic/hex/HexTool';
import { HexPractice } from './modules/logic/hex/HexPractice';
import { TimeZonesTool } from './modules/cronometria/timezones/TimeZonesTool';
import { TimeZonesPractice } from './modules/cronometria/timezones/TimeZonesPractice';
import { MoonTool } from './modules/cronometria/moon/MoonTool';
import { MoonPractice } from './modules/cronometria/moon/MoonPractice';
import { CalendarOrdinalTool } from './modules/cronometria/ordinal/CalendarOrdinalTool';
import { CalendarOrdinalPractice } from './modules/cronometria/ordinal/CalendarOrdinalPractice';
import { useState } from 'react';

function App() {
  const [mode, setMode] = useState<'tool' | 'practice' | 'guide'>('tool');
  const [activeModuleId, setActiveModuleId] = useState('doomsday');

  const renderModule = () => {
    if (mode === 'guide') {
      return (
        <div style={{ 
          padding: '2rem', 
          maxWidth: '800px', 
          margin: '0 auto', 
          fontFamily: 'JetBrains Mono, monospace',
          color: '#333'
        }}>
          <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>MODULE // GUIDE</h2>
          <p style={{ marginTop: '1rem' }}>
            <strong>MODULE_ID:</strong> {activeModuleId.toUpperCase()}
          </p>
          <p>
            Documentation for this module is currently being compiled. 
            Please refer to the Visualizer for interactive exploration.
          </p>
        </div>
      );
    }

    switch (activeModuleId) {
      case 'doomsday':
        return mode === 'tool' ? <DoomsdayTool /> : <DoomsdayPractice />;
      case 'timezones':
        return mode === 'tool' ? <TimeZonesTool /> : <TimeZonesPractice />;
      case 'moon':
        return mode === 'tool' ? <MoonTool /> : <MoonPractice />;
      case 'calendar':
        return mode === 'tool' ? <CalendarOrdinalTool /> : <CalendarOrdinalPractice />;
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
    <AppShell 
      activeModule={activeModuleId} 
      onModuleChange={setActiveModuleId}
      mode={mode}
      onModeChange={setMode}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {renderModule()}
      </div>
    </AppShell>
  );
}

export default App;
