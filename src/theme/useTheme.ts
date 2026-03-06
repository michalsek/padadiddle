import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { themes } from './theme';
import type { Theme, ThemeName } from './types';

/**
 * Resolves the currently active semantic theme token object.
 * Input parameters: none.
 * Output: a stable `Theme` object (`lightTheme` or `darkTheme`) for the current color scheme.
 * Logic summary:
 * - Reads the platform color scheme.
 * - Maps unknown/undefined schemes to `light` for deterministic fallback behavior.
 * - Memoizes and returns the active theme token object for component-level token lookups.
 */
export function useTheme(): Theme {
  const colorScheme = useColorScheme();
  const activeTheme: ThemeName = colorScheme === 'dark' ? 'dark' : 'light';

  return useMemo(() => themes[activeTheme], [activeTheme]);
}
