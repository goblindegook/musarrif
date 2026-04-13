import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotatePassiveFuture } from './future-annotation'

describe('annotatePassiveFuture', () => {
  test('Form I — كتب (1s) matches annotation object', () => {
    const result = annotatePassiveFuture(getVerb('كتب', 1), '1s')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 1 }, arabic: 'كَتَبَ' },
        { kind: { type: 'tense', verbTense: 'passive.present.indicative' }, arabic: 'يُكْتَبُ' },
        { kind: { type: 'pronoun', pronounId: '1s' }, arabic: 'أُكْتَبُ' },
        { kind: { type: 'tense', verbTense: 'passive.future' }, arabic: 'سَأُكْتَبُ' },
      ],
      morphemes: [
        { text: 'سَ', role: 'tense' },
        { text: 'أُ', role: 'suffix' },
        { text: 'كْتَب', role: 'root' },
        { text: 'ُ', role: 'suffix' },
      ],
    })
  })
})
