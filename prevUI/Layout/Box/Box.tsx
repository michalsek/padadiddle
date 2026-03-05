import { StyleSheet, View } from 'react-native';

import { useColorScheme } from '@app/hooks/useColorScheme';
import { BOX_DEFAULT_FLEX } from '@app/ui/Layout/Box/constants';
import { type BoxProps } from '@app/ui/Layout/Box/types';
import { getBoxBackgroundColor } from '@app/ui/Layout/Box/utils';

// Renders a themed base layout container.
const Box: React.FC<BoxProps> = ({ children, style, testID }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      testID={testID}
      style={[styles.container, { backgroundColor: getBoxBackgroundColor(isDark) }, style]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: BOX_DEFAULT_FLEX,
  },
});

export default Box;
