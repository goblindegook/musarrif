import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("'kl-6 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'kl-6")!)).toEqualT({
      '1s': 'تَآكَلْتُ',
      '2ms': 'تَآكَلْتَ',
      '2fs': 'تَآكَلْتِ',
      '3ms': 'تَآكَلَ',
      '3fs': 'تَآكَلَتْ',
      '2d': 'تَآكَلْتُمَا',
      '3md': 'تَآكَلَا',
      '3fd': 'تَآكَلَتَا',
      '1p': 'تَآكَلْنَا',
      '2mp': 'تَآكَلْتُمْ',
      '2fp': 'تَآكَلْتُنَّ',
      '3mp': 'تَآكَلُوا',
      '3fp': 'تَآكَلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'kl-6")!, 'indicative')).toEqualT({
      '1s': 'أَتَآكَلُ',
      '2ms': 'تَتَآكَلُ',
      '2fs': 'تَتَآكَلِينَ',
      '3ms': 'يَتَآكَلُ',
      '3fs': 'تَتَآكَلُ',
      '2d': 'تَتَآكَلَانِ',
      '3md': 'يَتَآكَلَانِ',
      '3fd': 'تَتَآكَلَانِ',
      '1p': 'نَتَآكَلُ',
      '2mp': 'تَتَآكَلُونَ',
      '2fp': 'تَتَآكَلْنَ',
      '3mp': 'يَتَآكَلُونَ',
      '3fp': 'يَتَآكَلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'kl-6")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَآكَلَ',
      '2ms': 'تَتَآكَلَ',
      '2fs': 'تَتَآكَلِي',
      '3ms': 'يَتَآكَلَ',
      '3fs': 'تَتَآكَلَ',
      '2d': 'تَتَآكَلَا',
      '3md': 'يَتَآكَلَا',
      '3fd': 'تَتَآكَلَا',
      '1p': 'نَتَآكَلَ',
      '2mp': 'تَتَآكَلُوا',
      '2fp': 'تَتَآكَلْنَ',
      '3mp': 'يَتَآكَلُوا',
      '3fp': 'يَتَآكَلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'kl-6")!, 'jussive')).toEqualT({
      '1s': 'أَتَآكَلْ',
      '2ms': 'تَتَآكَلْ',
      '2fs': 'تَتَآكَلِي',
      '3ms': 'يَتَآكَلْ',
      '3fs': 'تَتَآكَلْ',
      '2d': 'تَتَآكَلَا',
      '3md': 'يَتَآكَلَا',
      '3fd': 'تَتَآكَلَا',
      '1p': 'نَتَآكَلْ',
      '2mp': 'تَتَآكَلُوا',
      '2fp': 'تَتَآكَلْنَ',
      '3mp': 'يَتَآكَلُوا',
      '3fp': 'يَتَآكَلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'kl-6")!)).toMatchObjectT({
      '2ms': 'تَآكَلْ',
      '2fs': 'تَآكَلِي',
      '2d': 'تَآكَلَا',
      '2mp': 'تَآكَلُوا',
      '2fp': 'تَآكَلْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'kl-6")!)).toEqualT('مُتَآكِل')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'kl-6")!))).toEqualT(new Set(['تَآكُل']))
  })
})
