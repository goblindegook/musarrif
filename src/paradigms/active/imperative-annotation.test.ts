import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotateActiveImperative } from './imperative-annotation'

describe('annotateActiveImperative', () => {
  test('Form I — كتب (2fs) matches annotation object', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2fs')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 1 }, arabic: 'كَتَبَ' },
        { kind: { type: 'tense', verbTense: 'active.present.indicative' }, arabic: 'يَكْتُبُ' },
        { kind: { type: 'pronoun', pronounId: '2fs' }, arabic: 'تَكْتُبِيْنَ' },
        { kind: { type: 'tense', verbTense: 'active.present.jussive' }, arabic: 'تَكْتُبِي' },
        { kind: { type: 'tense', verbTense: 'active.imperative' }, arabic: 'اُكْتُبِي' },
      ],
      morphemes: [
        { text: 'تَ', role: 'dropped' },
        { text: 'اُ', role: 'tense' },
        { text: 'كْتُب', role: 'root' },
        { text: 'ِي', role: 'suffix' },
      ],
    })
  })

  test('Form X — خرج (2ms) matches annotation object', () => {
    const result = annotateActiveImperative(getVerb('خرج', 10), '2ms')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'خرج' },
        {
          kind: { type: 'form', form: 10 },
          arabic: 'اِسْتَخْرَجَ',
          morphemes: [
            { text: 'اِسْتَ', role: 'form' },
            { text: 'خْرَجَ', role: 'root' },
          ],
        },
        { kind: { type: 'tense', verbTense: 'active.present.indicative' }, arabic: 'يَسْتَخْرِجُ' },
        { kind: { type: 'pronoun', pronounId: '2ms' }, arabic: 'تَسْتَخْرِجُ' },
        { kind: { type: 'tense', verbTense: 'active.present.jussive' }, arabic: 'تَسْتَخْرِجْ' },
        {
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'اِسْتَخْرِجْ',
          morphemes: [
            { text: 'تَ', role: 'dropped' },
            { text: 'اِ', role: 'tense' },
            { text: 'سْتَ', role: 'form' },
            { text: 'خْرِجْ', role: 'root' },
          ],
        },
      ],
    })
  })

  test('Form I — كتب (2d) dropped person prefix annotated', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2d')

    expect(result.morphemes).toMatchObject([
      { text: 'تَ', role: 'dropped' },
      { text: 'اُ', role: 'tense' },
      { text: 'كْتُب', role: 'root' },
      { text: 'َا', role: 'suffix' },
    ])
  })

  test('Form IV — حبب (2ms) matches annotation object', () => {
    const result = annotateActiveImperative(getVerb('حبب', 4), '2ms')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'حبب' },
        {
          kind: { type: 'form', form: 4 },
          morphemes: [
            { text: 'أَ', role: 'form' },
            { text: 'حَبَّ', role: 'root' },
          ],
        },
        { kind: { type: 'tense', verbTense: 'active.present.indicative' } },
        { kind: { type: 'pronoun', pronounId: '2ms' } },
        { kind: { type: 'tense', verbTense: 'active.present.jussive' } },
        {
          kind: { type: 'tense', verbTense: 'active.imperative' },
          morphemes: [
            { text: 'تُ', role: 'dropped' },
            { text: 'أَ', role: 'form' },
            { text: 'حِبَّ', role: 'root' },
          ],
        },
      ],
    })
  })

  test('Form I — كتب (2ms) dropped person prefix annotated', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2ms')

    expect(result.morphemes).toMatchObject([
      { text: 'تَ', role: 'dropped' },
      { text: 'اُ', role: 'tense' },
      { text: 'كْتُبْ', role: 'root' },
    ])
  })

  test('Form I — كتب (2mp) dropped person prefix annotated', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2mp')

    expect(result.morphemes).toMatchObject([
      { text: 'تَ', role: 'dropped' },
      { text: 'اُ', role: 'tense' },
      { text: 'كْتُب', role: 'root' },
      { role: 'suffix' },
    ])
  })

  test('Form I — كتب (2fp) dropped person prefix annotated', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2fp')

    expect(result.morphemes).toMatchObject([
      { text: 'تَ', role: 'dropped' },
      { text: 'اُ', role: 'tense' },
      { text: 'كْتُب', role: 'root' },
      { role: 'suffix' },
    ])
  })
})
