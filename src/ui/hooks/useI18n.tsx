import type { ComponentChildren } from 'preact'
import { createContext } from 'preact'
import { useCallback, useContext, useEffect, useMemo, useState } from 'preact/compat'
import { applyDiacriticsPreference, type DiacriticsPreference } from '../../paradigms/tokens'
import enStrings from '../locales/en.strings.json'
import { useLocalStorage } from './useLocalStorage'

const SUPPORTED_LANGUAGES = ['en', 'it', 'pt', 'ar'] as const

export type Language = (typeof SUPPORTED_LANGUAGES)[number]

interface Translation {
  strings: Record<string, string>
  verbs?: Record<string, string>
  roots?: Record<string, string>
}

export type Translate = (key: string, params?: Record<string, string | undefined>) => string

interface I18nContextValue {
  lang: Language
  dir: 'ltr' | 'rtl'
  t: Translate
  hasLexicon: boolean
  diacriticsPreference: DiacriticsPreference
  setDiacriticsPreference: (next: DiacriticsPreference) => void
  setLang: (lang: string) => void
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

const EN_STRINGS = enStrings as Record<string, string>
const EN_TRANSLATION: Translation = { strings: EN_STRINGS }

const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  it: 'Italiano',
  pt: 'Português',
  ar: 'العربية',
}

const LANGUAGE_DIRECTIONS: Record<Language, 'ltr' | 'rtl'> = {
  en: 'ltr',
  it: 'ltr',
  pt: 'ltr',
  ar: 'rtl',
}

const STRING_CACHE: Partial<Record<Language, Record<string, string>>> = { en: EN_STRINGS }
const LEXICON_CACHE: Partial<Record<Language, Omit<Translation, 'strings'>>> = {}

const STRING_LOADERS: Record<Language, () => Promise<Record<string, string>>> = {
  en: async () => EN_STRINGS,
  it: async () => (await import('../locales/it.strings.json')).default as Record<string, string>,
  pt: async () => (await import('../locales/pt.strings.json')).default as Record<string, string>,
  ar: async () => (await import('../locales/ar.strings.json')).default as Record<string, string>,
}

const LEXICON_LOADERS: Partial<Record<Language, () => Promise<Omit<Translation, 'strings'>>>> = {
  en: async () => (await import('../locales/en.verbs.json')).default as Omit<Translation, 'strings'>,
  it: async () => (await import('../locales/it.verbs.json')).default as Omit<Translation, 'strings'>,
  pt: async () => (await import('../locales/pt.verbs.json')).default as Omit<Translation, 'strings'>,
}

const STRING_PROMISES: Partial<Record<Language, Promise<Record<string, string>>>> = {}
const LEXICON_PROMISES: Partial<Record<Language, Promise<Omit<Translation, 'strings'> | undefined>>> = {}

export const LANGUAGE_OPTIONS = SUPPORTED_LANGUAGES.map((id) => ({ id, label: LANGUAGE_LABELS[id] }))

export function I18nProvider({ children }: { children: ComponentChildren }) {
  const [storedLanguage, setStoredLanguage] = useLocalStorage<string>('language', detectBrowserLanguage())
  const lang: Language = isSupported(storedLanguage) ? storedLanguage : detectBrowserLanguage()

  const [storedDiacritics, setDiacriticsPreference] = useLocalStorage<string>('diacriticsPreference', 'some')
  const diacriticsPreference = storedDiacritics === 'all' || storedDiacritics === 'none' ? storedDiacritics : 'some'
  const [translation, setTranslation] = useState<Translation>(() => getCachedTranslation(lang) ?? EN_TRANSLATION)

  useEffect(() => {
    let cancelled = false
    setTranslation(getCachedTranslation(lang) ?? EN_TRANSLATION)
    void loadTranslation(lang).then((next) => {
      if (!cancelled) setTranslation(next)
    })

    return () => {
      cancelled = true
    }
  }, [lang])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = LANGUAGE_DIRECTIONS[lang]
  }, [lang])

  const setLang = useCallback(
    (newLang: string) => {
      if (isSupported(newLang)) setStoredLanguage(newLang)
    },
    [setStoredLanguage],
  )

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      dir: LANGUAGE_DIRECTIONS[lang],
      t: (key, params) => {
        const fallback = getCachedTranslation('en') ?? EN_TRANSLATION
        const template =
          translation.strings[key] ??
          translation.verbs?.[key] ??
          translation.roots?.[key] ??
          fallback.strings[key] ??
          fallback.verbs?.[key] ??
          fallback.roots?.[key] ??
          key
        const rendered = format(template, params)
        return lang === 'ar' ? applyDiacriticsPreference(rendered, diacriticsPreference) : rendered
      },
      hasLexicon: translation.verbs != null || translation.roots != null,
      diacriticsPreference,
      setDiacriticsPreference,
      setLang,
    }),
    [lang, diacriticsPreference, setDiacriticsPreference, setLang, translation],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within an I18nProvider')
  return ctx
}

async function loadTranslation(lang: Language): Promise<Translation> {
  const [strings, lexicon] = await Promise.all([loadStrings(lang), loadLexicon(lang)])
  if (lang !== 'en') void loadLexicon('en')
  return lexicon == null ? { strings } : { strings, ...lexicon }
}

function getCachedTranslation(lang: Language): Translation | undefined {
  const strings = STRING_CACHE[lang]
  if (strings == null) return undefined
  const lexicon = LEXICON_CACHE[lang]
  return lexicon == null ? { strings } : { strings, ...lexicon }
}

async function loadStrings(lang: Language): Promise<Record<string, string>> {
  const cached = STRING_CACHE[lang]
  if (cached != null) return cached

  const pending = STRING_PROMISES[lang]
  if (pending != null) return pending

  const next = STRING_LOADERS[lang]().then((strings) => {
    STRING_CACHE[lang] = strings
    return strings
  })

  STRING_PROMISES[lang] = next
  return next.finally(() => {
    delete STRING_PROMISES[lang]
  })
}

async function loadLexicon(lang: Language): Promise<Omit<Translation, 'strings'> | undefined> {
  const loader = LEXICON_LOADERS[lang]
  if (loader == null) return undefined

  const cached = LEXICON_CACHE[lang]
  if (cached != null) return cached

  const pending = LEXICON_PROMISES[lang]
  if (pending != null) return pending

  const next = loader().then((lexicon) => {
    LEXICON_CACHE[lang] = lexicon
    return lexicon
  })

  LEXICON_PROMISES[lang] = next
  return next.finally(() => {
    delete LEXICON_PROMISES[lang]
  })
}

function isSupported(lang: unknown): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language)
}

function detectBrowserLanguage(): Language {
  return (
    [...(navigator?.languages ?? []), navigator?.language ?? '']
      .map((locale) => locale.toLowerCase().split('-').at(0))
      .find(isSupported) ?? 'en'
  )
}

function format(template: string, params?: Record<string, string | undefined>): string {
  return params ? template.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? `{${key}}`) : template
}
