import { styled } from 'goober'
import { useCallback } from 'preact/hooks'
import { useI18n } from '../../hooks/i18n'
import { buildVerbHref } from '../../hooks/routing'
import { applyDiacriticsPreference } from '../../paradigms/letters'
import { type DisplayVerb, formatFormLabel } from '../../paradigms/verbs'

interface VerbPillProps {
  verb: DisplayVerb
  className?: string
}

export function VerbPill({ verb, className }: VerbPillProps) {
  const { lang, dir, t, diacriticsPreference } = useI18n()
  const formLabel = formatFormLabel(verb.form, verb.root)

  const formatArabic = useCallback(
    (value: string) => applyDiacriticsPreference(value, diacriticsPreference),
    [diacriticsPreference],
  )

  const translateVerb = useCallback(
    (candidate: DisplayVerb) => {
      if (lang === 'ar') return ''
      const translation = t(candidate.id)
      return translation === candidate.id ? '—' : translation
    },
    [lang, t],
  )

  return (
    <VerbPillLink
      href={buildVerbHref(verb.id)}
      className={className}
      aria-label={[formatArabic(verb.label), formLabel, t('meta.form'), translateVerb(verb)]
        .filter(Boolean)
        .join(' - ')}
    >
      <InlineRow>
        <span dir="rtl" lang="ar">
          {formatArabic(verb.label)}
        </span>
        <small>{formLabel}</small>
      </InlineRow>
      {lang !== 'ar' && (
        <VerbTranslation dir={dir} lang={lang}>
          {translateVerb(verb)}
        </VerbTranslation>
      )}
    </VerbPillLink>
  )
}

const VerbPillLink = styled('a')`
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 0.3rem 0.9rem;
  background: #fff;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1rem;
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease, color 120ms ease;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5f5;
    color: #334155;
    box-shadow: 0 6px 14px rgba(15, 23, 42, 0.1);
  }

  &.active {
    border-color: #facc15;
    background: #fff8e1;
    color: #92400e;
    box-shadow: 0 6px 14px rgba(15, 23, 42, 0.1);

    &:hover {
      background: #fff8e1;
      border-color: #facc15;
      color: #92400e;
    }
  }

  small {
    color: #475569;
    font-size: 0.75rem;
    transition: color 120ms ease;
  }

  &:hover small {
    color: #0f172a;
  }
`

const InlineRow = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const VerbTranslation = styled('small')`
  color: #475569;
  font-size: 0.75rem;
  max-width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 120ms ease;
  white-space: nowrap;
`
