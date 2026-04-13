import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotateActiveFuture } from './future-annotation'

describe('annotateActiveFuture', () => {
  test('Form I — كتب (3mp) matches annotation object', () => {
    const result = annotateActiveFuture(getVerb('كتب', 1), '3mp')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 1 }, arabic: 'كَتَبَ' },
        { kind: { type: 'tense', verbTense: 'active.present.indicative' }, arabic: 'يَكْتُبُ' },
        { kind: { type: 'pronoun', pronounId: '3mp' }, arabic: 'يَكْتُبُوْنَ' },
        { kind: { type: 'tense', verbTense: 'active.future' }, arabic: 'سَيَكْتُبُوْنَ' },
      ],
      morphemes: [
        { text: 'سَ', role: 'tense' },
        { text: 'يَ', role: 'suffix' },
        { text: 'كْتُبُ', role: 'root' },
        { text: 'وْنَ', role: 'suffix' },
      ],
    })
  })

  test('Form X — خرج (3ms) matches annotation object', () => {
    const result = annotateActiveFuture(getVerb('خرج', 10), '3ms')

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
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          morphemes: [
            { text: 'اِ', role: 'dropped' },
            { text: 'يَ', role: 'tense' },
            { text: 'سْتَ', role: 'form' },
            { text: 'خْرِجُ', role: 'root' },
          ],
        },
        { kind: { type: 'tense', verbTense: 'active.future' }, arabic: 'سَيَسْتَخْرِجُ' },
      ],
      morphemes: [
        { text: 'سَ', role: 'tense' },
        { text: 'يَ', role: 'suffix' },
        { text: 'سْتَ', role: 'form' },
        { text: 'خْرِجُ', role: 'root' },
      ],
    })
  })

  test('Form III — كتب (3ms) matches annotation object', () => {
    const result = annotateActiveFuture(getVerb('كتب', 3), '3ms')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 3 }, arabic: 'كَاتَبَ' },
        { kind: { type: 'tense', verbTense: 'active.present.indicative' }, arabic: 'يُكَاتِبُ' },
        { kind: { type: 'tense', verbTense: 'active.future' }, arabic: 'سَيُكَاتِبُ' },
      ],
      morphemes: [
        { text: 'سَ', role: 'tense' },
        { text: 'يُ', role: 'suffix' },
        { text: 'كَ', role: 'root' },
        { text: 'ا', role: 'form' },
        { text: 'تِبُ', role: 'root' },
      ],
    })
  })

  test('Form IV — حبب (3ms) matches annotation object', () => {
    const result = annotateActiveFuture(getVerb('حبب', 4), '3ms')

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
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          morphemes: [
            { text: 'أَ', role: 'dropped' },
            { text: 'يُ', role: 'tense' },
            { text: 'حِبُّ', role: 'root' },
          ],
        },
        { kind: { type: 'tense', verbTense: 'active.future' } },
      ],
    })
  })
})
