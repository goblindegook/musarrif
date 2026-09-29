import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('wdd-6 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wdd-6')!)).toEqualT({
      '1s': 'تَوَادَدْتُ',
      '2ms': 'تَوَادَدْتَ',
      '2fs': 'تَوَادَدْتِ',
      '3ms': 'تَوَادَّ',
      '3fs': 'تَوَادَّتْ',
      '2d': 'تَوَادَدْتُمَا',
      '3md': 'تَوَادَّا',
      '3fd': 'تَوَادَّتَا',
      '1p': 'تَوَادَدْنَا',
      '2mp': 'تَوَادَدْتُمْ',
      '2fp': 'تَوَادَدْتُنَّ',
      '3mp': 'تَوَادُّوا',
      '3fp': 'تَوَادَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wdd-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَوَادُّ',
      '2ms': 'تَتَوَادُّ',
      '2fs': 'تَتَوَادِّينَ',
      '3ms': 'يَتَوَادُّ',
      '3fs': 'تَتَوَادُّ',
      '2d': 'تَتَوَادَّانِ',
      '3md': 'يَتَوَادَّانِ',
      '3fd': 'تَتَوَادَّانِ',
      '1p': 'نَتَوَادُّ',
      '2mp': 'تَتَوَادُّونَ',
      '2fp': 'تَتَوَادَدْنَ',
      '3mp': 'يَتَوَادُّونَ',
      '3fp': 'يَتَوَادَدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wdd-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَوَادَّ',
      '2ms': 'تَتَوَادَّ',
      '2fs': 'تَتَوَادِّي',
      '3ms': 'يَتَوَادَّ',
      '3fs': 'تَتَوَادَّ',
      '2d': 'تَتَوَادَّا',
      '3md': 'يَتَوَادَّا',
      '3fd': 'تَتَوَادَّا',
      '1p': 'نَتَوَادَّ',
      '2mp': 'تَتَوَادُّوا',
      '2fp': 'تَتَوَادَدْنَ',
      '3mp': 'يَتَوَادُّوا',
      '3fp': 'يَتَوَادَدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wdd-6')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَتَوَادَّ', 'أَتَوَادِّ', 'أَتَوَادَدْ']),
      '2ms': expect.toBeOneOf(['تَتَوَادَّ', 'تَتَوَادِّ', 'تَتَوَادَدْ']),
      '2fs': 'تَتَوَادِّي',
      '3ms': expect.toBeOneOf(['يَتَوَادَّ', 'يَتَوَادِّ', 'يَتَوَادَدْ']),
      '3fs': expect.toBeOneOf(['تَتَوَادَّ', 'تَتَوَادِّ', 'تَتَوَادَدْ']),
      '2d': 'تَتَوَادَّا',
      '3md': 'يَتَوَادَّا',
      '3fd': 'تَتَوَادَّا',
      '1p': expect.toBeOneOf(['نَتَوَادَّ', 'نَتَوَادِّ', 'نَتَوَادَدْ']),
      '2mp': 'تَتَوَادُّوا',
      '2fp': 'تَتَوَادَدْنَ',
      '3mp': 'يَتَوَادُّوا',
      '3fp': 'يَتَوَادَدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wdd-6')!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['تَوَادَّ', 'تَوَادِّ', 'تَوَادَدْ']),
      '2fs': 'تَوَادِّي',
      '2d': 'تَوَادَّا',
      '2mp': 'تَوَادُّوا',
      '2fp': 'تَوَادَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wdd-6')!)).toEqualT('مُتَوَادّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('wdd-6')!))).toEqualT(new Set(['تَوَادّ']))
  })
})
