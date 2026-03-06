import { View } from 'react-native';

import { useTheme } from '../../../theme/useTheme';
import { SpacerDefaultAxis, SpacerDefaultTone } from './constants';
import type { SpacerProps } from './types';
import { getSpacerBackgroundColor, getSpacerDimensions, getSpacerSize } from './utils';

/**
 * Renders fixed horizontal or vertical spacing with optional divider tone.
 * Input parameters:
 * - `size`: optional spacer size override.
 * - `axis`: spacer orientation (`vertical` or `horizontal`).
 * - `tone`: semantic spacer tone (`transparent` or `line`).
 * - `style`: optional style overrides merged last.
 * - `testID`: optional test identifier.
 * Output:
 * - A React Native `View` sized and colored according to resolved spacer semantics.
 * Logic summary:
 * - Resolves default size from theme tokens.
 * - Computes axis-based dimensions.
 * - Applies semantic tone coloring using theme tokens.
 */
export function Spacer({
  size,
  axis = SpacerDefaultAxis,
  tone = SpacerDefaultTone,
  style,
  testID,
}: SpacerProps) {
  const theme = useTheme();
  const resolvedSize = getSpacerSize(size, theme);

  return (
    <View
      testID={testID}
      style={[
        getSpacerDimensions(resolvedSize, axis),
        { backgroundColor: getSpacerBackgroundColor(tone, theme) },
        style,
      ]}
    />
  );
}
