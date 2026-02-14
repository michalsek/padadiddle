import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Formatter, Stave, StaveNote, Voice } from 'vexflow';

import { useTranslation } from '@/hooks/useTranslation';
import { VexflowCanvas, type VexflowCanvasDrawArgs } from '@/skiaVexflow';
import { DropDown } from '@/ui';

const PIANO_NOTES = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];

function getPianoPitchOptions() {
  const options: string[] = ['a/0', 'a#/0', 'b/0'];

  for (let octave = 1; octave <= 7; octave++) {
    for (const note of PIANO_NOTES) {
      options.push(`${note}/${octave}`);
    }
  }

  options.push('c/8');
  return options;
}

const PITCH_OPTIONS = getPianoPitchOptions();

function formatPitch(pitch: string) {
  const [note, octave] = pitch.split('/');
  return `${note.replace('#', '♯').toUpperCase()}${octave}`;
}

export default function ManualTestingScreen() {
  const { t } = useTranslation();
  const [selectedPitches, setSelectedPitches] = useState(['c/4', 'd/4', 'e/4', 'f/4']);

  const setPitchAtIndex = useCallback((index: number, pitch: string) => {
    setSelectedPitches((prev) => {
      const next = [...prev];
      next[index] = pitch;
      return next;
    });
  }, []);

  const handleDraw = useCallback(
    ({ ctx, width }: VexflowCanvasDrawArgs) => {
      const stave = new Stave(16, 40, width - 32).addClef('treble');
      stave.setContext(ctx as any).draw();

      const notes = selectedPitches.map((pitch) => new StaveNote({ keys: [pitch], duration: 'q' }));

      const voice = new Voice({ numBeats: 4, beatValue: 4 }).setStrict(false).addTickables(notes);
      new Formatter().joinVoices([voice]).formatToStave([voice], stave);
      voice.draw(ctx as any, stave);
    },
    [selectedPitches]
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>{t('manualTestingBody')}</Text>
      <View style={styles.controls}>
        {selectedPitches.map((selectedPitch, noteIndex) => (
          <View key={`note-${noteIndex}`} style={styles.controlRow}>
            <Text style={styles.controlLabel}>Note {noteIndex + 1}</Text>
            <DropDown
              value={selectedPitch}
              onChange={(pitch) => setPitchAtIndex(noteIndex, pitch)}
              options={PITCH_OPTIONS.map((pitch) => ({
                value: pitch,
                label: formatPitch(pitch),
              }))}
            />
          </View>
        ))}
      </View>
      <View style={styles.renderContainer}>
        <VexflowCanvas onDraw={handleDraw} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  controlRow: {
    flex: 1,
    gap: 6,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  renderContainer: {
    borderWidth: 1,
    borderColor: '#d4d4d8',
    borderRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
});
