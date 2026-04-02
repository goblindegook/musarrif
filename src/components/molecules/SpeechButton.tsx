import { useCallback } from 'preact/hooks'
import { IconButton } from '../atoms/IconButton'
import { SpeakIcon } from '../icons/SpeakIcon'

interface SpeechButtonProps {
  text: string
  lang: string
  ariaLabel?: string
  size?: 'sm' | 'md'
}

export function SpeechButton({ text, lang, ariaLabel, size }: SpeechButtonProps) {
  const supported = window?.speechSynthesis && window?.SpeechSynthesisUtterance

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
      <IconButton onClick={() => speak(text)} ariaLabel={ariaLabel ?? `Play pronunciation for ${text}`} size={size}>
        <SpeakIcon />
      </IconButton>
    )
  )
}
