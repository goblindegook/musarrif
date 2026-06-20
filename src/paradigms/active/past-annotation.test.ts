import { describe, expect, test } from 'vitest'
import { detokenizeAnnotation } from '../../test/transformers'
import { getVerb, getVerbById } from '../verbs'
import { annotatePast } from './past-annotation'

describe('annotatePast', () => {
  test('Form I regular — كتب (1s) annotation uses word morphemes', () => {
    const result = annotatePast(getVerb('كتب', 1), '1s')

    expect(detokenizeAnnotation(result)).toEqual({
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
          kind: { type: 'tense', verbTense: 'active.past' },
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
          kind: { type: 'pronoun', pronounId: '1s' },
          arabic: 'كَتَبْتُ',
          morphemes: [
            { text: 'ك', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'ْتُ', role: 'agreement' },
          ],
        },
      ],
    })
  })

  test('Form I geminate — حبب (3ms) shadda collapses doubled radical', () => {
    const result = annotatePast(getVerb('حبب', 1), '3ms')

    expect(detokenizeAnnotation(result)).toEqual({
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
          kind: { type: 'form', form: 1 },
          arabic: 'حَبَّ',
          morphemes: [
            { text: 'ح', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'بّ', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'حَبَّ',
          morphemes: [
            { text: 'ح', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'بّ', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
      ],
    })
  })

  test('Form I hollow — كون (3ms) adjacent radicals merge', () => {
    const result = annotatePast(getVerb('كون', 1), '3ms')

    expect(detokenizeAnnotation(result)).toEqual({
      steps: [
        {
          kind: { type: 'root' },
          arabic: 'كون',
          morphemes: [
            { text: 'ك', role: 'radical' },
            { text: 'و', role: 'radical' },
            { text: 'ن', role: 'radical' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'كَانَ',
          morphemes: [
            { text: 'ك', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ان', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'كَانَ',
          morphemes: [
            { text: 'ك', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ان', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
      ],
    })
  })

  test('Form I hamzated final — بدء (3md) madda absorbs dual alif into measure', () => {
    const result = annotatePast(getVerb('بدء', 1), '3md')

    expect(detokenizeAnnotation(result)).toEqual({
      steps: [
        {
          kind: { type: 'root' },
          arabic: 'بدء',
          morphemes: [
            { text: 'ب', role: 'radical' },
            { text: 'د', role: 'radical' },
            { text: 'ء', role: 'radical' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'بَدَأَ',
          morphemes: [
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'د', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'أ', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'بَدَأَ',
          morphemes: [
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'د', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'أ', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '3md' },
          arabic: 'بَدَآ',
          morphemes: [
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'د', role: 'radical' },
            { text: 'َآ', role: 'measure' },
          ],
        },
      ],
    })
  })

  test('Form VII — كتب (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('كتب', 7), '3ms')

    expect(detokenizeAnnotation(result)).toEqual({
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
            { text: 'ك', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'اِنْكَتَبَ',
          morphemes: [
            { text: 'اِنْ', role: 'measure' },
            { text: 'ك', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
      ],
    })
  })

  test('Form IX — خضر (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('خضر', 9), '3ms')

    expect(detokenizeAnnotation(result)).toEqual({
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
            { text: 'خ', role: 'radical' },
            { text: 'ْ', role: 'measure' },
            { text: 'ض', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'رّ', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'اِخْضَرَّ',
          morphemes: [
            { text: 'اِ', role: 'measure' },
            { text: 'خ', role: 'radical' },
            { text: 'ْ', role: 'measure' },
            { text: 'ض', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'رّ', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
      ],
    })
  })

  test('Form III — كتب (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('كتب', 3), '3ms')

    expect(detokenizeAnnotation(result)).toEqual({
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
            { text: 'ك', role: 'radical' },
            { text: 'َا', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'كَاتَبَ',
          morphemes: [
            { text: 'ك', role: 'radical' },
            { text: 'َا', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
      ],
    })
  })

  test('Form V — كتب (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('كتب', 5), '3ms')

    expect(detokenizeAnnotation(result)).toEqual({
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
            { text: 'ك', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َّ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'تَكَتَّبَ',
          morphemes: [
            { text: 'تَ', role: 'measure' },
            { text: 'ك', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َّ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
      ],
    })
  })

  test('Form VI — كتب (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('كتب', 6), '3ms')

    expect(detokenizeAnnotation(result)).toEqual({
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
            { text: 'ك', role: 'radical' },
            { text: 'َا', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'تَكَاتَبَ',
          morphemes: [
            { text: 'تَ', role: 'measure' },
            { text: 'ك', role: 'radical' },
            { text: 'َا', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
      ],
    })
  })

  test('Form I hamzated geminate — ءدد (2fs) fatha on initial hamza is measure', () => {
    const result = detokenizeAnnotation(annotatePast(getVerb('ءدد', 1), '2fs'))

    expect(result.steps.at(-1)).toEqual({
      kind: { type: 'pronoun', pronounId: '2fs' },
      arabic: 'أَدَدْتِ',
      morphemes: [
        { text: 'أ', role: 'radical' },
        { text: 'َ', role: 'measure' },
        { text: 'د', role: 'radical' },
        { text: 'َ', role: 'measure' },
        { text: 'د', role: 'radical' },
        { text: 'ْتِ', role: 'agreement' },
      ],
    })
  })

  test('Form VIII — حلم (1s) matches annotation object', () => {
    const result = annotatePast(getVerb('حلم', 8), '1s')

    expect(detokenizeAnnotation(result)).toEqual({
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
            { text: 'ل', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'م', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.past' },
          arabic: 'اِحْتَلَمَ',
          morphemes: [
            { text: 'اِ', role: 'measure' },
            { text: 'ح', role: 'radical' },
            { text: 'ْتَ', role: 'measure' },
            { text: 'ل', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'م', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '1s' },
          arabic: 'اِحْتَلَمْتُ',
          morphemes: [
            { text: 'اِ', role: 'measure' },
            { text: 'ح', role: 'radical' },
            { text: 'ْتَ', role: 'measure' },
            { text: 'ل', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'م', role: 'radical' },
            { text: 'ْتُ', role: 'agreement' },
          ],
        },
      ],
    })
  })

  test('Form VIII — حلم (1s) matches annotation object', () => {
    const result = annotatePast(getVerbById("'ty-8")!, '2mp')

    expect(detokenizeAnnotation(result)).toEqual({
      steps: [
        {
          arabic: 'ءتي',
          kind: { type: 'root' },
          morphemes: [
            { role: 'radical', text: 'ء' },
            { role: 'radical', text: 'ت' },
            { role: 'radical', text: 'ي' },
          ],
        },
        {
          arabic: 'اِتَّتَى',
          kind: { form: 8, type: 'form' },
          morphemes: [
            // FIXME: alif is measure, tah is radical, shadda is measure
            { role: 'measure', text: 'اِتَّ' },
            { role: 'radical', text: 'ت' },
            { role: 'measure', text: 'َ' },
            { role: 'radical', text: 'ى' },
          ],
        },
        {
          arabic: 'اِتَّتَى',
          kind: { type: 'tense', verbTense: 'active.past' },
          morphemes: [
            // FIXME: alif is measure, tah is radical, shadda is measure
            { role: 'measure', text: 'اِتَّ' },
            { role: 'radical', text: 'ت' },
            { role: 'measure', text: 'َ' },
            { role: 'radical', text: 'ى' },
          ],
        },
        {
          arabic: 'اِتَّتَيْتُمْ',
          kind: { pronounId: '2mp', type: 'pronoun' },
          morphemes: [
            // FIXME: alif is measure, tah is radical, shadda is measure
            { role: 'measure', text: 'اِتَّ' },
            { role: 'radical', text: 'ت' },
            { role: 'measure', text: 'َ' },
            { role: 'radical', text: 'ي' },
            { role: 'agreement', text: 'ْتُمْ' },
          ],
        },
      ],
    })
  })
})
