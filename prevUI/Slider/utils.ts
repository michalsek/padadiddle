import { SLIDER_VARIANTS } from './constants';
import type { SliderVariant } from './types';

// Clamps and snaps slider value to valid min/max and step boundaries.
export function normalizeValue(value: number, min: number, max: number, step: number): number {
  const safeStep = step > 0 ? step : 1;
  const safeMin = Math.min(min, max);
  const safeMax = Math.max(min, max);
  const clamped = Math.max(safeMin, Math.min(safeMax, value));
  const stepsFromMin = Math.round((clamped - safeMin) / safeStep);

  return safeMin + stepsFromMin * safeStep;
}

// Maps value into [0..1] progress ratio between min and max.
export function valueToRatio(value: number, min: number, max: number): number {
  const safeMin = Math.min(min, max);
  const safeMax = Math.max(min, max);
  const denominator = safeMax - safeMin;

  if (denominator <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(1, (value - safeMin) / denominator));
}

// Converts local track X coordinate into normalized slider value.
export function positionToValue(
  x: number,
  trackWidth: number,
  min: number,
  max: number,
  step: number
): number {
  if (trackWidth <= 0) {
    return normalizeValue(min, min, max, step);
  }

  const ratio = Math.max(0, Math.min(1, x / trackWidth));
  const rawValue = min + ratio * (max - min);

  return normalizeValue(rawValue, min, max, step);
}

// Returns themed slider colors for selected variant.
export function getSliderPalette(variant: SliderVariant, isDark: boolean) {
  const scheme = SLIDER_VARIANTS[variant];

  return {
    labelColor: isDark ? scheme.darkLabel : scheme.lightLabel,
    valueColor: isDark ? scheme.darkValue : scheme.lightValue,
    trackColor: isDark ? scheme.darkTrack : scheme.lightTrack,
    fillColor: isDark ? scheme.darkFill : scheme.lightFill,
    thumbColor: isDark ? scheme.darkThumb : scheme.lightThumb,
    thumbBorderColor: isDark ? scheme.darkThumbBorder : scheme.lightThumbBorder,
  };
}
