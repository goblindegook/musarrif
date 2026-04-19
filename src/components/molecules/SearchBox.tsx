import { styled } from 'goober'
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks'
import { useI18n } from '../../hooks/i18n'
import { applyDiacriticsPreference } from '../../paradigms/letters'
import { search } from '../../paradigms/selection'
import { type DisplayVerb, formatFormLabel } from '../../paradigms/verbs'
import { Overlay, type OverlayProps } from '../atoms/Overlay'

interface SearchProps {
  id?: string
  onSelect: (verb: DisplayVerb) => void
  selectedVerb?: DisplayVerb | null
}

export function Search({ id, onSelect, selectedVerb }: SearchProps) {
  const { t, lang, dir, diacriticsPreference } = useI18n()
  const [query, setQuery] = useState('')
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [highligtedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const suggestionWrapperRef = useRef<HTMLDivElement | null>(null)
  const isMobile = useMemo(() => window.innerWidth < 960, [])

  const matchingVerbs = useMemo<DisplayVerb[]>(() => {
    if (!query.trim()) return []
    return search(query, { translate: t })
  }, [query, t])

  const suggested = useMemo(() => matchingVerbs.slice(0, 20), [matchingVerbs])

  useEffect(() => {
    setHighlightedIndex((current) => Math.max(Math.min(current, suggested.length - 1), 0))
  }, [suggested.length])

  useEffect(() => {
    if (!selectedVerb) return
    setQuery(selectedVerb.label)
    setSuggestionsOpen(false)
  }, [selectedVerb])

  useEffect(() => {
    if (!suggestionsOpen || highligtedIndex < 0 || !suggested[highligtedIndex]) return
    document.getElementById(`search-suggestion-${suggested[highligtedIndex].id}`)?.scrollIntoView({ block: 'nearest' })
  }, [highligtedIndex, suggested, suggestionsOpen])

  const handleSelect = useCallback(
    (verb: DisplayVerb) => {
      onSelect(verb)
      setQuery(verb.label)
      setSuggestionsOpen(false)
      inputRef.current?.blur?.()
    },
    [onSelect],
  )

  const inputDir = useMemo<'ltr' | 'rtl'>(() => {
    const latinCount = Array.from(query).filter((c) => /[a-zA-Z]/.test(c)).length
    const arabicCount = Array.from(query).filter((c) => /[\u0600-\u06FF]/.test(c)).length
    if (query.length === 0) return lang === 'ar' ? 'rtl' : 'ltr'
    return latinCount > arabicCount ? 'ltr' : 'rtl'
  }, [query, lang])

  return (
    <>
      {suggestionsOpen && isMobile && <MobileOverlay zIndex={100} onClick={() => setSuggestionsOpen(false)} />}
      <SuggestionContainer
        ref={suggestionWrapperRef}
        isActive={suggestionsOpen}
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
            setSuggestionsOpen(true)
          }}
          onFocus={() => {
            if (isMobile) window.scrollTo({ top: 0 })
            setSuggestionsOpen(true)
          }}
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
              event.preventDefault()
              setSuggestionsOpen(false)
              setHighlightedIndex(-1)
              inputRef.current?.blur?.()
            }
          }}
          ref={inputRef}
          placeholder={t('placeholder')}
          dir={inputDir}
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
              const formLabel = formatFormLabel(verb.form, verb.root)
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
                  aria-label={[verb.label, t('meta.form.withNumber', { form: formLabel }), lang !== 'ar' && t(verb.id)]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {lang !== 'ar' && (
                    <SuggestionItemTranslation dir={dir} lang={lang}>
                      {t(verb.id)}
                    </SuggestionItemTranslation>
                  )}
                  <SuggestionItemVerb>
                    <SuggestionItemVerbLabel dir="rtl" lang="ar">
                      {applyDiacriticsPreference(verb.label, diacriticsPreference)}
                    </SuggestionItemVerbLabel>
                    <SuggestionItemVerbForm>{formLabel}</SuggestionItemVerbForm>
                  </SuggestionItemVerb>
                </SuggestionItem>
              )
            })}
          </SuggestionMenu>
        )}
      </SuggestionContainer>
    </>
  )
}

const SuggestionContainer = styled('search')<{ isActive?: boolean }>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;

  ${({ isActive }) =>
    isActive &&
    `
      position: fixed;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      top: 0;
      left: 0;
      right: 0;
      z-index: 101;
      height: 5rem;
      gap: 0;
      animation: slideFromBottom 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at top, #fffdf7 0%, #f5f4ee 60%, #ede9df 100%);
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
        z-index: 101;
      }

      @media (min-width: 960px) {
        position: relative;
        display: block;
        top: auto;
        left: auto;
        right: auto;
        z-index: auto;
        padding: 0;
        height: auto;
        animation: none;

        &::before {
          display: none;
        }
      }
  `}

  @keyframes slideFromBottom {
    from {
      top: 100vh;
    }
    to {
      top: 0;
    }
  }
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
  appearance: none;
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
  position: relative;
  z-index: 103;

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  &::placeholder {
    direction: inherit;
    text-align: inherit;
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
  max-height: calc(100vh - 5rem);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 960px) {
    left: 0;
    right: 0;
    width: 100%;
    margin-top: 0.35rem;
    border-radius: 0.75rem;
    border-left: 1px solid #e2e8f0;
    border-right: 1px solid #e2e8f0;
    z-index: 5;
    max-height: 20rem;
  }
`

const SuggestionItem = styled('button')<{ highlighted?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.8rem 1.5rem;
  border: none;
  background: ${({ highlighted }) => (highlighted ? '#f1f5f9' : '#fff')};
  color: ${({ highlighted }) => (highlighted ? '#334155' : '#0f172a')};
  cursor: pointer;
  text-align: left;
  transition: background 120ms ease, color 120ms ease;

  &:hover small {
    color: #0f172a;
  }

  @media (min-width: 960px) {
    padding: 0.25rem 1rem;
  }
`

const SuggestionItemVerbLabel = styled('span')`
  font-size: 1.2rem;
  font-weight: 500;
`

const SuggestionItemVerbForm = styled('small')`
  color: #475569;
  margin-left: 0.5rem;
  transition: color 120ms ease;
`

const SuggestionItemTranslation = styled('span')`
  color: #475569;
  margin-left: 0.5rem;
  transition: color 120ms ease;
  font-size: 0.8rem;
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
