import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('whn-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('whn-1')!)).toEqualT({
      '1s': 'وَهَنْتُ',
      '2ms': 'وَهَنْتَ',
      '2fs': 'وَهَنْتِ',
      '3ms': 'وَهَنَ',
      '3fs': 'وَهَنَتْ',
      '2d': 'وَهَنْتُمَا',
      '3md': 'وَهَنَا',
      '3fd': 'وَهَنَتَا',
      '1p': 'وَهَنَّا',
      '2mp': 'وَهَنْتُمْ',
      '2fp': 'وَهَنْتُنَّ',
      '3mp': 'وَهَنُوا',
      '3fp': 'وَهَنَّ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('whn-1')!, 'indicative')).toEqualT({
      '1s': 'أَهِنُ',
      '2ms': 'تَهِنُ',
      '2fs': 'تَهِنِينَ',
      '3ms': 'يَهِنُ',
      '3fs': 'تَهِنُ',
      '2d': 'تَهِنَانِ',
      '3md': 'يَهِنَانِ',
      '3fd': 'تَهِنَانِ',
      '1p': 'نَهِنُ',
      '2mp': 'تَهِنُونَ',
      '2fp': 'تَهِنَّ',
      '3mp': 'يَهِنُونَ',
      '3fp': 'يَهِنَّ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('whn-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَهِنَ',
      '2ms': 'تَهِنَ',
      '2fs': 'تَهِنِي',
      '3ms': 'يَهِنَ',
      '3fs': 'تَهِنَ',
      '2d': 'تَهِنَا',
      '3md': 'يَهِنَا',
      '3fd': 'تَهِنَا',
      '1p': 'نَهِنَ',
      '2mp': 'تَهِنُوا',
      '2fp': 'تَهِنَّ',
      '3mp': 'يَهِنُوا',
      '3fp': 'يَهِنَّ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('whn-1')!, 'jussive')).toEqualT({
      '1s': 'أَهِنْ',
      '2ms': 'تَهِنْ',
      '2fs': 'تَهِنِي',
      '3ms': 'يَهِنْ',
      '3fs': 'تَهِنْ',
      '2d': 'تَهِنَا',
      '3md': 'يَهِنَا',
      '3fd': 'تَهِنَا',
      '1p': 'نَهِنْ',
      '2mp': 'تَهِنُوا',
      '2fp': 'تَهِنَّ',
      '3mp': 'يَهِنُوا',
      '3fp': 'يَهِنَّ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('whn-1')!)).toMatchObjectT({
      '2ms': 'هِنْ',
      '2fs': 'هِنِي',
      '2d': 'هِنَا',
      '2mp': 'هِنُوا',
      '2fp': 'هِنَّ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('whn-1')!)).toMatchObjectT({
      '3ms': 'وُهِنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('whn-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُوهَنُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('whn-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُوهَنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('whn-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُوهَنْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('whn-1')!)).toEqualT('وَاهِن')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('whn-1')!)).toEqualT('مَوْهُون')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('whn-1')!)).toEqualT(['وَهْن', 'وَهَن'])
  })
})
