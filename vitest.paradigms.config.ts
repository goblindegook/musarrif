import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/test/setup.ts'],
    exclude: [...configDefaults.exclude, '**/.stryker-tmp/**'],
    pool: 'threads',
    isolate: 'STRYKER_MUTATOR_WORKER' in process.env,
    include: ['src/paradigms/**/*.test.{ts,tsx}'],
  },
})
