import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('rdy-8', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('rdy-8')!)).toEqualT({
      '1s': 'اِرْتَدَيْتُ',
      '2ms': 'اِرْتَدَيْتَ',
      '2fs': 'اِرْتَدَيْتِ',
      '3ms': 'اِرْتَدَى',
      '3fs': 'اِرْتَدَتْ',
      '2d': 'اِرْتَدَيْتُمَا',
      '3md': 'اِرْتَدَيَا',
      '3fd': 'اِرْتَدَتَا',
      '1p': 'اِرْتَدَيْنَا',
      '2mp': 'اِرْتَدَيْتُمْ',
      '2fp': 'اِرْتَدَيْتُنَّ',
      '3mp': 'اِرْتَدَوْا',
      '3fp': 'اِرْتَدَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('rdy-8')!, 'indicative')).toEqualT({
      '1s': 'أَرْتَدِي',
      '2ms': 'تَرْتَدِي',
      '2fs': 'تَرْتَدِينَ',
      '3ms': 'يَرْتَدِي',
      '3fs': 'تَرْتَدِي',
      '2d': 'تَرْتَدِيَانِ',
      '3md': 'يَرْتَدِيَانِ',
      '3fd': 'تَرْتَدِيَانِ',
      '1p': 'نَرْتَدِي',
      '2mp': 'تَرْتَدُونَ',
      '2fp': 'تَرْتَدِينَ',
      '3mp': 'يَرْتَدُونَ',
      '3fp': 'يَرْتَدِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('rdy-8')!, 'subjunctive')).toEqualT({
      '1s': 'أَرْتَدِيَ',
      '2ms': 'تَرْتَدِيَ',
      '2fs': 'تَرْتَدِي',
      '3ms': 'يَرْتَدِيَ',
      '3fs': 'تَرْتَدِيَ',
      '2d': 'تَرْتَدِيَا',
      '3md': 'يَرْتَدِيَا',
      '3fd': 'تَرْتَدِيَا',
      '1p': 'نَرْتَدِيَ',
      '2mp': 'تَرْتَدُوا',
      '2fp': 'تَرْتَدِينَ',
      '3mp': 'يَرْتَدُوا',
      '3fp': 'يَرْتَدِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('rdy-8')!, 'jussive')).toEqualT({
      '1s': 'أَرْتَدِ',
      '2ms': 'تَرْتَدِ',
      '2fs': 'تَرْتَدِي',
      '3ms': 'يَرْتَدِ',
      '3fs': 'تَرْتَدِ',
      '2d': 'تَرْتَدِيَا',
      '3md': 'يَرْتَدِيَا',
      '3fd': 'تَرْتَدِيَا',
      '1p': 'نَرْتَدِ',
      '2mp': 'تَرْتَدُوا',
      '2fp': 'تَرْتَدِينَ',
      '3mp': 'يَرْتَدُوا',
      '3fp': 'يَرْتَدِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('rdy-8')!)).toMatchObjectT({
      '2ms': 'اِرْتَدِ',
      '2fs': 'اِرْتَدِي',
      '2d': 'اِرْتَدِيَا',
      '2mp': 'اِرْتَدُوا',
      '2fp': 'اِرْتَدِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('rdy-8')!)).toEqualT({
      '1s': 'اُرْتُدِيتُ',
      '2ms': 'اُرْتُدِيتَ',
      '2fs': 'اُرْتُدِيتِ',
      '3ms': 'اُرْتُدِيَ',
      '3fs': 'اُرْتُدِيَتْ',
      '2d': 'اُرْتُدِيتُمَا',
      '3md': 'اُرْتُدِيَا',
      '3fd': 'اُرْتُدِيَتَا',
      '1p': 'اُرْتُدِينَا',
      '2mp': 'اُرْتُدِيتُمْ',
      '2fp': 'اُرْتُدِيتُنَّ',
      '3mp': 'اُرْتُدُوا',
      '3fp': 'اُرْتُدِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('rdy-8')!, 'indicative')).toEqualT({
      '1s': 'أُرْتَدَى',
      '2ms': 'تُرْتَدَى',
      '2fs': 'تُرْتَدَيْنَ',
      '3ms': 'يُرْتَدَى',
      '3fs': 'تُرْتَدَى',
      '2d': 'تُرْتَدَيَانِ',
      '3md': 'يُرْتَدَيَانِ',
      '3fd': 'تُرْتَدَيَانِ',
      '1p': 'نُرْتَدَى',
      '2mp': 'تُرْتَدَوْنَ',
      '2fp': 'تُرْتَدَيْنَ',
      '3mp': 'يُرْتَدَوْنَ',
      '3fp': 'يُرْتَدَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('rdy-8')!, 'subjunctive')).toEqualT({
      '1s': 'أُرْتَدَى',
      '2ms': 'تُرْتَدَى',
      '2fs': 'تُرْتَدَيْ',
      '3ms': 'يُرْتَدَى',
      '3fs': 'تُرْتَدَى',
      '2d': 'تُرْتَدَيَا',
      '3md': 'يُرْتَدَيَا',
      '3fd': 'تُرْتَدَيَا',
      '1p': 'نُرْتَدَى',
      '2mp': 'تُرْتَدَوْا',
      '2fp': 'تُرْتَدَيْنَ',
      '3mp': 'يُرْتَدَوْا',
      '3fp': 'يُرْتَدَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('rdy-8')!, 'jussive')).toEqualT({
      '1s': 'أُرْتَدَ',
      '2ms': 'تُرْتَدَ',
      '2fs': 'تُرْتَدَيْ',
      '3ms': 'يُرْتَدَ',
      '3fs': 'تُرْتَدَ',
      '2d': 'تُرْتَدَيَا',
      '3md': 'يُرْتَدَيَا',
      '3fd': 'تُرْتَدَيَا',
      '1p': 'نُرْتَدَ',
      '2mp': 'تُرْتَدَوْا',
      '2fp': 'تُرْتَدَيْنَ',
      '3mp': 'يُرْتَدَوْا',
      '3fp': 'يُرْتَدَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('rdy-8')!)).toEqualT('مُرْتَدٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('rdy-8')!)).toEqualT('مُرْتَدًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('rdy-8')!)).toEqualT(['اِرْتِدَاء'])
  })
})
