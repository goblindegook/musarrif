import { describe, expect, test } from 'vitest'
import { detokenizeDerivationSteps } from '../../test/transformers'
import { getVerb, getVerbById } from '../verbs'
import { activePastDerivationSteps } from './past-annotation'

describe('annotatePast', () => {
  test('Form I regular — كتب (1s) annotation uses word morphemes', () => {
    const steps = activePastDerivationSteps(getVerb('كتب', 1), '1s')

    expect(detokenizeDerivationSteps(steps)).toEqual([
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
        verbTense: 'active.past',
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
        type: 'pronoun',
        pronounId: '1s',
        morphemes: [
          { text: 'ك', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ْتُ', role: 'agreement' },
        ],
      },
    ])
  })

  test('Form I geminate — حبب (3ms) shadda collapses doubled radical', () => {
    const steps = activePastDerivationSteps(getVerb('حبب', 1), '3ms')

    expect(detokenizeDerivationSteps(steps)).toEqual([
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
        form: 1,
        morphemes: [
          { text: 'ح', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َّ', role: 'measure' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.past',
        morphemes: [
          { text: 'ح', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َّ', role: 'measure' },
        ],
      },
    ])
  })

  test('Form I hollow — كون (3ms) adjacent radicals merge', () => {
    const steps = activePastDerivationSteps(getVerb('كون', 1), '3ms')

    expect(detokenizeDerivationSteps(steps)).toEqual([
      {
        type: 'root',
        morphemes: [
          { text: 'ك', role: 'radical' },
          { text: 'و', role: 'radical' },
          { text: 'ن', role: 'radical' },
        ],
      },
      {
        type: 'form',
        form: 1,
        morphemes: [
          { text: 'ك', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ان', role: 'radical' },
          { text: 'َ', role: 'measure' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.past',
        morphemes: [
          { text: 'ك', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ان', role: 'radical' },
          { text: 'َ', role: 'measure' },
        ],
      },
    ])
  })

  test('Form I hamzated final — بدء (3md) madda absorbs dual alif into measure', () => {
    const steps = activePastDerivationSteps(getVerb('بدء', 1), '3md')

    expect(detokenizeDerivationSteps(steps)).toEqual([
      {
        type: 'root',
        morphemes: [
          { text: 'ب', role: 'radical' },
          { text: 'د', role: 'radical' },
          { text: 'ء', role: 'radical' },
        ],
      },
      {
        type: 'form',
        form: 1,
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
        type: 'tense',
        verbTense: 'active.past',
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
        type: 'pronoun',
        pronounId: '3md',
        morphemes: [
          { text: 'ب', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'د', role: 'radical' },
          { text: 'َآ', role: 'measure' },
        ],
      },
    ])
  })

  test('Form VII — كتب (3ms) matches annotation object', () => {
    const steps = activePastDerivationSteps(getVerb('كتب', 7), '3ms')

    expect(detokenizeDerivationSteps(steps)).toEqual([
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
        form: 7,
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
        type: 'tense',
        verbTense: 'active.past',
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
    ])
  })

  test('Form IX — خضر (3ms) matches annotation object', () => {
    const steps = activePastDerivationSteps(getVerb('خضر', 9), '3ms')

    expect(detokenizeDerivationSteps(steps)).toEqual([
      {
        type: 'root',
        morphemes: [
          { text: 'خ', role: 'radical' },
          { text: 'ض', role: 'radical' },
          { text: 'ر', role: 'radical' },
        ],
      },
      {
        type: 'form',
        form: 9,
        morphemes: [
          { text: 'اِ', role: 'measure' },
          { text: 'خ', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ض', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ر', role: 'radical' },
          { text: 'َّ', role: 'measure' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.past',
        morphemes: [
          { text: 'اِ', role: 'measure' },
          { text: 'خ', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ض', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ر', role: 'radical' },
          { text: 'َّ', role: 'measure' },
        ],
      },
    ])
  })

  test('Form III — كتب (3ms) matches annotation object', () => {
    const steps = activePastDerivationSteps(getVerb('كتب', 3), '3ms')

    expect(detokenizeDerivationSteps(steps)).toEqual([
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
        verbTense: 'active.past',
        morphemes: [
          { text: 'ك', role: 'radical' },
          { text: 'َا', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َ', role: 'measure' },
        ],
      },
    ])
  })

  test('Form V — كتب (3ms) matches annotation object', () => {
    const steps = activePastDerivationSteps(getVerb('كتب', 5), '3ms')

    expect(detokenizeDerivationSteps(steps)).toEqual([
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
        form: 5,
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
        type: 'tense',
        verbTense: 'active.past',
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
    ])
  })

  test('Form VI — كتب (3ms) matches annotation object', () => {
    const steps = activePastDerivationSteps(getVerb('كتب', 6), '3ms')

    expect(detokenizeDerivationSteps(steps)).toEqual([
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
        form: 6,
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
        type: 'tense',
        verbTense: 'active.past',
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
    ])
  })

  test('Form I hamzated geminate — ءدد (2fs) fatha on initial hamza is measure', () => {
    const steps = detokenizeDerivationSteps(activePastDerivationSteps(getVerb('ءدد', 1), '2fs'))

    expect(steps.at(-1)).toEqual({
      type: 'pronoun',
      pronounId: '2fs',
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
    const steps = activePastDerivationSteps(getVerb('حلم', 8), '1s')

    expect(detokenizeDerivationSteps(steps)).toEqual([
      {
        type: 'root',
        morphemes: [
          { text: 'ح', role: 'radical' },
          { text: 'ل', role: 'radical' },
          { text: 'م', role: 'radical' },
        ],
      },
      {
        type: 'form',
        form: 8,
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
        type: 'tense',
        verbTense: 'active.past',
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
        type: 'pronoun',
        pronounId: '1s',
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
    ])
  })

  test('Form VIII — حلم (1s) matches annotation object', () => {
    const steps = activePastDerivationSteps(getVerbById("'ty-8")!, '2mp')

    expect(detokenizeDerivationSteps(steps)).toEqual([
      {
        type: 'root',
        morphemes: [
          { role: 'radical', text: 'ء' },
          { role: 'radical', text: 'ت' },
          { role: 'radical', text: 'ي' },
        ],
      },
      {
        type: 'form',
        form: 8,
        morphemes: [
          { role: 'measure', text: 'اِتَّ' },
          { role: 'radical', text: 'ت' },
          { role: 'measure', text: 'َ' },
          { role: 'radical', text: 'ى' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.past',
        morphemes: [
          { role: 'measure', text: 'اِتَّ' },
          { role: 'radical', text: 'ت' },
          { role: 'measure', text: 'َ' },
          { role: 'radical', text: 'ى' },
        ],
      },
      {
        type: 'pronoun',
        pronounId: '2mp',
        morphemes: [
          { role: 'measure', text: 'اِتَّ' },
          { role: 'radical', text: 'ت' },
          { role: 'measure', text: 'َ' },
          { role: 'radical', text: 'ي' },
          { role: 'agreement', text: 'ْتُمْ' },
        ],
      },
    ])
  })
})
