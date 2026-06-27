import { describe, expect, test } from 'vitest'
import { detokenizeAnnotation } from '../../test/transformers'
import { getVerb } from '../verbs'
import { annotateActiveImperative } from './imperative-annotation'

describe('annotateActiveImperative', () => {
  test('Form I — كتب (2fs) matches annotation object', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2fs')

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
        verbTense: 'active.present.indicative',
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
        pronounId: '2fs',
        morphemes: [
          { text: 'تَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ِينَ', role: 'agreement' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.present.jussive',
        morphemes: [
          { text: 'تَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ِي', role: 'agreement' },
          { text: 'نَ', role: 'elided' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.imperative',
        morphemes: [
          { text: 'تَ', role: 'elided' },
          { text: 'اُ', role: 'measure' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ِي', role: 'agreement' },
        ],
      },
    ])
  })

  test('Form X — خرج (2ms) matches annotation object', () => {
    const result = annotateActiveImperative(getVerb('خرج', 10), '2ms')

    expect(detokenizeAnnotation(result)).toEqual([
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
        verbTense: 'active.present.indicative',
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
        type: 'pronoun',
        pronounId: '2ms',
        morphemes: [
          { text: 'تَ', role: 'agreement' },
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
        verbTense: 'active.present.jussive',
        morphemes: [
          { text: 'تَ', role: 'agreement' },
          { text: 'سْتَ', role: 'measure' },
          { text: 'خ', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ر', role: 'radical' },
          { text: 'ِ', role: 'measure' },
          { text: 'ج', role: 'radical' },
          { text: 'ْ', role: 'agreement' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.imperative',
        morphemes: [
          { text: 'تَ', role: 'elided' },
          { text: 'اِسْتَ', role: 'measure' },
          { text: 'خ', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ر', role: 'radical' },
          { text: 'ِ', role: 'measure' },
          { text: 'ج', role: 'radical' },
          { text: 'ْ', role: 'agreement' },
        ],
      },
    ])
  })

  test('Form I — كتب (2d) dropped person prefix annotated', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2d')

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
        verbTense: 'active.present.indicative',
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
        pronounId: '2d',
        morphemes: [
          { text: 'تَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َانِ', role: 'agreement' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.present.jussive',
        morphemes: [
          { text: 'تَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َا', role: 'agreement' },
          { text: 'نِ', role: 'elided' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.imperative',
        morphemes: [
          { text: 'تَ', role: 'elided' },
          { text: 'اُ', role: 'measure' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َا', role: 'agreement' },
        ],
      },
    ])
  })

  test('Form IV — حبب (2ms) matches annotation object', () => {
    const result = annotateActiveImperative(getVerb('حبب', 4), '2ms')

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
        verbTense: 'active.present.indicative',
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
        type: 'pronoun',
        pronounId: '2ms',
        morphemes: [
          { text: 'تُ', role: 'agreement' },
          { text: 'ح', role: 'radical' },
          { text: 'ِ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ّ', role: 'measure' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.present.jussive',
        morphemes: [
          { text: 'تُ', role: 'agreement' },
          { text: 'ح', role: 'radical' },
          { text: 'ِ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ّ', role: 'measure' },
          { text: 'َ', role: 'agreement' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.imperative',
        morphemes: [
          { text: 'تُ', role: 'elided' },
          { text: 'أَ', role: 'measure' },
          { text: 'ح', role: 'radical' },
          { text: 'ِ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ّ', role: 'measure' },
          { text: 'َ', role: 'agreement' },
        ],
      },
    ])
  })

  test('Form I — كتب (2ms) dropped person prefix annotated', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2ms')

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
        verbTense: 'active.present.indicative',
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
        pronounId: '2ms',
        morphemes: [
          { text: 'تَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.present.jussive',
        morphemes: [
          { text: 'تَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ْ', role: 'agreement' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.imperative',
        morphemes: [
          { text: 'تَ', role: 'elided' },
          { text: 'اُ', role: 'measure' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ْ', role: 'agreement' },
        ],
      },
    ])
  })

  test('Form I initial hamzated — ءكل (2ms) elides both prefix and hamza', () => {
    const result = annotateActiveImperative(getVerb('ءكل', 1), '2ms')

    expect(detokenizeAnnotation(result).at(-1)).toEqual({
      type: 'tense',
      verbTense: 'active.imperative',
      morphemes: [
        { text: 'تَ', role: 'elided' },
        { text: 'أ', role: 'elided' },
        { text: 'ك', role: 'radical' },
        { text: 'ُ', role: 'measure' },
        { text: 'ل', role: 'radical' },
        { text: 'ْ', role: 'agreement' },
      ],
    })
  })

  test('Form I — كتب (2mp) dropped person prefix annotated', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2mp')

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
        verbTense: 'active.present.indicative',
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
        pronounId: '2mp',
        morphemes: [
          { text: 'تَ', role: 'agreement' },
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
        verbTense: 'active.present.jussive',
        morphemes: [
          { text: 'تَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ُوا', role: 'agreement' },
          { text: 'نَ', role: 'elided' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.imperative',
        morphemes: [
          { text: 'تَ', role: 'elided' },
          { text: 'اُ', role: 'measure' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ُوا', role: 'agreement' },
        ],
      },
    ])
  })

  test('Form I — كتب (2fp) dropped person prefix annotated', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2fp')

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
        verbTense: 'active.present.indicative',
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
        pronounId: '2fp',
        morphemes: [
          { text: 'تَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ْنَ', role: 'agreement' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.present.jussive',
        morphemes: [
          { text: 'تَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ْنَ', role: 'agreement' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.imperative',
        morphemes: [
          { text: 'تَ', role: 'elided' },
          { text: 'اُ', role: 'measure' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ْنَ', role: 'agreement' },
        ],
      },
    ])
  })
})
