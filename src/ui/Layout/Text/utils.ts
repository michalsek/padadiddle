import type { Theme } from '../../../theme';
import type { BodyTextVariant } from './types';

/**
 * Resolves body text color for the selected variant.
 * Input parameters:
 * - `variant`: semantic text variant.
 * - `theme`: active semantic theme token object.
 * Output:
 * - Text color string for the resolved body text variant.
 * Logic summary:
 * - Maps `default` to base readable text token.
 * - Maps `muted` to secondary/muted text token.
 */
export function getBodyTextColor(variant: BodyTextVariant, theme: Theme): string {
  if (variant === 'muted') {
    return theme.colors.secondary;
  }

  return theme.colors.textBase;
}
