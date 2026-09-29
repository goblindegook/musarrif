import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("b's-8 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("b's-8")!)).toEqualT({
      '1s': 'اِبْتَأَسْتُ',
      '2ms': 'اِبْتَأَسْتَ',
      '2fs': 'اِبْتَأَسْتِ',
      '3ms': 'اِبْتَأَسَ',
      '3fs': 'اِبْتَأَسَتْ',
      '2d': 'اِبْتَأَسْتُمَا',
      '3md': 'اِبْتَأَسَا',
      '3fd': 'اِبْتَأَسَتَا',
      '1p': 'اِبْتَأَسْنَا',
      '2mp': 'اِبْتَأَسْتُمْ',
      '2fp': 'اِبْتَأَسْتُنَّ',
      '3mp': 'اِبْتَأَسُوا',
      '3fp': 'اِبْتَأَسْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("b's-8")!, 'indicative')).toEqualT({
      '1s': 'أَبْتَئِسُ',
      '2ms': 'تَبْتَئِسُ',
      '2fs': 'تَبْتَئِسِينَ',
      '3ms': 'يَبْتَئِسُ',
      '3fs': 'تَبْتَئِسُ',
      '2d': 'تَبْتَئِسَانِ',
      '3md': 'يَبْتَئِسَانِ',
      '3fd': 'تَبْتَئِسَانِ',
      '1p': 'نَبْتَئِسُ',
      '2mp': 'تَبْتَئِسُونَ',
      '2fp': 'تَبْتَئِسْنَ',
      '3mp': 'يَبْتَئِسُونَ',
      '3fp': 'يَبْتَئِسْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("b's-8")!, 'subjunctive')).toEqualT({
      '1s': 'أَبْتَئِسَ',
      '2ms': 'تَبْتَئِسَ',
      '2fs': 'تَبْتَئِسِي',
      '3ms': 'يَبْتَئِسَ',
      '3fs': 'تَبْتَئِسَ',
      '2d': 'تَبْتَئِسَا',
      '3md': 'يَبْتَئِسَا',
      '3fd': 'تَبْتَئِسَا',
      '1p': 'نَبْتَئِسَ',
      '2mp': 'تَبْتَئِسُوا',
      '2fp': 'تَبْتَئِسْنَ',
      '3mp': 'يَبْتَئِسُوا',
      '3fp': 'يَبْتَئِسْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("b's-8")!, 'jussive')).toEqualT({
      '1s': 'أَبْتَئِسْ',
      '2ms': 'تَبْتَئِسْ',
      '2fs': 'تَبْتَئِسِي',
      '3ms': 'يَبْتَئِسْ',
      '3fs': 'تَبْتَئِسْ',
      '2d': 'تَبْتَئِسَا',
      '3md': 'يَبْتَئِسَا',
      '3fd': 'تَبْتَئِسَا',
      '1p': 'نَبْتَئِسْ',
      '2mp': 'تَبْتَئِسُوا',
      '2fp': 'تَبْتَئِسْنَ',
      '3mp': 'يَبْتَئِسُوا',
      '3fp': 'يَبْتَئِسْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("b's-8")!)).toMatchObjectT({
      '2ms': 'اِبْتَئِسْ',
      '2fs': 'اِبْتَئِسِي',
      '2d': 'اِبْتَئِسَا',
      '2mp': 'اِبْتَئِسُوا',
      '2fp': 'اِبْتَئِسْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("b's-8")!)).toEqualT('مُبْتَئِس')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("b's-8")!))).toEqualT(new Set(['اِبْتِئَاس']))
  })
})
