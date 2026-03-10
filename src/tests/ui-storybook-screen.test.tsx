import { render, screen } from '@testing-library/react-native';

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  function createMockIcon(displayName: string) {
    const MockIcon = ({ color, name, size }: { color: string; name: string; size: number }) => (
      <Text>{`${displayName}:${name}:${size}:${color}`}</Text>
    );

    MockIcon.displayName = displayName;

    return MockIcon;
  }

  return {
    Feather: createMockIcon('Feather'),
    Ionicons: createMockIcon('Ionicons'),
    MaterialIcons: createMockIcon('MaterialIcons'),
  };
});

import UiStorybookScreen from '../app/ui-storybook';

/**
 * Validates that the Storybook screen renders all component showcase sections.
 * Input parameters: none.
 * Output:
 * - Assertions proving the screen includes every shared UI component section label.
 * Logic summary:
 * - Renders the screen in isolation.
 * - Checks expected section headings and example markers.
 */
describe('UiStorybookScreen', () => {
  it('renders all UI component showcase sections', () => {
    render(<UiStorybookScreen />);

    expect(screen.getByText('UI Storybook')).toBeTruthy();
    expect(screen.getByTestId('storybook-section-screen')).toBeTruthy();
    expect(screen.getByTestId('storybook-section-box')).toBeTruthy();
    expect(screen.getByTestId('storybook-section-column')).toBeTruthy();
    expect(screen.getByTestId('storybook-section-row')).toBeTruthy();
    expect(screen.getByTestId('storybook-section-spacer')).toBeTruthy();
    expect(screen.getByTestId('storybook-section-heading')).toBeTruthy();
    expect(screen.getByTestId('storybook-section-text')).toBeTruthy();
    expect(screen.getByTestId('storybook-section-button')).toBeTruthy();
    expect(screen.getByTestId('storybook-section-checkbox')).toBeTruthy();
    expect(screen.getByTestId('storybook-section-link')).toBeTruthy();
    expect(screen.getByTestId('storybook-section-radiobutton')).toBeTruthy();
    expect(screen.getByTestId('storybook-section-spinner')).toBeTruthy();
    expect(screen.getByTestId('storybook-section-avatar')).toBeTruthy();
    expect(screen.getByTestId('storybook-section-icon')).toBeTruthy();
  });
});
