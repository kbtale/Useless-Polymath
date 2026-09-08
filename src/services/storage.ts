export const DATE_FORMAT_CHANGED_EVENT = 'polymath:dateformat_changed';
export const ACHIEVEMENT_UNLOCKED_EVENT = 'polymath:achievement_unlocked';

export type DateFormat = 'DMY' | 'MDY' | 'YMD';

export interface DateFormatEventDetail {
  format: DateFormat;
}

export interface ModuleTelemetry {
  attempts: number;
  correct: number;
  currentStreak: number;
  highScore: number;
  lastPracticed?: string;
}

export interface AchievementDefinition {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category?: string;
}

export interface AchievementUnlockedDetail {
  id: string;
  titleKey: string;
  descriptionKey: string;
}

export interface ExportedBackupData {
  version: number;
  exportedAt: string;
  telemetry: Record<string, ModuleTelemetry>;
  dailyActivity: Record<string, number>;
  unlockedAchievements: string[];
  settings: {
    appStyle: string;
    language: string;
    dateFormat: DateFormat;
    sidebarCollapsed: boolean;
  };
}

export const STORAGE_KEYS = {
  SIDEBAR_COLLAPSED: 'polymath_sidebar_collapsed',
  COLLAPSED_CATEGORIES: 'polymath_collapsed_categories',
  HIDDEN_MODULES: 'polymath_hidden_modules',
  HIDDEN_CATEGORIES: 'polymath_hidden_categories',
  APP_STYLE: 'polymath_app_style',
  APP_STYLE_LEGACY: 'app-style',
  LANGUAGE: 'polymath_language',
  LANGUAGE_LEGACY: 'language',
  DATE_FORMAT: 'polymath_date_format',
  DAILY_ACTIVITY: 'polymath_daily_activity',
  UNLOCKED_ACHIEVEMENTS: 'polymath_unlocked_achievements',
  moduleTelemetry: (id: string) => `polymath_telemetry_${id}`,
  streak: (id: string) => `polymath_streak_${id}`,
  highScore: (id: string) => `polymath_high_${id}`,
} as const;

export const ALL_MODULE_IDS = [
  'doomsday',
  'time_zones',
  'moon',
  'ordinal',
  'binary',
  'hexadecimal',
  'roman_numerals',
  'bitwise',
  'rule_72',
  'subnetting',
  'color_theory',
  'ascii',
  'storage_units',
  'morse_code',
  'nato_alphabet',
  'caesar_cipher',
  'braille',
  'semaphore',
  'periodic_table',
  'thermodynamics',
  'resistor_codes',
  'luhn_algorithm',
  'ean_13',
  'card_counting',
] as const;

export const MODULE_CATEGORIES: Record<string, string> = {
  doomsday: 'chronometry',
  time_zones: 'chronometry',
  moon: 'chronometry',
  ordinal: 'chronometry',
  binary: 'logic',
  hexadecimal: 'logic',
  roman_numerals: 'logic',
  bitwise: 'logic',
  rule_72: 'logic',
  subnetting: 'networks',
  color_theory: 'networks',
  ascii: 'networks',
  storage_units: 'networks',
  morse_code: 'cryptography',
  nato_alphabet: 'cryptography',
  caesar_cipher: 'cryptography',
  braille: 'cryptography',
  semaphore: 'cryptography',
  periodic_table: 'science',
  thermodynamics: 'science',
  resistor_codes: 'science',
  luhn_algorithm: 'science',
  ean_13: 'science',
  card_counting: 'science',
};

