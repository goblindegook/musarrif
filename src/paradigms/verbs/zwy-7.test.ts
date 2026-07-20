import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('zwy-7', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('zwy-7')!)).toEqualT({
      '1s': 'اِنْزَوَيْتُ',
      '2ms': 'اِنْزَوَيْتَ',
      '2fs': 'اِنْزَوَيْتِ',
      '3ms': 'اِنْزَوَى',
      '3fs': 'اِنْزَوَتْ',
      '2d': 'اِنْزَوَيْتُمَا',
      '3md': 'اِنْزَوَيَا',
      '3fd': 'اِنْزَوَتَا',
      '1p': 'اِنْزَوَيْنَا',
      '2mp': 'اِنْزَوَيْتُمْ',
      '2fp': 'اِنْزَوَيْتُنَّ',
      '3mp': 'اِنْزَوَوْا',
      '3fp': 'اِنْزَوَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('zwy-7')!, 'indicative')).toEqualT({
      '1s': 'أَنْزَوِي',
      '2ms': 'تَنْزَوِي',
      '2fs': 'تَنْزَوِينَ',
      '3ms': 'يَنْزَوِي',
      '3fs': 'تَنْزَوِي',
      '2d': 'تَنْزَوِيَانِ',
      '3md': 'يَنْزَوِيَانِ',
      '3fd': 'تَنْزَوِيَانِ',
      '1p': 'نَنْزَوِي',
      '2mp': 'تَنْزَوُونَ',
      '2fp': 'تَنْزَوِينَ',
      '3mp': 'يَنْزَوُونَ',
      '3fp': 'يَنْزَوِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('zwy-7')!, 'subjunctive')).toEqualT({
      '1s': 'أَنْزَوِيَ',
      '2ms': 'تَنْزَوِيَ',
      '2fs': 'تَنْزَوِي',
      '3ms': 'يَنْزَوِيَ',
      '3fs': 'تَنْزَوِيَ',
      '2d': 'تَنْزَوِيَا',
      '3md': 'يَنْزَوِيَا',
      '3fd': 'تَنْزَوِيَا',
      '1p': 'نَنْزَوِيَ',
      '2mp': 'تَنْزَوُوا',
      '2fp': 'تَنْزَوِينَ',
      '3mp': 'يَنْزَوُوا',
      '3fp': 'يَنْزَوِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('zwy-7')!, 'jussive')).toEqualT({
      '1s': 'أَنْزَوِ',
      '2ms': 'تَنْزَوِ',
      '2fs': 'تَنْزَوِي',
      '3ms': 'يَنْزَوِ',
      '3fs': 'تَنْزَوِ',
      '2d': 'تَنْزَوِيَا',
      '3md': 'يَنْزَوِيَا',
      '3fd': 'تَنْزَوِيَا',
      '1p': 'نَنْزَوِ',
      '2mp': 'تَنْزَوُوا',
      '2fp': 'تَنْزَوِينَ',
      '3mp': 'يَنْزَوُوا',
      '3fp': 'يَنْزَوِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('zwy-7')!)).toMatchObjectT({
      '2ms': 'اِنْزَوِ',
      '2fs': 'اِنْزَوِي',
      '2d': 'اِنْزَوِيَا',
      '2mp': 'اِنْزَوُوا',
      '2fp': 'اِنْزَوِينَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('zwy-7')!)).toEqualT('مُنْزَوٍ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('zwy-7')!)).toEqualT(['اِنْزِوَاء'])
  })
})
