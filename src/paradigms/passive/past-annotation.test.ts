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
          kind: { type: 'tense', verbTense: 'passive.past' },
          arabic: 'كُتِبَ',
          morphemes: [{ text: 'كُتِبَ', role: 'root' }],
        },
        {
          kind: { type: 'pronoun', pronounId: '1s' },
          arabic: 'كُتِبْتُ',
          morphemes: [
            { text: 'كُتِب', role: 'root' },
            { text: 'ْتُ', role: 'suffix' },
          ],
        },
      ],
    })
  })
})
