import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('ysr-4 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('ysr-4')!)).toEqualT({
      '1s': 'أَيْسَرْتُ',
      '2ms': 'أَيْسَرْتَ',
      '2fs': 'أَيْسَرْتِ',
      '3ms': 'أَيْسَرَ',
      '3fs': 'أَيْسَرَتْ',
      '2d': 'أَيْسَرْتُمَا',
      '3md': 'أَيْسَرَا',
      '3fd': 'أَيْسَرَتَا',
      '1p': 'أَيْسَرْنَا',
      '2mp': 'أَيْسَرْتُمْ',
      '2fp': 'أَيْسَرْتُنَّ',
      '3mp': 'أَيْسَرُوا',
      '3fp': 'أَيْسَرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('ysr-4')!, 'indicative')).toEqualT({
      '1s': 'أُوسِرُ',
      '2ms': 'تُوسِرُ',
      '2fs': 'تُوسِرِينَ',
      '3ms': 'يُوسِرُ',
      '3fs': 'تُوسِرُ',
      '2d': 'تُوسِرَانِ',
      '3md': 'يُوسِرَانِ',
      '3fd': 'تُوسِرَانِ',
      '1p': 'نُوسِرُ',
      '2mp': 'تُوسِرُونَ',
      '2fp': 'تُوسِرْنَ',
      '3mp': 'يُوسِرُونَ',
      '3fp': 'يُوسِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('ysr-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُوسِرَ',
      '2ms': 'تُوسِرَ',
      '2fs': 'تُوسِرِي',
      '3ms': 'يُوسِرَ',
      '3fs': 'تُوسِرَ',
      '2d': 'تُوسِرَا',
      '3md': 'يُوسِرَا',
      '3fd': 'تُوسِرَا',
      '1p': 'نُوسِرَ',
      '2mp': 'تُوسِرُوا',
      '2fp': 'تُوسِرْنَ',
      '3mp': 'يُوسِرُوا',
      '3fp': 'يُوسِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('ysr-4')!, 'jussive')).toEqualT({
      '1s': 'أُوسِرْ',
      '2ms': 'تُوسِرْ',
      '2fs': 'تُوسِرِي',
      '3ms': 'يُوسِرْ',
      '3fs': 'تُوسِرْ',
      '2d': 'تُوسِرَا',
      '3md': 'يُوسِرَا',
      '3fd': 'تُوسِرَا',
      '1p': 'نُوسِرْ',
      '2mp': 'تُوسِرُوا',
      '2fp': 'تُوسِرْنَ',
      '3mp': 'يُوسِرُوا',
      '3fp': 'يُوسِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('ysr-4')!)).toMatchObjectT({
      '2ms': 'أَيْسِرْ',
      '2fs': 'أَيْسِرِي',
      '2d': 'أَيْسِرَا',
      '2mp': 'أَيْسِرُوا',
      '2fp': 'أَيْسِرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('ysr-4')!)).toEqualT({
      '1s': 'أُوسِرْتُ',
      '2ms': 'أُوسِرْتَ',
      '2fs': 'أُوسِرْتِ',
      '3ms': 'أُوسِرَ',
      '3fs': 'أُوسِرَتْ',
      '2d': 'أُوسِرْتُمَا',
      '3md': 'أُوسِرَا',
      '3fd': 'أُوسِرَتَا',
      '1p': 'أُوسِرْنَا',
      '2mp': 'أُوسِرْتُمْ',
      '2fp': 'أُوسِرْتُنَّ',
      '3mp': 'أُوسِرُوا',
      '3fp': 'أُوسِرْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('ysr-4')!, 'indicative')).toEqualT({
      '1s': 'أُوسَرُ',
      '2ms': 'تُوسَرُ',
      '2fs': 'تُوسَرِينَ',
      '3ms': 'يُوسَرُ',
      '3fs': 'تُوسَرُ',
      '2d': 'تُوسَرَانِ',
      '3md': 'يُوسَرَانِ',
      '3fd': 'تُوسَرَانِ',
      '1p': 'نُوسَرُ',
      '2mp': 'تُوسَرُونَ',
      '2fp': 'تُوسَرْنَ',
      '3mp': 'يُوسَرُونَ',
      '3fp': 'يُوسَرْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('ysr-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُوسَرَ',
      '2ms': 'تُوسَرَ',
      '2fs': 'تُوسَرِي',
      '3ms': 'يُوسَرَ',
      '3fs': 'تُوسَرَ',
      '2d': 'تُوسَرَا',
      '3md': 'يُوسَرَا',
      '3fd': 'تُوسَرَا',
      '1p': 'نُوسَرَ',
      '2mp': 'تُوسَرُوا',
      '2fp': 'تُوسَرْنَ',
      '3mp': 'يُوسَرُوا',
      '3fp': 'يُوسَرْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('ysr-4')!, 'jussive')).toEqualT({
      '1s': 'أُوسَرْ',
      '2ms': 'تُوسَرْ',
      '2fs': 'تُوسَرِي',
      '3ms': 'يُوسَرْ',
      '3fs': 'تُوسَرْ',
      '2d': 'تُوسَرَا',
      '3md': 'يُوسَرَا',
      '3fd': 'تُوسَرَا',
      '1p': 'نُوسَرْ',
      '2mp': 'تُوسَرُوا',
      '2fp': 'تُوسَرْنَ',
      '3mp': 'يُوسَرُوا',
      '3fp': 'يُوسَرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('ysr-4')!)).toEqualT('مُوسِر')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('ysr-4')!)).toEqualT('مُوسَر')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('ysr-4')!))).toEqualT(new Set(['إِيسَار']))
  })
})
