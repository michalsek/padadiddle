import type { Theme } from '../../theme';

/**
 * Resolves the spinner tint color.
 * Input parameters:
 * - `color`: optional explicit color override.
 * - `theme`: active semantic theme token object.
 * Output:
 * - Spinner indicator color string.
 * Logic summary:
 * - Uses the caller override when present.
 * - Falls back to the primary theme token for default loading affordance styling.
 */
export function getSpinnerColor(color: string | undefined, theme: Theme): string {
  return color ?? theme.colors.primary;
}
