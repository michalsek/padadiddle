import { View } from 'react-native';

import { createStyleSheet, useStyles } from '../../../theme';
import { useTheme } from '../../../theme/useTheme';
import { ColumnDefaultTone } from './constants';
import type { ColumnProps } from './types';
import { getColumnBackgroundColor, getColumnGap } from './utils';

/**
 * Renders a vertically stacked container with themed surface handling.
 * Input parameters:
 * - `children`: nested column content.
 * - `gap`: optional spacing between column children.
 * - `align`/`justify`: optional cross/main-axis alignment values.
 * - `tone`: semantic column background tone.
 * - `style`: optional style overrides merged last.
 * - `testID`: optional test identifier.
 * Output:
 * - A React Native `View` configured for column layout and token-driven background semantics.
 * Logic summary:
 * - Uses shared themed style-sheet utilities for base style creation.
 * - Resolves missing gap from theme spacing tokens.
 * - Applies tone and alignment styles as dynamic layers.
 */
export function Column({ children, gap, align, justify, tone = ColumnDefaultTone, style, testID }: ColumnProps) {
  const styles = useStyles(styleSheet);
  const theme = useTheme();

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          gap: getColumnGap(gap, theme),
          backgroundColor: getColumnBackgroundColor(tone, theme),
        },
        align ? { alignItems: align } : null,
        justify ? { justifyContent: justify } : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styleSheet = createStyleSheet(() => ({
  container: {
    flexDirection: 'column',
  },
}));
