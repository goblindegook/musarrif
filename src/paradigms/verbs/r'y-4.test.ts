import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("r'y-4 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("r'y-4")!)).toEqualT({
      '1s': 'أَرَيْتُ',
      '2ms': 'أَرَيْتَ',
      '2fs': 'أَرَيْتِ',
      '3ms': 'أَرَى',
      '3fs': 'أَرَتْ',
      '2d': 'أَرَيْتُمَا',
      '3md': 'أَرَيَا',
      '3fd': 'أَرَتَا',
      '1p': 'أَرَيْنَا',
      '2mp': 'أَرَيْتُمْ',
      '2fp': 'أَرَيْتُنَّ',
      '3mp': 'أَرَوْا',
      '3fp': 'أَرَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("r'y-4")!, 'indicative')).toEqualT({
      '1s': 'أُرِي',
      '2ms': 'تُرِي',
      '2fs': 'تُرِينَ',
      '3ms': 'يُرِي',
      '3fs': 'تُرِي',
      '2d': 'تُرِيَانِ',
      '3md': 'يُرِيَانِ',
      '3fd': 'تُرِيَانِ',
      '1p': 'نُرِي',
      '2mp': 'تُرُونَ',
      '2fp': 'تُرِينَ',
      '3mp': 'يُرُونَ',
      '3fp': 'يُرِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("r'y-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُرِيَ',
      '2ms': 'تُرِيَ',
      '2fs': 'تُرِي',
      '3ms': 'يُرِيَ',
      '3fs': 'تُرِيَ',
      '2d': 'تُرِيَا',
      '3md': 'يُرِيَا',
      '3fd': 'تُرِيَا',
      '1p': 'نُرِيَ',
      '2mp': 'تُرُوا',
      '2fp': 'تُرِينَ',
      '3mp': 'يُرُوا',
      '3fp': 'يُرِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("r'y-4")!, 'jussive')).toEqualT({
      '1s': 'أُرِ',
      '2ms': 'تُرِ',
      '2fs': 'تُرِي',
      '3ms': 'يُرِ',
      '3fs': 'تُرِ',
      '2d': 'تُرِيَا',
      '3md': 'يُرِيَا',
      '3fd': 'تُرِيَا',
      '1p': 'نُرِ',
      '2mp': 'تُرُوا',
      '2fp': 'تُرِينَ',
      '3mp': 'يُرُوا',
      '3fp': 'يُرِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("r'y-4")!)).toMatchObjectT({
      '2ms': 'أَرِ',
      '2fs': 'أَرِي',
      '2d': 'أَرِيَا',
      '2mp': 'أَرُوا',
      '2fp': 'أَرِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("r'y-4")!)).toEqualT({
      '1s': 'أُرِيتُ',
      '2ms': 'أُرِيتَ',
      '2fs': 'أُرِيتِ',
      '3ms': 'أُرِيَ',
      '3fs': 'أُرِيَتْ',
      '2d': 'أُرِيتُمَا',
      '3md': 'أُرِيَا',
      '3fd': 'أُرِيَتَا',
      '1p': 'أُرِينَا',
      '2mp': 'أُرِيتُمْ',
      '2fp': 'أُرِيتُنَّ',
      '3mp': 'أُرُوا',
      '3fp': 'أُرِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-4")!, 'indicative')).toEqualT({
      '1s': 'أُرَى',
      '2ms': 'تُرَى',
      '2fs': 'تُرَيْنَ',
      '3ms': 'يُرَى',
      '3fs': 'تُرَى',
      '2d': 'تُرَيَانِ',
      '3md': 'يُرَيَانِ',
      '3fd': 'تُرَيَانِ',
      '1p': 'نُرَى',
      '2mp': 'تُرَوْنَ',
      '2fp': 'تُرَيْنَ',
      '3mp': 'يُرَوْنَ',
      '3fp': 'يُرَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُرَى',
      '2ms': 'تُرَى',
      '2fs': 'تُرَيْ',
      '3ms': 'يُرَى',
      '3fs': 'تُرَى',
      '2d': 'تُرَيَا',
      '3md': 'يُرَيَا',
      '3fd': 'تُرَيَا',
      '1p': 'نُرَى',
      '2mp': 'تُرَوْا',
      '2fp': 'تُرَيْنَ',
      '3mp': 'يُرَوْا',
      '3fp': 'يُرَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-4")!, 'jussive')).toEqualT({
      '1s': 'أُرَ',
      '2ms': 'تُرَ',
      '2fs': 'تُرَيْ',
      '3ms': 'يُرَ',
      '3fs': 'تُرَ',
      '2d': 'تُرَيَا',
      '3md': 'يُرَيَا',
      '3fd': 'تُرَيَا',
      '1p': 'نُرَ',
      '2mp': 'تُرَوْا',
      '2fp': 'تُرَيْنَ',
      '3mp': 'يُرَوْا',
      '3fp': 'يُرَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("r'y-4")!)).toEqualT('مُرٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("r'y-4")!)).toEqualT('مُرًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("r'y-4")!))).toEqualT(new Set(['إِرَاءَة']))
  })
})
