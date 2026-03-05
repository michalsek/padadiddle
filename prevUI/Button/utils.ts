import { BUTTON_VARIANTS } from './constants';
import type { ButtonVariant } from './types';

// Returns palette colors for the selected button variant and theme.
export function getButtonPalette(variant: ButtonVariant, isDark: boolean) {
  const scheme = BUTTON_VARIANTS[variant];

  return {
    backgroundColor: isDark ? scheme.darkBackground : scheme.lightBackground,
    borderColor: isDark ? scheme.darkBorder : scheme.lightBorder,
    textColor: isDark ? scheme.darkText : scheme.lightText,
  };
}
