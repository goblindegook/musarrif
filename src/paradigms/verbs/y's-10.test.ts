import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("y's-10 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("y's-10")!)).toEqualT({
      '1s': 'اِسْتَيْئَسْتُ',
      '2ms': 'اِسْتَيْئَسْتَ',
      '2fs': 'اِسْتَيْئَسْتِ',
      '3ms': 'اِسْتَيْئَسَ',
      '3fs': 'اِسْتَيْئَسَتْ',
      '2d': 'اِسْتَيْئَسْتُمَا',
      '3md': 'اِسْتَيْئَسَا',
      '3fd': 'اِسْتَيْئَسَتَا',
      '1p': 'اِسْتَيْئَسْنَا',
      '2mp': 'اِسْتَيْئَسْتُمْ',
      '2fp': 'اِسْتَيْئَسْتُنَّ',
      '3mp': 'اِسْتَيْئَسُوا',
      '3fp': 'اِسْتَيْئَسْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("y's-10")!, 'indicative')).toEqualT({
      '1s': 'أَسْتَيْئِسُ',
      '2ms': 'تَسْتَيْئِسُ',
      '2fs': 'تَسْتَيْئِسِينَ',
      '3ms': 'يَسْتَيْئِسُ',
      '3fs': 'تَسْتَيْئِسُ',
      '2d': 'تَسْتَيْئِسَانِ',
      '3md': 'يَسْتَيْئِسَانِ',
      '3fd': 'تَسْتَيْئِسَانِ',
      '1p': 'نَسْتَيْئِسُ',
      '2mp': 'تَسْتَيْئِسُونَ',
      '2fp': 'تَسْتَيْئِسْنَ',
      '3mp': 'يَسْتَيْئِسُونَ',
      '3fp': 'يَسْتَيْئِسْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("y's-10")!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَيْئِسَ',
      '2ms': 'تَسْتَيْئِسَ',
      '2fs': 'تَسْتَيْئِسِي',
      '3ms': 'يَسْتَيْئِسَ',
      '3fs': 'تَسْتَيْئِسَ',
      '2d': 'تَسْتَيْئِسَا',
      '3md': 'يَسْتَيْئِسَا',
      '3fd': 'تَسْتَيْئِسَا',
      '1p': 'نَسْتَيْئِسَ',
      '2mp': 'تَسْتَيْئِسُوا',
      '2fp': 'تَسْتَيْئِسْنَ',
      '3mp': 'يَسْتَيْئِسُوا',
      '3fp': 'يَسْتَيْئِسْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("y's-10")!, 'jussive')).toEqualT({
      '1s': 'أَسْتَيْئِسْ',
      '2ms': 'تَسْتَيْئِسْ',
      '2fs': 'تَسْتَيْئِسِي',
      '3ms': 'يَسْتَيْئِسْ',
      '3fs': 'تَسْتَيْئِسْ',
      '2d': 'تَسْتَيْئِسَا',
      '3md': 'يَسْتَيْئِسَا',
      '3fd': 'تَسْتَيْئِسَا',
      '1p': 'نَسْتَيْئِسْ',
      '2mp': 'تَسْتَيْئِسُوا',
      '2fp': 'تَسْتَيْئِسْنَ',
      '3mp': 'يَسْتَيْئِسُوا',
      '3fp': 'يَسْتَيْئِسْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("y's-10")!)).toMatchObjectT({
      '2ms': 'اِسْتَيْئِسْ',
      '2fs': 'اِسْتَيْئِسِي',
      '2d': 'اِسْتَيْئِسَا',
      '2mp': 'اِسْتَيْئِسُوا',
      '2fp': 'اِسْتَيْئِسْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("y's-10")!)).toMatchObjectT({
      '3ms': 'اُسْتُوئِسَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("y's-10")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُسْتَيْئَسُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("y's-10")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُسْتَيْئَسَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("y's-10")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُسْتَيْئَسْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("y's-10")!)).toEqualT('مُسْتَيْئِس')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("y's-10")!)).toEqualT('مُسْتَيْئَس')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("y's-10")!))).toEqualT(new Set(['اِسْتِيئَاس']))
  })
})
