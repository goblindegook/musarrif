import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'mr-1", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'mr-1")!)).toEqualT({
      '1s': 'أَمَرْتُ',
      '2ms': 'أَمَرْتَ',
      '2fs': 'أَمَرْتِ',
      '3ms': 'أَمَرَ',
      '3fs': 'أَمَرَتْ',
      '2d': 'أَمَرْتُمَا',
      '3md': 'أَمَرَا',
      '3fd': 'أَمَرَتَا',
      '1p': 'أَمَرْنَا',
      '2mp': 'أَمَرْتُمْ',
      '2fp': 'أَمَرْتُنَّ',
      '3mp': 'أَمَرُوا',
      '3fp': 'أَمَرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'mr-1")!, 'indicative')).toEqualT({
      '1s': 'آمُرُ',
      '2ms': 'تَأْمُرُ',
      '2fs': 'تَأْمُرِينَ',
      '3ms': 'يَأْمُرُ',
      '3fs': 'تَأْمُرُ',
      '2d': 'تَأْمُرَانِ',
      '3md': 'يَأْمُرَانِ',
      '3fd': 'تَأْمُرَانِ',
      '1p': 'نَأْمُرُ',
      '2mp': 'تَأْمُرُونَ',
      '2fp': 'تَأْمُرْنَ',
      '3mp': 'يَأْمُرُونَ',
      '3fp': 'يَأْمُرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'mr-1")!, 'subjunctive')).toEqualT({
      '1s': 'آمُرَ',
      '2ms': 'تَأْمُرَ',
      '2fs': 'تَأْمُرِي',
      '3ms': 'يَأْمُرَ',
      '3fs': 'تَأْمُرَ',
      '2d': 'تَأْمُرَا',
      '3md': 'يَأْمُرَا',
      '3fd': 'تَأْمُرَا',
      '1p': 'نَأْمُرَ',
      '2mp': 'تَأْمُرُوا',
      '2fp': 'تَأْمُرْنَ',
      '3mp': 'يَأْمُرُوا',
      '3fp': 'يَأْمُرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'mr-1")!, 'jussive')).toEqualT({
      '1s': 'آمُرْ',
      '2ms': 'تَأْمُرْ',
      '2fs': 'تَأْمُرِي',
      '3ms': 'يَأْمُرْ',
      '3fs': 'تَأْمُرْ',
      '2d': 'تَأْمُرَا',
      '3md': 'يَأْمُرَا',
      '3fd': 'تَأْمُرَا',
      '1p': 'نَأْمُرْ',
      '2mp': 'تَأْمُرُوا',
      '2fp': 'تَأْمُرْنَ',
      '3mp': 'يَأْمُرُوا',
      '3fp': 'يَأْمُرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'mr-1")!)).toMatchObjectT({
      '2ms': 'مُرْ',
      '2fs': 'مُرِي',
      '2d': 'مُرَا',
      '2mp': 'مُرُوا',
      '2fp': 'مُرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'mr-1")!)).toEqualT({
      '1s': 'أُمِرْتُ',
      '2ms': 'أُمِرْتَ',
      '2fs': 'أُمِرْتِ',
      '3ms': 'أُمِرَ',
      '3fs': 'أُمِرَتْ',
      '2d': 'أُمِرْتُمَا',
      '3md': 'أُمِرَا',
      '3fd': 'أُمِرَتَا',
      '1p': 'أُمِرْنَا',
      '2mp': 'أُمِرْتُمْ',
      '2fp': 'أُمِرْتُنَّ',
      '3mp': 'أُمِرُوا',
      '3fp': 'أُمِرْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mr-1")!, 'indicative')).toEqualT({
      '1s': 'أُومَرُ',
      '2ms': 'تُؤْمَرُ',
      '2fs': 'تُؤْمَرِينَ',
      '3ms': 'يُؤْمَرُ',
      '3fs': 'تُؤْمَرُ',
      '2d': 'تُؤْمَرَانِ',
      '3md': 'يُؤْمَرَانِ',
      '3fd': 'تُؤْمَرَانِ',
      '1p': 'نُؤْمَرُ',
      '2mp': 'تُؤْمَرُونَ',
      '2fp': 'تُؤْمَرْنَ',
      '3mp': 'يُؤْمَرُونَ',
      '3fp': 'يُؤْمَرْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mr-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُومَرَ',
      '2ms': 'تُؤْمَرَ',
      '2fs': 'تُؤْمَرِي',
      '3ms': 'يُؤْمَرَ',
      '3fs': 'تُؤْمَرَ',
      '2d': 'تُؤْمَرَا',
      '3md': 'يُؤْمَرَا',
      '3fd': 'تُؤْمَرَا',
      '1p': 'نُؤْمَرَ',
      '2mp': 'تُؤْمَرُوا',
      '2fp': 'تُؤْمَرْنَ',
      '3mp': 'يُؤْمَرُوا',
      '3fp': 'يُؤْمَرْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mr-1")!, 'jussive')).toEqualT({
      '1s': 'أُومَرْ',
      '2ms': 'تُؤْمَرْ',
      '2fs': 'تُؤْمَرِي',
      '3ms': 'يُؤْمَرْ',
      '3fs': 'تُؤْمَرْ',
      '2d': 'تُؤْمَرَا',
      '3md': 'يُؤْمَرَا',
      '3fd': 'تُؤْمَرَا',
      '1p': 'نُؤْمَرْ',
      '2mp': 'تُؤْمَرُوا',
      '2fp': 'تُؤْمَرْنَ',
      '3mp': 'يُؤْمَرُوا',
      '3fp': 'يُؤْمَرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'mr-1")!)).toEqualT('آمِر')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'mr-1")!)).toEqualT('مَأْمُور')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("'mr-1")!)).toEqualT(['أَمْر'])
  })
})
