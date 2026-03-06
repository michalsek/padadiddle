import { Href, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Button, FlatList, View } from 'react-native';

import { Screen, Text } from '../ui';

type SettingsNavigationItem = {
  key: string;
  label: string;
  getHref: () => Href;
};

/**
 * Generates a temporary id value used for dynamic route segments.
 * The id is stable enough for local navigation and keeps this screen stateless.
 */
function generateTmpId(): string {
  return Date.now().toString(36);
}

/**
 * Lists simple navigation actions to player and editor routes.
 * Each action dismisses the modal first, then pushes the target route so navigation
 * transitions back to the normal stack flow.
 */
export default function SettingsScreen() {
  const router = useRouter();

  const navigateFromSettings = useCallback(
    (href: Href) => {
      router.dismiss();
      setTimeout(() => {
        router.push(href);
      }, 0);
    },
    [router],
  );

  const settingsNavigationItems: SettingsNavigationItem[] = [
    {
      key: 'player',
      label: 'Go to player',
      getHref: () => `/player/${generateTmpId()}`,
    },
    {
      key: 'editor-new',
      label: 'Go to editor new',
      getHref: () => '/editor/new',
    },
    {
      key: 'editor',
      label: 'Go to editor',
      getHref: () => `/editor/${generateTmpId()}`,
    },
  ];

  return (
    <Screen>
      <FlatList
        data={settingsNavigationItems}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ gap: 12 }}
        ListHeaderComponent={<Text style={{ marginBottom: 12 }}>Navigate to a route</Text>}
        renderItem={({ item }) => (
          <View>
            <Button title={item.label} onPress={() => navigateFromSettings(item.getHref())} />
          </View>
        )}
      />
    </Screen>
  );
}
