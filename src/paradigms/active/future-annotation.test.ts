import { describe, expect, test } from 'vitest'
import { detokenizeDerivationSteps } from '../../test/transformers'
import { getVerb } from '../verbs'
import { activeFutureDerivationSteps } from './future-annotation'

describe('annotateActiveFuture', () => {
  test('Form I — كتب (3mp) matches annotation object', () => {
    const result = activeFutureDerivationSteps(getVerb('كتب', 1), '3mp')

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
        tense: 'active.present.indicative',
        morphemes: [
          { text: 'يَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
      {
        type: 'pronoun',
        pronounId: '3mp',
        morphemes: [
          { text: 'يَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ُونَ', role: 'agreement' },
        ],
      },
      {
        type: 'tense',
        tense: 'active.future',
        morphemes: [
          { text: 'سَ', role: 'particle' },
          { text: 'يَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ُونَ', role: 'agreement' },
        ],
      },
    ])
  })

  test('Form X — خرج (3ms) matches annotation object', () => {
    const result = activeFutureDerivationSteps(getVerb('خرج', 10), '3ms')

    expect(detokenizeDerivationSteps(result)).toEqual([
      {
        type: 'root',
        morphemes: [
          { text: 'خ', role: 'radical' },
          { text: 'ر', role: 'radical' },
          { text: 'ج', role: 'radical' },
        ],
      },
      {
        type: 'form',
        form: 10,
        morphemes: [
          { text: 'اِسْتَ', role: 'measure' },
          { text: 'خ', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ر', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ج', role: 'radical' },
          { text: 'َ', role: 'measure' },
        ],
      },
      {
        type: 'tense',
        tense: 'active.present.indicative',
        morphemes: [
          { text: 'اِ', role: 'elided' },
          { text: 'يَ', role: 'agreement' },
          { text: 'سْتَ', role: 'measure' },
          { text: 'خ', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ر', role: 'radical' },
          { text: 'ِ', role: 'measure' },
          { text: 'ج', role: 'radical' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
      {
        type: 'tense',
        tense: 'active.future',
        morphemes: [
          { text: 'سَ', role: 'particle' },
          { text: 'يَ', role: 'agreement' },
          { text: 'سْتَ', role: 'measure' },
          { text: 'خ', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ر', role: 'radical' },
          { text: 'ِ', role: 'measure' },
          { text: 'ج', role: 'radical' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
    ])
  })

  test('Form III — كتب (3ms) matches annotation object', () => {
    const result = activeFutureDerivationSteps(getVerb('كتب', 3), '3ms')

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
        form: 3,
        morphemes: [
          { text: 'ك', role: 'radical' },
          { text: 'َا', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َ', role: 'measure' },
        ],
      },
      {
        type: 'tense',
        tense: 'active.present.indicative',
        morphemes: [
          { text: 'يُ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'َا', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ِ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
      {
        type: 'tense',
        tense: 'active.future',
        morphemes: [
          { text: 'سَ', role: 'particle' },
          { text: 'يُ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'َا', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ِ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
    ])
  })

  test('Form IV — حبب (3ms) matches annotation object', () => {
    const result = activeFutureDerivationSteps(getVerb('حبب', 4), '3ms')

    expect(detokenizeDerivationSteps(result)).toEqual([
      {
        type: 'root',
        morphemes: [
          { text: 'ح', role: 'radical' },
          { text: 'ب', role: 'radical' },
          { text: 'ب', role: 'radical' },
        ],
      },
      {
        type: 'form',
        form: 4,
        morphemes: [
          { text: 'أَ', role: 'measure' },
          { text: 'ح', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َّ', role: 'measure' },
        ],
      },
      {
        type: 'tense',
        tense: 'active.present.indicative',
        morphemes: [
          { text: 'أَ', role: 'elided' },
          { text: 'يُ', role: 'agreement' },
          { text: 'ح', role: 'radical' },
          { text: 'ِ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ّ', role: 'measure' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
      {
        type: 'tense',
        tense: 'active.future',
        morphemes: [
          { text: 'سَ', role: 'particle' },
          { text: 'يُ', role: 'agreement' },
          { text: 'ح', role: 'radical' },
          { text: 'ِ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ّ', role: 'measure' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
    ])
  })
})
