import { View } from 'react-native';

import { createStyleSheet, useStyles } from '../../../theme';
import { useTheme } from '../../../theme/useTheme';
import { BoxDefaultFlex } from './constants';
import type { BoxProps } from './types';
import { getBoxBackgroundColor } from './utils';

/**
 * Renders a themed base layout container.
 * Input parameters:
 * - `children`: nested React nodes rendered inside the container.
 * - `style`: optional view style overrides merged last.
 * - `testID`: optional test identifier.
 * Output:
 * - A React Native `View` with stable layout defaults and theme-token background color.
 * Logic summary:
 * - Uses `createStyleSheet` + `useStyles` for static style compilation.
 * - Reads the active theme via `useTheme` and applies tokenized background color.
 */
export function Box({ children, style, testID }: BoxProps) {
  const styles = useStyles(styleSheet);
  const theme = useTheme();

  return (
    <View
      testID={testID}
      style={[styles.container, { backgroundColor: getBoxBackgroundColor(theme) }, style]}
    >
      {children}
    </View>
  );
}

const styleSheet = createStyleSheet(() => ({
  container: {
    flex: BoxDefaultFlex,
  },
}));
