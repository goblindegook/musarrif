import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'by-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'by-1")!)).toEqualT({
      '1s': 'أَبَيْتُ',
      '2ms': 'أَبَيْتَ',
      '2fs': 'أَبَيْتِ',
      '3ms': 'أَبَى',
      '3fs': 'أَبَتْ',
      '2d': 'أَبَيْتُمَا',
      '3md': 'أَبَيَا',
      '3fd': 'أَبَتَا',
      '1p': 'أَبَيْنَا',
      '2mp': 'أَبَيْتُمْ',
      '2fp': 'أَبَيْتُنَّ',
      '3mp': 'أَبَوْا',
      '3fp': 'أَبَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'by-1")!, 'indicative')).toEqualT({
      '1s': 'آبَى',
      '2ms': 'تَأْبَى',
      '2fs': 'تَأْبَيْنَ',
      '3ms': 'يَأْبَى',
      '3fs': 'تَأْبَى',
      '2d': 'تَأْبَيَانِ',
      '3md': 'يَأْبَيَانِ',
      '3fd': 'تَأْبَيَانِ',
      '1p': 'نَأْبَى',
      '2mp': 'تَأْبَوْنَ',
      '2fp': 'تَأْبَيْنَ',
      '3mp': 'يَأْبَوْنَ',
      '3fp': 'يَأْبَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'by-1")!, 'subjunctive')).toEqualT({
      '1s': 'آبَى',
      '2ms': 'تَأْبَى',
      '2fs': 'تَأْبَيْ',
      '3ms': 'يَأْبَى',
      '3fs': 'تَأْبَى',
      '2d': 'تَأْبَيَا',
      '3md': 'يَأْبَيَا',
      '3fd': 'تَأْبَيَا',
      '1p': 'نَأْبَى',
      '2mp': 'تَأْبَوْا',
      '2fp': 'تَأْبَيْنَ',
      '3mp': 'يَأْبَوْا',
      '3fp': 'يَأْبَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'by-1")!, 'jussive')).toEqualT({
      '1s': 'آبَ',
      '2ms': 'تَأْبَ',
      '2fs': 'تَأْبَيْ',
      '3ms': 'يَأْبَ',
      '3fs': 'تَأْبَ',
      '2d': 'تَأْبَيَا',
      '3md': 'يَأْبَيَا',
      '3fd': 'تَأْبَيَا',
      '1p': 'نَأْبَ',
      '2mp': 'تَأْبَوْا',
      '2fp': 'تَأْبَيْنَ',
      '3mp': 'يَأْبَوْا',
      '3fp': 'يَأْبَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'by-1")!)).toMatchObjectT({
      '2ms': 'اِئْبَ',
      '2fs': 'اِئْبَيْ',
      '2d': 'اِئْبَيَا',
      '2mp': 'اِئْبَوْا',
      '2fp': 'اِئْبَيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'by-1")!)).toEqualT({
      '1s': 'أُبِيتُ',
      '2ms': 'أُبِيتَ',
      '2fs': 'أُبِيتِ',
      '3ms': 'أُبِيَ',
      '3fs': 'أُبِيَتْ',
      '2d': 'أُبِيتُمَا',
      '3md': 'أُبِيَا',
      '3fd': 'أُبِيَتَا',
      '1p': 'أُبِينَا',
      '2mp': 'أُبِيتُمْ',
      '2fp': 'أُبِيتُنَّ',
      '3mp': 'أُبُوا',
      '3fp': 'أُبِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'by-1")!, 'indicative')).toEqualT({
      '1s': 'أُوبَى',
      '2ms': 'تُؤْبَى',
      '2fs': 'تُؤْبَيْنَ',
      '3ms': 'يُؤْبَى',
      '3fs': 'تُؤْبَى',
      '2d': 'تُؤْبَيَانِ',
      '3md': 'يُؤْبَيَانِ',
      '3fd': 'تُؤْبَيَانِ',
      '1p': 'نُؤْبَى',
      '2mp': 'تُؤْبَوْنَ',
      '2fp': 'تُؤْبَيْنَ',
      '3mp': 'يُؤْبَوْنَ',
      '3fp': 'يُؤْبَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'by-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُوبَى',
      '2ms': 'تُؤْبَى',
      '2fs': 'تُؤْبَيْ',
      '3ms': 'يُؤْبَى',
      '3fs': 'تُؤْبَى',
      '2d': 'تُؤْبَيَا',
      '3md': 'يُؤْبَيَا',
      '3fd': 'تُؤْبَيَا',
      '1p': 'نُؤْبَى',
      '2mp': 'تُؤْبَوْا',
      '2fp': 'تُؤْبَيْنَ',
      '3mp': 'يُؤْبَوْا',
      '3fp': 'يُؤْبَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'by-1")!, 'jussive')).toEqualT({
      '1s': 'أُوبَ',
      '2ms': 'تُؤْبَ',
      '2fs': 'تُؤْبَيْ',
      '3ms': 'يُؤْبَ',
      '3fs': 'تُؤْبَ',
      '2d': 'تُؤْبَيَا',
      '3md': 'يُؤْبَيَا',
      '3fd': 'تُؤْبَيَا',
      '1p': 'نُؤْبَ',
      '2mp': 'تُؤْبَوْا',
      '2fp': 'تُؤْبَيْنَ',
      '3mp': 'يُؤْبَوْا',
      '3fp': 'يُؤْبَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'by-1")!)).toEqualT('آبٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'by-1")!)).toEqualT('مَأْبِيّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'by-1")!))).toEqualT(new Set(['إِبَاء', 'إِبَاءَة']))
  })
})
