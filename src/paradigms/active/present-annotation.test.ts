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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'كَتَبَ',
          morphemes: [{ text: 'كَتَبَ', role: 'root' }],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '1s' },
          arabic: 'أَكْتُبُ',
          morphemes: [
            { text: 'أَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ُ', role: 'suffix' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 3 },
          arabic: 'كَاتَبَ',
          morphemes: [
            { text: 'كَ', role: 'root' },
            { text: 'ا', role: 'form' },
            { text: 'تَبَ', role: 'root' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يُكَاتِبُ',
          morphemes: [
            { text: 'يُ', role: 'tense' },
            { text: 'كَ', role: 'root' },
            { text: 'ا', role: 'form' },
            { text: 'تِبُ', role: 'root' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 7 },
          arabic: 'اِنْكَتَبَ',
          morphemes: [
            { text: 'اِنْ', role: 'form' },
            { text: 'كَتَبَ', role: 'root' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَنْكَتِبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'نْ', role: 'form' },
            { text: 'كَتِبُ', role: 'root' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 5 },
          arabic: 'تَكَتَّبَ',
          morphemes: [
            { text: 'تَ', role: 'form' },
            { text: 'كَتَّبَ', role: 'root' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَتَكَتَّبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'تَ', role: 'form' },
            { text: 'كَتَّبُ', role: 'root' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 6 },
          arabic: 'تَكَاتَبَ',
          morphemes: [
            { text: 'تَ', role: 'form' },
            { text: 'كَ', role: 'root' },
            { text: 'ا', role: 'form' },
            { text: 'تَبَ', role: 'root' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَتَكَاتَبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'تَ', role: 'form' },
            { text: 'كَ', role: 'root' },
            { text: 'ا', role: 'form' },
            { text: 'تَبُ', role: 'root' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'كَتَبَ',
          morphemes: [{ text: 'كَتَبَ', role: 'root' }],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '1s' },
          arabic: 'أَكْتُبُ',
          morphemes: [
            { text: 'أَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ُ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.subjunctive' },
          arabic: 'أَكْتُبَ',
          morphemes: [
            { text: 'أَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'َ', role: 'suffix' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'كَتَبَ',
          morphemes: [{ text: 'كَتَبَ', role: 'root' }],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2ms' },
          arabic: 'تَكْتُبُ',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ُ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَكْتُبْ',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ْ', role: 'suffix' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'كَتَبَ',
          morphemes: [{ text: 'كَتَبَ', role: 'root' }],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2fs' },
          arabic: 'تَكْتُبِيْنَ',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ِيْنَ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.subjunctive' },
          arabic: 'تَكْتُبِي',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ِي', role: 'suffix' },
            { text: 'نَ', role: 'dropped' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'كَتَبَ',
          morphemes: [{ text: 'كَتَبَ', role: 'root' }],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2d' },
          arabic: 'تَكْتُبَانِ',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'َانِ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.subjunctive' },
          arabic: 'تَكْتُبَا',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'َا', role: 'suffix' },
            { text: 'نِ', role: 'dropped' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'كَتَبَ',
          morphemes: [{ text: 'كَتَبَ', role: 'root' }],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2mp' },
          arabic: 'تَكْتُبُوْنَ',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
            { text: 'وْنَ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.subjunctive' },
          arabic: 'تَكْتُبُوْا',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ُوْا', role: 'suffix' },
            { text: 'نَ', role: 'dropped' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'كَتَبَ',
          morphemes: [{ text: 'كَتَبَ', role: 'root' }],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2fs' },
          arabic: 'تَكْتُبِيْنَ',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ِيْنَ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَكْتُبِي',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ِي', role: 'suffix' },
            { text: 'نَ', role: 'dropped' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'كَتَبَ',
          morphemes: [{ text: 'كَتَبَ', role: 'root' }],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2mp' },
          arabic: 'تَكْتُبُوْنَ',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
            { text: 'وْنَ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَكْتُبُوْا',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ُوْا', role: 'suffix' },
            { text: 'نَ', role: 'dropped' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'كَتَبَ',
          morphemes: [{ text: 'كَتَبَ', role: 'root' }],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '3mp' },
          arabic: 'يَكْتُبُوْنَ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
            { text: 'وْنَ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'يَكْتُبُوْا',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ُوْا', role: 'suffix' },
            { text: 'نَ', role: 'dropped' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'كَتَبَ',
          morphemes: [{ text: 'كَتَبَ', role: 'root' }],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2d' },
          arabic: 'تَكْتُبَانِ',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'َانِ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَكْتُبَا',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'َا', role: 'suffix' },
            { text: 'نِ', role: 'dropped' },
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
            { text: 'ك', role: 'root' },
            { text: 'ت', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 1 },
          arabic: 'كَتَبَ',
          morphemes: [{ text: 'كَتَبَ', role: 'root' }],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَكْتُبُ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُبُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '3md' },
          arabic: 'يَكْتُبَانِ',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'َانِ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'يَكْتُبَا',
          morphemes: [
            { text: 'يَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'َا', role: 'suffix' },
            { text: 'نِ', role: 'dropped' },
          ],
        },
      ],
    })
  })
})
