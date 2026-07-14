import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("r'y-6", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("r'y-6")!)).toEqualT({
      '1s': 'تَرَاءَيْتُ',
      '2ms': 'تَرَاءَيْتَ',
      '2fs': 'تَرَاءَيْتِ',
      '3ms': 'تَرَاءَى',
      '3fs': 'تَرَاءَتْ',
      '2d': 'تَرَاءَيْتُمَا',
      '3md': 'تَرَاءَيَا',
      '3fd': 'تَرَاءَتَا',
      '1p': 'تَرَاءَيْنَا',
      '2mp': 'تَرَاءَيْتُمْ',
      '2fp': 'تَرَاءَيْتُنَّ',
      '3mp': 'تَرَاءَوْا',
      '3fp': 'تَرَاءَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("r'y-6")!, 'indicative')).toEqualT({
      '1s': 'أَتَرَاءَى',
      '2ms': 'تَتَرَاءَى',
      '2fs': 'تَتَرَاءَيْنَ',
      '3ms': 'يَتَرَاءَى',
      '3fs': 'تَتَرَاءَى',
      '2d': 'تَتَرَاءَيَانِ',
      '3md': 'يَتَرَاءَيَانِ',
      '3fd': 'تَتَرَاءَيَانِ',
      '1p': 'نَتَرَاءَى',
      '2mp': 'تَتَرَاءَوْنَ',
      '2fp': 'تَتَرَاءَيْنَ',
      '3mp': 'يَتَرَاءَوْنَ',
      '3fp': 'يَتَرَاءَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("r'y-6")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَرَاءَى',
      '2ms': 'تَتَرَاءَى',
      '2fs': 'تَتَرَاءَيْ',
      '3ms': 'يَتَرَاءَى',
      '3fs': 'تَتَرَاءَى',
      '2d': 'تَتَرَاءَيَا',
      '3md': 'يَتَرَاءَيَا',
      '3fd': 'تَتَرَاءَيَا',
      '1p': 'نَتَرَاءَى',
      '2mp': 'تَتَرَاءَوْا',
      '2fp': 'تَتَرَاءَيْنَ',
      '3mp': 'يَتَرَاءَوْا',
      '3fp': 'يَتَرَاءَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("r'y-6")!, 'jussive')).toEqualT({
      '1s': 'أَتَرَاءَ',
      '2ms': 'تَتَرَاءَ',
      '2fs': 'تَتَرَاءَيْ',
      '3ms': 'يَتَرَاءَ',
      '3fs': 'تَتَرَاءَ',
      '2d': 'تَتَرَاءَيَا',
      '3md': 'يَتَرَاءَيَا',
      '3fd': 'تَتَرَاءَيَا',
      '1p': 'نَتَرَاءَ',
      '2mp': 'تَتَرَاءَوْا',
      '2fp': 'تَتَرَاءَيْنَ',
      '3mp': 'يَتَرَاءَوْا',
      '3fp': 'يَتَرَاءَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("r'y-6")!)).toMatchObjectT({
      '2ms': 'تَرَاءَ',
      '2fs': 'تَرَاءَيْ',
      '2d': 'تَرَاءَيَا',
      '2mp': 'تَرَاءَوْا',
      '2fp': 'تَرَاءَيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("r'y-6")!)).toEqualT({
      '1s': 'تُرُوئِيتُ',
      '2ms': 'تُرُوئِيتَ',
      '2fs': 'تُرُوئِيتِ',
      '3ms': 'تُرُوئِيَ',
      '3fs': 'تُرُوئِيَتْ',
      '2d': 'تُرُوئِيتُمَا',
      '3md': 'تُرُوئِيَا',
      '3fd': 'تُرُوئِيَتَا',
      '1p': 'تُرُوئِينَا',
      '2mp': 'تُرُوئِيتُمْ',
      '2fp': 'تُرُوئِيتُنَّ',
      '3mp': 'تُرُوئُوا',
      '3fp': 'تُرُوئِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-6")!, 'indicative')).toEqualT({
      '1s': 'أُتَرَاءَى',
      '2ms': 'تُتَرَاءَى',
      '2fs': 'تُتَرَاءَيْنَ',
      '3ms': 'يُتَرَاءَى',
      '3fs': 'تُتَرَاءَى',
      '2d': 'تُتَرَاءَيَانِ',
      '3md': 'يُتَرَاءَيَانِ',
      '3fd': 'تُتَرَاءَيَانِ',
      '1p': 'نُتَرَاءَى',
      '2mp': 'تُتَرَاءَوْنَ',
      '2fp': 'تُتَرَاءَيْنَ',
      '3mp': 'يُتَرَاءَوْنَ',
      '3fp': 'يُتَرَاءَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-6")!, 'subjunctive')).toEqualT({
      '1s': 'أُتَرَاءَى',
      '2ms': 'تُتَرَاءَى',
      '2fs': 'تُتَرَاءَيْ',
      '3ms': 'يُتَرَاءَى',
      '3fs': 'تُتَرَاءَى',
      '2d': 'تُتَرَاءَيَا',
      '3md': 'يُتَرَاءَيَا',
      '3fd': 'تُتَرَاءَيَا',
      '1p': 'نُتَرَاءَى',
      '2mp': 'تُتَرَاءَوْا',
      '2fp': 'تُتَرَاءَيْنَ',
      '3mp': 'يُتَرَاءَوْا',
      '3fp': 'يُتَرَاءَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-6")!, 'jussive')).toEqualT({
      '1s': 'أُتَرَاءَ',
      '2ms': 'تُتَرَاءَ',
      '2fs': 'تُتَرَاءَيْ',
      '3ms': 'يُتَرَاءَ',
      '3fs': 'تُتَرَاءَ',
      '2d': 'تُتَرَاءَيَا',
      '3md': 'يُتَرَاءَيَا',
      '3fd': 'تُتَرَاءَيَا',
      '1p': 'نُتَرَاءَ',
      '2mp': 'تُتَرَاءَوْا',
      '2fp': 'تُتَرَاءَيْنَ',
      '3mp': 'يُتَرَاءَوْا',
      '3fp': 'يُتَرَاءَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("r'y-6")!)).toEqualT('مُتَرَاءٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("r'y-6")!)).toEqualT('مُتَرَاءًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("r'y-6")!)).toEqualT(['تَرَاءٍ'])
  })
})
