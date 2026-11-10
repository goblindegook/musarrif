import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'mm-10 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'mm-10")!)).toEqualT({
      '1s': 'اِسْتَأْمَمْتُ',
      '2ms': 'اِسْتَأْمَمْتَ',
      '2fs': 'اِسْتَأْمَمْتِ',
      '3ms': 'اِسْتَأَمَّ',
      '3fs': 'اِسْتَأَمَّتْ',
      '2d': 'اِسْتَأْمَمْتُمَا',
      '3md': 'اِسْتَأَمَّا',
      '3fd': 'اِسْتَأَمَّتَا',
      '1p': 'اِسْتَأْمَمْنَا',
      '2mp': 'اِسْتَأْمَمْتُمْ',
      '2fp': 'اِسْتَأْمَمْتُنَّ',
      '3mp': 'اِسْتَأَمُّوا',
      '3fp': 'اِسْتَأْمَمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'mm-10")!, 'indicative')).toEqualT({
      '1s': 'أَسْتَئِمُّ',
      '2ms': 'تَسْتَئِمُّ',
      '2fs': 'تَسْتَئِمِّينَ',
      '3ms': 'يَسْتَئِمُّ',
      '3fs': 'تَسْتَئِمُّ',
      '2d': 'تَسْتَئِمَّانِ',
      '3md': 'يَسْتَئِمَّانِ',
      '3fd': 'تَسْتَئِمَّانِ',
      '1p': 'نَسْتَئِمُّ',
      '2mp': 'تَسْتَئِمُّونَ',
      '2fp': 'تَسْتَأْمِمْنَ',
      '3mp': 'يَسْتَئِمُّونَ',
      '3fp': 'يَسْتَأْمِمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'mm-10")!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَئِمَّ',
      '2ms': 'تَسْتَئِمَّ',
      '2fs': 'تَسْتَئِمِّي',
      '3ms': 'يَسْتَئِمَّ',
      '3fs': 'تَسْتَئِمَّ',
      '2d': 'تَسْتَئِمَّا',
      '3md': 'يَسْتَئِمَّا',
      '3fd': 'تَسْتَئِمَّا',
      '1p': 'نَسْتَئِمَّ',
      '2mp': 'تَسْتَئِمُّوا',
      '2fp': 'تَسْتَأْمِمْنَ',
      '3mp': 'يَسْتَئِمُّوا',
      '3fp': 'يَسْتَأْمِمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'mm-10")!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَسْتَئِمَّ', 'أَسْتَئِمِّ', 'أَسْتَأْمِمْ']),
      '2ms': expect.toBeOneOf(['تَسْتَئِمَّ', 'تَسْتَئِمِّ', 'تَسْتَأْمِمْ']),
      '2fs': 'تَسْتَئِمِّي',
      '3ms': expect.toBeOneOf(['يَسْتَئِمَّ', 'يَسْتَئِمِّ', 'يَسْتَأْمِمْ']),
      '3fs': expect.toBeOneOf(['تَسْتَئِمَّ', 'تَسْتَئِمِّ', 'تَسْتَأْمِمْ']),
      '2d': 'تَسْتَئِمَّا',
      '3md': 'يَسْتَئِمَّا',
      '3fd': 'تَسْتَئِمَّا',
      '1p': expect.toBeOneOf(['نَسْتَئِمَّ', 'نَسْتَئِمِّ', 'نَسْتَأْمِمْ']),
      '2mp': 'تَسْتَئِمُّوا',
      '2fp': 'تَسْتَأْمِمْنَ',
      '3mp': 'يَسْتَئِمُّوا',
      '3fp': 'يَسْتَأْمِمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'mm-10")!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['اِسْتَئِمَّ', 'اِسْتَئِمِّ', 'اِسْتَأْمِمْ']),
      '2fs': 'اِسْتَئِمِّي',
      '2d': 'اِسْتَئِمَّا',
      '2mp': 'اِسْتَئِمُّوا',
      '2fp': 'اِسْتَأْمِمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'mm-10")!)).toEqualT({
      '1s': 'اُسْتُؤْمِمْتُ',
      '2ms': 'اُسْتُؤْمِمْتَ',
      '2fs': 'اُسْتُؤْمِمْتِ',
      '3ms': 'اُسْتُئِمَّ',
      '3fs': 'اُسْتُئِمَّتْ',
      '2d': 'اُسْتُؤْمِمْتُمَا',
      '3md': 'اُسْتُئِمَّا',
      '3fd': 'اُسْتُئِمَّتَا',
      '1p': 'اُسْتُؤْمِمْنَا',
      '2mp': 'اُسْتُؤْمِمْتُمْ',
      '2fp': 'اُسْتُؤْمِمْتُنَّ',
      '3mp': 'اُسْتُئِمُّوا',
      '3fp': 'اُسْتُؤْمِمْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mm-10")!, 'indicative')).toEqualT({
      '1s': 'أُسْتَأَمُّ',
      '2ms': 'تُسْتَأَمُّ',
      '2fs': 'تُسْتَأَمِّينَ',
      '3ms': 'يُسْتَأَمُّ',
      '3fs': 'تُسْتَأَمُّ',
      '2d': 'تُسْتَأَمَّانِ',
      '3md': 'يُسْتَأَمَّانِ',
      '3fd': 'تُسْتَأَمَّانِ',
      '1p': 'نُسْتَأَمُّ',
      '2mp': 'تُسْتَأَمُّونَ',
      '2fp': 'تُسْتَأْمَمْنَ',
      '3mp': 'يُسْتَأَمُّونَ',
      '3fp': 'يُسْتَأْمَمْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mm-10")!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَأَمَّ',
      '2ms': 'تُسْتَأَمَّ',
      '2fs': 'تُسْتَأَمِّي',
      '3ms': 'يُسْتَأَمَّ',
      '3fs': 'تُسْتَأَمَّ',
      '2d': 'تُسْتَأَمَّا',
      '3md': 'يُسْتَأَمَّا',
      '3fd': 'تُسْتَأَمَّا',
      '1p': 'نُسْتَأَمَّ',
      '2mp': 'تُسْتَأَمُّوا',
      '2fp': 'تُسْتَأْمَمْنَ',
      '3mp': 'يُسْتَأَمُّوا',
      '3fp': 'يُسْتَأْمَمْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mm-10")!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أُسْتَأَمَّ', 'أُسْتَأَمِّ', 'أُسْتَأْمَمْ']),
      '2ms': expect.toBeOneOf(['تُسْتَأَمَّ', 'تُسْتَأَمِّ', 'تُسْتَأْمَمْ']),
      '2fs': 'تُسْتَأَمِّي',
      '3ms': expect.toBeOneOf(['يُسْتَأَمَّ', 'يُسْتَأَمِّ', 'يُسْتَأْمَمْ']),
      '3fs': expect.toBeOneOf(['تُسْتَأَمَّ', 'تُسْتَأَمِّ', 'تُسْتَأْمَمْ']),
      '2d': 'تُسْتَأَمَّا',
      '3md': 'يُسْتَأَمَّا',
      '3fd': 'تُسْتَأَمَّا',
      '1p': expect.toBeOneOf(['نُسْتَأَمَّ', 'نُسْتَأَمِّ', 'نُسْتَأْمَمْ']),
      '2mp': 'تُسْتَأَمُّوا',
      '2fp': 'تُسْتَأْمَمْنَ',
      '3mp': 'يُسْتَأَمُّوا',
      '3fp': 'يُسْتَأْمَمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'mm-10")!)).toEqualT('مُسْتَئِمّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'mm-10")!)).toEqualT('مُسْتَأَمّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'mm-10")!))).toEqualT(new Set(['اِسْتِئْمَام']))
  })
})
