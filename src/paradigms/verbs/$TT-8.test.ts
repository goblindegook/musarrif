import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$TT-8 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$TT-8')!)).toEqualT({
      '1s': 'اِشْتَطَطْتُ',
      '2ms': 'اِشْتَطَطْتَ',
      '2fs': 'اِشْتَطَطْتِ',
      '3ms': 'اِشْتَطَّ',
      '3fs': 'اِشْتَطَّتْ',
      '2d': 'اِشْتَطَطْتُمَا',
      '3md': 'اِشْتَطَّا',
      '3fd': 'اِشْتَطَّتَا',
      '1p': 'اِشْتَطَطْنَا',
      '2mp': 'اِشْتَطَطْتُمْ',
      '2fp': 'اِشْتَطَطْتُنَّ',
      '3mp': 'اِشْتَطُّوا',
      '3fp': 'اِشْتَطَطْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$TT-8')!, 'indicative')).toEqualT({
      '1s': 'أَشْتَطُّ',
      '2ms': 'تَشْتَطُّ',
      '2fs': 'تَشْتَطِّينَ',
      '3ms': 'يَشْتَطُّ',
      '3fs': 'تَشْتَطُّ',
      '2d': 'تَشْتَطَّانِ',
      '3md': 'يَشْتَطَّانِ',
      '3fd': 'تَشْتَطَّانِ',
      '1p': 'نَشْتَطُّ',
      '2mp': 'تَشْتَطُّونَ',
      '2fp': 'تَشْتَطِطْنَ',
      '3mp': 'يَشْتَطُّونَ',
      '3fp': 'يَشْتَطِطْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$TT-8')!, 'subjunctive')).toEqualT({
      '1s': 'أَشْتَطَّ',
      '2ms': 'تَشْتَطَّ',
      '2fs': 'تَشْتَطِّي',
      '3ms': 'يَشْتَطَّ',
      '3fs': 'تَشْتَطَّ',
      '2d': 'تَشْتَطَّا',
      '3md': 'يَشْتَطَّا',
      '3fd': 'تَشْتَطَّا',
      '1p': 'نَشْتَطَّ',
      '2mp': 'تَشْتَطُّوا',
      '2fp': 'تَشْتَطِطْنَ',
      '3mp': 'يَشْتَطُّوا',
      '3fp': 'يَشْتَطِطْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$TT-8')!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَشْتَطَّ', 'أَشْتَطِّ', 'أَشْتَطِطْ']),
      '2ms': expect.toBeOneOf(['تَشْتَطَّ', 'تَشْتَطِّ', 'تَشْتَطِطْ']),
      '2fs': 'تَشْتَطِّي',
      '3ms': expect.toBeOneOf(['يَشْتَطَّ', 'يَشْتَطِّ', 'يَشْتَطِطْ']),
      '3fs': expect.toBeOneOf(['تَشْتَطَّ', 'تَشْتَطِّ', 'تَشْتَطِطْ']),
      '2d': 'تَشْتَطَّا',
      '3md': 'يَشْتَطَّا',
      '3fd': 'تَشْتَطَّا',
      '1p': expect.toBeOneOf(['نَشْتَطَّ', 'نَشْتَطِّ', 'نَشْتَطِطْ']),
      '2mp': 'تَشْتَطُّوا',
      '2fp': 'تَشْتَطِطْنَ',
      '3mp': 'يَشْتَطُّوا',
      '3fp': 'يَشْتَطِطْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$TT-8')!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['اِشْتَطَّ', 'اِشْتَطِّ', 'اِشْتَطِطْ']),
      '2fs': 'اِشْتَطِّي',
      '2d': 'اِشْتَطَّا',
      '2mp': 'اِشْتَطُّوا',
      '2fp': 'اِشْتَطِطْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$TT-8')!)).toMatchObjectT({
      '3ms': 'اُشْتُطَّ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$TT-8')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُشْتَطُّ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$TT-8')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُشْتَطَّ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$TT-8')!, 'jussive')).toMatchObjectT({
      '3ms': expect.toBeOneOf(['يُشْتَطَّ', 'يُشْتَطِّ', 'يُشْتَطَطْ']),
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$TT-8')!)).toEqualT('مُشْتَطّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$TT-8')!)).toEqualT('مُشْتَطّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$TT-8')!))).toEqualT(new Set(['اِشْتِطَاط']))
  })
})
