import { styled } from 'goober'
import type { ComponentChildren } from 'preact'
import { useI18n } from '../hooks/i18n'
import { CopyButton } from './CopyButton'
import { SpeechButton } from './SpeechButton'

interface DetailProps {
  label: string
  labelLang?: string
  labelDir?: 'auto' | 'rtl' | 'ltr'
  value?: string
  speechText?: string | null
  copyText?: string | null
  valueLang?: string
  valueDir?: 'auto' | 'rtl' | 'ltr'
  children?: ComponentChildren
  onClick?: () => void
  ariaLabel?: string
  ariaHasPopup?: 'dialog'
  ariaExpanded?: boolean
}

export const Detail = ({
  label,
  labelLang,
  labelDir,
  value,
  speechText,
  copyText,
  valueLang = 'ar',
  valueDir = 'rtl',
  children,
  onClick,
  ariaLabel,
  ariaHasPopup,
  ariaExpanded,
}: DetailProps) => {
  const { t } = useI18n()

  if (onClick) {
    return (
      <DetailButton
        onClick={onClick}
        aria-label={ariaLabel ?? label}
        aria-haspopup={ariaHasPopup}
        aria-expanded={ariaExpanded}
        aria-role="button"
      >
        <DetailLabel dir={labelDir} lang={labelLang}>
          {label}
        </DetailLabel>
        <DetailValue dir={valueDir} lang={valueLang}>
          {value && <span>{value}</span>}
          {children}
        </DetailValue>
      </DetailButton>
    )
  }

  return (
    <DetailItem>
      <DetailLabel dir={labelDir} lang={labelLang}>
        {label}
      </DetailLabel>
      <DetailValue dir={valueDir} lang={valueLang}>
        <DetailContent>
          {value && <span>{value}</span>}
          {children}
        </DetailContent>
        {(speechText || copyText) && (
          <DetailActions>
            {copyText && <CopyButton text={copyText} ariaLabel={t('aria.copy', { text: copyText })} />}
            {speechText && (
              <SpeechButton text={speechText} lang={valueLang} ariaLabel={t('aria.speak', { text: speechText })} />
            )}
          </DetailActions>
        )}
      </DetailValue>
    </DetailItem>
  )
}

const DetailItem = styled('div')`
  background: #f8fafc;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: flex-start;
  gap: 0.25rem;
`

const DetailButton = styled(DetailItem)`
  cursor: pointer;
  transition: border-color 140ms ease, box-shadow 140ms ease, transform 140ms ease;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid #475569;
    outline-offset: 2px;
  }
`

const DetailLabel = styled('span')`
  display: block;
  font-size: 0.78rem;
  text-transform: uppercase;
  color: #475569;
  letter-spacing: 0.08em;
`

const DetailValue = styled('span')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 0.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  width: 100%;
`

const DetailContent = styled('span')`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`

const DetailActions = styled('span')`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`
