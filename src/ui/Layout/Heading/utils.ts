import { HeadingFontSizes } from './constants';
import type { HeadingLevel } from './types';

/**
 * Resolves heading typography style values for a specific level.
 * Input parameters:
 * - `level`: semantic heading level.
 * Output:
 * - Partial text style object containing font size and line height.
 * Logic summary:
 * - Uses component-local heading scale for display hierarchy.
 * - Derives line height from size to preserve readability.
 */
export function getHeadingStyle(level: HeadingLevel) {
  return {
    fontSize: HeadingFontSizes[level],
    lineHeight: HeadingFontSizes[level] + 6,
  };
}
