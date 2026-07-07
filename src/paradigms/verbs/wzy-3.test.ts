import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wzy-3', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wzy-3')!)).toEqualT({
      '1s': 'وَازَيْتُ',
      '2ms': 'وَازَيْتَ',
      '2fs': 'وَازَيْتِ',
      '3ms': 'وَازَى',
      '3fs': 'وَازَتْ',
      '2d': 'وَازَيْتُمَا',
      '3md': 'وَازَيَا',
      '3fd': 'وَازَتَا',
      '1p': 'وَازَيْنَا',
      '2mp': 'وَازَيْتُمْ',
      '2fp': 'وَازَيْتُنَّ',
      '3mp': 'وَازَوْا',
      '3fp': 'وَازَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wzy-3')!, 'indicative')).toEqualT({
      '1s': 'أُوَازِي',
      '2ms': 'تُوَازِي',
      '2fs': 'تُوَازِينَ',
      '3ms': 'يُوَازِي',
      '3fs': 'تُوَازِي',
      '2d': 'تُوَازِيَانِ',
      '3md': 'يُوَازِيَانِ',
      '3fd': 'تُوَازِيَانِ',
      '1p': 'نُوَازِي',
      '2mp': 'تُوَازُونَ',
      '2fp': 'تُوَازِينَ',
      '3mp': 'يُوَازُونَ',
      '3fp': 'يُوَازِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wzy-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُوَازِيَ',
      '2ms': 'تُوَازِيَ',
      '2fs': 'تُوَازِي',
      '3ms': 'يُوَازِيَ',
      '3fs': 'تُوَازِيَ',
      '2d': 'تُوَازِيَا',
      '3md': 'يُوَازِيَا',
      '3fd': 'تُوَازِيَا',
      '1p': 'نُوَازِيَ',
      '2mp': 'تُوَازُوا',
      '2fp': 'تُوَازِينَ',
      '3mp': 'يُوَازُوا',
      '3fp': 'يُوَازِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wzy-3')!, 'jussive')).toEqualT({
      '1s': 'أُوَازِ',
      '2ms': 'تُوَازِ',
      '2fs': 'تُوَازِي',
      '3ms': 'يُوَازِ',
      '3fs': 'تُوَازِ',
      '2d': 'تُوَازِيَا',
      '3md': 'يُوَازِيَا',
      '3fd': 'تُوَازِيَا',
      '1p': 'نُوَازِ',
      '2mp': 'تُوَازُوا',
      '2fp': 'تُوَازِينَ',
      '3mp': 'يُوَازُوا',
      '3fp': 'يُوَازِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wzy-3')!)).toMatchObjectT({
      '2ms': 'وَازِ',
      '2fs': 'وَازِي',
      '2d': 'وَازِيَا',
      '2mp': 'وَازُوا',
      '2fp': 'وَازِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wzy-3')!)).toEqualT({
      '1s': 'وُوزِيتُ',
      '2ms': 'وُوزِيتَ',
      '2fs': 'وُوزِيتِ',
      '3ms': 'وُوزِيَ',
      '3fs': 'وُوزِيَتْ',
      '2d': 'وُوزِيتُمَا',
      '3md': 'وُوزِيَا',
      '3fd': 'وُوزِيَتَا',
      '1p': 'وُوزِينَا',
      '2mp': 'وُوزِيتُمْ',
      '2fp': 'وُوزِيتُنَّ',
      '3mp': 'وُوزُوا',
      '3fp': 'وُوزِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wzy-3')!, 'indicative')).toEqualT({
      '1s': 'أُوَازَى',
      '2ms': 'تُوَازَى',
      '2fs': 'تُوَازَيْنَ',
      '3ms': 'يُوَازَى',
      '3fs': 'تُوَازَى',
      '2d': 'تُوَازَيَانِ',
      '3md': 'يُوَازَيَانِ',
      '3fd': 'تُوَازَيَانِ',
      '1p': 'نُوَازَى',
      '2mp': 'تُوَازَوْنَ',
      '2fp': 'تُوَازَيْنَ',
      '3mp': 'يُوَازَوْنَ',
      '3fp': 'يُوَازَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wzy-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُوَازَى',
      '2ms': 'تُوَازَى',
      '2fs': 'تُوَازَيْ',
      '3ms': 'يُوَازَى',
      '3fs': 'تُوَازَى',
      '2d': 'تُوَازَيَا',
      '3md': 'يُوَازَيَا',
      '3fd': 'تُوَازَيَا',
      '1p': 'نُوَازَى',
      '2mp': 'تُوَازَوْا',
      '2fp': 'تُوَازَيْنَ',
      '3mp': 'يُوَازَوْا',
      '3fp': 'يُوَازَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wzy-3')!, 'jussive')).toEqualT({
      '1s': 'أُوَازَ',
      '2ms': 'تُوَازَ',
      '2fs': 'تُوَازَيْ',
      '3ms': 'يُوَازَ',
      '3fs': 'تُوَازَ',
      '2d': 'تُوَازَيَا',
      '3md': 'يُوَازَيَا',
      '3fd': 'تُوَازَيَا',
      '1p': 'نُوَازَ',
      '2mp': 'تُوَازَوْا',
      '2fp': 'تُوَازَيْنَ',
      '3mp': 'يُوَازَوْا',
      '3fp': 'يُوَازَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wzy-3')!)).toEqualT('مُوَازٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wzy-3')!)).toEqualT('مُوَازًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wzy-3')!)).toEqualT(['مُوَازَاة'])
  })
})
