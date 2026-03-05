import type { AvatarShape } from './types';

// Resolves border radius value for the configured avatar shape.
export function getAvatarBorderRadius(size: number, shape: AvatarShape): number {
  if (shape === 'square') {
    return 8;
  }

  if (shape === 'rounded') {
    return 12;
  }

  return size / 2;
}

// Extracts two-character initials from a display label.
export function getAvatarInitials(label?: string): string {
  if (!label) {
    return '';
  }

  const parts = label.trim().split(/\s+/).filter(Boolean).slice(0, 2);

  return parts.map((part) => part.charAt(0).toUpperCase()).join('');
}
