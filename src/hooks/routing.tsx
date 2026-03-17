import type { ComponentChildren } from 'preact'
import { createContext } from 'preact'
import { useCallback, useContext, useEffect, useMemo, useState } from 'preact/hooks'
import type { Mood } from '../paradigms/active/present'
import type { Tense, Voice } from '../paradigms/verbs'

interface RouteParams {
  verbId?: string
  voice?: Voice
  tense?: Tense
  mood?: Mood
}

interface RoutingContextValue extends RouteParams {
  navigateToVerb: (verbId?: string, voice?: Voice, tense?: Tense, mood?: Mood) => void
}

const RoutingContext = createContext<RoutingContextValue | undefined>(undefined)

const BASE_PATH = normalizeBasePath(import.meta.env.BASE_URL)
const SUPPORTED_VOICES: readonly Voice[] = ['active', 'passive']
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

function isTense(value: unknown): value is Tense {
  return typeof value === 'string' && (SUPPORTED_TENSES as readonly string[]).includes(value)
}

function isMood(value: unknown): value is Mood {
  return typeof value === 'string' && (SUPPORTED_MOODS as readonly string[]).includes(value)
}

function isVoice(value: unknown): value is Voice {
  return typeof value === 'string' && (SUPPORTED_VOICES as readonly string[]).includes(value)
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
  if (hashPath !== '/') {
    return hashPath
  }

  const fallbackPath = stripBasePath(window.location.pathname)
  if (!fallbackPath || fallbackPath === '/') {
    return '/'
  }
  return ensureLeadingSlash(fallbackPath)
}

function parsePath(pathname: string): RouteParams {
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

  const start = segments.at(0) === 'verbs' ? 1 : 0

  const verbId = segments.at(start)
  const voiceSegment = segments.at(start + 1)
  const voice = isVoice(voiceSegment) ? voiceSegment : undefined

  if (voice) {
    const normalized = normalizeConjugation(segments[start + 2], segments[start + 3])
    return {
      verbId,
      voice,
      tense: segments.length > start + 2 ? normalized.tense : undefined,
      mood: segments.length > start + 3 && normalized.tense === 'present' ? normalized.mood : undefined,
    }
  }

  return {
    verbId,
    tense: undefined,
    mood: undefined,
  }
}

function buildHashPath({ verbId, voice, tense, mood }: RouteParams): string {
  const voiceSegment = tense ? `/${voice ?? 'active'}` : ''
  const tenseSegment = tense ? `/${tense}` : ''
  const moodSegment = tense === 'present' && mood ? `/${mood}` : ''
  const verbSegment = verbId ? `/${encodeURIComponent(verbId)}${voiceSegment}${tenseSegment}${moodSegment}` : ''
  return `/verbs${verbSegment}`
}

function buildUrl(state: RouteParams): string {
  const hashPath = buildHashPath(state)
  const baseWithTrailingSlash = BASE_PATH ? `${BASE_PATH}/` : '/'
  const normalizedHash = hashPath.startsWith('/') ? `#${hashPath}` : `#/${hashPath}`
  return `${baseWithTrailingSlash}${window.location.search}${normalizedHash}`
}

export function buildVerbHref(id: string): string {
  const baseWithTrailingSlash = BASE_PATH ? `${BASE_PATH}/` : '/'
  const encodedId = encodeURIComponent(id)
  return `${baseWithTrailingSlash}#/verbs/${encodedId}`
}

export function RoutingProvider({ children }: { children: ComponentChildren }) {
  const [route, setRoute] = useState<RouteParams>(() => parsePath(getCurrentPath()))

  useEffect(() => {
    const syncRouteFromLocation = () => {
      const currentPath = getCurrentPath()
      const parsed = parsePath(currentPath)
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
  }, [])

  const navigate = useCallback(
    ({ verbId, voice, tense, mood }: RouteParams) => {
      const normalized = normalizeConjugation(tense, mood)
      const normalizedVoice = isVoice(voice) ? voice : undefined
      const nextState: RouteParams = {
        verbId,
        voice: normalizedVoice,
        tense: normalized.tense,
        mood: normalized.mood,
      }
      window.history.pushState({}, '', buildUrl(nextState))
      setRoute(nextState)
    },
    [setRoute],
  )

  const value = useMemo<RoutingContextValue>((): RoutingContextValue => {
    return {
      ...route,
      navigateToVerb: (verbId, voice, tense, mood) => navigate({ verbId, voice, tense, mood }),
    }
  }, [route.verbId, route.voice, route.tense, route.mood])

  return <RoutingContext.Provider value={value}>{children}</RoutingContext.Provider>
}

export function useRouting(): RoutingContextValue {
  const ctx = useContext(RoutingContext)
  if (!ctx) throw new Error('useRouting must be used within a RoutingProvider')
  return ctx
}
