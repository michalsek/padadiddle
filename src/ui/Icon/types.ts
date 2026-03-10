import type { ComponentProps } from 'react';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import type { StyleProp, ViewStyle } from 'react-native';

export type IconFamily = 'feather' | 'ionicons' | 'material';
export type IconTone = 'default' | 'muted' | 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'contrast';

export type IconNameByFamily = {
  feather: ComponentProps<typeof Feather>['name'];
  ionicons: ComponentProps<typeof Ionicons>['name'];
  material: ComponentProps<typeof MaterialIcons>['name'];
};

export type IconProps<TFamily extends IconFamily = IconFamily> = {
  family: TFamily;
  name: IconNameByFamily[TFamily];
  size?: number;
  tone?: IconTone;
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};
