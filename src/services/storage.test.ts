// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { STORAGE_KEYS, storageService } from './storage';

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('handles sidebar collapsed boolean state', () => {
    expect(storageService.getSidebarCollapsed()).toBe(false);

    storageService.setSidebarCollapsed(true);
    expect(storageService.getSidebarCollapsed()).toBe(true);
    expect(localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED)).toBe('true');
  });

  it('handles hidden modules array serialization', () => {
    expect(storageService.getHiddenModules()).toEqual([]);

    storageService.setHiddenModules(['binary', 'hexadecimal']);
    expect(storageService.getHiddenModules()).toEqual(['binary', 'hexadecimal']);
  });

  it('handles hidden categories array serialization', () => {
    expect(storageService.getHiddenCategories()).toEqual([]);

    storageService.setHiddenCategories(['modules.logic']);
    expect(storageService.getHiddenCategories()).toEqual(['modules.logic']);
  });

  it('handles app style and language persistence', () => {
    expect(storageService.getAppStyle()).toBe('mono');
    storageService.setAppStyle('wellfound');
    expect(storageService.getAppStyle()).toBe('wellfound');
    expect(localStorage.getItem(STORAGE_KEYS.APP_STYLE)).toBe('wellfound');

    expect(storageService.getLanguage()).toBe('en');
    storageService.setLanguage('es');
    expect(storageService.getLanguage()).toBe('es');
    expect(localStorage.getItem(STORAGE_KEYS.LANGUAGE)).toBe('es');

    expect(storageService.getDateFormat()).toBe('DMY');
    storageService.setDateFormat('MDY');
    expect(storageService.getDateFormat()).toBe('MDY');
    expect(localStorage.getItem(STORAGE_KEYS.DATE_FORMAT)).toBe('MDY');
  });

  it('falls back to legacy storage keys when primary keys are absent', () => {
    localStorage.setItem(STORAGE_KEYS.APP_STYLE_LEGACY, 'neobrutalism');
    localStorage.setItem(STORAGE_KEYS.LANGUAGE_LEGACY, 'zh');

    expect(storageService.getAppStyle()).toBe('neobrutalism');
    expect(storageService.getLanguage()).toBe('zh');
  });

  it('records practice attempts and updates telemetry and daily activity', () => {
    const attempt1 = storageService.recordPracticeAttempt('binary', true);
    expect(attempt1.telemetry.attempts).toBe(1);
    expect(attempt1.telemetry.correct).toBe(1);
    expect(attempt1.telemetry.currentStreak).toBe(1);
    expect(attempt1.telemetry.highScore).toBe(1);

    const attempt2 = storageService.recordPracticeAttempt('binary', true);
    expect(attempt2.telemetry.attempts).toBe(2);
    expect(attempt2.telemetry.currentStreak).toBe(2);
    expect(attempt2.telemetry.highScore).toBe(2);

    const attempt3 = storageService.recordPracticeAttempt('binary', false);
    expect(attempt3.telemetry.attempts).toBe(3);
    expect(attempt3.telemetry.correct).toBe(2);
    expect(attempt3.telemetry.currentStreak).toBe(0);
    expect(attempt3.telemetry.highScore).toBe(2);

    const daily = storageService.getDailyActivity();
    const todayKey = new Date().toISOString().slice(0, 10);
    expect(daily[todayKey]).toBe(3);
  });

  it('evaluates and unlocks achievements upon reaching milestones', () => {
    const attempt = storageService.recordPracticeAttempt('doomsday', true);
    expect(attempt.newlyUnlocked.some((a) => a.id === 'first_step')).toBe(true);

    for (let i = 0; i < 4; i++) {
      storageService.recordPracticeAttempt('doomsday', true);
    }
    const unlocked = storageService.getUnlockedAchievements();
    expect(unlocked).toContain('first_step');
    expect(unlocked).toContain('streak_5');
  });

  it('exports and imports backup JSON with fidelity', () => {
    storageService.recordPracticeAttempt('hexadecimal', true);
    storageService.setAppStyle('cyber');
    storageService.setLanguage('it');

    const json = storageService.exportBackupJson();
    expect(json).toContain('hexadecimal');
    expect(json).toContain('cyber');

    localStorage.clear();
    expect(storageService.getModuleTelemetry('hexadecimal').attempts).toBe(0);

    const success = storageService.importBackupJson(json);
    expect(success).toBe(true);
    expect(storageService.getModuleTelemetry('hexadecimal').attempts).toBe(1);
    expect(storageService.getAppStyle()).toBe('cyber');
    expect(storageService.getLanguage()).toBe('it');
  });

  it('resets all module scores in bulk', () => {
    storageService.setStreak('doomsday', 3);
    storageService.setStreak('moon', 5);

    storageService.resetAllScores(['doomsday', 'moon']);
    expect(storageService.getStreak('doomsday')).toBe(0);
    expect(storageService.getStreak('moon')).toBe(0);
  });
});
