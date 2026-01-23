import { describe, expect, it } from 'vitest'
import { analyzeRoot, applyDiacriticsPreference, type DiacriticsPreference } from './letters'

describe('analyzeRoot', () => {
  it.each([
    ['كتب', 'strong', [], []],
    ['قام', 'hollow', [1], []],
    ['دعا', 'defective', [2], []],
    ['وصل', 'assimilated', [0], []],
    ['وقي', 'doubly-weak', [0, 2], []],
    ['روي', 'doubly-weak', [1, 2], []],
    ['أكل', 'hamzated', [], [0]],
    ['أوي', 'hamzated-hollow-defective', [1, 2], [0]],
    ['أتى', 'hamzated-defective', [2], [0]],
  ])('identifies %s as %s', (root, type, weakPositions, hamzaPositions) => {
    expect(analyzeRoot(root)).toEqual({ type, weakPositions, hamzaPositions })
  })
})

it.each([
  ['some', 'يَقُولُ', 'يَقولُ'],
  ['some', 'سِيرَة', 'سيرَة'],
  ['some', 'يَكْتُبُ', 'يَكتُبُ'],
  ['some', 'سْو', 'سْو'],
  ['some', 'كَتَبَ', 'كَتَبَ'],
  ['none', 'يَقُولُ', 'يقول'],
  ['all', 'يَقُولُ', 'يَقُولُ'],
])('showing %s of the diacritics for %s yields %s', (preference, input: string, expected: string) => {
  expect(applyDiacriticsPreference(input, preference as DiacriticsPreference)).toEqualT(expected)
})
