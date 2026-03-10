import { Image, Text as NativeText, View } from 'react-native';

import { createStyleSheet, useStyles } from '../../theme';
import { useTheme } from '../../theme/useTheme';
import { AvatarDefaultShape, AvatarDefaultSize, AvatarFontWeight } from './constants';
import type { AvatarProps } from './types';
import { getAvatarBorderRadius, getAvatarInitials } from './utils';

/**
 * Renders a themed avatar image with initials fallback content.
 * Input parameters:
 * - `source`: optional image source rendered when available.
 * - `label`: optional display label used to derive fallback initials.
 * - `size`: avatar width and height in pixels.
 * - `shape`: semantic shape applied to both container and image.
 * - `style`/`imageStyle`: optional container and image overrides merged last.
 * - `testID`: optional stable test identifier for the avatar container.
 * Output:
 * - A React Native `View` that renders either an `Image` or themed initials text.
 * Logic summary:
 * - Resolves border radius from the shared theme tokens.
 * - Uses a contrast-transparent surface for fallback initials.
 * - Mirrors the same radius on the optional image for consistent clipping.
 */
export function Avatar({
  source,
  label,
  size = AvatarDefaultSize,
  shape = AvatarDefaultShape,
  style,
  imageStyle,
  testID,
}: AvatarProps) {
  const styles = useStyles(styleSheet);
  const theme = useTheme();
  const borderRadius = getAvatarBorderRadius(shape, theme, size);
  const initials = getAvatarInitials(label);

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius,
          backgroundColor: theme.colors.backgroundContrastTransparent,
          borderColor: theme.colors.border,
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
        <NativeText style={[styles.initials, { color: theme.colors.textContrast }]}>{initials}</NativeText>
      )}
    </View>
  );
}

const styleSheet = createStyleSheet((theme) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    fontSize: theme.typography.md,
    fontWeight: AvatarFontWeight,
  },
}));
