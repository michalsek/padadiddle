import { PROGRESS_BAR_VARIANTS } from './constants';
import type { ProgressBarVariant } from './types';

// Returns themed colors for progress track and fill.
export function getProgressBarPalette(variant: ProgressBarVariant, isDark: boolean) {
  const scheme = PROGRESS_BAR_VARIANTS[variant];

  return {
    trackColor: isDark ? scheme.darkTrack : scheme.lightTrack,
    fillColor: isDark ? scheme.darkFill : scheme.lightFill,
  };
}
