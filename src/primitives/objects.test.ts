import { describe, expect, test } from 'vitest'
import { pick } from './objects'

describe('pick', () => {
  test('returns an object containing only selected keys', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 })
  })
})
