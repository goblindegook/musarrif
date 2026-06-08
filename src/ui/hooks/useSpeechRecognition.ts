import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

export type SpeechRecognitionState = 'idle' | 'listening' | 'result' | 'error'

export interface SpeechRecognitionHook {
  supported: boolean
  state: SpeechRecognitionState
  transcript: string
  errorCode: string | null
  start: () => void
  reset: () => void
}

function getSpeechRecognitionClass(): typeof SpeechRecognition | null {
  if (typeof window.SpeechRecognition === 'function') return window.SpeechRecognition
  if (typeof window.webkitSpeechRecognition === 'function') return window.webkitSpeechRecognition
  return null
}

export function useSpeechRecognition(lang: string): SpeechRecognitionHook {
  const [state, setState] = useState<SpeechRecognitionState>('idle')
  const [transcript, setTranscript] = useState('')
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [supported, setSupported] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    const SpeechRecognitionClass = getSpeechRecognitionClass()
    if (!SpeechRecognitionClass) {
      setSupported(false)
      return
    }
    const available = SpeechRecognitionClass.available?.({ langs: [lang], processLocally: true })
    if (available) {
      available.then((result) => setSupported(result === 'available'))
    } else {
      setSupported(true)
    }
  }, [lang])

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null
        recognitionRef.current.onerror = null
        recognitionRef.current.onend = null
        recognitionRef.current.abort()
      }
    }
  }, [])

  const reset = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = null
      recognitionRef.current.onerror = null
      recognitionRef.current.onend = null
      recognitionRef.current.abort()
      recognitionRef.current = null
    }
    setState('idle')
    setTranscript('')
    setErrorCode(null)
  }, [])

  const start = useCallback(() => {
    const SpeechRecognitionClass = getSpeechRecognitionClass()
    if (!SpeechRecognitionClass) return

    recognitionRef.current?.abort()

    const recognition = new SpeechRecognitionClass()
    recognition.lang = lang
    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.processLocally = true

    const hasSettledRef = { current: false }

    recognition.onresult = (event) => {
      hasSettledRef.current = true
      setTranscript(event.results[0][0].transcript)
      setState('result')
    }

    recognition.onerror = (event) => {
      hasSettledRef.current = true
      setErrorCode(event.error)
      setState('error')
    }

    recognition.onend = () => {
      if (!hasSettledRef.current) {
        setErrorCode('no-speech')
        setState('error')
      }
    }

    recognitionRef.current = recognition
    setState('listening')
    recognition.start()
  }, [lang])

  return { supported, state, transcript, errorCode, start, reset }
}
