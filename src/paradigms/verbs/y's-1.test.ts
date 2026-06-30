import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("y's-1", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("y's-1")!)).toEqualT({
      '1s': 'يَئِسْتُ',
      '2ms': 'يَئِسْتَ',
      '2fs': 'يَئِسْتِ',
      '3ms': 'يَئِسَ',
      '3fs': 'يَئِسَتْ',
      '2d': 'يَئِسْتُمَا',
      '3md': 'يَئِسَا',
      '3fd': 'يَئِسَتَا',
      '1p': 'يَئِسْنَا',
      '2mp': 'يَئِسْتُمْ',
      '2fp': 'يَئِسْتُنَّ',
      '3mp': 'يَئِسُوا',
      '3fp': 'يَئِسْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("y's-1")!, 'indicative')).toEqualT({
      '1s': 'أَيْئَسُ',
      '2ms': 'تَيْئَسُ',
      '2fs': 'تَيْئَسِينَ',
      '3ms': 'يَيْئَسُ',
      '3fs': 'تَيْئَسُ',
      '2d': 'تَيْئَسَانِ',
      '3md': 'يَيْئَسَانِ',
      '3fd': 'تَيْئَسَانِ',
      '1p': 'نَيْئَسُ',
      '2mp': 'تَيْئَسُونَ',
      '2fp': 'تَيْئَسْنَ',
      '3mp': 'يَيْئَسُونَ',
      '3fp': 'يَيْئَسْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("y's-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَيْئَسَ',
      '2ms': 'تَيْئَسَ',
      '2fs': 'تَيْئَسِي',
      '3ms': 'يَيْئَسَ',
      '3fs': 'تَيْئَسَ',
      '2d': 'تَيْئَسَا',
      '3md': 'يَيْئَسَا',
      '3fd': 'تَيْئَسَا',
      '1p': 'نَيْئَسَ',
      '2mp': 'تَيْئَسُوا',
      '2fp': 'تَيْئَسْنَ',
      '3mp': 'يَيْئَسُوا',
      '3fp': 'يَيْئَسْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("y's-1")!, 'jussive')).toEqualT({
      '1s': 'أَيْئَسْ',
      '2ms': 'تَيْئَسْ',
      '2fs': 'تَيْئَسِي',
      '3ms': 'يَيْئَسْ',
      '3fs': 'تَيْئَسْ',
      '2d': 'تَيْئَسَا',
      '3md': 'يَيْئَسَا',
      '3fd': 'تَيْئَسَا',
      '1p': 'نَيْئَسْ',
      '2mp': 'تَيْئَسُوا',
      '2fp': 'تَيْئَسْنَ',
      '3mp': 'يَيْئَسُوا',
      '3fp': 'يَيْئَسْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("y's-1")!)).toMatchObjectT({
      '2ms': 'اِيئَسْ',
      '2fs': 'اِيئَسِي',
      '2d': 'اِيئَسَا',
      '2mp': 'اِيئَسُوا',
      '2fp': 'اِيئَسْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("y's-1")!)).toMatchObjectT({
      '3ms': 'يُئِسَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("y's-1")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُوءَسُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("y's-1")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُوءَسَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("y's-1")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُوءَسْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("y's-1")!)).toEqualT('يَائِس')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("y's-1")!)).toEqualT('مَيْؤُوس')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("y's-1")!)).toEqualT(['يَأْس', 'يَآسَة'])
  })
})
