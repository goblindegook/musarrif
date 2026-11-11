import { useCallback, useEffect, useState } from 'preact/hooks'
import { useLocalStorage } from './useLocalStorage'

export interface SpeechOptions {
  rate?: number
}

export interface Speech {
  speak(text: string): Promise<void>
  playing: boolean
  supported: boolean
  voices: { id: string; name: string; index?: number }[]
  voiceId: string
  setVoiceId: (id: string) => void
}

export function useSpeech(lang: string, options: SpeechOptions = {}): Speech {
  const [playing, setPlaying] = useState(false)
  const [engine] = useState(webSpeechEngine())

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(() => (engine.supported ? voicesForLang(lang) : []))
  const [storedVoiceId, setStoredVoiceId, refetchVoiceId] = useLocalStorage<string | null>('arabicVoiceName', null)

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

  const selectedVoice =
    voices.find((voice) => voice.voiceURI === storedVoiceId) ??
    voices.find((voice) => voice.name === storedVoiceId) ??
    (storedVoiceId == null ? voices[0] : undefined)
  const selectedVoiceId = selectedVoice?.voiceURI || selectedVoice?.name

  useEffect(() => {
    // Preserve existing name-based preferences while storing a unique identifier for future selections.
    if (selectedVoiceId != null && selectedVoiceId !== storedVoiceId) setStoredVoiceId(selectedVoiceId)
  }, [storedVoiceId, selectedVoiceId, setStoredVoiceId])

  const setVoiceId = useCallback(
    (id: string) => {
      const voice = voices[Number(id)]
      if (voice != null) setStoredVoiceId(voice.voiceURI || voice.name)
    },
    [voices, setStoredVoiceId],
  )

  const speak = useCallback(
    async (text: string) => {
      setPlaying(true)
      try {
        const currentId = refetchVoiceId()
        const voice =
          voices.find((voice) => voice.voiceURI === currentId) ??
          voices.find((voice) => voice.name === currentId) ??
          (currentId == null ? voices[0] : undefined)
        await engine.speak(text, lang, { ...options, voice })
      } finally {
        setPlaying(false)
      }
    },
    [engine, lang, options, voices, refetchVoiceId],
  )

  return {
    speak,
    playing,
    supported: engine.supported,
    voices: voices.map((voice, index) =>
      voices.filter((candidate) => candidate.name === voice.name).length > 1
        ? { id: String(index), name: voice.name, index }
        : { id: String(index), name: voice.name },
    ),
    voiceId: String(selectedVoice == null ? -1 : voices.indexOf(selectedVoice)),
    setVoiceId,
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
