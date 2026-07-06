import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('dEw-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('dEw-1')!)).toEqualT({
      '1s': 'دَعَوْتُ',
      '2ms': 'دَعَوْتَ',
      '2fs': 'دَعَوْتِ',
      '3ms': 'دَعَا',
      '3fs': 'دَعَتْ',
      '2d': 'دَعَوْتُمَا',
      '3md': 'دَعَوَا',
      '3fd': 'دَعَتَا',
      '1p': 'دَعَوْنَا',
      '2mp': 'دَعَوْتُمْ',
      '2fp': 'دَعَوْتُنَّ',
      '3mp': 'دَعَوْا',
      '3fp': 'دَعَوْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('dEw-1')!, 'indicative')).toEqualT({
      '1s': 'أَدْعُو',
      '2ms': 'تَدْعُو',
      '2fs': 'تَدْعِينَ',
      '3ms': 'يَدْعُو',
      '3fs': 'تَدْعُو',
      '2d': 'تَدْعُوَانِ',
      '3md': 'يَدْعُوَانِ',
      '3fd': 'تَدْعُوَانِ',
      '1p': 'نَدْعُو',
      '2mp': 'تَدْعُونَ',
      '2fp': 'تَدْعُونَ',
      '3mp': 'يَدْعُونَ',
      '3fp': 'يَدْعُونَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('dEw-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَدْعُوَ',
      '2ms': 'تَدْعُوَ',
      '2fs': 'تَدْعِي',
      '3ms': 'يَدْعُوَ',
      '3fs': 'تَدْعُوَ',
      '2d': 'تَدْعُوَا',
      '3md': 'يَدْعُوَا',
      '3fd': 'تَدْعُوَا',
      '1p': 'نَدْعُوَ',
      '2mp': 'تَدْعُوا',
      '2fp': 'تَدْعُونَ',
      '3mp': 'يَدْعُوا',
      '3fp': 'يَدْعُونَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('dEw-1')!, 'jussive')).toEqualT({
      '1s': 'أَدْعُ',
      '2ms': 'تَدْعُ',
      '2fs': 'تَدْعِي',
      '3ms': 'يَدْعُ',
      '3fs': 'تَدْعُ',
      '2d': 'تَدْعُوَا',
      '3md': 'يَدْعُوَا',
      '3fd': 'تَدْعُوَا',
      '1p': 'نَدْعُ',
      '2mp': 'تَدْعُوا',
      '2fp': 'تَدْعُونَ',
      '3mp': 'يَدْعُوا',
      '3fp': 'يَدْعُونَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('dEw-1')!)).toMatchObjectT({
      '2ms': 'اُدْعُ',
      '2fs': 'اُدْعِي',
      '2d': 'اُدْعُوَا',
      '2mp': 'اُدْعُوا',
      '2fp': 'اُدْعُونَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('dEw-1')!)).toEqualT({
      '1s': 'دُعِيتُ',
      '2ms': 'دُعِيتَ',
      '2fs': 'دُعِيتِ',
      '3ms': 'دُعِيَ',
      '3fs': 'دُعِيَتْ',
      '2d': 'دُعِيتُمَا',
      '3md': 'دُعِيَا',
      '3fd': 'دُعِيَتَا',
      '1p': 'دُعِينَا',
      '2mp': 'دُعِيتُمْ',
      '2fp': 'دُعِيتُنَّ',
      '3mp': 'دُعُوا',
      '3fp': 'دُعِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('dEw-1')!, 'indicative')).toEqualT({
      '1s': 'أُدْعَى',
      '2ms': 'تُدْعَى',
      '2fs': 'تُدْعَينَ',
      '3ms': 'يُدْعَى',
      '3fs': 'تُدْعَى',
      '2d': 'تُدْعَيَانِ',
      '3md': 'يُدْعَيَانِ',
      '3fd': 'تُدْعَيَانِ',
      '1p': 'نُدْعَى',
      '2mp': 'تُدْعَونَ',
      '2fp': 'تُدْعَينَ',
      '3mp': 'يُدْعَونَ',
      '3fp': 'يُدْعَينَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('dEw-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُدْعَى',
      '2ms': 'تُدْعَى',
      '2fs': 'تُدْعَيْ',
      '3ms': 'يُدْعَى',
      '3fs': 'تُدْعَى',
      '2d': 'تُدْعَيَا',
      '3md': 'يُدْعَيَا',
      '3fd': 'تُدْعَيَا',
      '1p': 'نُدْعَى',
      '2mp': 'تُدْعَوا',
      '2fp': 'تُدْعَينَ',
      '3mp': 'يُدْعَوا',
      '3fp': 'يُدْعَينَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('dEw-1')!, 'jussive')).toEqualT({
      '1s': 'أُدْعَ',
      '2ms': 'تُدْعَ',
      '2fs': 'تُدْعَيْ',
      '3ms': 'يُدْعَ',
      '3fs': 'تُدْعَ',
      '2d': 'تُدْعَيَا',
      '3md': 'يُدْعَيَا',
      '3fd': 'تُدْعَيَا',
      '1p': 'نُدْعَ',
      '2mp': 'تُدْعَوا',
      '2fp': 'تُدْعَينَ',
      '3mp': 'يُدْعَوا',
      '3fp': 'يُدْعَينَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('dEw-1')!)).toEqualT('دَاعٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('dEw-1')!)).toEqualT('مَدْعُوّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('dEw-1')!)).toEqualT(['دُعَاء', 'دَعْوَة'])
  })
})
