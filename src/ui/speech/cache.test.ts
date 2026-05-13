import { afterEach, describe, expect, test, vi } from 'vitest'
import { createPiperTTSCache } from './cache'
import { PIPER_ARABIC_ASSET_PATHS } from './config'

function toAbsoluteUrl(pathname: string) {
  return new URL(pathname, window.location.origin).toString()
}

function createMockCacheStorage() {
  const stores = new Map<string, Map<string, Response>>()

  const openCache = (name: string) => {
    if (!stores.has(name)) stores.set(name, new Map())
    const store = stores.get(name)!
    return Promise.resolve({
      match: (key: string) => Promise.resolve(store.get(key)),
      put: (key: string, response: Response) => {
        store.set(key, response)
        return Promise.resolve()
      },
    })
  }

  return {
    open: vi.fn().mockImplementation(openCache),
    delete: vi.fn().mockImplementation((name: string) => {
      stores.delete(name)
      return Promise.resolve(true)
    }),
  }
}

describe('createArabicVoiceCache', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  test('reports voice as not installed when CacheStorage is unavailable', async () => {
    vi.stubGlobal('caches', undefined)
    const cache = createPiperTTSCache('cache_key')

    expect(await cache.isInstalled()).toBe(false)
  })

  test('reports voice as not installed when cache is empty', async () => {
    vi.stubGlobal('caches', createMockCacheStorage())
    const cache = createPiperTTSCache('cache_key')

    expect(await cache.isInstalled()).toBe(false)
  })

  test('reports voice as not installed when only some assets are cached', async () => {
    const mockStorage = createMockCacheStorage()
    vi.stubGlobal('caches', mockStorage)

    const cacheStore = await mockStorage.open('cache_key')
    await cacheStore.put(toAbsoluteUrl(PIPER_ARABIC_ASSET_PATHS[0]), new Response('data'))
    await cacheStore.put(toAbsoluteUrl(PIPER_ARABIC_ASSET_PATHS[1]), new Response('data'))

    const cache = createPiperTTSCache('cache_key')

    expect(await cache.isInstalled()).toBe(false)
  })

  test('reports voice as installed when all assets are cached', async () => {
    const mockStorage = createMockCacheStorage()
    vi.stubGlobal('caches', mockStorage)

    const cacheStore = await mockStorage.open('cache_key')
    for (const path of PIPER_ARABIC_ASSET_PATHS) {
      await cacheStore.put(toAbsoluteUrl(path), new Response('data'))
    }

    const cache = createPiperTTSCache('cache_key')

    expect(await cache.isInstalled()).toBe(true)
  })

  test('throws when installing voice and CacheStorage is unavailable', async () => {
    vi.stubGlobal('caches', undefined)
    const cache = createPiperTTSCache('cache_key')

    await expect(cache.install()).rejects.toThrow('CacheStorage is not available')
  })

  test('fetches all assets and stores them on install', async () => {
    const mockStorage = createMockCacheStorage()
    vi.stubGlobal('caches', mockStorage)
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('data', { status: 200 })))

    const cache = createPiperTTSCache('cache_key')
    await cache.install()

    expect(fetch).toHaveBeenCalledTimes(PIPER_ARABIC_ASSET_PATHS.length)
    expect(await cache.isInstalled()).toBe(true)
  })

  test('clears cache and throws when a fetch fails during install', async () => {
    const mockStorage = createMockCacheStorage()
    vi.stubGlobal('caches', mockStorage)
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(new Response('data', { status: 200 }))
        .mockResolvedValueOnce(new Response('not found', { status: 404 })),
    )

    const cache = createPiperTTSCache('cache_key')

    await expect(cache.install()).rejects.toThrow()
    expect(mockStorage.delete).toHaveBeenCalledWith('cache_key')
    expect(await cache.isInstalled()).toBe(false)
  })

  test('removes the voice cache on removeArabicVoice', async () => {
    const mockStorage = createMockCacheStorage()
    vi.stubGlobal('caches', mockStorage)
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('data', { status: 200 })))

    const cache = createPiperTTSCache('cache_key')
    await cache.install()
    await cache.remove()

    expect(mockStorage.delete).toHaveBeenCalledWith('cache_key')
    expect(await cache.isInstalled()).toBe(false)
  })
})
