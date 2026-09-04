import preact from '@preact/preset-vite'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [preact()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/test/setup.ts'],
    exclude: [...configDefaults.exclude, '**/.stryker-tmp/**'],
    projects: [
      {
        extends: true,
        test: {
          name: 'logic',
          pool: 'threads',
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
          name: 'dom',
          environment: 'happy-dom',
          pool: 'forks',
          sequence: { groupOrder: 1 },
          include: ['src/prerender/**/*.test.{ts,tsx}', 'src/ui/**/*.test.{ts,tsx}'],
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
