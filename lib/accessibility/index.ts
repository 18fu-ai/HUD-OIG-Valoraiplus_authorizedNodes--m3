/**
 * Accessibility Capability Registry
 * 
 * Separates accessibility from presentation as a first-class runtime concern.
 * Independent from Policy Runtime and Branding Layer.
 * 
 * Architecture:
 * ┌─────────────────────────────────────┐
 * │  Accessibility Provider Layer       │
 * │           ↓                         │
 * │  Typed Contracts                    │
 * │           ↓                         │
 * │  Capability Negotiation             │
 * │           ↓                         │
 * │  Decision Engine                    │
 * │           ↓                         │
 * │  Persistence + Monitoring           │
 * └─────────────────────────────────────┘
 */

// ============================================================
// 1. ACCESSIBILITY CAPABILITY REGISTRY
// Prevents string drift between providers and UI consumers
// ============================================================

export type AccessibilityCapability =
  | 'high-contrast'
  | 'reduced-motion'
  | 'screen-reader'
  | 'keyboard-navigation'
  | 'font-scaling'
  | 'focus-tracking';

export const ACCESSIBILITY_CAPABILITIES: readonly AccessibilityCapability[] = [
  'high-contrast',
  'reduced-motion',
  'screen-reader',
  'keyboard-navigation',
  'font-scaling',
  'focus-tracking',
] as const;

// ============================================================
// 2. WCAG MAPPING
// Machine-readable WCAG criterion mapping
// ============================================================

export type WCAGLevel = 'A' | 'AA' | 'AAA';

export interface WCAGCriterion {
  id: string;
  name: string;
  level: WCAGLevel;
  principle: 'perceivable' | 'operable' | 'understandable' | 'robust';
}

export const WCAG_MAPPINGS: Record<AccessibilityCapability, WCAGCriterion[]> = {
  'high-contrast': [
    { id: '1.4.3', name: 'Contrast (Minimum)', level: 'AA', principle: 'perceivable' },
    { id: '1.4.6', name: 'Contrast (Enhanced)', level: 'AAA', principle: 'perceivable' },
    { id: '1.4.11', name: 'Non-text Contrast', level: 'AA', principle: 'perceivable' },
  ],
  'reduced-motion': [
    { id: '2.3.1', name: 'Three Flashes or Below Threshold', level: 'A', principle: 'operable' },
    { id: '2.3.3', name: 'Animation from Interactions', level: 'AAA', principle: 'operable' },
  ],
  'screen-reader': [
    { id: '1.1.1', name: 'Non-text Content', level: 'A', principle: 'perceivable' },
    { id: '1.3.1', name: 'Info and Relationships', level: 'A', principle: 'perceivable' },
    { id: '4.1.2', name: 'Name, Role, Value', level: 'A', principle: 'robust' },
  ],
  'keyboard-navigation': [
    { id: '2.1.1', name: 'Keyboard', level: 'A', principle: 'operable' },
    { id: '2.1.2', name: 'No Keyboard Trap', level: 'A', principle: 'operable' },
    { id: '2.4.3', name: 'Focus Order', level: 'A', principle: 'operable' },
    { id: '2.4.7', name: 'Focus Visible', level: 'AA', principle: 'operable' },
  ],
  'font-scaling': [
    { id: '1.4.4', name: 'Resize Text', level: 'AA', principle: 'perceivable' },
    { id: '1.4.10', name: 'Reflow', level: 'AA', principle: 'perceivable' },
    { id: '1.4.12', name: 'Text Spacing', level: 'AA', principle: 'perceivable' },
  ],
  'focus-tracking': [
    { id: '2.4.7', name: 'Focus Visible', level: 'AA', principle: 'operable' },
    { id: '3.2.1', name: 'On Focus', level: 'A', principle: 'understandable' },
  ],
};

// ============================================================
// 3. DETERMINISTIC ACCESSIBILITY DECISION
// Mirrors policy architecture: input → evaluation → decision → state
// ============================================================

export type DecisionSource = 'user' | 'system' | 'wcag';

export interface AccessibilityDecision {
  capability: AccessibilityCapability;
  enabled: boolean;
  reason: string;
  source: DecisionSource;
  evaluatedAt: string;
  wcagCriteria: string[];
}

export interface AccessibilityState {
  decisions: AccessibilityDecision[];
  targetLevel: WCAGLevel;
  lastEvaluated: string;
  version: string;
}

// ============================================================
// 4. CAPABILITY NEGOTIATION
// Detects system preferences and negotiates with user settings
// ============================================================

export interface SystemPreferences {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersColorScheme: 'light' | 'dark' | 'no-preference';
  forcedColors: boolean;
}

export interface UserPreferences {
  overrides: Partial<Record<AccessibilityCapability, boolean>>;
  targetLevel: WCAGLevel;
}

// ============================================================
// 5. DECISION ENGINE
// Pure functions for deterministic evaluation
// ============================================================

