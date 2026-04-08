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
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <Header>
        <ModalTitle id={titleId}>{title}</ModalTitle>
        <IconButton onClick={onClose} ariaLabel={t('modal.close')} title={t('modal.close')}>
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
  background: #ffffff;
  border-radius: 1.25rem;
  padding: 1.5rem;
  max-width: 520px;
  width: min(100%, 520px);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.2);
  border: 1px solid #e2e8f0;

  &::backdrop {
    background: rgba(15, 23, 42, 0.55);
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
  color: #0f172a;
`

const Content = styled('div')`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`
