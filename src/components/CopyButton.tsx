import { useCallback, useMemo } from 'preact/hooks'
import { IconButton } from './IconButton'
import { CopyIcon } from './icons/CopyIcon'

interface CopyButtonProps {
  text: string
  ariaLabel?: string
}

export function CopyButton({ text, ariaLabel }: CopyButtonProps) {
  const supported = useClipboardSupport()

  const copy = useCallback(async () => {
    if (!supported) return

    try {
      await navigator.clipboard.writeText(text)
    } catch {}
  }, [supported, text])

  return (
    supported && (
      <IconButton onClick={copy} ariaLabel={ariaLabel ?? `Copy ${text}`}>
        <CopyIcon />
      </IconButton>
    )
  )
}

export function useClipboardSupport(): boolean {
  return useMemo(() => typeof navigator !== 'undefined' && typeof navigator?.clipboard?.writeText === 'function', [])
}
