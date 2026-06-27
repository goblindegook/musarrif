import { describe, expect, test } from 'vitest'
import { detokenizeDerivationSteps } from '../../test/transformers'
import { getVerb } from '../verbs'
import { passiveFutureDerivationSteps } from './future-annotation'

describe('annotatePassiveFuture', () => {
  test('Form I — كتب (1s) matches annotation object', () => {
    const result = passiveFutureDerivationSteps(getVerb('كتب', 1), '1s')

    expect(detokenizeDerivationSteps(result)).toEqual([
      {
        type: 'root',
        morphemes: [
          { text: 'ك', role: 'radical' },
          { text: 'ت', role: 'radical' },
          { text: 'ب', role: 'radical' },
        ],
      },
      {
        type: 'form',
        form: 1,
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
        type: 'tense',
        tense: 'passive.present.indicative',
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
        type: 'pronoun',
        pronounId: '1s',
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
        type: 'tense',
        tense: 'passive.future',
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
    ])
  })
})
