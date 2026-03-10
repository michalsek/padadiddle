import type { Theme } from '../../theme';
import type { AvatarShape } from './types';

/**
 * Resolves avatar border radius from the requested shape and active theme tokens.
 * Input parameters:
 * - `shape`: semantic avatar shape.
 * - `theme`: active semantic theme token object.
 * - `size`: final avatar size in pixels.
 * Output:
 * - Numeric border-radius value for the avatar container.
 * Logic summary:
 * - Uses the `full` token for circular avatars.
 * - Maps rounded and square shapes to existing theme radius tokens.
 */
export function getAvatarBorderRadius(shape: AvatarShape, theme: Theme, size: number): number {
  if (shape === 'rounded') {
    return theme.radius.md;
  }

  if (shape === 'square') {
    return theme.radius.sm;
  }

  return Math.min(theme.radius.full, size / 2);
}

/**
 * Extracts up to two uppercase initials from an avatar label.
 * Input parameters:
 * - `label`: optional display label used as fallback content.
 * Output:
 * - A short initials string or an empty string when the label is missing.
 * Logic summary:
 * - Trims whitespace.
 * - Keeps at most two words.
 * - Uses the first character from each retained word.
 */
export function getAvatarInitials(label: string | undefined): string {
  if (!label) {
    return '';
  }

  return label
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}
