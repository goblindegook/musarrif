import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'ty-4", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'ty-4")!)).toEqualT({
      '1s': 'آتَيْتُ',
      '2ms': 'آتَيْتَ',
      '2fs': 'آتَيْتِ',
      '3ms': 'آتَى',
      '3fs': 'آتَتْ',
      '2d': 'آتَيْتُمَا',
      '3md': 'آتَيَا',
      '3fd': 'آتَتَا',
      '1p': 'آتَيْنَا',
      '2mp': 'آتَيْتُمْ',
      '2fp': 'آتَيْتُنَّ',
      '3mp': 'آتَوْا',
      '3fp': 'آتَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'ty-4")!, 'indicative')).toEqualT({
      '1s': 'أُوتِي',
      '2ms': 'تُؤتِي',
      '2fs': 'تُؤتِينَ',
      '3ms': 'يُؤتِي',
      '3fs': 'تُؤتِي',
      '2d': 'تُؤتِيَانِ',
      '3md': 'يُؤتِيَانِ',
      '3fd': 'تُؤتِيَانِ',
      '1p': 'نُؤتِي',
      '2mp': 'تُؤتُونَ',
      '2fp': 'تُؤتِينَ',
      '3mp': 'يُؤتُونَ',
      '3fp': 'يُؤتِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'ty-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُوتِيَ',
      '2ms': 'تُؤتِيَ',
      '2fs': 'تُؤتِي',
      '3ms': 'يُؤتِيَ',
      '3fs': 'تُؤتِيَ',
      '2d': 'تُؤتِيَا',
      '3md': 'يُؤتِيَا',
      '3fd': 'تُؤتِيَا',
      '1p': 'نُؤتِيَ',
      '2mp': 'تُؤتُوا',
      '2fp': 'تُؤتِينَ',
      '3mp': 'يُؤتُوا',
      '3fp': 'يُؤتِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'ty-4")!, 'jussive')).toEqualT({
      '1s': 'أُوتِ',
      '2ms': 'تُؤتِ',
      '2fs': 'تُؤتِي',
      '3ms': 'يُؤتِ',
      '3fs': 'تُؤتِ',
      '2d': 'تُؤتِيَا',
      '3md': 'يُؤتِيَا',
      '3fd': 'تُؤتِيَا',
      '1p': 'نُؤتِ',
      '2mp': 'تُؤتُوا',
      '2fp': 'تُؤتِينَ',
      '3mp': 'يُؤتُوا',
      '3fp': 'يُؤتِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'ty-4")!)).toMatchObjectT({
      '2ms': 'آتِ',
      '2fs': 'آتِي',
      '2d': 'آتِيَا',
      '2mp': 'آتُوا',
      '2fp': 'آتِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'ty-4")!)).toEqualT({
      '1s': 'أُوتِيتُ',
      '2ms': 'أُوتِيتَ',
      '2fs': 'أُوتِيتِ',
      '3ms': 'أُوتِيَ',
      '3fs': 'أُوتِيَتْ',
      '2d': 'أُوتِيتُمَا',
      '3md': 'أُوتِيَا',
      '3fd': 'أُوتِيَتَا',
      '1p': 'أُوتِينَا',
      '2mp': 'أُوتِيتُمْ',
      '2fp': 'أُوتِيتُنَّ',
      '3mp': 'أُوتُوا',
      '3fp': 'أُوتِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'ty-4")!, 'indicative')).toEqualT({
      '1s': 'أُوتَى',
      '2ms': 'تُؤْتَى',
      '2fs': 'تُؤْتَيْنَ',
      '3ms': 'يُؤْتَى',
      '3fs': 'تُؤْتَى',
      '2d': 'تُؤْتَيَانِ',
      '3md': 'يُؤْتَيَانِ',
      '3fd': 'تُؤْتَيَانِ',
      '1p': 'نُؤْتَى',
      '2mp': 'تُؤْتَوْنَ',
      '2fp': 'تُؤْتَيْنَ',
      '3mp': 'يُؤْتَوْنَ',
      '3fp': 'يُؤْتَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'ty-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُوتَى',
      '2ms': 'تُؤْتَى',
      '2fs': 'تُؤْتَيْ',
      '3ms': 'يُؤْتَى',
      '3fs': 'تُؤْتَى',
      '2d': 'تُؤْتَيَا',
      '3md': 'يُؤْتَيَا',
      '3fd': 'تُؤْتَيَا',
      '1p': 'نُؤْتَى',
      '2mp': 'تُؤْتَوْا',
      '2fp': 'تُؤْتَيْنَ',
      '3mp': 'يُؤْتَوْا',
      '3fp': 'يُؤْتَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'ty-4")!, 'jussive')).toEqualT({
      '1s': 'أُوتَ',
      '2ms': 'تُؤْتَ',
      '2fs': 'تُؤْتَيْ',
      '3ms': 'يُؤْتَ',
      '3fs': 'تُؤْتَ',
      '2d': 'تُؤْتَيَا',
      '3md': 'يُؤْتَيَا',
      '3fd': 'تُؤْتَيَا',
      '1p': 'نُؤْتَ',
      '2mp': 'تُؤْتَوْا',
      '2fp': 'تُؤْتَيْنَ',
      '3mp': 'يُؤْتَوْا',
      '3fp': 'يُؤْتَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'ty-4")!)).toEqualT('مُؤْتٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'ty-4")!)).toEqualT('مُؤْتًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("'ty-4")!)).toEqualT(['إِيتَاء'])
  })
})
