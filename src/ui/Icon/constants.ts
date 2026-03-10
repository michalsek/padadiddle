import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

import type { IconFamily } from './types';

export const IconDefaultSize = 20;

export const iconFamilies: Record<IconFamily, typeof Feather | typeof Ionicons | typeof MaterialIcons> = {
  feather: Feather,
  ionicons: Ionicons,
  material: MaterialIcons,
};
