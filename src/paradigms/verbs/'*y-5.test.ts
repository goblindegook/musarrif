import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'*y-5 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'*y-5")!)).toEqualT({
      '1s': 'تَأَذَّيْتُ',
      '2ms': 'تَأَذَّيْتَ',
      '2fs': 'تَأَذَّيْتِ',
      '3ms': 'تَأَذَّى',
      '3fs': 'تَأَذَّتْ',
      '2d': 'تَأَذَّيْتُمَا',
      '3md': 'تَأَذَّيَا',
      '3fd': 'تَأَذَّتَا',
      '1p': 'تَأَذَّيْنَا',
      '2mp': 'تَأَذَّيْتُمْ',
      '2fp': 'تَأَذَّيْتُنَّ',
      '3mp': 'تَأَذَّوْا',
      '3fp': 'تَأَذَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'*y-5")!, 'indicative')).toEqualT({
      '1s': 'أَتَأَذَّى',
      '2ms': 'تَتَأَذَّى',
      '2fs': 'تَتَأَذَّيْنَ',
      '3ms': 'يَتَأَذَّى',
      '3fs': 'تَتَأَذَّى',
      '2d': 'تَتَأَذَّيَانِ',
      '3md': 'يَتَأَذَّيَانِ',
      '3fd': 'تَتَأَذَّيَانِ',
      '1p': 'نَتَأَذَّى',
      '2mp': 'تَتَأَذَّوْنَ',
      '2fp': 'تَتَأَذَّيْنَ',
      '3mp': 'يَتَأَذَّوْنَ',
      '3fp': 'يَتَأَذَّيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'*y-5")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَأَذَّى',
      '2ms': 'تَتَأَذَّى',
      '2fs': 'تَتَأَذَّيْ',
      '3ms': 'يَتَأَذَّى',
      '3fs': 'تَتَأَذَّى',
      '2d': 'تَتَأَذَّيَا',
      '3md': 'يَتَأَذَّيَا',
      '3fd': 'تَتَأَذَّيَا',
      '1p': 'نَتَأَذَّى',
      '2mp': 'تَتَأَذَّوْا',
      '2fp': 'تَتَأَذَّيْنَ',
      '3mp': 'يَتَأَذَّوْا',
      '3fp': 'يَتَأَذَّيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'*y-5")!, 'jussive')).toEqualT({
      '1s': 'أَتَأَذَّ',
      '2ms': 'تَتَأَذَّ',
      '2fs': 'تَتَأَذَّيْ',
      '3ms': 'يَتَأَذَّ',
      '3fs': 'تَتَأَذَّ',
      '2d': 'تَتَأَذَّيَا',
      '3md': 'يَتَأَذَّيَا',
      '3fd': 'تَتَأَذَّيَا',
      '1p': 'نَتَأَذَّ',
      '2mp': 'تَتَأَذَّوْا',
      '2fp': 'تَتَأَذَّيْنَ',
      '3mp': 'يَتَأَذَّوْا',
      '3fp': 'يَتَأَذَّيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'*y-5")!)).toMatchObjectT({
      '2ms': 'تَأَذَّ',
      '2fs': 'تَأَذَّيْ',
      '2d': 'تَأَذَّيَا',
      '2mp': 'تَأَذَّوْا',
      '2fp': 'تَأَذَّيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'*y-5")!)).toMatchObjectT({
      '3ms': 'تُؤُذِّيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'*y-5")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَأَذَّى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'*y-5")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَأَذَّى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'*y-5")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَأَذَّ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'*y-5")!)).toEqualT('مُتَأَذٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'*y-5")!)).toEqualT('مُتَأَذًّى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'*y-5")!))).toEqualT(new Set(['تَأَذٍّ']))
  })
})
