/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import { describe, expect, test } from 'vitest'
import { analyzeRoot, buildVerb } from './verbs'

describe('buildSyntheticVerb', () => {
  test('Form I', () => {
    const verb = buildVerb('كتب', 1, 'fa3ala-yaf3ulu')
    expect(verb).toEqual({
      id: 'ktb-1',
      form: 1,
      formPattern: 'fa3ala-yaf3ulu',
      masdarPatterns: ['fi3aal'],
      label: 'كَتَبَ',
      root: 'كتب',
      rootId: 'ktb',
    })
  })

  test('Forms II-X', () => {
    const verb = buildVerb('كتب', 2)
    expect(verb).toEqual({
      form: 2,
      id: 'ktb-2',
      label: 'كَتَّبَ',
      root: 'كتب',
      rootId: 'ktb',
    })
  })
})

describe('analyzeRoot', () => {
  test.each([
    ['كتب', 'strong', [], []],
    ['قام', 'hollow', [1], []],
    ['دعو', 'defective', [2], []],
    ['وصل', 'assimilated', [0], []],
    ['وقي', 'doubly-weak', [0, 2], []],
    ['روي', 'doubly-weak', [1, 2], []],
    ['ءكل', 'hamzated', [], [0]],
    ['ءوي', 'hamzated-hollow-defective', [1, 2], [0]],
    ['ءتى', 'hamzated-defective', [2], [0]],
  ])('identifies %s as %s', (root, type, weakPositions, hamzaPositions) => {
    expect(analyzeRoot(root)).toEqual({ type, weakPositions, hamzaPositions })
  })
})
