import type React from 'react';
import { useTranslation } from 'react-i18next';

export const ModuleLoadingFallback: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '320px',
        width: '100%',
        color: 'var(--text-dim, var(--text-main))',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.95rem',
        letterSpacing: '0.08em',
        opacity: 0.85,
      }}
    >
      <span>[{t('loading_system', { defaultValue: 'LOADING MODULE DATA...' })}]</span>
    </div>
  );
};
