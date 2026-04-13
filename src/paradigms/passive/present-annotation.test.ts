import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotatePassivePresentMood } from './present-annotation'

describe('annotatePassivePresentMood', () => {
  test('indicative Form I — كتب (1s) matches annotation object', () => {
    const result = annotatePassivePresentMood(getVerb('كتب', 1), 'indicative', '1s')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 1 }, arabic: 'كَتَبَ' },
        { kind: { type: 'tense', verbTense: 'passive.present.indicative' }, arabic: 'يُكْتَبُ' },
        { kind: { type: 'pronoun', pronounId: '1s' }, arabic: 'أُكْتَبُ' },
      ],
      morphemes: [
        { text: 'أُ', role: 'tense' },
        { text: 'كْتَب', role: 'root' },
        { text: 'ُ', role: 'suffix' },
      ],
    })
  })
})
