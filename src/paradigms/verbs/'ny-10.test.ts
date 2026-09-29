import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'ny-10 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'ny-10")!)).toEqualT({
      '1s': 'اِسْتَأْنَيْتُ',
      '2ms': 'اِسْتَأْنَيْتَ',
      '2fs': 'اِسْتَأْنَيْتِ',
      '3ms': 'اِسْتَأْنَى',
      '3fs': 'اِسْتَأْنَتْ',
      '2d': 'اِسْتَأْنَيْتُمَا',
      '3md': 'اِسْتَأْنَيَا',
      '3fd': 'اِسْتَأْنَتَا',
      '1p': 'اِسْتَأْنَيْنَا',
      '2mp': 'اِسْتَأْنَيْتُمْ',
      '2fp': 'اِسْتَأْنَيْتُنَّ',
      '3mp': 'اِسْتَأْنَوْا',
      '3fp': 'اِسْتَأْنَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'ny-10")!, 'indicative')).toEqualT({
      '1s': 'أَسْتَأْنِي',
      '2ms': 'تَسْتَأْنِي',
      '2fs': 'تَسْتَأْنِينَ',
      '3ms': 'يَسْتَأْنِي',
      '3fs': 'تَسْتَأْنِي',
      '2d': 'تَسْتَأْنِيَانِ',
      '3md': 'يَسْتَأْنِيَانِ',
      '3fd': 'تَسْتَأْنِيَانِ',
      '1p': 'نَسْتَأْنِي',
      '2mp': 'تَسْتَأْنُونَ',
      '2fp': 'تَسْتَأْنِينَ',
      '3mp': 'يَسْتَأْنُونَ',
      '3fp': 'يَسْتَأْنِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'ny-10")!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَأْنِيَ',
      '2ms': 'تَسْتَأْنِيَ',
      '2fs': 'تَسْتَأْنِي',
      '3ms': 'يَسْتَأْنِيَ',
      '3fs': 'تَسْتَأْنِيَ',
      '2d': 'تَسْتَأْنِيَا',
      '3md': 'يَسْتَأْنِيَا',
      '3fd': 'تَسْتَأْنِيَا',
      '1p': 'نَسْتَأْنِيَ',
      '2mp': 'تَسْتَأْنُوا',
      '2fp': 'تَسْتَأْنِينَ',
      '3mp': 'يَسْتَأْنُوا',
      '3fp': 'يَسْتَأْنِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'ny-10")!, 'jussive')).toEqualT({
      '1s': 'أَسْتَأْنِ',
      '2ms': 'تَسْتَأْنِ',
      '2fs': 'تَسْتَأْنِي',
      '3ms': 'يَسْتَأْنِ',
      '3fs': 'تَسْتَأْنِ',
      '2d': 'تَسْتَأْنِيَا',
      '3md': 'يَسْتَأْنِيَا',
      '3fd': 'تَسْتَأْنِيَا',
      '1p': 'نَسْتَأْنِ',
      '2mp': 'تَسْتَأْنُوا',
      '2fp': 'تَسْتَأْنِينَ',
      '3mp': 'يَسْتَأْنُوا',
      '3fp': 'يَسْتَأْنِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'ny-10")!)).toMatchObjectT({
      '2ms': 'اِسْتَأْنِ',
      '2fs': 'اِسْتَأْنِي',
      '2d': 'اِسْتَأْنِيَا',
      '2mp': 'اِسْتَأْنُوا',
      '2fp': 'اِسْتَأْنِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'ny-10")!)).toEqualT({
      '1s': 'اُسْتُؤْنِيتُ',
      '2ms': 'اُسْتُؤْنِيتَ',
      '2fs': 'اُسْتُؤْنِيتِ',
      '3ms': 'اُسْتُؤْنِيَ',
      '3fs': 'اُسْتُؤْنِيَتْ',
      '2d': 'اُسْتُؤْنِيتُمَا',
      '3md': 'اُسْتُؤْنِيَا',
      '3fd': 'اُسْتُؤْنِيَتَا',
      '1p': 'اُسْتُؤْنِينَا',
      '2mp': 'اُسْتُؤْنِيتُمْ',
      '2fp': 'اُسْتُؤْنِيتُنَّ',
      '3mp': 'اُسْتُؤْنُوا',
      '3fp': 'اُسْتُؤْنِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'ny-10")!, 'indicative')).toEqualT({
      '1s': 'أُسْتَأْنَى',
      '2ms': 'تُسْتَأْنَى',
      '2fs': 'تُسْتَأْنَيْنَ',
      '3ms': 'يُسْتَأْنَى',
      '3fs': 'تُسْتَأْنَى',
      '2d': 'تُسْتَأْنَيَانِ',
      '3md': 'يُسْتَأْنَيَانِ',
      '3fd': 'تُسْتَأْنَيَانِ',
      '1p': 'نُسْتَأْنَى',
      '2mp': 'تُسْتَأْنَوْنَ',
      '2fp': 'تُسْتَأْنَيْنَ',
      '3mp': 'يُسْتَأْنَوْنَ',
      '3fp': 'يُسْتَأْنَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'ny-10")!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَأْنَى',
      '2ms': 'تُسْتَأْنَى',
      '2fs': 'تُسْتَأْنَيْ',
      '3ms': 'يُسْتَأْنَى',
      '3fs': 'تُسْتَأْنَى',
      '2d': 'تُسْتَأْنَيَا',
      '3md': 'يُسْتَأْنَيَا',
      '3fd': 'تُسْتَأْنَيَا',
      '1p': 'نُسْتَأْنَى',
      '2mp': 'تُسْتَأْنَوْا',
      '2fp': 'تُسْتَأْنَيْنَ',
      '3mp': 'يُسْتَأْنَوْا',
      '3fp': 'يُسْتَأْنَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'ny-10")!, 'jussive')).toEqualT({
      '1s': 'أُسْتَأْنَ',
      '2ms': 'تُسْتَأْنَ',
      '2fs': 'تُسْتَأْنَيْ',
      '3ms': 'يُسْتَأْنَ',
      '3fs': 'تُسْتَأْنَ',
      '2d': 'تُسْتَأْنَيَا',
      '3md': 'يُسْتَأْنَيَا',
      '3fd': 'تُسْتَأْنَيَا',
      '1p': 'نُسْتَأْنَ',
      '2mp': 'تُسْتَأْنَوْا',
      '2fp': 'تُسْتَأْنَيْنَ',
      '3mp': 'يُسْتَأْنَوْا',
      '3fp': 'يُسْتَأْنَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'ny-10")!)).toEqualT('مُسْتَأْنٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'ny-10")!)).toEqualT('مُسْتَأْنًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'ny-10")!))).toEqualT(new Set(['اِسْتِئْنَاء']))
  })
})
