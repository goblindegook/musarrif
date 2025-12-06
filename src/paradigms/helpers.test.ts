import { expect, it } from 'vitest'
import { applyDiacriticsPreference, type DiacriticsPreference } from './helpers'

it.each([
  ['some', 'يَقُولُ', 'يَقولُ'],
  ['some', 'سِيرَة', 'سيرَة'],
  ['some', 'يَكْتُبُ', 'يَكتُبُ'],
  ['some', 'سْو', 'سْو'],
  ['some', 'كَتَبَ', 'كَتَبَ'],
  ['none', 'يَقُولُ', 'يقول'],
  ['all', 'يَقُولُ', 'يَقُولُ'],
])('showing %s of the diacritics for %s yields %s', (preference, input: string, expected: string) => {
  expect(applyDiacriticsPreference(input, preference as DiacriticsPreference)).toBe(expected)
})
