import { ExpoRoot, type RequireContext } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const context = (require as unknown as { context: (path: string) => RequireContext }).context('./app');

/**
 * Custom application entry point used by `index.ts`.
 * It provides Expo Router with a route context rooted at `src/app`,
 * enabling file-based navigation without using `expo-router/entry` as package main.
 */
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ExpoRoot context={context} />
    </GestureHandlerRootView>
  );
}
