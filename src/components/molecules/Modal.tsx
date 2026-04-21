import { styled } from 'goober'
import type { ComponentChildren } from 'preact'
import { useEffect, useId } from 'preact/hooks'
import { useI18n } from '../../hooks/i18n'
import { IconButton } from '../atoms/IconButton'
import { CloseIcon } from '../icons/CloseIcon'

interface ModalProps {
  readonly dir?: 'auto' | 'rtl' | 'ltr'
  readonly isOpen: boolean
  readonly title: string
  readonly onClose: () => void
  readonly children: ComponentChildren
}

export const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
  const { t, dir } = useI18n()
  const dialogId = useId()
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) return
    const dialog = document.getElementById(dialogId)
    if (!(dialog instanceof HTMLDialogElement) || dialog.open) return
    dialog.showModal()
  }, [dialogId, isOpen])

  if (!isOpen) return null

  return (
    <Dialog
      id={dialogId}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      dir={dir}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return
        if (isBackdropClick(event.currentTarget, event.clientX, event.clientY)) onClose()
      }}
    >
      <Header>
        <ModalTitle id={titleId}>{title}</ModalTitle>
        <IconButton onClick={onClose} aria-label={t('modal.close')} title={t('modal.close')}>
          <CloseIcon />
        </IconButton>
      </Header>
      <Content>{children}</Content>
    </Dialog>
  )
}

const Dialog = styled('dialog')`
  position: fixed;
  z-index: 200;
  margin: auto;
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border-radius: 1.25rem;
  padding: 1.5rem;
  max-width: 520px;
  width: min(100%, 520px);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  box-shadow: var(--shadow-elevated);
  border: 1px solid var(--color-border);

  &::backdrop {
    background: var(--color-overlay);
    backdrop-filter: blur(2px);
    animation: fadeIn 0.2s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
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
  color: var(--color-text-primary);
`

const Content = styled('div')`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

function isBackdropClick(dialog: HTMLDialogElement, clientX: number, clientY: number): boolean {
  const { top, right, bottom, left } = dialog.getBoundingClientRect()
  return clientX < left || clientX > right || clientY < top || clientY > bottom
}
