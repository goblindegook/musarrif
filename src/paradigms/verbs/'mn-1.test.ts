import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'mn-1", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'mn-1")!)).toEqualT({
      '1s': 'أَمِنْتُ',
      '2ms': 'أَمِنْتَ',
      '2fs': 'أَمِنْتِ',
      '3ms': 'أَمِنَ',
      '3fs': 'أَمِنَتْ',
      '2d': 'أَمِنْتُمَا',
      '3md': 'أَمِنَا',
      '3fd': 'أَمِنَتَا',
      '1p': 'أَمِنَّا',
      '2mp': 'أَمِنْتُمْ',
      '2fp': 'أَمِنْتُنَّ',
      '3mp': 'أَمِنُوا',
      '3fp': 'أَمِنَّ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'mn-1")!, 'indicative')).toEqualT({
      '1s': 'آمَنُ',
      '2ms': 'تَأْمَنُ',
      '2fs': 'تَأْمَنِينَ',
      '3ms': 'يَأْمَنُ',
      '3fs': 'تَأْمَنُ',
      '2d': 'تَأْمَنَانِ',
      '3md': 'يَأْمَنَانِ',
      '3fd': 'تَأْمَنَانِ',
      '1p': 'نَأْمَنُ',
      '2mp': 'تَأْمَنُونَ',
      '2fp': 'تَأْمَنَّ',
      '3mp': 'يَأْمَنُونَ',
      '3fp': 'يَأْمَنَّ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'mn-1")!, 'subjunctive')).toEqualT({
      '1s': 'آمَنَ',
      '2ms': 'تَأْمَنَ',
      '2fs': 'تَأْمَنِي',
      '3ms': 'يَأْمَنَ',
      '3fs': 'تَأْمَنَ',
      '2d': 'تَأْمَنَا',
      '3md': 'يَأْمَنَا',
      '3fd': 'تَأْمَنَا',
      '1p': 'نَأْمَنَ',
      '2mp': 'تَأْمَنُوا',
      '2fp': 'تَأْمَنَّ',
      '3mp': 'يَأْمَنُوا',
      '3fp': 'يَأْمَنَّ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'mn-1")!, 'jussive')).toEqualT({
      '1s': 'آمَنْ',
      '2ms': 'تَأْمَنْ',
      '2fs': 'تَأْمَنِي',
      '3ms': 'يَأْمَنْ',
      '3fs': 'تَأْمَنْ',
      '2d': 'تَأْمَنَا',
      '3md': 'يَأْمَنَا',
      '3fd': 'تَأْمَنَا',
      '1p': 'نَأْمَنْ',
      '2mp': 'تَأْمَنُوا',
      '2fp': 'تَأْمَنَّ',
      '3mp': 'يَأْمَنُوا',
      '3fp': 'يَأْمَنَّ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'mn-1")!)).toMatchObjectT({
      '2ms': 'اِئْمَنْ',
      '2fs': 'اِئْمَنِي',
      '2d': 'اِئْمَنَا',
      '2mp': 'اِئْمَنُوا',
      '2fp': 'اِئْمَنَّ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'mn-1")!)).toEqualT({
      '1s': 'أُمِنْتُ',
      '2ms': 'أُمِنْتَ',
      '2fs': 'أُمِنْتِ',
      '3ms': 'أُمِنَ',
      '3fs': 'أُمِنَتْ',
      '2d': 'أُمِنْتُمَا',
      '3md': 'أُمِنَا',
      '3fd': 'أُمِنَتَا',
      '1p': 'أُمِنَّا',
      '2mp': 'أُمِنْتُمْ',
      '2fp': 'أُمِنْتُنَّ',
      '3mp': 'أُمِنُوا',
      '3fp': 'أُمِنَّ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mn-1")!, 'indicative')).toEqualT({
      '1s': 'أُومَنُ',
      '2ms': 'تُؤْمَنُ',
      '2fs': 'تُؤْمَنِينَ',
      '3ms': 'يُؤْمَنُ',
      '3fs': 'تُؤْمَنُ',
      '2d': 'تُؤْمَنَانِ',
      '3md': 'يُؤْمَنَانِ',
      '3fd': 'تُؤْمَنَانِ',
      '1p': 'نُؤْمَنُ',
      '2mp': 'تُؤْمَنُونَ',
      '2fp': 'تُؤْمَنَّ',
      '3mp': 'يُؤْمَنُونَ',
      '3fp': 'يُؤْمَنَّ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mn-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُومَنَ',
      '2ms': 'تُؤْمَنَ',
      '2fs': 'تُؤْمَنِي',
      '3ms': 'يُؤْمَنَ',
      '3fs': 'تُؤْمَنَ',
      '2d': 'تُؤْمَنَا',
      '3md': 'يُؤْمَنَا',
      '3fd': 'تُؤْمَنَا',
      '1p': 'نُؤْمَنَ',
      '2mp': 'تُؤْمَنُوا',
      '2fp': 'تُؤْمَنَّ',
      '3mp': 'يُؤْمَنُوا',
      '3fp': 'يُؤْمَنَّ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mn-1")!, 'jussive')).toEqualT({
      '1s': 'أُومَنْ',
      '2ms': 'تُؤْمَنْ',
      '2fs': 'تُؤْمَنِي',
      '3ms': 'يُؤْمَنْ',
      '3fs': 'تُؤْمَنْ',
      '2d': 'تُؤْمَنَا',
      '3md': 'يُؤْمَنَا',
      '3fd': 'تُؤْمَنَا',
      '1p': 'نُؤْمَنْ',
      '2mp': 'تُؤْمَنُوا',
      '2fp': 'تُؤْمَنَّ',
      '3mp': 'يُؤْمَنُوا',
      '3fp': 'يُؤْمَنَّ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'mn-1")!)).toEqualT('آمِن')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'mn-1")!)).toEqualT('مَأْمُون')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("'mn-1")!)).toEqualT(['أَمْن', 'أَمَان'])
  })
})
