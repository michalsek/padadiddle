import type { LucideIcon } from 'lucide-react-native';
import type { StyleProp, ViewStyle } from 'react-native';

export type IconProps = {
  icon: LucideIcon;
  size?: number;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};
