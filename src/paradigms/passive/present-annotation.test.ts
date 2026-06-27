import { describe, expect, test } from 'vitest'
import { detokenizeAnnotation } from '../../test/transformers'
import { getVerb } from '../verbs'
import { annotatePassivePresentMood } from './present-annotation'

describe('annotatePassivePresentMood', () => {
  test('indicative Form X — حبب (3ms) matches annotation object', () => {
    const result = annotatePassivePresentMood(getVerb('حبب', 10), 'indicative', '3ms')

    expect(detokenizeAnnotation(result)).toEqual([
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
        form: 10,
        morphemes: [
          { text: 'اِسْتَ', role: 'measure' },
          { text: 'ح', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َّ', role: 'measure' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'passive.present.indicative',
        morphemes: [
          { text: 'يُ', role: 'agreement' },
          { text: 'سْتَ', role: 'measure' },
          { text: 'ح', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ّ', role: 'measure' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
    ])
  })

  test('indicative Form I — كتب (1s) matches annotation object', () => {
    const result = annotatePassivePresentMood(getVerb('كتب', 1), 'indicative', '1s')

    expect(detokenizeAnnotation(result)).toEqual([
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
        verbTense: 'passive.present.indicative',
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
    ])
  })

  test('indicative Form I — قول (3ms) hollow passive: alif (C2) annotated as radical', () => {
    const result = annotatePassivePresentMood(getVerb('قول', 1), 'indicative', '3ms')

    expect(detokenizeAnnotation(result)).toEqual([
      {
        type: 'root',
        morphemes: [
          { text: 'ق', role: 'radical' },
          { text: 'و', role: 'radical' },
          { text: 'ل', role: 'radical' },
        ],
      },
      {
        type: 'form',
        form: 1,
        morphemes: [
          { text: 'ق', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ال', role: 'radical' },
          { text: 'َ', role: 'measure' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'passive.present.indicative',
        morphemes: [
          { text: 'يُ', role: 'agreement' },
          { text: 'ق', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ال', role: 'radical' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
    ])
  })
})
