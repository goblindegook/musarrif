import { useRegisterSW } from 'virtual:pwa-register/preact'
import { styled } from 'goober'
import { Button } from '../atoms/Button'
import { useI18n } from '../hooks/useI18n'

export const PWAUpdatePrompt = () => {
  const { t, dir } = useI18n()
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError: (error) => console.error('Service worker registration failed', error),
  })

  if (!needRefresh) return null

  return (
    <Banner dir={dir} role="status">
      <Message>{t('pwa.updateAvailable')}</Message>
      <Actions>
        <Button size="compact" onClick={() => updateServiceWorker(true)}>
          {t('pwa.reload')}
        </Button>
        <Button size="compact" variant="secondary" onClick={() => setNeedRefresh(false)}>
          {t('aria.close')}
        </Button>
      </Actions>
    </Banner>
  )
}

const Banner = styled('div')`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 250;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  max-width: calc(100% - 2rem);
  padding: 0.85rem 1rem;
  border-radius: 0.75rem;
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-elevated);

  @media print {
    display: none;
  }
`

const Message = styled('p')`
  margin: 0;
  font-size: 0.9rem;
`

const Actions = styled('div')`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`
