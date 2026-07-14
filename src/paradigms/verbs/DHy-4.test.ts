import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('DHy-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('DHy-4')!)).toEqualT({
      '1s': 'أَضْحَيْتُ',
      '2ms': 'أَضْحَيْتَ',
      '2fs': 'أَضْحَيْتِ',
      '3ms': 'أَضْحَى',
      '3fs': 'أَضْحَتْ',
      '2d': 'أَضْحَيْتُمَا',
      '3md': 'أَضْحَيَا',
      '3fd': 'أَضْحَتَا',
      '1p': 'أَضْحَيْنَا',
      '2mp': 'أَضْحَيْتُمْ',
      '2fp': 'أَضْحَيْتُنَّ',
      '3mp': 'أَضْحَوْا',
      '3fp': 'أَضْحَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('DHy-4')!, 'indicative')).toEqualT({
      '1s': 'أُضْحِي',
      '2ms': 'تُضْحِي',
      '2fs': 'تُضْحِينَ',
      '3ms': 'يُضْحِي',
      '3fs': 'تُضْحِي',
      '2d': 'تُضْحِيَانِ',
      '3md': 'يُضْحِيَانِ',
      '3fd': 'تُضْحِيَانِ',
      '1p': 'نُضْحِي',
      '2mp': 'تُضْحُونَ',
      '2fp': 'تُضْحِينَ',
      '3mp': 'يُضْحُونَ',
      '3fp': 'يُضْحِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('DHy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُضْحِيَ',
      '2ms': 'تُضْحِيَ',
      '2fs': 'تُضْحِي',
      '3ms': 'يُضْحِيَ',
      '3fs': 'تُضْحِيَ',
      '2d': 'تُضْحِيَا',
      '3md': 'يُضْحِيَا',
      '3fd': 'تُضْحِيَا',
      '1p': 'نُضْحِيَ',
      '2mp': 'تُضْحُوا',
      '2fp': 'تُضْحِينَ',
      '3mp': 'يُضْحُوا',
      '3fp': 'يُضْحِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('DHy-4')!, 'jussive')).toEqualT({
      '1s': 'أُضْحِ',
      '2ms': 'تُضْحِ',
      '2fs': 'تُضْحِي',
      '3ms': 'يُضْحِ',
      '3fs': 'تُضْحِ',
      '2d': 'تُضْحِيَا',
      '3md': 'يُضْحِيَا',
      '3fd': 'تُضْحِيَا',
      '1p': 'نُضْحِ',
      '2mp': 'تُضْحُوا',
      '2fp': 'تُضْحِينَ',
      '3mp': 'يُضْحُوا',
      '3fp': 'يُضْحِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('DHy-4')!)).toMatchObjectT({
      '2ms': 'أَضْحِ',
      '2fs': 'أَضْحِي',
      '2d': 'أَضْحِيَا',
      '2mp': 'أَضْحُوا',
      '2fp': 'أَضْحِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('DHy-4')!)).toEqualT({
      '1s': 'أُضْحِيتُ',
      '2ms': 'أُضْحِيتَ',
      '2fs': 'أُضْحِيتِ',
      '3ms': 'أُضْحِيَ',
      '3fs': 'أُضْحِيَتْ',
      '2d': 'أُضْحِيتُمَا',
      '3md': 'أُضْحِيَا',
      '3fd': 'أُضْحِيَتَا',
      '1p': 'أُضْحِينَا',
      '2mp': 'أُضْحِيتُمْ',
      '2fp': 'أُضْحِيتُنَّ',
      '3mp': 'أُضْحُوا',
      '3fp': 'أُضْحِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('DHy-4')!, 'indicative')).toEqualT({
      '1s': 'أُضْحَى',
      '2ms': 'تُضْحَى',
      '2fs': 'تُضْحَيْنَ',
      '3ms': 'يُضْحَى',
      '3fs': 'تُضْحَى',
      '2d': 'تُضْحَيَانِ',
      '3md': 'يُضْحَيَانِ',
      '3fd': 'تُضْحَيَانِ',
      '1p': 'نُضْحَى',
      '2mp': 'تُضْحَوْنَ',
      '2fp': 'تُضْحَيْنَ',
      '3mp': 'يُضْحَوْنَ',
      '3fp': 'يُضْحَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('DHy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُضْحَى',
      '2ms': 'تُضْحَى',
      '2fs': 'تُضْحَيْ',
      '3ms': 'يُضْحَى',
      '3fs': 'تُضْحَى',
      '2d': 'تُضْحَيَا',
      '3md': 'يُضْحَيَا',
      '3fd': 'تُضْحَيَا',
      '1p': 'نُضْحَى',
      '2mp': 'تُضْحَوْا',
      '2fp': 'تُضْحَيْنَ',
      '3mp': 'يُضْحَوْا',
      '3fp': 'يُضْحَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('DHy-4')!, 'jussive')).toEqualT({
      '1s': 'أُضْحَ',
      '2ms': 'تُضْحَ',
      '2fs': 'تُضْحَيْ',
      '3ms': 'يُضْحَ',
      '3fs': 'تُضْحَ',
      '2d': 'تُضْحَيَا',
      '3md': 'يُضْحَيَا',
      '3fd': 'تُضْحَيَا',
      '1p': 'نُضْحَ',
      '2mp': 'تُضْحَوْا',
      '2fp': 'تُضْحَيْنَ',
      '3mp': 'يُضْحَوْا',
      '3fp': 'يُضْحَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('DHy-4')!)).toEqualT('مُضْحٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('DHy-4')!)).toEqualT('مُضْحًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('DHy-4')!)).toEqualT(['إِضْحَاء'])
  })
})
