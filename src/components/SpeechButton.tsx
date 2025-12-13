import { useCallback, useMemo } from 'preact/hooks'
import { IconButton } from './IconButton'

interface SpeechButtonProps {
  text: string
  lang: string
  ariaLabel?: string
}

export function SpeechButton({ text, lang, ariaLabel }: SpeechButtonProps) {
  const supported = useSpeechSupport(lang)

  const speak = useCallback(
    (text: string) => {
      if (!supported) return

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.97
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    },
    [lang, supported],
  )

  return (
    supported && (
      <IconButton onClick={() => speak(text)} ariaLabel={ariaLabel ?? `Play pronunciation for ${text}`}>
        🔊
      </IconButton>
    )
  )
}

export function useSpeechSupport(lang: string): boolean {
  return useMemo(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
    [lang],
  )
}
