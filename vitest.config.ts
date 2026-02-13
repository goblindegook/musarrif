import preact from '@preact/preset-vite'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [preact()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    exclude: [...configDefaults.exclude, '**/.stryker-tmp/**'],
  },
})
