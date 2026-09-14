import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { getVerbById } from '../verbs'

describe('Hyw-1-i-a (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hyw-1-i-a')!)).toEqualT({
      '1s': 'حَيِيتُ',
      '2ms': 'حَيِيتَ',
      '2fs': 'حَيِيتِ',
      '3ms': 'حَيِيَ',
      '3fs': 'حَيِيَتْ',
      '2d': 'حَيِيتُمَا',
      '3md': 'حَيِيَا',
      '3fd': 'حَيِيَتَا',
      '1p': 'حَيِينَا',
      '2mp': 'حَيِيتُمْ',
      '2fp': 'حَيِيتُنَّ',
      '3mp': 'حَيُّوا',
      '3fp': 'حَيِينَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hyw-1-i-a')!, 'indicative')).toEqualT({
      '1s': 'أَحْيَا',
      '2ms': 'تَحْيَا',
      '2fs': 'تَحْيَيْنَ',
      '3ms': 'يَحْيَا',
      '3fs': 'تَحْيَا',
      '2d': 'تَحْيَيَانِ',
      '3md': 'يَحْيَيَانِ',
      '3fd': 'تَحْيَيَانِ',
      '1p': 'نَحْيَا',
      '2mp': 'تَحْيَوْنَ',
      '2fp': 'تَحْيَيْنَ',
      '3mp': 'يَحْيَوْنَ',
      '3fp': 'يَحْيَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hyw-1-i-a')!, 'subjunctive')).toEqualT({
      '1s': 'أَحْيَا',
      '2ms': 'تَحْيَا',
      '2fs': 'تَحْيَيْ',
      '3ms': 'يَحْيَا',
      '3fs': 'تَحْيَا',
      '2d': 'تَحْيَيَا',
      '3md': 'يَحْيَيَا',
      '3fd': 'تَحْيَيَا',
      '1p': 'نَحْيَا',
      '2mp': 'تَحْيَوْا',
      '2fp': 'تَحْيَيْنَ',
      '3mp': 'يَحْيَوْا',
      '3fp': 'يَحْيَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hyw-1-i-a')!, 'jussive')).toEqualT({
      '1s': 'أَحْيَ',
      '2ms': 'تَحْيَ',
      '2fs': 'تَحْيَيْ',
      '3ms': 'يَحْيَ',
      '3fs': 'تَحْيَ',
      '2d': 'تَحْيَيَا',
      '3md': 'يَحْيَيَا',
      '3fd': 'تَحْيَيَا',
      '1p': 'نَحْيَ',
      '2mp': 'تَحْيَوْا',
      '2fp': 'تَحْيَيْنَ',
      '3mp': 'يَحْيَوْا',
      '3fp': 'يَحْيَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hyw-1-i-a')!)).toMatchObjectT({
      '2ms': 'اِحْيَ',
      '2fs': 'اِحْيَيْ',
      '2d': 'اِحْيَيَا',
      '2mp': 'اِحْيَوْا',
      '2fp': 'اِحْيَيْنَ',
    })
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Hyw-1-i-a')!))).toEqualT(new Set(['حَيَاة', 'مَحْيًا']))
  })
})
