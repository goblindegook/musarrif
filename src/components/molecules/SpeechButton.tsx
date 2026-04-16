import { useCallback, useRef, useState } from 'preact/hooks'
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
  const [playing, setPlaying] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const speak = useCallback(() => {
    if (!supported) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.97
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)

    if (timerRef.current) clearTimeout(timerRef.current)
    setPlaying(true)
    timerRef.current = setTimeout(() => setPlaying(false), 1500)
  }, [lang, supported, text])

  return (
    supported && (
      <IconButton
        onClick={speak}
        ariaLabel={ariaLabel ?? `Play pronunciation for ${text}`}
        size={size}
        active={playing}
      >
        <SpeakIcon />
      </IconButton>
    )
  )
}
