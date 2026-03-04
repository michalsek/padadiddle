import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import type { ThemeName } from './types';

/**
 * Selects the correct themed style sheet for the active platform color scheme.
 * Input parameters:
 * - `styles`: object containing `light` and `dark` style-sheet variants.
 * Output:
 * - Active style sheet variant matching `useColorScheme`, defaulting to `light` when undefined.
 * Logic summary:
 * - Reads the runtime color scheme and memoizes selection of the corresponding style map.
 */
export function useStyles<T>(styles: Record<ThemeName, T>): T {
  const colorScheme = useColorScheme();
  const activeTheme: ThemeName = colorScheme === 'dark' ? 'dark' : 'light';

  return useMemo(() => styles[activeTheme], [activeTheme, styles]);
}
