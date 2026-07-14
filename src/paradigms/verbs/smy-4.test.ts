import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('smy-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('smy-4')!)).toEqualT({
      '1s': 'أَسْمَيْتُ',
      '2ms': 'أَسْمَيْتَ',
      '2fs': 'أَسْمَيْتِ',
      '3ms': 'أَسْمَى',
      '3fs': 'أَسْمَتْ',
      '2d': 'أَسْمَيْتُمَا',
      '3md': 'أَسْمَيَا',
      '3fd': 'أَسْمَتَا',
      '1p': 'أَسْمَيْنَا',
      '2mp': 'أَسْمَيْتُمْ',
      '2fp': 'أَسْمَيْتُنَّ',
      '3mp': 'أَسْمَوْا',
      '3fp': 'أَسْمَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('smy-4')!, 'indicative')).toEqualT({
      '1s': 'أُسْمِي',
      '2ms': 'تُسْمِي',
      '2fs': 'تُسْمِينَ',
      '3ms': 'يُسْمِي',
      '3fs': 'تُسْمِي',
      '2d': 'تُسْمِيَانِ',
      '3md': 'يُسْمِيَانِ',
      '3fd': 'تُسْمِيَانِ',
      '1p': 'نُسْمِي',
      '2mp': 'تُسْمُونَ',
      '2fp': 'تُسْمِينَ',
      '3mp': 'يُسْمُونَ',
      '3fp': 'يُسْمِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('smy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْمِيَ',
      '2ms': 'تُسْمِيَ',
      '2fs': 'تُسْمِي',
      '3ms': 'يُسْمِيَ',
      '3fs': 'تُسْمِيَ',
      '2d': 'تُسْمِيَا',
      '3md': 'يُسْمِيَا',
      '3fd': 'تُسْمِيَا',
      '1p': 'نُسْمِيَ',
      '2mp': 'تُسْمُوا',
      '2fp': 'تُسْمِينَ',
      '3mp': 'يُسْمُوا',
      '3fp': 'يُسْمِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('smy-4')!, 'jussive')).toEqualT({
      '1s': 'أُسْمِ',
      '2ms': 'تُسْمِ',
      '2fs': 'تُسْمِي',
      '3ms': 'يُسْمِ',
      '3fs': 'تُسْمِ',
      '2d': 'تُسْمِيَا',
      '3md': 'يُسْمِيَا',
      '3fd': 'تُسْمِيَا',
      '1p': 'نُسْمِ',
      '2mp': 'تُسْمُوا',
      '2fp': 'تُسْمِينَ',
      '3mp': 'يُسْمُوا',
      '3fp': 'يُسْمِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('smy-4')!)).toMatchObjectT({
      '2ms': 'أَسْمِ',
      '2fs': 'أَسْمِي',
      '2d': 'أَسْمِيَا',
      '2mp': 'أَسْمُوا',
      '2fp': 'أَسْمِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('smy-4')!)).toEqualT({
      '1s': 'أُسْمِيتُ',
      '2ms': 'أُسْمِيتَ',
      '2fs': 'أُسْمِيتِ',
      '3ms': 'أُسْمِيَ',
      '3fs': 'أُسْمِيَتْ',
      '2d': 'أُسْمِيتُمَا',
      '3md': 'أُسْمِيَا',
      '3fd': 'أُسْمِيَتَا',
      '1p': 'أُسْمِينَا',
      '2mp': 'أُسْمِيتُمْ',
      '2fp': 'أُسْمِيتُنَّ',
      '3mp': 'أُسْمُوا',
      '3fp': 'أُسْمِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('smy-4')!, 'indicative')).toEqualT({
      '1s': 'أُسْمَى',
      '2ms': 'تُسْمَى',
      '2fs': 'تُسْمَيْنَ',
      '3ms': 'يُسْمَى',
      '3fs': 'تُسْمَى',
      '2d': 'تُسْمَيَانِ',
      '3md': 'يُسْمَيَانِ',
      '3fd': 'تُسْمَيَانِ',
      '1p': 'نُسْمَى',
      '2mp': 'تُسْمَوْنَ',
      '2fp': 'تُسْمَيْنَ',
      '3mp': 'يُسْمَوْنَ',
      '3fp': 'يُسْمَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('smy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْمَى',
      '2ms': 'تُسْمَى',
      '2fs': 'تُسْمَيْ',
      '3ms': 'يُسْمَى',
      '3fs': 'تُسْمَى',
      '2d': 'تُسْمَيَا',
      '3md': 'يُسْمَيَا',
      '3fd': 'تُسْمَيَا',
      '1p': 'نُسْمَى',
      '2mp': 'تُسْمَوْا',
      '2fp': 'تُسْمَيْنَ',
      '3mp': 'يُسْمَوْا',
      '3fp': 'يُسْمَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('smy-4')!, 'jussive')).toEqualT({
      '1s': 'أُسْمَ',
      '2ms': 'تُسْمَ',
      '2fs': 'تُسْمَيْ',
      '3ms': 'يُسْمَ',
      '3fs': 'تُسْمَ',
      '2d': 'تُسْمَيَا',
      '3md': 'يُسْمَيَا',
      '3fd': 'تُسْمَيَا',
      '1p': 'نُسْمَ',
      '2mp': 'تُسْمَوْا',
      '2fp': 'تُسْمَيْنَ',
      '3mp': 'يُسْمَوْا',
      '3fp': 'يُسْمَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('smy-4')!)).toEqualT('مُسْمٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('smy-4')!)).toEqualT('مُسْمًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('smy-4')!)).toEqualT(['إِسْمَاء'])
  })
})
