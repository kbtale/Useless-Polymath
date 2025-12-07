import Dexie, { type Table } from 'dexie';

export interface UserProfile {
  id: string;
  totalXp: number;
  currentStreak: number;
  lastLoginDate: string;
  settings: {
    language: 'es' | 'en';
    soundEnabled: boolean;
    haptics: boolean;
  };
}

export interface SkillStats {
  moduleId: string;
  level: number;
  xp: number;
  exercisesCompleted: number;
  accuracy: number;
  medals: string[];
}

export interface ActivityLog {
  id?: number;
  moduleId: string;
  timestamp: number;
  result: 'success' | 'fail';
  timeTakenMs: number;
}

export class UselessDB extends Dexie {
  userProfile!: Table<UserProfile>;
  skillStats!: Table<SkillStats>;
  activityLog!: Table<ActivityLog>;

  constructor() {
    super('UselessDB');
    this.version(1).stores({
      userProfile: 'id',
      skillStats: 'moduleId',
      activityLog: '++id, moduleId, timestamp'
    });
  }
}

export const db = new UselessDB();
