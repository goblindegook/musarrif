import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Edw-3 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Edw-3')!)).toEqualT({
      '1s': 'عَادَيْتُ',
      '2ms': 'عَادَيْتَ',
      '2fs': 'عَادَيْتِ',
      '3ms': 'عَادَى',
      '3fs': 'عَادَتْ',
      '2d': 'عَادَيْتُمَا',
      '3md': 'عَادَيَا',
      '3fd': 'عَادَتَا',
      '1p': 'عَادَيْنَا',
      '2mp': 'عَادَيْتُمْ',
      '2fp': 'عَادَيْتُنَّ',
      '3mp': 'عَادَوْا',
      '3fp': 'عَادَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Edw-3')!, 'indicative')).toEqualT({
      '1s': 'أُعَادِي',
      '2ms': 'تُعَادِي',
      '2fs': 'تُعَادِينَ',
      '3ms': 'يُعَادِي',
      '3fs': 'تُعَادِي',
      '2d': 'تُعَادِيَانِ',
      '3md': 'يُعَادِيَانِ',
      '3fd': 'تُعَادِيَانِ',
      '1p': 'نُعَادِي',
      '2mp': 'تُعَادُونَ',
      '2fp': 'تُعَادِينَ',
      '3mp': 'يُعَادُونَ',
      '3fp': 'يُعَادِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Edw-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُعَادِيَ',
      '2ms': 'تُعَادِيَ',
      '2fs': 'تُعَادِي',
      '3ms': 'يُعَادِيَ',
      '3fs': 'تُعَادِيَ',
      '2d': 'تُعَادِيَا',
      '3md': 'يُعَادِيَا',
      '3fd': 'تُعَادِيَا',
      '1p': 'نُعَادِيَ',
      '2mp': 'تُعَادُوا',
      '2fp': 'تُعَادِينَ',
      '3mp': 'يُعَادُوا',
      '3fp': 'يُعَادِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Edw-3')!, 'jussive')).toEqualT({
      '1s': 'أُعَادِ',
      '2ms': 'تُعَادِ',
      '2fs': 'تُعَادِي',
      '3ms': 'يُعَادِ',
      '3fs': 'تُعَادِ',
      '2d': 'تُعَادِيَا',
      '3md': 'يُعَادِيَا',
      '3fd': 'تُعَادِيَا',
      '1p': 'نُعَادِ',
      '2mp': 'تُعَادُوا',
      '2fp': 'تُعَادِينَ',
      '3mp': 'يُعَادُوا',
      '3fp': 'يُعَادِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Edw-3')!)).toMatchObjectT({
      '2ms': 'عَادِ',
      '2fs': 'عَادِي',
      '2d': 'عَادِيَا',
      '2mp': 'عَادُوا',
      '2fp': 'عَادِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Edw-3')!)).toEqualT({
      '1s': 'عُودِيتُ',
      '2ms': 'عُودِيتَ',
      '2fs': 'عُودِيتِ',
      '3ms': 'عُودِيَ',
      '3fs': 'عُودِيَتْ',
      '2d': 'عُودِيتُمَا',
      '3md': 'عُودِيَا',
      '3fd': 'عُودِيَتَا',
      '1p': 'عُودِينَا',
      '2mp': 'عُودِيتُمْ',
      '2fp': 'عُودِيتُنَّ',
      '3mp': 'عُودُوا',
      '3fp': 'عُودِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Edw-3')!, 'indicative')).toEqualT({
      '1s': 'أُعَادَى',
      '2ms': 'تُعَادَى',
      '2fs': 'تُعَادَيْنَ',
      '3ms': 'يُعَادَى',
      '3fs': 'تُعَادَى',
      '2d': 'تُعَادَيَانِ',
      '3md': 'يُعَادَيَانِ',
      '3fd': 'تُعَادَيَانِ',
      '1p': 'نُعَادَى',
      '2mp': 'تُعَادَوْنَ',
      '2fp': 'تُعَادَيْنَ',
      '3mp': 'يُعَادَوْنَ',
      '3fp': 'يُعَادَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Edw-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُعَادَى',
      '2ms': 'تُعَادَى',
      '2fs': 'تُعَادَيْ',
      '3ms': 'يُعَادَى',
      '3fs': 'تُعَادَى',
      '2d': 'تُعَادَيَا',
      '3md': 'يُعَادَيَا',
      '3fd': 'تُعَادَيَا',
      '1p': 'نُعَادَى',
      '2mp': 'تُعَادَوْا',
      '2fp': 'تُعَادَيْنَ',
      '3mp': 'يُعَادَوْا',
      '3fp': 'يُعَادَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Edw-3')!, 'jussive')).toEqualT({
      '1s': 'أُعَادَ',
      '2ms': 'تُعَادَ',
      '2fs': 'تُعَادَيْ',
      '3ms': 'يُعَادَ',
      '3fs': 'تُعَادَ',
      '2d': 'تُعَادَيَا',
      '3md': 'يُعَادَيَا',
      '3fd': 'تُعَادَيَا',
      '1p': 'نُعَادَ',
      '2mp': 'تُعَادَوْا',
      '2fp': 'تُعَادَيْنَ',
      '3mp': 'يُعَادَوْا',
      '3fp': 'يُعَادَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Edw-3')!)).toEqualT('مُعَادٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Edw-3')!)).toEqualT('مُعَادًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Edw-3')!))).toEqualT(new Set(['مُعَادَاة', 'عِدَاء']))
  })
})
