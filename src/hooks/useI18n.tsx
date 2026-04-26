import type { ComponentChildren } from 'preact'
import { createContext } from 'preact'
import { useCallback, useContext, useEffect, useMemo, useState } from 'preact/compat'
import en from '../locales/en.json'
import { applyDiacriticsPreference, type DiacriticsPreference } from '../paradigms/letters'
import { useLocalStorage } from './useLocalStorage'

const SUPPORTED_LANGUAGES = ['en', 'it', 'pt', 'ar'] as const

export type Language = (typeof SUPPORTED_LANGUAGES)[number]

interface Translation {
  strings: Record<string, string>
  verbs?: Record<string, string>
  roots?: Record<string, string>
}

interface I18nContextValue {
  lang: Language
  dir: 'ltr' | 'rtl'
  t: (key: string, params?: Record<string, string>) => string
  diacriticsPreference: DiacriticsPreference
  setDiacriticsPreference: (next: DiacriticsPreference) => void
  setLang: (lang: string) => void
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

const EN_TRANSLATION = en as Translation

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

const TRANSLATION_CACHE: Partial<Record<Language, Translation>> = { en: EN_TRANSLATION }

const TRANSLATION_LOADERS: Record<Language, () => Promise<Translation>> = {
  en: async () => EN_TRANSLATION,
  it: async () => (await import('../locales/it.json')).default as Translation,
  pt: async () => (await import('../locales/pt.json')).default as Translation,
  ar: async () => (await import('../locales/ar.json')).default as Translation,
}

const TRANSLATION_PROMISES: Partial<Record<Language, Promise<Translation>>> = {}

export const LANGUAGE_OPTIONS = SUPPORTED_LANGUAGES.map((id) => ({ id, label: LANGUAGE_LABELS[id] }))

export function I18nProvider({ children }: { children: ComponentChildren }) {
  const [storedLanguage, setStoredLanguage] = useLocalStorage<string>('language', detectBrowserLanguage())
  const lang: Language = isSupported(storedLanguage) ? storedLanguage : detectBrowserLanguage()

  const [storedDiacritics, setDiacriticsPreference] = useLocalStorage<string>('diacriticsPreference', 'some')
  const diacriticsPreference = storedDiacritics === 'all' || storedDiacritics === 'none' ? storedDiacritics : 'some'
  const [translation, setTranslation] = useState<Translation>(() => TRANSLATION_CACHE[lang] ?? EN_TRANSLATION)

  useEffect(() => {
    let cancelled = false
    setTranslation(TRANSLATION_CACHE[lang] ?? EN_TRANSLATION)
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
        const template =
          translation.strings[key] ??
          translation.verbs?.[key] ??
          translation.roots?.[key] ??
          EN_TRANSLATION.strings[key] ??
          EN_TRANSLATION.verbs?.[key] ??
          EN_TRANSLATION.roots?.[key] ??
          key
        const rendered = format(template, params)
        return lang === 'ar' ? applyDiacriticsPreference(rendered, diacriticsPreference) : rendered
      },
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
  const cached = TRANSLATION_CACHE[lang]
  if (cached) return cached

  const pending = TRANSLATION_PROMISES[lang]
  if (pending) return pending

  const next = TRANSLATION_LOADERS[lang]().then((translation) => {
    TRANSLATION_CACHE[lang] = translation
    return translation
  })

  TRANSLATION_PROMISES[lang] = next
  return next.finally(() => {
    delete TRANSLATION_PROMISES[lang]
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

function format(template: string, params?: Record<string, string>): string {
  return params ? template.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? `{${key}}`) : template
}
