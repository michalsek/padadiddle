import { renderRouter, screen, testRouter } from 'expo-router/testing-library';
import { Text } from 'react-native';

/**
 * In-memory index route used for router smoke validation.
 * Input parameters: none.
 * Output: a static text node representing the default route.
 */
function IndexRoute() {
  return <Text>Index Route</Text>;
}

/**
 * In-memory settings route used for router smoke validation.
 * Input parameters: none.
 * Output: a static text node representing a secondary route.
 */
function SettingsRoute() {
  return <Text>Settings Route</Text>;
}

describe('Expo Router smoke tests', () => {
  it('renders index route and navigates to settings', () => {
    const router = renderRouter({
      index: IndexRoute,
      settings: SettingsRoute,
    });

    expect(screen.getByText('Index Route')).toBeTruthy();
    expect(router.getPathname()).toBe('/');

    testRouter.navigate('/settings');

    expect(screen.getByText('Settings Route')).toBeTruthy();
    expect(router.getPathname()).toBe('/settings');
  });
});
