import { useCallback } from 'preact/hooks'
import { IconButton } from '../atoms/IconButton'
import { useI18n } from '../hooks/useI18n'
import { ShareIcon } from '../icons/ShareIcon'

export function ShareButton() {
  const supported = typeof navigator?.share === 'function'
  const { t } = useI18n()

  const share = useCallback(async () => {
    try {
      await navigator.share({ title: document.title, url: window.location.href })
    } catch {}
  }, [])

  return (
    supported && (
      <IconButton onClick={share} aria-label={t('aria.share')}>
        <ShareIcon />
      </IconButton>
    )
  )
}
