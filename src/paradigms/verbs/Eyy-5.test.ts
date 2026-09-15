import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Eyy-5 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Eyy-5')!)).toEqualT({
      '1s': 'تَعَيَّيْتُ',
      '2ms': 'تَعَيَّيْتَ',
      '2fs': 'تَعَيَّيْتِ',
      '3ms': 'تَعَيَّا',
      '3fs': 'تَعَيَّتْ',
      '2d': 'تَعَيَّيْتُمَا',
      '3md': 'تَعَيَّيَا',
      '3fd': 'تَعَيَّتَا',
      '1p': 'تَعَيَّيْنَا',
      '2mp': 'تَعَيَّيْتُمْ',
      '2fp': 'تَعَيَّيْتُنَّ',
      '3mp': 'تَعَيَّوْا',
      '3fp': 'تَعَيَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Eyy-5')!, 'indicative')).toEqualT({
      '1s': 'أَتَعَيَّا',
      '2ms': 'تَتَعَيَّا',
      '2fs': 'تَتَعَيَّيْنَ',
      '3ms': 'يَتَعَيَّا',
      '3fs': 'تَتَعَيَّا',
      '2d': 'تَتَعَيَّيَانِ',
      '3md': 'يَتَعَيَّيَانِ',
      '3fd': 'تَتَعَيَّيَانِ',
      '1p': 'نَتَعَيَّا',
      '2mp': 'تَتَعَيَّوْنَ',
      '2fp': 'تَتَعَيَّيْنَ',
      '3mp': 'يَتَعَيَّوْنَ',
      '3fp': 'يَتَعَيَّيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Eyy-5')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَعَيَّا',
      '2ms': 'تَتَعَيَّا',
      '2fs': 'تَتَعَيَّيْ',
      '3ms': 'يَتَعَيَّا',
      '3fs': 'تَتَعَيَّا',
      '2d': 'تَتَعَيَّيَا',
      '3md': 'يَتَعَيَّيَا',
      '3fd': 'تَتَعَيَّيَا',
      '1p': 'نَتَعَيَّا',
      '2mp': 'تَتَعَيَّوْا',
      '2fp': 'تَتَعَيَّيْنَ',
      '3mp': 'يَتَعَيَّوْا',
      '3fp': 'يَتَعَيَّيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Eyy-5')!, 'jussive')).toEqualT({
      '1s': 'أَتَعَيَّ',
      '2ms': 'تَتَعَيَّ',
      '2fs': 'تَتَعَيَّيْ',
      '3ms': 'يَتَعَيَّ',
      '3fs': 'تَتَعَيَّ',
      '2d': 'تَتَعَيَّيَا',
      '3md': 'يَتَعَيَّيَا',
      '3fd': 'تَتَعَيَّيَا',
      '1p': 'نَتَعَيَّ',
      '2mp': 'تَتَعَيَّوْا',
      '2fp': 'تَتَعَيَّيْنَ',
      '3mp': 'يَتَعَيَّوْا',
      '3fp': 'يَتَعَيَّيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Eyy-5')!)).toMatchObjectT({
      '2ms': 'تَعَيَّ',
      '2fs': 'تَعَيَّيْ',
      '2d': 'تَعَيَّيَا',
      '2mp': 'تَعَيَّوْا',
      '2fp': 'تَعَيَّيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Eyy-5')!)).toMatchObjectT({
      '3ms': 'تُعُيِّيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Eyy-5')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَعَيَّا',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Eyy-5')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَعَيَّا',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Eyy-5')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَعَيَّ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Eyy-5')!)).toEqualT('مُتَعَيٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Eyy-5')!)).toEqualT('مُتَعَيًّى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Eyy-5')!))).toEqualT(new Set(['تَعَيٍّ']))
  })
})
