import type { Theme } from '../../../theme';

/**
 * Resolves background color for the Box container.
 * Input parameters:
 * - `theme`: active semantic theme token object.
 * Output:
 * - Background color string for the base Box surface.
 * Logic summary:
 * - Always maps to `theme.colors.background` so Box follows the new theme contract.
 */
export function getBoxBackgroundColor(theme: Theme): string {
  return theme.colors.background;
}
