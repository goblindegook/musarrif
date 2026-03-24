import { describe, expect, test } from 'vitest'
import { analyzeRoot, getRootType } from './roots'

describe('getRootType', () => {
  test('returns sound for a plain triliteral root', () => {
    expect(getRootType('كتب')).toBe('sound')
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

  test('returns doubled for a root where R2 === R3', () => {
    expect(getRootType('ردد')).toBe('doubled')
  })

  test('returns doubled for another doubled root', () => {
    expect(getRootType('مدد')).toBe('doubled')
  })

  test('returns weak for a hollow root (R2 is weak)', () => {
    expect(getRootType('قول')).toBe('weak')
  })

  test('returns weak for a defective root (R3 is weak)', () => {
    expect(getRootType('دعو')).toBe('weak')
  })

  test('returns hamzated for a hamzated root', () => {
    expect(getRootType('سأل')).toBe('hamzated')
  })

  test('weak takes priority over doubled when R2 === R3 and both are weak', () => {
    expect(getRootType('ووو')).toBe('weak')
  })
})

describe('analyzeRoot', () => {
  test.each([
    ['كتب', 'sound', [], []],
    ['قام', 'hollow', [1], []],
    ['دعو', 'defective', [2], []],
    ['وصل', 'assimilated', [0], []],
    ['وقي', 'doubly-weak', [0, 2], []],
    ['روي', 'doubly-weak', [1, 2], []],
    ['ءكل', 'hamzated', [], [0]],
    ['أول', 'hamzated-hollow', [1], [0]],
    ['ءوي', 'hamzated-hollow-defective', [1, 2], [0]],
    ['ءتى', 'hamzated-defective', [2], [0]],
  ])('identifies %s as %s', (root, type, weakPositions, hamzaPositions) => {
    expect(analyzeRoot(root)).toEqual({ type, weakPositions, hamzaPositions })
  })
})
