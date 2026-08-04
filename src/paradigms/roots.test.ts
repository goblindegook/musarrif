import { describe, expect, test } from 'vitest'
import { analyzeRoot } from './roots'
import { tokenize } from './tokens'

describe('analyzeRoot', () => {
  test.each([
    ['كتب', 'sound', [], []],
    ['قام', 'hollow-yaa', [1], []],
    ['دعو', 'defective-waw', [2], []],
    ['وصل', 'assimilated', [0], []],
    ['وقي', 'doubly-weak-yaa', [0, 2], []],
    ['روي', 'doubly-weak-waw', [1, 2], []],
    ['ءكل', 'hamzated', [], [0]],
    ['أول', 'hamzated-hollow-waw', [1], [0]],
    ['ءوي', 'hamzated-hollow-defective', [1, 2], [0]],
    ['ءتى', 'hamzated-defective-yaa', [2], [0]],
  ])('identifies %s as %s', (root, type, weakPositions, hamzaPositions) => {
    expect(analyzeRoot(tokenize(root))).toEqual({ type, weakPositions, hamzaPositions, isBiliteral: false })
  })

  test('analyzeRoot returns doubled for مدد', () => {
    expect(analyzeRoot(tokenize('مدد'))).toEqual({
      type: 'doubled',
      weakPositions: [],
      hamzaPositions: [],
      isBiliteral: false,
    })
  })

  test('analyzeRoot returns doubled for ردد', () => {
    expect(analyzeRoot(tokenize('ردد'))).toEqual({
      type: 'doubled',
      weakPositions: [],
      hamzaPositions: [],
      isBiliteral: false,
    })
  })

  test('analyzeRoot returns hamzated-doubled for أمم', () => {
    expect(analyzeRoot(tokenize('أمم'))).toEqual({
      type: 'hamzated-doubled',
      weakPositions: [],
      hamzaPositions: [0],
      isBiliteral: false,
    })
  })

  test('analyzeRoot sound root is unaffected', () => {
    expect(analyzeRoot(tokenize('كتب')).type).toBe('sound')
  })

  test('analyzeRoot hollow root returns the specific weak variant', () => {
    expect(analyzeRoot(tokenize('قول')).type).toBe('hollow-waw')
  })

  test('analyzeRoot flags a reduplicated quadriliteral root as biliteral', () => {
    expect(analyzeRoot(tokenize('زلزل')).isBiliteral).toBe(true)
  })

  test('analyzeRoot keeps type hamzated and flags isBiliteral for a reduplicated root with a hamza', () => {
    expect(analyzeRoot(tokenize('ءلءل'))).toMatchObject({ type: 'hamzated', isBiliteral: true })
  })

  test('analyzeRoot keeps type doubly-weak-waw and flags isBiliteral for a reduplicated root with weak letters', () => {
    expect(analyzeRoot(tokenize('ولول'))).toMatchObject({ type: 'doubly-weak-waw', isBiliteral: true })
  })

  test('analyzeRoot does not flag a triliteral root as biliteral', () => {
    expect(analyzeRoot(tokenize('كتب')).isBiliteral).toBe(false)
  })
})
