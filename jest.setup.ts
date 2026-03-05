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
