import { Skia, type SkFont } from '@shopify/react-native-skia';

import { fontCache, PT_TO_PX } from './constants';

export function getAdvanceWidth(font: SkFont, text: string): number {
  const glyphs = font.getGlyphIDs(text);
  const widths = font.getGlyphWidths(glyphs);
  let total = 0;
  for (const w of widths) total += w;
  return total;
}

export function toPxFontSize(size: number | string | undefined): number {
  if (size === undefined || size === null) return 12;
  if (typeof size === 'number' && !isNaN(size)) {
    return size * PT_TO_PX;
  }
  if (typeof size === 'string') {
    const match = size.trim().match(/^(\d+(?:\.\d+)?)(px|pt)?$/i);
    if (match) {
      const value = parseFloat(match[1]);
      const unit = match[2]?.toLowerCase();
      if (!unit || unit === 'px') return value;
      if (unit === 'pt') return value * PT_TO_PX;
    }
  }
  return 12;
}

export function createFont(size: number, familyName?: string, bravuraFont?: SkFont | null): SkFont {
  // Ensure size is valid
  const fontSize = size && !isNaN(size) ? size : 12;

  // Check if requesting Bravura and we have it loaded
  if (familyName && familyName.toLowerCase().includes('bravura') && bravuraFont) {
    const cacheKey = `Bravura-${fontSize}`;

    if (fontCache.has(cacheKey)) {
      return fontCache.get(cacheKey)!;
    }

    try {
      console.log(`Creating Bravura font with size: ${fontSize}`);
      // Use the typeface from the loaded font with new size
      const typeface = bravuraFont.getTypeface();
      if (typeface) {
        const font = Skia.Font(typeface, fontSize);
        fontCache.set(cacheKey, font);
        console.log('Successfully created Bravura font');
        return font;
      }
    } catch (e) {
      console.warn('Failed to create Bravura font from typeface:', e);
    }
  }

  console.log(`createFont called with size: ${fontSize}, family: ${familyName || 'default'}`);

  // Try fontMgr approach for system fonts
  try {
    const fontMgr = Skia.FontMgr.System();

    // If a specific family is requested, try it first
    if (familyName) {
      try {
        const typeface = fontMgr.matchFamilyStyle(familyName, {
          weight: 400,
          width: 5,
          slant: 0,
        });

        if (typeface) {
          console.log(`Successfully matched font family: ${familyName}`);
          return Skia.Font(typeface, fontSize);
        }
      } catch (e) {
        console.warn(`Failed to match ${familyName}:`, e);
      }
    }

    // Fall back to first available system font
    const count = fontMgr.countFamilies();

    for (let i = 0; i < Math.min(count, 10); i++) {
      try {
        const systemFamilyName = fontMgr.getFamilyName(i);

        const typeface = fontMgr.matchFamilyStyle(systemFamilyName, {
          weight: 400,
          width: 5,
          slant: 0,
        });

        if (typeface) {
          console.log(`Successfully created font with family: ${systemFamilyName}`);
          return Skia.Font(typeface, fontSize);
        }
      } catch {
        // Continue to next
      }
    }
  } catch (e) {
    console.error('FontMgr approach failed:', e);
  }

  // If everything fails, throw with more info
  throw new Error(`Unable to create font after trying all approaches. Size: ${fontSize}`);
}

function parseCssFontShorthand(cssFont: string): { sizePx: number; family?: string } {
  const match = cssFont.match(/(\d+(?:\.\d+)?(?:px|pt))/i);
  if (!match) {
    return { sizePx: 12, family: undefined };
  }
  const sizePx = toPxFontSize(match[1]);
  const familyPart = cssFont.slice(match.index! + match[1].length).trim();
  return { sizePx, family: familyPart || undefined };
}

export function createTextMeasurementCanvas(bravuraFont: SkFont | null) {
  let currentFont = createFont(12, 'Bravura', bravuraFont);

  const measureContext = {
    font: '',
    measureText: (text: string) => {
      const rect = currentFont.measureText(text);
      const width = getAdvanceWidth(currentFont, text);
      const ascent = Math.max(0, -rect.y);
      const descent = Math.max(0, rect.y + rect.height);

      return {
        width,
        actualBoundingBoxAscent: ascent,
        actualBoundingBoxDescent: descent,
        fontBoundingBoxAscent: ascent,
        fontBoundingBoxDescent: descent,
        actualBoundingBoxLeft: rect.x,
        actualBoundingBoxRight: rect.x + rect.width,
        alphabeticBaseline: 0,
        emHeightAscent: ascent,
        emHeightDescent: descent,
        hangingBaseline: 0,
        ideographicBaseline: 0,
      };
    },
  };

  Object.defineProperty(measureContext, 'font', {
    get() {
      return '';
    },
    set(value: string) {
      try {
        const parsed = parseCssFontShorthand(value);
        currentFont = createFont(parsed.sizePx, parsed.family, bravuraFont);
      } catch {
        currentFont = createFont(12, 'Bravura', bravuraFont);
      }
    },
  });

  return {
    getContext: (type: string) => (type === '2d' ? (measureContext as any) : null),
  };
}
