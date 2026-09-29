import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$gf-7 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$gf-7')!)).toEqualT({
      '1s': 'اِنْشَغَفْتُ',
      '2ms': 'اِنْشَغَفْتَ',
      '2fs': 'اِنْشَغَفْتِ',
      '3ms': 'اِنْشَغَفَ',
      '3fs': 'اِنْشَغَفَتْ',
      '2d': 'اِنْشَغَفْتُمَا',
      '3md': 'اِنْشَغَفَا',
      '3fd': 'اِنْشَغَفَتَا',
      '1p': 'اِنْشَغَفْنَا',
      '2mp': 'اِنْشَغَفْتُمْ',
      '2fp': 'اِنْشَغَفْتُنَّ',
      '3mp': 'اِنْشَغَفُوا',
      '3fp': 'اِنْشَغَفْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$gf-7')!, 'indicative')).toEqualT({
      '1s': 'أَنْشَغِفُ',
      '2ms': 'تَنْشَغِفُ',
      '2fs': 'تَنْشَغِفِينَ',
      '3ms': 'يَنْشَغِفُ',
      '3fs': 'تَنْشَغِفُ',
      '2d': 'تَنْشَغِفَانِ',
      '3md': 'يَنْشَغِفَانِ',
      '3fd': 'تَنْشَغِفَانِ',
      '1p': 'نَنْشَغِفُ',
      '2mp': 'تَنْشَغِفُونَ',
      '2fp': 'تَنْشَغِفْنَ',
      '3mp': 'يَنْشَغِفُونَ',
      '3fp': 'يَنْشَغِفْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$gf-7')!, 'subjunctive')).toEqualT({
      '1s': 'أَنْشَغِفَ',
      '2ms': 'تَنْشَغِفَ',
      '2fs': 'تَنْشَغِفِي',
      '3ms': 'يَنْشَغِفَ',
      '3fs': 'تَنْشَغِفَ',
      '2d': 'تَنْشَغِفَا',
      '3md': 'يَنْشَغِفَا',
      '3fd': 'تَنْشَغِفَا',
      '1p': 'نَنْشَغِفَ',
      '2mp': 'تَنْشَغِفُوا',
      '2fp': 'تَنْشَغِفْنَ',
      '3mp': 'يَنْشَغِفُوا',
      '3fp': 'يَنْشَغِفْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$gf-7')!, 'jussive')).toEqualT({
      '1s': 'أَنْشَغِفْ',
      '2ms': 'تَنْشَغِفْ',
      '2fs': 'تَنْشَغِفِي',
      '3ms': 'يَنْشَغِفْ',
      '3fs': 'تَنْشَغِفْ',
      '2d': 'تَنْشَغِفَا',
      '3md': 'يَنْشَغِفَا',
      '3fd': 'تَنْشَغِفَا',
      '1p': 'نَنْشَغِفْ',
      '2mp': 'تَنْشَغِفُوا',
      '2fp': 'تَنْشَغِفْنَ',
      '3mp': 'يَنْشَغِفُوا',
      '3fp': 'يَنْشَغِفْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$gf-7')!)).toMatchObjectT({
      '2ms': 'اِنْشَغِفْ',
      '2fs': 'اِنْشَغِفِي',
      '2d': 'اِنْشَغِفَا',
      '2mp': 'اِنْشَغِفُوا',
      '2fp': 'اِنْشَغِفْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$gf-7')!)).toMatchObjectT({
      '3ms': 'اُنْشُغِفَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$gf-7')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُنْشَغَفُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$gf-7')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُنْشَغَفَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$gf-7')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُنْشَغَفْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$gf-7')!)).toEqualT('مُنْشَغِف')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$gf-7')!)).toEqualT('مُنْشَغَف')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$gf-7')!))).toEqualT(new Set(['اِنْشِغَاف']))
  })
})
