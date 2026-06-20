import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotatePassivePast } from './past-annotation'

describe('annotatePassivePast', () => {
  test('Form I regular — كتب (1s) annotation uses word morphemes', () => {
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
          kind: { type: 'pronoun', pronounId: '1s' },
          arabic: 'كُتِبْتُ',
          morphemes: [
            { text: 'ك', role: 'radical' },
            { text: 'ُ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'ِ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'ْتُ', role: 'agreement' },
          ],
        },
      ],
    })
  })

  test('Form I geminate — جبب (3ms) collapses doubled radical with shadda', () => {
    const result = annotatePassivePast(getVerb('جبب', 1), '3ms')

    expect(result).toEqual({
      steps: [
        {
          kind: { type: 'root' },
          arabic: 'جبب',
          morphemes: [
            { text: 'ج', role: 'radical' },
            { text: 'ب', role: 'radical' },
            { text: 'ب', role: 'radical' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'جَبَّ',
          morphemes: [
            { text: 'ج', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'بّ', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'passive.past' },
          arabic: 'جُبَّ',
          morphemes: [
            { text: 'ج', role: 'radical' },
            { text: 'ُ', role: 'measure' },
            { text: 'بّ', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
      ],
    })
  })
})
