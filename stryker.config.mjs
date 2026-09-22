export default {
  packageManager: 'npm',
  plugins: ['@stryker-mutator/vitest-runner'],
  testRunner: 'vitest',
  reporters: ['clear-text', 'progress', 'html'],
  mutate: ['src/paradigms/**/*.{ts,tsx}', '!src/paradigms/**/*.test.{ts,tsx}'],
  testFiles: ['src/paradigms/**/*.test.{ts,tsx}'],
  ignorePatterns: ['dist'],
  cleanTempDir: 'always',
  ignoreStatic: true,
  incremental: true,
  timeoutFactor: 2,
  vitest: {
    configFile: 'vitest.config.ts',
  },
}
