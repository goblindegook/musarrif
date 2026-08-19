import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('gny-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('gny-1')!)).toEqualT({
      '1s': 'غَنِيتُ',
      '2ms': 'غَنِيتَ',
      '2fs': 'غَنِيتِ',
      '3ms': 'غَنِيَ',
      '3fs': 'غَنِيَتْ',
      '2d': 'غَنِيتُمَا',
      '3md': 'غَنِيَا',
      '3fd': 'غَنِيَتَا',
      '1p': 'غَنِينَا',
      '2mp': 'غَنِيتُمْ',
      '2fp': 'غَنِيتُنَّ',
      '3mp': 'غَنُوا',
      '3fp': 'غَنِينَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('gny-1')!, 'indicative')).toEqualT({
      '1s': 'أَغْنَى',
      '2ms': 'تَغْنَى',
      '2fs': 'تَغْنَيْنَ',
      '3ms': 'يَغْنَى',
      '3fs': 'تَغْنَى',
      '2d': 'تَغْنَيَانِ',
      '3md': 'يَغْنَيَانِ',
      '3fd': 'تَغْنَيَانِ',
      '1p': 'نَغْنَى',
      '2mp': 'تَغْنَوْنَ',
      '2fp': 'تَغْنَيْنَ',
      '3mp': 'يَغْنَوْنَ',
      '3fp': 'يَغْنَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('gny-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَغْنَى',
      '2ms': 'تَغْنَى',
      '2fs': 'تَغْنَيْ',
      '3ms': 'يَغْنَى',
      '3fs': 'تَغْنَى',
      '2d': 'تَغْنَيَا',
      '3md': 'يَغْنَيَا',
      '3fd': 'تَغْنَيَا',
      '1p': 'نَغْنَى',
      '2mp': 'تَغْنَوْا',
      '2fp': 'تَغْنَيْنَ',
      '3mp': 'يَغْنَوْا',
      '3fp': 'يَغْنَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('gny-1')!, 'jussive')).toEqualT({
      '1s': 'أَغْنَ',
      '2ms': 'تَغْنَ',
      '2fs': 'تَغْنَيْ',
      '3ms': 'يَغْنَ',
      '3fs': 'تَغْنَ',
      '2d': 'تَغْنَيَا',
      '3md': 'يَغْنَيَا',
      '3fd': 'تَغْنَيَا',
      '1p': 'نَغْنَ',
      '2mp': 'تَغْنَوْا',
      '2fp': 'تَغْنَيْنَ',
      '3mp': 'يَغْنَوْا',
      '3fp': 'يَغْنَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('gny-1')!)).toMatchObjectT({
      '2ms': 'اِغْنَ',
      '2fs': 'اِغْنَيْ',
      '2d': 'اِغْنَيَا',
      '2mp': 'اِغْنَوْا',
      '2fp': 'اِغْنَيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('gny-1')!)).toMatchObjectT({
      '3ms': 'غُنِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('gny-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُغْنَى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('gny-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُغْنَى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('gny-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُغْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('gny-1')!)).toEqualT('غَنِيّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('gny-1')!)).toEqualT('مَغْنِيّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('gny-1')!))).toEqualT(new Set(['غِنًى', 'غَنَاء']))
  })
})
