import { styled } from 'goober'
import { useCallback } from 'preact/hooks'
import { useI18n } from '../../hooks/i18n'
import { buildUrl } from '../../hooks/routing'
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
      href={buildUrl(['verbs', verb.id])}
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
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 0.3rem 0.9rem;
  background: var(--color-bg-surface);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1rem;
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease, color 120ms ease;

  &:hover {
    background: var(--color-bg-accent-hover);
    border-color: var(--color-accent);
    color: var(--color-text-primary);
    box-shadow: var(--shadow-interactive-hover);
  }

  &.active {
    border-color: var(--color-accent);
    background: var(--color-bg-accent);
    color: var(--color-text-emphasis);
    box-shadow: var(--shadow-interactive-hover);

    &:hover {
      background: var(--color-bg-accent);
      border-color: var(--color-accent);
      color: var(--color-text-emphasis);
    }
  }

  small {
    color: var(--color-text-secondary);
    font-size: 0.75rem;
    transition: color 120ms ease;
  }

  &:hover small {
    color: var(--color-text-primary);
  }
`

const InlineRow = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const VerbTranslation = styled('small')`
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  max-width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 120ms ease;
  white-space: nowrap;
`
