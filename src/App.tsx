import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './App.module.scss';
import { CoreMarkdownRenderer } from './components/core/CoreMarkdownRenderer';
import { ModuleLoadingFallback } from './components/core/ModuleLoadingFallback';
import { AppShell } from './components/layout/AppShell';
import { getModuleDefinition } from './registry/moduleRegistry';

const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split('_')
    .join(' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

function AppContent() {
  const [mode, setMode] = useState<'tool' | 'practice' | 'guide'>('tool');
  const [activeModuleId, setActiveModuleId] = useState('doomsday');

  const { t } = useTranslation([activeModuleId, 'common']);

  const renderModule = () => {
    if (mode === 'guide') {
      return (
        <div className={styles.guideWrapper}>
          <h2>
            {toTitleCase(activeModuleId)} {t('guide', { ns: 'common', defaultValue: 'Guide' })}
          </h2>
          <div className={styles.guideContainer}>
            <CoreMarkdownRenderer
              content={t('guide', {
                ns: activeModuleId,
                defaultValue: t('documentation_coming_soon', { ns: 'common' }),
              })}
            />
          </div>
        </div>
      );
    }

    const definition = getModuleDefinition(activeModuleId);
    if (!definition) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-highlight)' }}>
            MODULE: {activeModuleId.toUpperCase()}
          </h2>
        </div>
      );
    }

    const Component = mode === 'tool' ? definition.tool : definition.practice;

    return (
      <Suspense fallback={<ModuleLoadingFallback />}>
        <Component />
      </Suspense>
    );
  };

  return (
    <AppShell
      activeModule={activeModuleId}
      onModuleChange={setActiveModuleId}
      mode={mode}
      onModeChange={setMode}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {renderModule()}
      </div>
    </AppShell>
  );
}

function App() {
  const { t } = useTranslation(['common']);

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'var(--bg-canvas)',
            color: 'var(--text-main)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {t('loading_system')}
        </div>
      }
    >
      <AppContent />
    </Suspense>
  );
}

export default App;
