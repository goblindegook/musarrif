import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('byD-9 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('byD-9')!)).toEqualT({
      '1s': 'اِبْيَضَضْتُ',
      '2ms': 'اِبْيَضَضْتَ',
      '2fs': 'اِبْيَضَضْتِ',
      '3ms': 'اِبْيَضَّ',
      '3fs': 'اِبْيَضَّتْ',
      '2d': 'اِبْيَضَضْتُمَا',
      '3md': 'اِبْيَضَّا',
      '3fd': 'اِبْيَضَّتَا',
      '1p': 'اِبْيَضَضْنَا',
      '2mp': 'اِبْيَضَضْتُمْ',
      '2fp': 'اِبْيَضَضْتُنَّ',
      '3mp': 'اِبْيَضُّوا',
      '3fp': 'اِبْيَضَضْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('byD-9')!, 'indicative')).toEqualT({
      '1s': 'أَبْيَضُّ',
      '2ms': 'تَبْيَضُّ',
      '2fs': 'تَبْيَضِّينَ',
      '3ms': 'يَبْيَضُّ',
      '3fs': 'تَبْيَضُّ',
      '2d': 'تَبْيَضَّانِ',
      '3md': 'يَبْيَضَّانِ',
      '3fd': 'تَبْيَضَّانِ',
      '1p': 'نَبْيَضُّ',
      '2mp': 'تَبْيَضُّونَ',
      '2fp': 'تَبْيَضِضْنَ',
      '3mp': 'يَبْيَضُّونَ',
      '3fp': 'يَبْيَضِضْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('byD-9')!, 'subjunctive')).toEqualT({
      '1s': 'أَبْيَضَّ',
      '2ms': 'تَبْيَضَّ',
      '2fs': 'تَبْيَضِّي',
      '3ms': 'يَبْيَضَّ',
      '3fs': 'تَبْيَضَّ',
      '2d': 'تَبْيَضَّا',
      '3md': 'يَبْيَضَّا',
      '3fd': 'تَبْيَضَّا',
      '1p': 'نَبْيَضَّ',
      '2mp': 'تَبْيَضُّوا',
      '2fp': 'تَبْيَضِضْنَ',
      '3mp': 'يَبْيَضُّوا',
      '3fp': 'يَبْيَضِضْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('byD-9')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَبْيَضَّ', 'أَبْيَضِّ', 'أَبْيَضِضْ']),
      '2ms': expect.toBeOneOf(['تَبْيَضَّ', 'تَبْيَضِّ', 'تَبْيَضِضْ']),
      '2fs': 'تَبْيَضِّي',
      '3ms': expect.toBeOneOf(['يَبْيَضَّ', 'يَبْيَضِّ', 'يَبْيَضِضْ']),
      '3fs': expect.toBeOneOf(['تَبْيَضَّ', 'تَبْيَضِّ', 'تَبْيَضِضْ']),
      '2d': 'تَبْيَضَّا',
      '3md': 'يَبْيَضَّا',
      '3fd': 'تَبْيَضَّا',
      '1p': expect.toBeOneOf(['نَبْيَضَّ', 'نَبْيَضِّ', 'نَبْيَضِضْ']),
      '2mp': 'تَبْيَضُّوا',
      '2fp': 'تَبْيَضِضْنَ',
      '3mp': 'يَبْيَضُّوا',
      '3fp': 'يَبْيَضِضْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('byD-9')!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['اِبْيَضَّ', 'اِبْيَضِّ', 'اِبْيَضِضْ']),
      '2fs': 'اِبْيَضِّي',
      '2d': 'اِبْيَضَّا',
      '2mp': 'اِبْيَضُّوا',
      '2fp': 'اِبْيَضِضْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('byD-9')!)).toEqualT('مُبْيَضّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('byD-9')!))).toEqualT(new Set(['اِبْيِضَاض']))
  })
})
