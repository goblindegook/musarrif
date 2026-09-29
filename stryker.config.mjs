export default {
  packageManager: 'npm',
  plugins: ['@stryker-mutator/vitest-runner'],
  testRunner: 'vitest',
  reporters: ['clear-text', 'progress', 'html'],
  mutate: ['src/paradigms/**/*.{ts,tsx}', '!src/paradigms/**/*.test.{ts,tsx}'],
  testFiles: ['src/paradigms/**/*.test.{ts,tsx}'],
  // TypeScript 7 has no JS API; core's tsconfig rewrite calls ts.parseConfigFileTextToJson and crashes. A missing file skips it.
  tsconfigFile: 'tsconfig.stryker-skip.json',
  ignorePatterns: ['dist'],
  cleanTempDir: 'always',
  ignoreStatic: true,
  incremental: true,
  timeoutFactor: 2,
  dryRunTimeoutMinutes: 15,
  vitest: {
    configFile: 'vitest.config.ts',
  },
}
