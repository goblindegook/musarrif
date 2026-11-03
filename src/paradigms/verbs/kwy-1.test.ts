import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('kwy-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('kwy-1')!)).toEqualT({
      '1s': 'كَوَيْتُ',
      '2ms': 'كَوَيْتَ',
      '2fs': 'كَوَيْتِ',
      '3ms': 'كَوَى',
      '3fs': 'كَوَتْ',
      '2d': 'كَوَيْتُمَا',
      '3md': 'كَوَيَا',
      '3fd': 'كَوَتَا',
      '1p': 'كَوَيْنَا',
      '2mp': 'كَوَيْتُمْ',
      '2fp': 'كَوَيْتُنَّ',
      '3mp': 'كَوَوْا',
      '3fp': 'كَوَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('kwy-1')!, 'indicative')).toEqualT({
      '1s': 'أَكْوِي',
      '2ms': 'تَكْوِي',
      '2fs': 'تَكْوِينَ',
      '3ms': 'يَكْوِي',
      '3fs': 'تَكْوِي',
      '2d': 'تَكْوِيَانِ',
      '3md': 'يَكْوِيَانِ',
      '3fd': 'تَكْوِيَانِ',
      '1p': 'نَكْوِي',
      '2mp': 'تَكْوُونَ',
      '2fp': 'تَكْوِينَ',
      '3mp': 'يَكْوُونَ',
      '3fp': 'يَكْوِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('kwy-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَكْوِيَ',
      '2ms': 'تَكْوِيَ',
      '2fs': 'تَكْوِي',
      '3ms': 'يَكْوِيَ',
      '3fs': 'تَكْوِيَ',
      '2d': 'تَكْوِيَا',
      '3md': 'يَكْوِيَا',
      '3fd': 'تَكْوِيَا',
      '1p': 'نَكْوِيَ',
      '2mp': 'تَكْوُوا',
      '2fp': 'تَكْوِينَ',
      '3mp': 'يَكْوُوا',
      '3fp': 'يَكْوِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('kwy-1')!, 'jussive')).toEqualT({
      '1s': 'أَكْوِ',
      '2ms': 'تَكْوِ',
      '2fs': 'تَكْوِي',
      '3ms': 'يَكْوِ',
      '3fs': 'تَكْوِ',
      '2d': 'تَكْوِيَا',
      '3md': 'يَكْوِيَا',
      '3fd': 'تَكْوِيَا',
      '1p': 'نَكْوِ',
      '2mp': 'تَكْوُوا',
      '2fp': 'تَكْوِينَ',
      '3mp': 'يَكْوُوا',
      '3fp': 'يَكْوِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('kwy-1')!)).toMatchObjectT({
      '2ms': 'اِكْوِ',
      '2fs': 'اِكْوِي',
      '2d': 'اِكْوِيَا',
      '2mp': 'اِكْوُوا',
      '2fp': 'اِكْوِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('kwy-1')!)).toEqualT({
      '1s': 'كُوِيتُ',
      '2ms': 'كُوِيتَ',
      '2fs': 'كُوِيتِ',
      '3ms': 'كُوِيَ',
      '3fs': 'كُوِيَتْ',
      '2d': 'كُوِيتُمَا',
      '3md': 'كُوِيَا',
      '3fd': 'كُوِيَتَا',
      '1p': 'كُوِينَا',
      '2mp': 'كُوِيتُمْ',
      '2fp': 'كُوِيتُنَّ',
      '3mp': 'كُوُوا',
      '3fp': 'كُوِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('kwy-1')!, 'indicative')).toEqualT({
      '1s': 'أُكْوَى',
      '2ms': 'تُكْوَى',
      '2fs': 'تُكْوَيْنَ',
      '3ms': 'يُكْوَى',
      '3fs': 'تُكْوَى',
      '2d': 'تُكْوَيَانِ',
      '3md': 'يُكْوَيَانِ',
      '3fd': 'تُكْوَيَانِ',
      '1p': 'نُكْوَى',
      '2mp': 'تُكْوَوْنَ',
      '2fp': 'تُكْوَيْنَ',
      '3mp': 'يُكْوَوْنَ',
      '3fp': 'يُكْوَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('kwy-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُكْوَى',
      '2ms': 'تُكْوَى',
      '2fs': 'تُكْوَيْ',
      '3ms': 'يُكْوَى',
      '3fs': 'تُكْوَى',
      '2d': 'تُكْوَيَا',
      '3md': 'يُكْوَيَا',
      '3fd': 'تُكْوَيَا',
      '1p': 'نُكْوَى',
      '2mp': 'تُكْوَوْا',
      '2fp': 'تُكْوَيْنَ',
      '3mp': 'يُكْوَوْا',
      '3fp': 'يُكْوَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('kwy-1')!, 'jussive')).toEqualT({
      '1s': 'أُكْوَ',
      '2ms': 'تُكْوَ',
      '2fs': 'تُكْوَيْ',
      '3ms': 'يُكْوَ',
      '3fs': 'تُكْوَ',
      '2d': 'تُكْوَيَا',
      '3md': 'يُكْوَيَا',
      '3fd': 'تُكْوَيَا',
      '1p': 'نُكْوَ',
      '2mp': 'تُكْوَوْا',
      '2fp': 'تُكْوَيْنَ',
      '3mp': 'يُكْوَوْا',
      '3fp': 'يُكْوَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('kwy-1')!)).toEqualT('كَاوٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('kwy-1')!)).toEqualT('مَكْوِيّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('kwy-1')!))).toEqualT(new Set(['كَيّ']))
  })
})
