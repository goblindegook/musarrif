import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'ty-3", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'ty-3")!)).toEqualT({
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
    expect(conjugatePresentMood(getVerbById("'ty-3")!, 'indicative')).toEqualT({
      '1s': 'أُؤَاتِي',
      '2ms': 'تُؤَاتِي',
      '2fs': 'تُؤَاتِينَ',
      '3ms': 'يُؤَاتِي',
      '3fs': 'تُؤَاتِي',
      '2d': 'تُؤَاتِيَانِ',
      '3md': 'يُؤَاتِيَانِ',
      '3fd': 'تُؤَاتِيَانِ',
      '1p': 'نُؤَاتِي',
      '2mp': 'تُؤَاتُونَ',
      '2fp': 'تُؤَاتِينَ',
      '3mp': 'يُؤَاتُونَ',
      '3fp': 'يُؤَاتِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'ty-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَاتِيَ',
      '2ms': 'تُؤَاتِيَ',
      '2fs': 'تُؤَاتِي',
      '3ms': 'يُؤَاتِيَ',
      '3fs': 'تُؤَاتِيَ',
      '2d': 'تُؤَاتِيَا',
      '3md': 'يُؤَاتِيَا',
      '3fd': 'تُؤَاتِيَا',
      '1p': 'نُؤَاتِيَ',
      '2mp': 'تُؤَاتُوا',
      '2fp': 'تُؤَاتِينَ',
      '3mp': 'يُؤَاتُوا',
      '3fp': 'يُؤَاتِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'ty-3")!, 'jussive')).toEqualT({
      '1s': 'أُؤَاتِ',
      '2ms': 'تُؤَاتِ',
      '2fs': 'تُؤَاتِي',
      '3ms': 'يُؤَاتِ',
      '3fs': 'تُؤَاتِ',
      '2d': 'تُؤَاتِيَا',
      '3md': 'يُؤَاتِيَا',
      '3fd': 'تُؤَاتِيَا',
      '1p': 'نُؤَاتِ',
      '2mp': 'تُؤَاتُوا',
      '2fp': 'تُؤَاتِينَ',
      '3mp': 'يُؤَاتُوا',
      '3fp': 'يُؤَاتِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'ty-3")!)).toMatchObjectT({
      '2ms': 'آتِ',
      '2fs': 'آتِي',
      '2d': 'آتِيَا',
      '2mp': 'آتُوا',
      '2fp': 'آتِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'ty-3")!)).toEqualT({
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
    expect(conjugatePassivePresentMood(getVerbById("'ty-3")!, 'indicative')).toEqualT({
      '1s': 'أُؤَاتَى',
      '2ms': 'تُؤَاتَى',
      '2fs': 'تُؤَاتَيْنَ',
      '3ms': 'يُؤَاتَى',
      '3fs': 'تُؤَاتَى',
      '2d': 'تُؤَاتَيَانِ',
      '3md': 'يُؤَاتَيَانِ',
      '3fd': 'تُؤَاتَيَانِ',
      '1p': 'نُؤَاتَى',
      '2mp': 'تُؤَاتَوْنَ',
      '2fp': 'تُؤَاتَيْنَ',
      '3mp': 'يُؤَاتَوْنَ',
      '3fp': 'يُؤَاتَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'ty-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَاتَى',
      '2ms': 'تُؤَاتَى',
      '2fs': 'تُؤَاتَيْ',
      '3ms': 'يُؤَاتَى',
      '3fs': 'تُؤَاتَى',
      '2d': 'تُؤَاتَيَا',
      '3md': 'يُؤَاتَيَا',
      '3fd': 'تُؤَاتَيَا',
      '1p': 'نُؤَاتَى',
      '2mp': 'تُؤَاتَوْا',
      '2fp': 'تُؤَاتَيْنَ',
      '3mp': 'يُؤَاتَوْا',
      '3fp': 'يُؤَاتَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'ty-3")!, 'jussive')).toEqualT({
      '1s': 'أُؤَاتَ',
      '2ms': 'تُؤَاتَ',
      '2fs': 'تُؤَاتَيْ',
      '3ms': 'يُؤَاتَ',
      '3fs': 'تُؤَاتَ',
      '2d': 'تُؤَاتَيَا',
      '3md': 'يُؤَاتَيَا',
      '3fd': 'تُؤَاتَيَا',
      '1p': 'نُؤَاتَ',
      '2mp': 'تُؤَاتَوْا',
      '2fp': 'تُؤَاتَيْنَ',
      '3mp': 'يُؤَاتَوْا',
      '3fp': 'يُؤَاتَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'ty-3")!)).toEqualT('مُؤَاتٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'ty-3")!)).toEqualT('مُؤَاتًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("'ty-3")!)).toEqualT(['مُؤَاتَاة'])
  })
})
