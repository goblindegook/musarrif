import { describe, expect, test } from 'vitest'
import { hasAppRoute } from './app-route'

describe('hasAppRoute', () => {
  test.each([
    ['/', '#/verbs'],
    ['/', '#/verbs/ktb-1'],
    ['/', '#/test'],
  ])('matches the legacy hash route %s%s', (pathname, hash) => {
    expect(hasAppRoute({ pathname, hash })).toBe(true)
  })

  test.each([['/verbs'], ['/verbs/'], ['/verbs/ktb-1/'], ['/verbs/ktb-1/active/past/'], ['/test'], ['/test/']])(
    'matches the path route %s',
    (pathname) => {
      expect(hasAppRoute({ pathname, hash: '' })).toBe(true)
    },
  )

  test.each([['/'], ['/about/'], ['/verbsomething/']])('leaves %s to the landing page', (pathname) => {
    expect(hasAppRoute({ pathname, hash: '' })).toBe(false)
  })
})
