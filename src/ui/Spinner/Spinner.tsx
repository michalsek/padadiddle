import { ActivityIndicator, View } from 'react-native';

import { createStyleSheet, useStyles } from '../../theme';
import { useTheme } from '../../theme/useTheme';
import { SpinnerDefaultSize } from './constants';
import type { SpinnerProps } from './types';
import { getSpinnerColor } from './utils';

/**
 * Renders a themed loading spinner centered within a lightweight container.
 * Input parameters:
 * - `size`: React Native activity-indicator size token.
 * - `color`: optional explicit spinner color override.
 * - `style`: optional wrapper style overrides merged last.
 * - `testID`: optional stable test identifier forwarded to the indicator.
 * Output:
 * - A React Native `ActivityIndicator` inside a centered `View` wrapper.
 * Logic summary:
 * - Uses the primary theme token as the default spinner color.
 * - Keeps layout styling isolated on a wrapper so the indicator API stays small.
 */
export function Spinner({ size = SpinnerDefaultSize, color, style, testID }: SpinnerProps) {
  const styles = useStyles(styleSheet);
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator color={getSpinnerColor(color, theme)} size={size} testID={testID} />
    </View>
  );
}

const styleSheet = createStyleSheet(() => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
