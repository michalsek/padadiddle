import {
  Canvas,
  Picture,
  Skia,
  useFont,
  type SkFont,
  type SkPicture,
} from '@shopify/react-native-skia';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import {
  Accidental,
  Annotation,
  Articulation,
  BarlineType,
  Beam,
  Bend,
  ChordSymbol,
  ClefNote,
  Dot,
  Element,
  Formatter,
  GraceNote,
  GraceNoteGroup,
  ModifierPosition,
  NoteHead,
  Stave,
  StaveNote,
  SymbolModifiers,
  TabNote,
  TabStave,
  TickContext,
  Tuplet,
  VexFlow,
  Voice,
} from 'vexflow';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type SuiteDefinition = {
  id: string;
  name: string;
  measure: (width: number) => number;
  draw: (ctx: SkiaVexflowContext, width: number) => void;
};

const BLOCK_TITLE_HEIGHT = 18;
const BLOCK_PADDING = 24;
const BLOCK_STAVE_HEIGHT = 120;

function measureBlocks(count: number) {
  if (count <= 0) return 0;
  return count * (BLOCK_TITLE_HEIGHT + BLOCK_STAVE_HEIGHT + BLOCK_PADDING) - BLOCK_PADDING;
}

function drawBlockTitle(ctx: SkiaVexflowContext, y: number, title: string) {
  ctx.save();
  ctx.setFillStyle('#111111');
  ctx.setFont({ family: 'Arial', size: 12, weight: 'normal', style: 'normal' });
  ctx.fillText(title, 10, y + 14);
  ctx.restore();
  return y + BLOCK_TITLE_HEIGHT;
}

function drawStaveWithVoice(ctx: SkiaVexflowContext, y: number, width: number, notes: StaveNote[]) {
  const stave = new Stave(10, y, width - 20).addClef('treble');
  stave.setContext(ctx as any).draw();
  const voice = new Voice({ numBeats: 4, beatValue: 4 }).setStrict(false).addTickables(notes);
  new Formatter().joinVoices([voice]).formatToStave([voice], stave);
  voice.draw(ctx as any, stave);
}

function renderAccidentalSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'Accidental - Basic');
  const basicNotes = [
    new StaveNote({ keys: ['c/4'], duration: 'q' }).addModifier(new Accidental('#'), 0),
    new StaveNote({ keys: ['d/4'], duration: 'q' }).addModifier(new Accidental('b'), 0),
    new StaveNote({ keys: ['e/4'], duration: 'q' }).addModifier(new Accidental('n'), 0),
    new StaveNote({ keys: ['f/4'], duration: 'q' }).addModifier(new Accidental('##'), 0),
  ];
  drawStaveWithVoice(ctx, y + 10, width, basicNotes);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  y = drawBlockTitle(ctx, y, 'Accidental - Stem Down');
  const stemDownNotes = [
    new StaveNote({ keys: ['g/4'], duration: 'q' }).addModifier(new Accidental('#'), 0),
    new StaveNote({ keys: ['a/4'], duration: 'q' }).addModifier(new Accidental('b'), 0),
    new StaveNote({ keys: ['b/4'], duration: 'q' }).addModifier(new Accidental('n'), 0),
    new StaveNote({ keys: ['c/5'], duration: 'q' }).addModifier(new Accidental('#'), 0),
  ];
  stemDownNotes.forEach((note) => note.setStemDirection(-1));
  drawStaveWithVoice(ctx, y + 10, width, stemDownNotes);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  y = drawBlockTitle(ctx, y, 'Accidental - Automatic (Key F)');
  const autoNotes = [
    new StaveNote({ keys: ['bb/4'], duration: 'q' }),
    new StaveNote({ keys: ['bb/4'], duration: 'q' }),
    new StaveNote({ keys: ['g#/4'], duration: 'q' }),
    new StaveNote({ keys: ['g/4'], duration: 'q' }),
  ];
  const autoVoice = new Voice({ numBeats: 4, beatValue: 4 }).addTickables(autoNotes);
  Accidental.applyAccidentals([autoVoice], 'F');
  const autoStave = new Stave(10, y + 10, width - 20).addClef('treble');
  autoStave.setContext(ctx as any).draw();
  new Formatter().joinVoices([autoVoice]).formatToStave([autoVoice], autoStave);
  autoVoice.draw(ctx as any, autoStave);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

function renderNoteHeadSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'NoteHead - Basic');
  const stave = new Stave(10, y + 10, width - 20).addClef('treble');
  stave.setContext(ctx as any).draw();
  const voice = new Voice(VexFlow.TIME4_4).setStrict(false);
  const nh1 = new NoteHead({ duration: '4', line: 3 });
  const nh2 = new NoteHead({ duration: '1', line: 2.5 });
  const nh3 = new NoteHead({ duration: '2', line: 0 });
  voice.addTickables([nh1, nh2, nh3]);
  new Formatter().joinVoices([voice]).formatToStave([voice], stave);
  voice.draw(ctx as any, stave);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  y = drawBlockTitle(ctx, y, 'NoteHead - Various');
  const varStave = new Stave(10, y + 10, width - 20).addClef('percussion');
  varStave.setContext(ctx as any).draw();
  const note = new StaveNote({ keys: ['g/5/x'], duration: 'q' });
  new TickContext().addTickable(note).preFormat().setX(60);
  note
    .setContext(ctx as any)
    .setStave(varStave)
    .draw();
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

function renderAnnotationSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'Annotation - Above');
  const aboveNotes = [
    new StaveNote({ keys: ['c/4'], duration: 'q' }).addModifier(
      new Annotation('mf').setPosition(ModifierPosition.ABOVE),
      0
    ),
    new StaveNote({ keys: ['d/4'], duration: 'q' }).addModifier(
      new Annotation('p').setPosition(ModifierPosition.ABOVE),
      0
    ),
    new StaveNote({ keys: ['e/4'], duration: 'q' }).addModifier(
      new Annotation('f').setPosition(ModifierPosition.ABOVE),
      0
    ),
    new StaveNote({ keys: ['f/4'], duration: 'q' }).addModifier(
      new Annotation('ff').setPosition(ModifierPosition.ABOVE),
      0
    ),
  ];
  drawStaveWithVoice(ctx, y + 10, width, aboveNotes);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  y = drawBlockTitle(ctx, y, 'Annotation - Below');
  const belowNotes = [
    new StaveNote({ keys: ['g/4'], duration: 'q' }).addModifier(
      new Annotation('lyric-1').setPosition(ModifierPosition.BELOW),
      0
    ),
    new StaveNote({ keys: ['a/4'], duration: 'q' }).addModifier(
      new Annotation('lyric-2').setPosition(ModifierPosition.BELOW),
      0
    ),
    new StaveNote({ keys: ['b/4'], duration: 'q' }).addModifier(
      new Annotation('lyric-3').setPosition(ModifierPosition.BELOW),
      0
    ),
    new StaveNote({ keys: ['c/5'], duration: 'q' }).addModifier(
      new Annotation('lyric-4').setPosition(ModifierPosition.BELOW),
      0
    ),
  ];
  drawStaveWithVoice(ctx, y + 10, width, belowNotes);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  y = drawBlockTitle(ctx, y, 'Annotation - Styled');
  const styled = new Annotation('dolce')
    .setPosition(ModifierPosition.ABOVE)
    .setStyle({ fillStyle: '#1f6f3b' });
  const styledNotes = [
    new StaveNote({ keys: ['c/4'], duration: 'h' }).addModifier(styled, 0),
    new StaveNote({ keys: ['e/4'], duration: 'h' }),
  ];
  drawStaveWithVoice(ctx, y + 10, width, styledNotes);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

function renderArticulationSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'Articulation - Staccato/Tenuto');
  const staccatoNotes = [
    new StaveNote({ keys: ['c/4'], duration: 'q' }).addModifier(
      new Articulation('a.').setPosition(ModifierPosition.ABOVE),
      0
    ),
    new StaveNote({ keys: ['d/4'], duration: 'q' }).addModifier(
      new Articulation('a-').setPosition(ModifierPosition.ABOVE),
      0
    ),
    new StaveNote({ keys: ['e/4'], duration: 'q' }).addModifier(
      new Articulation('a.').setPosition(ModifierPosition.BELOW),
      0
    ),
    new StaveNote({ keys: ['f/4'], duration: 'q' }).addModifier(
      new Articulation('a-').setPosition(ModifierPosition.BELOW),
      0
    ),
  ];
  drawStaveWithVoice(ctx, y + 10, width, staccatoNotes);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  y = drawBlockTitle(ctx, y, 'Articulation - Accent/Marcato');
  const accentNotes = [
    new StaveNote({ keys: ['g/4'], duration: 'q' }).addModifier(
      new Articulation('a>').setPosition(ModifierPosition.ABOVE),
      0
    ),
    new StaveNote({ keys: ['a/4'], duration: 'q' }).addModifier(
      new Articulation('a^').setPosition(ModifierPosition.ABOVE),
      0
    ),
    new StaveNote({ keys: ['b/4'], duration: 'q' }).addModifier(
      new Articulation('a>').setPosition(ModifierPosition.BELOW),
      0
    ),
    new StaveNote({ keys: ['c/5'], duration: 'q' }).addModifier(
      new Articulation('a^').setPosition(ModifierPosition.BELOW),
      0
    ),
  ];
  drawStaveWithVoice(ctx, y + 10, width, accentNotes);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

function renderBarlineSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'Barline - Double/End');
  const stave1 = new Stave(10, y + 10, width - 20)
    .addClef('treble')
    .setEndBarType(BarlineType.DOUBLE);
  stave1.setContext(ctx as any).draw();
  const voice1 = new Voice({ numBeats: 2, beatValue: 2 })
    .setStrict(false)
    .addTickables([
      new StaveNote({ keys: ['c/4'], duration: 'h' }),
      new StaveNote({ keys: ['d/4'], duration: 'h' }),
    ]);
  new Formatter().joinVoices([voice1]).formatToStave([voice1], stave1);
  voice1.draw(ctx as any, stave1);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  y = drawBlockTitle(ctx, y, 'Barline - Repeat Begin/End');
  const stave2 = new Stave(10, y + 10, width - 20)
    .addClef('treble')
    .setBegBarType(BarlineType.REPEAT_BEGIN)
    .setEndBarType(BarlineType.REPEAT_END);
  stave2.setContext(ctx as any).draw();
  const voice2 = new Voice({ numBeats: 2, beatValue: 2 })
    .setStrict(false)
    .addTickables([
      new StaveNote({ keys: ['e/4'], duration: 'h' }),
      new StaveNote({ keys: ['f/4'], duration: 'h' }),
    ]);
  new Formatter().joinVoices([voice2]).formatToStave([voice2], stave2);
  voice2.draw(ctx as any, stave2);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

function renderBeamSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'Beam - Eighth Notes');
  const stave = new Stave(10, y + 10, width - 20).addClef('treble');
  stave.setContext(ctx as any).draw();
  const notes = [
    new StaveNote({ keys: ['c/4'], duration: '8' }),
    new StaveNote({ keys: ['d/4'], duration: '8' }),
    new StaveNote({ keys: ['e/4'], duration: '8' }),
    new StaveNote({ keys: ['f/4'], duration: '8' }),
    new StaveNote({ keys: ['g/4'], duration: '8' }),
    new StaveNote({ keys: ['a/4'], duration: '8' }),
    new StaveNote({ keys: ['b/4'], duration: '8' }),
    new StaveNote({ keys: ['c/5'], duration: '8' }),
  ];
  const voice = new Voice({ numBeats: 4, beatValue: 4 }).setStrict(false).addTickables(notes);
  new Formatter().joinVoices([voice]).formatToStave([voice], stave);
  const beams = Beam.generateBeams(notes);
  voice.draw(ctx as any, stave);
  beams.forEach((beam) => beam.setContext(ctx as any).draw());
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

function renderBendSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'Bend - Double Bends');
  const tabStave = new TabStave(10, y + 10, width - 20).addClef('tab');
  tabStave.setContext(ctx as any).draw();
  const notes = [
    new TabNote({
      positions: [
        { str: 2, fret: 10 },
        { str: 4, fret: 9 },
      ],
      duration: 'q',
    })
      .addModifier(new Bend([{ type: Bend.UP, text: 'Full' }]), 0)
      .addModifier(new Bend([{ type: Bend.UP, text: '1/2' }]), 1),
    new TabNote({
      positions: [
        { str: 2, fret: 5 },
        { str: 3, fret: 5 },
      ],
      duration: 'q',
    })
      .addModifier(new Bend([{ type: Bend.UP, text: '1/4' }]), 0)
      .addModifier(new Bend([{ type: Bend.UP, text: '1/4' }]), 1),
    new TabNote({ positions: [{ str: 4, fret: 7 }], duration: 'h' }),
  ];
  Formatter.FormatAndDraw(ctx as any, tabStave, notes);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

function renderBoundingBoxSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'BoundingBox - NoteHeads');
  const stave = new Stave(10, y + 10, width - 20).addClef('treble');
  stave.setContext(ctx as any).draw();
  const voice = new Voice(VexFlow.TIME4_4).setStrict(false);
  const nh1 = new NoteHead({ duration: '4', line: 3 });
  const nh2 = new NoteHead({ duration: '2', line: 1 });
  const nh3 = new NoteHead({ duration: '1', line: 0 });
  voice.addTickables([nh1, nh2, nh3]);
  new Formatter().joinVoices([voice]).formatToStave([voice], stave);
  voice.draw(ctx as any, stave);
  const boxes = [nh1.getBoundingBox(), nh2.getBoundingBox(), nh3.getBoundingBox()];
  ctx.save();
  boxes.forEach((bb) => {
    ctx.beginPath();
    ctx.rect(bb.getX(), bb.getY(), bb.getW(), bb.getH());
    ctx.stroke();
  });
  ctx.restore();
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

function renderChordSymbolSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'ChordSymbol - Top');
  const stave = new Stave(10, y + 10, width - 20).addClef('treble');
  stave.setContext(ctx as any).draw();
  const chord = new ChordSymbol()
    .addText('F7')
    .addGlyphOrText('b9', { symbolModifier: SymbolModifiers.SUPERSCRIPT })
    .addGlyphOrText('#11', { symbolModifier: SymbolModifiers.SUBSCRIPT });
  const notes = [
    new StaveNote({ keys: ['c/4'], duration: 'q' }).addModifier(chord, 0),
    new StaveNote({ keys: ['c/4'], duration: 'q' }),
    new StaveNote({ keys: ['c/4'], duration: 'q' }),
    new StaveNote({ keys: ['c/4'], duration: 'q' }),
  ];
  drawStaveWithVoice(ctx, y + 10, width, notes);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

function renderDotSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'Dot - Dotted Notes');
  const dottedNotes = [
    new StaveNote({ keys: ['c/4'], duration: 'qd' }).addModifier(new Dot(), 0),
    new StaveNote({ keys: ['d/4'], duration: '8' }).addModifier(new Dot(), 0),
    new StaveNote({ keys: ['e/4'], duration: 'hd' }).addModifier(new Dot(), 0),
    new StaveNote({ keys: ['f/4'], duration: 'wd' }).addModifier(new Dot(), 0),
  ];
  drawStaveWithVoice(ctx, y + 10, width, dottedNotes);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

function renderTimeSignatureSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'TimeSignature - Various');
  const stave1 = new Stave(10, y + 10, width - 20).addClef('treble').addTimeSignature('4/4');
  stave1.setContext(ctx as any).draw();
  const notes1 = [
    new StaveNote({ keys: ['c/4'], duration: 'h' }),
    new StaveNote({ keys: ['d/4'], duration: 'h' }),
  ];
  drawStaveWithVoice(ctx, y + 10, width, notes1);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  y = drawBlockTitle(ctx, y, 'TimeSignature - 3/4');
  const stave2 = new Stave(10, y + 10, width - 20).addClef('treble').addTimeSignature('3/4');
  stave2.setContext(ctx).draw();
  const notes2 = [
    new StaveNote({ keys: ['e/4'], duration: 'q' }),
    new StaveNote({ keys: ['f/4'], duration: 'q' }),
    new StaveNote({ keys: ['g/4'], duration: 'q' }),
  ];
  drawStaveWithVoice(ctx, y + 10, width, notes2);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

function renderKeySignatureSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'KeySignature - C Major');
  const stave1 = new Stave(10, y + 10, width - 20).addClef('treble').addKeySignature('C');
  stave1.setContext(ctx as any).draw();
  const notes1 = [
    new StaveNote({ keys: ['c/4'], duration: 'q' }),
    new StaveNote({ keys: ['d/4'], duration: 'q' }),
    new StaveNote({ keys: ['e/4'], duration: 'q' }),
    new StaveNote({ keys: ['f/4'], duration: 'q' }),
  ];
  drawStaveWithVoice(ctx, y + 10, width, notes1);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  y = drawBlockTitle(ctx, y, 'KeySignature - G Major');
  const stave2 = new Stave(10, y + 10, width - 20).addClef('treble').addKeySignature('G');
  stave2.setContext(ctx as any).draw();
  const notes2 = [
    new StaveNote({ keys: ['g/4'], duration: 'q' }),
    new StaveNote({ keys: ['a/4'], duration: 'q' }),
    new StaveNote({ keys: ['b/4'], duration: 'q' }),
    new StaveNote({ keys: ['c/5'], duration: 'q' }),
  ];
  drawStaveWithVoice(ctx, y + 10, width, notes2);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

function renderGraceNoteSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'GraceNote - Before');
  const stave = new Stave(10, y + 10, width - 20).addClef('treble');
  stave.setContext(ctx as any).draw();
  const graceNote = new GraceNote({ keys: ['b/4'], duration: '16' });
  const graceGroup = new GraceNoteGroup([graceNote], false);
  const notes = [
    new StaveNote({ keys: ['b/4'], duration: 'q' }).addModifier(graceGroup, 0),
    new StaveNote({ keys: ['c/5'], duration: 'q' }),
    new StaveNote({ keys: ['d/5'], duration: 'q' }),
    new StaveNote({ keys: ['e/5'], duration: 'q' }),
  ];
  drawStaveWithVoice(ctx, y + 10, width, notes);
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

function renderTupletSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'Tuplet - Triplets');
  const stave = new Stave(10, y + 10, width - 20).addClef('treble');
  stave.setContext(ctx as any).draw();
  const notes = [
    new StaveNote({ keys: ['d/4'], duration: '8' }),
    new StaveNote({ keys: ['e/4'], duration: '8' }),
    new StaveNote({ keys: ['f/4'], duration: '8' }),
    new StaveNote({ keys: ['g/4'], duration: '8' }),
    new StaveNote({ keys: ['a/4'], duration: '8' }),
    new StaveNote({ keys: ['b/4'], duration: '8' }),
  ];
  const voice = new Voice({ numBeats: 4, beatValue: 4 }).setStrict(false).addTickables(notes);
  new Formatter().joinVoices([voice]).formatToStave([voice], stave);
  voice.draw(ctx as any, stave);

  // Add tuplets
  new Tuplet(notes.slice(0, 3), { numNotes: 3, notesOccupied: 2 }).setContext(ctx as any).draw();
  new Tuplet(notes.slice(3, 6), { numNotes: 3, notesOccupied: 2 }).setContext(ctx as any).draw();
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

function renderClefSuite(ctx: SkiaVexflowContext, width: number) {
  let y = 0;

  y = drawBlockTitle(ctx, y, 'Clef - Variants');
  const stave = new Stave(10, y + 10, width - 20)
    .addClef('treble')
    .addClef('bass')
    .addClef('alto')
    .addClef('tenor')
    .addClef('percussion')
    .addClef('french')
    .addEndClef('treble');
  stave.setContext(ctx as any).draw();
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  y = drawBlockTitle(ctx, y, 'Clef - Change');
  const stave2 = new Stave(10, y + 10, width - 20).addClef('treble').addClef('alto', 'small');
  const notes = [
    new StaveNote({ keys: ['c/4'], duration: 'q', clef: 'treble' }),
    new ClefNote('alto', 'small'),
    new StaveNote({ keys: ['c/4'], duration: 'q', clef: 'alto' }),
    new ClefNote('bass', 'small'),
  ];
  stave2.setContext(ctx as any).draw();

  // Create and preFormat with TickContext first (required for draw)
  const tickContext = new TickContext();
  notes.forEach((note) => {
    note.setContext(ctx as any).setStave(stave2);
    tickContext.addTickable(note);
  });
  tickContext.preFormat();

  // Override x positions before drawing
  const noteStartX = stave2.getNoteStartX();
  let xPos = noteStartX;
  notes.forEach((note) => {
    note.setX(xPos);
    xPos += 90;
  });

  // Now draw with the custom positions
  notes.forEach((note) => {
    note.draw();
  });
  y += BLOCK_STAVE_HEIGHT + BLOCK_PADDING;

  return y;
}

