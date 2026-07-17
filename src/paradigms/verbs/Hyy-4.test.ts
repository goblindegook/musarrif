import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Hyy-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hyy-4')!)).toEqualT({
      '1s': 'أَحْيَيْتُ',
      '2ms': 'أَحْيَيْتَ',
      '2fs': 'أَحْيَيْتِ',
      '3ms': 'أَحْيَا',
      '3fs': 'أَحْيَتْ',
      '2d': 'أَحْيَيْتُمَا',
      '3md': 'أَحْيَيَا',
      '3fd': 'أَحْيَتَا',
      '1p': 'أَحْيَيْنَا',
      '2mp': 'أَحْيَيْتُمْ',
      '2fp': 'أَحْيَيْتُنَّ',
      '3mp': 'أَحْيَوْا',
      '3fp': 'أَحْيَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hyy-4')!, 'indicative')).toEqualT({
      '1s': 'أُحْيِي',
      '2ms': 'تُحْيِي',
      '2fs': 'تُحْيِينَ',
      '3ms': 'يُحْيِي',
      '3fs': 'تُحْيِي',
      '2d': 'تُحْيِيَانِ',
      '3md': 'يُحْيِيَانِ',
      '3fd': 'تُحْيِيَانِ',
      '1p': 'نُحْيِي',
      '2mp': 'تُحْيُونَ',
      '2fp': 'تُحْيِينَ',
      '3mp': 'يُحْيُونَ',
      '3fp': 'يُحْيِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hyy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُحْيِيَ',
      '2ms': 'تُحْيِيَ',
      '2fs': 'تُحْيِي',
      '3ms': 'يُحْيِيَ',
      '3fs': 'تُحْيِيَ',
      '2d': 'تُحْيِيَا',
      '3md': 'يُحْيِيَا',
      '3fd': 'تُحْيِيَا',
      '1p': 'نُحْيِيَ',
      '2mp': 'تُحْيُوا',
      '2fp': 'تُحْيِينَ',
      '3mp': 'يُحْيُوا',
      '3fp': 'يُحْيِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hyy-4')!, 'jussive')).toEqualT({
      '1s': 'أُحْيِ',
      '2ms': 'تُحْيِ',
      '2fs': 'تُحْيِي',
      '3ms': 'يُحْيِ',
      '3fs': 'تُحْيِ',
      '2d': 'تُحْيِيَا',
      '3md': 'يُحْيِيَا',
      '3fd': 'تُحْيِيَا',
      '1p': 'نُحْيِ',
      '2mp': 'تُحْيُوا',
      '2fp': 'تُحْيِينَ',
      '3mp': 'يُحْيُوا',
      '3fp': 'يُحْيِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hyy-4')!)).toMatchObjectT({
      '2ms': 'أَحْيِ',
      '2fs': 'أَحْيِي',
      '2d': 'أَحْيِيَا',
      '2mp': 'أَحْيُوا',
      '2fp': 'أَحْيِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Hyy-4')!)).toEqualT({
      '1s': 'أُحْيِيتُ',
      '2ms': 'أُحْيِيتَ',
      '2fs': 'أُحْيِيتِ',
      '3ms': 'أُحْيِيَ',
      '3fs': 'أُحْيِيَتْ',
      '2d': 'أُحْيِيتُمَا',
      '3md': 'أُحْيِيَا',
      '3fd': 'أُحْيِيَتَا',
      '1p': 'أُحْيِينَا',
      '2mp': 'أُحْيِيتُمْ',
      '2fp': 'أُحْيِيتُنَّ',
      '3mp': 'أُحْيُوا',
      '3fp': 'أُحْيِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyy-4')!, 'indicative')).toEqualT({
      '1s': 'أُحْيَا',
      '2ms': 'تُحْيَا',
      '2fs': 'تُحْيَيْنَ',
      '3ms': 'يُحْيَا',
      '3fs': 'تُحْيَا',
      '2d': 'تُحْيَيَانِ',
      '3md': 'يُحْيَيَانِ',
      '3fd': 'تُحْيَيَانِ',
      '1p': 'نُحْيَا',
      '2mp': 'تُحْيَوْنَ',
      '2fp': 'تُحْيَيْنَ',
      '3mp': 'يُحْيَوْنَ',
      '3fp': 'يُحْيَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُحْيَا',
      '2ms': 'تُحْيَا',
      '2fs': 'تُحْيَيْ',
      '3ms': 'يُحْيَا',
      '3fs': 'تُحْيَا',
      '2d': 'تُحْيَيَا',
      '3md': 'يُحْيَيَا',
      '3fd': 'تُحْيَيَا',
      '1p': 'نُحْيَا',
      '2mp': 'تُحْيَوْا',
      '2fp': 'تُحْيَيْنَ',
      '3mp': 'يُحْيَوْا',
      '3fp': 'يُحْيَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyy-4')!, 'jussive')).toEqualT({
      '1s': 'أُحْيَ',
      '2ms': 'تُحْيَ',
      '2fs': 'تُحْيَيْ',
      '3ms': 'يُحْيَ',
      '3fs': 'تُحْيَ',
      '2d': 'تُحْيَيَا',
      '3md': 'يُحْيَيَا',
      '3fd': 'تُحْيَيَا',
      '1p': 'نُحْيَ',
      '2mp': 'تُحْيَوْا',
      '2fp': 'تُحْيَيْنَ',
      '3mp': 'يُحْيَوْا',
      '3fp': 'يُحْيَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hyy-4')!)).toEqualT('مُحْيٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Hyy-4')!)).toEqualT('مُحْيًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Hyy-4')!)).toEqualT(['إِحْيَاء'])
  })
})
