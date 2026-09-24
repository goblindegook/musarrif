import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'*n-10 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'*n-10")!)).toEqualT({
      '1s': 'اِسْتَأْذَنْتُ',
      '2ms': 'اِسْتَأْذَنْتَ',
      '2fs': 'اِسْتَأْذَنْتِ',
      '3ms': 'اِسْتَأْذَنَ',
      '3fs': 'اِسْتَأْذَنَتْ',
      '2d': 'اِسْتَأْذَنْتُمَا',
      '3md': 'اِسْتَأْذَنَا',
      '3fd': 'اِسْتَأْذَنَتَا',
      '1p': 'اِسْتَأْذَنَّا',
      '2mp': 'اِسْتَأْذَنْتُمْ',
      '2fp': 'اِسْتَأْذَنْتُنَّ',
      '3mp': 'اِسْتَأْذَنُوا',
      '3fp': 'اِسْتَأْذَنَّ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'*n-10")!, 'indicative')).toEqualT({
      '1s': 'أَسْتَأْذِنُ',
      '2ms': 'تَسْتَأْذِنُ',
      '2fs': 'تَسْتَأْذِنِينَ',
      '3ms': 'يَسْتَأْذِنُ',
      '3fs': 'تَسْتَأْذِنُ',
      '2d': 'تَسْتَأْذِنَانِ',
      '3md': 'يَسْتَأْذِنَانِ',
      '3fd': 'تَسْتَأْذِنَانِ',
      '1p': 'نَسْتَأْذِنُ',
      '2mp': 'تَسْتَأْذِنُونَ',
      '2fp': 'تَسْتَأْذِنَّ',
      '3mp': 'يَسْتَأْذِنُونَ',
      '3fp': 'يَسْتَأْذِنَّ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'*n-10")!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَأْذِنَ',
      '2ms': 'تَسْتَأْذِنَ',
      '2fs': 'تَسْتَأْذِنِي',
      '3ms': 'يَسْتَأْذِنَ',
      '3fs': 'تَسْتَأْذِنَ',
      '2d': 'تَسْتَأْذِنَا',
      '3md': 'يَسْتَأْذِنَا',
      '3fd': 'تَسْتَأْذِنَا',
      '1p': 'نَسْتَأْذِنَ',
      '2mp': 'تَسْتَأْذِنُوا',
      '2fp': 'تَسْتَأْذِنَّ',
      '3mp': 'يَسْتَأْذِنُوا',
      '3fp': 'يَسْتَأْذِنَّ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'*n-10")!, 'jussive')).toEqualT({
      '1s': 'أَسْتَأْذِنْ',
      '2ms': 'تَسْتَأْذِنْ',
      '2fs': 'تَسْتَأْذِنِي',
      '3ms': 'يَسْتَأْذِنْ',
      '3fs': 'تَسْتَأْذِنْ',
      '2d': 'تَسْتَأْذِنَا',
      '3md': 'يَسْتَأْذِنَا',
      '3fd': 'تَسْتَأْذِنَا',
      '1p': 'نَسْتَأْذِنْ',
      '2mp': 'تَسْتَأْذِنُوا',
      '2fp': 'تَسْتَأْذِنَّ',
      '3mp': 'يَسْتَأْذِنُوا',
      '3fp': 'يَسْتَأْذِنَّ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'*n-10")!)).toMatchObjectT({
      '2ms': 'اِسْتَأْذِنْ',
      '2fs': 'اِسْتَأْذِنِي',
      '2d': 'اِسْتَأْذِنَا',
      '2mp': 'اِسْتَأْذِنُوا',
      '2fp': 'اِسْتَأْذِنَّ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'*n-10")!)).toEqualT({
      '1s': 'اُسْتُؤْذِنْتُ',
      '2ms': 'اُسْتُؤْذِنْتَ',
      '2fs': 'اُسْتُؤْذِنْتِ',
      '3ms': 'اُسْتُؤْذِنَ',
      '3fs': 'اُسْتُؤْذِنَتْ',
      '2d': 'اُسْتُؤْذِنْتُمَا',
      '3md': 'اُسْتُؤْذِنَا',
      '3fd': 'اُسْتُؤْذِنَتَا',
      '1p': 'اُسْتُؤْذِنَّا',
      '2mp': 'اُسْتُؤْذِنْتُمْ',
      '2fp': 'اُسْتُؤْذِنْتُنَّ',
      '3mp': 'اُسْتُؤْذِنُوا',
      '3fp': 'اُسْتُؤْذِنَّ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'*n-10")!, 'indicative')).toEqualT({
      '1s': 'أُسْتَأْذَنُ',
      '2ms': 'تُسْتَأْذَنُ',
      '2fs': 'تُسْتَأْذَنِينَ',
      '3ms': 'يُسْتَأْذَنُ',
      '3fs': 'تُسْتَأْذَنُ',
      '2d': 'تُسْتَأْذَنَانِ',
      '3md': 'يُسْتَأْذَنَانِ',
      '3fd': 'تُسْتَأْذَنَانِ',
      '1p': 'نُسْتَأْذَنُ',
      '2mp': 'تُسْتَأْذَنُونَ',
      '2fp': 'تُسْتَأْذَنَّ',
      '3mp': 'يُسْتَأْذَنُونَ',
      '3fp': 'يُسْتَأْذَنَّ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'*n-10")!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَأْذَنَ',
      '2ms': 'تُسْتَأْذَنَ',
      '2fs': 'تُسْتَأْذَنِي',
      '3ms': 'يُسْتَأْذَنَ',
      '3fs': 'تُسْتَأْذَنَ',
      '2d': 'تُسْتَأْذَنَا',
      '3md': 'يُسْتَأْذَنَا',
      '3fd': 'تُسْتَأْذَنَا',
      '1p': 'نُسْتَأْذَنَ',
      '2mp': 'تُسْتَأْذَنُوا',
      '2fp': 'تُسْتَأْذَنَّ',
      '3mp': 'يُسْتَأْذَنُوا',
      '3fp': 'يُسْتَأْذَنَّ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'*n-10")!, 'jussive')).toEqualT({
      '1s': 'أُسْتَأْذَنْ',
      '2ms': 'تُسْتَأْذَنْ',
      '2fs': 'تُسْتَأْذَنِي',
      '3ms': 'يُسْتَأْذَنْ',
      '3fs': 'تُسْتَأْذَنْ',
      '2d': 'تُسْتَأْذَنَا',
      '3md': 'يُسْتَأْذَنَا',
      '3fd': 'تُسْتَأْذَنَا',
      '1p': 'نُسْتَأْذَنْ',
      '2mp': 'تُسْتَأْذَنُوا',
      '2fp': 'تُسْتَأْذَنَّ',
      '3mp': 'يُسْتَأْذَنُوا',
      '3fp': 'يُسْتَأْذَنَّ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'*n-10")!)).toEqualT('مُسْتَأْذِن')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'*n-10")!)).toEqualT('مُسْتَأْذَن')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'*n-10")!))).toEqualT(new Set(['اِسْتِئْذَان']))
  })
})
