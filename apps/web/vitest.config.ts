import preact from '@preact/preset-vite'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [preact()],
  test: {
    name: 'dom',
    globals: true,
    environment: 'happy-dom',
    pool: 'forks',
    isolate: true, // dom tests are leaky
    sequence: { groupOrder: 1 },
    setupFiles: ['./src/test/setup.ts'],
    exclude: [...configDefaults.exclude, '**/.stryker-tmp/**'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
