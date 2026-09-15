import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Eyy-10 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Eyy-10')!)).toEqualT({
      '1s': 'اِسْتَعْيَيْتُ',
      '2ms': 'اِسْتَعْيَيْتَ',
      '2fs': 'اِسْتَعْيَيْتِ',
      '3ms': 'اِسْتَعْيَا',
      '3fs': 'اِسْتَعْيَتْ',
      '2d': 'اِسْتَعْيَيْتُمَا',
      '3md': 'اِسْتَعْيَيَا',
      '3fd': 'اِسْتَعْيَتَا',
      '1p': 'اِسْتَعْيَيْنَا',
      '2mp': 'اِسْتَعْيَيْتُمْ',
      '2fp': 'اِسْتَعْيَيْتُنَّ',
      '3mp': 'اِسْتَعْيَوْا',
      '3fp': 'اِسْتَعْيَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Eyy-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَعْيِي',
      '2ms': 'تَسْتَعْيِي',
      '2fs': 'تَسْتَعْيِينَ',
      '3ms': 'يَسْتَعْيِي',
      '3fs': 'تَسْتَعْيِي',
      '2d': 'تَسْتَعْيِيَانِ',
      '3md': 'يَسْتَعْيِيَانِ',
      '3fd': 'تَسْتَعْيِيَانِ',
      '1p': 'نَسْتَعْيِي',
      '2mp': 'تَسْتَعْيُونَ',
      '2fp': 'تَسْتَعْيِينَ',
      '3mp': 'يَسْتَعْيُونَ',
      '3fp': 'يَسْتَعْيِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Eyy-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَعْيِيَ',
      '2ms': 'تَسْتَعْيِيَ',
      '2fs': 'تَسْتَعْيِي',
      '3ms': 'يَسْتَعْيِيَ',
      '3fs': 'تَسْتَعْيِيَ',
      '2d': 'تَسْتَعْيِيَا',
      '3md': 'يَسْتَعْيِيَا',
      '3fd': 'تَسْتَعْيِيَا',
      '1p': 'نَسْتَعْيِيَ',
      '2mp': 'تَسْتَعْيُوا',
      '2fp': 'تَسْتَعْيِينَ',
      '3mp': 'يَسْتَعْيُوا',
      '3fp': 'يَسْتَعْيِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Eyy-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَعْيِ',
      '2ms': 'تَسْتَعْيِ',
      '2fs': 'تَسْتَعْيِي',
      '3ms': 'يَسْتَعْيِ',
      '3fs': 'تَسْتَعْيِ',
      '2d': 'تَسْتَعْيِيَا',
      '3md': 'يَسْتَعْيِيَا',
      '3fd': 'تَسْتَعْيِيَا',
      '1p': 'نَسْتَعْيِ',
      '2mp': 'تَسْتَعْيُوا',
      '2fp': 'تَسْتَعْيِينَ',
      '3mp': 'يَسْتَعْيُوا',
      '3fp': 'يَسْتَعْيِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Eyy-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَعْيِ',
      '2fs': 'اِسْتَعْيِي',
      '2d': 'اِسْتَعْيِيَا',
      '2mp': 'اِسْتَعْيُوا',
      '2fp': 'اِسْتَعْيِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Eyy-10')!)).toMatchObjectT({
      '3ms': 'اُسْتُعْيِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Eyy-10')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُسْتَعْيَا',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Eyy-10')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُسْتَعْيَا',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Eyy-10')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُسْتَعْيَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Eyy-10')!)).toEqualT('مُسْتَعْيٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Eyy-10')!)).toEqualT('مُسْتَعْيًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Eyy-10')!))).toEqualT(new Set(['اِسْتِعْيَاء']))
  })
})
