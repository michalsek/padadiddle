import type { ComponentType } from 'react';
import { View } from 'react-native';

import { useTheme } from '../../theme/useTheme';
import { IconDefaultSize, iconFamilies } from './constants';
import type { IconFamily, IconProps } from './types';
import { getIconColor } from './utils';

/**
 * Renders an Expo icon-family glyph through a small shared abstraction.
 * Input parameters:
 * - `family`: icon family key selecting the Expo icon set.
 * - `name`: typed icon name for the selected family.
 * - `size`: optional glyph size in pixels.
 * - `tone`/`color`: semantic theme tone or explicit color override.
 * - `style`: optional wrapper style overrides merged last.
 * - `testID`: optional stable test identifier.
 * Output:
 * - The selected Expo icon component wrapped in a lightweight `View`.
 * Logic summary:
 * - Maps the requested family to its Expo icon component.
 * - Resolves color from semantic theme tones unless an explicit color override is supplied.
 * - Keeps the public API independent from any single icon package implementation detail.
 */
export function Icon<TFamily extends IconFamily>({
  family,
  name,
  size = IconDefaultSize,
  tone = 'default',
  color,
  style,
  testID,
}: IconProps<TFamily>) {
  const theme = useTheme();
  const Glyph = iconFamilies[family] as ComponentType<{
    color: string;
    name: string;
    size: number;
  }>;

  return (
    <View style={style} testID={testID}>
      <Glyph color={color ?? getIconColor(tone, theme)} name={name} size={size} />
    </View>
  );
}
