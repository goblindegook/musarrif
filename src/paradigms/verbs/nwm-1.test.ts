import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("nwm-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("nwm-1")!)).toEqualT({
      '1s': 'نِمْتُ',
      '2ms': 'نِمْتَ',
      '2fs': 'نِمْتِ',
      '3ms': 'نَامَ',
      '3fs': 'نَامَتْ',
      '2d': 'نِمْتُمَا',
      '3md': 'نَامَا',
      '3fd': 'نَامَتَا',
      '1p': 'نِمْنَا',
      '2mp': 'نِمْتُمْ',
      '2fp': 'نِمْتُنَّ',
      '3mp': 'نَامُوا',
      '3fp': 'نِمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("nwm-1")!, 'indicative')).toEqualT({
      '1s': 'أَنَامُ',
      '2ms': 'تَنَامُ',
      '2fs': 'تَنَامِينَ',
      '3ms': 'يَنَامُ',
      '3fs': 'تَنَامُ',
      '2d': 'تَنَامَانِ',
      '3md': 'يَنَامَانِ',
      '3fd': 'تَنَامَانِ',
      '1p': 'نَنَامُ',
      '2mp': 'تَنَامُونَ',
      '2fp': 'تَنَمْنَ',
      '3mp': 'يَنَامُونَ',
      '3fp': 'يَنَمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("nwm-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَنَامَ',
      '2ms': 'تَنَامَ',
      '2fs': 'تَنَامِي',
      '3ms': 'يَنَامَ',
      '3fs': 'تَنَامَ',
      '2d': 'تَنَامَا',
      '3md': 'يَنَامَا',
      '3fd': 'تَنَامَا',
      '1p': 'نَنَامَ',
      '2mp': 'تَنَامُوا',
      '2fp': 'تَنَمْنَ',
      '3mp': 'يَنَامُوا',
      '3fp': 'يَنَمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("nwm-1")!, 'jussive')).toEqualT({
      '1s': 'أَنَمْ',
      '2ms': 'تَنَمْ',
      '2fs': 'تَنَامِي',
      '3ms': 'يَنَمْ',
      '3fs': 'تَنَمْ',
      '2d': 'تَنَامَا',
      '3md': 'يَنَامَا',
      '3fd': 'تَنَامَا',
      '1p': 'نَنَمْ',
      '2mp': 'تَنَامُوا',
      '2fp': 'تَنَمْنَ',
      '3mp': 'يَنَامُوا',
      '3fp': 'يَنَمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("nwm-1")!)).toMatchObjectT({
      '2ms': 'نَمْ',
      '2fs': 'نَامِي',
      '2d': 'نَامَا',
      '2mp': 'نَامُوا',
      '2fp': 'نَمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("nwm-1")!)).toMatchObjectT({
      '3ms': 'نِيمَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("nwm-1")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُنَامُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("nwm-1")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُنَامَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("nwm-1")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُنَمْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("nwm-1")!)).toEqualT('نَائِم')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("nwm-1")!)).toEqualT('مَنُوم')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("nwm-1")!))).toEqualT(new Set(['نَوْم', 'مَنَام']))
  })
})
