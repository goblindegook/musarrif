import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'sr-1", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'sr-1")!)).toEqualT({
      '1s': 'أَسَرْتُ',
      '2ms': 'أَسَرْتَ',
      '2fs': 'أَسَرْتِ',
      '3ms': 'أَسَرَ',
      '3fs': 'أَسَرَتْ',
      '2d': 'أَسَرْتُمَا',
      '3md': 'أَسَرَا',
      '3fd': 'أَسَرَتَا',
      '1p': 'أَسَرْنَا',
      '2mp': 'أَسَرْتُمْ',
      '2fp': 'أَسَرْتُنَّ',
      '3mp': 'أَسَرُوا',
      '3fp': 'أَسَرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'sr-1")!, 'indicative')).toEqualT({
      '1s': 'آسِرُ',
      '2ms': 'تَأْسِرُ',
      '2fs': 'تَأْسِرِينَ',
      '3ms': 'يَأْسِرُ',
      '3fs': 'تَأْسِرُ',
      '2d': 'تَأْسِرَانِ',
      '3md': 'يَأْسِرَانِ',
      '3fd': 'تَأْسِرَانِ',
      '1p': 'نَأْسِرُ',
      '2mp': 'تَأْسِرُونَ',
      '2fp': 'تَأْسِرْنَ',
      '3mp': 'يَأْسِرُونَ',
      '3fp': 'يَأْسِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'sr-1")!, 'subjunctive')).toEqualT({
      '1s': 'آسِرَ',
      '2ms': 'تَأْسِرَ',
      '2fs': 'تَأْسِرِي',
      '3ms': 'يَأْسِرَ',
      '3fs': 'تَأْسِرَ',
      '2d': 'تَأْسِرَا',
      '3md': 'يَأْسِرَا',
      '3fd': 'تَأْسِرَا',
      '1p': 'نَأْسِرَ',
      '2mp': 'تَأْسِرُوا',
      '2fp': 'تَأْسِرْنَ',
      '3mp': 'يَأْسِرُوا',
      '3fp': 'يَأْسِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'sr-1")!, 'jussive')).toEqualT({
      '1s': 'آسِرْ',
      '2ms': 'تَأْسِرْ',
      '2fs': 'تَأْسِرِي',
      '3ms': 'يَأْسِرْ',
      '3fs': 'تَأْسِرْ',
      '2d': 'تَأْسِرَا',
      '3md': 'يَأْسِرَا',
      '3fd': 'تَأْسِرَا',
      '1p': 'نَأْسِرْ',
      '2mp': 'تَأْسِرُوا',
      '2fp': 'تَأْسِرْنَ',
      '3mp': 'يَأْسِرُوا',
      '3fp': 'يَأْسِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'sr-1")!)).toMatchObjectT({
      '2ms': 'اِئْسِرْ',
      '2fs': 'اِئْسِرِي',
      '2d': 'اِئْسِرَا',
      '2mp': 'اِئْسِرُوا',
      '2fp': 'اِئْسِرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'sr-1")!)).toEqualT({
      '1s': 'أُسِرْتُ',
      '2ms': 'أُسِرْتَ',
      '2fs': 'أُسِرْتِ',
      '3ms': 'أُسِرَ',
      '3fs': 'أُسِرَتْ',
      '2d': 'أُسِرْتُمَا',
      '3md': 'أُسِرَا',
      '3fd': 'أُسِرَتَا',
      '1p': 'أُسِرْنَا',
      '2mp': 'أُسِرْتُمْ',
      '2fp': 'أُسِرْتُنَّ',
      '3mp': 'أُسِرُوا',
      '3fp': 'أُسِرْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'sr-1")!, 'indicative')).toEqualT({
      '1s': 'أُوسَرُ',
      '2ms': 'تُؤْسَرُ',
      '2fs': 'تُؤْسَرِينَ',
      '3ms': 'يُؤْسَرُ',
      '3fs': 'تُؤْسَرُ',
      '2d': 'تُؤْسَرَانِ',
      '3md': 'يُؤْسَرَانِ',
      '3fd': 'تُؤْسَرَانِ',
      '1p': 'نُؤْسَرُ',
      '2mp': 'تُؤْسَرُونَ',
      '2fp': 'تُؤْسَرْنَ',
      '3mp': 'يُؤْسَرُونَ',
      '3fp': 'يُؤْسَرْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'sr-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُوسَرَ',
      '2ms': 'تُؤْسَرَ',
      '2fs': 'تُؤْسَرِي',
      '3ms': 'يُؤْسَرَ',
      '3fs': 'تُؤْسَرَ',
      '2d': 'تُؤْسَرَا',
      '3md': 'يُؤْسَرَا',
      '3fd': 'تُؤْسَرَا',
      '1p': 'نُؤْسَرَ',
      '2mp': 'تُؤْسَرُوا',
      '2fp': 'تُؤْسَرْنَ',
      '3mp': 'يُؤْسَرُوا',
      '3fp': 'يُؤْسَرْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'sr-1")!, 'jussive')).toEqualT({
      '1s': 'أُوسَرْ',
      '2ms': 'تُؤْسَرْ',
      '2fs': 'تُؤْسَرِي',
      '3ms': 'يُؤْسَرْ',
      '3fs': 'تُؤْسَرْ',
      '2d': 'تُؤْسَرَا',
      '3md': 'يُؤْسَرَا',
      '3fd': 'تُؤْسَرَا',
      '1p': 'نُؤْسَرْ',
      '2mp': 'تُؤْسَرُوا',
      '2fp': 'تُؤْسَرْنَ',
      '3mp': 'يُؤْسَرُوا',
      '3fp': 'يُؤْسَرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'sr-1")!)).toEqualT('آسِر')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'sr-1")!)).toEqualT('مَأْسُور')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("'sr-1")!)).toEqualT(['أَسْر'])
  })
})
