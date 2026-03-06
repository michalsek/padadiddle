import type { Theme } from '../../../theme';
import type { ColumnTone } from './types';

/**
 * Resolves effective column gap value.
 * Input parameters:
 * - `gap`: optional caller-provided numeric gap.
 * - `theme`: active semantic theme token object.
 * Output:
 * - Numeric gap used in column layout styles.
 * Logic summary:
 * - Uses caller value when present.
 * - Falls back to `theme.spacing.sm` for legacy-compatible spacing defaults.
 */
export function getColumnGap(gap: number | undefined, theme: Theme): number {
  return gap ?? theme.spacing.sm;
}

/**
 * Resolves column tone background color.
 * Input parameters:
 * - `tone`: semantic column tone variant.
 * - `theme`: active semantic theme token object.
 * Output:
 * - Background color string for the selected tone.
 * Logic summary:
 * - Keeps `transparent` as local transparent literal.
 * - Maps `surface` tone to `theme.colors.background`.
 */
export function getColumnBackgroundColor(tone: ColumnTone, theme: Theme): string {
  if (tone === 'transparent') {
    return 'transparent';
  }

  return theme.colors.background;
}
