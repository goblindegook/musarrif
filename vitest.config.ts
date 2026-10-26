import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/test/setup.ts'],
    exclude: [...configDefaults.exclude, '**/.stryker-tmp/**'],
    projects: [
      'apps/web',
      {
        extends: true,
        test: {
          name: 'logic',
          pool: 'threads',
          // shares parsed verb corpus across files, Stryker needs isolation
          isolate: 'STRYKER_MUTATOR_WORKER' in process.env,
          sequence: { groupOrder: 0 },
          include: [
            'src/exercises/**/*.test.{ts,tsx}',
            'src/paradigms/**/*.test.{ts,tsx}',
            'src/test/**/*.test.{ts,tsx}',
          ],
        },
      },
      {
        extends: true,
        test: {
          name: 'scripts',
          pool: 'forks',
          sequence: { groupOrder: 2 },
          include: ['scripts/**/*.test.mts'],
        },
      },
    ],
  },
})
