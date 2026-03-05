import { View } from 'react-native';

import { useColorScheme } from '@app/hooks/useColorScheme';
import { ICON_DEFAULT_SIZE, ICON_DEFAULT_STROKE_WIDTH } from '@app/ui/Icon/constants';
import { type IconProps } from '@app/ui/Icon/types';
import { getIconColor } from '@app/ui/Icon/utils';

// Renders a Lucide icon with theme-aware stroke color.
const Icon: React.FC<IconProps> = ({
  icon: Glyph,
  size = ICON_DEFAULT_SIZE,
  strokeWidth = ICON_DEFAULT_STROKE_WIDTH,
  style,
  testID,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={style} testID={testID}>
      <Glyph size={size} strokeWidth={strokeWidth} color={getIconColor(isDark)} />
    </View>
  );
};

export default Icon;
