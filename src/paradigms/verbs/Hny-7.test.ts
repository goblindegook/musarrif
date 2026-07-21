import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('Hny-7 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hny-7')!)).toEqualT({
      '1s': 'اِنْحَنَيْتُ',
      '2ms': 'اِنْحَنَيْتَ',
      '2fs': 'اِنْحَنَيْتِ',
      '3ms': 'اِنْحَنَى',
      '3fs': 'اِنْحَنَتْ',
      '2d': 'اِنْحَنَيْتُمَا',
      '3md': 'اِنْحَنَيَا',
      '3fd': 'اِنْحَنَتَا',
      '1p': 'اِنْحَنَيْنَا',
      '2mp': 'اِنْحَنَيْتُمْ',
      '2fp': 'اِنْحَنَيْتُنَّ',
      '3mp': 'اِنْحَنَوْا',
      '3fp': 'اِنْحَنَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hny-7')!, 'indicative')).toEqualT({
      '1s': 'أَنْحَنِي',
      '2ms': 'تَنْحَنِي',
      '2fs': 'تَنْحَنِينَ',
      '3ms': 'يَنْحَنِي',
      '3fs': 'تَنْحَنِي',
      '2d': 'تَنْحَنِيَانِ',
      '3md': 'يَنْحَنِيَانِ',
      '3fd': 'تَنْحَنِيَانِ',
      '1p': 'نَنْحَنِي',
      '2mp': 'تَنْحَنُونَ',
      '2fp': 'تَنْحَنِينَ',
      '3mp': 'يَنْحَنُونَ',
      '3fp': 'يَنْحَنِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hny-7')!, 'subjunctive')).toEqualT({
      '1s': 'أَنْحَنِيَ',
      '2ms': 'تَنْحَنِيَ',
      '2fs': 'تَنْحَنِي',
      '3ms': 'يَنْحَنِيَ',
      '3fs': 'تَنْحَنِيَ',
      '2d': 'تَنْحَنِيَا',
      '3md': 'يَنْحَنِيَا',
      '3fd': 'تَنْحَنِيَا',
      '1p': 'نَنْحَنِيَ',
      '2mp': 'تَنْحَنُوا',
      '2fp': 'تَنْحَنِينَ',
      '3mp': 'يَنْحَنُوا',
      '3fp': 'يَنْحَنِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hny-7')!, 'jussive')).toEqualT({
      '1s': 'أَنْحَنِ',
      '2ms': 'تَنْحَنِ',
      '2fs': 'تَنْحَنِي',
      '3ms': 'يَنْحَنِ',
      '3fs': 'تَنْحَنِ',
      '2d': 'تَنْحَنِيَا',
      '3md': 'يَنْحَنِيَا',
      '3fd': 'تَنْحَنِيَا',
      '1p': 'نَنْحَنِ',
      '2mp': 'تَنْحَنُوا',
      '2fp': 'تَنْحَنِينَ',
      '3mp': 'يَنْحَنُوا',
      '3fp': 'يَنْحَنِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hny-7')!)).toMatchObjectT({
      '2ms': 'اِنْحَنِ',
      '2fs': 'اِنْحَنِي',
      '2d': 'اِنْحَنِيَا',
      '2mp': 'اِنْحَنُوا',
      '2fp': 'اِنْحَنِينَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hny-7')!)).toEqualT('مُنْحَنٍ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Hny-7')!))).toEqualT(new Set(['اِنْحِنَاء']))
  })
})
