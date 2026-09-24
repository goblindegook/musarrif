import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'hl-1-a-a (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'hl-1-a-a")!)).toEqualT({
      '1s': expect.toBeOneOf(['أَهِلْتُ', 'أَهَلْتُ']),
      '2ms': expect.toBeOneOf(['أَهِلْتَ', 'أَهَلْتَ']),
      '2fs': expect.toBeOneOf(['أَهِلْتِ', 'أَهَلْتِ']),
      '3ms': expect.toBeOneOf(['أَهِلَ', 'أَهَلَ']),
      '3fs': expect.toBeOneOf(['أَهِلَتْ', 'أَهَلَتْ']),
      '2d': expect.toBeOneOf(['أَهِلْتُمَا', 'أَهَلْتُمَا']),
      '3md': expect.toBeOneOf(['أَهِلَا', 'أَهَلَا']),
      '3fd': expect.toBeOneOf(['أَهِلَتَا', 'أَهَلَتَا']),
      '1p': expect.toBeOneOf(['أَهِلْنَا', 'أَهَلْنَا']),
      '2mp': expect.toBeOneOf(['أَهِلْتُمْ', 'أَهَلْتُمْ']),
      '2fp': expect.toBeOneOf(['أَهِلْتُنَّ', 'أَهَلْتُنَّ']),
      '3mp': expect.toBeOneOf(['أَهِلُوا', 'أَهَلُوا']),
      '3fp': expect.toBeOneOf(['أَهِلْنَ', 'أَهَلْنَ']),
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'hl-1-a-a")!, 'indicative')).toEqualT({
      '1s': 'آهَلُ',
      '2ms': 'تَأْهَلُ',
      '2fs': 'تَأْهَلِينَ',
      '3ms': 'يَأْهَلُ',
      '3fs': 'تَأْهَلُ',
      '2d': 'تَأْهَلَانِ',
      '3md': 'يَأْهَلَانِ',
      '3fd': 'تَأْهَلَانِ',
      '1p': 'نَأْهَلُ',
      '2mp': 'تَأْهَلُونَ',
      '2fp': 'تَأْهَلْنَ',
      '3mp': 'يَأْهَلُونَ',
      '3fp': 'يَأْهَلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'hl-1-a-a")!, 'subjunctive')).toEqualT({
      '1s': 'آهَلَ',
      '2ms': 'تَأْهَلَ',
      '2fs': 'تَأْهَلِي',
      '3ms': 'يَأْهَلَ',
      '3fs': 'تَأْهَلَ',
      '2d': 'تَأْهَلَا',
      '3md': 'يَأْهَلَا',
      '3fd': 'تَأْهَلَا',
      '1p': 'نَأْهَلَ',
      '2mp': 'تَأْهَلُوا',
      '2fp': 'تَأْهَلْنَ',
      '3mp': 'يَأْهَلُوا',
      '3fp': 'يَأْهَلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'hl-1-a-a")!, 'jussive')).toEqualT({
      '1s': 'آهَلْ',
      '2ms': 'تَأْهَلْ',
      '2fs': 'تَأْهَلِي',
      '3ms': 'يَأْهَلْ',
      '3fs': 'تَأْهَلْ',
      '2d': 'تَأْهَلَا',
      '3md': 'يَأْهَلَا',
      '3fd': 'تَأْهَلَا',
      '1p': 'نَأْهَلْ',
      '2mp': 'تَأْهَلُوا',
      '2fp': 'تَأْهَلْنَ',
      '3mp': 'يَأْهَلُوا',
      '3fp': 'يَأْهَلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'hl-1-a-a")!)).toMatchObjectT({
      '2ms': 'اِئْهَلْ',
      '2fs': 'اِئْهَلِي',
      '2d': 'اِئْهَلَا',
      '2mp': 'اِئْهَلُوا',
      '2fp': 'اِئْهَلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'hl-1-a-a")!)).toEqualT({
      '1s': 'أُهِلْتُ',
      '2ms': 'أُهِلْتَ',
      '2fs': 'أُهِلْتِ',
      '3ms': 'أُهِلَ',
      '3fs': 'أُهِلَتْ',
      '2d': 'أُهِلْتُمَا',
      '3md': 'أُهِلَا',
      '3fd': 'أُهِلَتَا',
      '1p': 'أُهِلْنَا',
      '2mp': 'أُهِلْتُمْ',
      '2fp': 'أُهِلْتُنَّ',
      '3mp': 'أُهِلُوا',
      '3fp': 'أُهِلْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'hl-1-a-a")!, 'indicative')).toEqualT({
      '1s': 'أُوهَلُ',
      '2ms': 'تُؤْهَلُ',
      '2fs': 'تُؤْهَلِينَ',
      '3ms': 'يُؤْهَلُ',
      '3fs': 'تُؤْهَلُ',
      '2d': 'تُؤْهَلَانِ',
      '3md': 'يُؤْهَلَانِ',
      '3fd': 'تُؤْهَلَانِ',
      '1p': 'نُؤْهَلُ',
      '2mp': 'تُؤْهَلُونَ',
      '2fp': 'تُؤْهَلْنَ',
      '3mp': 'يُؤْهَلُونَ',
      '3fp': 'يُؤْهَلْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'hl-1-a-a")!, 'subjunctive')).toEqualT({
      '1s': 'أُوهَلَ',
      '2ms': 'تُؤْهَلَ',
      '2fs': 'تُؤْهَلِي',
      '3ms': 'يُؤْهَلَ',
      '3fs': 'تُؤْهَلَ',
      '2d': 'تُؤْهَلَا',
      '3md': 'يُؤْهَلَا',
      '3fd': 'تُؤْهَلَا',
      '1p': 'نُؤْهَلَ',
      '2mp': 'تُؤْهَلُوا',
      '2fp': 'تُؤْهَلْنَ',
      '3mp': 'يُؤْهَلُوا',
      '3fp': 'يُؤْهَلْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'hl-1-a-a")!, 'jussive')).toEqualT({
      '1s': 'أُوهَلْ',
      '2ms': 'تُؤْهَلْ',
      '2fs': 'تُؤْهَلِي',
      '3ms': 'يُؤْهَلْ',
      '3fs': 'تُؤْهَلْ',
      '2d': 'تُؤْهَلَا',
      '3md': 'يُؤْهَلَا',
      '3fd': 'تُؤْهَلَا',
      '1p': 'نُؤْهَلْ',
      '2mp': 'تُؤْهَلُوا',
      '2fp': 'تُؤْهَلْنَ',
      '3mp': 'يُؤْهَلُوا',
      '3fp': 'يُؤْهَلْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'hl-1-a-a")!)).toEqualT('أَهِل')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'hl-1-a-a")!)).toEqualT('مَأْهُول')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'hl-1-a-a")!))).toEqualT(new Set(['أَهَل']))
  })
})
