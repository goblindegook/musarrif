import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('DmHl-4 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('DmHl-4')!)).toEqualT({
      '1s': 'اِضْمَحْلَلْتُ',
      '2ms': 'اِضْمَحْلَلْتَ',
      '2fs': 'اِضْمَحْلَلْتِ',
      '3ms': 'اِضْمَحَلَّ',
      '3fs': 'اِضْمَحَلَّتْ',
      '2d': 'اِضْمَحْلَلْتُمَا',
      '3md': 'اِضْمَحَلَّا',
      '3fd': 'اِضْمَحَلَّتَا',
      '1p': 'اِضْمَحْلَلْنَا',
      '2mp': 'اِضْمَحْلَلْتُمْ',
      '2fp': 'اِضْمَحْلَلْتُنَّ',
      '3mp': 'اِضْمَحَلُّوا',
      '3fp': 'اِضْمَحْلَلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('DmHl-4')!, 'indicative')).toEqualT({
      '1s': 'أَضْمَحِلُّ',
      '2ms': 'تَضْمَحِلُّ',
      '2fs': 'تَضْمَحِلِّينَ',
      '3ms': 'يَضْمَحِلُّ',
      '3fs': 'تَضْمَحِلُّ',
      '2d': 'تَضْمَحِلَّانِ',
      '3md': 'يَضْمَحِلَّانِ',
      '3fd': 'تَضْمَحِلَّانِ',
      '1p': 'نَضْمَحِلُّ',
      '2mp': 'تَضْمَحِلُّونَ',
      '2fp': 'تَضْمَحْلِلْنَ',
      '3mp': 'يَضْمَحِلُّونَ',
      '3fp': 'يَضْمَحْلِلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('DmHl-4')!, 'subjunctive')).toEqualT({
      '1s': 'أَضْمَحِلَّ',
      '2ms': 'تَضْمَحِلَّ',
      '2fs': 'تَضْمَحِلِّي',
      '3ms': 'يَضْمَحِلَّ',
      '3fs': 'تَضْمَحِلَّ',
      '2d': 'تَضْمَحِلَّا',
      '3md': 'يَضْمَحِلَّا',
      '3fd': 'تَضْمَحِلَّا',
      '1p': 'نَضْمَحِلَّ',
      '2mp': 'تَضْمَحِلُّوا',
      '2fp': 'تَضْمَحْلِلْنَ',
      '3mp': 'يَضْمَحِلُّوا',
      '3fp': 'يَضْمَحْلِلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('DmHl-4')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَضْمَحِلَّ', 'أَضْمَحِلِّ', 'أَضْمَحْلِلْ']),
      '2ms': expect.toBeOneOf(['تَضْمَحِلَّ', 'تَضْمَحِلِّ', 'تَضْمَحْلِلْ']),
      '2fs': 'تَضْمَحِلِّي',
      '3ms': expect.toBeOneOf(['يَضْمَحِلَّ', 'يَضْمَحِلِّ', 'يَضْمَحْلِلْ']),
      '3fs': expect.toBeOneOf(['تَضْمَحِلَّ', 'تَضْمَحِلِّ', 'تَضْمَحْلِلْ']),
      '2d': 'تَضْمَحِلَّا',
      '3md': 'يَضْمَحِلَّا',
      '3fd': 'تَضْمَحِلَّا',
      '1p': expect.toBeOneOf(['نَضْمَحِلَّ', 'نَضْمَحِلِّ', 'نَضْمَحْلِلْ']),
      '2mp': 'تَضْمَحِلُّوا',
      '2fp': 'تَضْمَحْلِلْنَ',
      '3mp': 'يَضْمَحِلُّوا',
      '3fp': 'يَضْمَحْلِلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('DmHl-4')!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['اِضْمَحِلَّ', 'اِضْمَحِلِّ', 'اِضْمَحْلِلْ']),
      '2fs': 'اِضْمَحِلِّي',
      '2d': 'اِضْمَحِلَّا',
      '2mp': 'اِضْمَحِلُّوا',
      '2fp': 'اِضْمَحْلِلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('DmHl-4')!)).toMatchObjectT({
      '3ms': 'اُضْمُحِلَّ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('DmHl-4')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُضْمَحَلُّ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('DmHl-4')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُضْمَحَلَّ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('DmHl-4')!, 'jussive')).toMatchObjectT({
      '3ms': expect.toBeOneOf(['يُضْمَحَلَّ', 'يُضْمَحَلِّ', 'يُضْمَحْلَلْ']),
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('DmHl-4')!)).toEqualT('مُضْمَحِلّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('DmHl-4')!)).toEqualT('مُضْمَحَلّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('DmHl-4')!))).toEqualT(new Set(['اِضْمِحْلَال']))
  })
})
