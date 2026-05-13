import { useCallback } from 'preact/hooks'
import { IconButton } from '../atoms/IconButton'
import { useSpeech } from '../hooks/useSpeech'
import { SpeakIcon } from '../icons/SpeakIcon'

interface SpeechButtonProps {
  text: string
  lang: string
  speechRate?: number
  ariaLabel?: string
  size?: 'sm' | 'md'
}

export function SpeechButton({ text, lang, speechRate, ariaLabel, size }: SpeechButtonProps) {
  const { supported, speak, speaking } = useSpeech(lang, { speechRate: speechRate ?? 0.65 })

  const handleSpeak = useCallback(() => {
    if (!supported) return
    void speak(text)
  }, [speak, supported, text])

  return (
    supported && (
      <IconButton
        onClick={handleSpeak}
        aria-label={ariaLabel ?? `Play pronunciation for ${text}`}
        size={size}
        active={speaking}
      >
        <SpeakIcon />
      </IconButton>
    )
  )
}
