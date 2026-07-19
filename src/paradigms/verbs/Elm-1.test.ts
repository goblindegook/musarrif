import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Elm-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Elm-1')!)).toEqualT({
      '1s': 'عَلِمْتُ',
      '2ms': 'عَلِمْتَ',
      '2fs': 'عَلِمْتِ',
      '3ms': 'عَلِمَ',
      '3fs': 'عَلِمَتْ',
      '2d': 'عَلِمْتُمَا',
      '3md': 'عَلِمَا',
      '3fd': 'عَلِمَتَا',
      '1p': 'عَلِمْنَا',
      '2mp': 'عَلِمْتُمْ',
      '2fp': 'عَلِمْتُنَّ',
      '3mp': 'عَلِمُوا',
      '3fp': 'عَلِمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Elm-1')!, 'indicative')).toEqualT({
      '1s': 'أَعْلَمُ',
      '2ms': 'تَعْلَمُ',
      '2fs': 'تَعْلَمِينَ',
      '3ms': 'يَعْلَمُ',
      '3fs': 'تَعْلَمُ',
      '2d': 'تَعْلَمَانِ',
      '3md': 'يَعْلَمَانِ',
      '3fd': 'تَعْلَمَانِ',
      '1p': 'نَعْلَمُ',
      '2mp': 'تَعْلَمُونَ',
      '2fp': 'تَعْلَمْنَ',
      '3mp': 'يَعْلَمُونَ',
      '3fp': 'يَعْلَمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Elm-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَعْلَمَ',
      '2ms': 'تَعْلَمَ',
      '2fs': 'تَعْلَمِي',
      '3ms': 'يَعْلَمَ',
      '3fs': 'تَعْلَمَ',
      '2d': 'تَعْلَمَا',
      '3md': 'يَعْلَمَا',
      '3fd': 'تَعْلَمَا',
      '1p': 'نَعْلَمَ',
      '2mp': 'تَعْلَمُوا',
      '2fp': 'تَعْلَمْنَ',
      '3mp': 'يَعْلَمُوا',
      '3fp': 'يَعْلَمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Elm-1')!, 'jussive')).toEqualT({
      '1s': 'أَعْلَمْ',
      '2ms': 'تَعْلَمْ',
      '2fs': 'تَعْلَمِي',
      '3ms': 'يَعْلَمْ',
      '3fs': 'تَعْلَمْ',
      '2d': 'تَعْلَمَا',
      '3md': 'يَعْلَمَا',
      '3fd': 'تَعْلَمَا',
      '1p': 'نَعْلَمْ',
      '2mp': 'تَعْلَمُوا',
      '2fp': 'تَعْلَمْنَ',
      '3mp': 'يَعْلَمُوا',
      '3fp': 'يَعْلَمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Elm-1')!)).toMatchObjectT({
      '2ms': 'اِعْلَمْ',
      '2fs': 'اِعْلَمِي',
      '2d': 'اِعْلَمَا',
      '2mp': 'اِعْلَمُوا',
      '2fp': 'اِعْلَمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Elm-1')!)).toMatchObjectT({
      '3ms': 'عُلِمَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Elm-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُعْلَمُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Elm-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُعْلَمَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Elm-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُعْلَمْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Elm-1')!)).toEqualT('عَالِم')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Elm-1')!)).toEqualT('مَعْلُوم')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Elm-1')!)).toEqualT(['عِلْم'])
  })
})
