import { useCallback, useEffect, useState } from 'preact/hooks'
import { useLocalStorage } from './useLocalStorage'

export interface SpeechOptions {
  rate?: number
}

export interface Speech {
  speak(text: string): Promise<void>
  playing: boolean
  supported: boolean
  voices: SpeechSynthesisVoice[]
  voiceName: string | null
  setVoiceName: (name: string) => void
}

export function useSpeech(lang: string, options: SpeechOptions = {}): Speech {
  const [playing, setPlaying] = useState(false)
  const [engine] = useState(webSpeechEngine())

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(() => (engine.supported ? voicesForLang(lang) : []))
  const [storedVoiceName, setStoredVoiceName, refetchVoiceName] = useLocalStorage<string | null>(
    'arabicVoiceName',
    null,
  )

  useEffect(() => {
    if (!engine.supported) return
    const load = () => {
      setVoices(voicesForLang(lang))
    }
    window.speechSynthesis.addEventListener('voiceschanged', load)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', load)
    }
  }, [lang, engine.supported])

  useEffect(() => {
    if (storedVoiceName === null && voices.length > 0) {
      setStoredVoiceName(voices[0].name)
    }
  }, [storedVoiceName, voices, setStoredVoiceName])

  const voiceName = storedVoiceName ?? voices[0]?.name ?? null

  const setVoiceName = useCallback(
    (name: string) => {
      setStoredVoiceName(name)
    },
    [setStoredVoiceName],
  )

  const speak = useCallback(
    async (text: string) => {
      setPlaying(true)
      try {
        const currentName = refetchVoiceName() ?? voices[0]?.name
        const voice = voices.find((v) => v.name === currentName)
        await engine.speak(text, lang, { ...options, voice })
      } finally {
        setPlaying(false)
      }
    },
    [engine, lang, options, voices, refetchVoiceName],
  )

  return {
    speak,
    playing,
    supported: engine.supported,
    voices,
    voiceName,
    setVoiceName,
  }
}

interface EngineOptions extends SpeechOptions {
  voice?: SpeechSynthesisVoice | null
}

interface Engine {
  speak(text: string, lang: string, options?: EngineOptions): Promise<void>
  supported: boolean
}

function voicesForLang(lang: string): SpeechSynthesisVoice[] {
  return window?.speechSynthesis?.getVoices?.().filter((v) => v.lang.startsWith(lang)) ?? []
}

function webSpeechEngine(): Engine {
  const supported = Boolean(window?.speechSynthesis && window?.SpeechSynthesisUtterance)

  return {
    speak: (text: string, lang: string, options: EngineOptions = {}) => {
      return new Promise<void>((resolve) => {
        if (!supported) return resolve()

        let settled = false
        const finish = () => {
          if (settled) return
          settled = true
          resolve()
        }

        try {
          const utterance = new SpeechSynthesisUtterance(text)
          utterance.lang = lang
          utterance.rate = options.rate ?? 1
          if (options.voice != null) utterance.voice = options.voice
          utterance.onend = finish
          utterance.onerror = finish

          window.speechSynthesis.cancel()
          window.speechSynthesis.speak(utterance)
        } catch {
          finish()
        }
      })
    },
    supported,
  }
}
