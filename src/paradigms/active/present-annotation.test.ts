import { describe, expect, test } from 'vitest'
import { detokenizeDerivationSteps } from '../../test/transformers'
import { getVerb } from '../verbs'
import { activePresentMoodDerivationSteps } from './present-annotation'

describe('annotateActivePresentMood', () => {
  test('indicative Form I — كتب (1s) matches annotation object', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 1), 'indicative', '1s')

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
        pronounId: '1s',
        morphemes: [
          { text: 'أَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
    ])
  })

  test('indicative Form III — كتب (3ms) matches annotation object', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 3), 'indicative', '3ms')

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
        verbTense: 'active.present.indicative',
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
    ])
  })

  test('indicative Form VII — كتب (3ms) matches annotation object', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 7), 'indicative', '3ms')

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
        verbTense: 'active.present.indicative',
        morphemes: [
          { text: 'يَ', role: 'agreement' },
          { text: 'نْ', role: 'measure' },
          { text: 'ك', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ِ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
    ])
  })

  test('indicative Form V — كتب (3ms) matches annotation object', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 5), 'indicative', '3ms')

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
        verbTense: 'active.present.indicative',
        morphemes: [
          { text: 'يَ', role: 'agreement' },
          { text: 'تَ', role: 'measure' },
          { text: 'ك', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'َّ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
    ])
  })

  test('indicative Form VI — كتب (3ms) matches annotation object', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 6), 'indicative', '3ms')

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
        verbTense: 'active.present.indicative',
        morphemes: [
          { text: 'يَ', role: 'agreement' },
          { text: 'تَ', role: 'measure' },
          { text: 'ك', role: 'radical' },
          { text: 'َا', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
    ])
  })

  test('subjunctive Form I — كتب (1s) matches annotation object', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 1), 'subjunctive', '1s')

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
        pronounId: '1s',
        morphemes: [
          { text: 'أَ', role: 'agreement' },
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
        verbTense: 'active.present.subjunctive',
        morphemes: [
          { text: 'أَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َ', role: 'agreement' },
        ],
      },
    ])
  })

  test('jussive Form I — كتب (2ms) matches annotation object', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 1), 'jussive', '2ms')

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
    ])
  })

  test('subjunctive Form I — كتب (2fs) dropped noon annotated', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 1), 'subjunctive', '2fs')

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
        verbTense: 'active.present.subjunctive',
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
    ])
  })

  test('subjunctive Form I — كتب (2d) dropped noon annotated', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 1), 'subjunctive', '2d')

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
        verbTense: 'active.present.subjunctive',
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
    ])
  })

  test('subjunctive Form I — كتب (2mp) dropped noon annotated', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 1), 'subjunctive', '2mp')

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
        verbTense: 'active.present.subjunctive',
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
    ])
  })

  test('jussive Form I — كتب (2fs) dropped noon annotated', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 1), 'jussive', '2fs')

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
    ])
  })

  test('jussive Form I — كتب (2mp) dropped noon annotated', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 1), 'jussive', '2mp')

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
    ])
  })

  test('jussive Form I — كتب (3mp) dropped noon annotated', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 1), 'jussive', '3mp')

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
        verbTense: 'active.present.jussive',
        morphemes: [
          { text: 'يَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'ُوا', role: 'agreement' },
          { text: 'نَ', role: 'elided' },
        ],
      },
    ])
  })

  test('jussive Form I — كتب (2d) dropped noon annotated', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 1), 'jussive', '2d')

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
    ])
  })

  test('jussive Form V defective — بقي (3ms) elided defective radical annotated', () => {
    const result = activePresentMoodDerivationSteps(getVerb('بقي', 5), 'jussive', '3ms')

    expect(detokenizeDerivationSteps(result)).toEqual([
      {
        type: 'root',
        morphemes: [
          { text: 'ب', role: 'radical' },
          { text: 'ق', role: 'radical' },
          { text: 'ي', role: 'radical' },
        ],
      },
      {
        type: 'form',
        form: 5,
        morphemes: [
          { text: 'تَ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ق', role: 'radical' },
          { text: 'َّ', role: 'measure' },
          { text: 'ى', role: 'radical' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.present.indicative',
        morphemes: [
          { text: 'يَ', role: 'agreement' },
          { text: 'تَ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ق', role: 'radical' },
          { text: 'َّ', role: 'measure' },
          { text: 'ى', role: 'radical' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.present.jussive',
        morphemes: [
          { text: 'يَ', role: 'agreement' },
          { text: 'تَ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َ', role: 'measure' },
          { text: 'ق', role: 'radical' },
          { text: 'َّ', role: 'measure' },
          { text: 'ى', role: 'elided' },
        ],
      },
    ])
  })

  test('jussive Form I — كتب (3md) dropped noon annotated', () => {
    const result = activePresentMoodDerivationSteps(getVerb('كتب', 1), 'jussive', '3md')

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
        pronounId: '3md',
        morphemes: [
          { text: 'يَ', role: 'agreement' },
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
          { text: 'يَ', role: 'agreement' },
          { text: 'ك', role: 'radical' },
          { text: 'ْ', role: 'measure' },
          { text: 'ت', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ب', role: 'radical' },
          { text: 'َا', role: 'agreement' },
          { text: 'نِ', role: 'elided' },
        ],
      },
    ])
  })

  test('indicative Form I — ءول (3ms) hollow root: waw (C2) annotated as radical', () => {
    const result = activePresentMoodDerivationSteps(getVerb('ءول', 1), 'indicative', '3ms')

    expect(detokenizeDerivationSteps(result)).toEqual([
      {
        type: 'root',
        morphemes: [
          { text: 'ء', role: 'radical' },
          { text: 'و', role: 'radical' },
          { text: 'ل', role: 'radical' },
        ],
      },
      {
        type: 'form',
        form: 1,
        morphemes: [
          { text: 'آل', role: 'radical' },
          { text: 'َ', role: 'measure' },
        ],
      },
      {
        type: 'tense',
        verbTense: 'active.present.indicative',
        morphemes: [
          { text: 'يَ', role: 'agreement' },
          { text: 'ؤ', role: 'radical' },
          { text: 'ُ', role: 'measure' },
          { text: 'ول', role: 'radical' },
          { text: 'ُ', role: 'agreement' },
        ],
      },
    ])
  })
})
