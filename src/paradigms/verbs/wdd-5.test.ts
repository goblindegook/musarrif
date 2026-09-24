import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wdd-5 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wdd-5')!)).toEqualT({
      '1s': 'تَوَدَّدْتُ',
      '2ms': 'تَوَدَّدْتَ',
      '2fs': 'تَوَدَّدْتِ',
      '3ms': 'تَوَدَّدَ',
      '3fs': 'تَوَدَّدَتْ',
      '2d': 'تَوَدَّدْتُمَا',
      '3md': 'تَوَدَّدَا',
      '3fd': 'تَوَدَّدَتَا',
      '1p': 'تَوَدَّدْنَا',
      '2mp': 'تَوَدَّدْتُمْ',
      '2fp': 'تَوَدَّدْتُنَّ',
      '3mp': 'تَوَدَّدُوا',
      '3fp': 'تَوَدَّدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wdd-5')!, 'indicative')).toEqualT({
      '1s': 'أَتَوَدَّدُ',
      '2ms': 'تَتَوَدَّدُ',
      '2fs': 'تَتَوَدَّدِينَ',
      '3ms': 'يَتَوَدَّدُ',
      '3fs': 'تَتَوَدَّدُ',
      '2d': 'تَتَوَدَّدَانِ',
      '3md': 'يَتَوَدَّدَانِ',
      '3fd': 'تَتَوَدَّدَانِ',
      '1p': 'نَتَوَدَّدُ',
      '2mp': 'تَتَوَدَّدُونَ',
      '2fp': 'تَتَوَدَّدْنَ',
      '3mp': 'يَتَوَدَّدُونَ',
      '3fp': 'يَتَوَدَّدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wdd-5')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَوَدَّدَ',
      '2ms': 'تَتَوَدَّدَ',
      '2fs': 'تَتَوَدَّدِي',
      '3ms': 'يَتَوَدَّدَ',
      '3fs': 'تَتَوَدَّدَ',
      '2d': 'تَتَوَدَّدَا',
      '3md': 'يَتَوَدَّدَا',
      '3fd': 'تَتَوَدَّدَا',
      '1p': 'نَتَوَدَّدَ',
      '2mp': 'تَتَوَدَّدُوا',
      '2fp': 'تَتَوَدَّدْنَ',
      '3mp': 'يَتَوَدَّدُوا',
      '3fp': 'يَتَوَدَّدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wdd-5')!, 'jussive')).toEqualT({
      '1s': 'أَتَوَدَّدْ',
      '2ms': 'تَتَوَدَّدْ',
      '2fs': 'تَتَوَدَّدِي',
      '3ms': 'يَتَوَدَّدْ',
      '3fs': 'تَتَوَدَّدْ',
      '2d': 'تَتَوَدَّدَا',
      '3md': 'يَتَوَدَّدَا',
      '3fd': 'تَتَوَدَّدَا',
      '1p': 'نَتَوَدَّدْ',
      '2mp': 'تَتَوَدَّدُوا',
      '2fp': 'تَتَوَدَّدْنَ',
      '3mp': 'يَتَوَدَّدُوا',
      '3fp': 'يَتَوَدَّدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wdd-5')!)).toMatchObjectT({
      '2ms': 'تَوَدَّدْ',
      '2fs': 'تَوَدَّدِي',
      '2d': 'تَوَدَّدَا',
      '2mp': 'تَوَدَّدُوا',
      '2fp': 'تَوَدَّدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wdd-5')!)).toEqualT({
      '1s': 'تُوُدِّدْتُ',
      '2ms': 'تُوُدِّدْتَ',
      '2fs': 'تُوُدِّدْتِ',
      '3ms': 'تُوُدِّدَ',
      '3fs': 'تُوُدِّدَتْ',
      '2d': 'تُوُدِّدْتُمَا',
      '3md': 'تُوُدِّدَا',
      '3fd': 'تُوُدِّدَتَا',
      '1p': 'تُوُدِّدْنَا',
      '2mp': 'تُوُدِّدْتُمْ',
      '2fp': 'تُوُدِّدْتُنَّ',
      '3mp': 'تُوُدِّدُوا',
      '3fp': 'تُوُدِّدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wdd-5')!, 'indicative')).toEqualT({
      '1s': 'أُتَوَدَّدُ',
      '2ms': 'تُتَوَدَّدُ',
      '2fs': 'تُتَوَدَّدِينَ',
      '3ms': 'يُتَوَدَّدُ',
      '3fs': 'تُتَوَدَّدُ',
      '2d': 'تُتَوَدَّدَانِ',
      '3md': 'يُتَوَدَّدَانِ',
      '3fd': 'تُتَوَدَّدَانِ',
      '1p': 'نُتَوَدَّدُ',
      '2mp': 'تُتَوَدَّدُونَ',
      '2fp': 'تُتَوَدَّدْنَ',
      '3mp': 'يُتَوَدَّدُونَ',
      '3fp': 'يُتَوَدَّدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wdd-5')!, 'subjunctive')).toEqualT({
      '1s': 'أُتَوَدَّدَ',
      '2ms': 'تُتَوَدَّدَ',
      '2fs': 'تُتَوَدَّدِي',
      '3ms': 'يُتَوَدَّدَ',
      '3fs': 'تُتَوَدَّدَ',
      '2d': 'تُتَوَدَّدَا',
      '3md': 'يُتَوَدَّدَا',
      '3fd': 'تُتَوَدَّدَا',
      '1p': 'نُتَوَدَّدَ',
      '2mp': 'تُتَوَدَّدُوا',
      '2fp': 'تُتَوَدَّدْنَ',
      '3mp': 'يُتَوَدَّدُوا',
      '3fp': 'يُتَوَدَّدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wdd-5')!, 'jussive')).toEqualT({
      '1s': 'أُتَوَدَّدْ',
      '2ms': 'تُتَوَدَّدْ',
      '2fs': 'تُتَوَدَّدِي',
      '3ms': 'يُتَوَدَّدْ',
      '3fs': 'تُتَوَدَّدْ',
      '2d': 'تُتَوَدَّدَا',
      '3md': 'يُتَوَدَّدَا',
      '3fd': 'تُتَوَدَّدَا',
      '1p': 'نُتَوَدَّدْ',
      '2mp': 'تُتَوَدَّدُوا',
      '2fp': 'تُتَوَدَّدْنَ',
      '3mp': 'يُتَوَدَّدُوا',
      '3fp': 'يُتَوَدَّدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wdd-5')!)).toEqualT('مُتَوَدِّد')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wdd-5')!)).toEqualT('مُتَوَدَّد')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('wdd-5')!))).toEqualT(new Set(['تَوَدُّد']))
  })
})
