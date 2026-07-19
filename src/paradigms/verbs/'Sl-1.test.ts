import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("'Sl-1", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'Sl-1")!)).toEqualT({
      '1s': 'أَصُلْتُ',
      '2ms': 'أَصُلْتَ',
      '2fs': 'أَصُلْتِ',
      '3ms': 'أَصُلَ',
      '3fs': 'أَصُلَتْ',
      '2d': 'أَصُلْتُمَا',
      '3md': 'أَصُلَا',
      '3fd': 'أَصُلَتَا',
      '1p': 'أَصُلْنَا',
      '2mp': 'أَصُلْتُمْ',
      '2fp': 'أَصُلْتُنَّ',
      '3mp': 'أَصُلُوا',
      '3fp': 'أَصُلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'Sl-1")!, 'indicative')).toEqualT({
      '1s': 'آصُلُ',
      '2ms': 'تَأْصُلُ',
      '2fs': 'تَأْصُلِينَ',
      '3ms': 'يَأْصُلُ',
      '3fs': 'تَأْصُلُ',
      '2d': 'تَأْصُلَانِ',
      '3md': 'يَأْصُلَانِ',
      '3fd': 'تَأْصُلَانِ',
      '1p': 'نَأْصُلُ',
      '2mp': 'تَأْصُلُونَ',
      '2fp': 'تَأْصُلْنَ',
      '3mp': 'يَأْصُلُونَ',
      '3fp': 'يَأْصُلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'Sl-1")!, 'subjunctive')).toEqualT({
      '1s': 'آصُلَ',
      '2ms': 'تَأْصُلَ',
      '2fs': 'تَأْصُلِي',
      '3ms': 'يَأْصُلَ',
      '3fs': 'تَأْصُلَ',
      '2d': 'تَأْصُلَا',
      '3md': 'يَأْصُلَا',
      '3fd': 'تَأْصُلَا',
      '1p': 'نَأْصُلَ',
      '2mp': 'تَأْصُلُوا',
      '2fp': 'تَأْصُلْنَ',
      '3mp': 'يَأْصُلُوا',
      '3fp': 'يَأْصُلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'Sl-1")!, 'jussive')).toEqualT({
      '1s': 'آصُلْ',
      '2ms': 'تَأْصُلْ',
      '2fs': 'تَأْصُلِي',
      '3ms': 'يَأْصُلْ',
      '3fs': 'تَأْصُلْ',
      '2d': 'تَأْصُلَا',
      '3md': 'يَأْصُلَا',
      '3fd': 'تَأْصُلَا',
      '1p': 'نَأْصُلْ',
      '2mp': 'تَأْصُلُوا',
      '2fp': 'تَأْصُلْنَ',
      '3mp': 'يَأْصُلُوا',
      '3fp': 'يَأْصُلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'Sl-1")!)).toMatchObjectT({
      '2ms': 'اُؤْصُلْ',
      '2fs': 'اُؤْصُلِي',
      '2d': 'اُؤْصُلَا',
      '2mp': 'اُؤْصُلُوا',
      '2fp': 'اُؤْصُلْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'Sl-1")!)).toEqualT('أَصِيل')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("'Sl-1")!)).toEqualT(['أَصَالَة'])
  })
})
