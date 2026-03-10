import type { Theme } from '../../theme';
import { ProgressBarVariants } from './constants';
import type { ProgressBarVariant } from './types';

export type ProgressBarPalette = {
  trackColor: string;
  fillColor: string;
};

/**
 * Normalizes an arbitrary progress number into the supported `[0, 1]` range.
 * Input parameters:
 * - `progress`: caller-provided progress value that may fall outside the valid range.
 * Output:
 * - A bounded progress ratio safe to use for accessibility and width rendering.
 * Logic summary:
 * - Prevents negative widths and overflow values.
 * - Keeps the component API numeric and deterministic for tests.
 */
export function normalizeProgressValue(progress: number): number {
  return Math.max(0, Math.min(1, progress));
}

/**
 * Resolves semantic progress-bar colors for the requested variant.
 * Input parameters:
 * - `theme`: active semantic theme token object.
 * - `variant`: semantic visual variant requested by the caller.
 * Output:
 * - Theme-derived track and fill colors for the bar.
 * Logic summary:
 * - Maps variants back to the constrained app theme token contract.
 * - Keeps the track neutral while letting the fill color carry semantic emphasis.
 */
export function getProgressBarPalette(
  theme: Theme,
  variant: ProgressBarVariant,
): ProgressBarPalette {
  const variantTokens = ProgressBarVariants[variant];

  return {
    trackColor: theme.colors[variantTokens.trackColorToken],
    fillColor: theme.colors[variantTokens.fillColorToken],
  };
}
