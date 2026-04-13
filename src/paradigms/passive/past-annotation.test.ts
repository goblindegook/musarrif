import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotatePassivePast } from './past-annotation'

describe('annotatePassivePast', () => {
  test('Form I — كتب (1s) matches annotation object', () => {
    const result = annotatePassivePast(getVerb('كتب', 1), '1s')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 1 }, arabic: 'كَتَبَ' },
        { kind: { type: 'tense', verbTense: 'passive.past' }, arabic: 'كُتِبَ' },
        { kind: { type: 'pronoun', pronounId: '1s' }, arabic: 'كُتِبْتُ' },
      ],
      morphemes: [
        { text: 'كُتِب', role: 'root' },
        { text: 'ْتُ', role: 'suffix' },
      ],
    })
  })
})
