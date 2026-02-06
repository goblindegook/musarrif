/** @type {import('@stryker-mutator/api/core').StrykerOptions} */
const config = {
  packageManager: 'npm',
  plugins: ['@stryker-mutator/vitest-runner'],
  testRunner: 'vitest',
  reporters: ['clear-text', 'progress', 'html'],
  mutate: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/test/**',
  ],
  vitest: {
    configFile: 'vitest.config.ts',
  },
}

export default config
