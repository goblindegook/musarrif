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
        {
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'اُكْتُبِي',
          morphemes: [
            { text: 'تَ', role: 'dropped' },
            { text: 'اُ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ِي', role: 'suffix' },
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
            { text: 'خ', role: 'root' },
            { text: 'ر', role: 'root' },
            { text: 'ج', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 10 },
          arabic: 'اِسْتَخْرَجَ',
          morphemes: [
            { text: 'اِسْتَ', role: 'form' },
            { text: 'خْرَجَ', role: 'root' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يَسْتَخْرِجُ',
          morphemes: [
            { text: 'اِ', role: 'dropped' },
            { text: 'يَ', role: 'tense' },
            { text: 'سْتَ', role: 'form' },
            { text: 'خْرِجُ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2ms' },
          arabic: 'تَسْتَخْرِجُ',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'سْتَ', role: 'form' },
            { text: 'خْرِج', role: 'root' },
            { text: 'ُ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَسْتَخْرِجْ',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'سْتَ', role: 'form' },
            { text: 'خْرِج', role: 'root' },
            { text: 'ْ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'اِسْتَخْرِجْ',
          morphemes: [
            { text: 'تَ', role: 'dropped' },
            { text: 'اِ', role: 'tense' },
            { text: 'سْتَ', role: 'form' },
            { text: 'خْرِجْ', role: 'root' },
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
        {
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'اُكْتُبَا',
          morphemes: [
            { text: 'تَ', role: 'dropped' },
            { text: 'اُ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'َا', role: 'suffix' },
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
            { text: 'ح', role: 'root' },
            { text: 'ب', role: 'root' },
            { text: 'ب', role: 'root' },
          ],
        },
        {
          kind: { type: 'form', form: 4 },
          arabic: 'أَحَبَّ',
          morphemes: [
            { text: 'أَ', role: 'form' },
            { text: 'حَبَّ', role: 'root' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.indicative' },
          arabic: 'يُحِبُّ',
          morphemes: [
            { text: 'أَ', role: 'dropped' },
            { text: 'يُ', role: 'tense' },
            { text: 'حِبُّ', role: 'root' },
          ],
        },
        {
          kind: { type: 'pronoun', pronounId: '2ms' },
          arabic: 'تُحِبُّ',
          morphemes: [
            { text: 'تُ', role: 'tense' },
            { text: 'حِبُ', role: 'root' },
            { text: 'ّ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تُحِبَّ',
          morphemes: [
            { text: 'تُ', role: 'tense' },
            { text: 'حِبَ', role: 'root' },
            { text: 'ّ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'أَحِبَّ',
          morphemes: [
            { text: 'تُ', role: 'dropped' },
            { text: 'أَ', role: 'form' },
            { text: 'حِبَّ', role: 'root' },
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
        {
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'اُكْتُبْ',
          morphemes: [
            { text: 'تَ', role: 'dropped' },
            { text: 'اُ', role: 'tense' },
            { text: 'كْتُبْ', role: 'root' },
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
        {
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'اُكْتُبُوْا',
          morphemes: [
            { text: 'تَ', role: 'dropped' },
            { text: 'اُ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ُوْا', role: 'suffix' },
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
          kind: { type: 'pronoun', pronounId: '2fp' },
          arabic: 'تَكْتُبْنَ',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ْنَ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.present.jussive' },
          arabic: 'تَكْتُبْنَ',
          morphemes: [
            { text: 'تَ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ْنَ', role: 'suffix' },
          ],
        },
        {
          kind: { type: 'tense', verbTense: 'active.imperative' },
          arabic: 'اُكْتُبْنَ',
          morphemes: [
            { text: 'تَ', role: 'dropped' },
            { text: 'اُ', role: 'tense' },
            { text: 'كْتُب', role: 'root' },
            { text: 'ْنَ', role: 'suffix' },
          ],
        },
      ],
    })
  })
})