export function evaluateCapability(
  capability: AccessibilityCapability,
  systemPrefs: SystemPreferences,
  userPrefs: UserPreferences
): AccessibilityDecision {
  const timestamp = new Date().toISOString();
  const wcagCriteria = WCAG_MAPPINGS[capability].map(c => c.id);

  // User override takes priority
  if (userPrefs.overrides[capability] !== undefined) {
    return {
      capability,
      enabled: userPrefs.overrides[capability]!,
      reason: 'User preference override',
      source: 'user',
      evaluatedAt: timestamp,
      wcagCriteria,
    };
  }

  // System preference detection
  switch (capability) {
    case 'reduced-motion':
      return {
        capability,
        enabled: systemPrefs.prefersReducedMotion,
        reason: systemPrefs.prefersReducedMotion
          ? 'System prefers-reduced-motion detected'
          : 'No reduced motion preference detected',
        source: 'system',
        evaluatedAt: timestamp,
        wcagCriteria,
      };

    case 'high-contrast':
      return {
        capability,
        enabled: systemPrefs.prefersHighContrast || systemPrefs.forcedColors,
        reason: systemPrefs.forcedColors
          ? 'Forced colors mode active'
          : systemPrefs.prefersHighContrast
            ? 'High contrast preference detected'
            : 'Standard contrast mode',
        source: 'system',
        evaluatedAt: timestamp,
        wcagCriteria,
      };

    case 'keyboard-navigation':
    case 'focus-tracking':
      // Always enabled for WCAG AA compliance
      return {
        capability,
        enabled: true,
        reason: `Required for WCAG ${userPrefs.targetLevel} compliance`,
        source: 'wcag',
        evaluatedAt: timestamp,
        wcagCriteria,
      };

    case 'screen-reader':
      // Cannot reliably detect, default to accessible markup
      return {
        capability,
        enabled: true,
        reason: 'Accessible markup always provided',
        source: 'wcag',
        evaluatedAt: timestamp,
        wcagCriteria,
      };

    case 'font-scaling':
      // Always support font scaling for WCAG compliance
      return {
        capability,
        enabled: true,
        reason: 'Responsive typography enabled',
        source: 'wcag',
        evaluatedAt: timestamp,
        wcagCriteria,
      };

    default:
      return {
        capability,
        enabled: false,
        reason: 'Unknown capability',
        source: 'system',
        evaluatedAt: timestamp,
        wcagCriteria: [],
      };
  }
}

export function evaluateAllCapabilities(
  systemPrefs: SystemPreferences,
  userPrefs: UserPreferences
): AccessibilityState {
  const decisions = ACCESSIBILITY_CAPABILITIES.map(cap =>
    evaluateCapability(cap, systemPrefs, userPrefs)
  );

  return {
    decisions,
    targetLevel: userPrefs.targetLevel,
    lastEvaluated: new Date().toISOString(),
    version: '1.0.0',
  };
}

// ============================================================
// 6. DEFAULT PREFERENCES
// Safe defaults for SSR and initial render
// ============================================================

export const DEFAULT_SYSTEM_PREFERENCES: SystemPreferences = {
  prefersReducedMotion: false,
  prefersHighContrast: false,
  prefersColorScheme: 'no-preference',
  forcedColors: false,
};

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  overrides: {},
  targetLevel: 'AA',
};

// ============================================================
// 7. UTILITY FUNCTIONS
// ============================================================

export function isCapabilityEnabled(
  state: AccessibilityState,
  capability: AccessibilityCapability
): boolean {
  const decision = state.decisions.find(d => d.capability === capability);
  return decision?.enabled ?? false;
}

export function getDecisionReason(
  state: AccessibilityState,
  capability: AccessibilityCapability
): string {
  const decision = state.decisions.find(d => d.capability === capability);
  return decision?.reason ?? 'No decision recorded';
}

export function getWCAGCompliance(state: AccessibilityState): {
  level: WCAGLevel;
  compliant: boolean;
  missingCriteria: string[];
} {
  const requiredForAA: AccessibilityCapability[] = [
    'keyboard-navigation',
    'focus-tracking',
    'font-scaling',
  ];

  const missingCriteria: string[] = [];

  for (const cap of requiredForAA) {
    if (!isCapabilityEnabled(state, cap)) {
      const criteria = WCAG_MAPPINGS[cap]
        .filter(c => c.level === 'A' || c.level === 'AA')
        .map(c => c.id);
      missingCriteria.push(...criteria);
    }
  }

  return {
    level: state.targetLevel,
    compliant: missingCriteria.length === 0,
    missingCriteria,
  };
}

// ============================================================
// 8. DEBUG / MONITORING
// ============================================================

export function formatAccessibilityReport(state: AccessibilityState): string {
  const lines = [
    '=== ACCESSIBILITY STATE REPORT ===',
    `Target Level: WCAG ${state.targetLevel}`,
    `Last Evaluated: ${state.lastEvaluated}`,
    `Version: ${state.version}`,
    '',
    '--- Capability Decisions ---',
  ];

  for (const decision of state.decisions) {
    lines.push(
      `[${decision.enabled ? 'ON ' : 'OFF'}] ${decision.capability}`,
      `      Source: ${decision.source}`,
      `      Reason: ${decision.reason}`,
      `      WCAG: ${decision.wcagCriteria.join(', ') || 'N/A'}`,
      ''
    );
  }

  const compliance = getWCAGCompliance(state);
  lines.push(
    '--- Compliance Status ---',
    `WCAG ${compliance.level}: ${compliance.compliant ? 'COMPLIANT' : 'NON-COMPLIANT'}`,
  );

  if (!compliance.compliant) {
    lines.push(`Missing Criteria: ${compliance.missingCriteria.join(', ')}`);
  }

  return lines.join('\n');
}
