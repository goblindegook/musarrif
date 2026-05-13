import preact from '@preact/preset-vite'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const piperExpressionsStub: Plugin = {
  name: 'piper-expressions-stub',
  resolveId(id, importer) {
    if (importer?.includes('piper-wasm') && id === './expressions.js') {
      return '\0piper-expressions-stub'
    }
  },
  load(id) {
    if (id === '\0piper-expressions-stub') {
      return `export class Expressions {
  faceExpressions = null
  constructor(_opts) {}
  static inferEmotionsFromText() { return Promise.resolve(null) }
}`
    }
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    piperExpressionsStub,
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
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
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf,onnx,json,wasm,data}'],
        globIgnores: ['**/piper_phonemize.data', '**/voices/**'],
      },
      manifest: {
        name: 'Muṣarrif',
        short_name: 'Muṣarrif',
        description: 'Arabic verb conjugator',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#f5f4ee',
        theme_color: '#f5f4ee',
        lang: 'en',
        dir: 'ltr',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'icon.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
})
