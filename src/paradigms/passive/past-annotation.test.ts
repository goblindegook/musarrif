import { describe, expect, test } from 'vitest'
import { detokenizeAnnotation } from '../../test/transformers'
import { getVerb } from '../verbs'
import { annotatePassivePast } from './past-annotation'

describe('annotatePassivePast', () => {
  test('Form I regular — كتب (1s) annotation uses word morphemes', () => {
    const result = annotatePassivePast(getVerb('كتب', 1), '1s')

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
        verbTense: 'passive.past',
        morphemes: [
          { text: 'ك', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ِ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َ', role: 'measure' },
        ],
      },
      {
        type: 'pronoun',
        pronounId: '1s',
        morphemes: [
          { text: 'ك', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ِ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ْتُ', role: 'agreement' },
        ],
      },
    ])
  })

  test('Form I geminate — جبب (3ms) collapses doubled radical with shadda', () => {
    const result = annotatePassivePast(getVerb('جبب', 1), '3ms')

    expect(detokenizeAnnotation(result)).toEqual([
      {
        type: 'root',
        morphemes: [
          { text: 'ج', role: 'radical' },
          { text: 'ب', role: 'radical' },
          { text: 'ب', role: 'radical' },
        ],
      },
      {
        type: 'form',
        form: 1,
        morphemes: [
          { text: 'ج', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َّ', role: 'measure' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'passive.past',
        morphemes: [
          { text: 'ج', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َّ', role: 'measure' },
        ],
      },
    ])
  })
})
