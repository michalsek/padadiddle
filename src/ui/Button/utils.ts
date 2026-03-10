import type { Theme } from '../../theme';
import type { ButtonVariant } from './types';

export type ButtonPalette = {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
};

/**
 * Resolves semantic palette values for the button surface.
 * Input parameters:
 * - `variant`: semantic visual variant requested by the caller.
 * - `theme`: active semantic theme token object.
 * - `disabled`: flag describing whether the button is interactive.
 * Output:
 * - Theme-derived background, border, text colors, and overall opacity.
 * Logic summary:
 * - Maps each variant to the limited theme token surface instead of hard-coded colors.
 * - Applies disabled semantics through theme-transparent colors and reduced opacity.
 */
export function getButtonPalette(
  variant: ButtonVariant,
  theme: Theme,
  disabled: boolean,
): ButtonPalette {
  if (variant === 'secondary') {
    return {
      backgroundColor: disabled ? theme.colors.backgroundTransparent : theme.colors.background,
      borderColor: theme.colors.border,
      textColor: disabled ? theme.colors.secondary : theme.colors.textBase,
    };
  }

  if (variant === 'ghost') {
    return {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: disabled ? theme.colors.secondary : theme.colors.textBase,
    };
  }

  return {
    backgroundColor: disabled ? theme.colors.backgroundContrastTransparent : theme.colors.primary,
    borderColor: disabled ? theme.colors.backgroundContrastTransparent : theme.colors.primary,
    textColor: theme.colors.textContrast,
  };
}
