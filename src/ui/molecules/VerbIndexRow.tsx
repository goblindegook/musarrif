import { styled } from 'goober'
import { useCallback } from 'preact/hooks'
import { formIVowelPattern } from '../../paradigms/form-i-vowels'
import { applyDiacriticsPreference } from '../../paradigms/tokens'
import { type DisplayVerb, formatFormLabel, isTriliteralFormIDisplayVerb } from '../../paradigms/verbs'
import { useI18n } from '../hooks/useI18n'
import { ChevronIcon } from '../icons/ChevronIcon'
import { useRouting } from '../routes'

interface VerbIndexRowProps {
  verb: DisplayVerb
}

export function VerbIndexRow({ verb }: VerbIndexRowProps) {
  const { lang, dir, t, diacriticsPreference } = useI18n()
  const { navigateTo, toHref } = useRouting()
  const form = formatFormLabel(verb.form, verb.root)
  const route = ['verbs', verb.id] as const

  const formatArabic = useCallback(
    (value: string) => applyDiacriticsPreference(value, diacriticsPreference),
    [diacriticsPreference],
  )

  const translateVerb = useCallback(
    (candidate: DisplayVerb) => {
      if (lang === 'ar') return ''
      if (candidate.synthetic) return '—'
      const translation = t(candidate.id)
      return translation === candidate.id ? '—' : translation
    },
    [lang, t],
  )

  return (
    <RowLink
      href={toHref(route)}
      onClick={(event: MouseEvent) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        event.preventDefault()
        navigateTo(route)
      }}
      aria-label={[
        verb.synthetic ? '*' : null,
        formatArabic(verb.lemma),
        t('meta.form.withNumber', { form }),
        isTriliteralFormIDisplayVerb(verb) ? formIVowelPattern(verb) : null,
        translateVerb(verb),
      ]
        .filter(Boolean)
        .join(' - ')}
    >
      <Headword>
        <Chevron>
          <ChevronIcon />
        </Chevron>
        <Lemma dir="rtl" lang="ar">
          {verb.synthetic && <SyntheticMarker aria-hidden="true">*</SyntheticMarker>}
          {formatArabic(verb.lemma)}
        </Lemma>
        <small>{form}</small>
        {isTriliteralFormIDisplayVerb(verb) && <small>{formIVowelPattern(verb)}</small>}
      </Headword>
      {lang !== 'ar' && (
        <Gloss dir={dir} lang={lang}>
          {translateVerb(verb)}
        </Gloss>
      )}
    </RowLink>
  )
}

const RowLink = styled('a')`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: color 120ms ease;

  small {
    color: var(--color-text-secondary);
    white-space: nowrap;
    transition: color 120ms ease;
  }

  &:hover,
  &:hover small {
    color: var(--color-text-emphasis);
  }

  &:focus-visible {
    outline: 3px solid var(--color-focus-outline);
    outline-offset: 2px;
  }
`

const Headword = styled('div')`
  display: flex;
  flex-direction: row-reverse;
  flex-shrink: 0;
  align-items: center;
  gap: 1rem;

  small {
    font-size: 0.75rem;
  }
`

const Chevron = styled('span')`
  display: inline-flex;
  color: var(--color-text-muted);
  transition: color 120ms ease;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  a:hover & {
    color: var(--color-text-emphasis);
  }

  [dir='rtl'] & {
    transform: scaleX(-1);
  }
`

const Lemma = styled('span')`
  font-size: 1.4rem;
`

const SyntheticMarker = styled('span')`
  color: var(--color-text-muted);
  font-size: 0.75em;
  font-weight: 400;
  align-self: flex-start;
  line-height: 1.8;
`

const Gloss = styled('small')`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.85rem;
`
