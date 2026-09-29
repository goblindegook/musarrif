import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('*wy-4 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('*wy-4')!)).toEqualT({
      '1s': 'أَذْوَيْتُ',
      '2ms': 'أَذْوَيْتَ',
      '2fs': 'أَذْوَيْتِ',
      '3ms': 'أَذْوَى',
      '3fs': 'أَذْوَتْ',
      '2d': 'أَذْوَيْتُمَا',
      '3md': 'أَذْوَيَا',
      '3fd': 'أَذْوَتَا',
      '1p': 'أَذْوَيْنَا',
      '2mp': 'أَذْوَيْتُمْ',
      '2fp': 'أَذْوَيْتُنَّ',
      '3mp': 'أَذْوَوْا',
      '3fp': 'أَذْوَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('*wy-4')!, 'indicative')).toEqualT({
      '1s': 'أُذْوِي',
      '2ms': 'تُذْوِي',
      '2fs': 'تُذْوِينَ',
      '3ms': 'يُذْوِي',
      '3fs': 'تُذْوِي',
      '2d': 'تُذْوِيَانِ',
      '3md': 'يُذْوِيَانِ',
      '3fd': 'تُذْوِيَانِ',
      '1p': 'نُذْوِي',
      '2mp': 'تُذْوُونَ',
      '2fp': 'تُذْوِينَ',
      '3mp': 'يُذْوُونَ',
      '3fp': 'يُذْوِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('*wy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُذْوِيَ',
      '2ms': 'تُذْوِيَ',
      '2fs': 'تُذْوِي',
      '3ms': 'يُذْوِيَ',
      '3fs': 'تُذْوِيَ',
      '2d': 'تُذْوِيَا',
      '3md': 'يُذْوِيَا',
      '3fd': 'تُذْوِيَا',
      '1p': 'نُذْوِيَ',
      '2mp': 'تُذْوُوا',
      '2fp': 'تُذْوِينَ',
      '3mp': 'يُذْوُوا',
      '3fp': 'يُذْوِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('*wy-4')!, 'jussive')).toEqualT({
      '1s': 'أُذْوِ',
      '2ms': 'تُذْوِ',
      '2fs': 'تُذْوِي',
      '3ms': 'يُذْوِ',
      '3fs': 'تُذْوِ',
      '2d': 'تُذْوِيَا',
      '3md': 'يُذْوِيَا',
      '3fd': 'تُذْوِيَا',
      '1p': 'نُذْوِ',
      '2mp': 'تُذْوُوا',
      '2fp': 'تُذْوِينَ',
      '3mp': 'يُذْوُوا',
      '3fp': 'يُذْوِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('*wy-4')!)).toMatchObjectT({
      '2ms': 'أَذْوِ',
      '2fs': 'أَذْوِي',
      '2d': 'أَذْوِيَا',
      '2mp': 'أَذْوُوا',
      '2fp': 'أَذْوِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('*wy-4')!)).toEqualT({
      '1s': 'أُذْوِيتُ',
      '2ms': 'أُذْوِيتَ',
      '2fs': 'أُذْوِيتِ',
      '3ms': 'أُذْوِيَ',
      '3fs': 'أُذْوِيَتْ',
      '2d': 'أُذْوِيتُمَا',
      '3md': 'أُذْوِيَا',
      '3fd': 'أُذْوِيَتَا',
      '1p': 'أُذْوِينَا',
      '2mp': 'أُذْوِيتُمْ',
      '2fp': 'أُذْوِيتُنَّ',
      '3mp': 'أُذْوُوا',
      '3fp': 'أُذْوِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('*wy-4')!, 'indicative')).toEqualT({
      '1s': 'أُذْوَى',
      '2ms': 'تُذْوَى',
      '2fs': 'تُذْوَيْنَ',
      '3ms': 'يُذْوَى',
      '3fs': 'تُذْوَى',
      '2d': 'تُذْوَيَانِ',
      '3md': 'يُذْوَيَانِ',
      '3fd': 'تُذْوَيَانِ',
      '1p': 'نُذْوَى',
      '2mp': 'تُذْوَوْنَ',
      '2fp': 'تُذْوَيْنَ',
      '3mp': 'يُذْوَوْنَ',
      '3fp': 'يُذْوَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('*wy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُذْوَى',
      '2ms': 'تُذْوَى',
      '2fs': 'تُذْوَيْ',
      '3ms': 'يُذْوَى',
      '3fs': 'تُذْوَى',
      '2d': 'تُذْوَيَا',
      '3md': 'يُذْوَيَا',
      '3fd': 'تُذْوَيَا',
      '1p': 'نُذْوَى',
      '2mp': 'تُذْوَوْا',
      '2fp': 'تُذْوَيْنَ',
      '3mp': 'يُذْوَوْا',
      '3fp': 'يُذْوَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('*wy-4')!, 'jussive')).toEqualT({
      '1s': 'أُذْوَ',
      '2ms': 'تُذْوَ',
      '2fs': 'تُذْوَيْ',
      '3ms': 'يُذْوَ',
      '3fs': 'تُذْوَ',
      '2d': 'تُذْوَيَا',
      '3md': 'يُذْوَيَا',
      '3fd': 'تُذْوَيَا',
      '1p': 'نُذْوَ',
      '2mp': 'تُذْوَوْا',
      '2fp': 'تُذْوَيْنَ',
      '3mp': 'يُذْوَوْا',
      '3fp': 'يُذْوَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('*wy-4')!)).toEqualT('مُذْوٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('*wy-4')!)).toEqualT('مُذْوًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('*wy-4')!))).toEqualT(new Set(['إِذْوَاء']))
  })
})
