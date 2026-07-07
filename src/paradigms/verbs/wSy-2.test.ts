import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wSy-2', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wSy-2')!)).toEqualT({
      '1s': 'وَصَّيْتُ',
      '2ms': 'وَصَّيْتَ',
      '2fs': 'وَصَّيْتِ',
      '3ms': 'وَصَّى',
      '3fs': 'وَصَّتْ',
      '2d': 'وَصَّيْتُمَا',
      '3md': 'وَصَّيَا',
      '3fd': 'وَصَّتَا',
      '1p': 'وَصَّيْنَا',
      '2mp': 'وَصَّيْتُمْ',
      '2fp': 'وَصَّيْتُنَّ',
      '3mp': 'وَصَّوْا',
      '3fp': 'وَصَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wSy-2')!, 'indicative')).toEqualT({
      '1s': 'أُوَصِّي',
      '2ms': 'تُوَصِّي',
      '2fs': 'تُوَصِّينَ',
      '3ms': 'يُوَصِّي',
      '3fs': 'تُوَصِّي',
      '2d': 'تُوَصِّيَانِ',
      '3md': 'يُوَصِّيَانِ',
      '3fd': 'تُوَصِّيَانِ',
      '1p': 'نُوَصِّي',
      '2mp': 'تُوَصُّونَ',
      '2fp': 'تُوَصِّينَ',
      '3mp': 'يُوَصُّونَ',
      '3fp': 'يُوَصِّينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wSy-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُوَصِّيَ',
      '2ms': 'تُوَصِّيَ',
      '2fs': 'تُوَصِّي',
      '3ms': 'يُوَصِّيَ',
      '3fs': 'تُوَصِّيَ',
      '2d': 'تُوَصِّيَا',
      '3md': 'يُوَصِّيَا',
      '3fd': 'تُوَصِّيَا',
      '1p': 'نُوَصِّيَ',
      '2mp': 'تُوَصُّوا',
      '2fp': 'تُوَصِّينَ',
      '3mp': 'يُوَصُّوا',
      '3fp': 'يُوَصِّينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wSy-2')!, 'jussive')).toEqualT({
      '1s': 'أُوَصِّ',
      '2ms': 'تُوَصِّ',
      '2fs': 'تُوَصِّي',
      '3ms': 'يُوَصِّ',
      '3fs': 'تُوَصِّ',
      '2d': 'تُوَصِّيَا',
      '3md': 'يُوَصِّيَا',
      '3fd': 'تُوَصِّيَا',
      '1p': 'نُوَصِّ',
      '2mp': 'تُوَصُّوا',
      '2fp': 'تُوَصِّينَ',
      '3mp': 'يُوَصُّوا',
      '3fp': 'يُوَصِّينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wSy-2')!)).toMatchObjectT({
      '2ms': 'وَصِّ',
      '2fs': 'وَصِّي',
      '2d': 'وَصِّيَا',
      '2mp': 'وَصُّوا',
      '2fp': 'وَصِّينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wSy-2')!)).toEqualT({
      '1s': 'وُصِّيتُ',
      '2ms': 'وُصِّيتَ',
      '2fs': 'وُصِّيتِ',
      '3ms': 'وُصِّيَ',
      '3fs': 'وُصِّيَتْ',
      '2d': 'وُصِّيتُمَا',
      '3md': 'وُصِّيَا',
      '3fd': 'وُصِّيَتَا',
      '1p': 'وُصِّينَا',
      '2mp': 'وُصِّيتُمْ',
      '2fp': 'وُصِّيتُنَّ',
      '3mp': 'وُصُّوا',
      '3fp': 'وُصِّينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wSy-2')!, 'indicative')).toEqualT({
      '1s': 'أُوَصَّى',
      '2ms': 'تُوَصَّى',
      '2fs': 'تُوَصَّيْنَ',
      '3ms': 'يُوَصَّى',
      '3fs': 'تُوَصَّى',
      '2d': 'تُوَصَّيَانِ',
      '3md': 'يُوَصَّيَانِ',
      '3fd': 'تُوَصَّيَانِ',
      '1p': 'نُوَصَّى',
      '2mp': 'تُوَصَّوْنَ',
      '2fp': 'تُوَصَّيْنَ',
      '3mp': 'يُوَصَّوْنَ',
      '3fp': 'يُوَصَّيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wSy-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُوَصَّى',
      '2ms': 'تُوَصَّى',
      '2fs': 'تُوَصَّيْ',
      '3ms': 'يُوَصَّى',
      '3fs': 'تُوَصَّى',
      '2d': 'تُوَصَّيَا',
      '3md': 'يُوَصَّيَا',
      '3fd': 'تُوَصَّيَا',
      '1p': 'نُوَصَّى',
      '2mp': 'تُوَصَّوْا',
      '2fp': 'تُوَصَّيْنَ',
      '3mp': 'يُوَصَّوْا',
      '3fp': 'يُوَصَّيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wSy-2')!, 'jussive')).toEqualT({
      '1s': 'أُوَصَّ',
      '2ms': 'تُوَصَّ',
      '2fs': 'تُوَصَّيْ',
      '3ms': 'يُوَصَّ',
      '3fs': 'تُوَصَّ',
      '2d': 'تُوَصَّيَا',
      '3md': 'يُوَصَّيَا',
      '3fd': 'تُوَصَّيَا',
      '1p': 'نُوَصَّ',
      '2mp': 'تُوَصَّوْا',
      '2fp': 'تُوَصَّيْنَ',
      '3mp': 'يُوَصَّوْا',
      '3fp': 'يُوَصَّيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wSy-2')!)).toEqualT('مُوَصٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wSy-2')!)).toEqualT('مُوَصًّى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wSy-2')!)).toEqualT(['تَوْصِيَة'])
  })
})
