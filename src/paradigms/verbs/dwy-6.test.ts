import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('dwy-6 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('dwy-6')!)).toEqualT({
      '1s': 'تَدَاوَيْتُ',
      '2ms': 'تَدَاوَيْتَ',
      '2fs': 'تَدَاوَيْتِ',
      '3ms': 'تَدَاوَى',
      '3fs': 'تَدَاوَتْ',
      '2d': 'تَدَاوَيْتُمَا',
      '3md': 'تَدَاوَيَا',
      '3fd': 'تَدَاوَتَا',
      '1p': 'تَدَاوَيْنَا',
      '2mp': 'تَدَاوَيْتُمْ',
      '2fp': 'تَدَاوَيْتُنَّ',
      '3mp': 'تَدَاوَوْا',
      '3fp': 'تَدَاوَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('dwy-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَدَاوَى',
      '2ms': 'تَتَدَاوَى',
      '2fs': 'تَتَدَاوَيْنَ',
      '3ms': 'يَتَدَاوَى',
      '3fs': 'تَتَدَاوَى',
      '2d': 'تَتَدَاوَيَانِ',
      '3md': 'يَتَدَاوَيَانِ',
      '3fd': 'تَتَدَاوَيَانِ',
      '1p': 'نَتَدَاوَى',
      '2mp': 'تَتَدَاوَوْنَ',
      '2fp': 'تَتَدَاوَيْنَ',
      '3mp': 'يَتَدَاوَوْنَ',
      '3fp': 'يَتَدَاوَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('dwy-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَدَاوَى',
      '2ms': 'تَتَدَاوَى',
      '2fs': 'تَتَدَاوَيْ',
      '3ms': 'يَتَدَاوَى',
      '3fs': 'تَتَدَاوَى',
      '2d': 'تَتَدَاوَيَا',
      '3md': 'يَتَدَاوَيَا',
      '3fd': 'تَتَدَاوَيَا',
      '1p': 'نَتَدَاوَى',
      '2mp': 'تَتَدَاوَوْا',
      '2fp': 'تَتَدَاوَيْنَ',
      '3mp': 'يَتَدَاوَوْا',
      '3fp': 'يَتَدَاوَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('dwy-6')!, 'jussive')).toEqualT({
      '1s': 'أَتَدَاوَ',
      '2ms': 'تَتَدَاوَ',
      '2fs': 'تَتَدَاوَيْ',
      '3ms': 'يَتَدَاوَ',
      '3fs': 'تَتَدَاوَ',
      '2d': 'تَتَدَاوَيَا',
      '3md': 'يَتَدَاوَيَا',
      '3fd': 'تَتَدَاوَيَا',
      '1p': 'نَتَدَاوَ',
      '2mp': 'تَتَدَاوَوْا',
      '2fp': 'تَتَدَاوَيْنَ',
      '3mp': 'يَتَدَاوَوْا',
      '3fp': 'يَتَدَاوَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('dwy-6')!)).toMatchObjectT({
      '2ms': 'تَدَاوَ',
      '2fs': 'تَدَاوَيْ',
      '2d': 'تَدَاوَيَا',
      '2mp': 'تَدَاوَوْا',
      '2fp': 'تَدَاوَيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('dwy-6')!)).toMatchObjectT({
      '3ms': 'تُدُووِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('dwy-6')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَدَاوَى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('dwy-6')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَدَاوَى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('dwy-6')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَدَاوَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('dwy-6')!)).toEqualT('مُتَدَاوٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('dwy-6')!)).toEqualT('مُتَدَاوًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('dwy-6')!))).toEqualT(new Set(['تَدَاوٍ']))
  })
})
