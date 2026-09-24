import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'xw-3 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'xw-3")!)).toEqualT({
      '1s': 'آخَيْتُ',
      '2ms': 'آخَيْتَ',
      '2fs': 'آخَيْتِ',
      '3ms': 'آخَى',
      '3fs': 'آخَتْ',
      '2d': 'آخَيْتُمَا',
      '3md': 'آخَيَا',
      '3fd': 'آخَتَا',
      '1p': 'آخَيْنَا',
      '2mp': 'آخَيْتُمْ',
      '2fp': 'آخَيْتُنَّ',
      '3mp': 'آخَوْا',
      '3fp': 'آخَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'xw-3")!, 'indicative')).toEqualT({
      '1s': 'أُؤَاخِي',
      '2ms': 'تُؤَاخِي',
      '2fs': 'تُؤَاخِينَ',
      '3ms': 'يُؤَاخِي',
      '3fs': 'تُؤَاخِي',
      '2d': 'تُؤَاخِيَانِ',
      '3md': 'يُؤَاخِيَانِ',
      '3fd': 'تُؤَاخِيَانِ',
      '1p': 'نُؤَاخِي',
      '2mp': 'تُؤَاخُونَ',
      '2fp': 'تُؤَاخِينَ',
      '3mp': 'يُؤَاخُونَ',
      '3fp': 'يُؤَاخِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'xw-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَاخِيَ',
      '2ms': 'تُؤَاخِيَ',
      '2fs': 'تُؤَاخِي',
      '3ms': 'يُؤَاخِيَ',
      '3fs': 'تُؤَاخِيَ',
      '2d': 'تُؤَاخِيَا',
      '3md': 'يُؤَاخِيَا',
      '3fd': 'تُؤَاخِيَا',
      '1p': 'نُؤَاخِيَ',
      '2mp': 'تُؤَاخُوا',
      '2fp': 'تُؤَاخِينَ',
      '3mp': 'يُؤَاخُوا',
      '3fp': 'يُؤَاخِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'xw-3")!, 'jussive')).toEqualT({
      '1s': 'أُؤَاخِ',
      '2ms': 'تُؤَاخِ',
      '2fs': 'تُؤَاخِي',
      '3ms': 'يُؤَاخِ',
      '3fs': 'تُؤَاخِ',
      '2d': 'تُؤَاخِيَا',
      '3md': 'يُؤَاخِيَا',
      '3fd': 'تُؤَاخِيَا',
      '1p': 'نُؤَاخِ',
      '2mp': 'تُؤَاخُوا',
      '2fp': 'تُؤَاخِينَ',
      '3mp': 'يُؤَاخُوا',
      '3fp': 'يُؤَاخِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'xw-3")!)).toMatchObjectT({
      '2ms': 'آخِ',
      '2fs': 'آخِي',
      '2d': 'آخِيَا',
      '2mp': 'آخُوا',
      '2fp': 'آخِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'xw-3")!)).toEqualT({
      '1s': 'أُوخِيتُ',
      '2ms': 'أُوخِيتَ',
      '2fs': 'أُوخِيتِ',
      '3ms': 'أُوخِيَ',
      '3fs': 'أُوخِيَتْ',
      '2d': 'أُوخِيتُمَا',
      '3md': 'أُوخِيَا',
      '3fd': 'أُوخِيَتَا',
      '1p': 'أُوخِينَا',
      '2mp': 'أُوخِيتُمْ',
      '2fp': 'أُوخِيتُنَّ',
      '3mp': 'أُوخُوا',
      '3fp': 'أُوخِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'xw-3")!, 'indicative')).toEqualT({
      '1s': 'أُؤَاخَى',
      '2ms': 'تُؤَاخَى',
      '2fs': 'تُؤَاخَيْنَ',
      '3ms': 'يُؤَاخَى',
      '3fs': 'تُؤَاخَى',
      '2d': 'تُؤَاخَيَانِ',
      '3md': 'يُؤَاخَيَانِ',
      '3fd': 'تُؤَاخَيَانِ',
      '1p': 'نُؤَاخَى',
      '2mp': 'تُؤَاخَوْنَ',
      '2fp': 'تُؤَاخَيْنَ',
      '3mp': 'يُؤَاخَوْنَ',
      '3fp': 'يُؤَاخَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'xw-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَاخَى',
      '2ms': 'تُؤَاخَى',
      '2fs': 'تُؤَاخَيْ',
      '3ms': 'يُؤَاخَى',
      '3fs': 'تُؤَاخَى',
      '2d': 'تُؤَاخَيَا',
      '3md': 'يُؤَاخَيَا',
      '3fd': 'تُؤَاخَيَا',
      '1p': 'نُؤَاخَى',
      '2mp': 'تُؤَاخَوْا',
      '2fp': 'تُؤَاخَيْنَ',
      '3mp': 'يُؤَاخَوْا',
      '3fp': 'يُؤَاخَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'xw-3")!, 'jussive')).toEqualT({
      '1s': 'أُؤَاخَ',
      '2ms': 'تُؤَاخَ',
      '2fs': 'تُؤَاخَيْ',
      '3ms': 'يُؤَاخَ',
      '3fs': 'تُؤَاخَ',
      '2d': 'تُؤَاخَيَا',
      '3md': 'يُؤَاخَيَا',
      '3fd': 'تُؤَاخَيَا',
      '1p': 'نُؤَاخَ',
      '2mp': 'تُؤَاخَوْا',
      '2fp': 'تُؤَاخَيْنَ',
      '3mp': 'يُؤَاخَوْا',
      '3fp': 'يُؤَاخَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'xw-3")!)).toEqualT('مُؤَاخٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'xw-3")!)).toEqualT('مُؤَاخًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'xw-3")!))).toEqualT(new Set(['إِخَاء', 'مُؤَاخَاة']))
  })
})
