import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("wqy-8", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("wqy-8")!)).toEqualT({
      '1s': 'اِتَّقَيْتُ',
      '2ms': 'اِتَّقَيْتَ',
      '2fs': 'اِتَّقَيْتِ',
      '3ms': 'اِتَّقَى',
      '3fs': 'اِتَّقَتْ',
      '2d': 'اِتَّقَيْتُمَا',
      '3md': 'اِتَّقَيَا',
      '3fd': 'اِتَّقَتَا',
      '1p': 'اِتَّقَيْنَا',
      '2mp': 'اِتَّقَيْتُمْ',
      '2fp': 'اِتَّقَيْتُنَّ',
      '3mp': 'اِتَّقَوْا',
      '3fp': 'اِتَّقَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("wqy-8")!, 'indicative')).toEqualT({
      '1s': 'أَتَّقِي',
      '2ms': 'تَتَّقِي',
      '2fs': 'تَتَّقِينَ',
      '3ms': 'يَتَّقِي',
      '3fs': 'تَتَّقِي',
      '2d': 'تَتَّقِيَانِ',
      '3md': 'يَتَّقِيَانِ',
      '3fd': 'تَتَّقِيَانِ',
      '1p': 'نَتَّقِي',
      '2mp': 'تَتَّقُونَ',
      '2fp': 'تَتَّقِينَ',
      '3mp': 'يَتَّقُونَ',
      '3fp': 'يَتَّقِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("wqy-8")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَّقِيَ',
      '2ms': 'تَتَّقِيَ',
      '2fs': 'تَتَّقِي',
      '3ms': 'يَتَّقِيَ',
      '3fs': 'تَتَّقِيَ',
      '2d': 'تَتَّقِيَا',
      '3md': 'يَتَّقِيَا',
      '3fd': 'تَتَّقِيَا',
      '1p': 'نَتَّقِيَ',
      '2mp': 'تَتَّقُوا',
      '2fp': 'تَتَّقِينَ',
      '3mp': 'يَتَّقُوا',
      '3fp': 'يَتَّقِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("wqy-8")!, 'jussive')).toEqualT({
      '1s': 'أَتَّقِ',
      '2ms': 'تَتَّقِ',
      '2fs': 'تَتَّقِي',
      '3ms': 'يَتَّقِ',
      '3fs': 'تَتَّقِ',
      '2d': 'تَتَّقِيَا',
      '3md': 'يَتَّقِيَا',
      '3fd': 'تَتَّقِيَا',
      '1p': 'نَتَّقِ',
      '2mp': 'تَتَّقُوا',
      '2fp': 'تَتَّقِينَ',
      '3mp': 'يَتَّقُوا',
      '3fp': 'يَتَّقِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("wqy-8")!)).toMatchObjectT({
      '2ms': 'اِتَّقِ',
      '2fs': 'اِتَّقِي',
      '2d': 'اِتَّقِيَا',
      '2mp': 'اِتَّقُوا',
      '2fp': 'اِتَّقِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("wqy-8")!)).toEqualT({
      '1s': 'اُتُّقِيتُ',
      '2ms': 'اُتُّقِيتَ',
      '2fs': 'اُتُّقِيتِ',
      '3ms': 'اُتُّقِيَ',
      '3fs': 'اُتُّقِيَتْ',
      '2d': 'اُتُّقِيتُمَا',
      '3md': 'اُتُّقِيَا',
      '3fd': 'اُتُّقِيَتَا',
      '1p': 'اُتُّقِينَا',
      '2mp': 'اُتُّقِيتُمْ',
      '2fp': 'اُتُّقِيتُنَّ',
      '3mp': 'اُتُّقُوا',
      '3fp': 'اُتُّقِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("wqy-8")!, 'indicative')).toEqualT({
      '1s': 'أُتَّقَى',
      '2ms': 'تُتَّقَى',
      '2fs': 'تُتَّقَيْنَ',
      '3ms': 'يُتَّقَى',
      '3fs': 'تُتَّقَى',
      '2d': 'تُتَّقَيَانِ',
      '3md': 'يُتَّقَيَانِ',
      '3fd': 'تُتَّقَيَانِ',
      '1p': 'نُتَّقَى',
      '2mp': 'تُتَّقَوْنَ',
      '2fp': 'تُتَّقَيْنَ',
      '3mp': 'يُتَّقَوْنَ',
      '3fp': 'يُتَّقَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wqy-8")!, 'subjunctive')).toEqualT({
      '1s': 'أُتَّقَى',
      '2ms': 'تُتَّقَى',
      '2fs': 'تُتَّقَيْ',
      '3ms': 'يُتَّقَى',
      '3fs': 'تُتَّقَى',
      '2d': 'تُتَّقَيَا',
      '3md': 'يُتَّقَيَا',
      '3fd': 'تُتَّقَيَا',
      '1p': 'نُتَّقَى',
      '2mp': 'تُتَّقَوْا',
      '2fp': 'تُتَّقَيْنَ',
      '3mp': 'يُتَّقَوْا',
      '3fp': 'يُتَّقَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wqy-8")!, 'jussive')).toEqualT({
      '1s': 'أُتَّقَ',
      '2ms': 'تُتَّقَ',
      '2fs': 'تُتَّقَيْ',
      '3ms': 'يُتَّقَ',
      '3fs': 'تُتَّقَ',
      '2d': 'تُتَّقَيَا',
      '3md': 'يُتَّقَيَا',
      '3fd': 'تُتَّقَيَا',
      '1p': 'نُتَّقَ',
      '2mp': 'تُتَّقَوْا',
      '2fp': 'تُتَّقَيْنَ',
      '3mp': 'يُتَّقَوْا',
      '3fp': 'يُتَّقَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("wqy-8")!)).toEqualT('مُتَّقٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("wqy-8")!)).toEqualT('مُتَّقًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("wqy-8")!)).toEqualT(['اِتِّقَاء', 'تُقَاة', 'تُقْيَة'])
  })
})
