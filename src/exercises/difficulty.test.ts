import { describe, expect, test } from 'vitest'
import { getRootType } from '../paradigms/roots'
import { randomVerb } from './difficulty'

describe('randomVerb', () => {
  test('returns a verb with no constraints', () => {
    expect(randomVerb()).toBeDefined()
  })

  test('filters by form when constraint provided', () => {
    const verb = randomVerb({ form: 2 })
    expect(verb.form).toBe(2)
  })

  test('filters by rootType when constraint provided', () => {
    const verb = randomVerb({ rootType: 'weak' })
    expect(getRootType(verb.root)).toBe('weak')
  })

  test('falls back to using full pool when no verbs match constraints', () => {
    expect(randomVerb({ form: 9, rootType: 'hamzated' })).toBeDefined()
  })
})
