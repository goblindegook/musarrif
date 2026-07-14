import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('qDy-8', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('qDy-8')!)).toEqualT({
      '1s': 'اِقْتَضَيْتُ',
      '2ms': 'اِقْتَضَيْتَ',
      '2fs': 'اِقْتَضَيْتِ',
      '3ms': 'اِقْتَضَى',
      '3fs': 'اِقْتَضَتْ',
      '2d': 'اِقْتَضَيْتُمَا',
      '3md': 'اِقْتَضَيَا',
      '3fd': 'اِقْتَضَتَا',
      '1p': 'اِقْتَضَيْنَا',
      '2mp': 'اِقْتَضَيْتُمْ',
      '2fp': 'اِقْتَضَيْتُنَّ',
      '3mp': 'اِقْتَضَوْا',
      '3fp': 'اِقْتَضَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('qDy-8')!, 'indicative')).toEqualT({
      '1s': 'أَقْتَضِي',
      '2ms': 'تَقْتَضِي',
      '2fs': 'تَقْتَضِينَ',
      '3ms': 'يَقْتَضِي',
      '3fs': 'تَقْتَضِي',
      '2d': 'تَقْتَضِيَانِ',
      '3md': 'يَقْتَضِيَانِ',
      '3fd': 'تَقْتَضِيَانِ',
      '1p': 'نَقْتَضِي',
      '2mp': 'تَقْتَضُونَ',
      '2fp': 'تَقْتَضِينَ',
      '3mp': 'يَقْتَضُونَ',
      '3fp': 'يَقْتَضِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('qDy-8')!, 'subjunctive')).toEqualT({
      '1s': 'أَقْتَضِيَ',
      '2ms': 'تَقْتَضِيَ',
      '2fs': 'تَقْتَضِي',
      '3ms': 'يَقْتَضِيَ',
      '3fs': 'تَقْتَضِيَ',
      '2d': 'تَقْتَضِيَا',
      '3md': 'يَقْتَضِيَا',
      '3fd': 'تَقْتَضِيَا',
      '1p': 'نَقْتَضِيَ',
      '2mp': 'تَقْتَضُوا',
      '2fp': 'تَقْتَضِينَ',
      '3mp': 'يَقْتَضُوا',
      '3fp': 'يَقْتَضِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('qDy-8')!, 'jussive')).toEqualT({
      '1s': 'أَقْتَضِ',
      '2ms': 'تَقْتَضِ',
      '2fs': 'تَقْتَضِي',
      '3ms': 'يَقْتَضِ',
      '3fs': 'تَقْتَضِ',
      '2d': 'تَقْتَضِيَا',
      '3md': 'يَقْتَضِيَا',
      '3fd': 'تَقْتَضِيَا',
      '1p': 'نَقْتَضِ',
      '2mp': 'تَقْتَضُوا',
      '2fp': 'تَقْتَضِينَ',
      '3mp': 'يَقْتَضُوا',
      '3fp': 'يَقْتَضِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('qDy-8')!)).toMatchObjectT({
      '2ms': 'اِقْتَضِ',
      '2fs': 'اِقْتَضِي',
      '2d': 'اِقْتَضِيَا',
      '2mp': 'اِقْتَضُوا',
      '2fp': 'اِقْتَضِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('qDy-8')!)).toEqualT({
      '1s': 'اُقْتُضِيتُ',
      '2ms': 'اُقْتُضِيتَ',
      '2fs': 'اُقْتُضِيتِ',
      '3ms': 'اُقْتُضِيَ',
      '3fs': 'اُقْتُضِيَتْ',
      '2d': 'اُقْتُضِيتُمَا',
      '3md': 'اُقْتُضِيَا',
      '3fd': 'اُقْتُضِيَتَا',
      '1p': 'اُقْتُضِينَا',
      '2mp': 'اُقْتُضِيتُمْ',
      '2fp': 'اُقْتُضِيتُنَّ',
      '3mp': 'اُقْتُضُوا',
      '3fp': 'اُقْتُضِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('qDy-8')!, 'indicative')).toEqualT({
      '1s': 'أُقْتَضَى',
      '2ms': 'تُقْتَضَى',
      '2fs': 'تُقْتَضَيْنَ',
      '3ms': 'يُقْتَضَى',
      '3fs': 'تُقْتَضَى',
      '2d': 'تُقْتَضَيَانِ',
      '3md': 'يُقْتَضَيَانِ',
      '3fd': 'تُقْتَضَيَانِ',
      '1p': 'نُقْتَضَى',
      '2mp': 'تُقْتَضَوْنَ',
      '2fp': 'تُقْتَضَيْنَ',
      '3mp': 'يُقْتَضَوْنَ',
      '3fp': 'يُقْتَضَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('qDy-8')!, 'subjunctive')).toEqualT({
      '1s': 'أُقْتَضَى',
      '2ms': 'تُقْتَضَى',
      '2fs': 'تُقْتَضَيْ',
      '3ms': 'يُقْتَضَى',
      '3fs': 'تُقْتَضَى',
      '2d': 'تُقْتَضَيَا',
      '3md': 'يُقْتَضَيَا',
      '3fd': 'تُقْتَضَيَا',
      '1p': 'نُقْتَضَى',
      '2mp': 'تُقْتَضَوْا',
      '2fp': 'تُقْتَضَيْنَ',
      '3mp': 'يُقْتَضَوْا',
      '3fp': 'يُقْتَضَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('qDy-8')!, 'jussive')).toEqualT({
      '1s': 'أُقْتَضَ',
      '2ms': 'تُقْتَضَ',
      '2fs': 'تُقْتَضَيْ',
      '3ms': 'يُقْتَضَ',
      '3fs': 'تُقْتَضَ',
      '2d': 'تُقْتَضَيَا',
      '3md': 'يُقْتَضَيَا',
      '3fd': 'تُقْتَضَيَا',
      '1p': 'نُقْتَضَ',
      '2mp': 'تُقْتَضَوْا',
      '2fp': 'تُقْتَضَيْنَ',
      '3mp': 'يُقْتَضَوْا',
      '3fp': 'يُقْتَضَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('qDy-8')!)).toEqualT('مُقْتَضٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('qDy-8')!)).toEqualT('مُقْتَضًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('qDy-8')!)).toEqualT(['اِقْتِضَاء'])
  })
})
