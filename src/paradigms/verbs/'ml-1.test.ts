import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle-active'
import { derivePassiveParticiple } from '../nominal/participle-passive'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'ml-1", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'ml-1")!)).toEqualT({
      '1s': 'أَمَلْتُ',
      '2ms': 'أَمَلْتَ',
      '2fs': 'أَمَلْتِ',
      '3ms': 'أَمَلَ',
      '3fs': 'أَمَلَتْ',
      '2d': 'أَمَلْتُمَا',
      '3md': 'أَمَلَا',
      '3fd': 'أَمَلَتَا',
      '1p': 'أَمَلْنَا',
      '2mp': 'أَمَلْتُمْ',
      '2fp': 'أَمَلْتُنَّ',
      '3mp': 'أَمَلُوا',
      '3fp': 'أَمَلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'ml-1")!, 'indicative')).toEqualT({
      '1s': 'آمُلُ',
      '2ms': 'تَأْمُلُ',
      '2fs': 'تَأْمُلِينَ',
      '3ms': 'يَأْمُلُ',
      '3fs': 'تَأْمُلُ',
      '2d': 'تَأْمُلَانِ',
      '3md': 'يَأْمُلَانِ',
      '3fd': 'تَأْمُلَانِ',
      '1p': 'نَأْمُلُ',
      '2mp': 'تَأْمُلُونَ',
      '2fp': 'تَأْمُلْنَ',
      '3mp': 'يَأْمُلُونَ',
      '3fp': 'يَأْمُلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'ml-1")!, 'subjunctive')).toEqualT({
      '1s': 'آمُلَ',
      '2ms': 'تَأْمُلَ',
      '2fs': 'تَأْمُلِي',
      '3ms': 'يَأْمُلَ',
      '3fs': 'تَأْمُلَ',
      '2d': 'تَأْمُلَا',
      '3md': 'يَأْمُلَا',
      '3fd': 'تَأْمُلَا',
      '1p': 'نَأْمُلَ',
      '2mp': 'تَأْمُلُوا',
      '2fp': 'تَأْمُلْنَ',
      '3mp': 'يَأْمُلُوا',
      '3fp': 'يَأْمُلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'ml-1")!, 'jussive')).toEqualT({
      '1s': 'آمُلْ',
      '2ms': 'تَأْمُلْ',
      '2fs': 'تَأْمُلِي',
      '3ms': 'يَأْمُلْ',
      '3fs': 'تَأْمُلْ',
      '2d': 'تَأْمُلَا',
      '3md': 'يَأْمُلَا',
      '3fd': 'تَأْمُلَا',
      '1p': 'نَأْمُلْ',
      '2mp': 'تَأْمُلُوا',
      '2fp': 'تَأْمُلْنَ',
      '3mp': 'يَأْمُلُوا',
      '3fp': 'يَأْمُلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'ml-1")!)).toMatchObjectT({
      '2ms': 'اُؤْمُلْ',
      '2fs': 'اُؤْمُلِي',
      '2d': 'اُؤْمُلَا',
      '2mp': 'اُؤْمُلُوا',
      '2fp': 'اُؤْمُلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'ml-1")!)).toEqualT({
      '1s': 'أُمِلْتُ',
      '2ms': 'أُمِلْتَ',
      '2fs': 'أُمِلْتِ',
      '3ms': 'أُمِلَ',
      '3fs': 'أُمِلَتْ',
      '2d': 'أُمِلْتُمَا',
      '3md': 'أُمِلَا',
      '3fd': 'أُمِلَتَا',
      '1p': 'أُمِلْنَا',
      '2mp': 'أُمِلْتُمْ',
      '2fp': 'أُمِلْتُنَّ',
      '3mp': 'أُمِلُوا',
      '3fp': 'أُمِلْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'ml-1")!, 'indicative')).toEqualT({
      '1s': 'أُومَلُ',
      '2ms': 'تُؤْمَلُ',
      '2fs': 'تُؤْمَلِينَ',
      '3ms': 'يُؤْمَلُ',
      '3fs': 'تُؤْمَلُ',
      '2d': 'تُؤْمَلَانِ',
      '3md': 'يُؤْمَلَانِ',
      '3fd': 'تُؤْمَلَانِ',
      '1p': 'نُؤْمَلُ',
      '2mp': 'تُؤْمَلُونَ',
      '2fp': 'تُؤْمَلْنَ',
      '3mp': 'يُؤْمَلُونَ',
      '3fp': 'يُؤْمَلْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'ml-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُومَلَ',
      '2ms': 'تُؤْمَلَ',
      '2fs': 'تُؤْمَلِي',
      '3ms': 'يُؤْمَلَ',
      '3fs': 'تُؤْمَلَ',
      '2d': 'تُؤْمَلَا',
      '3md': 'يُؤْمَلَا',
      '3fd': 'تُؤْمَلَا',
      '1p': 'نُؤْمَلَ',
      '2mp': 'تُؤْمَلُوا',
      '2fp': 'تُؤْمَلْنَ',
      '3mp': 'يُؤْمَلُوا',
      '3fp': 'يُؤْمَلْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'ml-1")!, 'jussive')).toEqualT({
      '1s': 'أُومَلْ',
      '2ms': 'تُؤْمَلْ',
      '2fs': 'تُؤْمَلِي',
      '3ms': 'يُؤْمَلْ',
      '3fs': 'تُؤْمَلْ',
      '2d': 'تُؤْمَلَا',
      '3md': 'يُؤْمَلَا',
      '3fd': 'تُؤْمَلَا',
      '1p': 'نُؤْمَلْ',
      '2mp': 'تُؤْمَلُوا',
      '2fp': 'تُؤْمَلْنَ',
      '3mp': 'يُؤْمَلُوا',
      '3fp': 'يُؤْمَلْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'ml-1")!)).toEqualT('آمِل')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'ml-1")!)).toEqualT('مَأْمُول')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("'ml-1")!)).toEqualT(['أَمَل'])
  })
})
