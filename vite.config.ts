import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
const routingMode = process.env.VITE_ROUTING_MODE === 'hash' ? 'hash' : 'path'

export default defineConfig({
  base: routingMode === 'hash' ? './' : '/',
  plugins: [
    preact(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: [
        'icon.png',
        'icon-192.png',
        'apple-touch-icon.png',
        'favicon-32x32.png',
        'favicon-16x16.png',
        'fonts/NotoSansArabic-Regular.ttf',
        'fonts/NotoSansArabic-Medium.ttf',
        'fonts/NotoSansArabic-SemiBold.ttf',
        'fonts/NotoSansArabic-Bold.ttf',
      ],
      workbox:
        routingMode === 'hash'
          ? { globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf}'] }
          : {
              globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf}'],
              globIgnores: ['verbs/**/*.html'],
              navigateFallback: '/index.html',
              navigateFallbackDenylist: [/^\/assets\//, /^\/fonts\//, /^\/piper\//, /^\/voices\//],
            },
      manifest: {
        name: 'Muṣarrif',
        short_name: 'Muṣarrif',
        description: 'Arabic verb conjugator',
        start_url: routingMode === 'hash' ? './' : '/',
        scope: routingMode === 'hash' ? './' : '/',
        display: 'standalone',
        background_color: '#f5f4ee',
        theme_color: '#f5f4ee',
        lang: 'en',
        dir: 'ltr',
        file_handlers: [
          {
            action: routingMode === 'hash' ? './#/verbs' : '/verbs/',
            accept: {
              'application/vnd.musarrif.userdata+json': ['.musarrif'],
            },
          },
        ],
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'icon.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
})
