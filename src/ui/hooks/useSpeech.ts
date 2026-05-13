import { useCallback, useState } from 'preact/hooks'

export interface SpeechOptions {
  rate?: number
}

export interface Speech {
  speak(text: string): Promise<void>
  playing: boolean
  supported: boolean
}

export function useSpeech(lang: string, options: SpeechOptions = {}): Speech {
  const [playing, setPlaying] = useState(false)
  const [engine] = useState(webSpeechEngine())

  const speak = useCallback(
    async (text: string) => {
      setPlaying(true)
      await engine.speak(text, lang, options)
      setPlaying(false)
    },
    [lang],
  )

  return { speak, playing, supported: engine.supported }
}

interface Engine {
  speak(text: string, lang: string, options?: SpeechOptions): Promise<void>
  supported: boolean
}

function webSpeechEngine(): Engine {
  const supported = Boolean(window?.speechSynthesis && window?.SpeechSynthesisUtterance)

  return {
    speak: (text: string, lang: string, options: SpeechOptions = {}) => {
      return new Promise<void>((resolve) => {
        if (!supported) resolve()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = lang
        utterance.rate = options.rate ?? 1
        utterance.onend = () => resolve()

        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(utterance)
      })
    },
    supported,
  }
}
