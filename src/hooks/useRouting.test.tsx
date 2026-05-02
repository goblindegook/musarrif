import { cleanup, render, screen } from '@testing-library/preact'
import { afterEach, expect, test } from 'vitest'
import { createRouting } from './useRouting'

type DemoRoute = readonly ['home'] | readonly ['article', id: string] | readonly ['test']

const { Route, Router } = createRouting<DemoRoute>({
  parse: () => ['home'],
})

afterEach(() => {
  cleanup()
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
