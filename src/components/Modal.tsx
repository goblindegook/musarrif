import { styled } from 'goober'
import type { ComponentChildren } from 'preact'
import { useEffect, useId } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { IconButton } from './IconButton'
import { CloseIcon } from './icons/CloseIcon'

interface ModalProps {
  readonly isOpen: boolean
  readonly title: string
  readonly onClose: () => void
  readonly children: ComponentChildren
}

export const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
  const titleId = useId()
  const { t } = useI18n()
  const closeLabel = t('modal.close')

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <Overlay data-testid="modal-overlay" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <Dialog role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={(event) => event.stopPropagation()}>
        <Header>
          <ModalTitle id={titleId}>{title}</ModalTitle>
          <IconButton onClick={onClose} ariaLabel={closeLabel} title={closeLabel}>
            <CloseIcon />
          </IconButton>
        </Header>
        <Content>{children}</Content>
      </Dialog>
    </Overlay>
  )
}

const Overlay = styled('div')`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  overflow-y: auto;
  z-index: 10;
`

const Dialog = styled('div')`
  background: #ffffff;
  border-radius: 1.25rem;
  padding: 1.5rem;
  max-width: 520px;
  width: min(100%, 520px);
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.2);
  border: 1px solid #e2e8f0;
`

const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
`

const ModalTitle = styled('h2')`
  margin: 0;
  font-weight: 700;
  font-size: 1.5rem;
  color: #0f172a;
`

const Content = styled('div')`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`
