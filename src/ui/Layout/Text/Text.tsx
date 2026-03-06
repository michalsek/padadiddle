import { Text as NativeText } from 'react-native';

import { createStyleSheet, useStyles } from '../../../theme';
import { useTheme } from '../../../theme/useTheme';
import { BodyTextDefaultVariant, BodyTextLineHeight } from './constants';
import type { BodyTextProps } from './types';
import { getBodyTextColor } from './utils';

/**
 * Renders themed body text for layout-focused usage.
 * Input parameters:
 * - `children`: text content or nested text nodes.
 * - `variant`: semantic body text variant.
 * - `style`: optional style overrides merged last.
 * - `testID`: optional test identifier.
 * Output:
 * - A React Native `Text` node with token-driven typography and color.
 * Logic summary:
 * - Uses themed style-sheet utilities for default typography sizing.
 * - Maps semantic variants to shared color tokens.
 */
export function Text({ children, variant = BodyTextDefaultVariant, style, testID }: BodyTextProps) {
  const styles = useStyles(styleSheet);
  const theme = useTheme();

  return (
    <NativeText
      testID={testID}
      style={[styles.text, { color: getBodyTextColor(variant, theme) }, style]}
    >
      {children}
    </NativeText>
  );
}

const styleSheet = createStyleSheet((theme) => ({
  text: {
    fontSize: theme.typography.md,
    lineHeight: BodyTextLineHeight,
  },
}));
