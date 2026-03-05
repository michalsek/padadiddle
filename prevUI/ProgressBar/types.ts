import type { SharedValue } from 'react-native-reanimated';
import type { StyleProp, ViewStyle } from 'react-native';

export type ProgressBarVariant = 'primary' | 'secondary' | 'ghost';

export type ProgressBarProps = {
  progress: SharedValue<number>;
  height?: number;
  variant?: ProgressBarVariant;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};
