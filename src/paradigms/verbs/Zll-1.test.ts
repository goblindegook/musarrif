import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Zll-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Zll-1')!)).toEqualT({
      '1s': 'ظَلِلْتُ',
      '2ms': 'ظَلِلْتَ',
      '2fs': 'ظَلِلْتِ',
      '3ms': 'ظَلَّ',
      '3fs': 'ظَلَّتْ',
      '2d': 'ظَلِلْتُمَا',
      '3md': 'ظَلَّا',
      '3fd': 'ظَلَّتَا',
      '1p': 'ظَلِلْنَا',
      '2mp': 'ظَلِلْتُمْ',
      '2fp': 'ظَلِلْتُنَّ',
      '3mp': 'ظَلُّوا',
      '3fp': 'ظَلِلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Zll-1')!, 'indicative')).toEqualT({
      '1s': 'أَظَلُّ',
      '2ms': 'تَظَلُّ',
      '2fs': 'تَظَلِّينَ',
      '3ms': 'يَظَلُّ',
      '3fs': 'تَظَلُّ',
      '2d': 'تَظَلَّانِ',
      '3md': 'يَظَلَّانِ',
      '3fd': 'تَظَلَّانِ',
      '1p': 'نَظَلُّ',
      '2mp': 'تَظَلُّونَ',
      '2fp': 'تَظْلَلْنَ',
      '3mp': 'يَظَلُّونَ',
      '3fp': 'يَظْلَلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Zll-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَظَلَّ',
      '2ms': 'تَظَلَّ',
      '2fs': 'تَظَلِّي',
      '3ms': 'يَظَلَّ',
      '3fs': 'تَظَلَّ',
      '2d': 'تَظَلَّا',
      '3md': 'يَظَلَّا',
      '3fd': 'تَظَلَّا',
      '1p': 'نَظَلَّ',
      '2mp': 'تَظَلُّوا',
      '2fp': 'تَظْلَلْنَ',
      '3mp': 'يَظَلُّوا',
      '3fp': 'يَظْلَلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Zll-1')!, 'jussive')).toEqualT({
      '1s': 'أَظَلَّ',
      '2ms': 'تَظَلَّ',
      '2fs': 'تَظَلِّي',
      '3ms': 'يَظَلَّ',
      '3fs': 'تَظَلَّ',
      '2d': 'تَظَلَّا',
      '3md': 'يَظَلَّا',
      '3fd': 'تَظَلَّا',
      '1p': 'نَظَلَّ',
      '2mp': 'تَظَلُّوا',
      '2fp': 'تَظْلَلْنَ',
      '3mp': 'يَظَلُّوا',
      '3fp': 'يَظْلَلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Zll-1')!)).toMatchObjectT({
      '2ms': 'ظَلَّ',
      '2fs': 'ظَلِّي',
      '2d': 'ظَلَّا',
      '2mp': 'ظَلُّوا',
      '2fp': 'اِظْلَلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Zll-1')!)).toMatchObjectT({
      '3ms': 'ظُلَّ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Zll-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُظَلُّ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Zll-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُظَلَّ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Zll-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُظَلَّ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Zll-1')!)).toEqualT('ظَالّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Zll-1')!)).toEqualT('مَظْلُول')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Zll-1')!)).toEqualT(['ظَلّ', 'ظُلُول'])
  })
})