export const ACHIEVEMENTS: readonly AchievementDefinition[] = [
  {
    id: 'first_step',
    titleKey: 'achievement_first_step_title',
    descriptionKey: 'achievement_first_step_desc',
  },
  {
    id: 'streak_5',
    titleKey: 'achievement_streak_5_title',
    descriptionKey: 'achievement_streak_5_desc',
  },
  {
    id: 'streak_15',
    titleKey: 'achievement_streak_15_title',
    descriptionKey: 'achievement_streak_15_desc',
  },
  {
    id: 'centurion',
    titleKey: 'achievement_centurion_title',
    descriptionKey: 'achievement_centurion_desc',
  },
  {
    id: 'grand_polymath',
    titleKey: 'achievement_grand_polymath_title',
    descriptionKey: 'achievement_grand_polymath_desc',
  },
  {
    id: 'chronomancer',
    titleKey: 'achievement_chronomancer_title',
    descriptionKey: 'achievement_chronomancer_desc',
    category: 'chronometry',
  },
  {
    id: 'codebreaker',
    titleKey: 'achievement_codebreaker_title',
    descriptionKey: 'achievement_codebreaker_desc',
    category: 'cryptography',
  },
  {
    id: 'logic_master',
    titleKey: 'achievement_logic_master_title',
    descriptionKey: 'achievement_logic_master_desc',
    category: 'logic',
  },
] as const;

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

  getCollapsedCategories(): string[] {
    return this.getItem<string[]>(STORAGE_KEYS.COLLAPSED_CATEGORIES, []);
  }

  setCollapsedCategories(categories: string[]): void {
    this.setItem(STORAGE_KEYS.COLLAPSED_CATEGORIES, categories);
  }

  getAppStyle(defaultStyle: string = 'mono'): string {
    const primary = this.getItem<string | null>(STORAGE_KEYS.APP_STYLE, null);
    if (primary !== null && primary !== undefined) return primary;
    return this.getItem<string>(STORAGE_KEYS.APP_STYLE_LEGACY, defaultStyle);
  }

  setAppStyle(style: string): void {
    this.setItem(STORAGE_KEYS.APP_STYLE, style);
  }

  getLanguage(defaultLang: string = 'en'): string {
    const primary = this.getItem<string | null>(STORAGE_KEYS.LANGUAGE, null);
    if (primary !== null && primary !== undefined) return primary;
    return this.getItem<string>(STORAGE_KEYS.LANGUAGE_LEGACY, defaultLang);
  }

  setLanguage(language: string): void {
    this.setItem(STORAGE_KEYS.LANGUAGE, language);
  }

  getDateFormat(defaultFormat: DateFormat = 'DMY'): DateFormat {
    return this.getItem<DateFormat>(STORAGE_KEYS.DATE_FORMAT, defaultFormat);
  }

  setDateFormat(format: DateFormat): void {
    this.setItem(STORAGE_KEYS.DATE_FORMAT, format);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent<DateFormat>(DATE_FORMAT_CHANGED_EVENT, { detail: format }),
      );
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

  getModuleTelemetry(moduleId: string): ModuleTelemetry {
    const currentStreak = this.getStreak(moduleId);
    const highScore = this.getHighScore(moduleId);
    const defaultTelemetry: ModuleTelemetry = {
      attempts: currentStreak > 0 ? currentStreak : 0,
      correct: currentStreak > 0 ? currentStreak : 0,
      currentStreak,
      highScore,
    };
    return this.getItem<ModuleTelemetry>(STORAGE_KEYS.moduleTelemetry(moduleId), defaultTelemetry);
  }

  setModuleTelemetry(moduleId: string, telemetry: ModuleTelemetry): void {
    this.setItem(STORAGE_KEYS.moduleTelemetry(moduleId), telemetry);
  }

  getAllModuleTelemetry(): Record<string, ModuleTelemetry> {
    const result: Record<string, ModuleTelemetry> = {};
    for (const moduleId of ALL_MODULE_IDS) {
      result[moduleId] = this.getModuleTelemetry(moduleId);
    }
    return result;
  }

  getDailyActivity(): Record<string, number> {
    return this.getItem<Record<string, number>>(STORAGE_KEYS.DAILY_ACTIVITY, {});
  }

  setDailyActivity(activity: Record<string, number>): void {
    this.setItem(STORAGE_KEYS.DAILY_ACTIVITY, activity);
  }

  getUnlockedAchievements(): string[] {
    return this.getItem<string[]>(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS, []);
  }

  setUnlockedAchievements(achievements: string[]): void {
    this.setItem(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS, achievements);
  }

  recordPracticeAttempt(
    moduleId: string,
    isCorrect: boolean,
  ): { newlyUnlocked: AchievementUnlockedDetail[]; telemetry: ModuleTelemetry } {
    const existingTelemetry = this.getModuleTelemetry(moduleId);
    const newAttempts = existingTelemetry.attempts + 1;
    const newCorrect = existingTelemetry.correct + (isCorrect ? 1 : 0);
    const newCurrentStreak = isCorrect ? existingTelemetry.currentStreak + 1 : 0;
    const newHighScore = Math.max(existingTelemetry.highScore, newCurrentStreak);
    const nowIso = new Date().toISOString();

    const updatedTelemetry: ModuleTelemetry = {
      attempts: newAttempts,
      correct: newCorrect,
      currentStreak: newCurrentStreak,
      highScore: newHighScore,
      lastPracticed: nowIso,
    };

    this.setModuleTelemetry(moduleId, updatedTelemetry);
    this.setStreak(moduleId, newCurrentStreak);
    this.setHighScore(moduleId, newHighScore);

    const todayDateKey = nowIso.slice(0, 10);
    const activity = this.getDailyActivity();
    activity[todayDateKey] = (activity[todayDateKey] || 0) + 1;
    this.setDailyActivity(activity);

    const newlyUnlocked = this.evaluateAndUnlockAchievements();

    return { newlyUnlocked, telemetry: updatedTelemetry };
  }

  evaluateAndUnlockAchievements(): AchievementUnlockedDetail[] {
    const unlocked = new Set(this.getUnlockedAchievements());
    const allTelemetry = this.getAllModuleTelemetry();

    let totalAttempts = 0;
    let maxOverallStreak = 0;
    const categoriesWithStreaks = new Set<string>();

    for (const [modId, tel] of Object.entries(allTelemetry)) {
      totalAttempts += tel.attempts;
      if (tel.highScore > maxOverallStreak) {
        maxOverallStreak = tel.highScore;
      }
      const category = MODULE_CATEGORIES[modId];
      if (category && tel.highScore >= 5) {
        categoriesWithStreaks.add(category);
      }
    }

    const newlyUnlocked: AchievementUnlockedDetail[] = [];

    for (const achievement of ACHIEVEMENTS) {
      if (unlocked.has(achievement.id)) continue;

      let isQualified = false;
      if (achievement.id === 'first_step' && totalAttempts >= 1) {
        isQualified = true;
      } else if (achievement.id === 'streak_5' && maxOverallStreak >= 5) {
        isQualified = true;
      } else if (achievement.id === 'streak_15' && maxOverallStreak >= 15) {
        isQualified = true;
      } else if (achievement.id === 'centurion' && totalAttempts >= 100) {
        isQualified = true;
      } else if (achievement.id === 'grand_polymath' && categoriesWithStreaks.size >= 5) {
        isQualified = true;
      } else if (achievement.category) {
        const categoryModules = Object.keys(MODULE_CATEGORIES).filter(
          (m) => MODULE_CATEGORIES[m] === achievement.category,
        );
        const hasPracticedCategory = categoryModules.every(
          (m) => (allTelemetry[m]?.highScore ?? 0) >= 3,
        );
        if (hasPracticedCategory) {
          isQualified = true;
        }
      }

      if (isQualified) {
        unlocked.add(achievement.id);
        newlyUnlocked.push({
          id: achievement.id,
          titleKey: achievement.titleKey,
          descriptionKey: achievement.descriptionKey,
        });
      }
    }

    if (newlyUnlocked.length > 0) {
      this.setUnlockedAchievements(Array.from(unlocked));
      if (typeof window !== 'undefined') {
        for (const item of newlyUnlocked) {
          window.dispatchEvent(
            new CustomEvent<AchievementUnlockedDetail>(ACHIEVEMENT_UNLOCKED_EVENT, {
              detail: item,
            }),
          );
        }
      }
    }

    return newlyUnlocked;
  }

  exportBackupJson(): string {
    const backup: ExportedBackupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      telemetry: this.getAllModuleTelemetry(),
      dailyActivity: this.getDailyActivity(),
      unlockedAchievements: this.getUnlockedAchievements(),
      settings: {
        appStyle: this.getAppStyle(),
        language: this.getLanguage(),
        dateFormat: this.getDateFormat(),
        sidebarCollapsed: this.getSidebarCollapsed(),
      },
    };
    return JSON.stringify(backup, null, 2);
  }

  importBackupJson(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString) as Partial<ExportedBackupData>;
      if (!parsed || typeof parsed !== 'object') return false;

      if (parsed.telemetry && typeof parsed.telemetry === 'object') {
        for (const [moduleId, telemetry] of Object.entries(parsed.telemetry)) {
          if (telemetry && typeof telemetry === 'object') {
            this.setModuleTelemetry(moduleId, telemetry as ModuleTelemetry);
            if (typeof telemetry.currentStreak === 'number') {
              this.setStreak(moduleId, telemetry.currentStreak);
            }
            if (typeof telemetry.highScore === 'number') {
              this.setHighScore(moduleId, telemetry.highScore);
            }
          }
        }
      }

      if (parsed.dailyActivity && typeof parsed.dailyActivity === 'object') {
        this.setDailyActivity(parsed.dailyActivity);
      }

      if (Array.isArray(parsed.unlockedAchievements)) {
        this.setUnlockedAchievements(parsed.unlockedAchievements);
      }

      if (parsed.settings && typeof parsed.settings === 'object') {
        if (parsed.settings.appStyle) this.setAppStyle(parsed.settings.appStyle);
        if (parsed.settings.language) this.setLanguage(parsed.settings.language);
        if (parsed.settings.dateFormat) this.setDateFormat(parsed.settings.dateFormat);
        if (typeof parsed.settings.sidebarCollapsed === 'boolean') {
          this.setSidebarCollapsed(parsed.settings.sidebarCollapsed);
        }
      }

      return true;
    } catch (e) {
      console.warn('[StorageService] Failed to import backup JSON:', e);
      return false;
    }
  }

  resetModuleScores(moduleId: string): void {
    this.removeStreak(moduleId);
    this.removeHighScore(moduleId);
    this.removeItem(STORAGE_KEYS.moduleTelemetry(moduleId));
  }

  resetAllScores(moduleIds: readonly { id: string }[] | readonly string[]): void {
    for (const item of moduleIds) {
      const id = typeof item === 'string' ? item : item.id;
      this.resetModuleScores(id);
    }
  }

  resetAllAnalytics(): void {
    for (const moduleId of ALL_MODULE_IDS) {
      this.resetModuleScores(moduleId);
    }
    this.removeItem(STORAGE_KEYS.DAILY_ACTIVITY);
    this.removeItem(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS);
  }
}

export const storageService = new StorageService();
