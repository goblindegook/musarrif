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
          kind: { type: 'tense', verbTense: 'passive.present.indicative' },
          arabic: 'يُكْتَبُ',
          morphemes: [
            { text: 'يُ', role: 'agreement' },
            { text: 'ك', role: 'radical' },
            { text: 'ْ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'ُ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '1s' },
          arabic: 'أُكْتَبُ',
          morphemes: [
            { text: 'أُ', role: 'agreement' },
            { text: 'ك', role: 'radical' },
            { text: 'ْ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'ُ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'passive.future' },
          arabic: 'سَأُكْتَبُ',
          morphemes: [
            { text: 'سَ', role: 'particle' },
            { text: 'أُ', role: 'agreement' },
            { text: 'ك', role: 'radical' },
            { text: 'ْ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'ُ', role: 'agreement' },
          ],
        },
      ],
    })
  })
})
