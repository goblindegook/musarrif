import { expect, test } from 'vitest'
import { applyDiacriticsPreference, type DiacriticsPreference } from './letters'

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
