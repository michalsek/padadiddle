import {
  BlendMode,
  PaintStyle,
  Skia,
  StrokeCap,
  StrokeJoin,
  type SkCanvas,
  type SkFont,
  type SkPaint,
  type SkPath,
} from '@shopify/react-native-skia';
import { FontInfo, RenderContext as VexflowRenderContext } from 'vexflow';

import { createFont, getAdvanceWidth, toPxFontSize } from './utils';
import { fontCache } from './constants';

type LineCap = 'butt' | 'round' | 'square';
type LineJoin = 'miter' | 'round' | 'bevel';

// type RenderState = {
//   fillStyle: string;
//   strokeStyle: string;
//   lineWidth: number;
//   lineCap: LineCap;
//   lineJoin: LineJoin;
//   font: string;
// };

function notImplemented(methodName: string) {
  console.warn(`Method ${methodName} is not implemented in SkiaVexflowContext.`);
}

export default class SkiaVexflowContext implements VexflowRenderContext {
  static get CATEGORY() {
    return 'SkiaVexflowContext';
  }

  clear() {
    notImplemented('clear');
  }

  setFillStyle() {
    notImplemented('setFillStyle');
    return this;
  }

  setBackgroundFillStyle() {
    notImplemented('setBackgroundFillStyle');
    return this;
  }

  setStrokeStyle() {
    notImplemented('setStrokeStyle');
    return this;
  }

  setShadowColor() {
    notImplemented('setShadowColor');
    return this;
  }

  setShadowBlur() {
    notImplemented('setShadowBlur');
    return this;
  }

  setLineWidth() {
    notImplemented('setLineWidth');
    return this;
  }

  setLineCap() {
    notImplemented('setLineCap');
    return this;
  }

  setLineDash() {
    notImplemented('setLineDash');
    return this;
  }

  scale() {
    notImplemented('scale');
    return this;
  }

  rect() {
    notImplemented('rect');
    return this;
  }

  resize() {
    notImplemented('resize');
    return this;
  }

  fillRect() {
    notImplemented('fillRect');
    return this;
  }

  clearRect() {
    notImplemented('clearRect');
    return this;
  }

  pointerRect() {
    notImplemented('pointerRect');
    return this;
  }

  beginPath() {
    notImplemented('beginPath');
    return this;
  }

  moveTo() {
    notImplemented('moveTo');
    return this;
  }

  lineTo() {
    notImplemented('lineTo');
    return this;
  }

  bezierCurveTo() {
    notImplemented('bezierCurveTo');
    return this;
  }

  quadraticCurveTo() {
    notImplemented('quadraticCurveTo');
    return this;
  }

  arc() {
    notImplemented('arc');
    return this;
  }

  fill() {
    notImplemented('fill');
    return this;
  }

  stroke() {
    notImplemented('stroke');
    return this;
  }

  closePath() {
    notImplemented('closePath');
    return this;
  }

  fillText() {
    notImplemented('fillText');
    return this;
  }

  save() {
    notImplemented('save');
    return this;
  }

  restore() {
    notImplemented('restore');
    return this;
  }

  openGroup() {
    notImplemented('openGroup');
  }

  closeGroup() {
    notImplemented('closeGroup');
  }

  openRotation() {
    notImplemented('openRotation');
  }

  closeRotation() {
    notImplemented('closeRotation');
  }

  add() {
    notImplemented('add');
  }

