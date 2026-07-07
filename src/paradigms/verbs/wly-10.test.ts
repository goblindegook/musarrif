import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wly-10', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wly-10')!)).toEqualT({
      '1s': 'اِسْتَوْلَيْتُ',
      '2ms': 'اِسْتَوْلَيْتَ',
      '2fs': 'اِسْتَوْلَيْتِ',
      '3ms': 'اِسْتَوْلَى',
      '3fs': 'اِسْتَوْلَتْ',
      '2d': 'اِسْتَوْلَيْتُمَا',
      '3md': 'اِسْتَوْلَيَا',
      '3fd': 'اِسْتَوْلَتَا',
      '1p': 'اِسْتَوْلَيْنَا',
      '2mp': 'اِسْتَوْلَيْتُمْ',
      '2fp': 'اِسْتَوْلَيْتُنَّ',
      '3mp': 'اِسْتَوْلَوْا',
      '3fp': 'اِسْتَوْلَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wly-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَوْلِي',
      '2ms': 'تَسْتَوْلِي',
      '2fs': 'تَسْتَوْلِينَ',
      '3ms': 'يَسْتَوْلِي',
      '3fs': 'تَسْتَوْلِي',
      '2d': 'تَسْتَوْلِيَانِ',
      '3md': 'يَسْتَوْلِيَانِ',
      '3fd': 'تَسْتَوْلِيَانِ',
      '1p': 'نَسْتَوْلِي',
      '2mp': 'تَسْتَوْلُونَ',
      '2fp': 'تَسْتَوْلِينَ',
      '3mp': 'يَسْتَوْلُونَ',
      '3fp': 'يَسْتَوْلِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wly-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَوْلِيَ',
      '2ms': 'تَسْتَوْلِيَ',
      '2fs': 'تَسْتَوْلِي',
      '3ms': 'يَسْتَوْلِيَ',
      '3fs': 'تَسْتَوْلِيَ',
      '2d': 'تَسْتَوْلِيَا',
      '3md': 'يَسْتَوْلِيَا',
      '3fd': 'تَسْتَوْلِيَا',
      '1p': 'نَسْتَوْلِيَ',
      '2mp': 'تَسْتَوْلُوا',
      '2fp': 'تَسْتَوْلِينَ',
      '3mp': 'يَسْتَوْلُوا',
      '3fp': 'يَسْتَوْلِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wly-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَوْلِ',
      '2ms': 'تَسْتَوْلِ',
      '2fs': 'تَسْتَوْلِي',
      '3ms': 'يَسْتَوْلِ',
      '3fs': 'تَسْتَوْلِ',
      '2d': 'تَسْتَوْلِيَا',
      '3md': 'يَسْتَوْلِيَا',
      '3fd': 'تَسْتَوْلِيَا',
      '1p': 'نَسْتَوْلِ',
      '2mp': 'تَسْتَوْلُوا',
      '2fp': 'تَسْتَوْلِينَ',
      '3mp': 'يَسْتَوْلُوا',
      '3fp': 'يَسْتَوْلِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wly-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَوْلِ',
      '2fs': 'اِسْتَوْلِي',
      '2d': 'اِسْتَوْلِيَا',
      '2mp': 'اِسْتَوْلُوا',
      '2fp': 'اِسْتَوْلِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wly-10')!)).toMatchObjectT({
      '3ms': 'اُسْتُولِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wly-10')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُسْتَوْلَى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wly-10')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُسْتَوْلَى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wly-10')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُسْتَوْلَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wly-10')!)).toEqualT('مُسْتَوْلٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wly-10')!)).toEqualT('مُسْتَوْلًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wly-10')!)).toEqualT(['اِسْتِيلَاء'])
  })
})
