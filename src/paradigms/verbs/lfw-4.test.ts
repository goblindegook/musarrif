import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('lfw-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('lfw-4')!)).toEqualT({
      '1s': 'أَلْفَيْتُ',
      '2ms': 'أَلْفَيْتَ',
      '2fs': 'أَلْفَيْتِ',
      '3ms': 'أَلْفَى',
      '3fs': 'أَلْفَتْ',
      '2d': 'أَلْفَيْتُمَا',
      '3md': 'أَلْفَيَا',
      '3fd': 'أَلْفَتَا',
      '1p': 'أَلْفَيْنَا',
      '2mp': 'أَلْفَيْتُمْ',
      '2fp': 'أَلْفَيْتُنَّ',
      '3mp': 'أَلْفَوْا',
      '3fp': 'أَلْفَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('lfw-4')!, 'indicative')).toEqualT({
      '1s': 'أُلْفِي',
      '2ms': 'تُلْفِي',
      '2fs': 'تُلْفِينَ',
      '3ms': 'يُلْفِي',
      '3fs': 'تُلْفِي',
      '2d': 'تُلْفِيَانِ',
      '3md': 'يُلْفِيَانِ',
      '3fd': 'تُلْفِيَانِ',
      '1p': 'نُلْفِي',
      '2mp': 'تُلْفُونَ',
      '2fp': 'تُلْفِينَ',
      '3mp': 'يُلْفُونَ',
      '3fp': 'يُلْفِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('lfw-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُلْفِيَ',
      '2ms': 'تُلْفِيَ',
      '2fs': 'تُلْفِي',
      '3ms': 'يُلْفِيَ',
      '3fs': 'تُلْفِيَ',
      '2d': 'تُلْفِيَا',
      '3md': 'يُلْفِيَا',
      '3fd': 'تُلْفِيَا',
      '1p': 'نُلْفِيَ',
      '2mp': 'تُلْفُوا',
      '2fp': 'تُلْفِينَ',
      '3mp': 'يُلْفُوا',
      '3fp': 'يُلْفِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('lfw-4')!, 'jussive')).toEqualT({
      '1s': 'أُلْفِ',
      '2ms': 'تُلْفِ',
      '2fs': 'تُلْفِي',
      '3ms': 'يُلْفِ',
      '3fs': 'تُلْفِ',
      '2d': 'تُلْفِيَا',
      '3md': 'يُلْفِيَا',
      '3fd': 'تُلْفِيَا',
      '1p': 'نُلْفِ',
      '2mp': 'تُلْفُوا',
      '2fp': 'تُلْفِينَ',
      '3mp': 'يُلْفُوا',
      '3fp': 'يُلْفِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('lfw-4')!)).toMatchObjectT({
      '2ms': 'أَلْفِ',
      '2fs': 'أَلْفِي',
      '2d': 'أَلْفِيَا',
      '2mp': 'أَلْفُوا',
      '2fp': 'أَلْفِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('lfw-4')!)).toEqualT({
      '1s': 'أُلْفِيتُ',
      '2ms': 'أُلْفِيتَ',
      '2fs': 'أُلْفِيتِ',
      '3ms': 'أُلْفِيَ',
      '3fs': 'أُلْفِيَتْ',
      '2d': 'أُلْفِيتُمَا',
      '3md': 'أُلْفِيَا',
      '3fd': 'أُلْفِيَتَا',
      '1p': 'أُلْفِينَا',
      '2mp': 'أُلْفِيتُمْ',
      '2fp': 'أُلْفِيتُنَّ',
      '3mp': 'أُلْفُوا',
      '3fp': 'أُلْفِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('lfw-4')!, 'indicative')).toEqualT({
      '1s': 'أُلْفَى',
      '2ms': 'تُلْفَى',
      '2fs': 'تُلْفَيْنَ',
      '3ms': 'يُلْفَى',
      '3fs': 'تُلْفَى',
      '2d': 'تُلْفَيَانِ',
      '3md': 'يُلْفَيَانِ',
      '3fd': 'تُلْفَيَانِ',
      '1p': 'نُلْفَى',
      '2mp': 'تُلْفَوْنَ',
      '2fp': 'تُلْفَيْنَ',
      '3mp': 'يُلْفَوْنَ',
      '3fp': 'يُلْفَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('lfw-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُلْفَى',
      '2ms': 'تُلْفَى',
      '2fs': 'تُلْفَيْ',
      '3ms': 'يُلْفَى',
      '3fs': 'تُلْفَى',
      '2d': 'تُلْفَيَا',
      '3md': 'يُلْفَيَا',
      '3fd': 'تُلْفَيَا',
      '1p': 'نُلْفَى',
      '2mp': 'تُلْفَوْا',
      '2fp': 'تُلْفَيْنَ',
      '3mp': 'يُلْفَوْا',
      '3fp': 'يُلْفَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('lfw-4')!, 'jussive')).toEqualT({
      '1s': 'أُلْفَ',
      '2ms': 'تُلْفَ',
      '2fs': 'تُلْفَيْ',
      '3ms': 'يُلْفَ',
      '3fs': 'تُلْفَ',
      '2d': 'تُلْفَيَا',
      '3md': 'يُلْفَيَا',
      '3fd': 'تُلْفَيَا',
      '1p': 'نُلْفَ',
      '2mp': 'تُلْفَوْا',
      '2fp': 'تُلْفَيْنَ',
      '3mp': 'يُلْفَوْا',
      '3fp': 'يُلْفَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('lfw-4')!)).toEqualT('مُلْفٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('lfw-4')!)).toEqualT('مُلْفًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('lfw-4')!)).toEqualT(['إِلْفَاء'])
  })
})
