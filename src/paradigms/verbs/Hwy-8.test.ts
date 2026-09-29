import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Hwy-8 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hwy-8')!)).toEqualT({
      '1s': 'اِحْتَوَيْتُ',
      '2ms': 'اِحْتَوَيْتَ',
      '2fs': 'اِحْتَوَيْتِ',
      '3ms': 'اِحْتَوَى',
      '3fs': 'اِحْتَوَتْ',
      '2d': 'اِحْتَوَيْتُمَا',
      '3md': 'اِحْتَوَيَا',
      '3fd': 'اِحْتَوَتَا',
      '1p': 'اِحْتَوَيْنَا',
      '2mp': 'اِحْتَوَيْتُمْ',
      '2fp': 'اِحْتَوَيْتُنَّ',
      '3mp': 'اِحْتَوَوْا',
      '3fp': 'اِحْتَوَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hwy-8')!, 'indicative')).toEqualT({
      '1s': 'أَحْتَوِي',
      '2ms': 'تَحْتَوِي',
      '2fs': 'تَحْتَوِينَ',
      '3ms': 'يَحْتَوِي',
      '3fs': 'تَحْتَوِي',
      '2d': 'تَحْتَوِيَانِ',
      '3md': 'يَحْتَوِيَانِ',
      '3fd': 'تَحْتَوِيَانِ',
      '1p': 'نَحْتَوِي',
      '2mp': 'تَحْتَوُونَ',
      '2fp': 'تَحْتَوِينَ',
      '3mp': 'يَحْتَوُونَ',
      '3fp': 'يَحْتَوِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hwy-8')!, 'subjunctive')).toEqualT({
      '1s': 'أَحْتَوِيَ',
      '2ms': 'تَحْتَوِيَ',
      '2fs': 'تَحْتَوِي',
      '3ms': 'يَحْتَوِيَ',
      '3fs': 'تَحْتَوِيَ',
      '2d': 'تَحْتَوِيَا',
      '3md': 'يَحْتَوِيَا',
      '3fd': 'تَحْتَوِيَا',
      '1p': 'نَحْتَوِيَ',
      '2mp': 'تَحْتَوُوا',
      '2fp': 'تَحْتَوِينَ',
      '3mp': 'يَحْتَوُوا',
      '3fp': 'يَحْتَوِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hwy-8')!, 'jussive')).toEqualT({
      '1s': 'أَحْتَوِ',
      '2ms': 'تَحْتَوِ',
      '2fs': 'تَحْتَوِي',
      '3ms': 'يَحْتَوِ',
      '3fs': 'تَحْتَوِ',
      '2d': 'تَحْتَوِيَا',
      '3md': 'يَحْتَوِيَا',
      '3fd': 'تَحْتَوِيَا',
      '1p': 'نَحْتَوِ',
      '2mp': 'تَحْتَوُوا',
      '2fp': 'تَحْتَوِينَ',
      '3mp': 'يَحْتَوُوا',
      '3fp': 'يَحْتَوِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hwy-8')!)).toMatchObjectT({
      '2ms': 'اِحْتَوِ',
      '2fs': 'اِحْتَوِي',
      '2d': 'اِحْتَوِيَا',
      '2mp': 'اِحْتَوُوا',
      '2fp': 'اِحْتَوِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Hwy-8')!)).toEqualT({
      '1s': 'اُحْتُوِيتُ',
      '2ms': 'اُحْتُوِيتَ',
      '2fs': 'اُحْتُوِيتِ',
      '3ms': 'اُحْتُوِيَ',
      '3fs': 'اُحْتُوِيَتْ',
      '2d': 'اُحْتُوِيتُمَا',
      '3md': 'اُحْتُوِيَا',
      '3fd': 'اُحْتُوِيَتَا',
      '1p': 'اُحْتُوِينَا',
      '2mp': 'اُحْتُوِيتُمْ',
      '2fp': 'اُحْتُوِيتُنَّ',
      '3mp': 'اُحْتُوُوا',
      '3fp': 'اُحْتُوِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hwy-8')!, 'indicative')).toEqualT({
      '1s': 'أُحْتَوَى',
      '2ms': 'تُحْتَوَى',
      '2fs': 'تُحْتَوَيْنَ',
      '3ms': 'يُحْتَوَى',
      '3fs': 'تُحْتَوَى',
      '2d': 'تُحْتَوَيَانِ',
      '3md': 'يُحْتَوَيَانِ',
      '3fd': 'تُحْتَوَيَانِ',
      '1p': 'نُحْتَوَى',
      '2mp': 'تُحْتَوَوْنَ',
      '2fp': 'تُحْتَوَيْنَ',
      '3mp': 'يُحْتَوَوْنَ',
      '3fp': 'يُحْتَوَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hwy-8')!, 'subjunctive')).toEqualT({
      '1s': 'أُحْتَوَى',
      '2ms': 'تُحْتَوَى',
      '2fs': 'تُحْتَوَيْ',
      '3ms': 'يُحْتَوَى',
      '3fs': 'تُحْتَوَى',
      '2d': 'تُحْتَوَيَا',
      '3md': 'يُحْتَوَيَا',
      '3fd': 'تُحْتَوَيَا',
      '1p': 'نُحْتَوَى',
      '2mp': 'تُحْتَوَوْا',
      '2fp': 'تُحْتَوَيْنَ',
      '3mp': 'يُحْتَوَوْا',
      '3fp': 'يُحْتَوَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hwy-8')!, 'jussive')).toEqualT({
      '1s': 'أُحْتَوَ',
      '2ms': 'تُحْتَوَ',
      '2fs': 'تُحْتَوَيْ',
      '3ms': 'يُحْتَوَ',
      '3fs': 'تُحْتَوَ',
      '2d': 'تُحْتَوَيَا',
      '3md': 'يُحْتَوَيَا',
      '3fd': 'تُحْتَوَيَا',
      '1p': 'نُحْتَوَ',
      '2mp': 'تُحْتَوَوْا',
      '2fp': 'تُحْتَوَيْنَ',
      '3mp': 'يُحْتَوَوْا',
      '3fp': 'يُحْتَوَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hwy-8')!)).toEqualT('مُحْتَوٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Hwy-8')!)).toEqualT('مُحْتَوًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Hwy-8')!))).toEqualT(new Set(['اِحْتِوَاء']))
  })
})
