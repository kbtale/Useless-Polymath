import { useCallback, useState } from 'react';
import { storageService } from '@/services/storage';

export function usePracticeStreak(moduleId: string) {
  const [streak, setStreakState] = useState<number>(() => {
    return storageService.getStreak(moduleId);
  });

  const [highScore, setHighScoreState] = useState<number>(() => {
    return storageService.getHighScore(moduleId);
  });

  const recordCorrect = useCallback(() => {
    const result = storageService.recordPracticeAttempt(moduleId, true);
    setStreakState(result.telemetry.currentStreak);
    setHighScoreState(result.telemetry.highScore);
    return result;
  }, [moduleId]);

  const recordIncorrect = useCallback(() => {
    const result = storageService.recordPracticeAttempt(moduleId, false);
    setStreakState(result.telemetry.currentStreak);
    setHighScoreState(result.telemetry.highScore);
    return result;
  }, [moduleId]);

  const setStreak = useCallback(
    (newStreakOrUpdater: number | ((prev: number) => number)) => {
      setStreakState((prevStreak) => {
        const nextVal =
          typeof newStreakOrUpdater === 'function'
            ? newStreakOrUpdater(prevStreak)
            : newStreakOrUpdater;

        if (nextVal > prevStreak) {
          storageService.recordPracticeAttempt(moduleId, true);
          storageService.setStreak(moduleId, nextVal);
        } else if (nextVal === 0 && prevStreak > 0) {
          storageService.recordPracticeAttempt(moduleId, false);
          storageService.setStreak(moduleId, 0);
        } else {
          storageService.setStreak(moduleId, nextVal);
        }

        const newHigh = Math.max(storageService.getHighScore(moduleId), nextVal);
        setHighScoreState(newHigh);
        storageService.setHighScore(moduleId, newHigh);
        return nextVal;
      });
    },
    [moduleId],
  );

  const resetStreak = useCallback(() => {
    setStreak(0);
  }, [setStreak]);

  return {
    streak,
    highScore,
    setStreak,
    resetStreak,
    recordCorrect,
    recordIncorrect,
  };
}
