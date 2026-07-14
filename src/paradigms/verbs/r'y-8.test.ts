import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("r'y-8", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("r'y-8")!)).toEqualT({
      '1s': 'اِرْتَأَيْتُ',
      '2ms': 'اِرْتَأَيْتَ',
      '2fs': 'اِرْتَأَيْتِ',
      '3ms': 'اِرْتَأَى',
      '3fs': 'اِرْتَأَتْ',
      '2d': 'اِرْتَأَيْتُمَا',
      '3md': 'اِرْتَأَيَا',
      '3fd': 'اِرْتَأَتَا',
      '1p': 'اِرْتَأَيْنَا',
      '2mp': 'اِرْتَأَيْتُمْ',
      '2fp': 'اِرْتَأَيْتُنَّ',
      '3mp': 'اِرْتَأَوْا',
      '3fp': 'اِرْتَأَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("r'y-8")!, 'indicative')).toEqualT({
      '1s': 'أَرْتَئِي',
      '2ms': 'تَرْتَئِي',
      '2fs': 'تَرْتَئِينَ',
      '3ms': 'يَرْتَئِي',
      '3fs': 'تَرْتَئِي',
      '2d': 'تَرْتَئِيَانِ',
      '3md': 'يَرْتَئِيَانِ',
      '3fd': 'تَرْتَئِيَانِ',
      '1p': 'نَرْتَئِي',
      '2mp': 'تَرْتَؤُونَ',
      '2fp': 'تَرْتَئِينَ',
      '3mp': 'يَرْتَؤُونَ',
      '3fp': 'يَرْتَئِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("r'y-8")!, 'subjunctive')).toEqualT({
      '1s': 'أَرْتَئِيَ',
      '2ms': 'تَرْتَئِيَ',
      '2fs': 'تَرْتَئِي',
      '3ms': 'يَرْتَئِيَ',
      '3fs': 'تَرْتَئِيَ',
      '2d': 'تَرْتَئِيَا',
      '3md': 'يَرْتَئِيَا',
      '3fd': 'تَرْتَئِيَا',
      '1p': 'نَرْتَئِيَ',
      '2mp': 'تَرْتَؤُوا',
      '2fp': 'تَرْتَئِينَ',
      '3mp': 'يَرْتَؤُوا',
      '3fp': 'يَرْتَئِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("r'y-8")!, 'jussive')).toEqualT({
      '1s': 'أَرْتَأِ',
      '2ms': 'تَرْتَأِ',
      '2fs': 'تَرْتَئِي',
      '3ms': 'يَرْتَأِ',
      '3fs': 'تَرْتَأِ',
      '2d': 'تَرْتَئِيَا',
      '3md': 'يَرْتَئِيَا',
      '3fd': 'تَرْتَئِيَا',
      '1p': 'نَرْتَأِ',
      '2mp': 'تَرْتَؤُوا',
      '2fp': 'تَرْتَئِينَ',
      '3mp': 'يَرْتَؤُوا',
      '3fp': 'يَرْتَئِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("r'y-8")!)).toMatchObjectT({
      '2ms': 'اِرْتَأِ',
      '2fs': 'اِرْتَئِي',
      '2d': 'اِرْتَئِيَا',
      '2mp': 'اِرْتَؤُوا',
      '2fp': 'اِرْتَئِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("r'y-8")!)).toEqualT({
      '1s': 'اُرْتُئِيتُ',
      '2ms': 'اُرْتُئِيتَ',
      '2fs': 'اُرْتُئِيتِ',
      '3ms': 'اُرْتُئِيَ',
      '3fs': 'اُرْتُئِيَتْ',
      '2d': 'اُرْتُئِيتُمَا',
      '3md': 'اُرْتُئِيَا',
      '3fd': 'اُرْتُئِيَتَا',
      '1p': 'اُرْتُئِينَا',
      '2mp': 'اُرْتُئِيتُمْ',
      '2fp': 'اُرْتُئِيتُنَّ',
      '3mp': 'اُرْتُؤُوا',
      '3fp': 'اُرْتُئِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-8")!, 'indicative')).toEqualT({
      '1s': 'أُرْتَأَى',
      '2ms': 'تُرْتَأَى',
      '2fs': 'تُرْتَأَيْنَ',
      '3ms': 'يُرْتَأَى',
      '3fs': 'تُرْتَأَى',
      '2d': 'تُرْتَأَيَانِ',
      '3md': 'يُرْتَأَيَانِ',
      '3fd': 'تُرْتَأَيَانِ',
      '1p': 'نُرْتَأَى',
      '2mp': 'تُرْتَأَوْنَ',
      '2fp': 'تُرْتَأَيْنَ',
      '3mp': 'يُرْتَأَوْنَ',
      '3fp': 'يُرْتَأَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-8")!, 'subjunctive')).toEqualT({
      '1s': 'أُرْتَأَى',
      '2ms': 'تُرْتَأَى',
      '2fs': 'تُرْتَأَيْ',
      '3ms': 'يُرْتَأَى',
      '3fs': 'تُرْتَأَى',
      '2d': 'تُرْتَأَيَا',
      '3md': 'يُرْتَأَيَا',
      '3fd': 'تُرْتَأَيَا',
      '1p': 'نُرْتَأَى',
      '2mp': 'تُرْتَأَوْا',
      '2fp': 'تُرْتَأَيْنَ',
      '3mp': 'يُرْتَأَوْا',
      '3fp': 'يُرْتَأَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-8")!, 'jussive')).toEqualT({
      '1s': 'أُرْتَأَ',
      '2ms': 'تُرْتَأَ',
      '2fs': 'تُرْتَأَيْ',
      '3ms': 'يُرْتَأَ',
      '3fs': 'تُرْتَأَ',
      '2d': 'تُرْتَأَيَا',
      '3md': 'يُرْتَأَيَا',
      '3fd': 'تُرْتَأَيَا',
      '1p': 'نُرْتَأَ',
      '2mp': 'تُرْتَأَوْا',
      '2fp': 'تُرْتَأَيْنَ',
      '3mp': 'يُرْتَأَوْا',
      '3fp': 'يُرْتَأَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("r'y-8")!)).toEqualT('مُرْتَأٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("r'y-8")!)).toEqualT('مُرْتَأًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("r'y-8")!)).toEqualT(['اِرْتِئَاء'])
  })
})
