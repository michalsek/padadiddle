import { Link, Stack } from "expo-router";
import { Pressable, Text } from "react-native";

/**
 * Configures the root stack navigator for the app.
 * - `index` is the main screen and exposes a header-right Settings button.
 * - `settings` is presented as a modal.
 * - Player and editor routes are part of the same stack so modal dismissal returns to
 *   standard push navigation behavior.
 */
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Padadiddle",
          headerRight: () => (
            <Link href="/settings" asChild>
              <Pressable accessibilityRole="button" hitSlop={8}>
                <Text>Settings</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          presentation: "modal",
        }}
      />
      <Stack.Screen name="ui-storybook" options={{ title: "UI Storybook" }} />
      <Stack.Screen name="player/[id]" options={{ title: "Player" }} />
      <Stack.Screen name="editor/new" options={{ title: "Editor New" }} />
      <Stack.Screen name="editor/[id]" options={{ title: "Editor" }} />
    </Stack>
  );
}
