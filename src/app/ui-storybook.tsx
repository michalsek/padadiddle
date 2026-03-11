import { useState, type ReactNode } from "react";
import { View } from "react-native";

import { createStyleSheet, useStyles } from "../theme";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Column,
  Heading,
  Icon,
  Link,
  ProgressBar,
  RadioButton,
  Row,
  Screen,
  Slider,
  Spacer,
  Spinner,
  Text,
} from "../ui";

type StorybookSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  testID: string;
};

const RHYTHM_PARTS = ["Kick", "Snare", "Hi-hat", "Ride"];
const PRACTICE_TEMPO_MIN = 40;
const PRACTICE_TEMPO_MAX = 240;

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
  const styles = useStyles(styleSheet);

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
  const styles = useStyles(styleSheet);
  const [isPracticeModeEnabled, setIsPracticeModeEnabled] = useState(true);
  const [practiceTempo, setPracticeTempo] = useState(120);
  const [selectedSubdivision, setSelectedSubdivision] = useState<
    "quarters" | "eighths" | "triplets"
  >("eighths");
  const normalizedPracticeProgress =
    (practiceTempo - PRACTICE_TEMPO_MIN) /
    (PRACTICE_TEMPO_MAX - PRACTICE_TEMPO_MIN);

  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <Heading level={1}>UI Storybook</Heading>
      <Text variant="muted">
        Reference examples for all shared UI components in this app.
      </Text>

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
          style={styles.surfacePreview}
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
          style={styles.surfacePreview}
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
        <Column gap={8} style={styles.surfacePreview}>
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

      <StorybookSection
        title="Button"
        description="Button provides primary, secondary, and ghost variants with token-aligned disabled states."
        testID="storybook-section-button"
      >
        <Row gap={8} wrap testID="storybook-button-preview">
          <Button label="Primary" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Ghost" variant="ghost" />
          <Button disabled label="Disabled" />
        </Row>
      </StorybookSection>

      <StorybookSection
        title="Checkbox"
        description="Checkbox supports labeled boolean toggles with token-driven checked, unchecked, and disabled states."
        testID="storybook-section-checkbox"
      >
        <Column gap={12} testID="storybook-checkbox-preview">
          <Column gap={8}>
            <Text variant="muted">Usage</Text>
            <Checkbox
              checked={isPracticeModeEnabled}
              label="Enable practice mode"
              onChange={setIsPracticeModeEnabled}
              testID="storybook-checkbox-usage"
            />
          </Column>
          <Column gap={8}>
            <Text variant="muted">Variants</Text>
            <Row gap={12} wrap testID="storybook-checkbox-variants">
              <Checkbox
                checked={false}
                label="Unchecked"
                onChange={() => undefined}
              />
              <Checkbox checked label="Checked" onChange={() => undefined} />
              <Checkbox
                checked
                disabled
                label="Disabled"
                onChange={() => undefined}
              />
            </Row>
          </Column>
        </Column>
      </StorybookSection>

      <StorybookSection
        title="Link"
        description="Link renders themed inline navigation affordances and can open external URLs."
        testID="storybook-section-link"
      >
        <Column gap={8} testID="storybook-link-preview">
          <Link label="Read docs" />
          <Link disabled label="Disabled link" />
        </Column>
      </StorybookSection>

      <StorybookSection
        title="Slider"
        description="Slider supports bounded value selection with tap or drag interaction and semantic fill variants."
        testID="storybook-section-slider"
      >
        <Column gap={12} testID="storybook-slider-preview">
          <Column gap={8}>
            <Text variant="muted">Usage</Text>
            <Column gap={8} testID="storybook-slider-usage">
              <Text>Tempo target: {practiceTempo} BPM</Text>
              <Slider
                label="Tempo"
                max={PRACTICE_TEMPO_MAX}
                min={PRACTICE_TEMPO_MIN}
                onChange={setPracticeTempo}
                testID="storybook-slider-control"
                value={practiceTempo}
              />
            </Column>
          </Column>
          <Column gap={8}>
            <Text variant="muted">Variants</Text>
            <Column gap={10} testID="storybook-slider-variants">
              <Slider
                label="Secondary"
                max={100}
                min={0}
                onChange={() => undefined}
                value={35}
                variant="secondary"
              />
              <Slider
                label="Ghost"
                max={100}
                min={0}
                onChange={() => undefined}
                value={70}
                variant="ghost"
              />
              <Slider
                disabled
                label="Disabled"
                max={100}
                min={0}
                onChange={() => undefined}
                value={55}
              />
            </Column>
          </Column>
        </Column>
      </StorybookSection>

      <StorybookSection
        title="ProgressBar"
        description="ProgressBar visualizes bounded completion values using the same semantic variant language as other controls."
        testID="storybook-section-progressbar"
      >
        <Column gap={12} testID="storybook-progressbar-preview">
          <Column gap={8}>
            <Text variant="muted">Usage</Text>
            <Column gap={8} testID="storybook-progressbar-usage">
              <Text>
                Practice completion:{" "}
                {Math.round(normalizedPracticeProgress * 100)}%
              </Text>
              <ProgressBar
                progress={normalizedPracticeProgress}
                testID="storybook-progressbar-control"
              />
            </Column>
          </Column>
          <Column gap={8}>
            <Text variant="muted">Variants</Text>
            <Column gap={10} testID="storybook-progressbar-variants">
              <ProgressBar progress={0.35} variant="secondary" />
              <ProgressBar progress={0.7} variant="ghost" />
              <ProgressBar progress={1} />
            </Column>
          </Column>
        </Column>
      </StorybookSection>

      <StorybookSection
        title="RadioButton"
        description="RadioButton supports mutually exclusive choices with clear selected and disabled presentation."
        testID="storybook-section-radiobutton"
      >
        <Column gap={12} testID="storybook-radiobutton-preview">
          <Column gap={8}>
            <Text variant="muted">Usage</Text>
            <Column gap={8} testID="storybook-radiobutton-usage">
              <RadioButton
                label="Quarter notes"
                onSelect={() => setSelectedSubdivision("quarters")}
                selected={selectedSubdivision === "quarters"}
              />
              <RadioButton
                label="Eighth notes"
                onSelect={() => setSelectedSubdivision("eighths")}
                selected={selectedSubdivision === "eighths"}
              />
              <RadioButton
                label="Triplets"
                onSelect={() => setSelectedSubdivision("triplets")}
                selected={selectedSubdivision === "triplets"}
              />
            </Column>
          </Column>
          <Column gap={8}>
            <Text variant="muted">Variants</Text>
            <Row gap={12} wrap testID="storybook-radiobutton-variants">
              <RadioButton
                label="Unselected"
                onSelect={() => undefined}
                selected={false}
              />
              <RadioButton
                label="Selected"
                onSelect={() => undefined}
                selected
              />
              <RadioButton
                disabled
                label="Disabled"
                onSelect={() => undefined}
                selected
              />
            </Row>
          </Column>
        </Column>
      </StorybookSection>

      <StorybookSection
        title="Spinner"
        description="Spinner surfaces token-driven loading states with optional color overrides."
        testID="storybook-section-spinner"
      >
        <Row align="center" gap={16} testID="storybook-spinner-preview">
          <Spinner testID="storybook-spinner-default" />
          <Spinner
            color="#D97706"
            size="large"
            testID="storybook-spinner-warning"
          />
        </Row>
      </StorybookSection>

      <StorybookSection
        title="Avatar"
        description="Avatar renders images or label-derived initials across circular and squared shapes."
        testID="storybook-section-avatar"
      >
        <Row align="center" gap={12} wrap testID="storybook-avatar-preview">
          <Avatar label="Pad A" testID="storybook-avatar-circle" />
          <Avatar
            label="Hi Hat"
            shape="rounded"
            testID="storybook-avatar-rounded"
          />
          <Avatar
            label="Ride Cymbal"
            shape="square"
            testID="storybook-avatar-square"
          />
        </Row>
      </StorybookSection>

      <StorybookSection
        title="Icon"
        description="Icon wraps Expo icon families behind a single typed API and semantic theme tones."
        testID="storybook-section-icon"
      >
        <Row align="center" gap={12} wrap testID="storybook-icon-preview">
          <Icon family="feather" name="play-circle" tone="primary" />
          <Icon family="ionicons" name="musical-notes" tone="default" />
          <Icon family="material" name="music-note" tone="success" />
        </Row>
      </StorybookSection>
    </Screen>
  );
}

const styleSheet = createStyleSheet((theme) => ({
  content: {
    gap: 18,
    paddingBottom: theme.spacing.xl,
  },
  section: {},
  embeddedScreen: {
    flex: 0,
    minHeight: 72,
    borderWidth: 1,
    borderColor: theme.colors.border,
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
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    justifyContent: "center",
  },
  surfacePreview: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
  },
  rowChip: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
}));
