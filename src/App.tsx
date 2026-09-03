import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreMarkdownRenderer } from '@/components/core/CoreMarkdownRenderer';
import { ErrorBoundary } from '@/components/core/ErrorBoundary';
import { ModuleLoadingFallback } from '@/components/core/ModuleLoadingFallback';
import { AppShell } from '@/components/layout/AppShell';
import { useModuleNavigation } from '@/hooks/useModuleNavigation';
import { getModuleDefinition } from '@/registry/moduleRegistry';
import styles from './App.module.scss';

function AppContent() {
  const { activeModuleId, mode, setActiveModuleId, setMode } =
    useModuleNavigation('doomsday');
  const { t } = useTranslation([activeModuleId, 'common']);

  const renderModule = () => {
    if (mode === 'guide') {
      return (
        <div className={styles.guideWrapper}>
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
        <div className={styles.emptyState}>
          <h3>
            {t('awaiting_implementation', {
              ns: 'common',
              defaultValue: 'Module not found',
            })}
          </h3>
        </div>
      );
    }

    const Component = mode === 'practice' ? definition.practice : definition.tool;

    return (
      <ErrorBoundary key={activeModuleId}>
        <Suspense fallback={<ModuleLoadingFallback />}>
          <Component />
        </Suspense>
      </ErrorBoundary>
    );
  };

  return (
    <AppShell
      activeModule={activeModuleId}
      mode={mode}
      onModuleChange={setActiveModuleId}
      onModeChange={setMode}
    >
      {renderModule()}
    </AppShell>
  );
}

function App() {
  return <AppContent />;
}

export default App;
