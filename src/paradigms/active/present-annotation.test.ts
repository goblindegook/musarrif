import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotateActivePresentMood } from './present-annotation'

describe('annotateActivePresentMood', () => {
  test('indicative Form I — كتب (1s) matches annotation object', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'indicative', '1s')

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
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '1s' },
          arabic: 'أَكْتُبُ',
          morphemes: [
            { text: 'أَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'ُ', role: 'agreement' },
          ],
        },
      ],
    })
  })

  test('indicative Form III — كتب (3ms) matches annotation object', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 3), 'indicative', '3ms')

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
            { text: 'ك', role: 'radical' },
            { text: 'َا', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يُكَاتِبُ',
          morphemes: [
            { text: 'يُ', role: 'agreement' },
            { text: 'كَ', role: 'radical' },
            { text: 'ا', role: 'measure' },
            { text: 'تِبُ', role: 'radical' },
          ],
        },
      ],
    })
  })

  test('indicative Form VII — كتب (3ms) matches annotation object', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 7), 'indicative', '3ms')

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
            { text: 'ك', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَنْكَتِبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'نْ', role: 'measure' },
            { text: 'كَتِبُ', role: 'radical' },
          ],
        },
      ],
    })
  })

  test('indicative Form V — كتب (3ms) matches annotation object', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 5), 'indicative', '3ms')

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
            { text: 'ك', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َّ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَتَكَتَّبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'تَ', role: 'measure' },
            { text: 'كَتَّبُ', role: 'radical' },
          ],
        },
      ],
    })
  })

  test('indicative Form VI — كتب (3ms) matches annotation object', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 6), 'indicative', '3ms')

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
            { text: 'ك', role: 'radical' },
            { text: 'َا', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَتَكَاتَبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'تَ', role: 'measure' },
            { text: 'كَ', role: 'radical' },
            { text: 'ا', role: 'measure' },
            { text: 'تَبُ', role: 'radical' },
          ],
        },
      ],
    })
  })

  test('subjunctive Form I — كتب (1s) matches annotation object', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'subjunctive', '1s')

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
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '1s' },
          arabic: 'أَكْتُبُ',
          morphemes: [
            { text: 'أَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'ُ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.subjunctive' },
          arabic: 'أَكْتُبَ',
          morphemes: [
            { text: 'أَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'َ', role: 'agreement' },
          ],
        },
      ],
    })
  })

  test('jussive Form I — كتب (2ms) matches annotation object', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'jussive', '2ms')

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
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2ms' },
          arabic: 'تَكْتُبُ',
          morphemes: [
            { text: 'تَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'ُ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَكْتُبْ',
          morphemes: [
            { text: 'تَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'ْ', role: 'agreement' },
          ],
        },
      ],
    })
  })

  test('subjunctive Form I — كتب (2fs) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'subjunctive', '2fs')

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
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2fs' },
          arabic: 'تَكْتُبِينَ',
          morphemes: [
            { text: 'تَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'ِينَ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.subjunctive' },
          arabic: 'تَكْتُبِي',
          morphemes: [
            { text: 'تَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'ِي', role: 'agreement' },
            { text: 'نَ', role: 'elided' },
          ],
        },
      ],
    })
  })

  test('subjunctive Form I — كتب (2d) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'subjunctive', '2d')

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
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2d' },
          arabic: 'تَكْتُبَانِ',
          morphemes: [
            { text: 'تَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'َانِ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.subjunctive' },
          arabic: 'تَكْتُبَا',
          morphemes: [
            { text: 'تَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'َا', role: 'agreement' },
            { text: 'نِ', role: 'elided' },
          ],
        },
      ],
    })
  })

  test('subjunctive Form I — كتب (2mp) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'subjunctive', '2mp')

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
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2mp' },
          arabic: 'تَكْتُبُونَ',
          morphemes: [
            { text: 'تَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
            { text: 'ونَ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.subjunctive' },
          arabic: 'تَكْتُبُوا',
          morphemes: [
            { text: 'تَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'ُوا', role: 'agreement' },
            { text: 'نَ', role: 'elided' },
          ],
        },
      ],
    })
  })

  test('jussive Form I — كتب (2fs) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'jussive', '2fs')

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
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2fs' },
          arabic: 'تَكْتُبِينَ',
          morphemes: [
            { text: 'تَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'ِينَ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَكْتُبِي',
          morphemes: [
            { text: 'تَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'ِي', role: 'agreement' },
            { text: 'نَ', role: 'elided' },
          ],
        },
      ],
    })
  })

  test('jussive Form I — كتب (2mp) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'jussive', '2mp')

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
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2mp' },
          arabic: 'تَكْتُبُونَ',
          morphemes: [
            { text: 'تَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
            { text: 'ونَ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَكْتُبُوا',
          morphemes: [
            { text: 'تَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'ُوا', role: 'agreement' },
            { text: 'نَ', role: 'elided' },
          ],
        },
      ],
    })
  })

  test('jussive Form I — كتب (3mp) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'jussive', '3mp')

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
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '3mp' },
          arabic: 'يَكْتُبُونَ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
            { text: 'ونَ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'يَكْتُبُوا',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'ُوا', role: 'agreement' },
            { text: 'نَ', role: 'elided' },
          ],
        },
      ],
    })
  })

  test('jussive Form I — كتب (2d) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'jussive', '2d')

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
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2d' },
          arabic: 'تَكْتُبَانِ',
          morphemes: [
            { text: 'تَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'َانِ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَكْتُبَا',
          morphemes: [
            { text: 'تَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'َا', role: 'agreement' },
            { text: 'نِ', role: 'elided' },
          ],
        },
      ],
    })
  })

  test('jussive Form I — كتب (3md) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'jussive', '3md')

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
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُبُ', role: 'radical' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '3md' },
          arabic: 'يَكْتُبَانِ',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'َانِ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'يَكْتُبَا',
          morphemes: [
            { text: 'يَ', role: 'agreement' },
            { text: 'كْتُب', role: 'radical' },
            { text: 'َا', role: 'agreement' },
            { text: 'نِ', role: 'elided' },
          ],
        },
      ],
    })
  })
})
