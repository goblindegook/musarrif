import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Dwy-7 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Dwy-7')!)).toEqualT({
      '1s': 'اِنْضَوَيْتُ',
      '2ms': 'اِنْضَوَيْتَ',
      '2fs': 'اِنْضَوَيْتِ',
      '3ms': 'اِنْضَوَى',
      '3fs': 'اِنْضَوَتْ',
      '2d': 'اِنْضَوَيْتُمَا',
      '3md': 'اِنْضَوَيَا',
      '3fd': 'اِنْضَوَتَا',
      '1p': 'اِنْضَوَيْنَا',
      '2mp': 'اِنْضَوَيْتُمْ',
      '2fp': 'اِنْضَوَيْتُنَّ',
      '3mp': 'اِنْضَوَوْا',
      '3fp': 'اِنْضَوَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Dwy-7')!, 'indicative')).toEqualT({
      '1s': 'أَنْضَوِي',
      '2ms': 'تَنْضَوِي',
      '2fs': 'تَنْضَوِينَ',
      '3ms': 'يَنْضَوِي',
      '3fs': 'تَنْضَوِي',
      '2d': 'تَنْضَوِيَانِ',
      '3md': 'يَنْضَوِيَانِ',
      '3fd': 'تَنْضَوِيَانِ',
      '1p': 'نَنْضَوِي',
      '2mp': 'تَنْضَوُونَ',
      '2fp': 'تَنْضَوِينَ',
      '3mp': 'يَنْضَوُونَ',
      '3fp': 'يَنْضَوِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Dwy-7')!, 'subjunctive')).toEqualT({
      '1s': 'أَنْضَوِيَ',
      '2ms': 'تَنْضَوِيَ',
      '2fs': 'تَنْضَوِي',
      '3ms': 'يَنْضَوِيَ',
      '3fs': 'تَنْضَوِيَ',
      '2d': 'تَنْضَوِيَا',
      '3md': 'يَنْضَوِيَا',
      '3fd': 'تَنْضَوِيَا',
      '1p': 'نَنْضَوِيَ',
      '2mp': 'تَنْضَوُوا',
      '2fp': 'تَنْضَوِينَ',
      '3mp': 'يَنْضَوُوا',
      '3fp': 'يَنْضَوِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Dwy-7')!, 'jussive')).toEqualT({
      '1s': 'أَنْضَوِ',
      '2ms': 'تَنْضَوِ',
      '2fs': 'تَنْضَوِي',
      '3ms': 'يَنْضَوِ',
      '3fs': 'تَنْضَوِ',
      '2d': 'تَنْضَوِيَا',
      '3md': 'يَنْضَوِيَا',
      '3fd': 'تَنْضَوِيَا',
      '1p': 'نَنْضَوِ',
      '2mp': 'تَنْضَوُوا',
      '2fp': 'تَنْضَوِينَ',
      '3mp': 'يَنْضَوُوا',
      '3fp': 'يَنْضَوِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Dwy-7')!)).toMatchObjectT({
      '2ms': 'اِنْضَوِ',
      '2fs': 'اِنْضَوِي',
      '2d': 'اِنْضَوِيَا',
      '2mp': 'اِنْضَوُوا',
      '2fp': 'اِنْضَوِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Dwy-7')!)).toMatchObjectT({
      '3ms': 'اُنْضُوِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Dwy-7')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُنْضَوَى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Dwy-7')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُنْضَوَى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Dwy-7')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُنْضَوَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Dwy-7')!)).toEqualT('مُنْضَوٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Dwy-7')!)).toEqualT('مُنْضَوًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Dwy-7')!))).toEqualT(new Set(['اِنْضِوَاء']))
  })
})
