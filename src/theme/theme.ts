import type { Theme } from './types';

/**
 * Shared text token baseline used across themes.
 * Input: none.
 * Output: typography token defaults reused by both light and dark themes.
 */
const baseTextTokens: Theme['text'] = {
  fontFamily: 'System',
  fontFamilyMedium: 'System',
  fontFamilyBold: 'System',
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 22,
    lg: 28,
    xl: 32,
  },
};

/**
 * Shared spacing token baseline used across themes.
 * Input: none.
 * Output: spacing scale that maps directly to React Native style dimensions.
 */
const baseSpacingTokens: Theme['spacing'] = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

/**
 * Light theme token set.
 * Input: none.
 * Output: a complete `Theme` object configured for light color scheme surfaces.
 */
export const lightTheme: Theme = {
  colors: {
    background: '#FFFFFF',
    surface: '#F7F8FA',
    textPrimary: '#101828',
    textSecondary: '#475467',
    border: '#D0D5DD',
    accent: '#0BA5EC',
    danger: '#D92D20',
  },
  text: baseTextTokens,
  spacing: baseSpacingTokens,
};

/**
 * Dark theme token set.
 * Input: none.
 * Output: a complete `Theme` object configured for dark color scheme surfaces.
 */
export const darkTheme: Theme = {
  colors: {
    background: '#101318',
    surface: '#1B1F27',
    textPrimary: '#F5F7FA',
    textSecondary: '#98A2B3',
    border: '#344054',
    accent: '#53B1FD',
    danger: '#FDA29B',
  },
  text: baseTextTokens,
  spacing: baseSpacingTokens,
};

/**
 * Theme bundle exported for app-wide consumption.
 * Input: none.
 * Output: typed collection keyed by color scheme names (`light`, `dark`).
 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;
