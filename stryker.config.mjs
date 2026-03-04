export default {
  packageManager: 'npm',
  plugins: ['@stryker-mutator/vitest-runner'],
  testRunner: 'vitest',
  reporters: ['clear-text', 'progress', 'html'],
  mutate: ['src/paradigms/**/*.{ts,tsx}', '!src/paradigms/**/*.test.{ts,tsx}'],
  testFiles: ['src/paradigms/**/*.test.{ts,tsx}'],
  cleanTempDir: 'always',
  vitest: {
    configFile: 'vitest.config.ts',
  },
  ignoreStatic: false,
}
