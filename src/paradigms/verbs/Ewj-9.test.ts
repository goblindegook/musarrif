import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('Ewj-9 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Ewj-9')!)).toEqualT({
      '1s': 'اِعْوَجَجْتُ',
      '2ms': 'اِعْوَجَجْتَ',
      '2fs': 'اِعْوَجَجْتِ',
      '3ms': 'اِعْوَجَّ',
      '3fs': 'اِعْوَجَّتْ',
      '2d': 'اِعْوَجَجْتُمَا',
      '3md': 'اِعْوَجَّا',
      '3fd': 'اِعْوَجَّتَا',
      '1p': 'اِعْوَجَجْنَا',
      '2mp': 'اِعْوَجَجْتُمْ',
      '2fp': 'اِعْوَجَجْتُنَّ',
      '3mp': 'اِعْوَجُّوا',
      '3fp': 'اِعْوَجَجْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Ewj-9')!, 'indicative')).toEqualT({
      '1s': 'أَعْوَجُّ',
      '2ms': 'تَعْوَجُّ',
      '2fs': 'تَعْوَجِّينَ',
      '3ms': 'يَعْوَجُّ',
      '3fs': 'تَعْوَجُّ',
      '2d': 'تَعْوَجَّانِ',
      '3md': 'يَعْوَجَّانِ',
      '3fd': 'تَعْوَجَّانِ',
      '1p': 'نَعْوَجُّ',
      '2mp': 'تَعْوَجُّونَ',
      '2fp': 'تَعْوَجِجْنَ',
      '3mp': 'يَعْوَجُّونَ',
      '3fp': 'يَعْوَجِجْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Ewj-9')!, 'subjunctive')).toEqualT({
      '1s': 'أَعْوَجَّ',
      '2ms': 'تَعْوَجَّ',
      '2fs': 'تَعْوَجِّي',
      '3ms': 'يَعْوَجَّ',
      '3fs': 'تَعْوَجَّ',
      '2d': 'تَعْوَجَّا',
      '3md': 'يَعْوَجَّا',
      '3fd': 'تَعْوَجَّا',
      '1p': 'نَعْوَجَّ',
      '2mp': 'تَعْوَجُّوا',
      '2fp': 'تَعْوَجِجْنَ',
      '3mp': 'يَعْوَجُّوا',
      '3fp': 'يَعْوَجِجْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Ewj-9')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَعْوَجَّ', 'أَعْوَجِّ', 'أَعْوَجِجْ']),
      '2ms': expect.toBeOneOf(['تَعْوَجَّ', 'تَعْوَجِّ', 'تَعْوَجِجْ']),
      '2fs': 'تَعْوَجِّي',
      '3ms': expect.toBeOneOf(['يَعْوَجَّ', 'يَعْوَجِّ', 'يَعْوَجِجْ']),
      '3fs': expect.toBeOneOf(['تَعْوَجَّ', 'تَعْوَجِّ', 'تَعْوَجِجْ']),
      '2d': 'تَعْوَجَّا',
      '3md': 'يَعْوَجَّا',
      '3fd': 'تَعْوَجَّا',
      '1p': expect.toBeOneOf(['نَعْوَجَّ', 'نَعْوَجِّ', 'نَعْوَجِجْ']),
      '2mp': 'تَعْوَجُّوا',
      '2fp': 'تَعْوَجِجْنَ',
      '3mp': 'يَعْوَجُّوا',
      '3fp': 'يَعْوَجِجْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Ewj-9')!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['اِعْوَجَّ', 'اِعْوَجِّ', 'اِعْوَجِجْ']),
      '2fs': 'اِعْوَجِّي',
      '2d': 'اِعْوَجَّا',
      '2mp': 'اِعْوَجُّوا',
      '2fp': 'اِعْوَجِجْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Ewj-9')!)).toEqualT('مُعْوَجّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Ewj-9')!))).toEqualT(new Set(['اِعْوِجَاج']))
  })
})
