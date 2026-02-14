import { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { ACCIDENTAL_VISUAL_CASES, type VisualCase } from '@/app/tests/accidentalVisualCases';
import { VexflowCanvas, type VexflowCanvasDrawArgs } from '@/skiaVexflow';

function VisualCaseCard({ item, cardWidth }: { item: VisualCase; cardWidth: number }) {
  const handleDraw = useCallback(
    (args: VexflowCanvasDrawArgs) => {
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
          <VexflowCanvas
            onDraw={handleDraw}
            width={item.canvasWidth ?? 1200}
            height={item.canvasHeight ?? 220}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default function TestSuiteScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.max(280, Math.floor(width) - 40);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Accidental Visual Harness</Text>
      <Text style={styles.subtitle}>
        Aggregator screen for visual test cases from `/app/tests`.
      </Text>
      {ACCIDENTAL_VISUAL_CASES.map((item) => (
        <VisualCaseCard key={item.id} item={item} cardWidth={cardWidth} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
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
  caseCard: {
    gap: 8,
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
    borderWidth: 1,
    borderColor: '#d4d4d8',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
});
