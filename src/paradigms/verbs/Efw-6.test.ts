import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Efw-6', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Efw-6')!)).toEqualT({
      '1s': 'تَعَافَيْتُ',
      '2ms': 'تَعَافَيْتَ',
      '2fs': 'تَعَافَيْتِ',
      '3ms': 'تَعَافَى',
      '3fs': 'تَعَافَتْ',
      '2d': 'تَعَافَيْتُمَا',
      '3md': 'تَعَافَيَا',
      '3fd': 'تَعَافَتَا',
      '1p': 'تَعَافَيْنَا',
      '2mp': 'تَعَافَيْتُمْ',
      '2fp': 'تَعَافَيْتُنَّ',
      '3mp': 'تَعَافَوا',
      '3fp': 'تَعَافَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Efw-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَعَافَى',
      '2ms': 'تَتَعَافَى',
      '2fs': 'تَتَعَافَينَ',
      '3ms': 'يَتَعَافَى',
      '3fs': 'تَتَعَافَى',
      '2d': 'تَتَعَافَيَانِ',
      '3md': 'يَتَعَافَيَانِ',
      '3fd': 'تَتَعَافَيَانِ',
      '1p': 'نَتَعَافَى',
      '2mp': 'تَتَعَافَونَ',
      '2fp': 'تَتَعَافَينَ',
      '3mp': 'يَتَعَافَونَ',
      '3fp': 'يَتَعَافَينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Efw-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَعَافَى',
      '2ms': 'تَتَعَافَى',
      '2fs': 'تَتَعَافَيْ',
      '3ms': 'يَتَعَافَى',
      '3fs': 'تَتَعَافَى',
      '2d': 'تَتَعَافَيَا',
      '3md': 'يَتَعَافَيَا',
      '3fd': 'تَتَعَافَيَا',
      '1p': 'نَتَعَافَى',
      '2mp': 'تَتَعَافَوا',
      '2fp': 'تَتَعَافَينَ',
      '3mp': 'يَتَعَافَوا',
      '3fp': 'يَتَعَافَينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Efw-6')!, 'jussive')).toEqualT({
      '1s': 'أَتَعَافَ',
      '2ms': 'تَتَعَافَ',
      '2fs': 'تَتَعَافَي',
      '3ms': 'يَتَعَافَ',
      '3fs': 'تَتَعَافَ',
      '2d': 'تَتَعَافَيَا',
      '3md': 'يَتَعَافَيَا',
      '3fd': 'تَتَعَافَيَا',
      '1p': 'نَتَعَافَ',
      '2mp': 'تَتَعَافَوْا',
      '2fp': 'تَتَعَافَينَ',
      '3mp': 'يَتَعَافَوْا',
      '3fp': 'يَتَعَافَينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Efw-6')!)).toMatchObjectT({
      '2ms': 'تَعَافَ',
      '2fs': 'تَعَافَي',
      '2d': 'تَعَافَيَا',
      '2mp': 'تَعَافَوْا',
      '2fp': 'تَعَافَينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Efw-6')!)).toMatchObjectT({
      '3ms': 'تُعُوفِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Efw-6')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَعَافَى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Efw-6')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَعَافَى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Efw-6')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَعَافَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Efw-6')!)).toEqualT('مُتَعَافٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Efw-6')!)).toEqualT('مُتَعَافًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Efw-6')!)).toEqualT(['تَعَافٍ'])
  })
})
