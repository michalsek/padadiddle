import * as Linking from 'expo-linking';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useColorScheme } from '@app/hooks/useColorScheme';
import { LINK_FONT_SIZE } from '@app/ui/Link/constants';
import { type LinkProps } from '@app/ui/Link/types';
import { getLinkColor } from '@app/ui/Link/utils';

// Renders a themed text link and opens href when provided.
const Link: React.FC<LinkProps> = ({ label, href, onPress, style, testID }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Pressable
      testID={testID}
      accessibilityRole="link"
      onPress={(event) => {
        onPress?.(event);

        if (href) {
          void Linking.openURL(href);
        }
      }}
    >
      <Text style={[styles.label, { color: getLinkColor(isDark) }, style]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: LINK_FONT_SIZE,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default Link;
