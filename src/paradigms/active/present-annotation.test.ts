import { describe, expect, test } from 'vitest'
import { getVerb } from '../verbs'
import { annotateActivePresentMood } from './present-annotation'

describe('annotateActivePresentMood', () => {
  test('indicative Form I — كتب (1s) matches annotation object', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'indicative', '1s')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 1 }, arabic: 'كَتَبَ' },
        { kind: { type: 'tense', verbTense: 'active.present.indicative' }, arabic: 'يَكْتُبُ' },
        { kind: { type: 'pronoun', pronounId: '1s' }, arabic: 'أَكْتُبُ' },
      ],
      morphemes: [
        { text: 'أَ', role: 'tense' },
        { text: 'كْتُب', role: 'root' },
        { text: 'ُ', role: 'suffix' },
      ],
    })
  })

  test('indicative Form III — كتب (3ms) matches annotation object', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 3), 'indicative', '3ms')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 3 }, arabic: 'كَاتَبَ' },
        { kind: { type: 'tense', verbTense: 'active.present.indicative' }, arabic: 'يُكَاتِبُ' },
      ],
      morphemes: [
        { text: 'يُ', role: 'tense' },
        { text: 'كَ', role: 'root' },
        { text: 'ا', role: 'form' },
        { text: 'تِبُ', role: 'root' },
      ],
    })
  })

  test('indicative Form VII — كتب (3ms) matches annotation object', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 7), 'indicative', '3ms')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 7 }, arabic: 'اِنْكَتَبَ' },
        { kind: { type: 'tense', verbTense: 'active.present.indicative' }, arabic: 'يَنْكَتِبُ' },
      ],
      morphemes: [
        { text: 'يَ', role: 'tense' },
        { text: 'نْ', role: 'form' },
        { text: 'كَتِبُ', role: 'root' },
      ],
    })
  })

  test('indicative Form V — كتب (3ms) matches annotation object', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 5), 'indicative', '3ms')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 5 }, arabic: 'تَكَتَّبَ' },
        { kind: { type: 'tense', verbTense: 'active.present.indicative' }, arabic: 'يَتَكَتَّبُ' },
      ],
      morphemes: [
        { text: 'يَ', role: 'tense' },
        { text: 'تَ', role: 'form' },
        { text: 'كَتَّبُ', role: 'root' },
      ],
    })
  })

  test('indicative Form VI — كتب (3ms) matches annotation object', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 6), 'indicative', '3ms')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 6 }, arabic: 'تَكَاتَبَ' },
        { kind: { type: 'tense', verbTense: 'active.present.indicative' }, arabic: 'يَتَكَاتَبُ' },
      ],
      morphemes: [
        { text: 'يَ', role: 'tense' },
        { text: 'تَ', role: 'form' },
        { text: 'كَ', role: 'root' },
        { text: 'ا', role: 'form' },
        { text: 'تَبُ', role: 'root' },
      ],
    })
  })

  test('subjunctive Form I — كتب (1s) matches annotation object', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'subjunctive', '1s')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 1 }, arabic: 'كَتَبَ' },
        { kind: { type: 'tense', verbTense: 'active.present.indicative' }, arabic: 'يَكْتُبُ' },
        { kind: { type: 'pronoun', pronounId: '1s' }, arabic: 'أَكْتُبُ' },
        { kind: { type: 'tense', verbTense: 'active.present.subjunctive' }, arabic: 'أَكْتُبَ' },
      ],
      morphemes: [
        { text: 'أَ', role: 'tense' },
        { text: 'كْتُب', role: 'root' },
        { text: 'َ', role: 'suffix' },
      ],
    })
  })

  test('jussive Form I — كتب (2ms) matches annotation object', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'jussive', '2ms')

    expect(result).toMatchObject({
      steps: [
        { kind: { type: 'root' }, arabic: 'كتب' },
        { kind: { type: 'form', form: 1 }, arabic: 'كَتَبَ' },
        { kind: { type: 'tense', verbTense: 'active.present.indicative' }, arabic: 'يَكْتُبُ' },
        { kind: { type: 'pronoun', pronounId: '2ms' }, arabic: 'تَكْتُبُ' },
        { kind: { type: 'tense', verbTense: 'active.present.jussive' }, arabic: 'تَكْتُبْ' },
      ],
      morphemes: [
        { text: 'تَ', role: 'tense' },
        { text: 'كْتُب', role: 'root' },
        { text: 'ْ', role: 'suffix' },
      ],
    })
  })

  test('subjunctive Form I — كتب (2fs) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'subjunctive', '2fs')

    expect(result.morphemes).toMatchObject([
      { text: 'تَ', role: 'tense' },
      { text: 'كْتُب', role: 'root' },
      { text: 'ِي', role: 'suffix' },
      { text: 'نَ', role: 'dropped' },
    ])
  })

  test('subjunctive Form I — كتب (2d) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'subjunctive', '2d')

    expect(result.morphemes).toMatchObject([
      { text: 'تَ', role: 'tense' },
      { text: 'كْتُب', role: 'root' },
      { role: 'suffix' },
      { text: 'نِ', role: 'dropped' },
    ])
  })

  test('subjunctive Form I — كتب (2mp) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'subjunctive', '2mp')

    expect(result.morphemes).toMatchObject([
      { text: 'تَ', role: 'tense' },
      { text: 'كْتُب', role: 'root' },
      { role: 'suffix' },
      { text: 'نَ', role: 'dropped' },
    ])
  })

  test('jussive Form I — كتب (2fs) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'jussive', '2fs')

    expect(result.morphemes).toMatchObject([
      { text: 'تَ', role: 'tense' },
      { text: 'كْتُب', role: 'root' },
      { text: 'ِي', role: 'suffix' },
      { text: 'نَ', role: 'dropped' },
    ])
  })

  test('jussive Form I — كتب (2mp) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'jussive', '2mp')

    expect(result.morphemes).toMatchObject([
      { text: 'تَ', role: 'tense' },
      { text: 'كْتُب', role: 'root' },
      { role: 'suffix' },
      { text: 'نَ', role: 'dropped' },
    ])
  })

  test('jussive Form I — كتب (3mp) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'jussive', '3mp')

    expect(result.morphemes).toMatchObject([
      { text: 'يَ', role: 'tense' },
      { text: 'كْتُب', role: 'root' },
      { role: 'suffix' },
      { text: 'نَ', role: 'dropped' },
    ])
  })

  test('jussive Form I — كتب (2d) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'jussive', '2d')

    expect(result.morphemes).toMatchObject([
      { text: 'تَ', role: 'tense' },
      { text: 'كْتُب', role: 'root' },
      { text: 'َا', role: 'suffix' },
      { text: 'نِ', role: 'dropped' },
    ])
  })

  test('jussive Form I — كتب (3md) dropped noon annotated', () => {
    const result = annotateActivePresentMood(getVerb('كتب', 1), 'jussive', '3md')

    expect(result.morphemes).toMatchObject([
      { text: 'يَ', role: 'tense' },
      { text: 'كْتُب', role: 'root' },
      { text: 'َا', role: 'suffix' },
      { text: 'نِ', role: 'dropped' },
    ])
  })
})
