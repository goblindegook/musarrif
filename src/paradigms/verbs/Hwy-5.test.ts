import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Hwy-5 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hwy-5')!)).toEqualT({
      '1s': 'تَحَوَّيْتُ',
      '2ms': 'تَحَوَّيْتَ',
      '2fs': 'تَحَوَّيْتِ',
      '3ms': 'تَحَوَّى',
      '3fs': 'تَحَوَّتْ',
      '2d': 'تَحَوَّيْتُمَا',
      '3md': 'تَحَوَّيَا',
      '3fd': 'تَحَوَّتَا',
      '1p': 'تَحَوَّيْنَا',
      '2mp': 'تَحَوَّيْتُمْ',
      '2fp': 'تَحَوَّيْتُنَّ',
      '3mp': 'تَحَوَّوْا',
      '3fp': 'تَحَوَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hwy-5')!, 'indicative')).toEqualT({
      '1s': 'أَتَحَوَّى',
      '2ms': 'تَتَحَوَّى',
      '2fs': 'تَتَحَوَّيْنَ',
      '3ms': 'يَتَحَوَّى',
      '3fs': 'تَتَحَوَّى',
      '2d': 'تَتَحَوَّيَانِ',
      '3md': 'يَتَحَوَّيَانِ',
      '3fd': 'تَتَحَوَّيَانِ',
      '1p': 'نَتَحَوَّى',
      '2mp': 'تَتَحَوَّوْنَ',
      '2fp': 'تَتَحَوَّيْنَ',
      '3mp': 'يَتَحَوَّوْنَ',
      '3fp': 'يَتَحَوَّيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hwy-5')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَحَوَّى',
      '2ms': 'تَتَحَوَّى',
      '2fs': 'تَتَحَوَّيْ',
      '3ms': 'يَتَحَوَّى',
      '3fs': 'تَتَحَوَّى',
      '2d': 'تَتَحَوَّيَا',
      '3md': 'يَتَحَوَّيَا',
      '3fd': 'تَتَحَوَّيَا',
      '1p': 'نَتَحَوَّى',
      '2mp': 'تَتَحَوَّوْا',
      '2fp': 'تَتَحَوَّيْنَ',
      '3mp': 'يَتَحَوَّوْا',
      '3fp': 'يَتَحَوَّيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hwy-5')!, 'jussive')).toEqualT({
      '1s': 'أَتَحَوَّ',
      '2ms': 'تَتَحَوَّ',
      '2fs': 'تَتَحَوَّيْ',
      '3ms': 'يَتَحَوَّ',
      '3fs': 'تَتَحَوَّ',
      '2d': 'تَتَحَوَّيَا',
      '3md': 'يَتَحَوَّيَا',
      '3fd': 'تَتَحَوَّيَا',
      '1p': 'نَتَحَوَّ',
      '2mp': 'تَتَحَوَّوْا',
      '2fp': 'تَتَحَوَّيْنَ',
      '3mp': 'يَتَحَوَّوْا',
      '3fp': 'يَتَحَوَّيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hwy-5')!)).toMatchObjectT({
      '2ms': 'تَحَوَّ',
      '2fs': 'تَحَوَّيْ',
      '2d': 'تَحَوَّيَا',
      '2mp': 'تَحَوَّوْا',
      '2fp': 'تَحَوَّيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Hwy-5')!)).toMatchObjectT({
      '3ms': 'تُحُوِّيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hwy-5')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَحَوَّى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hwy-5')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَحَوَّى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hwy-5')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَحَوَّ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hwy-5')!)).toEqualT('مُتَحَوٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Hwy-5')!)).toEqualT('مُتَحَوًّى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Hwy-5')!))).toEqualT(new Set(['تَحَوٍّ']))
  })
})
