import type { Theme, ThemeName } from './types';

/**
 * Creates a fresh spacing token object for a single theme instance.
 * Input: none.
 * Output: a new constrained `Theme['spacing']` object.
 * Logic summary:
 * - Returns the six-level spacing scale used by shared layout primitives.
 */
function createSpacingTokens(): Theme['spacing'] {
  return {
    '2sm': 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
  };
}

/**
 * Creates a fresh radius token object for a single theme instance.
 * Input: none.
 * Output: a new constrained `Theme['radius']` object.
 * Logic summary:
 * - Standardizes shared corner radii while keeping fully rounded shapes explicit.
 */
function createRadiusTokens(): Theme['radius'] {
  return {
    sm: 8,
    md: 10,
    lg: 12,
    full: 999,
  };
}

/**
 * Creates a fresh typography token object for a single theme instance.
 * Input: none.
 * Output: a new constrained `Theme['typography']` object.
 * Logic summary:
 * - Provides shared text sizes only; line-height and weight stay component-local.
 */
function createTypographyTokens(): Theme['typography'] {
  return {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    '2xl': 24,
  };
}

/**
 * Light theme token set.
 * Input: none.
 * Output: a complete `Theme` object configured for light color scheme surfaces.
 */
export const lightTheme: Theme = {
  colors: {
    primary: '#2563EB',
    secondary: '#64748B',
    danger: '#D92D20',
    warning: '#D97706',
    success: '#15803D',
    textBase: '#111827',
    textContrast: '#F9FAFB',
    background: '#FFFFFF',
    backgroundContrast: '#111827',
    border: '#D1D5DB',
    backgroundTransparent: '#FFFFFFCC',
    backgroundContrastTransparent: '#111827CC',
  },
  spacing: createSpacingTokens(),
  radius: createRadiusTokens(),
  typography: createTypographyTokens(),
};

/**
 * Dark theme token set.
 * Input: none.
 * Output: a complete `Theme` object configured for dark color scheme surfaces.
 */
export const darkTheme: Theme = {
  colors: {
    primary: '#93C5FD',
    secondary: '#94A3B8',
    danger: '#FDA29B',
    warning: '#FBBF24',
    success: '#4ADE80',
    textBase: '#F9FAFB',
    textContrast: '#111827',
    background: '#030712',
    backgroundContrast: '#F9FAFB',
    border: '#374151',
    backgroundTransparent: '#030712CC',
    backgroundContrastTransparent: '#F9FAFBCC',
  },
  spacing: createSpacingTokens(),
  radius: createRadiusTokens(),
  typography: createTypographyTokens(),
};

/**
 * Theme bundle exported for app-wide consumption.
 * Input: none.
 * Output: typed collection keyed by color scheme names (`light`, `dark`).
 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
} satisfies Record<ThemeName, Theme>;
