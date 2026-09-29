import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("$m'z-4 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("$m'z-4")!)).toEqualT({
      '1s': 'اِشْمَأْزَزْتُ',
      '2ms': 'اِشْمَأْزَزْتَ',
      '2fs': 'اِشْمَأْزَزْتِ',
      '3ms': 'اِشْمَأَزَّ',
      '3fs': 'اِشْمَأَزَّتْ',
      '2d': 'اِشْمَأْزَزْتُمَا',
      '3md': 'اِشْمَأَزَّا',
      '3fd': 'اِشْمَأَزَّتَا',
      '1p': 'اِشْمَأْزَزْنَا',
      '2mp': 'اِشْمَأْزَزْتُمْ',
      '2fp': 'اِشْمَأْزَزْتُنَّ',
      '3mp': 'اِشْمَأَزُّوا',
      '3fp': 'اِشْمَأْزَزْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("$m'z-4")!, 'indicative')).toEqualT({
      '1s': 'أَشْمَئِزُّ',
      '2ms': 'تَشْمَئِزُّ',
      '2fs': 'تَشْمَئِزِّينَ',
      '3ms': 'يَشْمَئِزُّ',
      '3fs': 'تَشْمَئِزُّ',
      '2d': 'تَشْمَئِزَّانِ',
      '3md': 'يَشْمَئِزَّانِ',
      '3fd': 'تَشْمَئِزَّانِ',
      '1p': 'نَشْمَئِزُّ',
      '2mp': 'تَشْمَئِزُّونَ',
      '2fp': 'تَشْمَأْزِزْنَ',
      '3mp': 'يَشْمَئِزُّونَ',
      '3fp': 'يَشْمَأْزِزْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("$m'z-4")!, 'subjunctive')).toEqualT({
      '1s': 'أَشْمَئِزَّ',
      '2ms': 'تَشْمَئِزَّ',
      '2fs': 'تَشْمَئِزِّي',
      '3ms': 'يَشْمَئِزَّ',
      '3fs': 'تَشْمَئِزَّ',
      '2d': 'تَشْمَئِزَّا',
      '3md': 'يَشْمَئِزَّا',
      '3fd': 'تَشْمَئِزَّا',
      '1p': 'نَشْمَئِزَّ',
      '2mp': 'تَشْمَئِزُّوا',
      '2fp': 'تَشْمَأْزِزْنَ',
      '3mp': 'يَشْمَئِزُّوا',
      '3fp': 'يَشْمَأْزِزْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("$m'z-4")!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَشْمَئِزَّ', 'أَشْمَئِزِّ', 'أَشْمَأْزِزْ']),
      '2ms': expect.toBeOneOf(['تَشْمَئِزَّ', 'تَشْمَئِزِّ', 'تَشْمَأْزِزْ']),
      '2fs': 'تَشْمَئِزِّي',
      '3ms': expect.toBeOneOf(['يَشْمَئِزَّ', 'يَشْمَئِزِّ', 'يَشْمَأْزِزْ']),
      '3fs': expect.toBeOneOf(['تَشْمَئِزَّ', 'تَشْمَئِزِّ', 'تَشْمَأْزِزْ']),
      '2d': 'تَشْمَئِزَّا',
      '3md': 'يَشْمَئِزَّا',
      '3fd': 'تَشْمَئِزَّا',
      '1p': expect.toBeOneOf(['نَشْمَئِزَّ', 'نَشْمَئِزِّ', 'نَشْمَأْزِزْ']),
      '2mp': 'تَشْمَئِزُّوا',
      '2fp': 'تَشْمَأْزِزْنَ',
      '3mp': 'يَشْمَئِزُّوا',
      '3fp': 'يَشْمَأْزِزْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("$m'z-4")!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['اِشْمَئِزَّ', 'اِشْمَئِزِّ', 'اِشْمَأْزِزْ']),
      '2fs': 'اِشْمَئِزِّي',
      '2d': 'اِشْمَئِزَّا',
      '2mp': 'اِشْمَئِزُّوا',
      '2fp': 'اِشْمَأْزِزْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("$m'z-4")!)).toEqualT({
      '1s': 'اُشْمُؤْزِزْتُ',
      '2ms': 'اُشْمُؤْزِزْتَ',
      '2fs': 'اُشْمُؤْزِزْتِ',
      '3ms': 'اُشْمُئِزَّ',
      '3fs': 'اُشْمُئِزَّتْ',
      '2d': 'اُشْمُؤْزِزْتُمَا',
      '3md': 'اُشْمُئِزَّا',
      '3fd': 'اُشْمُئِزَّتَا',
      '1p': 'اُشْمُؤْزِزْنَا',
      '2mp': 'اُشْمُؤْزِزْتُمْ',
      '2fp': 'اُشْمُؤْزِزْتُنَّ',
      '3mp': 'اُشْمُئِزُّوا',
      '3fp': 'اُشْمُؤْزِزْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("$m'z-4")!, 'indicative')).toEqualT({
      '1s': 'أُشْمَأَزُّ',
      '2ms': 'تُشْمَأَزُّ',
      '2fs': 'تُشْمَأَزِّينَ',
      '3ms': 'يُشْمَأَزُّ',
      '3fs': 'تُشْمَأَزُّ',
      '2d': 'تُشْمَأَزَّانِ',
      '3md': 'يُشْمَأَزَّانِ',
      '3fd': 'تُشْمَأَزَّانِ',
      '1p': 'نُشْمَأَزُّ',
      '2mp': 'تُشْمَأَزُّونَ',
      '2fp': 'تُشْمَأْزَزْنَ',
      '3mp': 'يُشْمَأَزُّونَ',
      '3fp': 'يُشْمَأْزَزْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("$m'z-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُشْمَأَزَّ',
      '2ms': 'تُشْمَأَزَّ',
      '2fs': 'تُشْمَأَزِّي',
      '3ms': 'يُشْمَأَزَّ',
      '3fs': 'تُشْمَأَزَّ',
      '2d': 'تُشْمَأَزَّا',
      '3md': 'يُشْمَأَزَّا',
      '3fd': 'تُشْمَأَزَّا',
      '1p': 'نُشْمَأَزَّ',
      '2mp': 'تُشْمَأَزُّوا',
      '2fp': 'تُشْمَأْزَزْنَ',
      '3mp': 'يُشْمَأَزُّوا',
      '3fp': 'يُشْمَأْزَزْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("$m'z-4")!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أُشْمَأَزَّ', 'أُشْمَأَزِّ', 'أُشْمَأْزَزْ']),
      '2ms': expect.toBeOneOf(['تُشْمَأَزَّ', 'تُشْمَأَزِّ', 'تُشْمَأْزَزْ']),
      '2fs': 'تُشْمَأَزِّي',
      '3ms': expect.toBeOneOf(['يُشْمَأَزَّ', 'يُشْمَأَزِّ', 'يُشْمَأْزَزْ']),
      '3fs': expect.toBeOneOf(['تُشْمَأَزَّ', 'تُشْمَأَزِّ', 'تُشْمَأْزَزْ']),
      '2d': 'تُشْمَأَزَّا',
      '3md': 'يُشْمَأَزَّا',
      '3fd': 'تُشْمَأَزَّا',
      '1p': expect.toBeOneOf(['نُشْمَأَزَّ', 'نُشْمَأَزِّ', 'نُشْمَأْزَزْ']),
      '2mp': 'تُشْمَأَزُّوا',
      '2fp': 'تُشْمَأْزَزْنَ',
      '3mp': 'يُشْمَأَزُّوا',
      '3fp': 'يُشْمَأْزَزْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("$m'z-4")!)).toEqualT('مُشْمَئِزّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("$m'z-4")!)).toEqualT('مُشْمَأَزّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("$m'z-4")!))).toEqualT(new Set(['اِشْمِئْزَاز']))
  })
})
