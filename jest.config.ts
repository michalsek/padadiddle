import type { Config } from 'jest';

/**
 * Jest configuration for Expo + React Native unit tests.
 * Input parameters: none.
 * Output: a typed Jest config object consumed by the Jest CLI.
 * Logic summary:
 * - Uses `jest-expo` preset for SDK-compatible transforms and runtime shims.
 * - Limits test discovery to `src/tests` so no tests are placed under `src/app`.
 * - Enables coverage collection as report-only via explicit include/exclude globs.
 */
const config: Config = {
  preset: 'jest-expo',
  testMatch: ['<rootDir>/src/tests/**/*.test.ts', '<rootDir>/src/tests/**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/tests/**',
    '!src/theme/types.ts',
    '!src/**/__generated__/**',
  ],
};

export default config;
