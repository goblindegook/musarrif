import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('msw-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('msw-4')!)).toEqualT({
      '1s': 'أَمْسَيْتُ',
      '2ms': 'أَمْسَيْتَ',
      '2fs': 'أَمْسَيْتِ',
      '3ms': 'أَمْسَى',
      '3fs': 'أَمْسَتْ',
      '2d': 'أَمْسَيْتُمَا',
      '3md': 'أَمْسَيَا',
      '3fd': 'أَمْسَتَا',
      '1p': 'أَمْسَيْنَا',
      '2mp': 'أَمْسَيْتُمْ',
      '2fp': 'أَمْسَيْتُنَّ',
      '3mp': 'أَمْسَوْا',
      '3fp': 'أَمْسَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('msw-4')!, 'indicative')).toEqualT({
      '1s': 'أُمْسِي',
      '2ms': 'تُمْسِي',
      '2fs': 'تُمْسِينَ',
      '3ms': 'يُمْسِي',
      '3fs': 'تُمْسِي',
      '2d': 'تُمْسِيَانِ',
      '3md': 'يُمْسِيَانِ',
      '3fd': 'تُمْسِيَانِ',
      '1p': 'نُمْسِي',
      '2mp': 'تُمْسُونَ',
      '2fp': 'تُمْسِينَ',
      '3mp': 'يُمْسُونَ',
      '3fp': 'يُمْسِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('msw-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُمْسِيَ',
      '2ms': 'تُمْسِيَ',
      '2fs': 'تُمْسِي',
      '3ms': 'يُمْسِيَ',
      '3fs': 'تُمْسِيَ',
      '2d': 'تُمْسِيَا',
      '3md': 'يُمْسِيَا',
      '3fd': 'تُمْسِيَا',
      '1p': 'نُمْسِيَ',
      '2mp': 'تُمْسُوا',
      '2fp': 'تُمْسِينَ',
      '3mp': 'يُمْسُوا',
      '3fp': 'يُمْسِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('msw-4')!, 'jussive')).toEqualT({
      '1s': 'أُمْسِ',
      '2ms': 'تُمْسِ',
      '2fs': 'تُمْسِي',
      '3ms': 'يُمْسِ',
      '3fs': 'تُمْسِ',
      '2d': 'تُمْسِيَا',
      '3md': 'يُمْسِيَا',
      '3fd': 'تُمْسِيَا',
      '1p': 'نُمْسِ',
      '2mp': 'تُمْسُوا',
      '2fp': 'تُمْسِينَ',
      '3mp': 'يُمْسُوا',
      '3fp': 'يُمْسِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('msw-4')!)).toMatchObjectT({
      '2ms': 'أَمْسِ',
      '2fs': 'أَمْسِي',
      '2d': 'أَمْسِيَا',
      '2mp': 'أَمْسُوا',
      '2fp': 'أَمْسِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('msw-4')!)).toEqualT({
      '1s': 'أُمْسِيتُ',
      '2ms': 'أُمْسِيتَ',
      '2fs': 'أُمْسِيتِ',
      '3ms': 'أُمْسِيَ',
      '3fs': 'أُمْسِيَتْ',
      '2d': 'أُمْسِيتُمَا',
      '3md': 'أُمْسِيَا',
      '3fd': 'أُمْسِيَتَا',
      '1p': 'أُمْسِينَا',
      '2mp': 'أُمْسِيتُمْ',
      '2fp': 'أُمْسِيتُنَّ',
      '3mp': 'أُمْسُوا',
      '3fp': 'أُمْسِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('msw-4')!, 'indicative')).toEqualT({
      '1s': 'أُمْسَى',
      '2ms': 'تُمْسَى',
      '2fs': 'تُمْسَيْنَ',
      '3ms': 'يُمْسَى',
      '3fs': 'تُمْسَى',
      '2d': 'تُمْسَيَانِ',
      '3md': 'يُمْسَيَانِ',
      '3fd': 'تُمْسَيَانِ',
      '1p': 'نُمْسَى',
      '2mp': 'تُمْسَوْنَ',
      '2fp': 'تُمْسَيْنَ',
      '3mp': 'يُمْسَوْنَ',
      '3fp': 'يُمْسَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('msw-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُمْسَى',
      '2ms': 'تُمْسَى',
      '2fs': 'تُمْسَيْ',
      '3ms': 'يُمْسَى',
      '3fs': 'تُمْسَى',
      '2d': 'تُمْسَيَا',
      '3md': 'يُمْسَيَا',
      '3fd': 'تُمْسَيَا',
      '1p': 'نُمْسَى',
      '2mp': 'تُمْسَوْا',
      '2fp': 'تُمْسَيْنَ',
      '3mp': 'يُمْسَوْا',
      '3fp': 'يُمْسَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('msw-4')!, 'jussive')).toEqualT({
      '1s': 'أُمْسَ',
      '2ms': 'تُمْسَ',
      '2fs': 'تُمْسَيْ',
      '3ms': 'يُمْسَ',
      '3fs': 'تُمْسَ',
      '2d': 'تُمْسَيَا',
      '3md': 'يُمْسَيَا',
      '3fd': 'تُمْسَيَا',
      '1p': 'نُمْسَ',
      '2mp': 'تُمْسَوْا',
      '2fp': 'تُمْسَيْنَ',
      '3mp': 'يُمْسَوْا',
      '3fp': 'يُمْسَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('msw-4')!)).toEqualT('مُمْسٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('msw-4')!)).toEqualT('مُمْسًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('msw-4')!)).toEqualT(['إِمْسَاء'])
  })
})
