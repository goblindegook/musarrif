import { styled } from 'goober'
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { applyDiacriticsPreference } from '../paradigms/helpers'
import type { Verb } from '../paradigms/verbs'
import { search } from '../paradigms/verbs'

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const

interface SearchProps {
  onSelect: (verb: Verb) => void
  selectedVerb?: Verb | null
}

export function Search({ onSelect, selectedVerb }: SearchProps) {
  const { t, lang, dir, diacriticsPreference } = useI18n()
  const translationLang = lang === 'ar' ? 'en' : lang
  const translationDir = (lang === 'ar' ? 'ltr' : dir) as 'ltr' | 'rtl'
  const [query, setQuery] = useState('')
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [highligtedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const suggestionWrapperRef = useRef<HTMLDivElement | null>(null)

  const matchingVerbs = useMemo<Verb[]>(() => {
    if (!query.trim()) return []
    return search(query, { translate: t })
  }, [query, t])

  const suggested = useMemo(() => matchingVerbs.slice(0, 10), [matchingVerbs])

  useEffect(() => {
    setHighlightedIndex((current) => Math.max(Math.min(current, suggested.length - 1), 0))
  }, [suggested.length])

  useEffect(() => {
    const handlePointerDown = (event: Event) => {
      const target = event.target as Node | null

      if (!target) {
        if (suggestionsOpen) setSuggestionsOpen(false)
        return
      }

      if (suggestionWrapperRef.current?.contains?.(target)) {
        if (suggested.length > 0) setSuggestionsOpen(true)
        return
      }

      if (suggestionsOpen) setSuggestionsOpen(false)
    }

    window.addEventListener('pointerdown', handlePointerDown)

    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [suggestionsOpen, suggested.length])

  useEffect(() => {
    if (!selectedVerb) return
    setQuery(selectedVerb.label)
    setSuggestionsOpen(false)
  }, [selectedVerb])

  const handleSelect = useCallback(
    (verb: Verb) => {
      setQuery(verb.label)
      onSelect(verb)
      setSuggestionsOpen(false)
      if (inputRef.current && typeof inputRef.current.blur === 'function') {
        inputRef.current.blur()
      }
    },
    [onSelect],
  )

  return (
    <SuggestionContainer
      ref={suggestionWrapperRef}
      onBlur={(event: FocusEvent) => {
        const nextTarget = event.relatedTarget as Node | null
        if (!nextTarget) {
          setSuggestionsOpen(false)
          return
        }

        if (suggestionWrapperRef.current?.contains?.(nextTarget)) return
        setSuggestionsOpen(false)
      }}
    >
      <Input
        value={applyDiacriticsPreference(query, diacriticsPreference)}
        onInput={(event) => {
          setQuery((event.target as HTMLInputElement).value)
          setSuggestionsOpen(true)
        }}
        onFocus={() => setSuggestionsOpen(suggested.length > 0)}
        onBlur={(event) => {
          if (suggestionWrapperRef.current?.contains?.(event.relatedTarget as Node)) return

          setTimeout(() => {
            if (suggestionWrapperRef.current?.contains?.(document.activeElement)) return
            setSuggestionsOpen(false)
          }, 0)
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            if (suggested.length > 0) setSuggestionsOpen(true)
            setHighlightedIndex((current) => Math.min(current + 1, suggested.length - 1))
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault()
            setHighlightedIndex((current) => Math.max(current - 1, 0))
          }
          if (event.key === 'Enter' && suggested.length > 0) {
            event.preventDefault()
            event.stopPropagation()
            const index = Math.max(highligtedIndex, 0)
            handleSelect(suggested[index])
          }
          if (event.key === 'Escape') {
            setSuggestionsOpen(false)
            setHighlightedIndex(-1)
          }
        }}
        ref={inputRef}
        placeholder={t('placeholder')}
        dir="rtl"
        lang="ar"
        inputMode="text"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        type="search"
        aria-label={t('verbLabel')}
        role="combobox"
        aria-expanded={suggestionsOpen}
        aria-autocomplete="list"
        aria-activedescendant={
          highligtedIndex >= 0 && suggested[highligtedIndex]
            ? `search-suggestion-${suggested[highligtedIndex].id}`
            : undefined
        }
      />

      {suggestionsOpen && suggested.length > 0 && (
        <SuggestionMenu role="listbox" aria-label={t('verbLabel')}>
          {suggested.map((verb, index) => {
            const isHighlighted = index === highligtedIndex
            return (
              <SuggestionItem
                id={`search-suggestion-${verb.id}`}
                type="button"
                key={verb.id}
                role="option"
                aria-selected={isHighlighted}
                highlighted={isHighlighted}
                onPointerDown={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  handleSelect(verb)
                }}
                onFocus={() => setSuggestionsOpen(true)}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleSelect(verb)}
                aria-label={`${verb.label} - ${t('meta.form')} ${ROMAN_NUMERALS[verb.form - 1]}${
                  lang !== 'ar' ? ` - ${t(verb.id)}` : ''
                }`}
              >
                {lang !== 'ar' && (
                  <small dir={translationDir} lang={translationLang}>
                    {t(verb.id)}
                  </small>
                )}
                <SuggestionItemVerb>
                  <span dir="rtl" lang="ar">
                    {applyDiacriticsPreference(verb.label, diacriticsPreference)}
                  </span>
                  <small>{ROMAN_NUMERALS[verb.form - 1]}</small>
                </SuggestionItemVerb>
              </SuggestionItem>
            )
          })}
        </SuggestionMenu>
      )}
    </SuggestionContainer>
  )
}

const SuggestionContainer = styled('div')`
  position: relative;
  width: 100%;
  box-sizing: border-box;
`

const Input = styled('input')`
  border-radius: 0.9rem;
  border: 1px solid #cbd5f5;
  padding: 0.9rem 1rem;
  font-size: 1.1rem;
  font-family: inherit;
  background: #f8fafc;
  width: 100%;
  box-sizing: border-box;
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease;

  &:hover {
    background: #fff;
    border-color: #cbd5f5;
    box-shadow: 0 6px 14px rgba(15, 23, 42, 0.1);
  }

  &:focus {
    outline: 3px solid #fde68a;
    border-color: #facc15;
  }
`

const SuggestionMenu = styled('div')`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.35rem;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
  z-index: 5;
`

const SuggestionItem = styled('button')<{ highlighted?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: none;
  background: ${({ highlighted }) => (highlighted ? '#f1f5f9' : '#fff')};
  color: ${({ highlighted }) => (highlighted ? '#334155' : '#0f172a')};
  cursor: pointer;
  text-align: left;
  transition: background 120ms ease, color 120ms ease;

  span {
    font-size: 1.2rem;
    font-weight: 600;
  }

  small {
    color: #475569;
    margin-left: 0.5rem;
    transition: color 120ms ease;
  }

  &:hover {
    background: #f1f5f9;
    color: #334155;
  }

  &:hover small {
    color: #0f172a;
  }
`

const SuggestionItemVerb = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;

  & small {
    width: 0.75rem;
    text-align: center;
  }
`
