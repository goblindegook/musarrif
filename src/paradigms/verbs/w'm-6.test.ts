import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("w'm-6 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("w'm-6")!)).toEqualT({
      '1s': 'تَوَاءَمْتُ',
      '2ms': 'تَوَاءَمْتَ',
      '2fs': 'تَوَاءَمْتِ',
      '3ms': 'تَوَاءَمَ',
      '3fs': 'تَوَاءَمَتْ',
      '2d': 'تَوَاءَمْتُمَا',
      '3md': 'تَوَاءَمَا',
      '3fd': 'تَوَاءَمَتَا',
      '1p': 'تَوَاءَمْنَا',
      '2mp': 'تَوَاءَمْتُمْ',
      '2fp': 'تَوَاءَمْتُنَّ',
      '3mp': 'تَوَاءَمُوا',
      '3fp': 'تَوَاءَمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("w'm-6")!, 'indicative')).toEqualT({
      '1s': 'أَتَوَاءَمُ',
      '2ms': 'تَتَوَاءَمُ',
      '2fs': 'تَتَوَاءَمِينَ',
      '3ms': 'يَتَوَاءَمُ',
      '3fs': 'تَتَوَاءَمُ',
      '2d': 'تَتَوَاءَمَانِ',
      '3md': 'يَتَوَاءَمَانِ',
      '3fd': 'تَتَوَاءَمَانِ',
      '1p': 'نَتَوَاءَمُ',
      '2mp': 'تَتَوَاءَمُونَ',
      '2fp': 'تَتَوَاءَمْنَ',
      '3mp': 'يَتَوَاءَمُونَ',
      '3fp': 'يَتَوَاءَمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("w'm-6")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَوَاءَمَ',
      '2ms': 'تَتَوَاءَمَ',
      '2fs': 'تَتَوَاءَمِي',
      '3ms': 'يَتَوَاءَمَ',
      '3fs': 'تَتَوَاءَمَ',
      '2d': 'تَتَوَاءَمَا',
      '3md': 'يَتَوَاءَمَا',
      '3fd': 'تَتَوَاءَمَا',
      '1p': 'نَتَوَاءَمَ',
      '2mp': 'تَتَوَاءَمُوا',
      '2fp': 'تَتَوَاءَمْنَ',
      '3mp': 'يَتَوَاءَمُوا',
      '3fp': 'يَتَوَاءَمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("w'm-6")!, 'jussive')).toEqualT({
      '1s': 'أَتَوَاءَمْ',
      '2ms': 'تَتَوَاءَمْ',
      '2fs': 'تَتَوَاءَمِي',
      '3ms': 'يَتَوَاءَمْ',
      '3fs': 'تَتَوَاءَمْ',
      '2d': 'تَتَوَاءَمَا',
      '3md': 'يَتَوَاءَمَا',
      '3fd': 'تَتَوَاءَمَا',
      '1p': 'نَتَوَاءَمْ',
      '2mp': 'تَتَوَاءَمُوا',
      '2fp': 'تَتَوَاءَمْنَ',
      '3mp': 'يَتَوَاءَمُوا',
      '3fp': 'يَتَوَاءَمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("w'm-6")!)).toMatchObjectT({
      '2ms': 'تَوَاءَمْ',
      '2fs': 'تَوَاءَمِي',
      '2d': 'تَوَاءَمَا',
      '2mp': 'تَوَاءَمُوا',
      '2fp': 'تَوَاءَمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("w'm-6")!)).toEqualT('مُتَوَائِم')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("w'm-6")!))).toEqualT(new Set(['تَوَاؤُم']))
  })
})
