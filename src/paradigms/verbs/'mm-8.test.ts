import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'mm-8", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'mm-8")!)).toEqualT({
      '1s': 'اِئْتَمَمْتُ',
      '2ms': 'اِئْتَمَمْتَ',
      '2fs': 'اِئْتَمَمْتِ',
      '3ms': 'اِئْتَمَّ',
      '3fs': 'اِئْتَمَّتْ',
      '2d': 'اِئْتَمَمْتُمَا',
      '3md': 'اِئْتَمَّا',
      '3fd': 'اِئْتَمَّتَا',
      '1p': 'اِئْتَمَمْنَا',
      '2mp': 'اِئْتَمَمْتُمْ',
      '2fp': 'اِئْتَمَمْتُنَّ',
      '3mp': 'اِئْتَمُّوا',
      '3fp': 'اِئْتَمَمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'mm-8")!, 'indicative')).toEqualT({
      '1s': 'آتَمُّ',
      '2ms': 'تَأْتَمُّ',
      '2fs': 'تَأْتَمِّينَ',
      '3ms': 'يَأْتَمُّ',
      '3fs': 'تَأْتَمُّ',
      '2d': 'تَأْتَمَّانِ',
      '3md': 'يَأْتَمَّانِ',
      '3fd': 'تَأْتَمَّانِ',
      '1p': 'نَأْتَمُّ',
      '2mp': 'تَأْتَمُّونَ',
      '2fp': 'تَأْتَمِمْنَ',
      '3mp': 'يَأْتَمُّونَ',
      '3fp': 'يَأْتَمِمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'mm-8")!, 'subjunctive')).toEqualT({
      '1s': 'آتَمَّ',
      '2ms': 'تَأْتَمَّ',
      '2fs': 'تَأْتَمِّي',
      '3ms': 'يَأْتَمَّ',
      '3fs': 'تَأْتَمَّ',
      '2d': 'تَأْتَمَّا',
      '3md': 'يَأْتَمَّا',
      '3fd': 'تَأْتَمَّا',
      '1p': 'نَأْتَمَّ',
      '2mp': 'تَأْتَمُّوا',
      '2fp': 'تَأْتَمِمْنَ',
      '3mp': 'يَأْتَمُّوا',
      '3fp': 'يَأْتَمِمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'mm-8")!, 'jussive')).toEqualT({
      '1s': 'آتَمَّ',
      '2ms': 'تَأْتَمَّ',
      '2fs': 'تَأْتَمِّي',
      '3ms': 'يَأْتَمَّ',
      '3fs': 'تَأْتَمَّ',
      '2d': 'تَأْتَمَّا',
      '3md': 'يَأْتَمَّا',
      '3fd': 'تَأْتَمَّا',
      '1p': 'نَأْتَمَّ',
      '2mp': 'تَأْتَمُّوا',
      '2fp': 'تَأْتَمِمْنَ',
      '3mp': 'يَأْتَمُّوا',
      '3fp': 'يَأْتَمِمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'mm-8")!)).toMatchObjectT({
      '2ms': 'اِئْتَمَّ',
      '2fs': 'اِئْتَمِّي',
      '2d': 'اِئْتَمَّا',
      '2mp': 'اِئْتَمُّوا',
      '2fp': 'اِئْتَمِمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'mm-8")!)).toEqualT({
      '1s': 'اُؤْتُمِمْتُ',
      '2ms': 'اُؤْتُمِمْتَ',
      '2fs': 'اُؤْتُمِمْتِ',
      '3ms': 'اُؤْتُمَّ',
      '3fs': 'اُؤْتُمَّتْ',
      '2d': 'اُؤْتُمِمْتُمَا',
      '3md': 'اُؤْتُمَّا',
      '3fd': 'اُؤْتُمَّتَا',
      '1p': 'اُؤْتُمِمْنَا',
      '2mp': 'اُؤْتُمِمْتُمْ',
      '2fp': 'اُؤْتُمِمْتُنَّ',
      '3mp': 'اُؤْتُمُّوا',
      '3fp': 'اُؤْتُمِمْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mm-8")!, 'indicative')).toEqualT({
      '1s': 'أُوتَمُّ',
      '2ms': 'تُؤْتَمُّ',
      '2fs': 'تُؤْتَمِّينَ',
      '3ms': 'يُؤْتَمُّ',
      '3fs': 'تُؤْتَمُّ',
      '2d': 'تُؤْتَمَّانِ',
      '3md': 'يُؤْتَمَّانِ',
      '3fd': 'تُؤْتَمَّانِ',
      '1p': 'نُؤْتَمُّ',
      '2mp': 'تُؤْتَمُّونَ',
      '2fp': 'تُؤْتَمَمْنَ',
      '3mp': 'يُؤْتَمُّونَ',
      '3fp': 'يُؤْتَمَمْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mm-8")!, 'subjunctive')).toEqualT({
      '1s': 'أُوتَمَّ',
      '2ms': 'تُؤْتَمَّ',
      '2fs': 'تُؤْتَمِّي',
      '3ms': 'يُؤْتَمَّ',
      '3fs': 'تُؤْتَمَّ',
      '2d': 'تُؤْتَمَّا',
      '3md': 'يُؤْتَمَّا',
      '3fd': 'تُؤْتَمَّا',
      '1p': 'نُؤْتَمَّ',
      '2mp': 'تُؤْتَمُّوا',
      '2fp': 'تُؤْتَمَمْنَ',
      '3mp': 'يُؤْتَمُّوا',
      '3fp': 'يُؤْتَمَمْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mm-8")!, 'jussive')).toEqualT({
      '1s': 'أُوتَمَّ',
      '2ms': 'تُؤْتَمَّ',
      '2fs': 'تُؤْتَمِّي',
      '3ms': 'يُؤْتَمَّ',
      '3fs': 'تُؤْتَمَّ',
      '2d': 'تُؤْتَمَّا',
      '3md': 'يُؤْتَمَّا',
      '3fd': 'تُؤْتَمَّا',
      '1p': 'نُؤْتَمَّ',
      '2mp': 'تُؤْتَمُّوا',
      '2fp': 'تُؤْتَمَمْنَ',
      '3mp': 'يُؤْتَمُّوا',
      '3fp': 'يُؤْتَمَمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'mm-8")!)).toEqualT('مُؤْتَمّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'mm-8")!)).toEqualT('مُؤْتَمّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("'mm-8")!)).toEqualT(['اِئْتِمَام'])
  })
})
