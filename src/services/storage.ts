export const STORAGE_KEYS = {
  SIDEBAR_COLLAPSED: 'polymath_sidebar_collapsed',
  HIDDEN_MODULES: 'polymath_hidden_modules',
  HIDDEN_CATEGORIES: 'polymath_hidden_categories',
  APP_STYLE: 'app-style',
  LANGUAGE: 'language',
  DATE_FORMAT: 'polymath_date_format',
  streak: (id: string) => `polymath_streak_${id}`,
  highScore: (id: string) => `polymath_high_${id}`,
} as const;

class StorageService {
  private isAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  getItem<T>(key: string, defaultValue: T): T {
    if (!this.isAvailable()) return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return defaultValue;
      try {
        return JSON.parse(item) as T;
      } catch {
        return item as unknown as T;
      }
    } catch (e) {
      console.warn(`[StorageService] Failed to read key "${key}":`, e);
      return defaultValue;
    }
  }

  setItem<T>(key: string, value: T): void {
    if (!this.isAvailable()) return;
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      window.localStorage.setItem(key, serialized);
    } catch (e) {
      console.warn(`[StorageService] Failed to write key "${key}":`, e);
    }
  }

  removeItem(key: string): void {
    if (!this.isAvailable()) return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[StorageService] Failed to remove key "${key}":`, e);
    }
  }

  getSidebarCollapsed(): boolean {
    const val = this.getItem<string | boolean>(STORAGE_KEYS.SIDEBAR_COLLAPSED, false);
    return val === true || val === 'true';
  }

  setSidebarCollapsed(collapsed: boolean): void {
    this.setItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, String(collapsed));
  }

  getHiddenModules(): string[] {
    return this.getItem<string[]>(STORAGE_KEYS.HIDDEN_MODULES, []);
  }

  setHiddenModules(modules: string[]): void {
    this.setItem(STORAGE_KEYS.HIDDEN_MODULES, modules);
  }

  getHiddenCategories(): string[] {
    return this.getItem<string[]>(STORAGE_KEYS.HIDDEN_CATEGORIES, []);
  }

  setHiddenCategories(categories: string[]): void {
    this.setItem(STORAGE_KEYS.HIDDEN_CATEGORIES, categories);
  }

  getAppStyle(defaultStyle: string = 'mono'): string {
    return this.getItem<string>(STORAGE_KEYS.APP_STYLE, defaultStyle);
  }

  setAppStyle(style: string): void {
    this.setItem(STORAGE_KEYS.APP_STYLE, style);
  }

  getLanguage(defaultLang: string = 'en'): string {
    return this.getItem<string>(STORAGE_KEYS.LANGUAGE, defaultLang);
  }

  setLanguage(language: string): void {
    this.setItem(STORAGE_KEYS.LANGUAGE, language);
  }

  getDateFormat(defaultFormat: 'DMY' | 'MDY' | 'YMD' = 'DMY'): 'DMY' | 'MDY' | 'YMD' {
    return this.getItem<'DMY' | 'MDY' | 'YMD'>(STORAGE_KEYS.DATE_FORMAT, defaultFormat);
  }

  setDateFormat(format: 'DMY' | 'MDY' | 'YMD'): void {
    this.setItem(STORAGE_KEYS.DATE_FORMAT, format);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('polymath:dateformat_changed', { detail: format }));
    }
  }

  getStreak(moduleId: string): number {
    const val = this.getItem(STORAGE_KEYS.streak(moduleId), '0');
    return parseInt(String(val), 10) || 0;
  }

  setStreak(moduleId: string, streak: number): void {
    this.setItem(STORAGE_KEYS.streak(moduleId), String(streak));
  }

  removeStreak(moduleId: string): void {
    this.removeItem(STORAGE_KEYS.streak(moduleId));
  }

  getHighScore(moduleId: string): number {
    const val = this.getItem(STORAGE_KEYS.highScore(moduleId), '0');
    return parseInt(String(val), 10) || 0;
  }

  setHighScore(moduleId: string, highScore: number): void {
    this.setItem(STORAGE_KEYS.highScore(moduleId), String(highScore));
  }

  removeHighScore(moduleId: string): void {
    this.removeItem(STORAGE_KEYS.highScore(moduleId));
  }

  resetModuleScores(moduleId: string): void {
    this.removeStreak(moduleId);
    this.removeHighScore(moduleId);
  }

  resetAllScores(moduleIds: readonly { id: string }[] | readonly string[]): void {
    for (const item of moduleIds) {
      const id = typeof item === 'string' ? item : item.id;
      this.resetModuleScores(id);
    }
  }
}

export const storageService = new StorageService();
