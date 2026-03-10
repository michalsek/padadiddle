import type { ImageSourcePropType, ImageStyle, StyleProp, ViewStyle } from 'react-native';

export type AvatarShape = 'circle' | 'rounded' | 'square';

export type AvatarProps = {
  source?: ImageSourcePropType;
  label?: string;
  size?: number;
  shape?: AvatarShape;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  testID?: string;
};
