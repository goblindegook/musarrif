import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotateActiveFuture } from './future-annotation'

describe('annotateActiveFuture', () => {
  test('Form I — كتب (3mp) matches annotation object', () => {
    const result = annotateActiveFuture(getVerb('كتب', 1), '3mp')

    expect(result).toEqual({
      steps: [
        {
          kind: { type: 'root' },
          arabic: 'كتب',
          morphemes: [
            { text: 'ك', role: 'radical' },
            { text: 'ت', role: 'radical' },
            { text: 'ب', role: 'radical' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'كَتَبَ',
          morphemes: [
            { text: 'ك', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '3mp' },
          arabic: 'يَكْتُبُونَ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
            { text: 'ونَ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.future' },
          arabic: 'سَيَكْتُبُونَ',
          morphemes: [
            { text: 'سَ', role: 'particle' },
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
            { text: 'ونَ', role: 'agreement' },
          ],
        },
      ],
    })
  })

  test('Form X — خرج (3ms) matches annotation object', () => {
    const result = annotateActiveFuture(getVerb('خرج', 10), '3ms')

    expect(result).toEqual({
      steps: [
        {
          kind: { type: 'root' },
          arabic: 'خرج',
          morphemes: [
            { text: 'خ', role: 'radical' },
            { text: 'ر', role: 'radical' },
            { text: 'ج', role: 'radical' },
          ],
        },
        {
          kind: { type: 'form', form: 10 },
          arabic: 'اِسْتَخْرَجَ',
          morphemes: [
            { text: 'اِسْتَ', role: 'measure' },
            { text: 'خْرَجَ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَسْتَخْرِجُ',
          morphemes: [
            { text: 'اِ', role: 'elided' },
            { text: 'يَ', role: 'agreement' },
            { text: 'سْتَ', role: 'measure' },
            { text: 'خْرِجُ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.future' },
          arabic: 'سَيَسْتَخْرِجُ',
          morphemes: [
            { text: 'سَ', role: 'particle' },
            { text: 'يَ', role: 'agreement' },
            { text: 'سْتَ', role: 'measure' },
            { text: 'خْرِجُ', role: 'radical' },
          ],
        },
      ],
    })
  })

  test('Form III — كتب (3ms) matches annotation object', () => {
    const result = annotateActiveFuture(getVerb('كتب', 3), '3ms')

    expect(result).toEqual({
      steps: [
        {
          kind: { type: 'root' },
          arabic: 'كتب',
          morphemes: [
            { text: 'ك', role: 'radical' },
            { text: 'ت', role: 'radical' },
            { text: 'ب', role: 'radical' },
          ],
        },
        {
          kind: { type: 'form', form: 3 },
          arabic: 'كَاتَبَ',
          morphemes: [
            { text: 'كَ', role: 'radical' },
            { text: 'ا', role: 'measure' },
            { text: 'تَبَ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يُكَاتِبُ',
          morphemes: [
            { text: 'يُ', role: 'agreement' },
            { text: 'كَ', role: 'radical' },
            { text: 'ا', role: 'measure' },
            { text: 'تِبُ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.future' },
          arabic: 'سَيُكَاتِبُ',
          morphemes: [
            { text: 'سَ', role: 'particle' },
            { text: 'يُ', role: 'agreement' },
            { text: 'كَ', role: 'radical' },
            { text: 'ا', role: 'measure' },
            { text: 'تِبُ', role: 'radical' },
          ],
        },
      ],
    })
  })

  test('Form IV — حبب (3ms) matches annotation object', () => {
    const result = annotateActiveFuture(getVerb('حبب', 4), '3ms')

    expect(result).toEqual({
      steps: [
        {
          kind: { type: 'root' },
          arabic: 'حبب',
          morphemes: [
            { text: 'ح', role: 'radical' },
            { text: 'ب', role: 'radical' },
            { text: 'ب', role: 'radical' },
          ],
        },
        {
          kind: { type: 'form', form: 4 },
          arabic: 'أَحَبَّ',
          morphemes: [
            { text: 'أَ', role: 'measure' },
            { text: 'حَبَّ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يُحِبُّ',
          morphemes: [
            { text: 'أَ', role: 'elided' },
            { text: 'يُ', role: 'agreement' },
            { text: 'حِبُّ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.future' },
          arabic: 'سَيُحِبُّ',
          morphemes: [
            { text: 'سَ', role: 'particle' },
            { text: 'يُ', role: 'agreement' },
            { text: 'حِبُّ', role: 'radical' },
          ],
        },
      ],
    })
  })
})
