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
});
