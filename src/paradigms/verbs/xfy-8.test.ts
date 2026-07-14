import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('xfy-8', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('xfy-8')!)).toEqualT({
      '1s': 'اِخْتَفَيْتُ',
      '2ms': 'اِخْتَفَيْتَ',
      '2fs': 'اِخْتَفَيْتِ',
      '3ms': 'اِخْتَفَى',
      '3fs': 'اِخْتَفَتْ',
      '2d': 'اِخْتَفَيْتُمَا',
      '3md': 'اِخْتَفَيَا',
      '3fd': 'اِخْتَفَتَا',
      '1p': 'اِخْتَفَيْنَا',
      '2mp': 'اِخْتَفَيْتُمْ',
      '2fp': 'اِخْتَفَيْتُنَّ',
      '3mp': 'اِخْتَفَوْا',
      '3fp': 'اِخْتَفَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('xfy-8')!, 'indicative')).toEqualT({
      '1s': 'أَخْتَفِي',
      '2ms': 'تَخْتَفِي',
      '2fs': 'تَخْتَفِينَ',
      '3ms': 'يَخْتَفِي',
      '3fs': 'تَخْتَفِي',
      '2d': 'تَخْتَفِيَانِ',
      '3md': 'يَخْتَفِيَانِ',
      '3fd': 'تَخْتَفِيَانِ',
      '1p': 'نَخْتَفِي',
      '2mp': 'تَخْتَفُونَ',
      '2fp': 'تَخْتَفِينَ',
      '3mp': 'يَخْتَفُونَ',
      '3fp': 'يَخْتَفِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('xfy-8')!, 'subjunctive')).toEqualT({
      '1s': 'أَخْتَفِيَ',
      '2ms': 'تَخْتَفِيَ',
      '2fs': 'تَخْتَفِي',
      '3ms': 'يَخْتَفِيَ',
      '3fs': 'تَخْتَفِيَ',
      '2d': 'تَخْتَفِيَا',
      '3md': 'يَخْتَفِيَا',
      '3fd': 'تَخْتَفِيَا',
      '1p': 'نَخْتَفِيَ',
      '2mp': 'تَخْتَفُوا',
      '2fp': 'تَخْتَفِينَ',
      '3mp': 'يَخْتَفُوا',
      '3fp': 'يَخْتَفِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('xfy-8')!, 'jussive')).toEqualT({
      '1s': 'أَخْتَفِ',
      '2ms': 'تَخْتَفِ',
      '2fs': 'تَخْتَفِي',
      '3ms': 'يَخْتَفِ',
      '3fs': 'تَخْتَفِ',
      '2d': 'تَخْتَفِيَا',
      '3md': 'يَخْتَفِيَا',
      '3fd': 'تَخْتَفِيَا',
      '1p': 'نَخْتَفِ',
      '2mp': 'تَخْتَفُوا',
      '2fp': 'تَخْتَفِينَ',
      '3mp': 'يَخْتَفُوا',
      '3fp': 'يَخْتَفِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('xfy-8')!)).toMatchObjectT({
      '2ms': 'اِخْتَفِ',
      '2fs': 'اِخْتَفِي',
      '2d': 'اِخْتَفِيَا',
      '2mp': 'اِخْتَفُوا',
      '2fp': 'اِخْتَفِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('xfy-8')!)).toEqualT({
      '1s': 'اُخْتُفِيتُ',
      '2ms': 'اُخْتُفِيتَ',
      '2fs': 'اُخْتُفِيتِ',
      '3ms': 'اُخْتُفِيَ',
      '3fs': 'اُخْتُفِيَتْ',
      '2d': 'اُخْتُفِيتُمَا',
      '3md': 'اُخْتُفِيَا',
      '3fd': 'اُخْتُفِيَتَا',
      '1p': 'اُخْتُفِينَا',
      '2mp': 'اُخْتُفِيتُمْ',
      '2fp': 'اُخْتُفِيتُنَّ',
      '3mp': 'اُخْتُفُوا',
      '3fp': 'اُخْتُفِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('xfy-8')!, 'indicative')).toEqualT({
      '1s': 'أُخْتَفَى',
      '2ms': 'تُخْتَفَى',
      '2fs': 'تُخْتَفَيْنَ',
      '3ms': 'يُخْتَفَى',
      '3fs': 'تُخْتَفَى',
      '2d': 'تُخْتَفَيَانِ',
      '3md': 'يُخْتَفَيَانِ',
      '3fd': 'تُخْتَفَيَانِ',
      '1p': 'نُخْتَفَى',
      '2mp': 'تُخْتَفَوْنَ',
      '2fp': 'تُخْتَفَيْنَ',
      '3mp': 'يُخْتَفَوْنَ',
      '3fp': 'يُخْتَفَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('xfy-8')!, 'subjunctive')).toEqualT({
      '1s': 'أُخْتَفَى',
      '2ms': 'تُخْتَفَى',
      '2fs': 'تُخْتَفَيْ',
      '3ms': 'يُخْتَفَى',
      '3fs': 'تُخْتَفَى',
      '2d': 'تُخْتَفَيَا',
      '3md': 'يُخْتَفَيَا',
      '3fd': 'تُخْتَفَيَا',
      '1p': 'نُخْتَفَى',
      '2mp': 'تُخْتَفَوْا',
      '2fp': 'تُخْتَفَيْنَ',
      '3mp': 'يُخْتَفَوْا',
      '3fp': 'يُخْتَفَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('xfy-8')!, 'jussive')).toEqualT({
      '1s': 'أُخْتَفَ',
      '2ms': 'تُخْتَفَ',
      '2fs': 'تُخْتَفَيْ',
      '3ms': 'يُخْتَفَ',
      '3fs': 'تُخْتَفَ',
      '2d': 'تُخْتَفَيَا',
      '3md': 'يُخْتَفَيَا',
      '3fd': 'تُخْتَفَيَا',
      '1p': 'نُخْتَفَ',
      '2mp': 'تُخْتَفَوْا',
      '2fp': 'تُخْتَفَيْنَ',
      '3mp': 'يُخْتَفَوْا',
      '3fp': 'يُخْتَفَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('xfy-8')!)).toEqualT('مُخْتَفٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('xfy-8')!)).toEqualT('مُخْتَفًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('xfy-8')!)).toEqualT(['اِخْتِفَاء'])
  })
})
