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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'كَتَبَ',
          morphemes: [{ text: 'كَتَبَ', role: 'root' }],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '3mp' },
          arabic: 'يَكْتُبُوْنَ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
            { text: 'وْنَ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.future' },
          arabic: 'سَيَكْتُبُوْنَ',
          morphemes: [
            { text: 'سَ', role: 'tense' },
            { text: 'يَ', role: 'suffix' },
            { text: 'كْتُبُ', role: 'root' },
            { text: 'وْنَ', role: 'suffix' },
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
            { text: 'خ', role: 'root' },
            { text: 'ر', role: 'root' },
            { text: 'ج', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 10 },
          arabic: 'اِسْتَخْرَجَ',
          morphemes: [
            { text: 'اِسْتَ', role: 'form' },
            { text: 'خْرَجَ', role: 'root' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَسْتَخْرِجُ',
          morphemes: [
            { text: 'اِ', role: 'dropped' },
            { text: 'يَ', role: 'tense' },
            { text: 'سْتَ', role: 'form' },
            { text: 'خْرِجُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.future' },
          arabic: 'سَيَسْتَخْرِجُ',
          morphemes: [
            { text: 'سَ', role: 'tense' },
            { text: 'يَ', role: 'suffix' },
            { text: 'سْتَ', role: 'form' },
            { text: 'خْرِجُ', role: 'root' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 3 },
          arabic: 'كَاتَبَ',
          morphemes: [
            { text: 'كَ', role: 'root' },
            { text: 'ا', role: 'form' },
            { text: 'تَبَ', role: 'root' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يُكَاتِبُ',
          morphemes: [
            { text: 'يُ', role: 'tense' },
            { text: 'كَ', role: 'root' },
            { text: 'ا', role: 'form' },
            { text: 'تِبُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.future' },
          arabic: 'سَيُكَاتِبُ',
          morphemes: [
            { text: 'سَ', role: 'tense' },
            { text: 'يُ', role: 'suffix' },
            { text: 'كَ', role: 'root' },
            { text: 'ا', role: 'form' },
            { text: 'تِبُ', role: 'root' },
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
            { text: 'ح', role: 'root' },
            { text: 'ب', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 4 },
          arabic: 'أَحَبَّ',
          morphemes: [
            { text: 'أَ', role: 'form' },
            { text: 'حَبَّ', role: 'root' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يُحِبُّ',
          morphemes: [
            { text: 'أَ', role: 'dropped' },
            { text: 'يُ', role: 'tense' },
            { text: 'حِبُّ', role: 'root' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.future' },
          arabic: 'سَيُحِبُّ',
          morphemes: [
            { text: 'سَ', role: 'tense' },
            { text: 'يُ', role: 'suffix' },
            { text: 'حِبُّ', role: 'root' },
          ],
        },
      ],
    })
  })
})
