import { styled } from 'goober'
import { useCallback } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { buildVerbHref } from '../hooks/routing'
import enTranslations from '../locales/en.json'
import { applyDiacriticsPreference } from '../paradigms/letters'
import type { Verb } from '../paradigms/verbs'

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const

interface VerbPillProps {
  verb: Verb
  className?: string
}

export function VerbPill({ verb, className }: VerbPillProps) {
  const { lang, dir, t, diacriticsPreference } = useI18n()

  const formatArabic = useCallback(
    (value: string) => applyDiacriticsPreference(value, diacriticsPreference),
    [diacriticsPreference],
  )

  const translateVerb = useCallback(
    (candidate: Verb) =>
      lang !== 'ar' ? t(candidate.id) : (enTranslations.verbs as Record<string, string>)[candidate.id],
    [lang, t],
  )

  return (
    <VerbPillLink
      href={buildVerbHref(lang, verb.id)}
      className={className}
      aria-label={`${formatArabic(verb.label)} - ${t('meta.form')} ${ROMAN_NUMERALS[verb.form - 1]}${
        lang !== 'ar' ? ` - ${translateVerb(verb)}` : ''
      }`}
    >
      <InlineRow>
        <span dir="rtl" lang="ar">
          {formatArabic(verb.label)}
        </span>
        <small>{ROMAN_NUMERALS[verb.form - 1]}</small>
      </InlineRow>
      {lang !== 'ar' && (
        <small dir={dir} lang={lang}>
          {translateVerb(verb)}
        </small>
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
      background: #ffe58f;
      border-color: #eab308;
      color: #92400e;
    }
  }

  small {
    color: #475569;
    transition: color 120ms ease;
    font-size: 0.75rem;
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
