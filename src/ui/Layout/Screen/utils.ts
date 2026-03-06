import type { Theme } from '../../../theme';

/**
 * Resolves effective screen content padding.
 * Input parameters:
 * - `padding`: optional caller-provided numeric padding.
 * - `disableSafeArea`: whether safe-area behavior is disabled.
 * - `theme`: active semantic theme token object.
 * Output:
 * - Numeric content padding used by the screen content container.
 * Logic summary:
 * - Returns zero padding when safe-area is disabled for full-bleed layouts.
 * - Otherwise prefers caller value and falls back to `theme.spacing.lg`.
 */
export function getScreenPadding(
  padding: number | undefined,
  disableSafeArea: boolean,
  theme: Theme,
): number {
  if (disableSafeArea) {
    return 0;
  }

  return padding ?? theme.spacing.lg;
}
