import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

import RootLayout from '../app/_layout';
import { darkTheme } from '../theme';

const mockStack = jest.fn();
const mockScreen = jest.fn();
const mockUseTheme = jest.fn();

jest.mock('../theme/useTheme', () => ({
  useTheme: () => mockUseTheme(),
}));

jest.mock('expo-router', () => {
  const React = require('react');

  function MockStack({
    children,
    ...props
  }: {
    children?: ReactNode;
    screenOptions?: unknown;
  }) {
    mockStack(props);

    return <>{children}</>;
  }

  function MockScreen(props: unknown) {
    mockScreen(props);

    return null;
  }

  MockStack.Screen = MockScreen;

  return {
    Link: ({ children }: { children: ReactNode }) => <>{children}</>,
    Stack: MockStack,
  };
});

/**
 * Validates that the root stack header follows the active semantic theme.
 * Input parameters: none.
 * Output:
 * - Assertions proving the shared stack header surface, title, and action colors come from theme tokens.
 * Logic summary:
 * - Mocks Expo Router stack primitives to capture screen options passed by `RootLayout`.
 * - Mocks `useTheme` to simulate dark mode.
 * - Verifies stack-level header colors and the index screen header action text styling.
 */
describe('RootLayout', () => {
  it('applies themed header colors to the navigation stack', () => {
    mockUseTheme.mockReturnValue(darkTheme);

    render(<RootLayout />);

    expect(mockStack).toHaveBeenCalledWith({
      screenOptions: {
        headerStyle: {
          backgroundColor: darkTheme.colors.background,
        },
        headerTitleStyle: {
          color: darkTheme.colors.textBase,
        },
        headerTintColor: darkTheme.colors.primary,
      },
    });
  });

  it('styles the settings header action using the theme accent color', () => {
    mockUseTheme.mockReturnValue(darkTheme);

    render(<RootLayout />);

    const indexScreenProps = mockScreen.mock.calls.find(
      ([props]) => props && typeof props === 'object' && 'name' in props && props.name === 'index',
    )?.[0] as {
      options: {
        headerRight: () => ReactElement;
      };
    };

    const headerRight = indexScreenProps.options.headerRight();
    const { getByText } = render(headerRight);

    expect(getByText('Settings')).toHaveStyle({ color: darkTheme.colors.primary });
  });
});
