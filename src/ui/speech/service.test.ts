import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createSpeechOrchestrator } from './service'

describe('createSpeechOrchestrator', () => {
  beforeEach(() => {
    vi.useRealTimers()
  })

  function cacheMock(installed: boolean) {
    return {
      isInstalled: vi.fn().mockResolvedValue(installed),
      install: vi.fn().mockResolvedValue(undefined),
      remove: vi.fn().mockResolvedValue(undefined),
    }
  }

  test('routes non-Arabic speech to Web Speech only', async () => {
    const webSpeechSpeak = vi.fn().mockResolvedValue(undefined)
    const piperSpeak = vi.fn().mockResolvedValue(undefined)

    const orchestrator = createSpeechOrchestrator({
      piper: { speak: piperSpeak, cancel: vi.fn() },
      webSpeech: { supported: true, speak: webSpeechSpeak, cancel: vi.fn() },
      cache: cacheMock(true),
      now: () => 1000,
    })

    await orchestrator.speak({ text: 'ciao', lang: 'it' })

    expect(webSpeechSpeak).toHaveBeenCalledWith({ text: 'ciao', lang: 'it', rate: 1 })
    expect(piperSpeak).not.toHaveBeenCalled()
  })

  test('uses Web Speech for Arabic when voice is not installed', async () => {
    const webSpeechSpeak = vi.fn().mockResolvedValue(undefined)
    const piperSpeak = vi.fn().mockResolvedValue(undefined)

    const orchestrator = createSpeechOrchestrator({
      piper: { speak: piperSpeak, cancel: vi.fn() },
      webSpeech: { supported: true, speak: webSpeechSpeak, cancel: vi.fn() },
      cache: cacheMock(false),
      now: () => 1000,
    })

    await orchestrator.speak({ text: 'كَتَبَ', lang: 'ar' })

    expect(webSpeechSpeak).toHaveBeenCalledWith({ text: 'كَتَبَ', lang: 'ar', rate: 1 })
    expect(piperSpeak).not.toHaveBeenCalled()
  })

  test('routes Arabic speech to Piper when installed', async () => {
    const webSpeechSpeak = vi.fn().mockResolvedValue(undefined)
    const piperSpeak = vi.fn().mockResolvedValue(undefined)

    const orchestrator = createSpeechOrchestrator({
      piper: { speak: piperSpeak, cancel: vi.fn() },
      webSpeech: { supported: true, speak: webSpeechSpeak, cancel: vi.fn() },
      cache: cacheMock(true),
      now: () => 1000,
    })

    await orchestrator.speak({ text: 'كَتَبَ', lang: 'ar' })

    expect(piperSpeak).toHaveBeenCalledWith({ text: 'كَتَبَ', timeoutMs: 4000, rate: 1 })
    expect(webSpeechSpeak).not.toHaveBeenCalled()
  })

  test('falls back to Web Speech when Piper errors and then backs off', async () => {
    const webSpeechSpeak = vi.fn().mockResolvedValue(undefined)
    const piperSpeak = vi.fn().mockRejectedValueOnce(new Error('boom')).mockResolvedValueOnce(undefined)

    let nowMs = 1000
    const orchestrator = createSpeechOrchestrator({
      piper: { speak: piperSpeak, cancel: vi.fn() },
      webSpeech: { supported: true, speak: webSpeechSpeak, cancel: vi.fn() },
      cache: cacheMock(true),
      now: () => nowMs,
      piperBackoffMs: 5000,
    })

    await orchestrator.speak({ text: 'كَتَبَ', lang: 'ar' })
    await orchestrator.speak({ text: 'دَخَلَ', lang: 'ar' })
    nowMs = 7000
    await orchestrator.speak({ text: 'قَرَأَ', lang: 'ar' })

    expect(webSpeechSpeak).toHaveBeenNthCalledWith(1, { text: 'كَتَبَ', lang: 'ar', rate: 1 })
    expect(webSpeechSpeak).toHaveBeenNthCalledWith(2, { text: 'دَخَلَ', lang: 'ar', rate: 1 })
    expect(piperSpeak).toHaveBeenCalledTimes(2)
    expect(piperSpeak).toHaveBeenNthCalledWith(1, { text: 'كَتَبَ', timeoutMs: 4000, rate: 1 })
    expect(piperSpeak).toHaveBeenNthCalledWith(2, { text: 'قَرَأَ', timeoutMs: 4000, rate: 1 })
  })

  test('falls back to Web Speech when Piper times out', async () => {
    const webSpeechSpeak = vi.fn().mockResolvedValue(undefined)
    const piperSpeak = vi.fn().mockRejectedValue(new Error('Piper synthesis timed out'))

    const orchestrator = createSpeechOrchestrator({
      piper: { speak: piperSpeak, cancel: vi.fn() },
      webSpeech: { supported: true, speak: webSpeechSpeak, cancel: vi.fn() },
      cache: cacheMock(true),
      now: () => Date.now(),
      piperTimeoutMs: 20,
    })

    await orchestrator.speak({ text: 'كَتَبَ', lang: 'ar' })

    expect(piperSpeak).toHaveBeenCalledWith({ text: 'كَتَبَ', timeoutMs: 20, rate: 1 })
    expect(webSpeechSpeak).toHaveBeenCalledWith({ text: 'كَتَبَ', lang: 'ar', rate: 1 })
  })

  test('tracks install and remove status through snapshots', async () => {
    const cache = cacheMock(false)
    const orchestrator = createSpeechOrchestrator({
      piper: { speak: vi.fn().mockResolvedValue(undefined), cancel: vi.fn() },
      webSpeech: { supported: true, speak: vi.fn().mockResolvedValue(undefined), cancel: vi.fn() },
      cache,
      now: () => 1000,
    })

    await orchestrator.refreshStatus()
    expect(orchestrator.getSnapshot().piperTTSStatus).toBe('notInstalled')

    await orchestrator.install()
    expect(orchestrator.getSnapshot().piperTTSStatus).toBe('installed')

    cache.isInstalled.mockResolvedValueOnce(false)
    await orchestrator.remove()
    expect(orchestrator.getSnapshot().piperTTSStatus).toBe('notInstalled')
  })
})
