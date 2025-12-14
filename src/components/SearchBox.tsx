import { styled } from 'goober'
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { applyDiacriticsPreference } from '../paradigms/helpers'
import type { Verb } from '../paradigms/verbs'
import { search } from '../paradigms/verbs'
import { Overlay, type OverlayProps } from './Overlay'

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const

interface SearchProps {
  id?: string
  onSelect: (verb: Verb) => void
  selectedVerb?: Verb | null
}

export function Search({ id, onSelect, selectedVerb }: SearchProps) {
  const { t, lang, dir, diacriticsPreference } = useI18n()
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
    if (!selectedVerb) return
    setQuery(selectedVerb.label)
    setSuggestionsOpen(false)
  }, [selectedVerb])

  const handleSelect = useCallback(
    (verb: Verb) => {
      onSelect(verb)
      setQuery(verb.label)
      setSuggestionsOpen(false)
      inputRef.current?.blur?.()
    },
    [onSelect],
  )

  return (
    <SuggestionContainer
      ref={suggestionWrapperRef}
      isActive={suggestionsOpen && suggested.length > 0}
      onBlur={(event: FocusEvent) => {
        if (!suggestionWrapperRef.current?.contains?.(event.relatedTarget as Node | null)) {
          setSuggestionsOpen(false)
        }
      }}
    >
      <Input
        id={id}
        value={applyDiacriticsPreference(query, diacriticsPreference)}
        onInput={(event) => {
          const value = (event.target as HTMLInputElement).value
          setQuery(value)
          const hasMatches = value.trim().length > 0
          if (hasMatches) {
            setSuggestionsOpen(true)
          }
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
          if (event.key === 'Enter') {
            event.preventDefault()
            if (suggested.length > 0) {
              const index = Math.max(highligtedIndex, 0)
              handleSelect(suggested[index])
            } else if (matchingVerbs.length > 0) {
              handleSelect(matchingVerbs[0])
            }
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
        placeholderDir={dir}
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
        <>
          <MobileOverlay zIndex={100} onClick={() => setSuggestionsOpen(false)} />
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
                  }}
                  onFocus={() => setSuggestionsOpen(true)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={(event) => {
                    event.preventDefault()
                    handleSelect(verb)
                  }}
                  aria-label={[
                    verb.label,
                    `${t('meta.form')} ${ROMAN_NUMERALS[verb.form - 1]}`,
                    lang !== 'ar' && t(verb.id),
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {lang !== 'ar' && (
                    <small dir={dir} lang={lang}>
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
        </>
      )}
    </SuggestionContainer>
  )
}

const SuggestionContainer = styled('div')<{ isActive?: boolean }>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;

  ${({ isActive }) =>
    isActive &&
    `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 101;
      padding: 1rem;
      padding-bottom: 0.5rem;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: -0.5rem;
        background: radial-gradient(circle at top, #fffdf7 0%, #f5f4ee 60%, #ede9df 100%);
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
        z-index: 101;
      }

      @media (min-width: 960px) {
        position: relative;
        top: auto;
        left: auto;
        right: auto;
        z-index: auto;
        padding: 0;

        &::before {
          display: none;
        }
      }
  `}
`

const Input = styled('input')<{ placeholderDir?: 'ltr' | 'rtl' }>`
  border-radius: 0.9rem;
  border: 1px solid #cbd5f5;
  padding: 0.9rem 1rem;
  font-size: 1.1rem;
  font-family: inherit;
  background: #f8fafc;
  width: 100%;
  box-sizing: border-box;
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
  position: relative;
  z-index: 103;

  &::placeholder {
    direction: ${({ placeholderDir }) => placeholderDir ?? 'auto'};
    text-align: ${({ placeholderDir }) => (placeholderDir === 'rtl' ? 'right' : 'left')};
  }

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

const SuggestionMenu = styled('div')<{ active?: boolean }>`
  position: absolute;
  top: 100%;
  left: -1rem;
  right: -1rem;
  box-sizing: border-box;
  border: 1px solid #e2e8f0;
  border-radius: 0;
  border-left: none;
  border-right: none;
  background: #fff;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
  width: calc(100% + 1rem);
  z-index: 102;

  @media (min-width: 960px) {
    left: 0;
    right: 0;
    width: 100%;
    margin-top: 0.35rem;
    border-radius: 0.75rem;
    border-left: 1px solid #e2e8f0;
    border-right: 1px solid #e2e8f0;
    z-index: 5;
  }
`

const SuggestionItem = styled('button')<{ highlighted?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.6rem 1rem;
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

const MobileOverlay = styled(Overlay)<OverlayProps>`
  @media (min-width: 960px) {
    display: none;
  }
`
