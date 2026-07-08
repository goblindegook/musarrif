import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("w'y-1", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("w'y-1")!)).toEqualT({
      '1s': 'وَأَيْتُ',
      '2ms': 'وَأَيْتَ',
      '2fs': 'وَأَيْتِ',
      '3ms': 'وَأَى',
      '3fs': 'وَأَتْ',
      '2d': 'وَأَيْتُمَا',
      '3md': 'وَأَيَا',
      '3fd': 'وَأَتَا',
      '1p': 'وَأَيْنَا',
      '2mp': 'وَأَيْتُمْ',
      '2fp': 'وَأَيْتُنَّ',
      '3mp': 'وَأَوْا',
      '3fp': 'وَأَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("w'y-1")!, 'indicative')).toEqualT({
      '1s': 'أَئِي',
      '2ms': 'تَئِي',
      '2fs': 'تَئِينَ',
      '3ms': 'يَئِي',
      '3fs': 'تَئِي',
      '2d': 'تَئِيَانِ',
      '3md': 'يَئِيَانِ',
      '3fd': 'تَئِيَانِ',
      '1p': 'نَئِي',
      '2mp': 'تَؤُونَ',
      '2fp': 'تَئِينَ',
      '3mp': 'يَؤُونَ',
      '3fp': 'يَئِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("w'y-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَئِيَ',
      '2ms': 'تَئِيَ',
      '2fs': 'تَئِي',
      '3ms': 'يَئِيَ',
      '3fs': 'تَئِيَ',
      '2d': 'تَئِيَا',
      '3md': 'يَئِيَا',
      '3fd': 'تَئِيَا',
      '1p': 'نَئِيَ',
      '2mp': 'تَؤُوا',
      '2fp': 'تَئِينَ',
      '3mp': 'يَؤُوا',
      '3fp': 'يَئِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("w'y-1")!, 'jussive')).toEqualT({
      '1s': 'أَأِ',
      '2ms': 'تَأِ',
      '2fs': 'تَئِي',
      '3ms': 'يَأِ',
      '3fs': 'تَأِ',
      '2d': 'تَئِيَا',
      '3md': 'يَئِيَا',
      '3fd': 'تَئِيَا',
      '1p': 'نَأِ',
      '2mp': 'تَؤُوا',
      '2fp': 'تَئِينَ',
      '3mp': 'يَؤُوا',
      '3fp': 'يَئِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("w'y-1")!)).toMatchObjectT({
      '2ms': 'إِ',
      '2fs': 'إِي',
      '2d': 'إِيَا',
      '2mp': 'أُوا',
      '2fp': 'إِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("w'y-1")!)).toEqualT({
      '1s': 'وُئِيتُ',
      '2ms': 'وُئِيتَ',
      '2fs': 'وُئِيتِ',
      '3ms': 'وُئِيَ',
      '3fs': 'وُئِيَتْ',
      '2d': 'وُئِيتُمَا',
      '3md': 'وُئِيَا',
      '3fd': 'وُئِيَتَا',
      '1p': 'وُئِينَا',
      '2mp': 'وُئِيتُمْ',
      '2fp': 'وُئِيتُنَّ',
      '3mp': 'وُؤُوا',
      '3fp': 'وُئِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("w'y-1")!, 'indicative')).toEqualT({
      '1s': 'أُوءَى',
      '2ms': 'تُوءَى',
      '2fs': 'تُوءَيْنَ',
      '3ms': 'يُوءَى',
      '3fs': 'تُوءَى',
      '2d': 'تُوءَيَانِ',
      '3md': 'يُوءَيَانِ',
      '3fd': 'تُوءَيَانِ',
      '1p': 'نُوءَى',
      '2mp': 'تُوءَوْنَ',
      '2fp': 'تُوءَيْنَ',
      '3mp': 'يُوءَوْنَ',
      '3fp': 'يُوءَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("w'y-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُوءَى',
      '2ms': 'تُوءَى',
      '2fs': 'تُوءَيْ',
      '3ms': 'يُوءَى',
      '3fs': 'تُوءَى',
      '2d': 'تُوءَيَا',
      '3md': 'يُوءَيَا',
      '3fd': 'تُوءَيَا',
      '1p': 'نُوءَى',
      '2mp': 'تُوءَوْا',
      '2fp': 'تُوءَيْنَ',
      '3mp': 'يُوءَوْا',
      '3fp': 'يُوءَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("w'y-1")!, 'jussive')).toEqualT({
      '1s': 'أُوءَ',
      '2ms': 'تُوءَ',
      '2fs': 'تُوءَيْ',
      '3ms': 'يُوءَ',
      '3fs': 'تُوءَ',
      '2d': 'تُوءَيَا',
      '3md': 'يُوءَيَا',
      '3fd': 'تُوءَيَا',
      '1p': 'نُوءَ',
      '2mp': 'تُوءَوْا',
      '2fp': 'تُوءَيْنَ',
      '3mp': 'يُوءَوْا',
      '3fp': 'يُوءَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("w'y-1")!)).toEqualT('وَاءٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("w'y-1")!)).toEqualT('مَوْئِيّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("w'y-1")!)).toEqualT(['وَأْي'])
  })
})
