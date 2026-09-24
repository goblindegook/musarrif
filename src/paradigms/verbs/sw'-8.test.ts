import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("sw'-8 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("sw'-8")!)).toEqualT({
      '1s': 'اِسْتَأْتُ',
      '2ms': 'اِسْتَأْتَ',
      '2fs': 'اِسْتَأْتِ',
      '3ms': 'اِسْتَاءَ',
      '3fs': 'اِسْتَاءَتْ',
      '2d': 'اِسْتَأْتُمَا',
      '3md': 'اِسْتَاءَا',
      '3fd': 'اِسْتَاءَتَا',
      '1p': 'اِسْتَأْنَا',
      '2mp': 'اِسْتَأْتُمْ',
      '2fp': 'اِسْتَأْتُنَّ',
      '3mp': expect.toBeOneOf(['اِسْتَائُوا', 'اِسْتَاؤُوا']),
      '3fp': 'اِسْتَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("sw'-8")!, 'indicative')).toEqualT({
      '1s': 'أَسْتَاءُ',
      '2ms': 'تَسْتَاءُ',
      '2fs': 'تَسْتَائِينَ',
      '3ms': 'يَسْتَاءُ',
      '3fs': 'تَسْتَاءُ',
      '2d': 'تَسْتَاءَانِ',
      '3md': 'يَسْتَاءَانِ',
      '3fd': 'تَسْتَاءَانِ',
      '1p': 'نَسْتَاءُ',
      '2mp': expect.toBeOneOf(['تَسْتَائُونَ', 'تَسْتَاؤُونَ']),
      '2fp': 'تَسْتَأْنَ',
      '3mp': expect.toBeOneOf(['يَسْتَائُونَ', 'يَسْتَاؤُونَ']),
      '3fp': 'يَسْتَأْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("sw'-8")!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَاءَ',
      '2ms': 'تَسْتَاءَ',
      '2fs': 'تَسْتَائِي',
      '3ms': 'يَسْتَاءَ',
      '3fs': 'تَسْتَاءَ',
      '2d': 'تَسْتَاءَا',
      '3md': 'يَسْتَاءَا',
      '3fd': 'تَسْتَاءَا',
      '1p': 'نَسْتَاءَ',
      '2mp': expect.toBeOneOf(['تَسْتَائُوا', 'تَسْتَاؤُوا']),
      '2fp': 'تَسْتَأْنَ',
      '3mp': expect.toBeOneOf(['يَسْتَائُوا', 'يَسْتَاؤُوا']),
      '3fp': 'يَسْتَأْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("sw'-8")!, 'jussive')).toEqualT({
      '1s': 'أَسْتَأْ',
      '2ms': 'تَسْتَأْ',
      '2fs': 'تَسْتَائِي',
      '3ms': 'يَسْتَأْ',
      '3fs': 'تَسْتَأْ',
      '2d': 'تَسْتَاءَا',
      '3md': 'يَسْتَاءَا',
      '3fd': 'تَسْتَاءَا',
      '1p': 'نَسْتَأْ',
      '2mp': expect.toBeOneOf(['تَسْتَائُوا', 'تَسْتَاؤُوا']),
      '2fp': 'تَسْتَأْنَ',
      '3mp': expect.toBeOneOf(['يَسْتَائُوا', 'يَسْتَاؤُوا']),
      '3fp': 'يَسْتَأْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("sw'-8")!)).toMatchObjectT({
      '2ms': 'اِسْتَأْ',
      '2fs': 'اِسْتَائِي',
      '2d': 'اِسْتَاءَا',
      '2mp': expect.toBeOneOf(['اِسْتَائُوا', 'اِسْتَاؤُوا']),
      '2fp': 'اِسْتَأْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("sw'-8")!)).toMatchObjectT({
      '3ms': 'اُسْتِيءَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("sw'-8")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُسْتَاءُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("sw'-8")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُسْتَاءَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("sw'-8")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُسْتَأْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("sw'-8")!)).toEqualT('مُسْتَاء')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("sw'-8")!)).toEqualT('مُسْتَاء')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("sw'-8")!))).toEqualT(new Set(['اِسْتِيَاء']))
  })
})
