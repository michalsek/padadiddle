import { Text as NativeText } from 'react-native';

import { createStyleSheet, useStyles } from '../../../theme';
import { useTheme } from '../../../theme/useTheme';
import { HeadingDefaultLevel, HeadingFontWeight } from './constants';
import type { HeadingProps } from './types';
import { getHeadingStyle } from './utils';

/**
 * Renders themed heading text for section-level hierarchy.
 * Input parameters:
 * - `children`: heading text content.
 * - `level`: semantic heading level controlling typography size.
 * - `style`: optional style overrides merged last.
 * - `testID`: optional test identifier.
 * Output:
 * - A React Native `Text` node with heading weight, level typography, and tokenized text color.
 * Logic summary:
 * - Uses themed style-sheet utilities for shared heading base style.
 * - Applies component-local heading scale while keeping color on shared theme tokens.
 */
export function Heading({ children, level = HeadingDefaultLevel, style, testID }: HeadingProps) {
  const styles = useStyles(styleSheet);
  const theme = useTheme();

  return (
    <NativeText
      testID={testID}
      style={[styles.base, { color: theme.colors.textBase }, getHeadingStyle(level), style]}
    >
      {children}
    </NativeText>
  );
}

const styleSheet = createStyleSheet(() => ({
  base: {
    fontWeight: HeadingFontWeight,
  },
}));
