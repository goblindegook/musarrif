import * as Speech from 'expo-speech'
import { arabicSpeechOutput } from './arabic-speech'

jest.mock('expo-speech', () => ({ getAvailableVoicesAsync: jest.fn(), speak: jest.fn(), stop: jest.fn() }))

const speech = jest.mocked(Speech)

afterEach(() => {
  jest.clearAllMocks()
})

describe('Arabic speech output', () => {
  test('keeps only Arabic voices reported by the operating system', async () => {
    speech.getAvailableVoicesAsync.mockResolvedValue([
      { identifier: 'ar-sa', name: 'Arabic Saudi', language: 'ar-SA' },
      { identifier: 'ar-eg', name: 'Arabic Egypt', language: 'AR-eg' },
      { identifier: 'en-us', name: 'English', language: 'en-US' },
    ] as never)

    await expect(arabicSpeechOutput.getArabicVoices()).resolves.toEqual([
      { identifier: 'ar-sa', name: 'Arabic Saudi', language: 'ar-SA' },
      { identifier: 'ar-eg', name: 'Arabic Egypt', language: 'AR-eg' },
    ])
  })

  test('uses the selected system voice and rate and resolves when speech completes', async () => {
    let complete: (() => void) | undefined
    speech.speak.mockImplementation(((_text: string, options: { onDone: () => void }) => {
      complete = options.onDone
    }) as never)
    const spoken = arabicSpeechOutput.speakArabic('مَرْحَبًا', { voiceIdentifier: 'ar-sa', rate: 0.8 })

    expect(speech.speak).toHaveBeenCalledWith(
      'مَرْحَبًا',
      expect.objectContaining({ voice: 'ar-sa', language: 'ar', rate: 0.8 }),
    )
    complete?.()
    await expect(spoken).resolves.toBeUndefined()
  })

  test('stops the current system speech', async () => {
    speech.stop.mockResolvedValue(undefined as never)

    await arabicSpeechOutput.stop()

    expect(speech.stop).toHaveBeenCalledTimes(1)
  })
})
