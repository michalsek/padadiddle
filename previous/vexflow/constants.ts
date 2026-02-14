import { type SkFont } from '@shopify/react-native-skia';

export const PT_TO_PX = 4 / 3;

// Font cache to store loaded Skia fonts by size
export const fontCache = new Map<string, SkFont>();
