import { useCallback } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { IconButton } from './IconButton'
import { ShareIcon } from './icons/ShareIcon'

export function ShareButton() {
  const { t } = useI18n()

  const share = useCallback(async () => {
    const shareUrl = window.location.href
    const shareTitle = document.title

    try {
      await navigator.share({
        title: shareTitle,
        url: shareUrl,
      })
    } catch {}
  }, [])

  return (
    window != null &&
    typeof navigator?.share === 'function' && (
      <IconButton onClick={share} ariaLabel={t('aria.share')}>
        <ShareIcon />
      </IconButton>
    )
  )
}
