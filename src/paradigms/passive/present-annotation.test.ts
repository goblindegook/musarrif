import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotatePassivePresentMood } from './present-annotation'

describe('annotatePassivePresentMood', () => {
  test('indicative Form X — حبب (3ms) matches annotation object', () => {
    const result = annotatePassivePresentMood(getVerb('حبب', 10), 'indicative', '3ms')

    expect(result).toEqual({
      steps: [
        {
          kind: { type: 'root' },
          arabic: 'حبب',
          morphemes: [
            { text: 'ح', role: 'radical' },
            { text: 'ب', role: 'radical' },
            { text: 'ب', role: 'radical' },
          ],
        },
        {
          kind: { type: 'form', form: 10 },
          arabic: 'اِسْتَحَبَّ',
          morphemes: [
            { text: 'اِسْتَ', role: 'measure' },
            { text: 'ح', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'بّ', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'passive.present.indicative' },
          arabic: 'يُسْتَحَبُّ',
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
      ],
    })
  })

  test('indicative Form I — كتب (1s) matches annotation object', () => {
    const result = annotatePassivePresentMood(getVerb('كتب', 1), 'indicative', '1s')

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
          kind: { type: 'tense', verbTense: 'passive.present.indicative' },
          arabic: 'يُكْتَبُ',
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
          kind: { type: 'pronoun', pronounId: '1s' },
          arabic: 'أُكْتَبُ',
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
      ],
    })
  })
})
