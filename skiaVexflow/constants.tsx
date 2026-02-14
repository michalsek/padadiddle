import { type SkFont, StrokeCap, StrokeJoin } from '@shopify/react-native-skia';
import { type LineCap, type LineJoin } from './types';

export const PT_TO_PX = 4 / 3;

export const DEFAULT_FILL_STYLE = '#000000';
export const DEFAULT_STROKE_STYLE = '#000000';
export const DEFAULT_LINE_WIDTH = 1;
export const DEFAULT_FONT = '12px Bravura';

export const LINE_CAP_MAP: Record<LineCap, StrokeCap> = {
  butt: StrokeCap.Butt,
  round: StrokeCap.Round,
  square: StrokeCap.Square,
};

export const LINE_JOIN_MAP: Record<LineJoin, StrokeJoin> = {
  miter: StrokeJoin.Miter,
  round: StrokeJoin.Round,
  bevel: StrokeJoin.Bevel,
};

export const fontCache = new Map<string, SkFont>();
