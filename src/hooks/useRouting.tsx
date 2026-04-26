import type { ComponentChildren } from 'preact'
import { createContext } from 'preact'
import { useCallback, useContext, useEffect, useMemo, useState } from 'preact/hooks'
import type { Mood, NonPresentTense, Voice } from '../paradigms/tense'
import { isMood, isTense, isVoice } from '../paradigms/tense'

type HomeRoute = readonly ['verbs']
type VerbRoute = readonly ['verbs', verbId: string]
type VerbNonPresentRoute = readonly ['verbs', verbId: string, voice: Voice, tense: NonPresentTense]
type VerbPresentRoute = readonly ['verbs', verbId: string, voice: Voice, tense: 'present', mood?: Mood]
type VerbImperativeRoute = readonly ['verbs', verbId: string, voice: 'active', tense: 'imperative']
type TestRoute = readonly ['test']
type AppRoute = HomeRoute | VerbRoute | VerbPresentRoute | VerbNonPresentRoute | VerbImperativeRoute | TestRoute

interface RoutingContextValue<T> {
  route: T
  navigateTo: (route: T) => void
}

const RoutingContext = createContext<RoutingContextValue<AppRoute> | undefined>(undefined)

function sanitizeRoute(segments: readonly string[]): AppRoute {
  if (segments.at(0) === 'test') return ['test']

  const start = segments.at(0) === 'verbs' ? 1 : 0

  const verbId = segments.at(start)
  if (!verbId) return ['verbs']

  const voiceSegment = segments.at(start + 1)
  const voice = isVoice(voiceSegment) ? voiceSegment : undefined
  if (!voice) return ['verbs', verbId]

  const tense = segments.at(start + 2)
  if (!isTense(tense)) return ['verbs', verbId]

  if (tense === 'present') {
    const moodSegment = segments.at(start + 3)
    const mood = isMood(moodSegment) ? moodSegment : undefined
    if (!mood) return ['verbs', verbId, voice, 'present']

    return ['verbs', verbId, voice, 'present', mood]
  }

  if (tense === 'imperative') {
    if (voice === 'passive') return ['verbs', verbId, 'passive', 'past']

    return ['verbs', verbId, 'active', 'imperative']
  }

  return ['verbs', verbId, voice, tense]
}

export function buildUrl(route: AppRoute): string {
  return (
    '#/' +
    route
      .filter(Boolean)
      // biome-ignore lint/style/noNonNullAssertion: never undefined
      .map((component) => encodeURIComponent(component!))
      .join('/')
  )
}

function getUnsafeRoute(): readonly string[] {
  return window.location.hash
    .replace(/^#/, '')
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment)
      } catch {
        return segment
      }
    })
}

export function RoutingProvider({ children }: { children: ComponentChildren }) {
  const [route, setRoute] = useState<AppRoute>(() => sanitizeRoute(getUnsafeRoute()))

  useEffect(() => {
    const controller = new AbortController()

    const syncRouteFromLocation = () => {
      const routeFromLocation = sanitizeRoute(getUnsafeRoute())
      window.history.replaceState({}, '', buildUrl(routeFromLocation))
      setRoute(routeFromLocation)
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

  const value = useMemo(() => ({ route, navigateTo }), [route, navigateTo])

  return <RoutingContext.Provider value={value}>{children}</RoutingContext.Provider>
}

export function useRouting() {
  const ctx = useContext(RoutingContext)
  if (!ctx) throw new Error('useRouting must be used within a RoutingProvider')
  return ctx
}
