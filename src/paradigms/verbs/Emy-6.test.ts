import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Emy-6 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Emy-6')!)).toEqualT({
      '1s': 'تَعَامَيْتُ',
      '2ms': 'تَعَامَيْتَ',
      '2fs': 'تَعَامَيْتِ',
      '3ms': 'تَعَامَى',
      '3fs': 'تَعَامَتْ',
      '2d': 'تَعَامَيْتُمَا',
      '3md': 'تَعَامَيَا',
      '3fd': 'تَعَامَتَا',
      '1p': 'تَعَامَيْنَا',
      '2mp': 'تَعَامَيْتُمْ',
      '2fp': 'تَعَامَيْتُنَّ',
      '3mp': 'تَعَامَوْا',
      '3fp': 'تَعَامَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Emy-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَعَامَى',
      '2ms': 'تَتَعَامَى',
      '2fs': 'تَتَعَامَيْنَ',
      '3ms': 'يَتَعَامَى',
      '3fs': 'تَتَعَامَى',
      '2d': 'تَتَعَامَيَانِ',
      '3md': 'يَتَعَامَيَانِ',
      '3fd': 'تَتَعَامَيَانِ',
      '1p': 'نَتَعَامَى',
      '2mp': 'تَتَعَامَوْنَ',
      '2fp': 'تَتَعَامَيْنَ',
      '3mp': 'يَتَعَامَوْنَ',
      '3fp': 'يَتَعَامَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Emy-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَعَامَى',
      '2ms': 'تَتَعَامَى',
      '2fs': 'تَتَعَامَيْ',
      '3ms': 'يَتَعَامَى',
      '3fs': 'تَتَعَامَى',
      '2d': 'تَتَعَامَيَا',
      '3md': 'يَتَعَامَيَا',
      '3fd': 'تَتَعَامَيَا',
      '1p': 'نَتَعَامَى',
      '2mp': 'تَتَعَامَوْا',
      '2fp': 'تَتَعَامَيْنَ',
      '3mp': 'يَتَعَامَوْا',
      '3fp': 'يَتَعَامَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Emy-6')!, 'jussive')).toEqualT({
      '1s': 'أَتَعَامَ',
      '2ms': 'تَتَعَامَ',
      '2fs': 'تَتَعَامَيْ',
      '3ms': 'يَتَعَامَ',
      '3fs': 'تَتَعَامَ',
      '2d': 'تَتَعَامَيَا',
      '3md': 'يَتَعَامَيَا',
      '3fd': 'تَتَعَامَيَا',
      '1p': 'نَتَعَامَ',
      '2mp': 'تَتَعَامَوْا',
      '2fp': 'تَتَعَامَيْنَ',
      '3mp': 'يَتَعَامَوْا',
      '3fp': 'يَتَعَامَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Emy-6')!)).toMatchObjectT({
      '2ms': 'تَعَامَ',
      '2fs': 'تَعَامَيْ',
      '2d': 'تَعَامَيَا',
      '2mp': 'تَعَامَوْا',
      '2fp': 'تَعَامَيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Emy-6')!)).toMatchObjectT({
      '3ms': 'تُعُومِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Emy-6')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَعَامَى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Emy-6')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَعَامَى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Emy-6')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَعَامَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Emy-6')!)).toEqualT('مُتَعَامٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Emy-6')!)).toEqualT('مُتَعَامًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Emy-6')!))).toEqualT(new Set(['تَعَامٍ']))
  })
})
