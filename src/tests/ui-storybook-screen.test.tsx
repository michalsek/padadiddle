import { render, screen } from "@testing-library/react-native";

import UiStorybookScreen from "../app/ui-storybook";

/**
 * Validates that the Storybook screen renders all component showcase sections.
 * Input parameters: none.
 * Output:
 * - Assertions proving the screen includes every shared UI component section label.
 * Logic summary:
 * - Renders the screen in isolation.
 * - Checks expected section headings and example markers.
 */
describe("UiStorybookScreen", () => {
  it("renders all UI component showcase sections", () => {
    render(<UiStorybookScreen />);

    expect(screen.getByText("UI Storybook")).toBeTruthy();
    expect(screen.getByTestId("storybook-section-usage")).toBeTruthy();
    expect(screen.getByTestId("storybook-section-variants")).toBeTruthy();
    expect(screen.getByTestId("storybook-section-screen")).toBeTruthy();
    expect(screen.getByTestId("storybook-section-box")).toBeTruthy();
    expect(screen.getByTestId("storybook-section-column")).toBeTruthy();
    expect(screen.getByTestId("storybook-section-row")).toBeTruthy();
    expect(screen.getByTestId("storybook-section-spacer")).toBeTruthy();
    expect(screen.getByTestId("storybook-section-heading")).toBeTruthy();
    expect(screen.getByTestId("storybook-section-text")).toBeTruthy();
    expect(screen.getByTestId("storybook-usage-snippet")).toBeTruthy();
  });
});
