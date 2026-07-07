import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wfy-10', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wfy-10')!)).toEqualT({
      '1s': 'اِسْتَوْفَيْتُ',
      '2ms': 'اِسْتَوْفَيْتَ',
      '2fs': 'اِسْتَوْفَيْتِ',
      '3ms': 'اِسْتَوْفَى',
      '3fs': 'اِسْتَوْفَتْ',
      '2d': 'اِسْتَوْفَيْتُمَا',
      '3md': 'اِسْتَوْفَيَا',
      '3fd': 'اِسْتَوْفَتَا',
      '1p': 'اِسْتَوْفَيْنَا',
      '2mp': 'اِسْتَوْفَيْتُمْ',
      '2fp': 'اِسْتَوْفَيْتُنَّ',
      '3mp': 'اِسْتَوْفَوْا',
      '3fp': 'اِسْتَوْفَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wfy-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَوْفِي',
      '2ms': 'تَسْتَوْفِي',
      '2fs': 'تَسْتَوْفِينَ',
      '3ms': 'يَسْتَوْفِي',
      '3fs': 'تَسْتَوْفِي',
      '2d': 'تَسْتَوْفِيَانِ',
      '3md': 'يَسْتَوْفِيَانِ',
      '3fd': 'تَسْتَوْفِيَانِ',
      '1p': 'نَسْتَوْفِي',
      '2mp': 'تَسْتَوْفُونَ',
      '2fp': 'تَسْتَوْفِينَ',
      '3mp': 'يَسْتَوْفُونَ',
      '3fp': 'يَسْتَوْفِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wfy-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَوْفِيَ',
      '2ms': 'تَسْتَوْفِيَ',
      '2fs': 'تَسْتَوْفِي',
      '3ms': 'يَسْتَوْفِيَ',
      '3fs': 'تَسْتَوْفِيَ',
      '2d': 'تَسْتَوْفِيَا',
      '3md': 'يَسْتَوْفِيَا',
      '3fd': 'تَسْتَوْفِيَا',
      '1p': 'نَسْتَوْفِيَ',
      '2mp': 'تَسْتَوْفُوا',
      '2fp': 'تَسْتَوْفِينَ',
      '3mp': 'يَسْتَوْفُوا',
      '3fp': 'يَسْتَوْفِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wfy-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَوْفِ',
      '2ms': 'تَسْتَوْفِ',
      '2fs': 'تَسْتَوْفِي',
      '3ms': 'يَسْتَوْفِ',
      '3fs': 'تَسْتَوْفِ',
      '2d': 'تَسْتَوْفِيَا',
      '3md': 'يَسْتَوْفِيَا',
      '3fd': 'تَسْتَوْفِيَا',
      '1p': 'نَسْتَوْفِ',
      '2mp': 'تَسْتَوْفُوا',
      '2fp': 'تَسْتَوْفِينَ',
      '3mp': 'يَسْتَوْفُوا',
      '3fp': 'يَسْتَوْفِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wfy-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَوْفِ',
      '2fs': 'اِسْتَوْفِي',
      '2d': 'اِسْتَوْفِيَا',
      '2mp': 'اِسْتَوْفُوا',
      '2fp': 'اِسْتَوْفِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wfy-10')!)).toEqualT({
      '1s': 'اُسْتُوفِيتُ',
      '2ms': 'اُسْتُوفِيتَ',
      '2fs': 'اُسْتُوفِيتِ',
      '3ms': 'اُسْتُوفِيَ',
      '3fs': 'اُسْتُوفِيَتْ',
      '2d': 'اُسْتُوفِيتُمَا',
      '3md': 'اُسْتُوفِيَا',
      '3fd': 'اُسْتُوفِيَتَا',
      '1p': 'اُسْتُوفِينَا',
      '2mp': 'اُسْتُوفِيتُمْ',
      '2fp': 'اُسْتُوفِيتُنَّ',
      '3mp': 'اُسْتُوفُوا',
      '3fp': 'اُسْتُوفِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-10')!, 'indicative')).toEqualT({
      '1s': 'أُسْتَوْفَى',
      '2ms': 'تُسْتَوْفَى',
      '2fs': 'تُسْتَوْفَيْنَ',
      '3ms': 'يُسْتَوْفَى',
      '3fs': 'تُسْتَوْفَى',
      '2d': 'تُسْتَوْفَيَانِ',
      '3md': 'يُسْتَوْفَيَانِ',
      '3fd': 'تُسْتَوْفَيَانِ',
      '1p': 'نُسْتَوْفَى',
      '2mp': 'تُسْتَوْفَوْنَ',
      '2fp': 'تُسْتَوْفَيْنَ',
      '3mp': 'يُسْتَوْفَوْنَ',
      '3fp': 'يُسْتَوْفَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-10')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَوْفَى',
      '2ms': 'تُسْتَوْفَى',
      '2fs': 'تُسْتَوْفَيْ',
      '3ms': 'يُسْتَوْفَى',
      '3fs': 'تُسْتَوْفَى',
      '2d': 'تُسْتَوْفَيَا',
      '3md': 'يُسْتَوْفَيَا',
      '3fd': 'تُسْتَوْفَيَا',
      '1p': 'نُسْتَوْفَى',
      '2mp': 'تُسْتَوْفَوْا',
      '2fp': 'تُسْتَوْفَيْنَ',
      '3mp': 'يُسْتَوْفَوْا',
      '3fp': 'يُسْتَوْفَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-10')!, 'jussive')).toEqualT({
      '1s': 'أُسْتَوْفَ',
      '2ms': 'تُسْتَوْفَ',
      '2fs': 'تُسْتَوْفَيْ',
      '3ms': 'يُسْتَوْفَ',
      '3fs': 'تُسْتَوْفَ',
      '2d': 'تُسْتَوْفَيَا',
      '3md': 'يُسْتَوْفَيَا',
      '3fd': 'تُسْتَوْفَيَا',
      '1p': 'نُسْتَوْفَ',
      '2mp': 'تُسْتَوْفَوْا',
      '2fp': 'تُسْتَوْفَيْنَ',
      '3mp': 'يُسْتَوْفَوْا',
      '3fp': 'يُسْتَوْفَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wfy-10')!)).toEqualT('مُسْتَوْفٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wfy-10')!)).toEqualT('مُسْتَوْفًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wfy-10')!)).toEqualT(['اِسْتِيفَاء'])
  })
})
