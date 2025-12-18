import type { ComponentChildren } from 'preact'
import { createContext } from 'preact'
import { useCallback, useContext, useEffect, useMemo, useState } from 'preact/hooks'
import type { Mood } from '../paradigms/active/present'
import type { Tense } from '../paradigms/verbs'
import { DEFAULT_LANGUAGE, isLanguageSupported, type Language } from './i18n'
import { LANGUAGE_STORAGE_KEY, readPreference, writePreference } from './preferences'

interface RoutingState {
  lang: Language
  verbId?: string
  tense?: Tense
  mood?: Mood
}

interface RoutingContextValue extends RoutingState {
  setLang: (lang: string) => void
  navigateToVerb: (verbId?: string, tense?: Tense, mood?: Mood) => void
}

const RoutingContext = createContext<RoutingContextValue | undefined>(undefined)

const BASE_PATH = normalizeBasePath(import.meta.env.BASE_URL)
const SUPPORTED_TENSES: readonly Tense[] = ['past', 'present', 'future', 'imperative']
const SUPPORTED_MOODS: readonly Mood[] = ['indicative', 'subjunctive', 'jussive']

function normalizeBasePath(value: string | undefined): string {
  const trimmed = value?.trim()
  if (!trimmed || trimmed === '/') return ''
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeading.replace(/\/+$/, '')
}

function ensureLeadingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`
}

function stripBasePath(pathname: string): string {
  if (!BASE_PATH) return pathname
  if (pathname === BASE_PATH) return '/'
  if (pathname.startsWith(`${BASE_PATH}/`)) return pathname.slice(BASE_PATH.length)
  return pathname
}

function hasLanguageSegment(pathname: string): boolean {
  const segments = stripBasePath(pathname).split('/').filter(Boolean)
  return isLanguageSupported(segments.at(0))
}

function isTense(value: unknown): value is Tense {
  return typeof value === 'string' && (SUPPORTED_TENSES as readonly string[]).includes(value)
}

function isMood(value: unknown): value is Mood {
  return typeof value === 'string' && (SUPPORTED_MOODS as readonly string[]).includes(value)
}

function normalizeConjugation(tense?: string | Tense, mood?: string | Mood): { tense?: Tense; mood?: Mood } {
  return {
    tense: isTense(tense) ? tense : undefined,
    mood: isMood(mood) ? mood : undefined,
  }
}

function normalizeHashPath(hash: string): string {
  const withoutHash = hash.startsWith('#') ? hash.slice(1) : hash
  if (!withoutHash) return '/'
  return ensureLeadingSlash(withoutHash)
}

function getCurrentPath(): string {
  const hashPath = normalizeHashPath(window.location.hash)
  if (hashPath !== '/' || hasLanguageSegment(hashPath)) {
    return hashPath
  }

  const fallbackPath = stripBasePath(window.location.pathname)
  if (!fallbackPath || fallbackPath === '/') {
    return '/'
  }
  return ensureLeadingSlash(fallbackPath)
}

function parsePath(pathname: string, fallbackLang: Language = DEFAULT_LANGUAGE): RoutingState {
  const effectivePath = stripBasePath(pathname)
  const segments = effectivePath
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment)
      } catch {
        return segment
      }
    })
  const maybeLanguage = segments.at(0) as Language | undefined
  if (isLanguageSupported(maybeLanguage)) {
    const hasActive = segments[2] === 'active'
    if (hasActive) {
      const normalized = normalizeConjugation(segments[3], segments[4])
      return {
        lang: maybeLanguage,
        verbId: segments.at(1),
        tense: segments.length >= 4 ? normalized.tense : undefined,
        mood: segments.length >= 5 && normalized.tense === 'present' ? normalized.mood : undefined,
      }
    }
    return {
      lang: maybeLanguage,
      verbId: segments.at(1),
      tense: undefined,
      mood: undefined,
    }
  }

  const hasActive = segments[1] === 'active'
  if (hasActive) {
    const normalized = normalizeConjugation(segments[2], segments[3])
    return {
      lang: fallbackLang,
      verbId: segments.at(0),
      tense: segments.length >= 3 ? normalized.tense : undefined,
      mood: segments.length >= 4 && normalized.tense === 'present' ? normalized.mood : undefined,
    }
  }

  return {
    lang: fallbackLang,
    verbId: segments.at(0),
    tense: undefined,
    mood: undefined,
  }
}

function buildHashPath({ lang, verbId, tense, mood }: RoutingState): string {
  const activeSegment = tense ? '/active' : ''
  const tenseSegment = tense ? `/${tense}` : ''
  const moodSegment = tense === 'present' && mood ? `/${mood}` : ''
  const verbSegment = verbId ? `/${encodeURIComponent(verbId)}${activeSegment}${tenseSegment}${moodSegment}` : ''
  return `/${lang}${verbSegment}`
}

function buildUrl(state: RoutingState): string {
  const hashPath = buildHashPath(state)
  const baseWithTrailingSlash = BASE_PATH ? `${BASE_PATH}/` : '/'
  const normalizedHash = hashPath.startsWith('/') ? `#${hashPath}` : `#/${hashPath}`
  return `${baseWithTrailingSlash}${window.location.search}${normalizedHash}`
}

