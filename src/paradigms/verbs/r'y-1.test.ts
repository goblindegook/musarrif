import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("r'y-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("r'y-1")!)).toEqualT({
      '1s': 'رَأَيْتُ',
      '2ms': 'رَأَيْتَ',
      '2fs': 'رَأَيْتِ',
      '3ms': 'رَأَى',
      '3fs': 'رَأَتْ',
      '2d': 'رَأَيْتُمَا',
      '3md': 'رَأَيَا',
      '3fd': 'رَأَتَا',
      '1p': 'رَأَيْنَا',
      '2mp': 'رَأَيْتُمْ',
      '2fp': 'رَأَيْتُنَّ',
      '3mp': 'رَأَوْا',
      '3fp': 'رَأَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("r'y-1")!, 'indicative')).toEqualT({
      '1s': 'أَرَى',
      '2ms': 'تَرَى',
      '2fs': 'تَرَيْنَ',
      '3ms': 'يَرَى',
      '3fs': 'تَرَى',
      '2d': 'تَرَيَانِ',
      '3md': 'يَرَيَانِ',
      '3fd': 'تَرَيَانِ',
      '1p': 'نَرَى',
      '2mp': 'تَرَوْنَ',
      '2fp': 'تَرَيْنَ',
      '3mp': 'يَرَوْنَ',
      '3fp': 'يَرَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("r'y-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَرَى',
      '2ms': 'تَرَى',
      '2fs': 'تَرَيْ',
      '3ms': 'يَرَى',
      '3fs': 'تَرَى',
      '2d': 'تَرَيَا',
      '3md': 'يَرَيَا',
      '3fd': 'تَرَيَا',
      '1p': 'نَرَى',
      '2mp': 'تَرَوْا',
      '2fp': 'تَرَيْنَ',
      '3mp': 'يَرَوْا',
      '3fp': 'يَرَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("r'y-1")!, 'jussive')).toEqualT({
      '1s': 'أَرَ',
      '2ms': 'تَرَ',
      '2fs': 'تَرَيْ',
      '3ms': 'يَرَ',
      '3fs': 'تَرَ',
      '2d': 'تَرَيَا',
      '3md': 'يَرَيَا',
      '3fd': 'تَرَيَا',
      '1p': 'نَرَ',
      '2mp': 'تَرَوْا',
      '2fp': 'تَرَيْنَ',
      '3mp': 'يَرَوْا',
      '3fp': 'يَرَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("r'y-1")!)).toMatchObjectT({
      '2ms': 'رَ',
      '2fs': 'رَيْ',
      '2d': 'رَيَا',
      '2mp': 'رَوْا',
      '2fp': 'رَيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("r'y-1")!)).toEqualT({
      '1s': 'رُئِيتُ',
      '2ms': 'رُئِيتَ',
      '2fs': 'رُئِيتِ',
      '3ms': 'رُئِيَ',
      '3fs': 'رُئِيَتْ',
      '2d': 'رُئِيتُمَا',
      '3md': 'رُئِيَا',
      '3fd': 'رُئِيَتَا',
      '1p': 'رُئِينَا',
      '2mp': 'رُئِيتُمْ',
      '2fp': 'رُئِيتُنَّ',
      '3mp': 'رُؤُوا',
      '3fp': 'رُئِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-1")!, 'indicative')).toEqualT({
      '1s': 'أُرَى',
      '2ms': 'تُرَى',
      '2fs': 'تُرَيْنَ',
      '3ms': 'يُرَى',
      '3fs': 'تُرَى',
      '2d': 'تُرَيَانِ',
      '3md': 'يُرَيَانِ',
      '3fd': 'تُرَيَانِ',
      '1p': 'نُرَى',
      '2mp': 'تُرَوْنَ',
      '2fp': 'تُرَيْنَ',
      '3mp': 'يُرَوْنَ',
      '3fp': 'يُرَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُرَى',
      '2ms': 'تُرَى',
      '2fs': 'تُرَيْ',
      '3ms': 'يُرَى',
      '3fs': 'تُرَى',
      '2d': 'تُرَيَا',
      '3md': 'يُرَيَا',
      '3fd': 'تُرَيَا',
      '1p': 'نُرَى',
      '2mp': 'تُرَوْا',
      '2fp': 'تُرَيْنَ',
      '3mp': 'يُرَوْا',
      '3fp': 'يُرَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-1")!, 'jussive')).toEqualT({
      '1s': 'أُرَ',
      '2ms': 'تُرَ',
      '2fs': 'تُرَيْ',
      '3ms': 'يُرَ',
      '3fs': 'تُرَ',
      '2d': 'تُرَيَا',
      '3md': 'يُرَيَا',
      '3fd': 'تُرَيَا',
      '1p': 'نُرَ',
      '2mp': 'تُرَوْا',
      '2fp': 'تُرَيْنَ',
      '3mp': 'يُرَوْا',
      '3fp': 'يُرَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("r'y-1")!)).toEqualT('رَاءٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("r'y-1")!)).toEqualT('مَرْئِيّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("r'y-1")!))).toEqualT(new Set(['رُؤْيَة']))
  })
})
