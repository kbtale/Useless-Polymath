import type React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ACHIEVEMENT_UNLOCKED_EVENT,
  type AchievementUnlockedDetail,
} from '@/services/storage';
import styles from './AchievementToast.module.scss';

interface ActiveToast extends AchievementUnlockedDetail {
  instanceId: string;
}

export const AchievementToast: React.FC = () => {
  const { t } = useTranslation(['stats', 'common']);
  const [toasts, setToasts] = useState<ActiveToast[]>([]);

  useEffect(() => {
    const handleUnlock = (event: Event) => {
      const customEvent = event as CustomEvent<AchievementUnlockedDetail>;
      if (!customEvent.detail) return;

      const newToast: ActiveToast = {
        ...customEvent.detail,
        instanceId: `${customEvent.detail.id}_${Date.now()}`,
      };

      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.instanceId !== newToast.instanceId));
      }, 5000);
    };

    window.addEventListener(ACHIEVEMENT_UNLOCKED_EVENT, handleUnlock);
    return () => window.removeEventListener(ACHIEVEMENT_UNLOCKED_EVENT, handleUnlock);
  }, []);

  const dismissToast = (instanceId: string) => {
    setToasts((prev) => prev.filter((item) => item.instanceId !== instanceId));
  };

  if (toasts.length === 0) return null;

  return (
    <aside className={styles.toastContainer} aria-label="Achievement notifications" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.instanceId} className={styles.toast} role="alert">
          <div className={styles.toastIcon} aria-hidden="true">
            {toast.icon}
          </div>
          <div className={styles.toastContent}>
            <span className={styles.toastTag}>{t('achievement_unlocked_banner', { defaultValue: 'Achievement Unlocked!' })}</span>
            <h4 className={styles.toastTitle}>{t(toast.titleKey, { defaultValue: toast.id })}</h4>
            <p className={styles.toastDesc}>{t(toast.descriptionKey, { defaultValue: '' })}</p>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => dismissToast(toast.instanceId)}
            aria-label={t('close', { ns: 'common', defaultValue: 'Close' })}
          >
            ×
          </button>
        </div>
      ))}
    </aside>
  );
};
