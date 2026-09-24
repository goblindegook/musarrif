import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('ETw-10 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('ETw-10')!)).toEqualT({
      '1s': 'اِسْتَعْطَيْتُ',
      '2ms': 'اِسْتَعْطَيْتَ',
      '2fs': 'اِسْتَعْطَيْتِ',
      '3ms': 'اِسْتَعْطَى',
      '3fs': 'اِسْتَعْطَتْ',
      '2d': 'اِسْتَعْطَيْتُمَا',
      '3md': 'اِسْتَعْطَيَا',
      '3fd': 'اِسْتَعْطَتَا',
      '1p': 'اِسْتَعْطَيْنَا',
      '2mp': 'اِسْتَعْطَيْتُمْ',
      '2fp': 'اِسْتَعْطَيْتُنَّ',
      '3mp': 'اِسْتَعْطَوْا',
      '3fp': 'اِسْتَعْطَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('ETw-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَعْطِي',
      '2ms': 'تَسْتَعْطِي',
      '2fs': 'تَسْتَعْطِينَ',
      '3ms': 'يَسْتَعْطِي',
      '3fs': 'تَسْتَعْطِي',
      '2d': 'تَسْتَعْطِيَانِ',
      '3md': 'يَسْتَعْطِيَانِ',
      '3fd': 'تَسْتَعْطِيَانِ',
      '1p': 'نَسْتَعْطِي',
      '2mp': 'تَسْتَعْطُونَ',
      '2fp': 'تَسْتَعْطِينَ',
      '3mp': 'يَسْتَعْطُونَ',
      '3fp': 'يَسْتَعْطِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('ETw-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَعْطِيَ',
      '2ms': 'تَسْتَعْطِيَ',
      '2fs': 'تَسْتَعْطِي',
      '3ms': 'يَسْتَعْطِيَ',
      '3fs': 'تَسْتَعْطِيَ',
      '2d': 'تَسْتَعْطِيَا',
      '3md': 'يَسْتَعْطِيَا',
      '3fd': 'تَسْتَعْطِيَا',
      '1p': 'نَسْتَعْطِيَ',
      '2mp': 'تَسْتَعْطُوا',
      '2fp': 'تَسْتَعْطِينَ',
      '3mp': 'يَسْتَعْطُوا',
      '3fp': 'يَسْتَعْطِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('ETw-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَعْطِ',
      '2ms': 'تَسْتَعْطِ',
      '2fs': 'تَسْتَعْطِي',
      '3ms': 'يَسْتَعْطِ',
      '3fs': 'تَسْتَعْطِ',
      '2d': 'تَسْتَعْطِيَا',
      '3md': 'يَسْتَعْطِيَا',
      '3fd': 'تَسْتَعْطِيَا',
      '1p': 'نَسْتَعْطِ',
      '2mp': 'تَسْتَعْطُوا',
      '2fp': 'تَسْتَعْطِينَ',
      '3mp': 'يَسْتَعْطُوا',
      '3fp': 'يَسْتَعْطِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('ETw-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَعْطِ',
      '2fs': 'اِسْتَعْطِي',
      '2d': 'اِسْتَعْطِيَا',
      '2mp': 'اِسْتَعْطُوا',
      '2fp': 'اِسْتَعْطِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('ETw-10')!)).toEqualT({
      '1s': 'اُسْتُعْطِيتُ',
      '2ms': 'اُسْتُعْطِيتَ',
      '2fs': 'اُسْتُعْطِيتِ',
      '3ms': 'اُسْتُعْطِيَ',
      '3fs': 'اُسْتُعْطِيَتْ',
      '2d': 'اُسْتُعْطِيتُمَا',
      '3md': 'اُسْتُعْطِيَا',
      '3fd': 'اُسْتُعْطِيَتَا',
      '1p': 'اُسْتُعْطِينَا',
      '2mp': 'اُسْتُعْطِيتُمْ',
      '2fp': 'اُسْتُعْطِيتُنَّ',
      '3mp': 'اُسْتُعْطُوا',
      '3fp': 'اُسْتُعْطِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('ETw-10')!, 'indicative')).toEqualT({
      '1s': 'أُسْتَعْطَى',
      '2ms': 'تُسْتَعْطَى',
      '2fs': 'تُسْتَعْطَيْنَ',
      '3ms': 'يُسْتَعْطَى',
      '3fs': 'تُسْتَعْطَى',
      '2d': 'تُسْتَعْطَيَانِ',
      '3md': 'يُسْتَعْطَيَانِ',
      '3fd': 'تُسْتَعْطَيَانِ',
      '1p': 'نُسْتَعْطَى',
      '2mp': 'تُسْتَعْطَوْنَ',
      '2fp': 'تُسْتَعْطَيْنَ',
      '3mp': 'يُسْتَعْطَوْنَ',
      '3fp': 'يُسْتَعْطَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('ETw-10')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَعْطَى',
      '2ms': 'تُسْتَعْطَى',
      '2fs': 'تُسْتَعْطَيْ',
      '3ms': 'يُسْتَعْطَى',
      '3fs': 'تُسْتَعْطَى',
      '2d': 'تُسْتَعْطَيَا',
      '3md': 'يُسْتَعْطَيَا',
      '3fd': 'تُسْتَعْطَيَا',
      '1p': 'نُسْتَعْطَى',
      '2mp': 'تُسْتَعْطَوْا',
      '2fp': 'تُسْتَعْطَيْنَ',
      '3mp': 'يُسْتَعْطَوْا',
      '3fp': 'يُسْتَعْطَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('ETw-10')!, 'jussive')).toEqualT({
      '1s': 'أُسْتَعْطَ',
      '2ms': 'تُسْتَعْطَ',
      '2fs': 'تُسْتَعْطَيْ',
      '3ms': 'يُسْتَعْطَ',
      '3fs': 'تُسْتَعْطَ',
      '2d': 'تُسْتَعْطَيَا',
      '3md': 'يُسْتَعْطَيَا',
      '3fd': 'تُسْتَعْطَيَا',
      '1p': 'نُسْتَعْطَ',
      '2mp': 'تُسْتَعْطَوْا',
      '2fp': 'تُسْتَعْطَيْنَ',
      '3mp': 'يُسْتَعْطَوْا',
      '3fp': 'يُسْتَعْطَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('ETw-10')!)).toEqualT('مُسْتَعْطٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('ETw-10')!)).toEqualT('مُسْتَعْطًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('ETw-10')!))).toEqualT(new Set(['اِسْتِعْطَاء']))
  })
})
