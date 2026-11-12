import { describe, expect, test } from 'vitest'
import { conjugatePast } from '../active/past'
import { getVerbById } from '../verbs'

describe('lys-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('lys-1')!)).toEqualT({
      '1s': 'لَسْتُ',
      '2ms': 'لَسْتَ',
      '2fs': 'لَسْتِ',
      '3ms': 'لَيْسَ',
      '3fs': 'لَيْسَتْ',
      '2d': 'لَسْتُمَا',
      '3md': 'لَيْسَا',
      '3fd': 'لَيْسَتَا',
      '1p': 'لَسْنَا',
      '2mp': 'لَسْتُمْ',
      '2fp': 'لَسْتُنَّ',
      '3mp': 'لَيْسُوا',
      '3fp': 'لَسْنَ',
    })
  })
})
