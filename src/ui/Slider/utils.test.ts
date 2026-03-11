import {
  getSliderRatio,
  getSliderValueFromPosition,
  normalizeSliderValue,
} from './utils';

describe('Slider utils', () => {
  it('normalizes values to bounds and nearest step', () => {
    expect(normalizeSliderValue(101, 40, 240, 5)).toBe(100);
    expect(normalizeSliderValue(12, 40, 240, 5)).toBe(40);
    expect(normalizeSliderValue(244, 40, 240, 5)).toBe(240);
  });

  it('does not overshoot max when the range is not divisible by step', () => {
    expect(normalizeSliderValue(10, 0, 10, 6)).toBe(10);
    expect(normalizeSliderValue(96, 0, 95, 10)).toBe(95);
  });

  it('converts values to a bounded ratio', () => {
    expect(getSliderRatio(140, 40, 240)).toBe(0.5);
    expect(getSliderRatio(500, 40, 240)).toBe(1);
    expect(getSliderRatio(0, 40, 240)).toBe(0);
  });

  it('maps track positions into snapped values', () => {
    expect(getSliderValueFromPosition(50, 100, 40, 240, 10)).toBe(140);
    expect(getSliderValueFromPosition(-10, 100, 40, 240, 10)).toBe(40);
    expect(getSliderValueFromPosition(200, 100, 40, 240, 10)).toBe(240);
  });

  it('handles reversed min and max inputs consistently', () => {
    expect(normalizeSliderValue(50, 240, 40, 5)).toBeGreaterThanOrEqual(40);
    expect(normalizeSliderValue(50, 240, 40, 5)).toBeLessThanOrEqual(240);
    expect(getSliderValueFromPosition(0, 100, 240, 40, 10)).toBe(40);
    expect(getSliderValueFromPosition(100, 100, 240, 40, 10)).toBe(240);
  });
});
