import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$ry-8', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$ry-8')!)).toEqualT({
      '1s': 'اِشْتَرَيْتُ',
      '2ms': 'اِشْتَرَيْتَ',
      '2fs': 'اِشْتَرَيْتِ',
      '3ms': 'اِشْتَرَى',
      '3fs': 'اِشْتَرَتْ',
      '2d': 'اِشْتَرَيْتُمَا',
      '3md': 'اِشْتَرَيَا',
      '3fd': 'اِشْتَرَتَا',
      '1p': 'اِشْتَرَيْنَا',
      '2mp': 'اِشْتَرَيْتُمْ',
      '2fp': 'اِشْتَرَيْتُنَّ',
      '3mp': 'اِشْتَرَوْا',
      '3fp': 'اِشْتَرَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$ry-8')!, 'indicative')).toEqualT({
      '1s': 'أَشْتَرِي',
      '2ms': 'تَشْتَرِي',
      '2fs': 'تَشْتَرِينَ',
      '3ms': 'يَشْتَرِي',
      '3fs': 'تَشْتَرِي',
      '2d': 'تَشْتَرِيَانِ',
      '3md': 'يَشْتَرِيَانِ',
      '3fd': 'تَشْتَرِيَانِ',
      '1p': 'نَشْتَرِي',
      '2mp': 'تَشْتَرُونَ',
      '2fp': 'تَشْتَرِينَ',
      '3mp': 'يَشْتَرُونَ',
      '3fp': 'يَشْتَرِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$ry-8')!, 'subjunctive')).toEqualT({
      '1s': 'أَشْتَرِيَ',
      '2ms': 'تَشْتَرِيَ',
      '2fs': 'تَشْتَرِي',
      '3ms': 'يَشْتَرِيَ',
      '3fs': 'تَشْتَرِيَ',
      '2d': 'تَشْتَرِيَا',
      '3md': 'يَشْتَرِيَا',
      '3fd': 'تَشْتَرِيَا',
      '1p': 'نَشْتَرِيَ',
      '2mp': 'تَشْتَرُوا',
      '2fp': 'تَشْتَرِينَ',
      '3mp': 'يَشْتَرُوا',
      '3fp': 'يَشْتَرِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$ry-8')!, 'jussive')).toEqualT({
      '1s': 'أَشْتَرِ',
      '2ms': 'تَشْتَرِ',
      '2fs': 'تَشْتَرِي',
      '3ms': 'يَشْتَرِ',
      '3fs': 'تَشْتَرِ',
      '2d': 'تَشْتَرِيَا',
      '3md': 'يَشْتَرِيَا',
      '3fd': 'تَشْتَرِيَا',
      '1p': 'نَشْتَرِ',
      '2mp': 'تَشْتَرُوا',
      '2fp': 'تَشْتَرِينَ',
      '3mp': 'يَشْتَرُوا',
      '3fp': 'يَشْتَرِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$ry-8')!)).toMatchObjectT({
      '2ms': 'اِشْتَرِ',
      '2fs': 'اِشْتَرِي',
      '2d': 'اِشْتَرِيَا',
      '2mp': 'اِشْتَرُوا',
      '2fp': 'اِشْتَرِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$ry-8')!)).toEqualT({
      '1s': 'اُشْتُرِيتُ',
      '2ms': 'اُشْتُرِيتَ',
      '2fs': 'اُشْتُرِيتِ',
      '3ms': 'اُشْتُرِيَ',
      '3fs': 'اُشْتُرِيَتْ',
      '2d': 'اُشْتُرِيتُمَا',
      '3md': 'اُشْتُرِيَا',
      '3fd': 'اُشْتُرِيَتَا',
      '1p': 'اُشْتُرِينَا',
      '2mp': 'اُشْتُرِيتُمْ',
      '2fp': 'اُشْتُرِيتُنَّ',
      '3mp': 'اُشْتُرُوا',
      '3fp': 'اُشْتُرِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$ry-8')!, 'indicative')).toEqualT({
      '1s': 'أُشْتَرَى',
      '2ms': 'تُشْتَرَى',
      '2fs': 'تُشْتَرَيْنَ',
      '3ms': 'يُشْتَرَى',
      '3fs': 'تُشْتَرَى',
      '2d': 'تُشْتَرَيَانِ',
      '3md': 'يُشْتَرَيَانِ',
      '3fd': 'تُشْتَرَيَانِ',
      '1p': 'نُشْتَرَى',
      '2mp': 'تُشْتَرَوْنَ',
      '2fp': 'تُشْتَرَيْنَ',
      '3mp': 'يُشْتَرَوْنَ',
      '3fp': 'يُشْتَرَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$ry-8')!, 'subjunctive')).toEqualT({
      '1s': 'أُشْتَرَى',
      '2ms': 'تُشْتَرَى',
      '2fs': 'تُشْتَرَيْ',
      '3ms': 'يُشْتَرَى',
      '3fs': 'تُشْتَرَى',
      '2d': 'تُشْتَرَيَا',
      '3md': 'يُشْتَرَيَا',
      '3fd': 'تُشْتَرَيَا',
      '1p': 'نُشْتَرَى',
      '2mp': 'تُشْتَرَوْا',
      '2fp': 'تُشْتَرَيْنَ',
      '3mp': 'يُشْتَرَوْا',
      '3fp': 'يُشْتَرَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$ry-8')!, 'jussive')).toEqualT({
      '1s': 'أُشْتَرَ',
      '2ms': 'تُشْتَرَ',
      '2fs': 'تُشْتَرَيْ',
      '3ms': 'يُشْتَرَ',
      '3fs': 'تُشْتَرَ',
      '2d': 'تُشْتَرَيَا',
      '3md': 'يُشْتَرَيَا',
      '3fd': 'تُشْتَرَيَا',
      '1p': 'نُشْتَرَ',
      '2mp': 'تُشْتَرَوْا',
      '2fp': 'تُشْتَرَيْنَ',
      '3mp': 'يُشْتَرَوْا',
      '3fp': 'يُشْتَرَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$ry-8')!)).toEqualT('مُشْتَرٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$ry-8')!)).toEqualT('مُشْتَرًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('$ry-8')!)).toEqualT(['اِشْتِرَاء'])
  })
})
