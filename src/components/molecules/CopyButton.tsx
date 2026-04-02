import { useCallback } from 'preact/hooks'
import { IconButton } from '../atoms/IconButton'
import { CopyIcon } from '../icons/CopyIcon'

interface CopyButtonProps {
  text: string
  ariaLabel?: string
  size?: 'sm' | 'md'
}

export function CopyButton({ text, ariaLabel, size }: CopyButtonProps) {
  const supported = typeof navigator?.clipboard?.writeText === 'function'

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {}
  }, [supported, text])

  return (
    supported && (
      <IconButton onClick={copy} ariaLabel={ariaLabel ?? `Copy ${text}`} size={size}>
        <CopyIcon />
      </IconButton>
    )
  )
}
