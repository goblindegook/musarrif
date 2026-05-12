import type { ComponentChildren, VNode } from 'preact'
import { createContext, toChildArray } from 'preact'
import { useCallback, useContext, useEffect, useMemo, useState } from 'preact/hooks'

type RouteChildren<TRoute> = ComponentChildren | ((route: TRoute) => ComponentChildren)

type NormalizePath<Path extends string> = Path extends `/${infer Rest}` ? Rest : Path

type SplitPath<Path extends string> =
  NormalizePath<Path> extends `${infer Segment}/${infer Rest}`
    ? [Segment, ...SplitPath<Rest>]
    : NormalizePath<Path> extends ''
      ? []
      : [NormalizePath<Path>]

type RouteParamsForPath<
  Route extends readonly (string | undefined)[],
  Tokens extends readonly string[],
> = Tokens extends readonly [infer Token extends string, ...infer RestTokens extends string[]]
  ? Route extends readonly [infer Segment extends string | undefined, ...infer RestRoute extends (string | undefined)[]]
    ? Token extends `:${infer Param}`
      ? { [K in Param]: Exclude<Segment, undefined> } & RouteParamsForPath<RestRoute, RestTokens>
      : Segment extends Token
        ? RouteParamsForPath<RestRoute, RestTokens>
        : never
    : never
  : Route extends readonly []
    ? Record<never, never>
    : never

export interface BaseRouteProps<TRoute> {
  children: RouteChildren<TRoute>
}

export interface PathRouteProps<TRoute extends readonly (string | undefined)[], Path extends string>
  extends BaseRouteProps<TRoute extends TRoute ? RouteParamsForPath<TRoute, SplitPath<Path>> : never> {
  path: Path
}

export interface RouterProps<TRoute> {
  route: TRoute
  children: ComponentChildren
}

export interface RoutingContextValue<TRoute extends readonly (string | undefined)[]> {
  route: TRoute
  navigateTo: (route: TRoute) => void
  toHref: (route: TRoute) => string
  queryParams: URLSearchParams
  setQueryParams: (
    updater: URLSearchParams | ((current: URLSearchParams) => URLSearchParams),
    options?: { replace?: boolean },
  ) => void
}

type RoutingMode = 'hash' | 'path'

interface RoutingConfig<TRoute extends readonly (string | undefined)[]> {
  parse: (segments: readonly string[]) => TRoute
  mode?: RoutingMode
}

const isVNode = <T,>(node: ComponentChildren): node is VNode<T> =>
  typeof node === 'object' && node != null && 'props' in node

const renderRouteChildren = <TRoute,>(route: TRoute, children: RouteChildren<TRoute>) => {
  return typeof children === 'function' ? (children as (currentRoute: TRoute) => ComponentChildren)(route) : children
}

