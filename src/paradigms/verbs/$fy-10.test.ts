import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$fy-10 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$fy-10')!)).toEqualT({
      '1s': 'اِسْتَشْفَيْتُ',
      '2ms': 'اِسْتَشْفَيْتَ',
      '2fs': 'اِسْتَشْفَيْتِ',
      '3ms': 'اِسْتَشْفَى',
      '3fs': 'اِسْتَشْفَتْ',
      '2d': 'اِسْتَشْفَيْتُمَا',
      '3md': 'اِسْتَشْفَيَا',
      '3fd': 'اِسْتَشْفَتَا',
      '1p': 'اِسْتَشْفَيْنَا',
      '2mp': 'اِسْتَشْفَيْتُمْ',
      '2fp': 'اِسْتَشْفَيْتُنَّ',
      '3mp': 'اِسْتَشْفَوْا',
      '3fp': 'اِسْتَشْفَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$fy-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَشْفِي',
      '2ms': 'تَسْتَشْفِي',
      '2fs': 'تَسْتَشْفِينَ',
      '3ms': 'يَسْتَشْفِي',
      '3fs': 'تَسْتَشْفِي',
      '2d': 'تَسْتَشْفِيَانِ',
      '3md': 'يَسْتَشْفِيَانِ',
      '3fd': 'تَسْتَشْفِيَانِ',
      '1p': 'نَسْتَشْفِي',
      '2mp': 'تَسْتَشْفُونَ',
      '2fp': 'تَسْتَشْفِينَ',
      '3mp': 'يَسْتَشْفُونَ',
      '3fp': 'يَسْتَشْفِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$fy-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَشْفِيَ',
      '2ms': 'تَسْتَشْفِيَ',
      '2fs': 'تَسْتَشْفِي',
      '3ms': 'يَسْتَشْفِيَ',
      '3fs': 'تَسْتَشْفِيَ',
      '2d': 'تَسْتَشْفِيَا',
      '3md': 'يَسْتَشْفِيَا',
      '3fd': 'تَسْتَشْفِيَا',
      '1p': 'نَسْتَشْفِيَ',
      '2mp': 'تَسْتَشْفُوا',
      '2fp': 'تَسْتَشْفِينَ',
      '3mp': 'يَسْتَشْفُوا',
      '3fp': 'يَسْتَشْفِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$fy-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَشْفِ',
      '2ms': 'تَسْتَشْفِ',
      '2fs': 'تَسْتَشْفِي',
      '3ms': 'يَسْتَشْفِ',
      '3fs': 'تَسْتَشْفِ',
      '2d': 'تَسْتَشْفِيَا',
      '3md': 'يَسْتَشْفِيَا',
      '3fd': 'تَسْتَشْفِيَا',
      '1p': 'نَسْتَشْفِ',
      '2mp': 'تَسْتَشْفُوا',
      '2fp': 'تَسْتَشْفِينَ',
      '3mp': 'يَسْتَشْفُوا',
      '3fp': 'يَسْتَشْفِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$fy-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَشْفِ',
      '2fs': 'اِسْتَشْفِي',
      '2d': 'اِسْتَشْفِيَا',
      '2mp': 'اِسْتَشْفُوا',
      '2fp': 'اِسْتَشْفِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$fy-10')!)).toMatchObjectT({
      '3ms': 'اُسْتُشْفِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$fy-10')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُسْتَشْفَى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$fy-10')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُسْتَشْفَى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$fy-10')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُسْتَشْفَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$fy-10')!)).toEqualT('مُسْتَشْفٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$fy-10')!)).toEqualT('مُسْتَشْفًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$fy-10')!))).toEqualT(new Set(['اِسْتِشْفَاء']))
  })
})
