import type { Theme } from '../../theme';
import type { IconTone } from './types';

/**
 * Resolves a semantic icon tone into a theme color.
 * Input parameters:
 * - `tone`: semantic icon tone.
 * - `theme`: active semantic theme token object.
 * Output:
 * - Theme-derived color string used by the rendered icon component.
 * Logic summary:
 * - Keeps the default icon tone on base text color for parity with body content.
 * - Reuses the flat theme color surface instead of icon-specific color tokens.
 */
export function getIconColor(tone: IconTone, theme: Theme): string {
  if (tone === 'muted') {
    return theme.colors.secondary;
  }

  if (tone === 'primary') {
    return theme.colors.primary;
  }

  if (tone === 'secondary') {
    return theme.colors.secondary;
  }

  if (tone === 'danger') {
    return theme.colors.danger;
  }

  if (tone === 'warning') {
    return theme.colors.warning;
  }

  if (tone === 'success') {
    return theme.colors.success;
  }

  if (tone === 'contrast') {
    return theme.colors.textContrast;
  }

  return theme.colors.textBase;
}
