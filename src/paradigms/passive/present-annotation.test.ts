import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotatePassivePresentMood } from './present-annotation'

describe('annotatePassivePresentMood', () => {
  test('indicative Form I — كتب (1s) matches annotation object', () => {
    const result = annotatePassivePresentMood(getVerb('كتب', 1), 'indicative', '1s')

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
      ],
    })
  })
})
