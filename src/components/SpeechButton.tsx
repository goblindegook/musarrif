import { styled } from 'goober'
import { useCallback, useMemo } from 'preact/hooks'

interface SpeechButtonProps {
  text: string
  lang: string
  ariaLabel?: string
  className?: string
}

export function SpeechButton({ text, lang, ariaLabel, className }: SpeechButtonProps) {
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
      <StyledSpeechButton
        type="button"
        className={className}
        onClick={() => speak(text)}
        aria-label={ariaLabel ?? `Play pronunciation for ${text}`}
      >
        🔊
      </StyledSpeechButton>
    )
  )
}

export function useSpeechSupport(lang: string): boolean {
  return useMemo(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
    [lang],
  )
}

const StyledSpeechButton = styled('button')`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: #fff;
  font-size: 1rem;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease;

  &:hover {
    background: #fff8e1;
    border-color: #facc15;
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.14);
  }
`
