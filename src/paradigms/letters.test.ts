import { transliterate, transliterateReverse } from '@pacote/buckwalter'
import { expect, test } from 'vitest'
import { applyDiacriticsPreference, type DiacriticsPreference, finalize, tokenize } from './letters'

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

test.each<[string, string, string]>([
  // initial
  ['', 'iT', '<iT'],
  ['', 'uT', '>uT'],
  ['', 'aT', '>aT'],
  ['', 'iyT', '<iyT'],
  ['', 'uwT', '>uwT'],
  ['', 'aAT', '|T'],

  // before last
  ['Ti', 'T', 'Ti}T'],
  ['Tu', 'T', 'Tu&T'],
  ['Ta', 'T', 'Ta>T'],
  // ['Tiy', 'T', 'Tiy}T'],
  ['Tuw', 'T', "Tuw'T"],
  ['TaA', 'T', "TaA'T"],

  // final
  ['Ti', '', 'Ti}'],
  ['Tu', '', 'Tu&'],
  ['Ta', '', 'Ta>'],
  ['Tiy', '', "Tiy'"],
  ['Tuw', '', "Tuw'"],
  ['TaA', '', "TaA'"],

  // medial
  ['Ti', 'iT', 'Ti}iT'],
  ['Ti', 'uT', 'Ti}uT'],
  ['Ti', 'aT', 'Ti}aT'],
  ['Ti', 'iyT', 'Ti}iyT'],
  ['Ti', 'uwT', 'Ti}uwT'],
  ['Ti', 'aAT', 'Ti}aAT'],

  ['Tu', 'iT', 'Tu}iT'],
  ['Tu', 'uT', 'Tu&uT'],
  ['Tu', 'aT', 'Tu&aT'],
  ['Tu', 'iyT', 'Tu}iyT'],
  ['Tu', 'uwT', 'Tu&uwT'],
  ['Tu', 'aAT', 'Tu&aAT'],

  ['Ta', 'iT', 'Ta}iT'],
  ['Ta', 'uT', 'Ta&uT'],
  ['Ta', 'aT', 'Ta>aT'],
  ['Ta', 'iyT', 'Ta}iyT'],
  ['Ta', 'uwT', 'Ta&uwT'],
  ['Ta', 'aAT', 'Ta|T'],

  ['Tiy', 'iT', 'Tiy}iT'],
  // ['Tiy', 'uT', 'Tiy}uT'],
  // ['Tiy', 'aT', 'Tiy}aT'],
  ['Tiy', 'iyT', 'Tiy}iyT'],
  // ['Tiy', 'uwT', 'Tiy}uwT'],
  // ['Tiy', 'aAT', 'Tiy}aAT'],

  ['Tayo', 'iT', 'Tayo}iT'],
  // ['Tayo', 'uT', 'Tayo}uT'],
  ['Tayo', 'aT', 'Tayo}aT'],
  ['Tayo', 'iyT', 'Tayo}iyT'],
  // ['Tayo', 'uwT', 'Tayo}uwT'],
  ['Tayo', 'aAT', 'Tayo}aAT'],

  // ['Tuw', 'iT', "Tuw'iT"],
  // ['Tuw', 'uT', "Tuw'uT"],
  // ['Tuw', 'aT', "Tuw'aT"],
  // ['Tuw', 'iyT', "Tuw'iyT"],
  ['Tuw', 'uwT', "Tuw'uwT"],
  ['Tuw', 'aAT', "Tuw'aAT"],

  // ['Tawo', 'iT', "Tawo'iT"],
  // ['Tawo', 'uT', "Tawo'uT"],
  // ['Tawo', 'aT', "Tawo'aT"],
  // ['Tawo', 'iyT', "Tawo'iyT"],
  // ['Tawo', 'uwT', "Tawo'uwT"],
  // ['Tawo', 'aAT', "Tawo'aAT"],

  ['TaA', 'iT', 'TaA}iT'],
  ['TaA', 'uT', 'TaA&uT'],
  ['TaA', 'aT', "TaA'aT"],
  ['TaA', 'iyT', 'TaA}iyT'],
  // ['TaA', 'uwT', "TaA'uwT"],
  ['TaA', 'aAT', "TaA'aAT"],
])("hamza in %s'%s is seated as %s", (first, second, expected) => {
  expect(transliterate(finalize(tokenize(transliterateReverse(`${first}'${second}`))))).toBe(expected)
})
