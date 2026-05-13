import { IconButton } from '../atoms/IconButton'
import { useSpeech } from '../hooks/useSpeech'
import { SpeakIcon } from '../icons/SpeakIcon'

interface SpeechButtonProps {
  text: string
  lang: string
  ariaLabel?: string
  size?: 'sm' | 'md'
}

export function SpeechButton({ text, lang, ariaLabel, size }: SpeechButtonProps) {
  const { speak, playing, supported } = useSpeech(lang, { rate: 0.97 })

  return (
    supported && (
      <IconButton
        onClick={() => void speak(text)}
        aria-label={ariaLabel ?? `Play pronunciation for ${text}`}
        size={size}
        active={playing}
      >
        <SpeakIcon />
      </IconButton>
    )
  )
}
