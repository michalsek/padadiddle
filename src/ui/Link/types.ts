import type { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type LinkProps = {
  label: string;
  href?: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
};
