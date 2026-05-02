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

interface BaseRouteProps<TRoute> {
  children: RouteChildren<TRoute>
}

interface PathRouteProps<TRoute extends readonly (string | undefined)[], Path extends string>
  extends BaseRouteProps<TRoute extends TRoute ? RouteParamsForPath<TRoute, SplitPath<Path>> : never> {
  path: Path
}

interface RouterProps<TRoute> {
  route: TRoute
  children: ComponentChildren
}

interface RoutingContextValue<TRoute extends readonly (string | undefined)[]> {
  route: TRoute
  navigateTo: (route: TRoute) => void
  toHref: (route: TRoute) => string
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

function readSegments(mode: RoutingMode): readonly string[] {
  const path = mode === 'hash' ? window.location.hash.replace(/^#/, '') : window.location.pathname
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

    useEffect(() => {
      const syncRouteFromLocation = () => {
        const routeFromLocation = parse(readSegments(mode))
        window.history.replaceState({}, '', toHref(routeFromLocation))
        setRoute(routeFromLocation)
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
      },
      [toHref],
    )

    const value = useMemo<RoutingContextValue<TRoute>>(
      () => ({ route, navigateTo, toHref }),
      [route, navigateTo, toHref],
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
