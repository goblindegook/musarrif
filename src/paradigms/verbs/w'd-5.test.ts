import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("w'd-5 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("w'd-5")!)).toEqualT({
      '1s': 'تَوَأَّدْتُ',
      '2ms': 'تَوَأَّدْتَ',
      '2fs': 'تَوَأَّدْتِ',
      '3ms': 'تَوَأَّدَ',
      '3fs': 'تَوَأَّدَتْ',
      '2d': 'تَوَأَّدْتُمَا',
      '3md': 'تَوَأَّدَا',
      '3fd': 'تَوَأَّدَتَا',
      '1p': 'تَوَأَّدْنَا',
      '2mp': 'تَوَأَّدْتُمْ',
      '2fp': 'تَوَأَّدْتُنَّ',
      '3mp': 'تَوَأَّدُوا',
      '3fp': 'تَوَأَّدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("w'd-5")!, 'indicative')).toEqualT({
      '1s': 'أَتَوَأَّدُ',
      '2ms': 'تَتَوَأَّدُ',
      '2fs': 'تَتَوَأَّدِينَ',
      '3ms': 'يَتَوَأَّدُ',
      '3fs': 'تَتَوَأَّدُ',
      '2d': 'تَتَوَأَّدَانِ',
      '3md': 'يَتَوَأَّدَانِ',
      '3fd': 'تَتَوَأَّدَانِ',
      '1p': 'نَتَوَأَّدُ',
      '2mp': 'تَتَوَأَّدُونَ',
      '2fp': 'تَتَوَأَّدْنَ',
      '3mp': 'يَتَوَأَّدُونَ',
      '3fp': 'يَتَوَأَّدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("w'd-5")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَوَأَّدَ',
      '2ms': 'تَتَوَأَّدَ',
      '2fs': 'تَتَوَأَّدِي',
      '3ms': 'يَتَوَأَّدَ',
      '3fs': 'تَتَوَأَّدَ',
      '2d': 'تَتَوَأَّدَا',
      '3md': 'يَتَوَأَّدَا',
      '3fd': 'تَتَوَأَّدَا',
      '1p': 'نَتَوَأَّدَ',
      '2mp': 'تَتَوَأَّدُوا',
      '2fp': 'تَتَوَأَّدْنَ',
      '3mp': 'يَتَوَأَّدُوا',
      '3fp': 'يَتَوَأَّدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("w'd-5")!, 'jussive')).toEqualT({
      '1s': 'أَتَوَأَّدْ',
      '2ms': 'تَتَوَأَّدْ',
      '2fs': 'تَتَوَأَّدِي',
      '3ms': 'يَتَوَأَّدْ',
      '3fs': 'تَتَوَأَّدْ',
      '2d': 'تَتَوَأَّدَا',
      '3md': 'يَتَوَأَّدَا',
      '3fd': 'تَتَوَأَّدَا',
      '1p': 'نَتَوَأَّدْ',
      '2mp': 'تَتَوَأَّدُوا',
      '2fp': 'تَتَوَأَّدْنَ',
      '3mp': 'يَتَوَأَّدُوا',
      '3fp': 'يَتَوَأَّدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("w'd-5")!)).toMatchObjectT({
      '2ms': 'تَوَأَّدْ',
      '2fs': 'تَوَأَّدِي',
      '2d': 'تَوَأَّدَا',
      '2mp': 'تَوَأَّدُوا',
      '2fp': 'تَوَأَّدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("w'd-5")!)).toEqualT('مُتَوَئِّد')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("w'd-5")!))).toEqualT(new Set(['تَوَؤُّد']))
  })
})
