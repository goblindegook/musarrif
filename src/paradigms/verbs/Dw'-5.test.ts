import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("Dw'-5 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("Dw'-5")!)).toEqualT({
      '1s': 'تَضَوَّأْتُ',
      '2ms': 'تَضَوَّأْتَ',
      '2fs': 'تَضَوَّأْتِ',
      '3ms': 'تَضَوَّأَ',
      '3fs': 'تَضَوَّأَتْ',
      '2d': 'تَضَوَّأْتُمَا',
      '3md': 'تَضَوَّآ',
      '3fd': 'تَضَوَّأَتَا',
      '1p': 'تَضَوَّأْنَا',
      '2mp': 'تَضَوَّأْتُمْ',
      '2fp': 'تَضَوَّأْتُنَّ',
      '3mp': 'تَضَوَّؤُوا',
      '3fp': 'تَضَوَّأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("Dw'-5")!, 'indicative')).toEqualT({
      '1s': 'أَتَضَوَّأُ',
      '2ms': 'تَتَضَوَّأُ',
      '2fs': 'تَتَضَوَّئِينَ',
      '3ms': 'يَتَضَوَّأُ',
      '3fs': 'تَتَضَوَّأُ',
      '2d': 'تَتَضَوَّآنِ',
      '3md': 'يَتَضَوَّآنِ',
      '3fd': 'تَتَضَوَّآنِ',
      '1p': 'نَتَضَوَّأُ',
      '2mp': 'تَتَضَوَّؤُونَ',
      '2fp': 'تَتَضَوَّأْنَ',
      '3mp': 'يَتَضَوَّؤُونَ',
      '3fp': 'يَتَضَوَّأْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("Dw'-5")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَضَوَّأَ',
      '2ms': 'تَتَضَوَّأَ',
      '2fs': 'تَتَضَوَّئِي',
      '3ms': 'يَتَضَوَّأَ',
      '3fs': 'تَتَضَوَّأَ',
      '2d': 'تَتَضَوَّآ',
      '3md': 'يَتَضَوَّآ',
      '3fd': 'تَتَضَوَّآ',
      '1p': 'نَتَضَوَّأَ',
      '2mp': 'تَتَضَوَّؤُوا',
      '2fp': 'تَتَضَوَّأْنَ',
      '3mp': 'يَتَضَوَّؤُوا',
      '3fp': 'يَتَضَوَّأْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("Dw'-5")!, 'jussive')).toEqualT({
      '1s': 'أَتَضَوَّأْ',
      '2ms': 'تَتَضَوَّأْ',
      '2fs': 'تَتَضَوَّئِي',
      '3ms': 'يَتَضَوَّأْ',
      '3fs': 'تَتَضَوَّأْ',
      '2d': 'تَتَضَوَّآ',
      '3md': 'يَتَضَوَّآ',
      '3fd': 'تَتَضَوَّآ',
      '1p': 'نَتَضَوَّأْ',
      '2mp': 'تَتَضَوَّؤُوا',
      '2fp': 'تَتَضَوَّأْنَ',
      '3mp': 'يَتَضَوَّؤُوا',
      '3fp': 'يَتَضَوَّأْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("Dw'-5")!)).toMatchObjectT({
      '2ms': 'تَضَوَّأْ',
      '2fs': 'تَضَوَّئِي',
      '2d': 'تَضَوَّآ',
      '2mp': 'تَضَوَّؤُوا',
      '2fp': 'تَضَوَّأْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("Dw'-5")!)).toMatchObjectT({
      '3ms': 'تُضُوِّئَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("Dw'-5")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَضَوَّأُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Dw'-5")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَضَوَّأَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Dw'-5")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَضَوَّأْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("Dw'-5")!)).toEqualT('مُتَضَوِّئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("Dw'-5")!)).toEqualT('مُتَضَوَّأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("Dw'-5")!))).toEqualT(new Set(['تَضَوُّؤ']))
  })
})
