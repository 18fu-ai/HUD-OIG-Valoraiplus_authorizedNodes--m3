'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  evaluateAllCapabilities,
  isCapabilityEnabled,
  getDecisionReason,
  getWCAGCompliance,
  formatAccessibilityReport,
  DEFAULT_SYSTEM_PREFERENCES,
  DEFAULT_USER_PREFERENCES,
  type AccessibilityCapability,
  type AccessibilityState,
  type SystemPreferences,
  type UserPreferences,
  type WCAGLevel,
} from './index';

// ============================================================
// CONTEXT TYPE
// ============================================================

interface AccessibilityContextValue {
  state: AccessibilityState;
  isEnabled: (capability: AccessibilityCapability) => boolean;
  getReason: (capability: AccessibilityCapability) => string;
  setUserOverride: (capability: AccessibilityCapability, enabled: boolean) => void;
  clearUserOverride: (capability: AccessibilityCapability) => void;
  setTargetLevel: (level: WCAGLevel) => void;
  getComplianceStatus: () => { level: WCAGLevel; compliant: boolean; missingCriteria: string[] };
  refresh: () => void;
  debug: () => string;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

// ============================================================
// PROVIDER COMPONENT
// ============================================================

interface AccessibilityProviderProps {
  children: ReactNode;
  defaultTargetLevel?: WCAGLevel;
}

export function AccessibilityProvider({
  children,
  defaultTargetLevel = 'AA',
}: AccessibilityProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [systemPrefs, setSystemPrefs] = useState<SystemPreferences>(DEFAULT_SYSTEM_PREFERENCES);
  const [userPrefs, setUserPrefs] = useState<UserPreferences>({
    ...DEFAULT_USER_PREFERENCES,
    targetLevel: defaultTargetLevel,
  });
  const [state, setState] = useState<AccessibilityState>(() =>
    evaluateAllCapabilities(DEFAULT_SYSTEM_PREFERENCES, {
      ...DEFAULT_USER_PREFERENCES,
      targetLevel: defaultTargetLevel,
    })
  );

  // Detect system preferences after mount
  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    const detectSystemPreferences = (): SystemPreferences => {
      return {
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        prefersHighContrast: window.matchMedia('(prefers-contrast: more)').matches,
        prefersColorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'light'
            : 'no-preference',
        forcedColors: window.matchMedia('(forced-colors: active)').matches,
      };
    };

    const prefs = detectSystemPreferences();
    setSystemPrefs(prefs);
    setState(evaluateAllCapabilities(prefs, userPrefs));

    // Listen for system preference changes
    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-contrast: more)'),
      window.matchMedia('(prefers-color-scheme: dark)'),
      window.matchMedia('(forced-colors: active)'),
    ];

    const handleChange = () => {
      const newPrefs = detectSystemPreferences();
      setSystemPrefs(newPrefs);
    };

    mediaQueries.forEach(mq => {
      mq.addEventListener('change', handleChange);
    });

    return () => {
      mediaQueries.forEach(mq => {
        mq.removeEventListener('change', handleChange);
      });
    };
  }, []);

  // Re-evaluate when preferences change
  useEffect(() => {
    if (mounted) {
      setState(evaluateAllCapabilities(systemPrefs, userPrefs));
    }
  }, [systemPrefs, userPrefs, mounted]);

  const isEnabled = useCallback(
    (capability: AccessibilityCapability) => isCapabilityEnabled(state, capability),
    [state]
  );

  const getReason = useCallback(
    (capability: AccessibilityCapability) => getDecisionReason(state, capability),
    [state]
  );

  const setUserOverride = useCallback((capability: AccessibilityCapability, enabled: boolean) => {
    setUserPrefs(prev => ({
      ...prev,
      overrides: {
        ...prev.overrides,
        [capability]: enabled,
      },
    }));
  }, []);

  const clearUserOverride = useCallback((capability: AccessibilityCapability) => {
    setUserPrefs(prev => {
      const newOverrides = { ...prev.overrides };
      delete newOverrides[capability];
      return {
        ...prev,
        overrides: newOverrides,
      };
    });
  }, []);

  const setTargetLevel = useCallback((level: WCAGLevel) => {
    setUserPrefs(prev => ({
      ...prev,
      targetLevel: level,
    }));
  }, []);

  const getComplianceStatus = useCallback(() => getWCAGCompliance(state), [state]);

  const refresh = useCallback(() => {
    setState(evaluateAllCapabilities(systemPrefs, userPrefs));
  }, [systemPrefs, userPrefs]);

  const debug = useCallback(() => formatAccessibilityReport(state), [state]);

  const value: AccessibilityContextValue = {
    state,
    isEnabled,
    getReason,
    setUserOverride,
    clearUserOverride,
    setTargetLevel,
    getComplianceStatus,
    refresh,
    debug,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

// ============================================================
// HOOK
// ============================================================

export function useAccessibility(): AccessibilityContextValue {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}

// ============================================================
// UTILITY HOOKS
// ============================================================

export function useReducedMotion(): boolean {
  const { isEnabled } = useAccessibility();
  return isEnabled('reduced-motion');
}

export function useHighContrast(): boolean {
  const { isEnabled } = useAccessibility();
  return isEnabled('high-contrast');
}

export function useFocusTracking(): boolean {
  const { isEnabled } = useAccessibility();
  return isEnabled('focus-tracking');
}
