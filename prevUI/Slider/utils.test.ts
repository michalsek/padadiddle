import { describe, expect, it } from '@jest/globals';

import { normalizeValue, positionToValue, valueToRatio } from './utils';

describe('Slider utils', () => {
  it('normalizes and snaps values to bounds and step', () => {
    expect(normalizeValue(101, 40, 240, 5)).toBe(100);
    expect(normalizeValue(12, 40, 240, 5)).toBe(40);
    expect(normalizeValue(244, 40, 240, 5)).toBe(240);
  });

  it('converts value to bounded track ratio', () => {
    expect(valueToRatio(140, 40, 240)).toBe(0.5);
    expect(valueToRatio(500, 40, 240)).toBe(1);
    expect(valueToRatio(0, 40, 240)).toBe(0);
  });

  it('converts touch position to snapped value', () => {
    expect(positionToValue(50, 100, 40, 240, 10)).toBe(140);
    expect(positionToValue(-10, 100, 40, 240, 10)).toBe(40);
    expect(positionToValue(200, 100, 40, 240, 10)).toBe(240);
  });
});
