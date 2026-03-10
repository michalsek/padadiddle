import type { ActivityIndicatorProps, StyleProp, ViewStyle } from 'react-native';

export type SpinnerProps = {
  size?: ActivityIndicatorProps['size'];
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};
