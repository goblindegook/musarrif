import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('qwy-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('qwy-1')!)).toEqualT({
      '1s': 'قَوِيتُ',
      '2ms': 'قَوِيتَ',
      '2fs': 'قَوِيتِ',
      '3ms': 'قَوِيَ',
      '3fs': 'قَوِيَتْ',
      '2d': 'قَوِيتُمَا',
      '3md': 'قَوِيَا',
      '3fd': 'قَوِيَتَا',
      '1p': 'قَوِينَا',
      '2mp': 'قَوِيتُمْ',
      '2fp': 'قَوِيتُنَّ',
      '3mp': 'قَوُوا',
      '3fp': 'قَوِينَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('qwy-1')!, 'indicative')).toEqualT({
      '1s': 'أَقْوَى',
      '2ms': 'تَقْوَى',
      '2fs': 'تَقْوَيْنَ',
      '3ms': 'يَقْوَى',
      '3fs': 'تَقْوَى',
      '2d': 'تَقْوَيَانِ',
      '3md': 'يَقْوَيَانِ',
      '3fd': 'تَقْوَيَانِ',
      '1p': 'نَقْوَى',
      '2mp': 'تَقْوَوْنَ',
      '2fp': 'تَقْوَيْنَ',
      '3mp': 'يَقْوَوْنَ',
      '3fp': 'يَقْوَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('qwy-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَقْوَى',
      '2ms': 'تَقْوَى',
      '2fs': 'تَقْوَيْ',
      '3ms': 'يَقْوَى',
      '3fs': 'تَقْوَى',
      '2d': 'تَقْوَيَا',
      '3md': 'يَقْوَيَا',
      '3fd': 'تَقْوَيَا',
      '1p': 'نَقْوَى',
      '2mp': 'تَقْوَوْا',
      '2fp': 'تَقْوَيْنَ',
      '3mp': 'يَقْوَوْا',
      '3fp': 'يَقْوَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('qwy-1')!, 'jussive')).toEqualT({
      '1s': 'أَقْوَ',
      '2ms': 'تَقْوَ',
      '2fs': 'تَقْوَيْ',
      '3ms': 'يَقْوَ',
      '3fs': 'تَقْوَ',
      '2d': 'تَقْوَيَا',
      '3md': 'يَقْوَيَا',
      '3fd': 'تَقْوَيَا',
      '1p': 'نَقْوَ',
      '2mp': 'تَقْوَوْا',
      '2fp': 'تَقْوَيْنَ',
      '3mp': 'يَقْوَوْا',
      '3fp': 'يَقْوَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('qwy-1')!)).toMatchObjectT({
      '2ms': 'اِقْوَ',
      '2fs': 'اِقْوَيْ',
      '2d': 'اِقْوَيَا',
      '2mp': 'اِقْوَوْا',
      '2fp': 'اِقْوَيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('qwy-1')!)).toMatchObjectT({
      '3ms': 'قُوِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('qwy-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُقْوَى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('qwy-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُقْوَى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('qwy-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُقْوَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('qwy-1')!)).toEqualT('قَوِيّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('qwy-1')!)).toEqualT('مَقْوِيّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('qwy-1')!)).toEqualT(['قُوَّة'])
  })
})
