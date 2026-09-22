import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("n'y-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("n'y-1")!)).toEqualT({
      '1s': 'نَأَيْتُ',
      '2ms': 'نَأَيْتَ',
      '2fs': 'نَأَيْتِ',
      '3ms': 'نَأَى',
      '3fs': 'نَأَتْ',
      '2d': 'نَأَيْتُمَا',
      '3md': 'نَأَيَا',
      '3fd': 'نَأَتَا',
      '1p': 'نَأَيْنَا',
      '2mp': 'نَأَيْتُمْ',
      '2fp': 'نَأَيْتُنَّ',
      '3mp': 'نَأَوْا',
      '3fp': 'نَأَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("n'y-1")!, 'indicative')).toEqualT({
      '1s': 'أَنْأَى',
      '2ms': 'تَنْأَى',
      '2fs': 'تَنْأَيْنَ',
      '3ms': 'يَنْأَى',
      '3fs': 'تَنْأَى',
      '2d': 'تَنْأَيَانِ',
      '3md': 'يَنْأَيَانِ',
      '3fd': 'تَنْأَيَانِ',
      '1p': 'نَنْأَى',
      '2mp': 'تَنْأَوْنَ',
      '2fp': 'تَنْأَيْنَ',
      '3mp': 'يَنْأَوْنَ',
      '3fp': 'يَنْأَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("n'y-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَنْأَى',
      '2ms': 'تَنْأَى',
      '2fs': 'تَنْأَيْ',
      '3ms': 'يَنْأَى',
      '3fs': 'تَنْأَى',
      '2d': 'تَنْأَيَا',
      '3md': 'يَنْأَيَا',
      '3fd': 'تَنْأَيَا',
      '1p': 'نَنْأَى',
      '2mp': 'تَنْأَوْا',
      '2fp': 'تَنْأَيْنَ',
      '3mp': 'يَنْأَوْا',
      '3fp': 'يَنْأَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("n'y-1")!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَنْءَ', 'أَنْأَ']),
      '2ms': expect.toBeOneOf(['تَنْءَ', 'تَنْأَ']),
      '2fs': 'تَنْأَيْ',
      '3ms': expect.toBeOneOf(['يَنْءَ', 'يَنْأَ']),
      '3fs': expect.toBeOneOf(['تَنْءَ', 'تَنْأَ']),
      '2d': 'تَنْأَيَا',
      '3md': 'يَنْأَيَا',
      '3fd': 'تَنْأَيَا',
      '1p': expect.toBeOneOf(['نَنْءَ', 'نَنْأَ']),
      '2mp': 'تَنْأَوْا',
      '2fp': 'تَنْأَيْنَ',
      '3mp': 'يَنْأَوْا',
      '3fp': 'يَنْأَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("n'y-1")!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['اِنْءَ', 'اِنْأَ']),
      '2fs': 'اِنْأَيْ',
      '2d': 'اِنْأَيَا',
      '2mp': 'اِنْأَوْا',
      '2fp': 'اِنْأَيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("n'y-1")!)).toEqualT({
      '1s': 'نُئِيتُ',
      '2ms': 'نُئِيتَ',
      '2fs': 'نُئِيتِ',
      '3ms': 'نُئِيَ',
      '3fs': 'نُئِيَتْ',
      '2d': 'نُئِيتُمَا',
      '3md': 'نُئِيَا',
      '3fd': 'نُئِيَتَا',
      '1p': 'نُئِينَا',
      '2mp': 'نُئِيتُمْ',
      '2fp': 'نُئِيتُنَّ',
      '3mp': 'نُؤُوا',
      '3fp': 'نُئِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("n'y-1")!, 'indicative')).toEqualT({
      '1s': 'أُنْأَى',
      '2ms': 'تُنْأَى',
      '2fs': 'تُنْأَيْنَ',
      '3ms': 'يُنْأَى',
      '3fs': 'تُنْأَى',
      '2d': 'تُنْأَيَانِ',
      '3md': 'يُنْأَيَانِ',
      '3fd': 'تُنْأَيَانِ',
      '1p': 'نُنْأَى',
      '2mp': 'تُنْأَوْنَ',
      '2fp': 'تُنْأَيْنَ',
      '3mp': 'يُنْأَوْنَ',
      '3fp': 'يُنْأَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("n'y-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُنْأَى',
      '2ms': 'تُنْأَى',
      '2fs': 'تُنْأَيْ',
      '3ms': 'يُنْأَى',
      '3fs': 'تُنْأَى',
      '2d': 'تُنْأَيَا',
      '3md': 'يُنْأَيَا',
      '3fd': 'تُنْأَيَا',
      '1p': 'نُنْأَى',
      '2mp': 'تُنْأَوْا',
      '2fp': 'تُنْأَيْنَ',
      '3mp': 'يُنْأَوْا',
      '3fp': 'يُنْأَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("n'y-1")!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أُنْءَ', 'أُنْأَ']),
      '2ms': expect.toBeOneOf(['تُنْءَ', 'تُنْأَ']),
      '2fs': 'تُنْأَيْ',
      '3ms': expect.toBeOneOf(['يُنْءَ', 'يُنْأَ']),
      '3fs': expect.toBeOneOf(['تُنْءَ', 'تُنْأَ']),
      '2d': 'تُنْأَيَا',
      '3md': 'يُنْأَيَا',
      '3fd': 'تُنْأَيَا',
      '1p': expect.toBeOneOf(['نُنْءَ', 'نُنْأَ']),
      '2mp': 'تُنْأَوْا',
      '2fp': 'تُنْأَيْنَ',
      '3mp': 'يُنْأَوْا',
      '3fp': 'يُنْأَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("n'y-1")!)).toEqualT('نَاءٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("n'y-1")!)).toEqualT('مَنْئِيّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("n'y-1")!))).toEqualT(new Set(['نَأْي']))
  })
})
