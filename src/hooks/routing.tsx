import type { ComponentChildren } from 'preact'
import { createContext } from 'preact'
import { useCallback, useContext, useEffect, useMemo, useState } from 'preact/hooks'
import type { Mood, NonPresentTense, Tense, Voice } from '../paradigms/tense'

interface TestRoute {
  page: 'test'
}

interface ConjugationIndexRoute {
  page: 'conjugation'
  verbId?: never
  voice?: never
  tense?: never
  mood?: never
}

interface VerbRoute {
  page: 'conjugation'
  verbId: string
  voice?: never
  tense?: never
  mood?: never
}

interface VerbPresentRoute {
  page: 'conjugation'
  verbId: string
  voice: Voice
  tense: 'present'
  mood?: Mood
}

interface VerbNonPresentRoute {
  page: 'conjugation'
  verbId: string
  voice: Voice
  tense: NonPresentTense
  mood?: never
}

interface VerbImperativeRoute {
  page: 'conjugation'
  verbId: string
  voice: 'active'
  tense: 'imperative'
  mood?: never
}

type AppRoute =
  | TestRoute
  | ConjugationIndexRoute
  | VerbRoute
  | VerbPresentRoute
  | VerbNonPresentRoute
  | VerbImperativeRoute

interface RoutingContextValue {
  route: AppRoute
  navigateTo: (route: AppRoute) => void
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

function parseRoutePath(pathname: string): AppRoute {
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

  if (segments.at(0) === 'test') return { page: 'test' }

  const start = segments.at(0) === 'verbs' ? 1 : 0

  const verbId = segments.at(start)
  if (!verbId) return { page: 'conjugation' }

  const voiceSegment = segments.at(start + 1)
  const voice = isVoice(voiceSegment) ? voiceSegment : undefined
  if (!voice) return { page: 'conjugation', verbId }

  const tense = segments.at(start + 2)
  if (!isTense(tense)) return { page: 'conjugation', verbId }

  if (tense === 'present') {
    const moodSegment = segments.at(start + 3)
    const mood = isMood(moodSegment) ? moodSegment : undefined
    if (!mood) return { page: 'conjugation', verbId, voice, tense: 'present' }

    return { page: 'conjugation', verbId, voice, tense: 'present', mood }
  }

  if (tense === 'imperative') {
    if (voice === 'passive') return { page: 'conjugation', verbId, voice: 'passive', tense: 'past' }

    return { page: 'conjugation', verbId, voice: 'active', tense: 'imperative' }
  }

  return { page: 'conjugation', verbId, voice, tense }
}

function buildHashPath(route: AppRoute): string {
  if (route.page === 'test') return '/test'
  if (!route.verbId) return '/verbs'
  const base = `/verbs/${encodeURIComponent(route.verbId)}`
  if (!route.voice || !route.tense) return base
  if (route.tense === 'present' && route.mood) return `${base}/${route.voice}/${route.tense}/${route.mood}`
  return `${base}/${route.voice}/${route.tense}`
}

function buildUrl(route: AppRoute): string {
  const baseWithTrailingSlash = BASE_PATH ? `${BASE_PATH}/` : '/'
  const hashPath = buildHashPath(route)
  const normalizedHash = hashPath.startsWith('/') ? `#${hashPath}` : `#/${hashPath}`
  return `${baseWithTrailingSlash}${window.location.search}${normalizedHash}`
}

export function buildVerbHref(id: string): string {
  const baseWithTrailingSlash = BASE_PATH ? `${BASE_PATH}/` : '/'
  const encodedId = encodeURIComponent(id)
  return `${baseWithTrailingSlash}#/verbs/${encodedId}`
}

export function RoutingProvider({ children }: { children: ComponentChildren }) {
  const [route, setRoute] = useState<AppRoute>(() => parseRoutePath(getCurrentPath()))

  useEffect(() => {
    const controller = new AbortController()

    const syncRouteFromLocation = () => {
      const currentPath = getCurrentPath()
      const parsed = parseRoutePath(currentPath)
      const currentHashPath = normalizeHashPath(window.location.hash)
      const targetHashPath = buildHashPath(parsed)
      if (currentHashPath !== targetHashPath) window.history.replaceState({}, '', buildUrl(parsed))
      setRoute(parsed)
    }

    syncRouteFromLocation()
    window.addEventListener('hashchange', syncRouteFromLocation, { signal: controller.signal })
    window.addEventListener('popstate', syncRouteFromLocation, { signal: controller.signal })
    return () => controller.abort()
  }, [])

  const navigateTo = useCallback(
    (nextRoute: AppRoute) => {
      window.history.pushState({}, '', buildUrl(nextRoute))
      setRoute(nextRoute)
    },
    [setRoute],
  )

  const value = useMemo<RoutingContextValue>((): RoutingContextValue => ({ route, navigateTo }), [route, navigateTo])

  return <RoutingContext.Provider value={value}>{children}</RoutingContext.Provider>
}

export function useRouting(): RoutingContextValue {
  const ctx = useContext(RoutingContext)
  if (!ctx) throw new Error('useRouting must be used within a RoutingProvider')
  return ctx
}
