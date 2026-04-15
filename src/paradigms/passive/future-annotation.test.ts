import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotatePassiveFuture } from './future-annotation'

describe('annotatePassiveFuture', () => {
  test('Form I — كتب (1s) matches annotation object', () => {
    const result = annotatePassiveFuture(getVerb('كتب', 1), '1s')

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
          kind: { type: 'tense', verbTense: 'passive.present.indicative' },
          arabic: 'يُكْتَبُ',
          morphemes: [
            { text: 'يُ', role: 'tense' },
            { text: 'كْتَبُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '1s' },
          arabic: 'أُكْتَبُ',
          morphemes: [
            { text: 'أُ', role: 'tense' },
            { text: 'كْتَب', role: 'root' },
            { text: 'ُ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'passive.future' },
          arabic: 'سَأُكْتَبُ',
          morphemes: [
            { text: 'سَ', role: 'tense' },
            { text: 'أُ', role: 'suffix' },
            { text: 'كْتَب', role: 'root' },
            { text: 'ُ', role: 'suffix' },
          ],
        },
      ],
    })
  })
})
