import type { ActivityIndicatorProps, StyleProp, ViewStyle } from 'react-native';

export type SpinnerProps = {
  size?: ActivityIndicatorProps['size'];
  style?: StyleProp<ViewStyle>;
  testID?: string;
};
