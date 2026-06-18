import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotatePast } from './past-annotation'

describe('annotatePast', () => {
  test('Form I regular — كتب (1s) matches annotation object', () => {
    const result = annotatePast(getVerb('كتب', 1), '1s')

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
          morphemes: [{ text: 'كَتَبَ', role: 'radical' }],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'كَتَبَ',
          morphemes: [{ text: 'كَتَبَ', role: 'radical' }],
        },
        {
          kind: { type: 'pronoun', pronounId: '1s' },
          arabic: 'كَتَبْتُ',
          morphemes: [
            { text: 'كَتَب', role: 'radical' },
            { text: 'ْتُ', role: 'agreement' },
          ],
        },
      ],
    })
  })

  test('Form VII — كتب (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('كتب', 7), '3ms')

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
          kind: { type: 'form', form: 7 },
          arabic: 'اِنْكَتَبَ',
          morphemes: [
            { text: 'اِنْ', role: 'measure' },
            { text: 'كَتَبَ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'اِنْكَتَبَ',
          morphemes: [
            { text: 'اِنْ', role: 'measure' },
            { text: 'كَتَبَ', role: 'radical' },
          ],
        },
      ],
    })
  })

  test('Form IX — خضر (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('خضر', 9), '3ms')

    expect(result).toEqual({
      steps: [
        {
          kind: { type: 'root' },
          arabic: 'خضر',
          morphemes: [
            { text: 'خ', role: 'radical' },
            { text: 'ض', role: 'radical' },
            { text: 'ر', role: 'radical' },
          ],
        },
        {
          kind: { type: 'form', form: 9 },
          arabic: 'اِخْضَرَّ',
          morphemes: [
            { text: 'اِ', role: 'measure' },
            { text: 'خْضَرَّ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'اِخْضَرَّ',
          morphemes: [
            { text: 'اِ', role: 'measure' },
            { text: 'خْضَرَّ', role: 'radical' },
          ],
        },
      ],
    })
  })

  test('Form III — كتب (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('كتب', 3), '3ms')

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
          kind: { type: 'form', form: 3 },
          arabic: 'كَاتَبَ',
          morphemes: [
            { text: 'كَ', role: 'radical' },
            { text: 'ا', role: 'measure' },
            { text: 'تَبَ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'كَاتَبَ',
          morphemes: [
            { text: 'كَ', role: 'radical' },
            { text: 'ا', role: 'measure' },
            { text: 'تَبَ', role: 'radical' },
          ],
        },
      ],
    })
  })

  test('Form V — كتب (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('كتب', 5), '3ms')

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
          kind: { type: 'form', form: 5 },
          arabic: 'تَكَتَّبَ',
          morphemes: [
            { text: 'تَ', role: 'measure' },
            { text: 'كَتَّبَ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'تَكَتَّبَ',
          morphemes: [
            { text: 'تَ', role: 'measure' },
            { text: 'كَتَّبَ', role: 'radical' },
          ],
        },
      ],
    })
  })

  test('Form VI — كتب (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('كتب', 6), '3ms')

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
          kind: { type: 'form', form: 6 },
          arabic: 'تَكَاتَبَ',
          morphemes: [
            { text: 'تَ', role: 'measure' },
            { text: 'كَ', role: 'radical' },
            { text: 'ا', role: 'measure' },
            { text: 'تَبَ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'تَكَاتَبَ',
          morphemes: [
            { text: 'تَ', role: 'measure' },
            { text: 'كَ', role: 'radical' },
            { text: 'ا', role: 'measure' },
            { text: 'تَبَ', role: 'radical' },
          ],
        },
      ],
    })
  })

  test('Form VIII — حلم (1s) matches annotation object', () => {
    const result = annotatePast(getVerb('حلم', 8), '1s')

    expect(result).toEqual({
      steps: [
        {
          kind: { type: 'root' },
          arabic: 'حلم',
          morphemes: [
            { text: 'ح', role: 'radical' },
            { text: 'ل', role: 'radical' },
            { text: 'م', role: 'radical' },
          ],
        },
        {
          kind: { type: 'form', form: 8 },
          arabic: 'اِحْتَلَمَ',
          morphemes: [
            { text: 'اِ', role: 'measure' },
            { text: 'ح', role: 'radical' },
            { text: 'ْتَ', role: 'measure' },
            { text: 'لَمَ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'اِحْتَلَمَ',
          morphemes: [
            { text: 'اِ', role: 'measure' },
            { text: 'ح', role: 'radical' },
            { text: 'ْتَ', role: 'measure' },
            { text: 'لَمَ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '1s' },
          arabic: 'اِحْتَلَمْتُ',
          morphemes: [
            { text: 'اِ', role: 'measure' },
            { text: 'ح', role: 'radical' },
            { text: 'ْتَ', role: 'measure' },
            { text: 'لَم', role: 'radical' },
            { text: 'ْتُ', role: 'agreement' },
          ],
        },
      ],
    })
  })
})
