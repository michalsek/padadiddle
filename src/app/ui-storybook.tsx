import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { Box, Column, Heading, Row, Screen, Spacer, Text } from "@/ui";

type StorybookSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  testID: string;
};

const RHYTHM_PARTS = ["Kick", "Snare", "Hi-hat", "Ride"];
const UI_USAGE_SNIPPET =
  "import { Box, Column, Heading, Row, Screen, Spacer, Text } from '@/ui';";
const UI_VARIANT_SUMMARIES = [
  "Screen: default shell, scrollable, disableSafeArea, custom padding",
  "Box: base themed container with custom style overrides",
  "Column: default and surface tones with configurable gap and alignment",
  "Row: default and surface tones with gap, alignment, justify, and wrap",
  "Spacer: horizontal or vertical axis with default or line tone",
  "Heading: semantic levels 1 through 4",
  "Text: default and muted body variants",
];

/**
 * Renders a reusable section wrapper for a UI component showcase block.
 * Input parameters:
 * - `title`: section heading text identifying the showcased component.
 * - `description`: short helper copy explaining what is being demonstrated.
 * - `children`: rendered preview content for a component example.
 * - `testID`: stable test identifier used by unit tests.
 * Output:
 * - A grouped section container with a heading, helper text, and preview body.
 * Logic summary:
 * - Keeps each showcase section visually consistent.
 * - Centralizes section title and description rendering to avoid duplication.
 */
function StorybookSection({
  title,
  description,
  children,
  testID,
}: StorybookSectionProps) {
  return (
    <View style={styles.section} testID={testID}>
      <Heading level={3}>{title}</Heading>
      <Spacer size={6} />
      <Text variant="muted">{description}</Text>
      <Spacer size={10} />
      {children}
    </View>
  );
}

/**
 * Renders a Storybook-like catalog page for all exported shared UI components.
 * Input parameters: none.
 * Output:
 * - A scrollable screen that previews each UI component with concrete props.
 * Logic summary:
 * - Uses `Screen` as the page shell and composes one section per component.
 * - Includes representative props and states so visual behavior is easy to verify.
 * - Exposes stable section test IDs for deterministic UI tests.
 */
export default function UiStorybookScreen() {
  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <Heading level={1}>UI Storybook</Heading>
      <Text variant="muted">
        Reference examples for all shared UI components exported from the `@/ui`
        barrel.
      </Text>

      <StorybookSection
        title="Usage"
        description="Import migrated primitives from a single shared barrel so feature screens stay on one public entrypoint."
        testID="storybook-section-usage"
      >
        <View style={styles.codeBlock} testID="storybook-usage-preview">
          <Text testID="storybook-usage-snippet">{UI_USAGE_SNIPPET}</Text>
        </View>
      </StorybookSection>

      <StorybookSection
        title="Variants"
        description="The current public UI surface exposes these variants and extension points for consumers."
        testID="storybook-section-variants"
      >
        <Column gap={8} testID="storybook-variants-preview">
          {UI_VARIANT_SUMMARIES.map((summary) => (
            <View key={summary} style={styles.variantItem}>
              <Text>{summary}</Text>
            </View>
          ))}
        </Column>
      </StorybookSection>

      <StorybookSection
        title="Screen"
        description="Current page uses Screen as the root shell. The embedded sample below demonstrates nested usage with custom padding."
        testID="storybook-section-screen"
      >
        <Screen
          disableSafeArea
          padding={10}
          style={styles.embeddedScreen}
          contentContainerStyle={styles.embeddedScreenContent}
          testID="storybook-screen-preview"
        >
          <Text>Embedded Screen preview</Text>
        </Screen>
      </StorybookSection>

      <StorybookSection
        title="Box"
        description="Box is a themed container with base flex behavior and customizable styling."
        testID="storybook-section-box"
      >
        <View style={styles.boxFrame}>
          <Box style={styles.boxPreview} testID="storybook-box-preview">
            <Text>Box content</Text>
          </Box>
        </View>
      </StorybookSection>

      <StorybookSection
        title="Column"
        description="Column arranges children vertically and supports spacing, alignment, and tones."
        testID="storybook-section-column"
      >
        <Column
          gap={8}
          tone="surface"
          style={styles.columnPreview}
          testID="storybook-column-preview"
        >
          <Text>Intro</Text>
          <Text>Verse</Text>
          <Text>Outro</Text>
        </Column>
      </StorybookSection>

      <StorybookSection
        title="Row"
        description="Row arranges children horizontally, supports wrapping, and can render surface tone."
        testID="storybook-section-row"
      >
        <Row
          gap={8}
          wrap
          tone="surface"
          style={styles.rowPreview}
          testID="storybook-row-preview"
        >
          {RHYTHM_PARTS.map((part) => (
            <View key={part} style={styles.rowChip}>
              <Text>{part}</Text>
            </View>
          ))}
        </Row>
      </StorybookSection>

      <StorybookSection
        title="Spacer"
        description="Spacer creates fixed horizontal or vertical spacing and can render line separators."
        testID="storybook-section-spacer"
      >
        <Column gap={8} style={styles.spacerPreview}>
          <Text>Horizontal spacer (line tone):</Text>
          <Spacer
            axis="horizontal"
            size={160}
            tone="line"
            testID="storybook-horizontal-spacer"
          />
          <Text>Vertical spacer (line tone):</Text>
          <Row align="center" gap={8}>
            <Text>Left</Text>
            <Spacer
              axis="vertical"
              size={24}
              tone="line"
              testID="storybook-vertical-spacer"
            />
            <Text>Right</Text>
          </Row>
        </Column>
      </StorybookSection>

      <StorybookSection
        title="Heading"
        description="Heading provides semantic type scale through explicit heading levels."
        testID="storybook-section-heading"
      >
        <Column gap={6} testID="storybook-heading-preview">
          <Heading level={1}>Heading level 1</Heading>
          <Heading level={2}>Heading level 2</Heading>
          <Heading level={3}>Heading level 3</Heading>
          <Heading level={4}>Heading level 4</Heading>
        </Column>
      </StorybookSection>

      <StorybookSection
        title="Text"
        description="Text offers body typography variants for default and muted content."
        testID="storybook-section-text"
      >
        <Column gap={6} testID="storybook-text-preview">
          <Text>Default text variant</Text>
          <Text variant="muted">Muted text variant</Text>
        </Column>
      </StorybookSection>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 18,
    paddingBottom: 24,
  },
  section: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 12,
    padding: 12,
  },
  codeBlock: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    padding: 10,
  },
  variantItem: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    padding: 10,
  },
  embeddedScreen: {
    flex: 0,
    minHeight: 72,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
  },
  embeddedScreenContent: {
    justifyContent: "center",
  },
  boxFrame: {
    height: 68,
  },
  boxPreview: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
  },
  columnPreview: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    padding: 10,
  },
  rowPreview: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    padding: 10,
  },
  rowChip: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  spacerPreview: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    padding: 10,
  },
});
