import type { Theme } from '../../../theme';
import type { RowTone } from './types';

/**
 * Resolves effective row gap value.
 * Input parameters:
 * - `gap`: optional caller-provided numeric gap.
 * - `theme`: active semantic theme token object.
 * Output:
 * - Numeric gap used in container layout styles.
 * Logic summary:
 * - Uses caller value when provided.
 * - Falls back to `theme.spacing.sm` for parity with legacy defaults.
 */
export function getRowGap(gap: number | undefined, theme: Theme): number {
  return gap ?? theme.spacing.sm;
}

/**
 * Resolves row tone background color.
 * Input parameters:
 * - `tone`: semantic row tone variant.
 * - `theme`: active semantic theme token object.
 * Output:
 * - Background color string for the selected tone.
 * Logic summary:
 * - Keeps `transparent` as a literal transparent surface.
 * - Maps `surface` tone to shared `theme.colors.background`.
 */
export function getRowBackgroundColor(tone: RowTone, theme: Theme): string {
  if (tone === 'transparent') {
    return 'transparent';
  }

  return theme.colors.background;
}
