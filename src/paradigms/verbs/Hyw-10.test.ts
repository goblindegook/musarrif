import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Hyw-10 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hyw-10')!)).toEqualT({
      '1s': 'اِسْتَحْيَيْتُ',
      '2ms': 'اِسْتَحْيَيْتَ',
      '2fs': 'اِسْتَحْيَيْتِ',
      '3ms': 'اِسْتَحْيَا',
      '3fs': 'اِسْتَحْيَتْ',
      '2d': 'اِسْتَحْيَيْتُمَا',
      '3md': 'اِسْتَحْيَيَا',
      '3fd': 'اِسْتَحْيَتَا',
      '1p': 'اِسْتَحْيَيْنَا',
      '2mp': 'اِسْتَحْيَيْتُمْ',
      '2fp': 'اِسْتَحْيَيْتُنَّ',
      '3mp': 'اِسْتَحْيَوْا',
      '3fp': 'اِسْتَحْيَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hyw-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَحْيِي',
      '2ms': 'تَسْتَحْيِي',
      '2fs': 'تَسْتَحْيِينَ',
      '3ms': 'يَسْتَحْيِي',
      '3fs': 'تَسْتَحْيِي',
      '2d': 'تَسْتَحْيِيَانِ',
      '3md': 'يَسْتَحْيِيَانِ',
      '3fd': 'تَسْتَحْيِيَانِ',
      '1p': 'نَسْتَحْيِي',
      '2mp': 'تَسْتَحْيُونَ',
      '2fp': 'تَسْتَحْيِينَ',
      '3mp': 'يَسْتَحْيُونَ',
      '3fp': 'يَسْتَحْيِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hyw-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَحْيِيَ',
      '2ms': 'تَسْتَحْيِيَ',
      '2fs': 'تَسْتَحْيِي',
      '3ms': 'يَسْتَحْيِيَ',
      '3fs': 'تَسْتَحْيِيَ',
      '2d': 'تَسْتَحْيِيَا',
      '3md': 'يَسْتَحْيِيَا',
      '3fd': 'تَسْتَحْيِيَا',
      '1p': 'نَسْتَحْيِيَ',
      '2mp': 'تَسْتَحْيُوا',
      '2fp': 'تَسْتَحْيِينَ',
      '3mp': 'يَسْتَحْيُوا',
      '3fp': 'يَسْتَحْيِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hyw-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَحْيِ',
      '2ms': 'تَسْتَحْيِ',
      '2fs': 'تَسْتَحْيِي',
      '3ms': 'يَسْتَحْيِ',
      '3fs': 'تَسْتَحْيِ',
      '2d': 'تَسْتَحْيِيَا',
      '3md': 'يَسْتَحْيِيَا',
      '3fd': 'تَسْتَحْيِيَا',
      '1p': 'نَسْتَحْيِ',
      '2mp': 'تَسْتَحْيُوا',
      '2fp': 'تَسْتَحْيِينَ',
      '3mp': 'يَسْتَحْيُوا',
      '3fp': 'يَسْتَحْيِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hyw-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَحْيِ',
      '2fs': 'اِسْتَحْيِي',
      '2d': 'اِسْتَحْيِيَا',
      '2mp': 'اِسْتَحْيُوا',
      '2fp': 'اِسْتَحْيِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Hyw-10')!)).toEqualT({
      '1s': 'اُسْتُحْيِيتُ',
      '2ms': 'اُسْتُحْيِيتَ',
      '2fs': 'اُسْتُحْيِيتِ',
      '3ms': 'اُسْتُحْيِيَ',
      '3fs': 'اُسْتُحْيِيَتْ',
      '2d': 'اُسْتُحْيِيتُمَا',
      '3md': 'اُسْتُحْيِيَا',
      '3fd': 'اُسْتُحْيِيَتَا',
      '1p': 'اُسْتُحْيِينَا',
      '2mp': 'اُسْتُحْيِيتُمْ',
      '2fp': 'اُسْتُحْيِيتُنَّ',
      '3mp': 'اُسْتُحْيُوا',
      '3fp': 'اُسْتُحْيِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyw-10')!, 'indicative')).toEqualT({
      '1s': 'أُسْتَحْيَا',
      '2ms': 'تُسْتَحْيَا',
      '2fs': 'تُسْتَحْيَيْنَ',
      '3ms': 'يُسْتَحْيَا',
      '3fs': 'تُسْتَحْيَا',
      '2d': 'تُسْتَحْيَيَانِ',
      '3md': 'يُسْتَحْيَيَانِ',
      '3fd': 'تُسْتَحْيَيَانِ',
      '1p': 'نُسْتَحْيَا',
      '2mp': 'تُسْتَحْيَوْنَ',
      '2fp': 'تُسْتَحْيَيْنَ',
      '3mp': 'يُسْتَحْيَوْنَ',
      '3fp': 'يُسْتَحْيَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyw-10')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَحْيَا',
      '2ms': 'تُسْتَحْيَا',
      '2fs': 'تُسْتَحْيَيْ',
      '3ms': 'يُسْتَحْيَا',
      '3fs': 'تُسْتَحْيَا',
      '2d': 'تُسْتَحْيَيَا',
      '3md': 'يُسْتَحْيَيَا',
      '3fd': 'تُسْتَحْيَيَا',
      '1p': 'نُسْتَحْيَا',
      '2mp': 'تُسْتَحْيَوْا',
      '2fp': 'تُسْتَحْيَيْنَ',
      '3mp': 'يُسْتَحْيَوْا',
      '3fp': 'يُسْتَحْيَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyw-10')!, 'jussive')).toEqualT({
      '1s': 'أُسْتَحْيَ',
      '2ms': 'تُسْتَحْيَ',
      '2fs': 'تُسْتَحْيَيْ',
      '3ms': 'يُسْتَحْيَ',
      '3fs': 'تُسْتَحْيَ',
      '2d': 'تُسْتَحْيَيَا',
      '3md': 'يُسْتَحْيَيَا',
      '3fd': 'تُسْتَحْيَيَا',
      '1p': 'نُسْتَحْيَ',
      '2mp': 'تُسْتَحْيَوْا',
      '2fp': 'تُسْتَحْيَيْنَ',
      '3mp': 'يُسْتَحْيَوْا',
      '3fp': 'يُسْتَحْيَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hyw-10')!)).toEqualT('مُسْتَحْيٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Hyw-10')!)).toEqualT('مُسْتَحْيًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Hyw-10')!))).toEqualT(new Set(['اِسْتِحْيَاء']))
  })
})
