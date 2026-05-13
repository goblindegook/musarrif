import { PIPER_ARABIC_ASSET_PATHS } from './config'

export interface PiperTTSCache {
  isInstalled: () => Promise<boolean>
  install: () => Promise<void>
  remove: () => Promise<void>
}

function toAbsoluteAssetUrl(pathname: string): string {
  return new URL(pathname, window.location.origin).toString()
}

async function hasAllAssets(cache: Cache): Promise<boolean> {
  const results = await Promise.all(PIPER_ARABIC_ASSET_PATHS.map((path) => cache.match(toAbsoluteAssetUrl(path))))
  return results.every(Boolean)
}

export function createPiperTTSCache(cacheKey: string): PiperTTSCache {
  return {
    async isInstalled() {
      if (typeof window.caches?.open !== 'function') return false
      const cache = await window.caches.open(cacheKey)
      return hasAllAssets(cache)
    },
    async install() {
      if (typeof window.caches?.open !== 'function') throw new Error('CacheStorage is not available')
      const cache = await window.caches.open(cacheKey)

      try {
        for (const path of PIPER_ARABIC_ASSET_PATHS) {
          const url = toAbsoluteAssetUrl(path)
          const response = await fetch(url, { cache: 'no-store' })
          if (!response.ok) throw new Error(`Failed to fetch ${path}`)
          await cache.put(url, response.clone())
        }
      } catch (error) {
        await window.caches.delete(cacheKey)
        throw error
      }
    },
    async remove() {
      if (typeof window.caches?.delete !== 'function') return
      await window.caches.delete(cacheKey)
    },
  }
}
