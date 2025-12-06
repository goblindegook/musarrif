import type { ComponentChildren } from 'preact'
import { createContext } from 'preact'
import { useCallback, useContext, useEffect, useMemo, useState } from 'preact/compat'
import ar from '../locales/ar.json'
import en from '../locales/en.json'
import it from '../locales/it.json'
import pt from '../locales/pt.json'
import { applyDiacriticsPreference, type DiacriticsPreference } from '../paradigms/helpers'
import { DIACRITICS_STORAGE_KEY, readPreference, writePreference } from './preferences'
import { useRouting } from './routing'

const SUPPORTED_LANGUAGES = ['en', 'it', 'pt', 'ar'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]
export const DEFAULT_LANGUAGE = 'en'

export function isLanguageSupported(lang: unknown): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language)
}

interface Translation {
  dir: 'ltr' | 'rtl'
  label: string
  strings: Record<string, string>
  verbs?: Record<string, string>
}

const TRANSLATIONS: Record<Language, Translation> = {
  en: en as Translation,
  it: it as Translation,
  pt: pt as Translation,
  ar: ar as Translation,
}

interface I18nContextValue {
  lang: Language
  dir: 'ltr' | 'rtl'
  t: (key: string, params?: Record<string, string>) => string
  tHtml: (key: string, params?: Record<string, string>) => string
  diacriticsPreference: DiacriticsPreference
  setDiacriticsPreference: (next: DiacriticsPreference) => void
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

export const LANGUAGE_OPTIONS = SUPPORTED_LANGUAGES.map((id) => ({ id, label: TRANSLATIONS[id].label }))

function format(template: string, params?: Record<string, string>): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? `{${key}}`)
}

function sanitizeHtml(raw: string, diacriticsPreference: DiacriticsPreference): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(raw, 'text/html')

  Array.from(doc.body.querySelectorAll('*')).forEach((element) => {
    const tag = element.tagName.toLowerCase()
    if (!['strong', 'b', 'em', 'i', 'u', 'br', 'a'].includes(tag)) {
      element.replaceWith(...element.childNodes)
      return
    }

    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase()
      if (!['href'].includes(name)) {
        element.removeAttribute(attribute.name)
        return
      }

      if (name === 'href') {
        const href = attribute.value.trim()
        const isHttp = /^https?:\/\//i.test(href)
        const isInternal = href.startsWith('/') || href.startsWith('#')
        if (!isHttp && !isInternal) element.removeAttribute(attribute.name)
      }
    })
  })

  const stack: Node[] = [doc.body]
  while (stack.length > 0) {
    const node = stack.pop()
    if (!node) break
    for (const child of node.childNodes) {
      if (child.nodeType === child.TEXT_NODE) {
        child.textContent = applyDiacriticsPreference(child.textContent ?? '', diacriticsPreference)
      } else {
        stack.push(child)
      }
    }
  }

  return doc.body.innerHTML
}

export function I18nProvider({ children }: { children: ComponentChildren }) {
  const { lang } = useRouting()

  const [diacriticsPreference, setDiacriticsPreferenceState] = useState<DiacriticsPreference>(() => {
    const stored = readPreference(DIACRITICS_STORAGE_KEY)
    return stored === 'all' || stored === 'some' || stored === 'none' ? stored : 'some'
  })

  const setDiacriticsPreference = useCallback(
    (next: DiacriticsPreference) => {
      setDiacriticsPreferenceState(next)
      writePreference(DIACRITICS_STORAGE_KEY, next)
    },
    [setDiacriticsPreferenceState],
  )

  useEffect(() => {
    const { dir } = TRANSLATIONS[lang]
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang])

  const value = useMemo<I18nContextValue>(() => {
    const current = TRANSLATIONS[lang] ?? TRANSLATIONS[DEFAULT_LANGUAGE]

    return {
      lang,
      dir: current.dir,
      t: (key, params) => {
        const template = current.strings[key] || current.verbs?.[key] || key
        const rendered = typeof template === 'string' ? format(template, params) : key
        return lang === 'ar' ? applyDiacriticsPreference(rendered, diacriticsPreference) : rendered
      },
      tHtml: (key, params) => {
        const template = current.strings[key] || key
        const rendered = typeof template === 'string' ? format(template, params) : key
        return sanitizeHtml(rendered, diacriticsPreference)
      },
      diacriticsPreference,
      setDiacriticsPreference,
    }
  }, [lang, diacriticsPreference, setDiacriticsPreference])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within an I18nProvider')
  return ctx
}
