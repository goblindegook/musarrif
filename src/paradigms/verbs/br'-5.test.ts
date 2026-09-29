import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("br'-5 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("br'-5")!)).toEqualT({
      '1s': 'تَبَرَّأْتُ',
      '2ms': 'تَبَرَّأْتَ',
      '2fs': 'تَبَرَّأْتِ',
      '3ms': 'تَبَرَّأَ',
      '3fs': 'تَبَرَّأَتْ',
      '2d': 'تَبَرَّأْتُمَا',
      '3md': 'تَبَرَّآ',
      '3fd': 'تَبَرَّأَتَا',
      '1p': 'تَبَرَّأْنَا',
      '2mp': 'تَبَرَّأْتُمْ',
      '2fp': 'تَبَرَّأْتُنَّ',
      '3mp': 'تَبَرَّؤُوا',
      '3fp': 'تَبَرَّأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("br'-5")!, 'indicative')).toEqualT({
      '1s': 'أَتَبَرَّأُ',
      '2ms': 'تَتَبَرَّأُ',
      '2fs': 'تَتَبَرَّئِينَ',
      '3ms': 'يَتَبَرَّأُ',
      '3fs': 'تَتَبَرَّأُ',
      '2d': 'تَتَبَرَّآنِ',
      '3md': 'يَتَبَرَّآنِ',
      '3fd': 'تَتَبَرَّآنِ',
      '1p': 'نَتَبَرَّأُ',
      '2mp': 'تَتَبَرَّؤُونَ',
      '2fp': 'تَتَبَرَّأْنَ',
      '3mp': 'يَتَبَرَّؤُونَ',
      '3fp': 'يَتَبَرَّأْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("br'-5")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَبَرَّأَ',
      '2ms': 'تَتَبَرَّأَ',
      '2fs': 'تَتَبَرَّئِي',
      '3ms': 'يَتَبَرَّأَ',
      '3fs': 'تَتَبَرَّأَ',
      '2d': 'تَتَبَرَّآ',
      '3md': 'يَتَبَرَّآ',
      '3fd': 'تَتَبَرَّآ',
      '1p': 'نَتَبَرَّأَ',
      '2mp': 'تَتَبَرَّؤُوا',
      '2fp': 'تَتَبَرَّأْنَ',
      '3mp': 'يَتَبَرَّؤُوا',
      '3fp': 'يَتَبَرَّأْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("br'-5")!, 'jussive')).toEqualT({
      '1s': 'أَتَبَرَّأْ',
      '2ms': 'تَتَبَرَّأْ',
      '2fs': 'تَتَبَرَّئِي',
      '3ms': 'يَتَبَرَّأْ',
      '3fs': 'تَتَبَرَّأْ',
      '2d': 'تَتَبَرَّآ',
      '3md': 'يَتَبَرَّآ',
      '3fd': 'تَتَبَرَّآ',
      '1p': 'نَتَبَرَّأْ',
      '2mp': 'تَتَبَرَّؤُوا',
      '2fp': 'تَتَبَرَّأْنَ',
      '3mp': 'يَتَبَرَّؤُوا',
      '3fp': 'يَتَبَرَّأْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("br'-5")!)).toMatchObjectT({
      '2ms': 'تَبَرَّأْ',
      '2fs': 'تَبَرَّئِي',
      '2d': 'تَبَرَّآ',
      '2mp': 'تَبَرَّؤُوا',
      '2fp': 'تَبَرَّأْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("br'-5")!)).toMatchObjectT({
      '3ms': 'تُبُرِّئَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("br'-5")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَبَرَّأُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("br'-5")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَبَرَّأَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("br'-5")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَبَرَّأْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("br'-5")!)).toEqualT('مُتَبَرِّئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("br'-5")!)).toEqualT('مُتَبَرَّأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("br'-5")!))).toEqualT(new Set(['تَبَرُّؤ']))
  })
})