const normalizePath = (path: string): string => path.replace(/^#?\/?/, '').replace(/\/+$/, '')

function matchPath(routePath: string, pathPattern: string): Record<string, string> | null {
  const routeSegments = normalizePath(routePath).split('/').filter(Boolean)
  const patternSegments = normalizePath(pathPattern).split('/').filter(Boolean)
  if (routeSegments.length !== patternSegments.length) return null

  const params: Record<string, string> = {}
  for (let index = 0; index < patternSegments.length; index += 1) {
    const patternSegment = patternSegments[index]
    const routeSegment = routeSegments[index]
    if (patternSegment == null || routeSegment == null) return null

    if (patternSegment.startsWith(':')) {
      params[patternSegment.slice(1)] = routeSegment
      continue
    }

    if (patternSegment !== routeSegment) return null
  }

  return params
}

function splitPathAndQuery(path: string): { path: string; query: string } {
  const queryStart = path.indexOf('?')
  if (queryStart === -1) return { path, query: '' }
  return {
    path: path.slice(0, queryStart),
    query: path.slice(queryStart),
  }
}

function readSegments(mode: RoutingMode): readonly string[] {
  const rawPath = mode === 'hash' ? window.location.hash.replace(/^#/, '') : window.location.pathname
  const { path } = splitPathAndQuery(rawPath)
  return path
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

function readQuery(mode: RoutingMode): string {
  if (mode === 'hash') {
    const rawPath = window.location.hash.replace(/^#/, '')
    return splitPathAndQuery(rawPath).query
  }

  return window.location.search
}

function normalizeQuery(query: string): string {
  const trimmed = query.replace(/^\?/, '')
  return trimmed.length === 0 ? '' : `?${trimmed}`
}

function toQueryParams(query: string): URLSearchParams {
  return new URLSearchParams(query.replace(/^\?/, ''))
}

export function createRouting<TRoute extends readonly (string | undefined)[]>({
  mode = 'hash',
  parse,
}: RoutingConfig<TRoute>) {
  const RoutingContext = createContext<RoutingContextValue<TRoute> | undefined>(undefined)

  function Route<const TPath extends string>(_props: PathRouteProps<TRoute, TPath>): null
  function Route(_props: BaseRouteProps<TRoute>): null
  function Route(_props: BaseRouteProps<TRoute> | PathRouteProps<TRoute, string>) {
    return null
  }

  const toHref = (route: TRoute): string => {
    const path = route
      .filter((segment): segment is string => segment != null)
      .map((segment) => encodeURIComponent(segment))

    return [mode === 'path' ? '' : '#', ...path].join('/')
  }

  const Router = ({ route, children }: RouterProps<TRoute>) => {
    const routePath = route.filter((segment): segment is string => segment != null).join('/')

    for (const candidate of toChildArray(children)) {
      if (!isVNode<BaseRouteProps<TRoute>>(candidate) || candidate.type !== Route) continue
      const routeProps = candidate.props as BaseRouteProps<TRoute> & { path?: string }

      if (routeProps.path != null) {
        const params = matchPath(routePath, routeProps.path)
        if (params == null) continue
        return <>{renderRouteChildren(params, routeProps.children as RouteChildren<typeof params>)}</>
      }

      return <>{renderRouteChildren(route, routeProps.children)}</>
    }

    return null
  }

  const RoutingProvider = ({ children }: { children: ComponentChildren }) => {
    const [route, setRoute] = useState<TRoute>(() => parse(readSegments(mode)))
    const [query, setQuery] = useState(() => normalizeQuery(readQuery(mode)))

    useEffect(() => {
      const syncRouteFromLocation = () => {
        const routeFromLocation = parse(readSegments(mode))
        const queryFromLocation = normalizeQuery(readQuery(mode))
        const nextHref = `${toHref(routeFromLocation)}${queryFromLocation}`
        const currentHref =
          mode === 'hash' ? window.location.hash : `${window.location.pathname}${window.location.search}`

        if (currentHref !== nextHref) window.history.replaceState({}, '', nextHref)
        setRoute(routeFromLocation)
        setQuery(queryFromLocation)
      }

      syncRouteFromLocation()

      const controller = new AbortController()

      if (mode === 'hash') window.addEventListener('hashchange', syncRouteFromLocation, { signal: controller.signal })
      window.addEventListener('popstate', syncRouteFromLocation, { signal: controller.signal })

      return () => controller.abort()
    }, [parse, toHref, mode])

    const navigateTo = useCallback(
      (nextRoute: TRoute) => {
        window.history.pushState({}, '', toHref(nextRoute))
        setRoute(nextRoute)
        setQuery('')
      },
      [toHref],
    )

    const setQueryParams = useCallback(
      (updater: URLSearchParams | ((current: URLSearchParams) => URLSearchParams), options?: { replace?: boolean }) => {
        const currentParams = toQueryParams(query)
        const nextInput = typeof updater === 'function' ? updater(currentParams) : updater
        const nextQuery = normalizeQuery(nextInput.toString())
        const nextHref = `${toHref(route)}${nextQuery}`
        const currentHref =
          mode === 'hash' ? window.location.hash : `${window.location.pathname}${window.location.search}`

        if (currentHref === nextHref) return

        if (options?.replace === false) window.history.pushState({}, '', nextHref)
        else window.history.replaceState({}, '', nextHref)
        setQuery(nextQuery)
      },
      [mode, query, route, toHref],
    )

    const queryParams = useMemo(() => toQueryParams(query), [query])

    const value = useMemo<RoutingContextValue<TRoute>>(
      () => ({ route, navigateTo, toHref, queryParams, setQueryParams }),
      [route, navigateTo, queryParams, setQueryParams, toHref],
    )

    return <RoutingContext.Provider value={value}>{children}</RoutingContext.Provider>
  }

  const useRouting = () => {
    const ctx = useContext(RoutingContext)
    if (!ctx) throw new Error('useRouting must be used within a RoutingProvider')
    return ctx
  }

  return { Route, Router, RoutingProvider, useRouting }
}
