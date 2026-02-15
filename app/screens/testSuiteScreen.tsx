import { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { ACCIDENTAL_VISUAL_CASES, type VisualCase } from '@/app/tests/accidentalVisualCases';
import { ANNOTATION_VISUAL_CASES } from '@/app/tests/annotationVisualCases';
import { VexflowCanvas, type VexflowCanvasDrawArgs } from '@/skiaVexflow';
import { DropDown } from '@/ui';

const ALL_TESTS_VALUE = '__all_tests__';
const SUITE_ACCIDENTAL_VALUE = '__suite_accidental__';
const SUITE_ANNOTATION_VALUE = '__suite_annotation__';

function VisualCaseCard({ item, cardWidth }: { item: VisualCase; cardWidth: number }) {
  const handleDraw = useCallback(
    (args: VexflowCanvasDrawArgs) => {
      item.beforeDraw?.(args);
      item.draw(args);
    },
    [item]
  );

  return (
    <View style={[styles.caseCard, { width: cardWidth }]}>
      <Text style={styles.caseTitle}>{item.title}</Text>
      {item.description ? <Text style={styles.caseDescription}>{item.description}</Text> : null}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={styles.canvasScrollContent}
        style={styles.canvasScrollView}
      >
        <View style={styles.canvasContainer}>
          <VexflowCanvas onDraw={handleDraw} width={item.canvasWidth} height={item.canvasHeight} />
        </View>
      </ScrollView>
    </View>
  );
}

export default function TestSuiteScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.max(280, Math.floor(width) - 40);
  const accidentalCases = useMemo(() => [...ACCIDENTAL_VISUAL_CASES], []);
  const annotationCases = useMemo(() => [...ANNOTATION_VISUAL_CASES], []);
  const visualCases = useMemo(
    () => [...accidentalCases, ...annotationCases],
    [accidentalCases, annotationCases]
  );
  const [selectedFilter, setSelectedFilter] = useState<string>(ALL_TESTS_VALUE);
  const filteredVisualCases = useMemo(() => {
    if (selectedFilter === ALL_TESTS_VALUE) return visualCases;
    if (selectedFilter === SUITE_ACCIDENTAL_VALUE) return accidentalCases;
    if (selectedFilter === SUITE_ANNOTATION_VALUE) return annotationCases;
    return visualCases.filter((item) => `__case_${item.id}__` === selectedFilter);
  }, [accidentalCases, annotationCases, selectedFilter, visualCases]);
  const dropDownOptions = useMemo(
    () => [
      { value: ALL_TESTS_VALUE, label: 'All tests' },
      { value: SUITE_ACCIDENTAL_VALUE, label: '[#] Accidentals suite' },
      { value: SUITE_ANNOTATION_VALUE, label: '[#] Annotations suite' },
      ...visualCases.map((item) => ({ value: `__case_${item.id}__`, label: item.title })),
    ],
    [visualCases]
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>VexFlow Visual Harness</Text>
      <Text style={styles.subtitle}>
        Aggregator screen for visual test cases from `/app/tests`.
      </Text>
      <View style={styles.controlsRow}>
        <View style={styles.dropDownContainer}>
          <DropDown value={selectedFilter} onChange={setSelectedFilter} options={dropDownOptions} />
        </View>
      </View>
      {filteredVisualCases.map((item) => (
        <VisualCaseCard key={item.id} item={item} cardWidth={cardWidth} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    gap: 16,
    backgroundColor: '#ffffff',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#4b5563',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dropDownContainer: {
    flex: 1,
  },
  caseCard: {
    gap: 4,
    backgroundColor: '#ffffff',
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  caseDescription: {
    color: '#6b7280',
    fontSize: 12,
  },
  canvasScrollContent: {
    alignItems: 'flex-start',
  },
  canvasScrollView: {
    width: '100%',
  },
  canvasContainer: {
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
});
