import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotatePassivePast } from './past-annotation'

describe('annotatePassivePast', () => {
  test('Form I — كتب (1s) matches annotation object', () => {
    const result = annotatePassivePast(getVerb('كتب', 1), '1s')

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
          kind: { type: 'tense', verbTense: 'passive.past' },
          arabic: 'كُتِبَ',
          morphemes: [{ text: 'كُتِبَ', role: 'radical' }],
        },
        {
          kind: { type: 'pronoun', pronounId: '1s' },
          arabic: 'كُتِبْتُ',
          morphemes: [
            { text: 'كُتِب', role: 'radical' },
            { text: 'ْتُ', role: 'agreement' },
          ],
        },
      ],
    })
  })
})
