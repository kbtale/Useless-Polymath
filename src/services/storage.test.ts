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

    expect(storageService.getLanguage()).toBe('en');
    storageService.setLanguage('es');
    expect(storageService.getLanguage()).toBe('es');

    expect(storageService.getDateFormat()).toBe('DMY');
    storageService.setDateFormat('MDY');
    expect(storageService.getDateFormat()).toBe('MDY');
    expect(localStorage.getItem(STORAGE_KEYS.DATE_FORMAT)).toBe('MDY');
  });

  it('handles streak and high score tracking and reset', () => {
    storageService.setStreak('binary', 8);
    storageService.setHighScore('binary', 15);

    expect(storageService.getStreak('binary')).toBe(8);
    expect(storageService.getHighScore('binary')).toBe(15);

    storageService.resetModuleScores('binary');
    expect(storageService.getStreak('binary')).toBe(0);
    expect(storageService.getHighScore('binary')).toBe(0);
  });

  it('resets all module scores in bulk', () => {
    storageService.setStreak('doomsday', 3);
    storageService.setStreak('moon', 5);

    storageService.resetAllScores(['doomsday', 'moon']);
    expect(storageService.getStreak('doomsday')).toBe(0);
    expect(storageService.getStreak('moon')).toBe(0);
  });
});
