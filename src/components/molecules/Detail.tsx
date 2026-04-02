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
        {(onInsightsClick || speechText || copyText) && (
          <DetailActions>
            {copyText && <CopyButton text={copyText} ariaLabel={t('aria.copy', { text: copyText })} />}
            {onInsightsClick && (
              <IconButton
                onClick={onInsightsClick}
                ariaLabel={insightsLabel}
                ariaHasPopup="dialog"
                ariaExpanded={insightsOpen}
              >
                <LightBulbIcon />
              </IconButton>
            )}
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
  border-radius: 0.75rem;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: flex-start;
  gap: 0.25rem;

  @media (min-width: 480px) {
    border-radius: 1rem;
    padding: 0.75rem 1rem;
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
  align-items: baseline;
  flex: 1;
  min-width: 0;
  gap: 0.5rem;
`

const DetailActions = styled('span')`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  gap: 0.25rem;

  @media (min-width: 480px) {
    gap: 0.35rem;
  }
`
