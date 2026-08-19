import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Elw-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Elw-1')!)).toEqualT({
      '1s': 'عَلَوْتُ',
      '2ms': 'عَلَوْتَ',
      '2fs': 'عَلَوْتِ',
      '3ms': 'عَلَا',
      '3fs': 'عَلَتْ',
      '2d': 'عَلَوْتُمَا',
      '3md': 'عَلَوَا',
      '3fd': 'عَلَتَا',
      '1p': 'عَلَوْنَا',
      '2mp': 'عَلَوْتُمْ',
      '2fp': 'عَلَوْتُنَّ',
      '3mp': 'عَلَوْا',
      '3fp': 'عَلَوْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Elw-1')!, 'indicative')).toEqualT({
      '1s': 'أَعْلُو',
      '2ms': 'تَعْلُو',
      '2fs': 'تَعْلِينَ',
      '3ms': 'يَعْلُو',
      '3fs': 'تَعْلُو',
      '2d': 'تَعْلُوَانِ',
      '3md': 'يَعْلُوَانِ',
      '3fd': 'تَعْلُوَانِ',
      '1p': 'نَعْلُو',
      '2mp': 'تَعْلُونَ',
      '2fp': 'تَعْلُونَ',
      '3mp': 'يَعْلُونَ',
      '3fp': 'يَعْلُونَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Elw-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَعْلُوَ',
      '2ms': 'تَعْلُوَ',
      '2fs': 'تَعْلِي',
      '3ms': 'يَعْلُوَ',
      '3fs': 'تَعْلُوَ',
      '2d': 'تَعْلُوَا',
      '3md': 'يَعْلُوَا',
      '3fd': 'تَعْلُوَا',
      '1p': 'نَعْلُوَ',
      '2mp': 'تَعْلُوا',
      '2fp': 'تَعْلُونَ',
      '3mp': 'يَعْلُوا',
      '3fp': 'يَعْلُونَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Elw-1')!, 'jussive')).toEqualT({
      '1s': 'أَعْلُ',
      '2ms': 'تَعْلُ',
      '2fs': 'تَعْلِي',
      '3ms': 'يَعْلُ',
      '3fs': 'تَعْلُ',
      '2d': 'تَعْلُوَا',
      '3md': 'يَعْلُوَا',
      '3fd': 'تَعْلُوَا',
      '1p': 'نَعْلُ',
      '2mp': 'تَعْلُوا',
      '2fp': 'تَعْلُونَ',
      '3mp': 'يَعْلُوا',
      '3fp': 'يَعْلُونَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Elw-1')!)).toMatchObjectT({
      '2ms': 'اُعْلُ',
      '2fs': 'اُعْلِي',
      '2d': 'اُعْلُوَا',
      '2mp': 'اُعْلُوا',
      '2fp': 'اُعْلُونَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Elw-1')!)).toEqualT({
      '1s': 'عُلِيتُ',
      '2ms': 'عُلِيتَ',
      '2fs': 'عُلِيتِ',
      '3ms': 'عُلِيَ',
      '3fs': 'عُلِيَتْ',
      '2d': 'عُلِيتُمَا',
      '3md': 'عُلِيَا',
      '3fd': 'عُلِيَتَا',
      '1p': 'عُلِينَا',
      '2mp': 'عُلِيتُمْ',
      '2fp': 'عُلِيتُنَّ',
      '3mp': 'عُلُوا',
      '3fp': 'عُلِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Elw-1')!, 'indicative')).toEqualT({
      '1s': 'أُعْلَى',
      '2ms': 'تُعْلَى',
      '2fs': 'تُعْلَيْنَ',
      '3ms': 'يُعْلَى',
      '3fs': 'تُعْلَى',
      '2d': 'تُعْلَيَانِ',
      '3md': 'يُعْلَيَانِ',
      '3fd': 'تُعْلَيَانِ',
      '1p': 'نُعْلَى',
      '2mp': 'تُعْلَوْنَ',
      '2fp': 'تُعْلَيْنَ',
      '3mp': 'يُعْلَوْنَ',
      '3fp': 'يُعْلَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Elw-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُعْلَى',
      '2ms': 'تُعْلَى',
      '2fs': 'تُعْلَيْ',
      '3ms': 'يُعْلَى',
      '3fs': 'تُعْلَى',
      '2d': 'تُعْلَيَا',
      '3md': 'يُعْلَيَا',
      '3fd': 'تُعْلَيَا',
      '1p': 'نُعْلَى',
      '2mp': 'تُعْلَوْا',
      '2fp': 'تُعْلَيْنَ',
      '3mp': 'يُعْلَوْا',
      '3fp': 'يُعْلَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Elw-1')!, 'jussive')).toEqualT({
      '1s': 'أُعْلَ',
      '2ms': 'تُعْلَ',
      '2fs': 'تُعْلَيْ',
      '3ms': 'يُعْلَ',
      '3fs': 'تُعْلَ',
      '2d': 'تُعْلَيَا',
      '3md': 'يُعْلَيَا',
      '3fd': 'تُعْلَيَا',
      '1p': 'نُعْلَ',
      '2mp': 'تُعْلَوْا',
      '2fp': 'تُعْلَيْنَ',
      '3mp': 'يُعْلَوْا',
      '3fp': 'يُعْلَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Elw-1')!)).toEqualT('عَالٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Elw-1')!)).toEqualT('مَعْلُوّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Elw-1')!))).toEqualT(new Set(['عُلُوّ']))
  })
})
