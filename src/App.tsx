import { useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { AppShell } from './components/layout/AppShell';
import { CoreMarkdownRenderer } from './components/core/CoreMarkdownRenderer';
import { DoomsdayTool } from './modules/chronometry/doomsday/DoomsdayTool';
import { DoomsdayPractice } from './modules/chronometry/doomsday/DoomsdayPractice';
import { BinaryTool } from './modules/logic/binary/BinaryTool';
import { BinaryPractice } from './modules/logic/binary/BinaryPractice';
import { BitwiseTool } from './modules/logic/bitwise/BitwiseTool';
import { BitwisePractice } from './modules/logic/bitwise/BitwisePractice';
import { HexTool } from './modules/logic/hex/HexTool';
import { HexPractice } from './modules/logic/hex/HexPractice';
import styles from './App.module.scss';
import { TimeZonesTool } from './modules/chronometry/timezones/TimeZonesTool';
import { TimeZonesPractice } from './modules/chronometry/timezones/TimeZonesPractice';
import { MoonTool } from './modules/chronometry/moon/MoonTool';
import { MoonPractice } from './modules/chronometry/moon/MoonPractice';
import { RomanTool } from './modules/logic/roman_numerals/RomanTool';
import { RomanPractice } from './modules/logic/roman_numerals/RomanPractice';
import { CalendarOrdinalTool } from './modules/chronometry/ordinal/CalendarOrdinalTool';
import { CalendarOrdinalPractice } from './modules/chronometry/ordinal/CalendarOrdinalPractice';
import { Rule72Tool } from './modules/logic/rule_72/Rule72Tool';
import { Rule72Practice } from './modules/logic/rule_72/Rule72Practice';
import { NatoTool } from './modules/cryptography/nato_alphabet/NatoTool';
import { NatoPractice } from './modules/cryptography/nato_alphabet/NatoPractice';
import { CaesarTool } from './modules/cryptography/caesar_cipher/CaesarTool';
import { CaesarPractice } from './modules/cryptography/caesar_cipher/CaesarPractice';
import { MorseTool } from './modules/cryptography/morse_code/MorseTool';
import { MorsePractice } from './modules/cryptography/morse_code/MorsePractice';
import { BrailleTool } from './modules/cryptography/braille/BrailleTool';
import { BraillePractice } from './modules/cryptography/braille/BraillePractice';
import { SemaphoreTool } from './modules/cryptography/semaphore/SemaphoreTool';
import { SemaphorePractice } from './modules/cryptography/semaphore/SemaphorePractice';
import { PeriodicTableTool } from './modules/science/periodic_table/PeriodicTableTool';
import { PeriodicTablePractice } from './modules/science/periodic_table/PeriodicTablePractice';
import { ThermodynamicsTool } from './modules/science/thermodynamics/ThermodynamicsTool';
import { ThermodynamicsPractice } from './modules/science/thermodynamics/ThermodynamicsPractice';

function AppContent() {
  const [mode, setMode] = useState<'tool' | 'practice' | 'guide'>('tool');
  const [activeModuleId, setActiveModuleId] = useState('doomsday');
  
  const { t } = useTranslation([activeModuleId, 'common']);

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
          <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
            {t('guide', { ns: 'common', defaultValue: 'GUIDE' })} // {activeModuleId.toUpperCase()}
          </h2>
          <div className={styles.guideContainer}>
            <CoreMarkdownRenderer content={t('guide', { ns: activeModuleId, defaultValue: t('documentation_coming_soon', { ns: 'common' }) })} />
          </div>
        </div>
      );
    }

    switch (activeModuleId) {
      case 'doomsday':
        return mode === 'tool' ? <DoomsdayTool /> : <DoomsdayPractice />;
      case 'time_zones':
        return mode === 'tool' ? <TimeZonesTool /> : <TimeZonesPractice />;
      case 'moon':
        return mode === 'tool' ? <MoonTool /> : <MoonPractice />;
      case 'ordinal':
        return mode === 'tool' ? <CalendarOrdinalTool /> : <CalendarOrdinalPractice />;
      case 'binary':
        return mode === 'tool' ? <BinaryTool /> : <BinaryPractice />;
      case 'bitwise':
        return mode === 'tool' ? <BitwiseTool /> : <BitwisePractice />;
      case 'roman_numerals':
        return mode === 'tool' ? <RomanTool /> : <RomanPractice />;
      case 'hexadecimal':
        return mode === 'tool' ? <HexTool /> : <HexPractice />;
      case 'rule_72':
        return mode === 'tool' ? <Rule72Tool /> : <Rule72Practice />;
      case 'nato_alphabet':
        return mode === 'tool' ? <NatoTool /> : <NatoPractice />;
      case 'caesar_cipher':
        return mode === 'tool' ? <CaesarTool /> : <CaesarPractice />;
      case 'morse_code':
        return mode === 'tool' ? <MorseTool /> : <MorsePractice />;
      case 'braille':
        return mode === 'tool' ? <BrailleTool /> : <BraillePractice />;
      case 'semaphore':
        return mode === 'tool' ? <SemaphoreTool /> : <SemaphorePractice />;
      case 'periodic_table':
        return mode === 'tool' ? <PeriodicTableTool /> : <PeriodicTablePractice />;
      case 'thermodynamics':
        return mode === 'tool' ? <ThermodynamicsTool /> : <ThermodynamicsPractice />;
      default:
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'Orbitron', color: '#00F3FF' }}>MODULE: {activeModuleId.toUpperCase()}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>// {t('system_offline', { ns: 'common' })}</p>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>// {t('awaiting_implementation', { ns: 'common' })}</p>
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

function App() {
  const { t } = useTranslation(['common']); // Need this hook here if we want to translate generic loading
  
  return (
     <Suspense fallback={<div style={{ 
       display: 'flex', 
       justifyContent: 'center', 
       alignItems: 'center', 
       height: '100vh', 
       background: '#0a0a0a', 
       color: '#00F3FF',
       fontFamily: 'JetBrains Mono' 
     }}> {t('loading_system')} </div>}>
      <AppContent />
    </Suspense>
  );
}

export default App;
