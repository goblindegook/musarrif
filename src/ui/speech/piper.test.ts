import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { createPiperSpeaker, type PiperSpeaker } from './piper'

vi.mock('piper-wasm', () => ({
  piperGenerate: vi.fn(),
}))

import { piperGenerate } from 'piper-wasm'

const mockPiperGenerate = vi.mocked(piperGenerate)

function createMockCaches() {
  const mockBlob = new Blob(['data'])
  const mockResponseEntry = () => Promise.resolve({ blob: () => Promise.resolve(mockBlob) } as unknown as Response)

  return {
    open: vi.fn().mockResolvedValue({
      match: vi.fn().mockImplementation(() => mockResponseEntry()),
    }),
  }
}

function makeAudioMock() {
  let endCallback: (() => void) | null = null
  const pause = vi.fn()

  const play = vi.fn().mockImplementation(() => {
    queueMicrotask(() => endCallback?.())
    return Promise.resolve()
  })

  const instance = {
    play,
    pause,
    set onended(cb: () => void) {
      endCallback = cb
    },
    set onerror(_cb: () => void) {},
  } as unknown as HTMLAudioElement

  return { instance, play, pause }
}

describe('createPiperSpeaker', () => {
  let piper: PiperSpeaker

  beforeEach(() => {
    vi.stubGlobal('caches', createMockCaches())
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url')
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
    piper = createPiperSpeaker()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  test('rejects with timeout error when piperGenerate does not resolve in time', async () => {
    mockPiperGenerate.mockReturnValue(new Promise(() => {}))

    await expect(piper.speak({ text: 'كَتَبَ', timeoutMs: 20, rate: 1 })).rejects.toThrow('Piper synthesis timed out')
  }, 1000)

  test('discards result and revokes audio blob URL when cancelled mid-synthesis', async () => {
    let resolveSynthesis!: (value: { file: string }) => void
    const synthesisPromise = new Promise<{ file: string }>((resolve) => {
      resolveSynthesis = resolve
    })
    mockPiperGenerate.mockReturnValue(synthesisPromise)

    const speaking = piper.speak({ text: 'كَتَبَ', timeoutMs: 5000, rate: 1 })
    // yield to let loadAssetObjectUrls() complete and piperGenerate be called
    await new Promise((resolve) => setTimeout(resolve, 0))
    piper.cancel()
    resolveSynthesis({ file: 'blob:audio-cancelled' })

    await expect(speaking).resolves.toBeUndefined()
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:audio-cancelled')
  })

  test('plays audio and resolves when synthesis succeeds', async () => {
    const { instance, play } = makeAudioMock()
    piper = createPiperSpeaker(() => instance)
    mockPiperGenerate.mockResolvedValue({ file: 'blob:audio-ok' })

    await piper.speak({ text: 'كَتَبَ', timeoutMs: 5000, rate: 1 })

    expect(play).toHaveBeenCalled()
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:audio-ok')
  })
})
