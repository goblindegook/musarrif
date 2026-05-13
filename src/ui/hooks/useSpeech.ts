import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks'
import {
  getSnapshot,
  install,
  refreshStatus,
  remove,
  retryInstall,
  type SpeechSnapshot,
  setEngine,
  speak,
  subscribe,
} from '../speech/service'

interface UseSpeechOption {
  speechRate?: number
}

export function useSpeech(lang: string, options: UseSpeechOption = {}) {
  const [snapshot, setSnapshot] = useState<SpeechSnapshot>(() => getSnapshot())
  const [speaking, setSpeaking] = useState(false)
  const runIdRef = useRef(0)
  const speechRate = options.speechRate ?? 1

  const supported = useMemo(() => {
    if (lang === 'ar') return snapshot.webSpeechSupported || snapshot.piperTTSStatus === 'installed'
    return snapshot.webSpeechSupported
  }, [lang, snapshot.piperTTSStatus, snapshot.webSpeechSupported])

  useEffect(() => {
    const unsubscribe = subscribe((next) => setSnapshot(next))
    void refreshStatus()
    return unsubscribe
  }, [])

  const doSpeak = useCallback(
    async (text: string) => {
      if (!supported) return
      runIdRef.current += 1
      const currentRunId = runIdRef.current
      setSpeaking(true)
      try {
        await speak({ text, lang, speechRate })
      } finally {
        if (runIdRef.current === currentRunId) setSpeaking(false)
      }
    },
    [lang, speechRate, supported],
  )

  return {
    ...snapshot,
    supported,
    speaking,
    speak: doSpeak,
    refreshStatus,
    install,
    retryInstall,
    remove,
    setEngine,
  }
}
