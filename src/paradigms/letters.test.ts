import { transliterateReverse } from '@pacote/buckwalter'
import { expect, test } from 'vitest'
import {
  ALIF_HAMZA,
  ALIF_HAMZA_BELOW,
  ALIF_MADDA,
  applyDiacriticsPreference,
  type DiacriticsPreference,
  finalize,
  HAMZA,
  HAMZA_ON_WAW,
  HAMZA_ON_YEH,
  tokenize,
} from './letters'

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

test.each<[string, string, string, string]>([
  // initial
  ['', 'iT', 'below alif', ALIF_HAMZA_BELOW],
  ['', 'uT', 'on alif', ALIF_HAMZA],
  ['', 'aT', 'on alif', ALIF_HAMZA],
  ['', 'iyT', 'below alif', ALIF_HAMZA_BELOW],
  ['', 'uwT', 'on alif', ALIF_HAMZA],
  ['', 'aAT', 'on alif', ALIF_MADDA],

  // before last
  ['Ti', 'T', 'on yeh', HAMZA_ON_YEH],
  ['Tu', 'T', 'on waw', HAMZA_ON_WAW],
  ['Ta', 'T', 'on alif', ALIF_HAMZA],
  ['Tiy', 'T', 'on yeh', HAMZA_ON_YEH],
  ['Tuw', 'T', 'on the line', HAMZA],
  ['TaA', 'T', 'on the line', HAMZA],

  // final
  ['Ti', '', 'on yeh', HAMZA_ON_YEH],
  ['Tu', '', 'on waw', HAMZA_ON_WAW],
  ['Ta', '', 'on alif', ALIF_HAMZA],
  ['Tiy', '', 'on the line', HAMZA],
  ['Tuw', '', 'on the line', HAMZA],
  ['TaA', '', 'on the line', HAMZA],

  // medial
  ['Ti', 'iT', 'on yeh', HAMZA_ON_YEH],
  ['Ti', 'uT', 'on yeh', HAMZA_ON_YEH],
  ['Ti', 'aT', 'on yeh', HAMZA_ON_YEH],
  ['Ti', 'iyT', 'on yeh', HAMZA_ON_YEH],
  ['Ti', 'uwT', 'on yeh', HAMZA_ON_YEH],
  ['Ti', 'aAT', 'on yeh', HAMZA_ON_YEH],

  ['Tu', 'iT', 'on yeh', HAMZA_ON_YEH],
  ['Tu', 'uT', 'on waw', HAMZA_ON_WAW],
  ['Tu', 'aT', 'on waw', HAMZA_ON_WAW],
  ['Tu', 'iyT', 'on yeh', HAMZA_ON_YEH],
  ['Tu', 'uwT', 'Tu&uwT', HAMZA_ON_WAW],
  ['Tu', 'aAT', 'Tu&aAT', HAMZA_ON_WAW],

  ['Ta', 'iT', 'Ta}iT', HAMZA_ON_YEH],
  ['Ta', 'uT', 'Ta&uT', HAMZA_ON_WAW],
  ['Ta', 'aT', 'Ta>aT', ALIF_HAMZA],
  ['Ta', 'iyT', 'on yeh', HAMZA_ON_YEH],
  ['Ta', 'uwT', 'Ta&uwT', HAMZA_ON_WAW],
  ['Ta', 'aAT', 'Ta|T', ALIF_MADDA],

  ['Tiy', 'iT', 'on yeh', HAMZA_ON_YEH],
  ['Tiy', 'uT', 'on yeh', HAMZA_ON_YEH],
  ['Tiy', 'aT', 'on yeh', HAMZA_ON_YEH],
  ['Tiy', 'iyT', 'on yeh', HAMZA_ON_YEH],
  ['Tiy', 'uwT', 'on yeh', HAMZA_ON_YEH],
  ['Tiy', 'aAT', 'on yeh', HAMZA_ON_YEH],

  ['Tayo', 'iT', 'on yeh', HAMZA_ON_YEH],
  // ['Tayo', 'uT', 'on yeh', HAMZA_ON_YEH],
  ['Tayo', 'aT', 'on yeh', HAMZA_ON_YEH],
  ['Tayo', 'iyT', 'on yeh', HAMZA_ON_YEH],
  // ['Tayo', 'uwT', 'on yeh', HAMZA_ON_YEH],
  ['Tayo', 'aAT', 'on yeh', HAMZA_ON_YEH],

  // ['Tuw', 'iT', 'on the line', HAMZA],
  // ['Tuw', 'uT', 'on the line', HAMZA],
  ['Tuw', 'aT', 'on the line', HAMZA],
  // ['Tuw', 'iyT', 'on the line', HAMZA],
  ['Tuw', 'uwT', 'on the line', HAMZA],
  ['Tuw', 'aAT', 'on the line', HAMZA],

  // ['Tawo', 'iT', 'on the line', HAMZA],
  // ['Tawo', 'uT', 'on the line', HAMZA],
  // ['Tawo', 'aT', 'on the line',  HAMZA],
  // ['Tawo', 'iyT', 'on the line', HAMZA],
  // ['Tawo', 'uwT', 'on the line', HAMZA],
  // ['Tawo', 'aAT', 'on the line', HAMZA],

  ['TaA', 'iT', 'on yeh', HAMZA_ON_YEH],
  ['TaA', 'uT', 'on waw', HAMZA_ON_WAW],
  ['TaA', 'aT', 'on the line', HAMZA],
  ['TaA', 'iyT', 'on yeh', HAMZA_ON_YEH],
  // FIXME: conflicts with jy'-1 past 3pm as it's preceded by the hollow root not a long vowel
  // ['TaA', 'uwT', 'on the line', HAMZA],
  ['TaA', 'aAT', 'on the line', HAMZA],
])(`hamza in %s'%s seats %s`, (first, second, seat, expected) => {
  expect(
    finalize(tokenize(transliterateReverse(`${first}'${second}`))),
    `hamza in ${first}'${second} seats ${seat}`,
  ).toContain(expected)
})
