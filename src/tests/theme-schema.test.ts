import { themes } from '../theme';

const COLOR_KEYS = [
  'primary',
  'secondary',
  'danger',
  'warning',
  'success',
  'textBase',
  'textContrast',
  'background',
  'backgroundContrast',
  'border',
  'backgroundTransparent',
  'backgroundContrastTransparent',
] as const;

const SPACING_KEYS = ['2sm', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const RADIUS_KEYS = ['sm', 'md', 'lg', 'full'] as const;
const TYPOGRAPHY_KEYS = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

/**
 * Produces sorted object keys for deterministic shape assertions.
 * Input parameters:
 * - `value`: object whose own keys should be validated.
 * Output:
 * - Alphabetically sorted list of keys.
 * Logic summary:
 * - Normalizes runtime key order so tests are stable across environments.
 */
function sortedKeys(value: object): string[] {
  return Object.keys(value).sort();
}

describe('theme schema', () => {
  it('keeps the color map flat and constrained to the 12 semantic keys', () => {
    const expectedColorKeys = [...COLOR_KEYS].sort();

    expect(sortedKeys(themes.light.colors)).toEqual(expectedColorKeys);
    expect(sortedKeys(themes.dark.colors)).toEqual(expectedColorKeys);
    expect(Object.keys(themes.light.colors)).toHaveLength(12);
    expect(Object.keys(themes.dark.colors)).toHaveLength(12);
  });

  it('exposes only allowed spacing, radius, and typography token keys', () => {
    expect(sortedKeys(themes.light.spacing)).toEqual([...SPACING_KEYS].sort());
    expect(sortedKeys(themes.dark.spacing)).toEqual([...SPACING_KEYS].sort());

    expect(sortedKeys(themes.light.radius)).toEqual([...RADIUS_KEYS].sort());
    expect(sortedKeys(themes.dark.radius)).toEqual([...RADIUS_KEYS].sort());

    expect(sortedKeys(themes.light.typography)).toEqual([...TYPOGRAPHY_KEYS].sort());
    expect(sortedKeys(themes.dark.typography)).toEqual([...TYPOGRAPHY_KEYS].sort());
  });

  it('does not expose deprecated theme groups', () => {
    expect('text' in themes.light).toBe(false);
    expect('text' in themes.dark).toBe(false);
    expect('opacity' in themes.light).toBe(false);
    expect('opacity' in themes.dark).toBe(false);
    expect('elevation' in themes.light).toBe(false);
    expect('elevation' in themes.dark).toBe(false);
    expect('size' in themes.light).toBe(false);
    expect('size' in themes.dark).toBe(false);
  });
});
