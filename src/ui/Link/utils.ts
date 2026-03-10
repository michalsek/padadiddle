import type { Theme } from '../../theme';

/**
 * Resolves themed link text color.
 * Input parameters:
 * - `disabled`: whether the link is interactive.
 * - `theme`: active semantic theme token object.
 * Output:
 * - Text color string for enabled or disabled link rendering.
 * Logic summary:
 * - Keeps enabled links on the primary token.
 * - Uses the secondary token for disabled content to preserve theme contrast.
 */
export function getLinkColor(disabled: boolean, theme: Theme): string {
  return disabled ? theme.colors.secondary : theme.colors.primary;
}
