import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/musarrif/',
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.png', 'icon-192.png', 'maskable-icon.png', 'maskable-icon-192.png'],
      manifest: {
        name: 'Muṣarrif',
        short_name: 'Muṣarrif',
        description: 'Arabic verb conjugator',
        start_url: '/musarrif/',
        scope: '/musarrif/',
        display: 'standalone',
        background_color: '#f5f4ee',
        theme_color: '#f5f4ee',
        lang: 'en',
        dir: 'ltr',
        icons: [
          { src: 'icon.png', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
          { src: 'maskable-icon.svg', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
