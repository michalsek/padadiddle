import type { Theme } from '../../../theme';
import type { SpacerAxis, SpacerTone } from './types';

/**
 * Resolves effective spacer size.
 * Input parameters:
 * - `size`: optional caller-provided spacer size.
 * - `theme`: active semantic theme token object.
 * Output:
 * - Numeric spacer size used in dimension calculations.
 * Logic summary:
 * - Uses caller value when provided.
 * - Falls back to `theme.spacing.md` for legacy-compatible defaults.
 */
export function getSpacerSize(size: number | undefined, theme: Theme): number {
  return size ?? theme.spacing.md;
}

/**
 * Resolves spacer width and height based on axis.
 * Input parameters:
 * - `size`: resolved spacer size.
 * - `axis`: orientation of the spacer.
 * Output:
 * - Partial view style object with width/height dimensions.
 * Logic summary:
 * - Horizontal spacers reserve width and keep height minimal.
 * - Vertical spacers reserve height and keep width minimal.
 */
export function getSpacerDimensions(size: number, axis: SpacerAxis) {
  if (axis === 'horizontal') {
    return { width: size, height: 1 };
  }

  return { width: 1, height: size };
}

/**
 * Resolves spacer tone background color.
 * Input parameters:
 * - `tone`: semantic spacer tone variant.
 * - `theme`: active semantic theme token object.
 * Output:
 * - Background color string for spacer rendering.
 * Logic summary:
 * - Keeps `transparent` as literal transparent background.
 * - Maps `line` tone to shared `theme.colors.border` token.
 */
export function getSpacerBackgroundColor(tone: SpacerTone, theme: Theme): string {
  if (tone === 'transparent') {
    return 'transparent';
  }

  return theme.colors.border;
}
