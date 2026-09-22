import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('hwy-10 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('hwy-10')!)).toEqualT({
      '1s': 'اِسْتَهْوَيْتُ',
      '2ms': 'اِسْتَهْوَيْتَ',
      '2fs': 'اِسْتَهْوَيْتِ',
      '3ms': 'اِسْتَهْوَى',
      '3fs': 'اِسْتَهْوَتْ',
      '2d': 'اِسْتَهْوَيْتُمَا',
      '3md': 'اِسْتَهْوَيَا',
      '3fd': 'اِسْتَهْوَتَا',
      '1p': 'اِسْتَهْوَيْنَا',
      '2mp': 'اِسْتَهْوَيْتُمْ',
      '2fp': 'اِسْتَهْوَيْتُنَّ',
      '3mp': 'اِسْتَهْوَوْا',
      '3fp': 'اِسْتَهْوَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('hwy-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَهْوِي',
      '2ms': 'تَسْتَهْوِي',
      '2fs': 'تَسْتَهْوِينَ',
      '3ms': 'يَسْتَهْوِي',
      '3fs': 'تَسْتَهْوِي',
      '2d': 'تَسْتَهْوِيَانِ',
      '3md': 'يَسْتَهْوِيَانِ',
      '3fd': 'تَسْتَهْوِيَانِ',
      '1p': 'نَسْتَهْوِي',
      '2mp': 'تَسْتَهْوُونَ',
      '2fp': 'تَسْتَهْوِينَ',
      '3mp': 'يَسْتَهْوُونَ',
      '3fp': 'يَسْتَهْوِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('hwy-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَهْوِيَ',
      '2ms': 'تَسْتَهْوِيَ',
      '2fs': 'تَسْتَهْوِي',
      '3ms': 'يَسْتَهْوِيَ',
      '3fs': 'تَسْتَهْوِيَ',
      '2d': 'تَسْتَهْوِيَا',
      '3md': 'يَسْتَهْوِيَا',
      '3fd': 'تَسْتَهْوِيَا',
      '1p': 'نَسْتَهْوِيَ',
      '2mp': 'تَسْتَهْوُوا',
      '2fp': 'تَسْتَهْوِينَ',
      '3mp': 'يَسْتَهْوُوا',
      '3fp': 'يَسْتَهْوِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('hwy-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَهْوِ',
      '2ms': 'تَسْتَهْوِ',
      '2fs': 'تَسْتَهْوِي',
      '3ms': 'يَسْتَهْوِ',
      '3fs': 'تَسْتَهْوِ',
      '2d': 'تَسْتَهْوِيَا',
      '3md': 'يَسْتَهْوِيَا',
      '3fd': 'تَسْتَهْوِيَا',
      '1p': 'نَسْتَهْوِ',
      '2mp': 'تَسْتَهْوُوا',
      '2fp': 'تَسْتَهْوِينَ',
      '3mp': 'يَسْتَهْوُوا',
      '3fp': 'يَسْتَهْوِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('hwy-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَهْوِ',
      '2fs': 'اِسْتَهْوِي',
      '2d': 'اِسْتَهْوِيَا',
      '2mp': 'اِسْتَهْوُوا',
      '2fp': 'اِسْتَهْوِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('hwy-10')!)).toEqualT({
      '1s': 'اُسْتُهْوِيتُ',
      '2ms': 'اُسْتُهْوِيتَ',
      '2fs': 'اُسْتُهْوِيتِ',
      '3ms': 'اُسْتُهْوِيَ',
      '3fs': 'اُسْتُهْوِيَتْ',
      '2d': 'اُسْتُهْوِيتُمَا',
      '3md': 'اُسْتُهْوِيَا',
      '3fd': 'اُسْتُهْوِيَتَا',
      '1p': 'اُسْتُهْوِينَا',
      '2mp': 'اُسْتُهْوِيتُمْ',
      '2fp': 'اُسْتُهْوِيتُنَّ',
      '3mp': 'اُسْتُهْوُوا',
      '3fp': 'اُسْتُهْوِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('hwy-10')!, 'indicative')).toEqualT({
      '1s': 'أُسْتَهْوَى',
      '2ms': 'تُسْتَهْوَى',
      '2fs': 'تُسْتَهْوَيْنَ',
      '3ms': 'يُسْتَهْوَى',
      '3fs': 'تُسْتَهْوَى',
      '2d': 'تُسْتَهْوَيَانِ',
      '3md': 'يُسْتَهْوَيَانِ',
      '3fd': 'تُسْتَهْوَيَانِ',
      '1p': 'نُسْتَهْوَى',
      '2mp': 'تُسْتَهْوَوْنَ',
      '2fp': 'تُسْتَهْوَيْنَ',
      '3mp': 'يُسْتَهْوَوْنَ',
      '3fp': 'يُسْتَهْوَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('hwy-10')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَهْوَى',
      '2ms': 'تُسْتَهْوَى',
      '2fs': 'تُسْتَهْوَيْ',
      '3ms': 'يُسْتَهْوَى',
      '3fs': 'تُسْتَهْوَى',
      '2d': 'تُسْتَهْوَيَا',
      '3md': 'يُسْتَهْوَيَا',
      '3fd': 'تُسْتَهْوَيَا',
      '1p': 'نُسْتَهْوَى',
      '2mp': 'تُسْتَهْوَوْا',
      '2fp': 'تُسْتَهْوَيْنَ',
      '3mp': 'يُسْتَهْوَوْا',
      '3fp': 'يُسْتَهْوَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('hwy-10')!, 'jussive')).toEqualT({
      '1s': 'أُسْتَهْوَ',
      '2ms': 'تُسْتَهْوَ',
      '2fs': 'تُسْتَهْوَيْ',
      '3ms': 'يُسْتَهْوَ',
      '3fs': 'تُسْتَهْوَ',
      '2d': 'تُسْتَهْوَيَا',
      '3md': 'يُسْتَهْوَيَا',
      '3fd': 'تُسْتَهْوَيَا',
      '1p': 'نُسْتَهْوَ',
      '2mp': 'تُسْتَهْوَوْا',
      '2fp': 'تُسْتَهْوَيْنَ',
      '3mp': 'يُسْتَهْوَوْا',
      '3fp': 'يُسْتَهْوَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('hwy-10')!)).toEqualT('مُسْتَهْوٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('hwy-10')!)).toEqualT('مُسْتَهْوًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('hwy-10')!))).toEqualT(new Set(['اِسْتِهْوَاء']))
  })
})
