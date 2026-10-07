import * as Speech from 'expo-speech'

export type ArabicSystemVoice = {
  identifier: string
  name: string
  language: string
}

type ArabicSpeechOptions = {
  voiceIdentifier?: string
  rate: number
}

export interface ArabicSpeechOutput {
  getArabicVoices: () => Promise<ArabicSystemVoice[]>
  speakArabic: (text: string, options: ArabicSpeechOptions) => Promise<void>
  stop: () => Promise<void>
}

type ExpoSpeechApi = Pick<typeof Speech, 'getAvailableVoicesAsync' | 'speak' | 'stop'>

function createArabicSpeechOutput(api: ExpoSpeechApi = Speech): ArabicSpeechOutput {
  return {
    async getArabicVoices() {
      const voices = await api.getAvailableVoicesAsync()
      return voices
        .filter((voice) => /^ar(?:[-_]|$)/iu.test(voice.language))
        .map(({ identifier, name, language }) => ({ identifier, name, language }))
    },
    speakArabic(text, { voiceIdentifier, rate }) {
      return new Promise<void>((resolve, reject) => {
        api.speak(text, {
          language: 'ar',
          ...(voiceIdentifier ? { voice: voiceIdentifier } : {}),
          rate,
          onDone: resolve,
          onStopped: resolve,
          onError: reject,
        })
      })
    },
    stop: () => api.stop(),
  }
}

export const arabicSpeechOutput = createArabicSpeechOutput()
