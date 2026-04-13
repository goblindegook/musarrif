import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotatePast } from './past-annotation'

describe('annotatePast', () => {
  test('Form I regular — كتب (1s) matches annotation object', () => {
    const result = annotatePast(getVerb('كتب', 1), '1s')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 1 }, arabic: 'كَتَبَ' },
        { kind: { type: 'tense', verbTense: 'active.past' }, arabic: 'كَتَبَ' },
        { kind: { type: 'pronoun', pronounId: '1s' }, arabic: 'كَتَبْتُ' },
      ],
      morphemes: [
        { text: 'كَتَب', role: 'root' },
        { text: 'ْتُ', role: 'suffix' },
      ],
    })
  })

  test('Form VII — كتب (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('كتب', 7), '3ms')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 7 }, arabic: 'اِنْكَتَبَ' },
        { kind: { type: 'tense', verbTense: 'active.past' }, arabic: 'اِنْكَتَبَ' },
      ],
      morphemes: [
        { text: 'اِنْ', role: 'form' },
        { text: 'كَتَبَ', role: 'root' },
      ],
    })
  })

  test('Form IX — خضر (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('خضر', 9), '3ms')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'خضر' },
        { kind: { type: 'form', form: 9 }, arabic: 'اِخْضَرَّ' },
        { kind: { type: 'tense', verbTense: 'active.past' }, arabic: 'اِخْضَرَّ' },
      ],
      morphemes: [
        { text: 'اِ', role: 'form' },
        { text: 'خْضَرَّ', role: 'root' },
      ],
    })
  })

  test('Form III — كتب (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('كتب', 3), '3ms')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 3 }, arabic: 'كَاتَبَ' },
        { kind: { type: 'tense', verbTense: 'active.past' }, arabic: 'كَاتَبَ' },
      ],
      morphemes: [
        { text: 'كَ', role: 'root' },
        { text: 'ا', role: 'form' },
        { text: 'تَبَ', role: 'root' },
      ],
    })
  })

  test('Form V — كتب (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('كتب', 5), '3ms')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 5 }, arabic: 'تَكَتَّبَ' },
        { kind: { type: 'tense', verbTense: 'active.past' }, arabic: 'تَكَتَّبَ' },
      ],
      morphemes: [
        { text: 'تَ', role: 'form' },
        { text: 'كَتَّبَ', role: 'root' },
      ],
    })
  })

  test('Form VI — كتب (3ms) matches annotation object', () => {
    const result = annotatePast(getVerb('كتب', 6), '3ms')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 6 }, arabic: 'تَكَاتَبَ' },
        { kind: { type: 'tense', verbTense: 'active.past' }, arabic: 'تَكَاتَبَ' },
      ],
      morphemes: [
        { text: 'تَ', role: 'form' },
        { text: 'كَ', role: 'root' },
        { text: 'ا', role: 'form' },
        { text: 'تَبَ', role: 'root' },
      ],
    })
  })

  test('Form VIII — حلم (1s) matches annotation object', () => {
    const result = annotatePast(getVerb('حلم', 8), '1s')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'حلم' },
        { kind: { type: 'form', form: 8 }, arabic: 'اِحْتَلَمَ' },
        { kind: { type: 'tense', verbTense: 'active.past' }, arabic: 'اِحْتَلَمَ' },
        { kind: { type: 'pronoun', pronounId: '1s' }, arabic: 'اِحْتَلَمْتُ' },
      ],
      morphemes: [
        { text: 'اِ', role: 'form' },
        { text: 'ح', role: 'root' },
        { text: 'ْتَ', role: 'form' },
        { text: 'لَم', role: 'root' },
        { text: 'ْتُ', role: 'suffix' },
      ],
    })
  })
})