  measureText() {
    notImplemented('measureText');
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  set fillStyle(style: string | CanvasGradient | CanvasPattern) {
    notImplemented('set fillStyle');
  }

  get fillStyle() {
    notImplemented('get fillStyle');
    return '';
  }

  set strokeStyle(style: string | CanvasGradient | CanvasPattern) {
    notImplemented('set strokeStyle');
  }

  get strokeStyle() {
    notImplemented('get strokeStyle');
    return '';
  }

  setFont(
    font?: string | FontInfo,
    size?: string | number,
    weight?: string | number,
    style?: string
  ) {
    notImplemented('setFont');
    return this;
  }

  getFont() {
    notImplemented('getFont');
    return '';
  }

  set font(font: string) {
    notImplemented('set font');
  }

  get font() {
    notImplemented('get font');
    return '';
  }
}

// export default class SkiaVexflowContext implements VexflowRenderContext {
//   private canvas: SkCanvas;
//   private currentPath: SkPath;
//   private fillPaint: SkPaint;
//   private strokePaint: SkPaint;
//   private textFont: SkFont;
//   private state: RenderState;
//   private stateStack: RenderState[] = [];
//   private bravuraFont: SkFont | null;

//   constructor(canvas: SkCanvas, bravuraFont: SkFont | null = null) {
//     this.canvas = canvas;
//     this.currentPath = Skia.Path.Make();
//     this.fillPaint = Skia.Paint();
//     this.strokePaint = Skia.Paint();
//     this.bravuraFont = bravuraFont;

//     this.fillPaint.setStyle(PaintStyle.Fill);
//     this.fillPaint.setAntiAlias(true);
//     this.strokePaint.setStyle(PaintStyle.Stroke);
//     this.strokePaint.setAntiAlias(true);

//     this.textFont = createFont(12, 'Bravura', bravuraFont);

//     this.state = {
//       fillStyle: '#000000',
//       strokeStyle: '#000000',
//       lineWidth: 1,
//       lineCap: 'butt',
//       lineJoin: 'miter',
//       font: '12px sans-serif',
//     };

//     this.applyState();
//   }

//   private applyState() {
//     this.fillPaint.setColor(Skia.Color(this.state.fillStyle));
//     this.strokePaint.setColor(Skia.Color(this.state.strokeStyle));
//     this.strokePaint.setStrokeWidth(this.state.lineWidth);

//     const capMap: Record<LineCap, StrokeCap> = {
//       butt: StrokeCap.Butt,
//       round: StrokeCap.Round,
//       square: StrokeCap.Square,
//     };
//     this.strokePaint.setStrokeCap(capMap[this.state.lineCap]);

//     const joinMap: Record<LineJoin, StrokeJoin> = {
//       miter: StrokeJoin.Miter,
//       round: StrokeJoin.Round,
//       bevel: StrokeJoin.Bevel,
//     };
//     this.strokePaint.setStrokeJoin(joinMap[this.state.lineJoin]);

//     const fontMatch = this.state.font.match(/(\d+(?:\.\d+)?)(px|pt)/);
//     const size = fontMatch ? toPxFontSize(`${fontMatch[1]}${fontMatch[2]}`) : 12;
//     const familyMatch = this.state.font.match(/\d+(?:\.\d+)?(?:px|pt)\s+(.+)/);
//     const family = familyMatch ? familyMatch[1] : undefined;
//     this.textFont = createFont(size, family, this.bravuraFont);
//   }

//   get fillStyle() {
//     return this.state.fillStyle;
//   }

//   set fillStyle(value: string) {
//     this.state.fillStyle = value;
//     this.fillPaint.setColor(Skia.Color(value));
//   }

//   get strokeStyle() {
//     return this.state.strokeStyle;
//   }

//   set strokeStyle(value: string) {
//     this.state.strokeStyle = value;
//     this.strokePaint.setColor(Skia.Color(value));
//   }

//   get lineWidth() {
//     return this.state.lineWidth;
//   }

//   set lineWidth(value: number) {
//     this.state.lineWidth = value;
//     this.strokePaint.setStrokeWidth(value);
//   }

//   get lineCap() {
//     return this.state.lineCap;
//   }

//   set lineCap(value: LineCap) {
//     this.state.lineCap = value;
//     const capMap: Record<LineCap, StrokeCap> = {
//       butt: StrokeCap.Butt,
//       round: StrokeCap.Round,
//       square: StrokeCap.Square,
//     };
//     this.strokePaint.setStrokeCap(capMap[value]);
//   }

//   get lineJoin() {
//     return this.state.lineJoin;
//   }

//   set lineJoin(value: LineJoin) {
//     this.state.lineJoin = value;
//     const joinMap: Record<LineJoin, StrokeJoin> = {
//       miter: StrokeJoin.Miter,
//       round: StrokeJoin.Round,
//       bevel: StrokeJoin.Bevel,
//     };
//     this.strokePaint.setStrokeJoin(joinMap[value]);
//   }

//   get font() {
//     return this.state.font;
//   }

//   set font(value: string) {
//     this.state.font = value;
//     const fontMatch = value.match(/(\d+(?:\.\d+)?)(px|pt)/);
//     const size = fontMatch ? toPxFontSize(`${fontMatch[1]}${fontMatch[2]}`) : 12;
//     const familyMatch = value.match(/\d+(?:\.\d+)?(?:px|pt)\s+(.+)/);
//     const family = familyMatch ? familyMatch[1] : undefined;
//     this.textFont = createFont(size, family, this.bravuraFont);
//   }

//   setLineDash() {
//     console.log('setLineDash called');
//     return this;
//   }
//   setTransform() {
//     console.log('setTransform called');
//   }

//   get globalAlpha() {
//     return 1;
//   }

//   set globalAlpha(_value: number) {}

//   setFont(families: string | string[] | any, size?: number, weight?: string, style?: string) {
//     console.log('setFont called with:', { families, size, weight, style });

//     // Handle case where families is a font descriptor object (VexFlow 5.x format)
//     let familyNames: string | string[];
//     let fontSize: number;
//     let fontWeight: string | undefined;
//     let fontStyle: string | undefined;

//     if (typeof families === 'object' && !Array.isArray(families)) {
//       // VexFlow is passing a font descriptor object
//       familyNames = families.family || 'Arial';
//       fontSize = toPxFontSize(families.size);
//       fontWeight = families.weight;
//       fontStyle = families.style;
//       console.log('Parsed font descriptor:', { familyNames, fontSize, fontWeight, fontStyle });
//     } else {
//       familyNames = families;
//       fontSize = toPxFontSize(size);
//       fontWeight = weight;
//       fontStyle = style;
//     }

//     const familyStr = Array.isArray(familyNames) ? familyNames.join(', ') : familyNames;
//     this.state.font = `${fontSize}px ${familyStr}`;
//     // Parse comma-separated family names (e.g., "Bravura,Academico")
//     const familyList = familyStr.split(',').map((f) => f.trim());

//     // Try to create font with the requested family name
//     try {
//       const fontMgr = Skia.FontMgr.System();

//       // Try each requested family
//       for (const family of familyList) {
//         try {
//           console.log(`Attempting to load font family: ${family}`);

//           // Try to create with Bravura if available
//           if (family.toLowerCase().includes('bravura') && this.bravuraFont) {
//             const cacheKey = `Bravura-${fontSize}`;

//             if (fontCache.has(cacheKey)) {
//               this.textFont = fontCache.get(cacheKey)!;
//               console.log('Using cached Bravura font');
//               return this;
//             }

//             try {
//               const typeface = this.bravuraFont.getTypeface();
//               if (typeface) {
//                 this.textFont = Skia.Font(typeface, fontSize);
//                 fontCache.set(cacheKey, this.textFont);
//                 console.log('Successfully created Bravura font');
//                 return this;
//               }
//             } catch (e) {
//               console.warn('Failed to create Bravura font:', e);
//             }
//           }

//           // Try system font
//           const typeface = fontMgr.matchFamilyStyle(family, {
//             weight: fontWeight === 'bold' ? 700 : 400,
//             width: 5,
//             slant: fontStyle === 'italic' ? 1 : 0,
//           });

//           if (typeface) {
//             console.log(`Successfully matched font family: ${family}`);
//             this.textFont = Skia.Font(typeface, fontSize);
//             return this;
//           }
//         } catch (e) {
//           console.warn(`Failed to load font family ${family}:`, e);
//         }
//       }
//     } catch (e) {
//       console.warn('FontMgr approach failed in setFont:', e);
//     }

//     // Fallback to default font creation
//     console.log(`Falling back to default font with size ${fontSize}`);
//     this.textFont = createFont(fontSize, familyList[0], this.bravuraFont);
//     return this;
//   }

//   setFillStyle(style: string) {
//     this.fillStyle = style;
//     return this;
//   }

//   setStrokeStyle(style: string) {
//     this.strokeStyle = style;
//     return this;
//   }

//   setLineWidth(width: number) {
//     this.lineWidth = width;
//     return this;
//   }

//   setLineCap(cap: LineCap) {
//     this.lineCap = cap;
//     return this;
//   }

//   setLineJoin(join: LineJoin) {
//     this.lineJoin = join;
//     return this;
//   }

//   setRawFont(rawFont: string) {
//     this.font = rawFont;
//     return this;
//   }

//   save() {
//     this.canvas.save();
//     this.stateStack.push({ ...this.state });

//     return this;
//   }

//   restore() {
//     this.canvas.restore();
//     const savedState = this.stateStack.pop();
//     if (savedState) {
//       this.state = savedState;
//       this.applyState();
//     }

//     return this;
//   }

//   scale(x: number, y: number) {
//     this.canvas.scale(x, y);
//     return this;
//   }

//   translate(x: number, y: number) {
//     this.canvas.translate(x, y);
//     return this;
//   }

//   rotate(angle: number) {
//     this.canvas.rotate((angle * 180) / Math.PI, 0, 0);
//     return this;
//   }

//   beginPath() {
//     this.currentPath = Skia.Path.Make();
//     return this;
//   }

//   closePath() {
//     this.currentPath.close();
//     return this;
//   }

//   moveTo(x: number, y: number) {
//     this.currentPath.moveTo(x, y);
//     return this;
//   }

//   lineTo(x: number, y: number) {
//     this.currentPath.lineTo(x, y);
//     return this;
//   }

//   quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
//     this.currentPath.quadTo(cpx, cpy, x, y);
//     return this;
//   }

//   bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
//     this.currentPath.cubicTo(cp1x, cp1y, cp2x, cp2y, x, y);
//     return this;
//   }

//   arc(
//     x: number,
//     y: number,
//     radius: number,
//     startAngle: number,
//     endAngle: number,
//     anticlockwise = false
//   ) {
//     const startDeg = (startAngle * 180) / Math.PI;
//     const endDeg = (endAngle * 180) / Math.PI;
//     let sweep = endDeg - startDeg;
//     if (anticlockwise) {
//       sweep = startDeg - endDeg;
//     }
//     this.currentPath.addArc(
//       Skia.XYWHRect(x - radius, y - radius, radius * 2, radius * 2),
//       startDeg,
//       sweep
//     );
//     return this;
//   }

//   rect(x: number, y: number, width: number, height: number) {
//     this.currentPath.addRect(Skia.XYWHRect(x, y, width, height));
//     return this;
//   }

//   fillRect(x: number, y: number, width: number, height: number) {
//     this.canvas.drawRect(Skia.XYWHRect(x, y, width, height), this.fillPaint);
//     return this;
//   }

//   strokeRect(x: number, y: number, width: number, height: number) {
//     this.canvas.drawRect(Skia.XYWHRect(x, y, width, height), this.strokePaint);
//   }

//   clearRect(x: number, y: number, width: number, height: number) {
//     const clearPaint = Skia.Paint();
//     clearPaint.setColor(Skia.Color('transparent'));
//     clearPaint.setBlendMode(BlendMode.Clear);
//     this.canvas.drawRect(Skia.XYWHRect(x, y, width, height), clearPaint);
//     return this;
//   }

//   fill() {
//     this.canvas.drawPath(this.currentPath, this.fillPaint);
//     return this;
//   }

//   stroke() {
//     this.canvas.drawPath(this.currentPath, this.strokePaint);
//     return this;
//   }

//   fillText(text: string, x: number, y: number) {
//     this.canvas.drawText(text, x, y, this.fillPaint, this.textFont);
//     return this;
//   }

//   strokeText(text: string, x: number, y: number) {
//     this.canvas.drawText(text, x, y, this.strokePaint, this.textFont);
//   }

//   measureText(text: string) {
//     const rect = this.textFont.measureText(text);
//     const width = getAdvanceWidth(this.textFont, text);
//     const ascent = Math.max(0, -rect.y);
//     const descent = Math.max(0, rect.y + rect.height);
//     return { x: rect.x, y: -ascent, width, height: ascent + descent };
//   }

//   openGroup() {
//     console.log('openGroup called');
//   }
//   closeGroup() {
//     console.log('closeGroup called');
//   }
//   pointerRect() {
//     console.log('pointerRect called');
//     return this;
//   }
// }
