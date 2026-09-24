import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wSy-6 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wSy-6')!)).toEqualT({
      '1s': 'تَوَاصَيْتُ',
      '2ms': 'تَوَاصَيْتَ',
      '2fs': 'تَوَاصَيْتِ',
      '3ms': 'تَوَاصَى',
      '3fs': 'تَوَاصَتْ',
      '2d': 'تَوَاصَيْتُمَا',
      '3md': 'تَوَاصَيَا',
      '3fd': 'تَوَاصَتَا',
      '1p': 'تَوَاصَيْنَا',
      '2mp': 'تَوَاصَيْتُمْ',
      '2fp': 'تَوَاصَيْتُنَّ',
      '3mp': 'تَوَاصَوْا',
      '3fp': 'تَوَاصَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wSy-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَوَاصَى',
      '2ms': 'تَتَوَاصَى',
      '2fs': 'تَتَوَاصَيْنَ',
      '3ms': 'يَتَوَاصَى',
      '3fs': 'تَتَوَاصَى',
      '2d': 'تَتَوَاصَيَانِ',
      '3md': 'يَتَوَاصَيَانِ',
      '3fd': 'تَتَوَاصَيَانِ',
      '1p': 'نَتَوَاصَى',
      '2mp': 'تَتَوَاصَوْنَ',
      '2fp': 'تَتَوَاصَيْنَ',
      '3mp': 'يَتَوَاصَوْنَ',
      '3fp': 'يَتَوَاصَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wSy-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَوَاصَى',
      '2ms': 'تَتَوَاصَى',
      '2fs': 'تَتَوَاصَيْ',
      '3ms': 'يَتَوَاصَى',
      '3fs': 'تَتَوَاصَى',
      '2d': 'تَتَوَاصَيَا',
      '3md': 'يَتَوَاصَيَا',
      '3fd': 'تَتَوَاصَيَا',
      '1p': 'نَتَوَاصَى',
      '2mp': 'تَتَوَاصَوْا',
      '2fp': 'تَتَوَاصَيْنَ',
      '3mp': 'يَتَوَاصَوْا',
      '3fp': 'يَتَوَاصَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wSy-6')!, 'jussive')).toEqualT({
      '1s': 'أَتَوَاصَ',
      '2ms': 'تَتَوَاصَ',
      '2fs': 'تَتَوَاصَيْ',
      '3ms': 'يَتَوَاصَ',
      '3fs': 'تَتَوَاصَ',
      '2d': 'تَتَوَاصَيَا',
      '3md': 'يَتَوَاصَيَا',
      '3fd': 'تَتَوَاصَيَا',
      '1p': 'نَتَوَاصَ',
      '2mp': 'تَتَوَاصَوْا',
      '2fp': 'تَتَوَاصَيْنَ',
      '3mp': 'يَتَوَاصَوْا',
      '3fp': 'يَتَوَاصَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wSy-6')!)).toMatchObjectT({
      '2ms': 'تَوَاصَ',
      '2fs': 'تَوَاصَيْ',
      '2d': 'تَوَاصَيَا',
      '2mp': 'تَوَاصَوْا',
      '2fp': 'تَوَاصَيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wSy-6')!)).toMatchObjectT({
      '3ms': 'تُوُوصِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wSy-6')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَوَاصَى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wSy-6')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَوَاصَى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wSy-6')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَوَاصَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wSy-6')!)).toEqualT('مُتَوَاصٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wSy-6')!)).toEqualT('مُتَوَاصًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('wSy-6')!))).toEqualT(new Set(['تَوَاصٍ']))
  })
})
