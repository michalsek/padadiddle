/**
 * Theme color tokens used by UI layers.
 * These values are consumed by style creators and should remain platform-agnostic.
 */
export type ThemeColors = {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  accent: string;
  danger: string;
};

/**
 * Theme text tokens used by typography styles.
 * The object groups font families, scalable sizes, and line-height defaults.
 */
export type ThemeText = {
  fontFamily: string;
  fontFamilyMedium: string;
  fontFamilyBold: string;
  size: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  lineHeight: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
};

/**
 * Theme spacing tokens used by layout and component padding/margins.
 * Values are numeric to map directly to React Native style dimensions.
 */
export type ThemeSpacing = {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

/**
 * Main theme contract.
 * Input: consumed as the argument for theme-aware style factory functions.
 * Output: a fully typed set of category tokens for colors, text, and spacing.
 */
export type Theme = {
  colors: ThemeColors;
  text: ThemeText;
  spacing: ThemeSpacing;
};

export type ThemeName = 'light' | 'dark';
