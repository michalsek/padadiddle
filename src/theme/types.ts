/**
 * Theme color tokens consumed by cross-component styles.
 * The contract is intentionally flat and limited to 12 semantic keys.
 */
export type ThemeColors = {
  primary: string;
  secondary: string;
  danger: string;
  warning: string;
  success: string;
  textBase: string;
  textContrast: string;
  background: string;
  backgroundContrast: string;
  border: string;
  backgroundTransparent: string;
  backgroundContrastTransparent: string;
};

/**
 * Theme typography scale used for shared text sizing.
 * Only semantic size steps are exposed at theme level.
 */
export type ThemeTypography = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
};

/**
 * Theme spacing scale used for shared layout gaps and paddings.
 * The scale is constrained to six semantic steps.
 */
export type ThemeSpacing = {
  '2sm': number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
};

/**
 * Theme radius tokens used by shared rounded corners.
 * Full radius is intended for pill/circle-like shapes.
 */
export type ThemeRadius = {
  sm: number;
  md: number;
  lg: number;
  full: number;
};

/**
 * Main theme contract.
 * Input: consumed as the argument for theme-aware style factory functions.
 * Output: constrained category tokens for colors, spacing, radius, and typography.
 */
export type Theme = {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  typography: ThemeTypography;
};

export type ThemeName = 'light' | 'dark';
