import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Hwl-10', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hwl-10')!)).toEqualT({
      '1s': 'اِسْتَحَلْتُ',
      '2ms': 'اِسْتَحَلْتَ',
      '2fs': 'اِسْتَحَلْتِ',
      '3ms': 'اِسْتَحَالَ',
      '3fs': 'اِسْتَحَالَتْ',
      '2d': 'اِسْتَحَلْتُمَا',
      '3md': 'اِسْتَحَالَا',
      '3fd': 'اِسْتَحَالَتَا',
      '1p': 'اِسْتَحَلْنَا',
      '2mp': 'اِسْتَحَلْتُمْ',
      '2fp': 'اِسْتَحَلْتُنَّ',
      '3mp': 'اِسْتَحَالُوا',
      '3fp': 'اِسْتَحَلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hwl-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَحِيلُ',
      '2ms': 'تَسْتَحِيلُ',
      '2fs': 'تَسْتَحِيلِينَ',
      '3ms': 'يَسْتَحِيلُ',
      '3fs': 'تَسْتَحِيلُ',
      '2d': 'تَسْتَحِيلَانِ',
      '3md': 'يَسْتَحِيلَانِ',
      '3fd': 'تَسْتَحِيلَانِ',
      '1p': 'نَسْتَحِيلُ',
      '2mp': 'تَسْتَحِيلُونَ',
      '2fp': 'تَسْتَحِلْنَ',
      '3mp': 'يَسْتَحِيلُونَ',
      '3fp': 'يَسْتَحِلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hwl-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَحِيلَ',
      '2ms': 'تَسْتَحِيلَ',
      '2fs': 'تَسْتَحِيلِي',
      '3ms': 'يَسْتَحِيلَ',
      '3fs': 'تَسْتَحِيلَ',
      '2d': 'تَسْتَحِيلَا',
      '3md': 'يَسْتَحِيلَا',
      '3fd': 'تَسْتَحِيلَا',
      '1p': 'نَسْتَحِيلَ',
      '2mp': 'تَسْتَحِيلُوا',
      '2fp': 'تَسْتَحِلْنَ',
      '3mp': 'يَسْتَحِيلُوا',
      '3fp': 'يَسْتَحِلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hwl-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَحِلْ',
      '2ms': 'تَسْتَحِلْ',
      '2fs': 'تَسْتَحِيلِي',
      '3ms': 'يَسْتَحِلْ',
      '3fs': 'تَسْتَحِلْ',
      '2d': 'تَسْتَحِيلَا',
      '3md': 'يَسْتَحِيلَا',
      '3fd': 'تَسْتَحِيلَا',
      '1p': 'نَسْتَحِلْ',
      '2mp': 'تَسْتَحِيلُوا',
      '2fp': 'تَسْتَحِلْنَ',
      '3mp': 'يَسْتَحِيلُوا',
      '3fp': 'يَسْتَحِلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hwl-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَحِلْ',
      '2fs': 'اِسْتَحِيلِي',
      '2d': 'اِسْتَحِيلَا',
      '2mp': 'اِسْتَحِيلُوا',
      '2fp': 'اِسْتَحِلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Hwl-10')!)).toMatchObjectT({
      '3ms': 'اُسْتُحِيلَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hwl-10')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُسْتَحَالُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hwl-10')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُسْتَحَالَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hwl-10')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُسْتَحَلْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hwl-10')!)).toEqualT('مُسْتَحِيل')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Hwl-10')!)).toEqualT('مُسْتَحَال')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Hwl-10')!)).toEqualT(['اِسْتِحَالَة'])
  })
})
