import { StyleSheet } from 'react-native';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { themes } from './theme';
import type { Theme, ThemeName } from './types';

export type StyleSheetObject = Record<string, ViewStyle | TextStyle | ImageStyle>;
export type ThemedStyleSheet<T extends StyleSheetObject> = Record<ThemeName, T>;

/**
 * Creates themed React Native style sheets from a single theme-aware factory function.
 * Input parameters:
 * - `factory`: function receiving a `Theme` object and returning a plain style object.
 * Output:
 * - Object containing two memoizable style maps (`light`, `dark`) produced with `StyleSheet.create`.
 * Logic summary:
 * - Calls the factory once for each available theme token set, and eagerly precompiles both results.
 */
export function createStyleSheet<T extends StyleSheetObject>(
  factory: (theme: Theme) => T,
): ThemedStyleSheet<T> {
  return {
    light: StyleSheet.create(factory(themes.light)),
    dark: StyleSheet.create(factory(themes.dark)),
  };
}
