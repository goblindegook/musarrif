import { act, cleanup, render, renderHook, screen } from '@testing-library/preact'
import type { ComponentChildren, VNode } from 'preact'
import { afterEach, expect, test, vi } from 'vitest'
import { createRouting } from './useRouting'

type DemoRoute = readonly ['home'] | readonly ['article', id: string] | readonly ['test']

const { Route, Router } = createRouting<DemoRoute>({
  mode: 'hash',
  parse: () => ['home'],
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

test('renders the first matching route', () => {
  const route: DemoRoute = ['test']

  render(
    <Router route={route}>
      <Route path="/home">
        <div>HOME</div>
      </Route>
      <Route path="/test">
        <div>TEST</div>
      </Route>
      <Route>
        <div>FALLBACK</div>
      </Route>
    </Router>,
  )

  expect(screen.getByText('TEST')).toBeInTheDocument()
})

test('renders fallback route when no matcher matches', () => {
  const route: DemoRoute = ['article', '42']

  render(
    <Router route={route}>
      <Route path="/home">
        <div>HOME</div>
      </Route>
      <Route>
        <div>FALLBACK</div>
      </Route>
    </Router>,
  )

  expect(screen.getByText('FALLBACK')).toBeInTheDocument()
})

test('supports render-function children and passes route value', () => {
  const route: DemoRoute = ['article', 'ktb-1']

  render(
    <Router route={route}>
      <Route path="/article/:id">{({ id }) => <div>ARTICLE:{id}</div>}</Route>
    </Router>,
  )

  expect(screen.getByText('ARTICLE:ktb-1')).toBeInTheDocument()
})

test('supports path patterns with inferred params', () => {
  const route: DemoRoute = ['article', 'ktb-1']

  render(
    <Router route={route}>
      <Route path="/article/:id">{({ id }) => <div>PATH_ARTICLE:{id}</div>}</Route>
    </Router>,
  )

  expect(screen.getByText('PATH_ARTICLE:ktb-1')).toBeInTheDocument()
})

test('renders nothing when there is no match and no fallback', () => {
  const route: DemoRoute = ['test']

  const { container } = render(
    <Router route={route}>
      <Route path="/home">
        <div>HOME</div>
      </Route>
    </Router>,
  )

  expect(container.textContent).toBe('')
})

test('exposes query params from hash routes', () => {
  const { RoutingProvider, useRouting: useDemoRouting } = createRouting<DemoRoute>({
    mode: 'hash',
    parse: () => ['home'],
  })
  const wrapper = ({ children }: { children: ComponentChildren }) => <RoutingProvider>{children}</RoutingProvider>

  window.history.replaceState({}, '', '/#/home?form=2&page=3')

  const { result } = renderHook(() => useDemoRouting(), { wrapper })
  expect(result.current.queryParams.get('form')).toBe('2')
  expect(result.current.queryParams.get('page')).toBe('3')
})

test('updates query params through useRouting setter', () => {
  const { RoutingProvider, useRouting: useDemoRouting } = createRouting<DemoRoute>({
    mode: 'hash',
    parse: () => ['home'],
  })
  const wrapper = ({ children }: { children: ComponentChildren }) => <RoutingProvider>{children}</RoutingProvider>

  window.history.replaceState({}, '', '/#/home?form=2&page=3')

  const { result } = renderHook(() => useDemoRouting(), { wrapper })
  act(() => {
    result.current.setQueryParams(new URLSearchParams([['form', '4']]))
  })

  expect(window.location.hash).toBe('#/home?form=4')
  expect(result.current.queryParams.get('form')).toBe('4')
  expect(result.current.queryParams.get('page')).toBeNull()
})

test('scrolls to top when navigating to a new route', () => {
  const { RoutingProvider, useRouting: useDemoRouting } = createRouting<DemoRoute>({
    mode: 'hash',
    parse: (segments) => (segments[0] === 'article' ? ['article', segments[1]] : ['home']),
  })
  const wrapper = ({ children }: { children: ComponentChildren }) => <RoutingProvider>{children}</RoutingProvider>
  const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

  const { result } = renderHook(() => useDemoRouting(), { wrapper })
  act(() => {
    result.current.navigateTo(['article', '42'])
  })

  expect(window.location.hash).toBe('#/article/42')
  expect(scrollSpy).toHaveBeenCalledWith(0, 0)
})

const articleRouting = (mode: 'hash' | 'path') =>
  createRouting<DemoRoute>({
    mode,
    parse: (segments) => (segments[0] === 'article' ? ['article', segments[1]] : ['home']),
  })

const wrapperFor =
  (RoutingProvider: (props: { children: ComponentChildren }) => VNode) =>
  ({ children }: { children: ComponentChildren }) => <RoutingProvider>{children}</RoutingProvider>

test('builds hash hrefs with a leading hash and no trailing slash', () => {
  const { RoutingProvider, useRouting: useDemoRouting } = articleRouting('hash')

  window.history.replaceState({}, '', '/#/home')
  const { result } = renderHook(() => useDemoRouting(), { wrapper: wrapperFor(RoutingProvider) })

  expect(result.current.toHref(['article', '42'])).toBe('#/article/42')
})

test('builds path hrefs with a trailing slash', () => {
  const { RoutingProvider, useRouting: useDemoRouting } = articleRouting('path')

  window.history.replaceState({}, '', '/article/42/')
  const { result } = renderHook(() => useDemoRouting(), { wrapper: wrapperFor(RoutingProvider) })

  expect(result.current.toHref(['article', '42'])).toBe('/article/42/')
})

test('builds the root path href for an empty route', () => {
  const { RoutingProvider, useRouting: useDemoRouting } = articleRouting('path')

  window.history.replaceState({}, '', '/')
  const { result } = renderHook(() => useDemoRouting(), { wrapper: wrapperFor(RoutingProvider) })

  expect(result.current.toHref([] as unknown as DemoRoute)).toBe('/')
})

test('parses the route from the pathname in path mode', () => {
  const { RoutingProvider, useRouting: useDemoRouting } = articleRouting('path')

  window.history.replaceState({}, '', '/article/42/')
  const { result } = renderHook(() => useDemoRouting(), { wrapper: wrapperFor(RoutingProvider) })

  expect(result.current.route).toEqual(['article', '42'])
})

test('resolves a legacy hash URL to the same route in path mode', () => {
  const { RoutingProvider, useRouting: useDemoRouting } = articleRouting('path')

  window.history.replaceState({}, '', '/#/article/42')
  const { result } = renderHook(() => useDemoRouting(), { wrapper: wrapperFor(RoutingProvider) })

  expect(result.current.route).toEqual(['article', '42'])
})

test('rewrites a legacy hash URL to its path form and drops the fragment', () => {
  const { RoutingProvider, useRouting: useDemoRouting } = articleRouting('path')

  window.history.replaceState({}, '', '/#/article/42')
  renderHook(() => useDemoRouting(), { wrapper: wrapperFor(RoutingProvider) })

  expect(`${window.location.pathname}${window.location.hash}`).toBe('/article/42/')
})

test('reads query params from a legacy hash URL in path mode', () => {
  const { RoutingProvider, useRouting: useDemoRouting } = articleRouting('path')

  window.history.replaceState({}, '', '/#/article/42?form=2')
  const { result } = renderHook(() => useDemoRouting(), { wrapper: wrapperFor(RoutingProvider) })

  expect(result.current.queryParams.get('form')).toBe('2')
})

test('scrolls to top when route changes via hashchange event', () => {
  const { RoutingProvider, useRouting: useDemoRouting } = createRouting<DemoRoute>({
    mode: 'hash',
    parse: (segments) => (segments[0] === 'article' ? ['article', segments[1]] : ['home']),
  })
  const wrapper = ({ children }: { children: ComponentChildren }) => <RoutingProvider>{children}</RoutingProvider>
  const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

  window.history.replaceState({}, '', '/#/home')
  const { result } = renderHook(() => useDemoRouting(), { wrapper })
  scrollSpy.mockClear()

  act(() => {
    window.history.replaceState({}, '', '/#/article/42')
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  })

  expect(result.current.route).toEqual(['article', '42'])
  expect(scrollSpy).toHaveBeenCalledWith(0, 0)
})
