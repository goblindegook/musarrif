import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('dwr-10', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('dwr-10')!)).toEqualT({
      '1s': 'اِسْتَدَرْتُ',
      '2ms': 'اِسْتَدَرْتَ',
      '2fs': 'اِسْتَدَرْتِ',
      '3ms': 'اِسْتَدَارَ',
      '3fs': 'اِسْتَدَارَتْ',
      '2d': 'اِسْتَدَرْتُمَا',
      '3md': 'اِسْتَدَارَا',
      '3fd': 'اِسْتَدَارَتَا',
      '1p': 'اِسْتَدَرْنَا',
      '2mp': 'اِسْتَدَرْتُمْ',
      '2fp': 'اِسْتَدَرْتُنَّ',
      '3mp': 'اِسْتَدَارُوا',
      '3fp': 'اِسْتَدَرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('dwr-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَدِيرُ',
      '2ms': 'تَسْتَدِيرُ',
      '2fs': 'تَسْتَدِيرِينَ',
      '3ms': 'يَسْتَدِيرُ',
      '3fs': 'تَسْتَدِيرُ',
      '2d': 'تَسْتَدِيرَانِ',
      '3md': 'يَسْتَدِيرَانِ',
      '3fd': 'تَسْتَدِيرَانِ',
      '1p': 'نَسْتَدِيرُ',
      '2mp': 'تَسْتَدِيرُونَ',
      '2fp': 'تَسْتَدِرْنَ',
      '3mp': 'يَسْتَدِيرُونَ',
      '3fp': 'يَسْتَدِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('dwr-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَدِيرَ',
      '2ms': 'تَسْتَدِيرَ',
      '2fs': 'تَسْتَدِيرِي',
      '3ms': 'يَسْتَدِيرَ',
      '3fs': 'تَسْتَدِيرَ',
      '2d': 'تَسْتَدِيرَا',
      '3md': 'يَسْتَدِيرَا',
      '3fd': 'تَسْتَدِيرَا',
      '1p': 'نَسْتَدِيرَ',
      '2mp': 'تَسْتَدِيرُوا',
      '2fp': 'تَسْتَدِرْنَ',
      '3mp': 'يَسْتَدِيرُوا',
      '3fp': 'يَسْتَدِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('dwr-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَدِرْ',
      '2ms': 'تَسْتَدِرْ',
      '2fs': 'تَسْتَدِيرِي',
      '3ms': 'يَسْتَدِرْ',
      '3fs': 'تَسْتَدِرْ',
      '2d': 'تَسْتَدِيرَا',
      '3md': 'يَسْتَدِيرَا',
      '3fd': 'تَسْتَدِيرَا',
      '1p': 'نَسْتَدِرْ',
      '2mp': 'تَسْتَدِيرُوا',
      '2fp': 'تَسْتَدِرْنَ',
      '3mp': 'يَسْتَدِيرُوا',
      '3fp': 'يَسْتَدِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('dwr-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَدِرْ',
      '2fs': 'اِسْتَدِيرِي',
      '2d': 'اِسْتَدِيرَا',
      '2mp': 'اِسْتَدِيرُوا',
      '2fp': 'اِسْتَدِرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('dwr-10')!)).toMatchObjectT({
      '3ms': 'اُسْتُدِيرَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('dwr-10')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُسْتَدَارُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('dwr-10')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُسْتَدَارَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('dwr-10')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُسْتَدَرْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('dwr-10')!)).toEqualT('مُسْتَدِير')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('dwr-10')!)).toEqualT('مُسْتَدَار')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('dwr-10')!)).toEqualT(['اِسْتِدَارَة'])
  })
})
