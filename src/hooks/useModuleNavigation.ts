import { useCallback, useEffect, useState } from 'react';

export type NavigationMode = 'tool' | 'practice' | 'guide';

export interface UseModuleNavigationResult {
  activeModuleId: string;
  mode: NavigationMode;
  setActiveModuleId: (id: string) => void;
  setMode: (mode: NavigationMode) => void;
  navigate: (id: string, mode?: NavigationMode) => void;
}

const DEFAULT_MODULE = 'doomsday';
const DEFAULT_MODE: NavigationMode = 'tool';

const parseHash = (
  fallbackModuleId: string = DEFAULT_MODULE,
): { moduleId: string; mode: NavigationMode } => {
  if (typeof window === 'undefined') {
    return { moduleId: fallbackModuleId, mode: DEFAULT_MODE };
  }

  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) {
    return { moduleId: fallbackModuleId, mode: DEFAULT_MODE };
  }

  const [path, queryString] = hash.split('?');
  const moduleId = path ? path.toLowerCase().trim() : fallbackModuleId;

  let mode: NavigationMode = DEFAULT_MODE;
  if (queryString) {
    const params = new URLSearchParams(queryString);
    const modeParam = params.get('mode');
    if (modeParam === 'tool' || modeParam === 'practice' || modeParam === 'guide') {
      mode = modeParam;
    }
  }

  return { moduleId, mode };
};

const formatHash = (moduleId: string, mode: NavigationMode): string => {
  if (mode === 'tool') {
    return `#/${moduleId}`;
  }
  return `#/${moduleId}?mode=${mode}`;
};

export const useModuleNavigation = (
  fallbackModuleId: string = DEFAULT_MODULE,
): UseModuleNavigationResult => {
  const [navState, setNavState] = useState(() => {
    const parsed = parseHash(fallbackModuleId);
    return {
      activeModuleId: parsed.moduleId,
      mode: parsed.mode,
    };
  });

  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHash(fallbackModuleId);
      setNavState({
        activeModuleId: parsed.moduleId,
        mode: parsed.mode,
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [fallbackModuleId]);

  const updateHash = useCallback((newModuleId: string, newMode: NavigationMode) => {
    const targetHash = formatHash(newModuleId, newMode);
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    setNavState({ activeModuleId: newModuleId, mode: newMode });
  }, []);

  const setActiveModuleId = useCallback(
    (id: string) => {
      updateHash(id, navState.mode);
    },
    [navState.mode, updateHash],
  );

  const setMode = useCallback(
    (mode: NavigationMode) => {
      updateHash(navState.activeModuleId, mode);
    },
    [navState.activeModuleId, updateHash],
  );

  const navigate = useCallback(
    (id: string, mode: NavigationMode = 'tool') => {
      updateHash(id, mode);
    },
    [updateHash],
  );

  return {
    activeModuleId: navState.activeModuleId,
    mode: navState.mode,
    setActiveModuleId,
    setMode,
    navigate,
  };
};
