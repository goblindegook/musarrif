import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wly-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wly-1')!)).toEqualT({
      '1s': 'وَلِيتُ',
      '2ms': 'وَلِيتَ',
      '2fs': 'وَلِيتِ',
      '3ms': 'وَلِيَ',
      '3fs': 'وَلِيَتْ',
      '2d': 'وَلِيتُمَا',
      '3md': 'وَلِيَا',
      '3fd': 'وَلِيَتَا',
      '1p': 'وَلِينَا',
      '2mp': 'وَلِيتُمْ',
      '2fp': 'وَلِيتُنَّ',
      '3mp': 'وَلُوا',
      '3fp': 'وَلِينَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wly-1')!, 'indicative')).toEqualT({
      '1s': 'أَلِي',
      '2ms': 'تَلِي',
      '2fs': 'تَلِينَ',
      '3ms': 'يَلِي',
      '3fs': 'تَلِي',
      '2d': 'تَلِيَانِ',
      '3md': 'يَلِيَانِ',
      '3fd': 'تَلِيَانِ',
      '1p': 'نَلِي',
      '2mp': 'تَلُونَ',
      '2fp': 'تَلِينَ',
      '3mp': 'يَلُونَ',
      '3fp': 'يَلِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wly-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَلِيَ',
      '2ms': 'تَلِيَ',
      '2fs': 'تَلِي',
      '3ms': 'يَلِيَ',
      '3fs': 'تَلِيَ',
      '2d': 'تَلِيَا',
      '3md': 'يَلِيَا',
      '3fd': 'تَلِيَا',
      '1p': 'نَلِيَ',
      '2mp': 'تَلُوا',
      '2fp': 'تَلِينَ',
      '3mp': 'يَلُوا',
      '3fp': 'يَلِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wly-1')!, 'jussive')).toEqualT({
      '1s': 'أَلِ',
      '2ms': 'تَلِ',
      '2fs': 'تَلِي',
      '3ms': 'يَلِ',
      '3fs': 'تَلِ',
      '2d': 'تَلِيَا',
      '3md': 'يَلِيَا',
      '3fd': 'تَلِيَا',
      '1p': 'نَلِ',
      '2mp': 'تَلُوا',
      '2fp': 'تَلِينَ',
      '3mp': 'يَلُوا',
      '3fp': 'يَلِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wly-1')!)).toMatchObjectT({
      '2ms': 'لِ',
      '2fs': 'لِي',
      '2d': 'لِيَا',
      '2mp': 'لُوا',
      '2fp': 'لِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wly-1')!)).toEqualT({
      '1s': 'وُلِيتُ',
      '2ms': 'وُلِيتَ',
      '2fs': 'وُلِيتِ',
      '3ms': 'وُلِيَ',
      '3fs': 'وُلِيَتْ',
      '2d': 'وُلِيتُمَا',
      '3md': 'وُلِيَا',
      '3fd': 'وُلِيَتَا',
      '1p': 'وُلِينَا',
      '2mp': 'وُلِيتُمْ',
      '2fp': 'وُلِيتُنَّ',
      '3mp': 'وُلُوا',
      '3fp': 'وُلِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wly-1')!, 'indicative')).toEqualT({
      '1s': 'أُولَى',
      '2ms': 'تُولَى',
      '2fs': 'تُولَيْنَ',
      '3ms': 'يُولَى',
      '3fs': 'تُولَى',
      '2d': 'تُولَيَانِ',
      '3md': 'يُولَيَانِ',
      '3fd': 'تُولَيَانِ',
      '1p': 'نُولَى',
      '2mp': 'تُولَوْنَ',
      '2fp': 'تُولَيْنَ',
      '3mp': 'يُولَوْنَ',
      '3fp': 'يُولَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wly-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُولَى',
      '2ms': 'تُولَى',
      '2fs': 'تُولَيْ',
      '3ms': 'يُولَى',
      '3fs': 'تُولَى',
      '2d': 'تُولَيَا',
      '3md': 'يُولَيَا',
      '3fd': 'تُولَيَا',
      '1p': 'نُولَى',
      '2mp': 'تُولَوْا',
      '2fp': 'تُولَيْنَ',
      '3mp': 'يُولَوْا',
      '3fp': 'يُولَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wly-1')!, 'jussive')).toEqualT({
      '1s': 'أُولَ',
      '2ms': 'تُولَ',
      '2fs': 'تُولَيْ',
      '3ms': 'يُولَ',
      '3fs': 'تُولَ',
      '2d': 'تُولَيَا',
      '3md': 'يُولَيَا',
      '3fd': 'تُولَيَا',
      '1p': 'نُولَ',
      '2mp': 'تُولَوْا',
      '2fp': 'تُولَيْنَ',
      '3mp': 'يُولَوْا',
      '3fp': 'يُولَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wly-1')!)).toEqualT('وَالٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wly-1')!)).toEqualT('مَوْلِيّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wly-1')!)).toEqualT(['وَلْي'])
  })
})
