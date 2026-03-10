import type { Theme } from '../../theme';

export type RadioButtonPalette = {
  ringColor: string;
  dotColor: string;
  labelColor: string;
};

/**
 * Resolves semantic palette values for radio-button visuals across states.
 * Input parameters:
 * - `theme`: active semantic theme token object.
 * - `selected`: whether the control is currently chosen.
 * - `disabled`: whether interaction is blocked and muted styling is applied.
 * Output:
 * - Theme-derived colors for the outer ring, inner dot, and optional label.
 * Logic summary:
 * - Uses the primary token for enabled selected state.
 * - Falls back to neutral border colors for unselected state.
 * - Keeps disabled selected state visible without looking interactive.
 */
export function getRadioButtonPalette(
  theme: Theme,
  selected: boolean,
  disabled: boolean,
): RadioButtonPalette {
  if (selected) {
    const activeColor = disabled ? theme.colors.backgroundContrastTransparent : theme.colors.primary;

    return {
      ringColor: activeColor,
      dotColor: activeColor,
      labelColor: disabled ? theme.colors.secondary : theme.colors.textBase,
    };
  }

  return {
    ringColor: theme.colors.border,
    dotColor: 'transparent',
    labelColor: disabled ? theme.colors.secondary : theme.colors.textBase,
  };
}