const RN_SUITES: SuiteDefinition[] = [
  {
    id: 'accidental',
    name: 'Accidental',
    measure: () => measureBlocks(3),
    draw: renderAccidentalSuite,
  },
  {
    id: 'annotation',
    name: 'Annotation',
    measure: () => measureBlocks(3),
    draw: renderAnnotationSuite,
  },
  {
    id: 'articulation',
    name: 'Articulation',
    measure: () => measureBlocks(2),
    draw: renderArticulationSuite,
  },
  {
    id: 'barline',
    name: 'Barline',
    measure: () => measureBlocks(2),
    draw: renderBarlineSuite,
  },
  {
    id: 'beam',
    name: 'Beam',
    measure: () => measureBlocks(1),
    draw: renderBeamSuite,
  },
  {
    id: 'bend',
    name: 'Bend',
    measure: () => measureBlocks(1),
    draw: renderBendSuite,
  },
  {
    id: 'boundingbox',
    name: 'BoundingBox',
    measure: () => measureBlocks(1),
    draw: renderBoundingBoxSuite,
  },
  {
    id: 'chordsymbol',
    name: 'ChordSymbol',
    measure: () => measureBlocks(1),
    draw: renderChordSymbolSuite,
  },
  {
    id: 'clef',
    name: 'Clef',
    measure: () => measureBlocks(2),
    draw: renderClefSuite,
  },
  {
    id: 'dot',
    name: 'Dot',
    measure: () => measureBlocks(1),
    draw: renderDotSuite,
  },
  {
    id: 'gracenote',
    name: 'GraceNote',
    measure: () => measureBlocks(1),
    draw: renderGraceNoteSuite,
  },
  {
    id: 'keysignature',
    name: 'KeySignature',
    measure: () => measureBlocks(2),
    draw: renderKeySignatureSuite,
  },
  {
    id: 'notehead',
    name: 'NoteHead',
    measure: () => measureBlocks(2),
    draw: renderNoteHeadSuite,
  },
  {
    id: 'timesignature',
    name: 'TimeSignature',
    measure: () => measureBlocks(2),
    draw: renderTimeSignatureSuite,
  },
  {
    id: 'tuplet',
    name: 'Tuplet',
    measure: () => measureBlocks(1),
    draw: renderTupletSuite,
  },
];

function createVexflowPicture(
  width: number,
  height: number,
  draw: (ctx: SkiaVexflowContext) => void,
  bravuraFont: SkFont | null = null
): SkPicture {
  const recorder = Skia.PictureRecorder();
  const canvas = recorder.beginRecording(Skia.XYWHRect(0, 0, width, height));

  canvas.clear(Skia.Color('white'));

  const ctx = new SkiaVexflowContext(canvas, bravuraFont);
  draw(ctx);

  return recorder.finishRecordingAsPicture();
}

export default function VexflowTestScreen() {
  const { width } = useWindowDimensions();
  const canvasWidth = Math.max(320, Math.floor(width) - 48);
  const [suiteIndex, setSuiteIndex] = useState(0);

  // Load Bravura font using Skia's useFont hook
  const bravuraFont = useFont(require('@/assets/fonts/Bravura.otf'), 30);

  const pictureInfo = useMemo(() => {
    if (!bravuraFont) return null;

    Element.setTextMeasurementCanvas(
      createTextMeasurementCanvas(bravuraFont) as unknown as HTMLCanvasElement
    );

    VexFlow.STAVE_LINE_DISTANCE = 10;
    VexFlow.STEM_HEIGHT = 30;

    const suite = RN_SUITES[suiteIndex] ?? RN_SUITES[0];
    const pictureHeight = Math.max(200, Math.ceil(suite.measure(canvasWidth)));

    console.log(`Rendering RN test suite: ${suite.name}`);
    const picture = createVexflowPicture(
      canvasWidth,
      pictureHeight,
      (ctx) => {
        suite.draw(ctx, canvasWidth);
      },
      bravuraFont
    );

    return { picture, width: canvasWidth, height: pictureHeight };
  }, [canvasWidth, bravuraFont, suiteIndex]);

  if (!bravuraFont) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">VexFlow Test</ThemedText>
        <ThemedText style={styles.subtitle}>Loading Bravura font...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">VexFlow Test</ThemedText>
      <ThemedText style={styles.subtitle}>
        Skia render backend with VexFlow + Bravura font.
      </ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.suiteTabs}
      >
        {RN_SUITES.map((suite, index) => {
          const isActive = index === suiteIndex;
          return (
            <Pressable
              key={suite.id}
              onPress={() => setSuiteIndex(index)}
              style={[styles.suiteTab, isActive && styles.suiteTabActive]}
            >
              <ThemedText style={[styles.suiteTabText, isActive && styles.suiteTabTextActive]}>
                {suite.name}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        {pictureInfo && (
          <Canvas style={{ width: pictureInfo.width, height: pictureInfo.height }}>
            <Picture picture={pictureInfo.picture} />
          </Canvas>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 84,
    gap: 12,
  },
  subtitle: {
    opacity: 0.7,
  },
  suiteTabs: {
    gap: 8,
    height: 84,
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  suiteTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    height: 38,
  },
  suiteTabActive: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderColor: 'rgba(0,0,0,0.2)',
  },
  suiteTabText: {
    fontSize: 12,
    textAlign: 'center',
  },
  suiteTabTextActive: {
    color: 'rgba(0,0,255,0.8)',
  },
});
