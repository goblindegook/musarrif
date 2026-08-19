import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('xlw-2 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('xlw-2')!)).toEqualT({
      '1s': 'خَلَّيْتُ',
      '2ms': 'خَلَّيْتَ',
      '2fs': 'خَلَّيْتِ',
      '3ms': 'خَلَّى',
      '3fs': 'خَلَّتْ',
      '2d': 'خَلَّيْتُمَا',
      '3md': 'خَلَّيَا',
      '3fd': 'خَلَّتَا',
      '1p': 'خَلَّيْنَا',
      '2mp': 'خَلَّيْتُمْ',
      '2fp': 'خَلَّيْتُنَّ',
      '3mp': 'خَلَّوْا',
      '3fp': 'خَلَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('xlw-2')!, 'indicative')).toEqualT({
      '1s': 'أُخَلِّي',
      '2ms': 'تُخَلِّي',
      '2fs': 'تُخَلِّينَ',
      '3ms': 'يُخَلِّي',
      '3fs': 'تُخَلِّي',
      '2d': 'تُخَلِّيَانِ',
      '3md': 'يُخَلِّيَانِ',
      '3fd': 'تُخَلِّيَانِ',
      '1p': 'نُخَلِّي',
      '2mp': 'تُخَلُّونَ',
      '2fp': 'تُخَلِّينَ',
      '3mp': 'يُخَلُّونَ',
      '3fp': 'يُخَلِّينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('xlw-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُخَلِّيَ',
      '2ms': 'تُخَلِّيَ',
      '2fs': 'تُخَلِّي',
      '3ms': 'يُخَلِّيَ',
      '3fs': 'تُخَلِّيَ',
      '2d': 'تُخَلِّيَا',
      '3md': 'يُخَلِّيَا',
      '3fd': 'تُخَلِّيَا',
      '1p': 'نُخَلِّيَ',
      '2mp': 'تُخَلُّوا',
      '2fp': 'تُخَلِّينَ',
      '3mp': 'يُخَلُّوا',
      '3fp': 'يُخَلِّينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('xlw-2')!, 'jussive')).toEqualT({
      '1s': 'أُخَلِّ',
      '2ms': 'تُخَلِّ',
      '2fs': 'تُخَلِّي',
      '3ms': 'يُخَلِّ',
      '3fs': 'تُخَلِّ',
      '2d': 'تُخَلِّيَا',
      '3md': 'يُخَلِّيَا',
      '3fd': 'تُخَلِّيَا',
      '1p': 'نُخَلِّ',
      '2mp': 'تُخَلُّوا',
      '2fp': 'تُخَلِّينَ',
      '3mp': 'يُخَلُّوا',
      '3fp': 'يُخَلِّينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('xlw-2')!)).toMatchObjectT({
      '2ms': 'خَلِّ',
      '2fs': 'خَلِّي',
      '2d': 'خَلِّيَا',
      '2mp': 'خَلُّوا',
      '2fp': 'خَلِّينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('xlw-2')!)).toEqualT({
      '1s': 'خُلِّيتُ',
      '2ms': 'خُلِّيتَ',
      '2fs': 'خُلِّيتِ',
      '3ms': 'خُلِّيَ',
      '3fs': 'خُلِّيَتْ',
      '2d': 'خُلِّيتُمَا',
      '3md': 'خُلِّيَا',
      '3fd': 'خُلِّيَتَا',
      '1p': 'خُلِّينَا',
      '2mp': 'خُلِّيتُمْ',
      '2fp': 'خُلِّيتُنَّ',
      '3mp': 'خُلُّوا',
      '3fp': 'خُلِّينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('xlw-2')!, 'indicative')).toEqualT({
      '1s': 'أُخَلَّى',
      '2ms': 'تُخَلَّى',
      '2fs': 'تُخَلَّيْنَ',
      '3ms': 'يُخَلَّى',
      '3fs': 'تُخَلَّى',
      '2d': 'تُخَلَّيَانِ',
      '3md': 'يُخَلَّيَانِ',
      '3fd': 'تُخَلَّيَانِ',
      '1p': 'نُخَلَّى',
      '2mp': 'تُخَلَّوْنَ',
      '2fp': 'تُخَلَّيْنَ',
      '3mp': 'يُخَلَّوْنَ',
      '3fp': 'يُخَلَّيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('xlw-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُخَلَّى',
      '2ms': 'تُخَلَّى',
      '2fs': 'تُخَلَّيْ',
      '3ms': 'يُخَلَّى',
      '3fs': 'تُخَلَّى',
      '2d': 'تُخَلَّيَا',
      '3md': 'يُخَلَّيَا',
      '3fd': 'تُخَلَّيَا',
      '1p': 'نُخَلَّى',
      '2mp': 'تُخَلَّوْا',
      '2fp': 'تُخَلَّيْنَ',
      '3mp': 'يُخَلَّوْا',
      '3fp': 'يُخَلَّيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('xlw-2')!, 'jussive')).toEqualT({
      '1s': 'أُخَلَّ',
      '2ms': 'تُخَلَّ',
      '2fs': 'تُخَلَّيْ',
      '3ms': 'يُخَلَّ',
      '3fs': 'تُخَلَّ',
      '2d': 'تُخَلَّيَا',
      '3md': 'يُخَلَّيَا',
      '3fd': 'تُخَلَّيَا',
      '1p': 'نُخَلَّ',
      '2mp': 'تُخَلَّوْا',
      '2fp': 'تُخَلَّيْنَ',
      '3mp': 'يُخَلَّوْا',
      '3fp': 'يُخَلَّيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('xlw-2')!)).toEqualT('مُخَلٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('xlw-2')!)).toEqualT('مُخَلًّى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('xlw-2')!))).toEqualT(new Set(['تَخْلِيَة']))
  })
})
