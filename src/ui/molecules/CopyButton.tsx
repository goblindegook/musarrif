import { useCallback, useState } from 'preact/hooks'
import { IconButton, type IconButtonSize } from '../atoms/IconButton'
import { CheckIcon } from '../icons/CheckIcon'
import { CopyIcon } from '../icons/CopyIcon'

interface CopyButtonProps {
  text: string
  ariaLabel?: string
  size?: IconButtonSize
}

export function CopyButton({ text, ariaLabel, size }: CopyButtonProps) {
  const supported = typeof navigator?.clipboard?.writeText === 'function'
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }, [supported, text])

  return (
    supported && (
      <IconButton onClick={copy} aria-label={ariaLabel ?? `Copy ${text}`} size={size} active={copied}>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </IconButton>
    )
  )
}
