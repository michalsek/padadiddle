jest.mock('react-native-worklets', () => require('react-native-worklets/lib/module/mock'));
jest.mock('react-native-reanimated', () => {
  const reanimated = require('react-native-reanimated/mock');

  reanimated.default.call = () => undefined;

  return reanimated;
});

/**
 * Global Jest environment hooks.
 * Input parameters: none.
 * Output: deterministic per-test cleanup behavior.
 * Logic summary:
 * - Clears mocks after each test to keep assertions isolated.
 * - Restores real timers to prevent fake-timer leakage between tests.
 */
afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
  jest.useRealTimers();
});
