import { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@app/hooks/useColorScheme';
import { AVATAR_DEFAULT_SIZE } from '@app/ui/Avatar/constants';
import { type AvatarProps } from '@app/ui/Avatar/types';
import { getAvatarBorderRadius, getAvatarInitials } from '@app/ui/Avatar/utils';

// Renders user avatar image with fallback initials.
const Avatar: React.FC<AvatarProps> = ({
  source,
  label,
  size = AVATAR_DEFAULT_SIZE,
  shape = 'circle',
  style,
  imageStyle,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const borderRadius = useMemo(() => getAvatarBorderRadius(size, shape), [shape, size]);
  const initials = useMemo(() => getAvatarInitials(label), [label]);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius,
          backgroundColor: isDark ? '#1f2937' : '#e5e7eb',
        },
        style,
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={[styles.image, { borderRadius }, imageStyle]}
          resizeMode="cover"
        />
      ) : (
        <Text style={[styles.initials, { color: isDark ? '#f9fafb' : '#111827' }]}>{initials}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Avatar;
