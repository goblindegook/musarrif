import config from './stryker.config.mjs'

export default {
  ...config,
  mutate: ['src/paradigms/**/*.{ts,tsx}', '!src/paradigms/**/*.test.{ts,tsx}'],
  incrementalFile: 'reports/stryker-paradigms-incremental.json',
  ignorePatterns: [...config.ignorePatterns, 'apps'],
  vitest: { configFile: 'vitest.paradigms.config.ts' },
}
