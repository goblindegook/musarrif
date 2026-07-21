import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('xDl-9 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('xDl-9')!)).toEqualT({
      '1s': 'اِخْضَلَلْتُ',
      '2ms': 'اِخْضَلَلْتَ',
      '2fs': 'اِخْضَلَلْتِ',
      '3ms': 'اِخْضَلَّ',
      '3fs': 'اِخْضَلَّتْ',
      '2d': 'اِخْضَلَلْتُمَا',
      '3md': 'اِخْضَلَّا',
      '3fd': 'اِخْضَلَّتَا',
      '1p': 'اِخْضَلَلْنَا',
      '2mp': 'اِخْضَلَلْتُمْ',
      '2fp': 'اِخْضَلَلْتُنَّ',
      '3mp': 'اِخْضَلُّوا',
      '3fp': 'اِخْضَلَلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('xDl-9')!, 'indicative')).toEqualT({
      '1s': 'أَخْضَلُّ',
      '2ms': 'تَخْضَلُّ',
      '2fs': 'تَخْضَلِّينَ',
      '3ms': 'يَخْضَلُّ',
      '3fs': 'تَخْضَلُّ',
      '2d': 'تَخْضَلَّانِ',
      '3md': 'يَخْضَلَّانِ',
      '3fd': 'تَخْضَلَّانِ',
      '1p': 'نَخْضَلُّ',
      '2mp': 'تَخْضَلُّونَ',
      '2fp': 'تَخْضَلِلْنَ',
      '3mp': 'يَخْضَلُّونَ',
      '3fp': 'يَخْضَلِلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('xDl-9')!, 'subjunctive')).toEqualT({
      '1s': 'أَخْضَلَّ',
      '2ms': 'تَخْضَلَّ',
      '2fs': 'تَخْضَلِّي',
      '3ms': 'يَخْضَلَّ',
      '3fs': 'تَخْضَلَّ',
      '2d': 'تَخْضَلَّا',
      '3md': 'يَخْضَلَّا',
      '3fd': 'تَخْضَلَّا',
      '1p': 'نَخْضَلَّ',
      '2mp': 'تَخْضَلُّوا',
      '2fp': 'تَخْضَلِلْنَ',
      '3mp': 'يَخْضَلُّوا',
      '3fp': 'يَخْضَلِلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('xDl-9')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَخْضَلَّ', 'أَخْضَلِّ', 'أَخْضَلِلْ']),
      '2ms': expect.toBeOneOf(['تَخْضَلَّ', 'تَخْضَلِّ', 'تَخْضَلِلْ']),
      '2fs': 'تَخْضَلِّي',
      '3ms': expect.toBeOneOf(['يَخْضَلَّ', 'يَخْضَلِّ', 'يَخْضَلِلْ']),
      '3fs': expect.toBeOneOf(['تَخْضَلَّ', 'تَخْضَلِّ', 'تَخْضَلِلْ']),
      '2d': 'تَخْضَلَّا',
      '3md': 'يَخْضَلَّا',
      '3fd': 'تَخْضَلَّا',
      '1p': expect.toBeOneOf(['نَخْضَلَّ', 'نَخْضَلِّ', 'نَخْضَلِلْ']),
      '2mp': 'تَخْضَلُّوا',
      '2fp': 'تَخْضَلِلْنَ',
      '3mp': 'يَخْضَلُّوا',
      '3fp': 'يَخْضَلِلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('xDl-9')!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['اِخْضَلَّ', 'اِخْضَلِّ', 'اِخْضَلِلْ']),
      '2fs': 'اِخْضَلِّي',
      '2d': 'اِخْضَلَّا',
      '2mp': 'اِخْضَلُّوا',
      '2fp': 'اِخْضَلِلْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('xDl-9')!)).toEqualT('مُخْضَلّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('xDl-9')!))).toEqualT(new Set(['اِخْضِلَال']))
  })
})
