import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotateActiveImperative } from './imperative-annotation'

describe('annotateActiveImperative', () => {
  test('Form I — كتب (2fs) matches annotation object', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2fs')

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
            { text: 'ك', role: 'radical' },
            { text: 'ْ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'ُ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'ُ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2fs' },
          arabic: 'تَكْتُبِينَ',
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
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَكْتُبِي',
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
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'اُكْتُبِي',
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
      ],
    })
  })

  test('Form X — خرج (2ms) matches annotation object', () => {
    const result = annotateActiveImperative(getVerb('خرج', 10), '2ms')

    expect(result).toEqual({
      steps: [
        {
          kind: { type: 'root' },
          arabic: 'خرج',
          morphemes: [
            { text: 'خ', role: 'radical' },
            { text: 'ر', role: 'radical' },
            { text: 'ج', role: 'radical' },
          ],
        },
        {
          kind: { type: 'form', form: 10 },
          arabic: 'اِسْتَخْرَجَ',
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
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَسْتَخْرِجُ',
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
          kind: { type: 'pronoun', pronounId: '2ms' },
          arabic: 'تَسْتَخْرِجُ',
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
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَسْتَخْرِجْ',
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
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'اِسْتَخْرِجْ',
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
      ],
    })
  })

  test('Form I — كتب (2d) dropped person prefix annotated', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2d')

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
            { text: 'ك', role: 'radical' },
            { text: 'ْ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'ُ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'ُ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2d' },
          arabic: 'تَكْتُبَانِ',
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
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَكْتُبَا',
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
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'اُكْتُبَا',
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
      ],
    })
  })

  test('Form IV — حبب (2ms) matches annotation object', () => {
    const result = annotateActiveImperative(getVerb('حبب', 4), '2ms')

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
          kind: { type: 'form', form: 4 },
          arabic: 'أَحَبَّ',
          morphemes: [
            { text: 'أَ', role: 'measure' },
            { text: 'ح', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'بّ', role: 'radical' },
            { text: 'َ', role: 'measure' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يُحِبُّ',
          morphemes: [
            { text: 'أَ', role: 'elided' },
            { text: 'يُ', role: 'agreement' },
            { text: 'ح', role: 'radical' },
            { text: 'ِ', role: 'measure' },
            { text: 'بّ', role: 'radical' },
            { text: 'ُ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2ms' },
          arabic: 'تُحِبُّ',
          morphemes: [
            { text: 'تُ', role: 'agreement' },
            { text: 'ح', role: 'radical' },
            { text: 'ِ', role: 'measure' },
            { text: 'بّ', role: 'radical' },
            { text: 'ُ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تُحِبَّ',
          morphemes: [
            { text: 'تُ', role: 'agreement' },
            { text: 'ح', role: 'radical' },
            { text: 'ِ', role: 'measure' },
            { text: 'بّ', role: 'radical' },
            { text: 'َ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'أَحِبَّ',
          morphemes: [
            { text: 'تُ', role: 'elided' },
            { text: 'أ', role: 'radical' },
            { text: 'َ', role: 'measure' },
            { text: 'ح', role: 'radical' },
            { text: 'ِ', role: 'measure' },
            { text: 'بّ', role: 'radical' },
            { text: 'َ', role: 'agreement' },
          ],
        },
      ],
    })
  })

  test('Form I — كتب (2ms) dropped person prefix annotated', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2ms')

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
            { text: 'ك', role: 'radical' },
            { text: 'ْ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'ُ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'ُ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2ms' },
          arabic: 'تَكْتُبُ',
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
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَكْتُبْ',
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
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'اُكْتُبْ',
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
      ],
    })
  })

  test('Form I — كتب (2mp) dropped person prefix annotated', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2mp')

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
            { text: 'ك', role: 'radical' },
            { text: 'ْ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'ُ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'ُ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2mp' },
          arabic: 'تَكْتُبُونَ',
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
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَكْتُبُوا',
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
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'اُكْتُبُوا',
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
      ],
    })
  })

  test('Form I — كتب (2fp) dropped person prefix annotated', () => {
    const result = annotateActiveImperative(getVerb('كتب', 1), '2fp')

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
            { text: 'ك', role: 'radical' },
            { text: 'ْ', role: 'measure' },
            { text: 'ت', role: 'radical' },
            { text: 'ُ', role: 'measure' },
            { text: 'ب', role: 'radical' },
            { text: 'ُ', role: 'agreement' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2fp' },
          arabic: 'تَكْتُبْنَ',
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
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَكْتُبْنَ',
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
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'اُكْتُبْنَ',
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
      ],
    })
  })
})