export function buildVerbHref(lang: Language, id: string): string {
  const baseWithTrailingSlash = BASE_PATH ? `${BASE_PATH}/` : '/'
  const encodedId = encodeURIComponent(id)
  return `${baseWithTrailingSlash}#/${lang}/${encodedId}`
}

export function RoutingProvider({ children }: { children: ComponentChildren }) {
  const preferredLanguage = (() => {
    const storedLanguage = readPreference(LANGUAGE_STORAGE_KEY)
    if (storedLanguage && isLanguageSupported(storedLanguage)) return storedLanguage

    const browserLanguage = [...(navigator?.languages ?? []), navigator?.language ?? '']
      .filter(Boolean)
      .map((locale) => locale.toLowerCase().split('-').at(0))
      .find((language) => isLanguageSupported(language))
    if (browserLanguage) return browserLanguage

    return DEFAULT_LANGUAGE
  })()

  const [route, setRoute] = useState<RoutingState>(() => parsePath(getCurrentPath(), preferredLanguage))

  useEffect(() => {
    const syncRouteFromLocation = () => {
      const currentPath = getCurrentPath()
      const parsed = parsePath(currentPath, preferredLanguage)
      const currentHashPath = normalizeHashPath(window.location.hash)
      const targetHashPath = buildHashPath(parsed)
      if (currentHashPath !== targetHashPath) {
        window.history.replaceState({}, '', buildUrl(parsed))
      }
      setRoute(parsed)
    }
    syncRouteFromLocation()
    window.addEventListener('hashchange', syncRouteFromLocation)
    window.addEventListener('popstate', syncRouteFromLocation)
    return () => {
      window.removeEventListener('hashchange', syncRouteFromLocation)
      window.removeEventListener('popstate', syncRouteFromLocation)
    }
  }, [preferredLanguage])

  useEffect(() => {
    writePreference(LANGUAGE_STORAGE_KEY, route.lang)
  }, [route.lang])

  const navigate = useCallback(
    ({ lang, verbId, tense, mood }: RoutingState) => {
      const normalized = normalizeConjugation(tense, mood)
      const nextState: RoutingState = { lang, verbId, tense: normalized.tense, mood: normalized.mood }
      window.history.pushState({}, '', buildUrl(nextState))
      setRoute(nextState)
    },
    [setRoute],
  )

  const value = useMemo<RoutingContextValue>((): RoutingContextValue => {
    return {
      ...route,
      setLang: (lang) => navigate({ ...route, lang: isLanguageSupported(lang) ? lang : route.lang }),
      navigateToVerb: (verbId, tense, mood) => navigate({ ...route, verbId, tense, mood }),
    }
  }, [route.lang, route.verbId, route.tense, route.mood])

  return <RoutingContext.Provider value={value}>{children}</RoutingContext.Provider>
}

export function useRouting(): RoutingContextValue {
  const ctx = useContext(RoutingContext)
  if (!ctx) throw new Error('useRouting must be used within a RoutingProvider')
  return ctx
}
