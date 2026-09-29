import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('tlw-1-a-u (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('tlw-1-a-u')!)).toEqualT({
      '1s': 'تَلَوْتُ',
      '2ms': 'تَلَوْتَ',
      '2fs': 'تَلَوْتِ',
      '3ms': 'تَلَا',
      '3fs': 'تَلَتْ',
      '2d': 'تَلَوْتُمَا',
      '3md': 'تَلَوَا',
      '3fd': 'تَلَتَا',
      '1p': 'تَلَوْنَا',
      '2mp': 'تَلَوْتُمْ',
      '2fp': 'تَلَوْتُنَّ',
      '3mp': 'تَلَوْا',
      '3fp': 'تَلَوْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('tlw-1-a-u')!, 'indicative')).toEqualT({
      '1s': 'أَتْلُو',
      '2ms': 'تَتْلُو',
      '2fs': 'تَتْلِينَ',
      '3ms': 'يَتْلُو',
      '3fs': 'تَتْلُو',
      '2d': 'تَتْلُوَانِ',
      '3md': 'يَتْلُوَانِ',
      '3fd': 'تَتْلُوَانِ',
      '1p': 'نَتْلُو',
      '2mp': 'تَتْلُونَ',
      '2fp': 'تَتْلُونَ',
      '3mp': 'يَتْلُونَ',
      '3fp': 'يَتْلُونَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('tlw-1-a-u')!, 'subjunctive')).toEqualT({
      '1s': 'أَتْلُوَ',
      '2ms': 'تَتْلُوَ',
      '2fs': 'تَتْلِي',
      '3ms': 'يَتْلُوَ',
      '3fs': 'تَتْلُوَ',
      '2d': 'تَتْلُوَا',
      '3md': 'يَتْلُوَا',
      '3fd': 'تَتْلُوَا',
      '1p': 'نَتْلُوَ',
      '2mp': 'تَتْلُوا',
      '2fp': 'تَتْلُونَ',
      '3mp': 'يَتْلُوا',
      '3fp': 'يَتْلُونَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('tlw-1-a-u')!, 'jussive')).toEqualT({
      '1s': 'أَتْلُ',
      '2ms': 'تَتْلُ',
      '2fs': 'تَتْلِي',
      '3ms': 'يَتْلُ',
      '3fs': 'تَتْلُ',
      '2d': 'تَتْلُوَا',
      '3md': 'يَتْلُوَا',
      '3fd': 'تَتْلُوَا',
      '1p': 'نَتْلُ',
      '2mp': 'تَتْلُوا',
      '2fp': 'تَتْلُونَ',
      '3mp': 'يَتْلُوا',
      '3fp': 'يَتْلُونَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('tlw-1-a-u')!)).toMatchObjectT({
      '2ms': 'اُتْلُ',
      '2fs': 'اُتْلِي',
      '2d': 'اُتْلُوَا',
      '2mp': 'اُتْلُوا',
      '2fp': 'اُتْلُونَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('tlw-1-a-u')!)).toEqualT({
      '1s': 'تُلِيتُ',
      '2ms': 'تُلِيتَ',
      '2fs': 'تُلِيتِ',
      '3ms': 'تُلِيَ',
      '3fs': 'تُلِيَتْ',
      '2d': 'تُلِيتُمَا',
      '3md': 'تُلِيَا',
      '3fd': 'تُلِيَتَا',
      '1p': 'تُلِينَا',
      '2mp': 'تُلِيتُمْ',
      '2fp': 'تُلِيتُنَّ',
      '3mp': 'تُلُوا',
      '3fp': 'تُلِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('tlw-1-a-u')!, 'indicative')).toEqualT({
      '1s': 'أُتْلَى',
      '2ms': 'تُتْلَى',
      '2fs': 'تُتْلَيْنَ',
      '3ms': 'يُتْلَى',
      '3fs': 'تُتْلَى',
      '2d': 'تُتْلَيَانِ',
      '3md': 'يُتْلَيَانِ',
      '3fd': 'تُتْلَيَانِ',
      '1p': 'نُتْلَى',
      '2mp': 'تُتْلَوْنَ',
      '2fp': 'تُتْلَيْنَ',
      '3mp': 'يُتْلَوْنَ',
      '3fp': 'يُتْلَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('tlw-1-a-u')!, 'subjunctive')).toEqualT({
      '1s': 'أُتْلَى',
      '2ms': 'تُتْلَى',
      '2fs': 'تُتْلَيْ',
      '3ms': 'يُتْلَى',
      '3fs': 'تُتْلَى',
      '2d': 'تُتْلَيَا',
      '3md': 'يُتْلَيَا',
      '3fd': 'تُتْلَيَا',
      '1p': 'نُتْلَى',
      '2mp': 'تُتْلَوْا',
      '2fp': 'تُتْلَيْنَ',
      '3mp': 'يُتْلَوْا',
      '3fp': 'يُتْلَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('tlw-1-a-u')!, 'jussive')).toEqualT({
      '1s': 'أُتْلَ',
      '2ms': 'تُتْلَ',
      '2fs': 'تُتْلَيْ',
      '3ms': 'يُتْلَ',
      '3fs': 'تُتْلَ',
      '2d': 'تُتْلَيَا',
      '3md': 'يُتْلَيَا',
      '3fd': 'تُتْلَيَا',
      '1p': 'نُتْلَ',
      '2mp': 'تُتْلَوْا',
      '2fp': 'تُتْلَيْنَ',
      '3mp': 'يُتْلَوْا',
      '3fp': 'يُتْلَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('tlw-1-a-u')!)).toEqualT('تَالٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('tlw-1-a-u')!)).toEqualT('مَتْلُوّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('tlw-1-a-u')!))).toEqualT(new Set(['تُلُوّ', 'تُلْو', 'تِلَاوَة']))
  })
})
