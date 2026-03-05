import type { GestureResponderEvent, StyleProp, TextStyle } from 'react-native';

export type LinkProps = {
  label: string;
  href?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<TextStyle>;
  testID?: string;
};
