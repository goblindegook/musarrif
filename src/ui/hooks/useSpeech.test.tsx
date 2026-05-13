import { act, cleanup, renderHook } from '@testing-library/preact'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { useSpeech } from './useSpeech'

const mockGetSnapshot = vi.fn()
const mockSpeak = vi.fn()
const mockSubscribe = vi.fn()
const mockRefreshStatus = vi.fn().mockResolvedValue(undefined)
const mockInstall = vi.fn().mockResolvedValue(undefined)
const mockRetryInstall = vi.fn().mockResolvedValue(undefined)
const mockRemove = vi.fn().mockResolvedValue(undefined)
const mockSetEngine = vi.fn()

vi.mock('../speech/service', () => ({
  getSnapshot: () => mockGetSnapshot(),
  speak: (request: { text: string; lang: string; speechRate?: number }) => mockSpeak(request),
  subscribe: (listener: (snapshot: unknown) => void) => mockSubscribe(listener),
  refreshStatus: () => mockRefreshStatus(),
  install: () => mockInstall(),
  retryInstall: () => mockRetryInstall(),
  remove: () => mockRemove(),
  setEngine: (pref: 'webSpeech' | 'piper') => mockSetEngine(pref),
}))

beforeEach(() => {
  mockGetSnapshot.mockReset()
  mockSpeak.mockReset()
  mockSubscribe.mockReset()
  mockRefreshStatus.mockClear()
  mockInstall.mockClear()
  mockRetryInstall.mockClear()
  mockRemove.mockClear()
  mockSetEngine.mockClear()

  mockGetSnapshot.mockReturnValue({
    arabicVoiceStatus: 'notInstalled',
    enginePreference: 'piper',
    webSpeechSupported: true,
  })
  mockSubscribe.mockReturnValue(() => undefined)
})

afterEach(() => {
  cleanup()
})

test('exposes support as a flag for the configured language', () => {
  const { result } = renderHook(() => useSpeech('ar'))

  expect(result.current.supported).toBe(true)
  expect((result.current as unknown as { isSupported?: unknown }).isSupported).toBeUndefined()
})

test('uses configured language and speech rate when speaking text', async () => {
  mockSpeak.mockResolvedValue(undefined)

  const { result } = renderHook(() => useSpeech('it', { speechRate: 0.8 }))

  await act(async () => {
    await result.current.speak('ciao')
  })

  expect(mockSpeak).toHaveBeenCalledWith({ text: 'ciao', lang: 'it', speechRate: 0.8 })
})

test('tracks speaking while playback is pending', async () => {
  let resolveSpeak: (() => void) | null = null
  mockSpeak.mockImplementation(
    () =>
      new Promise<void>((resolve) => {
        resolveSpeak = resolve
      }),
  )

  const { result } = renderHook(() => useSpeech('ar'))

  let speakPromise: Promise<void> | null = null
  await act(async () => {
    speakPromise = result.current.speak('كَتَبَ')
  })

  expect(result.current.speaking).toBe(true)

  await act(async () => {
    resolveSpeak?.()
    await speakPromise
  })

  expect(result.current.speaking).toBe(false)
})
