import type { StyleProp, ViewStyle } from 'react-native';

export type ProgressBarVariant = 'primary' | 'secondary' | 'ghost';

export type ProgressBarProps = {
  progress: number;
  height?: number;
  variant?: ProgressBarVariant;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};
