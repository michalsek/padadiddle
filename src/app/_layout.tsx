import { Link, Stack } from 'expo-router';
import { Pressable, Text } from 'react-native';

import type { Theme } from '../theme';
import { useTheme } from '../theme/useTheme';

/**
 * Builds the shared stack header appearance from the active theme tokens.
 * Input parameters:
 * - `theme`: active semantic theme used by the app at runtime.
 * Output:
 * - A React Navigation screen options object that styles header background, title text, and tint color.
 * Logic summary:
 * - Applies the themed surface color to the navigation header background.
 * - Keeps the title readable with `textBase`.
 * - Uses the primary accent color for back buttons and header actions.
 */
function getRootStackScreenOptions(theme: Theme) {
  return {
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTitleStyle: {
      color: theme.colors.textBase,
    },
    headerTintColor: theme.colors.primary,
  };
}

/**
 * Configures the root stack navigator for the app.
 * - `index` is the main screen and exposes a header-right Settings button.
 * - `settings` is presented as a modal.
 * - Player and editor routes are part of the same stack so modal dismissal returns to
 *   standard push navigation behavior.
 */
export default function RootLayout() {
  const theme = useTheme();

  return (
    <Stack screenOptions={getRootStackScreenOptions(theme)}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Padadiddle',
          headerRight: () => (
            <Link href="/settings" asChild>
              <Pressable accessibilityRole="button" hitSlop={8}>
                <Text style={{ color: theme.colors.primary }}>Settings</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="ui-storybook" options={{ title: 'UI Storybook' }} />
      <Stack.Screen name="player/[id]" options={{ title: 'Player' }} />
      <Stack.Screen name="editor/new" options={{ title: 'Editor New' }} />
      <Stack.Screen name="editor/[id]" options={{ title: 'Editor' }} />
    </Stack>
  );
}
