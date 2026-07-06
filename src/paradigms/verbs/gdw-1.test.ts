import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('gdw-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('gdw-1')!)).toEqualT({
      '1s': 'غَدَوْتُ',
      '2ms': 'غَدَوْتَ',
      '2fs': 'غَدَوْتِ',
      '3ms': 'غَدَا',
      '3fs': 'غَدَتْ',
      '2d': 'غَدَوْتُمَا',
      '3md': 'غَدَوَا',
      '3fd': 'غَدَتَا',
      '1p': 'غَدَوْنَا',
      '2mp': 'غَدَوْتُمْ',
      '2fp': 'غَدَوْتُنَّ',
      '3mp': 'غَدَوْا',
      '3fp': 'غَدَوْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('gdw-1')!, 'indicative')).toEqualT({
      '1s': 'أَغْدُو',
      '2ms': 'تَغْدُو',
      '2fs': 'تَغْدِينَ',
      '3ms': 'يَغْدُو',
      '3fs': 'تَغْدُو',
      '2d': 'تَغْدُوَانِ',
      '3md': 'يَغْدُوَانِ',
      '3fd': 'تَغْدُوَانِ',
      '1p': 'نَغْدُو',
      '2mp': 'تَغْدُونَ',
      '2fp': 'تَغْدُونَ',
      '3mp': 'يَغْدُونَ',
      '3fp': 'يَغْدُونَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('gdw-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَغْدُوَ',
      '2ms': 'تَغْدُوَ',
      '2fs': 'تَغْدِي',
      '3ms': 'يَغْدُوَ',
      '3fs': 'تَغْدُوَ',
      '2d': 'تَغْدُوَا',
      '3md': 'يَغْدُوَا',
      '3fd': 'تَغْدُوَا',
      '1p': 'نَغْدُوَ',
      '2mp': 'تَغْدُوا',
      '2fp': 'تَغْدُونَ',
      '3mp': 'يَغْدُوا',
      '3fp': 'يَغْدُونَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('gdw-1')!, 'jussive')).toEqualT({
      '1s': 'أَغْدُ',
      '2ms': 'تَغْدُ',
      '2fs': 'تَغْدِي',
      '3ms': 'يَغْدُ',
      '3fs': 'تَغْدُ',
      '2d': 'تَغْدُوَا',
      '3md': 'يَغْدُوَا',
      '3fd': 'تَغْدُوَا',
      '1p': 'نَغْدُ',
      '2mp': 'تَغْدُوا',
      '2fp': 'تَغْدُونَ',
      '3mp': 'يَغْدُوا',
      '3fp': 'يَغْدُونَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('gdw-1')!)).toMatchObjectT({
      '2ms': 'اُغْدُ',
      '2fs': 'اُغْدِي',
      '2d': 'اُغْدُوَا',
      '2mp': 'اُغْدُوا',
      '2fp': 'اُغْدُونَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('gdw-1')!)).toMatchObjectT({
      '3ms': 'غُدِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('gdw-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُغْدَى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('gdw-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُغْدَى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('gdw-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُغْدَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('gdw-1')!)).toEqualT('غَادٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('gdw-1')!)).toEqualT('مَغْدُوّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('gdw-1')!)).toEqualT(['غَدْوَة', 'غُدْوَة', 'غُدُوّ'])
  })
})
