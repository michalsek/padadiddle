import type { Theme } from '../../theme';

export type CheckboxPalette = {
  backgroundColor: string;
  borderColor: string;
  checkColor: string;
  labelColor: string;
};

/**
 * Resolves semantic palette values for checkbox visuals across states.
 * Input parameters:
 * - `theme`: active semantic theme token object.
 * - `checked`: whether the checkbox is currently selected.
 * - `disabled`: whether the checkbox blocks interaction and uses muted colors.
 * Output:
 * - Theme-derived colors for the indicator background, border, check mark, and label.
 * Logic summary:
 * - Uses the primary token for enabled selected state.
 * - Falls back to neutral border/background tokens for unchecked or disabled states.
 * - Keeps label color aligned with interaction availability.
 */
export function getCheckboxPalette(
  theme: Theme,
  checked: boolean,
  disabled: boolean,
): CheckboxPalette {
  if (checked) {
    return {
      backgroundColor: disabled ? theme.colors.backgroundContrastTransparent : theme.colors.primary,
      borderColor: disabled ? theme.colors.backgroundContrastTransparent : theme.colors.primary,
      checkColor: theme.colors.textContrast,
      labelColor: disabled ? theme.colors.secondary : theme.colors.textBase,
    };
  }

  return {
    backgroundColor: 'transparent',
    borderColor: theme.colors.border,
    checkColor: 'transparent',
    labelColor: disabled ? theme.colors.secondary : theme.colors.textBase,
  };
}
