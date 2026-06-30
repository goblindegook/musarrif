import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('fkk-7', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('fkk-7')!)).toEqualT({
      '1s': 'اِنْفَكَكْتُ',
      '2ms': 'اِنْفَكَكْتَ',
      '2fs': 'اِنْفَكَكْتِ',
      '3ms': 'اِنْفَكَّ',
      '3fs': 'اِنْفَكَّتْ',
      '2d': 'اِنْفَكَكْتُمَا',
      '3md': 'اِنْفَكَّا',
      '3fd': 'اِنْفَكَّتَا',
      '1p': 'اِنْفَكَكْنَا',
      '2mp': 'اِنْفَكَكْتُمْ',
      '2fp': 'اِنْفَكَكْتُنَّ',
      '3mp': 'اِنْفَكُّوا',
      '3fp': 'اِنْفَكَكْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('fkk-7')!, 'indicative')).toEqualT({
      '1s': 'أَنْفَكُّ',
      '2ms': 'تَنْفَكُّ',
      '2fs': 'تَنْفَكِّينَ',
      '3ms': 'يَنْفَكُّ',
      '3fs': 'تَنْفَكُّ',
      '2d': 'تَنْفَكَّانِ',
      '3md': 'يَنْفَكَّانِ',
      '3fd': 'تَنْفَكَّانِ',
      '1p': 'نَنْفَكُّ',
      '2mp': 'تَنْفَكُّونَ',
      '2fp': 'تَنْفَكِكْنَ',
      '3mp': 'يَنْفَكُّونَ',
      '3fp': 'يَنْفَكِكْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('fkk-7')!, 'subjunctive')).toEqualT({
      '1s': 'أَنْفَكَّ',
      '2ms': 'تَنْفَكَّ',
      '2fs': 'تَنْفَكِّي',
      '3ms': 'يَنْفَكَّ',
      '3fs': 'تَنْفَكَّ',
      '2d': 'تَنْفَكَّا',
      '3md': 'يَنْفَكَّا',
      '3fd': 'تَنْفَكَّا',
      '1p': 'نَنْفَكَّ',
      '2mp': 'تَنْفَكُّوا',
      '2fp': 'تَنْفَكِكْنَ',
      '3mp': 'يَنْفَكُّوا',
      '3fp': 'يَنْفَكِكْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('fkk-7')!, 'jussive')).toEqualT({
      '1s': 'أَنْفَكَّ',
      '2ms': 'تَنْفَكَّ',
      '2fs': 'تَنْفَكِّي',
      '3ms': 'يَنْفَكَّ',
      '3fs': 'تَنْفَكَّ',
      '2d': 'تَنْفَكَّا',
      '3md': 'يَنْفَكَّا',
      '3fd': 'تَنْفَكَّا',
      '1p': 'نَنْفَكَّ',
      '2mp': 'تَنْفَكُّوا',
      '2fp': 'تَنْفَكِكْنَ',
      '3mp': 'يَنْفَكُّوا',
      '3fp': 'يَنْفَكِكْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('fkk-7')!)).toMatchObjectT({
      '2ms': 'اِنْفَكَّ',
      '2fs': 'اِنْفَكِّي',
      '2d': 'اِنْفَكَّا',
      '2mp': 'اِنْفَكُّوا',
      '2fp': 'اِنْفَكِكْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('fkk-7')!)).toEqualT('مُنْفَكّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('fkk-7')!)).toEqualT(['اِنْفِكَاك'])
  })
})
