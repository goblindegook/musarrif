import { useCallback } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { IconButton } from './IconButton'
import { ShareIcon } from './icons/ShareIcon'

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
      <IconButton onClick={share} ariaLabel={t('aria.share')}>
        <ShareIcon />
      </IconButton>
    )
  )
}
