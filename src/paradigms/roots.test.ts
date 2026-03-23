import { describe, expect, test } from 'vitest'
import { getRootType } from './roots'

describe('getRootType', () => {
  test('returns regular for a plain triliteral root', () => {
    expect(getRootType('كتب')).toBe('regular')
  })

  test('returns weak when root contains و', () => {
    expect(getRootType('وجد')).toBe('weak')
  })

  test('returns weak when root contains ي', () => {
    expect(getRootType('رمي')).toBe('weak')
  })

  test('returns hamzated when root contains ء', () => {
    expect(getRootType('أمر')).toBe('hamzated')
  })

  test('weak takes priority over hamzated', () => {
    expect(getRootType('ءوي')).toBe('weak')
  })
})
