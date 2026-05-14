/**
 * Environment Variables Validation
 * Ensures all required environment variables are properly configured
 */

const REQUIRED_ENV_VARS = {
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: {
    required: false,
    description: 'Supabase project URL',
  },
  NEXT_PUBLIC_SUPABASE_ANON_KEY: {
    required: false,
    description: 'Supabase anonymous key',
  },
  // API
  NEXT_PUBLIC_API_BASE_URL: {
    required: false,
    description: 'Base URL for API calls',
  },
  NEXT_PUBLIC_API_SECRET: {
    required: false,
    description: 'API secret for authentication',
  },
  // Analytics
  VERCEL_API_TOKEN: {
    required: false,
    description: 'Vercel API token for analytics',
  },
  VERCEL_PROJECT_ID: {
    required: false,
    description: 'Vercel project ID',
  },
};

interface ValidationResult {
  valid: boolean;
  missing: string[];
  warnings: string[];
}

/**
 * Validate environment variables
 */
export function validateEnvironment(): ValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  Object.entries(REQUIRED_ENV_VARS).forEach(([key, config]) => {
    const value = process.env[key];

    if (config.required && !value) {
      missing.push(`${key}: ${config.description}`);
    }

    if (!config.required && !value) {
      warnings.push(`${key} is not configured (${config.description})`);
    }
  });

  return {
    valid: missing.length === 0,
    missing,
    warnings,
  };
}

/**
 * Get validation report as formatted string
 */
export function getValidationReport(): string {
  const result = validateEnvironment();

  if (result.valid && result.warnings.length === 0) {
    return '✓ All environment variables are properly configured';
  }

  let report = '';

  if (result.missing.length > 0) {
    report += '✗ Missing required environment variables:\n';
    result.missing.forEach((m) => {
      report += `  - ${m}\n`;
    });
  }

  if (result.warnings.length > 0) {
    report += '⚠ Optional environment variables not configured:\n';
    result.warnings.forEach((w) => {
      report += `  - ${w}\n`;
    });
  }

  return report;
}

/**
 * Log validation warnings in development only
 */
export function logValidationWarnings(): void {
  if (process.env.NODE_ENV !== 'development') return;

  const result = validateEnvironment();

  if (result.warnings.length > 0 && typeof window === 'undefined') {
    console.warn('[ENV] Optional configuration:', result.warnings.join(', '));
  }
}
