import { describe, expect, test } from 'vitest'
import { analyzeRoot } from './roots'

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
    expect(analyzeRoot(root)).toEqual({ type, weakPositions, hamzaPositions })
  })

  test('analyzeRoot returns doubled for مدد', () => {
    expect(analyzeRoot('مدد')).toEqual({ type: 'doubled', weakPositions: [], hamzaPositions: [] })
  })

  test('analyzeRoot returns doubled for ردد', () => {
    expect(analyzeRoot('ردد')).toEqual({ type: 'doubled', weakPositions: [], hamzaPositions: [] })
  })

  test('analyzeRoot returns hamzated-doubled for أمم', () => {
    expect(analyzeRoot('أمم')).toEqual({ type: 'hamzated-doubled', weakPositions: [], hamzaPositions: [0] })
  })

  test('analyzeRoot sound root is unaffected', () => {
    expect(analyzeRoot('كتب').type).toBe('sound')
  })

  test('analyzeRoot hollow root returns the specific weak variant', () => {
    expect(analyzeRoot('قول').type).toBe('hollow-waw')
  })
})
