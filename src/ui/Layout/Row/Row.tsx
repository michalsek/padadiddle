import { View } from 'react-native';

import { createStyleSheet, useStyles } from '../../../theme';
import { useTheme } from '../../../theme/useTheme';
import { RowDefaultTone, RowDefaultWrap } from './constants';
import type { RowProps } from './types';
import { getRowBackgroundColor, getRowGap } from './utils';

/**
 * Renders a horizontally stacked container with themed surface handling.
 * Input parameters:
 * - `children`: nested row content.
 * - `gap`: optional spacing between row children.
 * - `align`/`justify`: optional cross/main-axis alignment values.
 * - `wrap`: optional wrapping toggle.
 * - `tone`: semantic row background tone.
 * - `style`: optional style overrides merged last.
 * - `testID`: optional test identifier.
 * Output:
 * - A React Native `View` configured for row layout and token-driven background semantics.
 * Logic summary:
 * - Uses shared themed style-sheet utilities for base style creation.
 * - Resolves missing gap from theme spacing tokens.
 * - Applies tone, alignment, and wrapping as dynamic style layers.
 */
export function Row({
  children,
  gap,
  align,
  justify,
  wrap = RowDefaultWrap,
  tone = RowDefaultTone,
  style,
  testID,
}: RowProps) {
  const styles = useStyles(styleSheet);
  const theme = useTheme();

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          gap: getRowGap(gap, theme),
          flexWrap: wrap ? 'wrap' : 'nowrap',
          backgroundColor: getRowBackgroundColor(tone, theme),
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
    flexDirection: 'row',
  },
}));
