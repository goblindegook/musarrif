import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wfy-2', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wfy-2')!)).toEqualT({
      '1s': 'وَفَّيْتُ',
      '2ms': 'وَفَّيْتَ',
      '2fs': 'وَفَّيْتِ',
      '3ms': 'وَفَّى',
      '3fs': 'وَفَّتْ',
      '2d': 'وَفَّيْتُمَا',
      '3md': 'وَفَّيَا',
      '3fd': 'وَفَّتَا',
      '1p': 'وَفَّيْنَا',
      '2mp': 'وَفَّيْتُمْ',
      '2fp': 'وَفَّيْتُنَّ',
      '3mp': 'وَفَّوْا',
      '3fp': 'وَفَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wfy-2')!, 'indicative')).toEqualT({
      '1s': 'أُوَفِّي',
      '2ms': 'تُوَفِّي',
      '2fs': 'تُوَفِّينَ',
      '3ms': 'يُوَفِّي',
      '3fs': 'تُوَفِّي',
      '2d': 'تُوَفِّيَانِ',
      '3md': 'يُوَفِّيَانِ',
      '3fd': 'تُوَفِّيَانِ',
      '1p': 'نُوَفِّي',
      '2mp': 'تُوَفُّونَ',
      '2fp': 'تُوَفِّينَ',
      '3mp': 'يُوَفُّونَ',
      '3fp': 'يُوَفِّينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wfy-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُوَفِّيَ',
      '2ms': 'تُوَفِّيَ',
      '2fs': 'تُوَفِّي',
      '3ms': 'يُوَفِّيَ',
      '3fs': 'تُوَفِّيَ',
      '2d': 'تُوَفِّيَا',
      '3md': 'يُوَفِّيَا',
      '3fd': 'تُوَفِّيَا',
      '1p': 'نُوَفِّيَ',
      '2mp': 'تُوَفُّوا',
      '2fp': 'تُوَفِّينَ',
      '3mp': 'يُوَفُّوا',
      '3fp': 'يُوَفِّينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wfy-2')!, 'jussive')).toEqualT({
      '1s': 'أُوَفِّ',
      '2ms': 'تُوَفِّ',
      '2fs': 'تُوَفِّي',
      '3ms': 'يُوَفِّ',
      '3fs': 'تُوَفِّ',
      '2d': 'تُوَفِّيَا',
      '3md': 'يُوَفِّيَا',
      '3fd': 'تُوَفِّيَا',
      '1p': 'نُوَفِّ',
      '2mp': 'تُوَفُّوا',
      '2fp': 'تُوَفِّينَ',
      '3mp': 'يُوَفُّوا',
      '3fp': 'يُوَفِّينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wfy-2')!)).toMatchObjectT({
      '2ms': 'وَفِّ',
      '2fs': 'وَفِّي',
      '2d': 'وَفِّيَا',
      '2mp': 'وَفُّوا',
      '2fp': 'وَفِّينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wfy-2')!)).toEqualT({
      '1s': 'وُفِّيتُ',
      '2ms': 'وُفِّيتَ',
      '2fs': 'وُفِّيتِ',
      '3ms': 'وُفِّيَ',
      '3fs': 'وُفِّيَتْ',
      '2d': 'وُفِّيتُمَا',
      '3md': 'وُفِّيَا',
      '3fd': 'وُفِّيَتَا',
      '1p': 'وُفِّينَا',
      '2mp': 'وُفِّيتُمْ',
      '2fp': 'وُفِّيتُنَّ',
      '3mp': 'وُفُّوا',
      '3fp': 'وُفِّينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-2')!, 'indicative')).toEqualT({
      '1s': 'أُوَفَّى',
      '2ms': 'تُوَفَّى',
      '2fs': 'تُوَفَّيْنَ',
      '3ms': 'يُوَفَّى',
      '3fs': 'تُوَفَّى',
      '2d': 'تُوَفَّيَانِ',
      '3md': 'يُوَفَّيَانِ',
      '3fd': 'تُوَفَّيَانِ',
      '1p': 'نُوَفَّى',
      '2mp': 'تُوَفَّوْنَ',
      '2fp': 'تُوَفَّيْنَ',
      '3mp': 'يُوَفَّوْنَ',
      '3fp': 'يُوَفَّيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُوَفَّى',
      '2ms': 'تُوَفَّى',
      '2fs': 'تُوَفَّيْ',
      '3ms': 'يُوَفَّى',
      '3fs': 'تُوَفَّى',
      '2d': 'تُوَفَّيَا',
      '3md': 'يُوَفَّيَا',
      '3fd': 'تُوَفَّيَا',
      '1p': 'نُوَفَّى',
      '2mp': 'تُوَفَّوْا',
      '2fp': 'تُوَفَّيْنَ',
      '3mp': 'يُوَفَّوْا',
      '3fp': 'يُوَفَّيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-2')!, 'jussive')).toEqualT({
      '1s': 'أُوَفَّ',
      '2ms': 'تُوَفَّ',
      '2fs': 'تُوَفَّيْ',
      '3ms': 'يُوَفَّ',
      '3fs': 'تُوَفَّ',
      '2d': 'تُوَفَّيَا',
      '3md': 'يُوَفَّيَا',
      '3fd': 'تُوَفَّيَا',
      '1p': 'نُوَفَّ',
      '2mp': 'تُوَفَّوْا',
      '2fp': 'تُوَفَّيْنَ',
      '3mp': 'يُوَفَّوْا',
      '3fp': 'يُوَفَّيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wfy-2')!)).toEqualT('مُوَفٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wfy-2')!)).toEqualT('مُوَفًّى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wfy-2')!)).toEqualT(['تَوْفِيَة'])
  })
})
