import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wfy-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wfy-4')!)).toEqualT({
      '1s': 'أَوْفَيْتُ',
      '2ms': 'أَوْفَيْتَ',
      '2fs': 'أَوْفَيْتِ',
      '3ms': 'أَوْفَى',
      '3fs': 'أَوْفَتْ',
      '2d': 'أَوْفَيْتُمَا',
      '3md': 'أَوْفَيَا',
      '3fd': 'أَوْفَتَا',
      '1p': 'أَوْفَيْنَا',
      '2mp': 'أَوْفَيْتُمْ',
      '2fp': 'أَوْفَيْتُنَّ',
      '3mp': 'أَوْفَوْا',
      '3fp': 'أَوْفَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wfy-4')!, 'indicative')).toEqualT({
      '1s': 'أُوفِي',
      '2ms': 'تُوفِي',
      '2fs': 'تُوفِينَ',
      '3ms': 'يُوفِي',
      '3fs': 'تُوفِي',
      '2d': 'تُوفِيَانِ',
      '3md': 'يُوفِيَانِ',
      '3fd': 'تُوفِيَانِ',
      '1p': 'نُوفِي',
      '2mp': 'تُوفُونَ',
      '2fp': 'تُوفِينَ',
      '3mp': 'يُوفُونَ',
      '3fp': 'يُوفِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wfy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُوفِيَ',
      '2ms': 'تُوفِيَ',
      '2fs': 'تُوفِي',
      '3ms': 'يُوفِيَ',
      '3fs': 'تُوفِيَ',
      '2d': 'تُوفِيَا',
      '3md': 'يُوفِيَا',
      '3fd': 'تُوفِيَا',
      '1p': 'نُوفِيَ',
      '2mp': 'تُوفُوا',
      '2fp': 'تُوفِينَ',
      '3mp': 'يُوفُوا',
      '3fp': 'يُوفِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wfy-4')!, 'jussive')).toEqualT({
      '1s': 'أُوفِ',
      '2ms': 'تُوفِ',
      '2fs': 'تُوفِي',
      '3ms': 'يُوفِ',
      '3fs': 'تُوفِ',
      '2d': 'تُوفِيَا',
      '3md': 'يُوفِيَا',
      '3fd': 'تُوفِيَا',
      '1p': 'نُوفِ',
      '2mp': 'تُوفُوا',
      '2fp': 'تُوفِينَ',
      '3mp': 'يُوفُوا',
      '3fp': 'يُوفِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wfy-4')!)).toMatchObjectT({
      '2ms': 'أَوْفِ',
      '2fs': 'أَوْفِي',
      '2d': 'أَوْفِيَا',
      '2mp': 'أَوْفُوا',
      '2fp': 'أَوْفِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wfy-4')!)).toEqualT({
      '1s': 'أُوفِيتُ',
      '2ms': 'أُوفِيتَ',
      '2fs': 'أُوفِيتِ',
      '3ms': 'أُوفِيَ',
      '3fs': 'أُوفِيَتْ',
      '2d': 'أُوفِيتُمَا',
      '3md': 'أُوفِيَا',
      '3fd': 'أُوفِيَتَا',
      '1p': 'أُوفِينَا',
      '2mp': 'أُوفِيتُمْ',
      '2fp': 'أُوفِيتُنَّ',
      '3mp': 'أُوفُوا',
      '3fp': 'أُوفِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-4')!, 'indicative')).toEqualT({
      '1s': 'أُوفَى',
      '2ms': 'تُوفَى',
      '2fs': 'تُوفَيْنَ',
      '3ms': 'يُوفَى',
      '3fs': 'تُوفَى',
      '2d': 'تُوفَيَانِ',
      '3md': 'يُوفَيَانِ',
      '3fd': 'تُوفَيَانِ',
      '1p': 'نُوفَى',
      '2mp': 'تُوفَوْنَ',
      '2fp': 'تُوفَيْنَ',
      '3mp': 'يُوفَوْنَ',
      '3fp': 'يُوفَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُوفَى',
      '2ms': 'تُوفَى',
      '2fs': 'تُوفَيْ',
      '3ms': 'يُوفَى',
      '3fs': 'تُوفَى',
      '2d': 'تُوفَيَا',
      '3md': 'يُوفَيَا',
      '3fd': 'تُوفَيَا',
      '1p': 'نُوفَى',
      '2mp': 'تُوفَوْا',
      '2fp': 'تُوفَيْنَ',
      '3mp': 'يُوفَوْا',
      '3fp': 'يُوفَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-4')!, 'jussive')).toEqualT({
      '1s': 'أُوفَ',
      '2ms': 'تُوفَ',
      '2fs': 'تُوفَيْ',
      '3ms': 'يُوفَ',
      '3fs': 'تُوفَ',
      '2d': 'تُوفَيَا',
      '3md': 'يُوفَيَا',
      '3fd': 'تُوفَيَا',
      '1p': 'نُوفَ',
      '2mp': 'تُوفَوْا',
      '2fp': 'تُوفَيْنَ',
      '3mp': 'يُوفَوْا',
      '3fp': 'يُوفَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wfy-4')!)).toEqualT('مُوفٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wfy-4')!)).toEqualT('مُوفًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wfy-4')!)).toEqualT(['إِيفَاء'])
  })
})
