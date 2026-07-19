import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wvq-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wvq-1')!)).toEqualT({
      '1s': 'وَثُقْتُ',
      '2ms': 'وَثُقْتَ',
      '2fs': 'وَثُقْتِ',
      '3ms': 'وَثُقَ',
      '3fs': 'وَثُقَتْ',
      '2d': 'وَثُقْتُمَا',
      '3md': 'وَثُقَا',
      '3fd': 'وَثُقَتَا',
      '1p': 'وَثُقْنَا',
      '2mp': 'وَثُقْتُمْ',
      '2fp': 'وَثُقْتُنَّ',
      '3mp': 'وَثُقُوا',
      '3fp': 'وَثُقْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wvq-1')!, 'indicative')).toEqualT({
      '1s': 'أَوْثُقُ',
      '2ms': 'تَوْثُقُ',
      '2fs': 'تَوْثُقِينَ',
      '3ms': 'يَوْثُقُ',
      '3fs': 'تَوْثُقُ',
      '2d': 'تَوْثُقَانِ',
      '3md': 'يَوْثُقَانِ',
      '3fd': 'تَوْثُقَانِ',
      '1p': 'نَوْثُقُ',
      '2mp': 'تَوْثُقُونَ',
      '2fp': 'تَوْثُقْنَ',
      '3mp': 'يَوْثُقُونَ',
      '3fp': 'يَوْثُقْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wvq-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَوْثُقَ',
      '2ms': 'تَوْثُقَ',
      '2fs': 'تَوْثُقِي',
      '3ms': 'يَوْثُقَ',
      '3fs': 'تَوْثُقَ',
      '2d': 'تَوْثُقَا',
      '3md': 'يَوْثُقَا',
      '3fd': 'تَوْثُقَا',
      '1p': 'نَوْثُقَ',
      '2mp': 'تَوْثُقُوا',
      '2fp': 'تَوْثُقْنَ',
      '3mp': 'يَوْثُقُوا',
      '3fp': 'يَوْثُقْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wvq-1')!, 'jussive')).toEqualT({
      '1s': 'أَوْثُقْ',
      '2ms': 'تَوْثُقْ',
      '2fs': 'تَوْثُقِي',
      '3ms': 'يَوْثُقْ',
      '3fs': 'تَوْثُقْ',
      '2d': 'تَوْثُقَا',
      '3md': 'يَوْثُقَا',
      '3fd': 'تَوْثُقَا',
      '1p': 'نَوْثُقْ',
      '2mp': 'تَوْثُقُوا',
      '2fp': 'تَوْثُقْنَ',
      '3mp': 'يَوْثُقُوا',
      '3fp': 'يَوْثُقْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wvq-1')!)).toMatchObjectT({
      '2ms': 'اُوثُقْ',
      '2fs': 'اُوثُقِي',
      '2d': 'اُوثُقَا',
      '2mp': 'اُوثُقُوا',
      '2fp': 'اُوثُقْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wvq-1')!)).toMatchObjectT({
      '3ms': 'وُثِقَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wvq-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُوثَقُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wvq-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُوثَقَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wvq-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُوثَقْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wvq-1')!)).toEqualT('وَثِيق')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wvq-1')!)).toEqualT('مَوْثُوق')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wvq-1')!)).toEqualT(['وَثَاقَة'])
  })
})
