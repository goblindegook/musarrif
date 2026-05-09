import { describe, expect, test } from 'vitest'
import { applyDiacriticsPreference, spell, type DiacriticsPreference } from './letters'

test.each<[DiacriticsPreference, string, string]>([
  ['some', 'يَقُولُ', 'يَقولُ'],
  ['some', 'قَـالَ', 'قـالَ'],
  ['some', 'سِيرَة', 'سيرة'],
  ['some', 'يَكْتُبُ', 'يَكتُبُ'],
  ['some', 'سْو', 'سو'],
  ['some', 'كَتَبَ', 'كَتَبَ'],
  ['none', 'يَقُولُ', 'يقول'],
  ['all', 'يَقُولُ', 'يَقُولُ'],
])('showing %s of the diacritics for %s yields %s', (preference, input, expected) => {
  expect(applyDiacriticsPreference(input, preference)).toEqualT(expected)
})

describe('spell', () => {
  test('returns Arabic letter names for a root', () => {
    expect(spell('كتب')).toEqual(['كاف', 'تاء', 'باء'])
  })

  test('ignores spaces in the input', () => {
    expect(spell('ك ت ب')).toEqual(['كاف', 'تاء', 'باء'])
  })

  test('skips unknown symbols', () => {
    expect(spell('ك-ت-ب')).toEqual(['كاف', 'تاء', 'باء'])
  })
})
