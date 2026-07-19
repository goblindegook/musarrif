import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('Hmm-10', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hmm-10')!)).toEqualT({
      '1s': 'اِسْتَحْمَمْتُ',
      '2ms': 'اِسْتَحْمَمْتَ',
      '2fs': 'اِسْتَحْمَمْتِ',
      '3ms': 'اِسْتَحَمَّ',
      '3fs': 'اِسْتَحَمَّتْ',
      '2d': 'اِسْتَحْمَمْتُمَا',
      '3md': 'اِسْتَحَمَّا',
      '3fd': 'اِسْتَحَمَّتَا',
      '1p': 'اِسْتَحْمَمْنَا',
      '2mp': 'اِسْتَحْمَمْتُمْ',
      '2fp': 'اِسْتَحْمَمْتُنَّ',
      '3mp': 'اِسْتَحَمُّوا',
      '3fp': 'اِسْتَحْمَمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hmm-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَحِمُّ',
      '2ms': 'تَسْتَحِمُّ',
      '2fs': 'تَسْتَحِمِّينَ',
      '3ms': 'يَسْتَحِمُّ',
      '3fs': 'تَسْتَحِمُّ',
      '2d': 'تَسْتَحِمَّانِ',
      '3md': 'يَسْتَحِمَّانِ',
      '3fd': 'تَسْتَحِمَّانِ',
      '1p': 'نَسْتَحِمُّ',
      '2mp': 'تَسْتَحِمُّونَ',
      '2fp': 'تَسْتَحْمِمْنَ',
      '3mp': 'يَسْتَحِمُّونَ',
      '3fp': 'يَسْتَحْمِمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hmm-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَحِمَّ',
      '2ms': 'تَسْتَحِمَّ',
      '2fs': 'تَسْتَحِمِّي',
      '3ms': 'يَسْتَحِمَّ',
      '3fs': 'تَسْتَحِمَّ',
      '2d': 'تَسْتَحِمَّا',
      '3md': 'يَسْتَحِمَّا',
      '3fd': 'تَسْتَحِمَّا',
      '1p': 'نَسْتَحِمَّ',
      '2mp': 'تَسْتَحِمُّوا',
      '2fp': 'تَسْتَحْمِمْنَ',
      '3mp': 'يَسْتَحِمُّوا',
      '3fp': 'يَسْتَحْمِمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hmm-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَحِمَّ',
      '2ms': 'تَسْتَحِمَّ',
      '2fs': 'تَسْتَحِمِّي',
      '3ms': 'يَسْتَحِمَّ',
      '3fs': 'تَسْتَحِمَّ',
      '2d': 'تَسْتَحِمَّا',
      '3md': 'يَسْتَحِمَّا',
      '3fd': 'تَسْتَحِمَّا',
      '1p': 'نَسْتَحِمَّ',
      '2mp': 'تَسْتَحِمُّوا',
      '2fp': 'تَسْتَحْمِمْنَ',
      '3mp': 'يَسْتَحِمُّوا',
      '3fp': 'يَسْتَحْمِمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hmm-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَحِمَّ',
      '2fs': 'اِسْتَحِمِّي',
      '2d': 'اِسْتَحِمَّا',
      '2mp': 'اِسْتَحِمُّوا',
      '2fp': 'اِسْتَحْمِمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hmm-10')!)).toEqualT('مُسْتَحِمّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Hmm-10')!)).toEqualT(['اِسْتِحْمَام'])
  })
})
