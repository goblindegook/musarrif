import { styled } from 'goober'
import type { ComponentChildren } from 'preact'
import { useI18n } from '../../hooks/i18n'
import { IconButton } from '../atoms/IconButton'
import { LightBulbIcon } from '../icons/LightBulbIcon'
import { CopyButton } from './CopyButton'
import { SpeechButton } from './SpeechButton'

interface DetailProps {
  label: string
  labelLang?: string
  labelDir?: 'auto' | 'rtl' | 'ltr'
  value?: string
  valueLang?: string
  children?: ComponentChildren
  valueDir?: 'auto' | 'rtl' | 'ltr'
  speechText?: string | null
  copyText?: string | null
  onInsightsClick?: () => void
  insightsLabel?: string
  insightsOpen?: boolean
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
  onInsightsClick,
  insightsLabel,
  insightsOpen,
}: DetailProps) => {
  const { t } = useI18n()
  const hasActions = onInsightsClick || speechText || copyText

  return (
    <DetailItem>
      {hasActions && (
        <DetailActions>
          {onInsightsClick && (
            <IconButton
              onClick={onInsightsClick}
              aria-label={insightsLabel}
              aria-has-popup="dialog"
              aria-expanded={insightsOpen}
              size="sm"
            >
              <LightBulbIcon />
            </IconButton>
          )}
          {speechText && (
            <SpeechButton
              text={speechText}
              lang={valueLang}
              ariaLabel={t('aria.speak', { text: speechText })}
              size="sm"
            />
          )}
          {copyText && <CopyButton text={copyText} ariaLabel={t('aria.copy', { text: copyText })} size="sm" />}
        </DetailActions>
      )}
      <DetailMain>
        <DetailLabel dir={labelDir} lang={labelLang}>
          {label}
        </DetailLabel>
        <DetailContent dir={valueDir} lang={valueLang}>
          {value && <span>{value}</span>}
          {children}
        </DetailContent>
      </DetailMain>
    </DetailItem>
  )
}

const DetailActions = styled('span')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  gap: 0.25rem;
  margin-inline-start: -0.375rem;
  padding-inline-end: 0.375rem;
  border-inline-end: 1px solid #e2e8f0;

  @media (min-width: 480px) {
    margin-inline-start: -0.5rem;
    gap: 0.35rem;
    padding-inline-end: 0.5rem;
  }

  @media print {
    display: none;
  }
`

const DetailItem = styled('div')`
  background: #f8fafc;
  border-radius: 0.75rem;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 0.5rem;

  @media (min-width: 480px) {
    border-radius: 1rem;
    padding: 0.75rem 1rem;
    gap: 0.625rem;
  }

  @media print {
    border-radius: 0.3rem;
    padding: 0.3rem 0.4rem;
    gap: 0.3rem;
  }
`

const DetailMain = styled('span')`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: 0.25rem;

  @media print {
    gap: 0.1rem;
  }
`

const DetailLabel = styled('span')`
  display: block;
  font-size: 0.78rem;
  text-transform: uppercase;
  color: #475569;
  letter-spacing: 0.08em;

  @media print {
    font-size: 0.62rem;
    letter-spacing: 0.04em;
  }
`

const DetailContent = styled('span')`
  display: inline-flex;
  align-items: baseline;
  flex: 1;
  min-width: 0;
  gap: 0.5rem;
  font-size: 1.6rem;
  font-weight: 600;

  @media (min-width: 480px) {
    font-size: 1.8rem;
  }

  @media print {
    gap: 0.25rem;
    font-size: 1.05rem;
    line-height: 1.2;
  }
`
