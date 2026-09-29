import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("$y'-5 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("$y'-5")!)).toEqualT({
      '1s': 'تَشَيَّأْتُ',
      '2ms': 'تَشَيَّأْتَ',
      '2fs': 'تَشَيَّأْتِ',
      '3ms': 'تَشَيَّأَ',
      '3fs': 'تَشَيَّأَتْ',
      '2d': 'تَشَيَّأْتُمَا',
      '3md': 'تَشَيَّآ',
      '3fd': 'تَشَيَّأَتَا',
      '1p': 'تَشَيَّأْنَا',
      '2mp': 'تَشَيَّأْتُمْ',
      '2fp': 'تَشَيَّأْتُنَّ',
      '3mp': 'تَشَيَّؤُوا',
      '3fp': 'تَشَيَّأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("$y'-5")!, 'indicative')).toEqualT({
      '1s': 'أَتَشَيَّأُ',
      '2ms': 'تَتَشَيَّأُ',
      '2fs': 'تَتَشَيَّئِينَ',
      '3ms': 'يَتَشَيَّأُ',
      '3fs': 'تَتَشَيَّأُ',
      '2d': 'تَتَشَيَّآنِ',
      '3md': 'يَتَشَيَّآنِ',
      '3fd': 'تَتَشَيَّآنِ',
      '1p': 'نَتَشَيَّأُ',
      '2mp': 'تَتَشَيَّؤُونَ',
      '2fp': 'تَتَشَيَّأْنَ',
      '3mp': 'يَتَشَيَّؤُونَ',
      '3fp': 'يَتَشَيَّأْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("$y'-5")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَشَيَّأَ',
      '2ms': 'تَتَشَيَّأَ',
      '2fs': 'تَتَشَيَّئِي',
      '3ms': 'يَتَشَيَّأَ',
      '3fs': 'تَتَشَيَّأَ',
      '2d': 'تَتَشَيَّآ',
      '3md': 'يَتَشَيَّآ',
      '3fd': 'تَتَشَيَّآ',
      '1p': 'نَتَشَيَّأَ',
      '2mp': 'تَتَشَيَّؤُوا',
      '2fp': 'تَتَشَيَّأْنَ',
      '3mp': 'يَتَشَيَّؤُوا',
      '3fp': 'يَتَشَيَّأْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("$y'-5")!, 'jussive')).toEqualT({
      '1s': 'أَتَشَيَّأْ',
      '2ms': 'تَتَشَيَّأْ',
      '2fs': 'تَتَشَيَّئِي',
      '3ms': 'يَتَشَيَّأْ',
      '3fs': 'تَتَشَيَّأْ',
      '2d': 'تَتَشَيَّآ',
      '3md': 'يَتَشَيَّآ',
      '3fd': 'تَتَشَيَّآ',
      '1p': 'نَتَشَيَّأْ',
      '2mp': 'تَتَشَيَّؤُوا',
      '2fp': 'تَتَشَيَّأْنَ',
      '3mp': 'يَتَشَيَّؤُوا',
      '3fp': 'يَتَشَيَّأْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("$y'-5")!)).toMatchObjectT({
      '2ms': 'تَشَيَّأْ',
      '2fs': 'تَشَيَّئِي',
      '2d': 'تَشَيَّآ',
      '2mp': 'تَشَيَّؤُوا',
      '2fp': 'تَشَيَّأْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("$y'-5")!)).toMatchObjectT({
      '3ms': 'تُشُيِّئَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("$y'-5")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَشَيَّأُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("$y'-5")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَشَيَّأَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("$y'-5")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَشَيَّأْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("$y'-5")!)).toEqualT('مُتَشَيِّئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("$y'-5")!)).toEqualT('مُتَشَيَّأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("$y'-5")!))).toEqualT(new Set(['تَشَيُّؤ']))
  })
})
