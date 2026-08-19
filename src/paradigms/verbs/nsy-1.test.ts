import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('nsy-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('nsy-1')!)).toEqualT({
      '1s': 'نَسِيتُ',
      '2ms': 'نَسِيتَ',
      '2fs': 'نَسِيتِ',
      '3ms': 'نَسِيَ',
      '3fs': 'نَسِيَتْ',
      '2d': 'نَسِيتُمَا',
      '3md': 'نَسِيَا',
      '3fd': 'نَسِيَتَا',
      '1p': 'نَسِينَا',
      '2mp': 'نَسِيتُمْ',
      '2fp': 'نَسِيتُنَّ',
      '3mp': 'نَسُوا',
      '3fp': 'نَسِينَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('nsy-1')!, 'indicative')).toEqualT({
      '1s': 'أَنْسَى',
      '2ms': 'تَنْسَى',
      '2fs': 'تَنْسَيْنَ',
      '3ms': 'يَنْسَى',
      '3fs': 'تَنْسَى',
      '2d': 'تَنْسَيَانِ',
      '3md': 'يَنْسَيَانِ',
      '3fd': 'تَنْسَيَانِ',
      '1p': 'نَنْسَى',
      '2mp': 'تَنْسَوْنَ',
      '2fp': 'تَنْسَيْنَ',
      '3mp': 'يَنْسَوْنَ',
      '3fp': 'يَنْسَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('nsy-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَنْسَى',
      '2ms': 'تَنْسَى',
      '2fs': 'تَنْسَيْ',
      '3ms': 'يَنْسَى',
      '3fs': 'تَنْسَى',
      '2d': 'تَنْسَيَا',
      '3md': 'يَنْسَيَا',
      '3fd': 'تَنْسَيَا',
      '1p': 'نَنْسَى',
      '2mp': 'تَنْسَوْا',
      '2fp': 'تَنْسَيْنَ',
      '3mp': 'يَنْسَوْا',
      '3fp': 'يَنْسَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('nsy-1')!, 'jussive')).toEqualT({
      '1s': 'أَنْسَ',
      '2ms': 'تَنْسَ',
      '2fs': 'تَنْسَيْ',
      '3ms': 'يَنْسَ',
      '3fs': 'تَنْسَ',
      '2d': 'تَنْسَيَا',
      '3md': 'يَنْسَيَا',
      '3fd': 'تَنْسَيَا',
      '1p': 'نَنْسَ',
      '2mp': 'تَنْسَوْا',
      '2fp': 'تَنْسَيْنَ',
      '3mp': 'يَنْسَوْا',
      '3fp': 'يَنْسَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('nsy-1')!)).toMatchObjectT({
      '2ms': 'اِنْسَ',
      '2fs': 'اِنْسَيْ',
      '2d': 'اِنْسَيَا',
      '2mp': 'اِنْسَوْا',
      '2fp': 'اِنْسَيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('nsy-1')!)).toEqualT({
      '1s': 'نُسِيتُ',
      '2ms': 'نُسِيتَ',
      '2fs': 'نُسِيتِ',
      '3ms': 'نُسِيَ',
      '3fs': 'نُسِيَتْ',
      '2d': 'نُسِيتُمَا',
      '3md': 'نُسِيَا',
      '3fd': 'نُسِيَتَا',
      '1p': 'نُسِينَا',
      '2mp': 'نُسِيتُمْ',
      '2fp': 'نُسِيتُنَّ',
      '3mp': 'نُسُوا',
      '3fp': 'نُسِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('nsy-1')!, 'indicative')).toEqualT({
      '1s': 'أُنْسَى',
      '2ms': 'تُنْسَى',
      '2fs': 'تُنْسَيْنَ',
      '3ms': 'يُنْسَى',
      '3fs': 'تُنْسَى',
      '2d': 'تُنْسَيَانِ',
      '3md': 'يُنْسَيَانِ',
      '3fd': 'تُنْسَيَانِ',
      '1p': 'نُنْسَى',
      '2mp': 'تُنْسَوْنَ',
      '2fp': 'تُنْسَيْنَ',
      '3mp': 'يُنْسَوْنَ',
      '3fp': 'يُنْسَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('nsy-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُنْسَى',
      '2ms': 'تُنْسَى',
      '2fs': 'تُنْسَيْ',
      '3ms': 'يُنْسَى',
      '3fs': 'تُنْسَى',
      '2d': 'تُنْسَيَا',
      '3md': 'يُنْسَيَا',
      '3fd': 'تُنْسَيَا',
      '1p': 'نُنْسَى',
      '2mp': 'تُنْسَوْا',
      '2fp': 'تُنْسَيْنَ',
      '3mp': 'يُنْسَوْا',
      '3fp': 'يُنْسَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('nsy-1')!, 'jussive')).toEqualT({
      '1s': 'أُنْسَ',
      '2ms': 'تُنْسَ',
      '2fs': 'تُنْسَيْ',
      '3ms': 'يُنْسَ',
      '3fs': 'تُنْسَ',
      '2d': 'تُنْسَيَا',
      '3md': 'يُنْسَيَا',
      '3fd': 'تُنْسَيَا',
      '1p': 'نُنْسَ',
      '2mp': 'تُنْسَوْا',
      '2fp': 'تُنْسَيْنَ',
      '3mp': 'يُنْسَوْا',
      '3fp': 'يُنْسَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('nsy-1')!)).toEqualT('نَاسٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('nsy-1')!)).toEqualT('مَنْسِيّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('nsy-1')!))).toEqualT(new Set(['نَسْي', 'نِسْيَان']))
  })
})
