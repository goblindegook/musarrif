import { describe, expect, test } from 'vitest'
import enStrings from '../ui/locales/en.strings.json'
import enLexicon from '../ui/locales/en.verbs.json'
import type { ExplanationLayers, VerbExplanationLayers } from './explanation'
import { renderExplanation, resolveNominalExplanationLayers, resolveVerbExplanationLayers } from './explanation'
import { deriveMasdar } from './nominal/masdar'
import type { VerbTense } from './tense'
import { getVerb, getVerbById } from './verbs'

const localeT = (key: string, params?: Record<string, string>): string => {
  const strings = enStrings as Record<string, string>
  const roots = (enLexicon as { roots?: Record<string, string> }).roots
  const template = strings[key] ?? roots?.[key] ?? key
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? `{${k}}`)
}

// ── rootType ──────────────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers rootType', () => {
  test.each([
    ['sound root', 'كتب', { rootType: [] }],
    ['hollow-waw root', 'قول', { rootType: ['hollow'], weakLetter: 'waw' }],
    ['hollow-yaa root', 'بيع', { rootType: ['hollow'], weakLetter: 'yaa' }],
    ['defective-waw root', 'دعو', { rootType: ['defective'], weakLetter: 'waw' }],
    ['defective-yaa root', 'رمي', { rootType: ['defective'], weakLetter: 'yaa' }],
    ['assimilated root', 'وصل', { rootType: ['assimilated'] }],
    ['doubled root', 'مدد', { rootType: ['doubled'] }],
  ] as const)('%s resolves root metadata', (_, root, expected) => {
    const verb = getVerb(root, 1)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms')
    expect(layers).toMatchObject(expected)
  })
})

// ── formIPattern ─────────────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers formIPattern', () => {
  test.each([
    ['Form I verb', 1, { vowels: 'a-u', pastForm: 'كَتَبَ', presentForm: 'يَكْتُبُ' }],
    ['Form II verb', 2, { vowels: undefined, pastForm: undefined, presentForm: undefined }],
  ] as const)('%s resolves Form I citation metadata', (_, form, expected) => {
    const verb = getVerb('كتب', form)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms')
    expect(layers).toMatchObject(expected)
  })

  test.each([
    ['past citation', 'كَتَبَ'],
    ['present citation', 'يَكْتُبُ'],
  ] as const)('form-i-pattern sentence contains the actual %s form', (_, expected) => {
    const verb = getVerb('كتب', 1)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms')
    const result = renderExplanation(layers, localeT)
    expect(result[0]).toContainEqual(expect.objectContaining({ text: expect.stringContaining(expected) }))
  })
})

// ── tenseContext ─────────────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseContext', () => {
  const verb = getVerb('كتب', 1)

  test.each([
    ['active past', 'active.past', '3ms'],
    ['active present indicative', 'active.present.indicative', '3ms'],
    ['active present jussive', 'active.present.jussive', '3ms'],
    ['active imperative', 'active.imperative', '2ms'],
    ['passive past', 'passive.past', '3ms'],
    ['passive present jussive', 'passive.present.jussive', '3ms'],
  ] as const)('%s resolves tense %s', (_, tense, pronoun) => {
    expect(resolveVerbExplanationLayers(verb, tense, pronoun).tense).toBe(tense)
  })
})

// ── tenseRoot: hollow ────────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot hollow', () => {
  test.each([
    ['hollow + past', 1, 'active.past', '3ms', 'middle-lengthens-aa'],
    ['hollow + past + 2fs', 1, 'active.past', '2fs', 'middle-shortens-consonant'],
    ['hollow + passive past + 1s', 1, 'passive.past', '1s', 'middle-shortens-consonant'],
    ['hollow + indicative + 3fp', 1, 'active.present.indicative', '3fp', 'middle-shortens-consonant'],
    ['hollow + subjunctive + 2fp', 1, 'active.present.subjunctive', '2fp', 'middle-shortens-consonant'],
    ['hollow + future + 3fp', 1, 'active.future', '3fp', 'middle-shortens-consonant'],
    ['hollow + passive indicative + 3fp', 1, 'passive.present.indicative', '3fp', 'middle-shortens-consonant'],
    ['hollow + indicative + 3mp keeps long vowel', 1, 'active.present.indicative', '3mp', 'middle-lengthens-uu'],
    ['hollow + jussive + 3mp keeps long vowel', 1, 'active.present.jussive', '3mp', 'middle-lengthens-uu'],
    ['hollow + imperative + 2fs keeps long vowel', 1, 'active.imperative', '2fs', 'middle-lengthens-uu'],
    ['hollow + passive jussive + 3ms', 1, 'passive.present.jussive', '3ms', 'middle-shortens'],
    ['hollow + passive jussive + 3mp keeps long vowel', 1, 'passive.present.jussive', '3mp', 'middle-passive-aa'],
    ['hollow-waw + indicative', 1, 'active.present.indicative', '3ms', 'middle-lengthens-uu'],
    ['hollow-waw + jussive', 1, 'active.present.jussive', '3ms', 'middle-shortens'],
    ['hollow + passive past', 1, 'passive.past', '3ms', 'middle-passive-ii'],
    ['hollow + passive indicative', 1, 'passive.present.indicative', '3ms', 'middle-passive-aa'],
    ['hollow + imperative', 1, 'active.imperative', '2ms', 'middle-shortens'],
  ] as const)('%s → %s', (_, form, tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(getVerb('قول', form), tense, pronoun).tenseRoot).toBe(expected)
  })

  test.each([
    ['hollow-yaa + past', 'بيع', 1, 'active.past', '3ms', 'middle-lengthens-aa'],
    ['hollow-waw Form II + past', 'شوق', 2, 'active.past', '3ms', undefined],
    ['hollow-waw Form II + indicative', 'شوق', 2, 'active.present.indicative', '3ms', undefined],
    ['hollow-waw Form V + past', 'شوق', 5, 'active.past', '3ms', undefined],
    ['hollow-waw Form III + past', 'نول', 3, 'active.past', '3ms', undefined],
    ['hollow-waw Form III + indicative', 'نول', 3, 'active.present.indicative', '3ms', undefined],
    ['hollow-waw Form VI + past + 1s', 'نول', 6, 'active.past', '1s', undefined],
    ['hollow-waw Form VI + passive indicative', 'نول', 6, 'passive.present.indicative', '3ms', undefined],
    ['hollow-waw Form IV + indicative', 'قوم', 4, 'active.present.indicative', '3ms', 'middle-lengthens-ii-derived'],
    ['hollow-waw Form X + indicative', 'قوم', 10, 'active.present.indicative', '3ms', 'middle-lengthens-ii-derived'],
    ['hollow-yaa Form IV + indicative', 'خير', 4, 'active.present.indicative', '3ms', 'middle-lengthens-ii-derived'],
    ['hollow Form X + future', 'قوم', 10, 'active.future', '3ms', 'middle-lengthens-ii-derived'],
    ['hollow Form IV + subjunctive', 'قوم', 4, 'active.present.subjunctive', '3ms', 'middle-lengthens-ii-derived'],
    ['hollow-waw Form VII + indicative', 'قوم', 7, 'active.present.indicative', '3ms', 'middle-lengthens-aa-present'],
    ['hollow-waw Form VIII + indicative', 'عود', 8, 'active.present.indicative', '3ms', 'middle-lengthens-aa-present'],
    ['hollow-yaa Form VIII + indicative', 'خير', 8, 'active.present.indicative', '3ms', 'middle-lengthens-aa-present'],
    ['hollow Form IV + passive indicative', 'قوم', 4, 'passive.present.indicative', '3ms', 'middle-passive-aa'],
    ['hollow Form IV + past', 'قوم', 4, 'active.past', '3ms', 'middle-lengthens-aa'],
    ['hollow Form VIII + passive past', 'عود', 8, 'passive.past', '3ms', 'middle-passive-ii'],
  ] as const)('%s → %s', (_, root, form, tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(getVerb(root, form), tense, pronoun).tenseRoot).toBe(expected)
  })
})

// ── tenseRoot: defective ─────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot defective', () => {
  test.each([
    ['defective + past + 3ms', 'دعو', 'active.past', '3ms', 'final-isolated'],
    ['defective + past + 3fs', 'دعو', 'active.past', '3fs', 'final-elides'],
    ['defective + past + 3mp', 'دعو', 'active.past', '3mp', 'final-resurfaces'],
    ['defective + past + 3md', 'دعو', 'active.past', '3md', 'final-resurfaces'],
    ['defective + past + 3fd', 'دعو', 'active.past', '3fd', 'final-elides'],
    ['defective + past + 1s', 'دعو', 'active.past', '1s', 'final-resurfaces'],
    ['defective + past + 2ms', 'دعو', 'active.past', '2ms', 'final-resurfaces'],
    ['defective + past + 3fp', 'دعو', 'active.past', '3fp', 'final-resurfaces'],
    ['defective + past + 1p', 'دعو', 'active.past', '1p', 'final-resurfaces'],
    ['defective + past + 2fs', 'دعو', 'active.past', '2fs', 'final-resurfaces'],
    ['defective + past + 2d', 'دعو', 'active.past', '2d', 'final-resurfaces'],
    ['defective + past + 2mp', 'دعو', 'active.past', '2mp', 'final-resurfaces'],
    ['defective + past + 2fp', 'دعو', 'active.past', '2fp', 'final-resurfaces'],
    ['defective-waw + indicative', 'دعو', 'active.present.indicative', '3ms', 'final-lengthens-uu'],
    ['defective-yaa + indicative', 'رمي', 'active.present.indicative', '3ms', 'final-lengthens-ii'],
    ['defective + jussive', 'دعو', 'active.present.jussive', '3ms', 'final-drops'],
    ['defective + imperative', 'دعو', 'active.imperative', '2ms', 'final-drops'],
    ['defective + jussive + 3mp', 'رمي', 'active.present.jussive', '3mp', 'final-surfaces-consonant'],
    ['defective + jussive + 2fs', 'رمي', 'active.present.jussive', '2fs', 'final-surfaces-consonant'],
    ['defective + imperative + 2mp', 'رمي', 'active.imperative', '2mp', 'final-surfaces-consonant'],
    ['defective + jussive + 3fp', 'رمي', 'active.present.jussive', '3fp', 'final-surfaces-consonant'],
    ['defective + passive jussive + 3mp', 'دعو', 'passive.present.jussive', '3mp', 'final-surfaces-consonant'],
    ['defective-waw + passive past + 3ms', 'دعو', 'passive.past', '3ms', 'final-passive-ya'],
    ['defective-yaa + passive past + 3ms', 'رمي', 'passive.past', '3ms', 'final-passive-ya'],
    ['defective + passive past + 1s', 'دعو', 'passive.past', '1s', 'final-passive-ya'],
    ['defective + passive past + 3mp', 'دعو', 'passive.past', '3mp', 'final-passive-uu'],
    ['defective + passive indicative', 'دعو', 'passive.present.indicative', '3ms', 'final-passive-aa'],
    ['defective + passive subjunctive', 'رمي', 'passive.present.subjunctive', '3ms', 'final-passive-aa'],
    ['defective + passive.future', 'رمي', 'passive.future', '3ms', 'final-passive-aa'],
    ['defective + passive jussive', 'دعو', 'passive.present.jussive', '3ms', 'final-drops'],
    ['defective + indicative + 3mp', 'رمي', 'active.present.indicative', '3mp', 'final-surfaces-consonant'],
    ['defective + indicative + 2fs', 'رمي', 'active.present.indicative', '2fs', 'final-surfaces-consonant'],
    ['defective + indicative + 3md', 'رمي', 'active.present.indicative', '3md', 'final-surfaces-consonant'],
    ['defective + subjunctive + 3ms', 'رمي', 'active.present.subjunctive', '3ms', 'final-surfaces-consonant'],
    ['defective-waw + subjunctive + 3ms', 'دعو', 'active.present.subjunctive', '3ms', 'final-surfaces-consonant'],
    ['defective + future + 3ms keeps the long vowel', 'رمي', 'active.future', '3ms', 'final-lengthens-ii'],
    ['defective + passive indicative + 3mp', 'دعو', 'passive.present.indicative', '3mp', 'final-surfaces-consonant'],
    ['defective + passive indicative + 3fp', 'دعو', 'passive.present.indicative', '3fp', 'final-surfaces-consonant'],
    [
      'defective + passive subjunctive + 1p keeps alif maqṣūra',
      'دعو',
      'passive.present.subjunctive',
      '1p',
      'final-passive-aa',
    ],
  ] as const)('%s → %s', (_, root, tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(getVerb(root, 1), tense, pronoun).tenseRoot).toBe(expected)
  })

  test('renderExplanation explains the passive present ending of a defective verb', () => {
    const layers = resolveVerbExplanationLayers(getVerb('دعو', 1), 'passive.present.indicative', '3ms')
    expect(renderExplanation(layers, (key) => key)[1]).toContainEqual({
      text: 'explanation.tense-root.final-passive-aa',
      kind: 'radical',
    })
  })
})

// ── tenseRoot: assimilated ───────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot assimilated', () => {
  test.each([
    ['assimilated + Form I + indicative', 1, 'active.present.indicative', 'initial-drops'],
    ['assimilated + Form I + subjunctive', 1, 'active.present.subjunctive', 'initial-drops'],
    ['assimilated + Form I + jussive', 1, 'active.present.jussive', 'initial-drops'],
    ['assimilated + Form I + future', 1, 'active.future', 'initial-drops'],
    ['assimilated + Form I + past', 1, 'active.past', undefined],
    ['assimilated + Form II + indicative', 2, 'active.present.indicative', undefined],
  ] as const)('%s → %s', (_, form, tense, expected) => {
    expect(resolveVerbExplanationLayers(getVerb('وصل', form), tense, '3ms').tenseRoot).toBe(expected)
  })
})

// ── tenseRoot: combined irregularities ───────────────────────────────────────
// A root can carry two irregular shapes at once (e.g. assimilated + defective). toTenseRoot picks
// one dominant behavior to describe rather than showing nothing, using the same hollow > defective >
// assimilated priority that analyzeRoot already uses to pick the dominant weak letter for these roots.

describe('resolveVerbExplanationLayers tenseRoot combined irregularities', () => {
  test.each([
    ['assimilated + defective root', 'wqy-1', 'active.present.indicative', 'final-lengthens-ii'],
    ['hollow + defective root (no hamza)', 'rwy-1', 'active.past', 'middle-lengthens-aa'],
    ['assimilated + hollow root', 'wyl-1', 'active.past', 'middle-lengthens-aa'],
  ] as const)('%s → %s', (_, verbId, tense, expected) => {
    expect(resolveVerbExplanationLayers(getVerbById(verbId)!, tense, '3ms').tenseRoot).toBe(expected)
  })
})

// ── formRoot: form VIII assimilation by first radical ───────────────────────

describe('resolveVerbExplanationLayers formRoot form VIII assimilation', () => {
  test.each([
    ['Form VIII with ز as first radical', 'زوج', 'assimilation-voicing'],
    ['Form VIII with د as first radical', 'دخل', 'assimilation-complete'],
    ['Form VIII with ص as first radical', 'صبر', 'assimilation-emphasis'],
    ['Form VIII with و as first radical', 'وحد', 'assimilation-weak-initial'],
    ['Form VIII with default infix', 'كتب', undefined],
  ] as const)('%s → %s', (_, root, expected) => {
    const verb = getVerb(root, 8)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms')
    expect(layers.formRoot).toBe(expected)
  })

  test('renderExplanation includes voicing assimilation sentence', () => {
    const layers = resolveVerbExplanationLayers(getVerb('زوج', 8), 'active.past', '3ms')
    const rendered = renderExplanation(layers, (key) => key)
    expect(rendered[0]).toContainEqual({ text: 'explanation.form-root.assimilation-voicing', kind: 'radical' })
  })

  test('renderExplanation explains the Form VIII weak-initial assimilation in prose', () => {
    const layers = resolveVerbExplanationLayers(getVerb('وحد', 8), 'active.past', '3ms')
    const rendered = renderExplanation(layers, (key) => key)
    expect(rendered[0]).toContainEqual({ text: 'explanation.form-root.assimilation-weak-initial', kind: 'radical' })
  })
})

// ── tenseRoot: hamzated ──────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot hamzated', () => {
  test.each([
    ['hamzated + past + 3ms', 'ءمن', 4, 'active.past', '3ms', 'hamza-madda'],
    ['hamzated + past + 2d', 'ءمن', 4, 'active.past', '2d', 'hamza-madda'],
    ['hamzated + indicative', 'ءمن', 4, 'active.present.indicative', '3ms', 'hamza-seat'],
    ['hamzated + passive past', 'ءمن', 4, 'passive.past', '3ms', 'hamza-seat'],
    ['medial hamza keeps the seat rule', 'قرء', 7, 'active.past', '3fd', 'hamza-seat'],
  ] as const)('%s → %s', (_, root, form, tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(getVerb(root, form), tense, pronoun).tenseRoot).toBe(expected)
  })
})

// ── root note: form sensitivity ──────────────────────────────────────────────

describe('renderExplanation root note by form', () => {
  test.each([
    ['hollow root in Form I keeps the hollow root note', 1, '3ms', 'explanation.root.hollow-waw'],
    ['hollow root in Form III renders sound root note', 3, '3ms', 'explanation.root.hollow-sound-form'],
    ['hollow root in Form VI renders sound root note', 6, '1s', 'explanation.root.hollow-sound-form'],
  ] as const)('%s', (_, form, pronoun, text) => {
    const layers = resolveVerbExplanationLayers(getVerb('قول', form), 'active.past', pronoun)
    expect(renderExplanation(layers, (key) => key)[0]).toContainEqual({ text, kind: 'radical' })
  })

  test.each([
    ['doubled root in Form I keeps doubled root note', 1, '3ms', 'explanation.root.doubled'],
    ['doubled root in Form II renders sound root note', 2, '3ms', 'explanation.root.doubled-sound-form'],
    ['doubled root in Form III keeps doubled root note', 3, '3ms', 'explanation.root.doubled'],
    ['doubled root in Form V renders sound root note', 5, '1s', 'explanation.root.doubled-sound-form'],
  ] as const)('%s', (_, form, pronoun, text) => {
    const layers = resolveVerbExplanationLayers(getVerb('مدد', form), 'active.past', pronoun)
    expect(renderExplanation(layers, (key) => key)[0]).toContainEqual({ text, kind: 'radical' })
  })

  test.each([
    ['hollow+defective in Form I keeps both', 'لوي', 1, 'explanation.root.hollow-defective-waw'],
    ['hollow+defective in Form III drops the neutralized hollow', 'لوي', 3, 'explanation.root.defective-yaa'],
    ['hamzated+doubled in Form I keeps both', 'ءسس', 1, 'explanation.root.hamzated-doubled'],
    ['hamzated+doubled in Form II drops the neutralized doubled', 'ءسس', 2, 'explanation.root.hamzated'],
    ['hamzated+hollow in Form III drops the neutralized hollow', 'ءول', 3, 'explanation.root.hamzated'],
    ['hollow+defective in Form IV keeps both', 'حيو', 4, 'explanation.root.hollow-defective-yaa'],
    ['assimilated in Form I keeps the dropping note', 'وصل', 1, 'explanation.root.assimilated'],
    ['assimilated in Form II reports a stable initial waw', 'وصل', 2, 'explanation.root.assimilated-sound-form'],
    ['assimilated in Form IV reports a stable initial waw', 'وصل', 4, 'explanation.root.assimilated-sound-form'],
    ['assimilated in Form X reports a stable initial waw', 'وصل', 10, 'explanation.root.assimilated-sound-form'],
  ] as const)('%s', (_, root, form, expected) => {
    const layers = resolveVerbExplanationLayers(getVerb(root, form), 'active.past', '3ms')
    expect(renderExplanation(layers, (key) => key)[0]).toContainEqual({ text: expected, kind: 'radical' })
  })

  test('assimilated root in Form VIII replaces the Form I note with the infix assimilation', () => {
    const layers = resolveVerbExplanationLayers(getVerb('وحد', 8), 'active.past', '3ms')
    expect(renderExplanation(layers, (key) => key)[0]).toEqual([
      { text: 'explanation.form.8', kind: 'measure' },
      { text: 'explanation.form-root.assimilation-weak-initial', kind: 'radical' },
    ])
  })
})

// ── tenseRoot: geminate ──────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot geminate', () => {
  test.each([
    ['doubled + Form I + past', 1, 'active.past', '3ms', 'geminate-contracts'],
    ['doubled + Form I + indicative', 1, 'active.present.indicative', '3ms', 'geminate-contracts'],
    ['doubled + Form I + jussive', 1, 'active.present.jussive', '3ms', 'geminate-jussive'],
    ['doubled + Form I + imperative', 1, 'active.imperative', '2ms', 'geminate-jussive'],
    ['doubled + Form II + past', 2, 'active.past', '3ms', undefined],
    ['doubled + Form V + past', 5, 'active.past', '3ms', undefined],
    ['doubled + past + 3mp', 1, 'active.past', '3mp', 'geminate-contracts'],
    ['doubled + past + 1s', 1, 'active.past', '1s', 'geminate-separates'],
    ['doubled + past + 2ms', 1, 'active.past', '2ms', 'geminate-separates'],
    ['doubled + past + 3fp', 1, 'active.past', '3fp', 'geminate-separates'],
    ['doubled + indicative + 3mp', 1, 'active.present.indicative', '3mp', 'geminate-contracts'],
    ['doubled + indicative + 2fp', 1, 'active.present.indicative', '2fp', 'geminate-separates'],
    ['doubled + future + 3fp', 1, 'active.future', '3fp', 'geminate-separates'],
    ['doubled + passive past + 1s', 1, 'passive.past', '1s', 'geminate-separates'],
    ['doubled + passive past + 3ms', 1, 'passive.past', '3ms', 'geminate-contracts'],
    ['doubled + passive indicative + 3fp', 1, 'passive.present.indicative', '3fp', 'geminate-separates'],
    ['doubled + jussive + 3mp', 1, 'active.present.jussive', '3mp', 'geminate-contracts'],
    ['doubled + jussive + 2fs', 1, 'active.present.jussive', '2fs', 'geminate-contracts'],
    ['doubled + imperative + 2fs', 1, 'active.imperative', '2fs', 'geminate-contracts'],
    ['doubled + imperative + 2mp', 1, 'active.imperative', '2mp', 'geminate-contracts'],
    ['doubled + jussive + 3fp', 1, 'active.present.jussive', '3fp', 'geminate-separates'],
    ['doubled + imperative + 2fp', 1, 'active.imperative', '2fp', 'geminate-separates'],
  ] as const)('%s → %s', (_, form, tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(getVerb('مدد', form), tense, pronoun).tenseRoot).toBe(expected)
  })
})

// ── pronoun / arabic fields ───────────────────────────────────────────────────

describe('resolveVerbExplanationLayers pronoun and arabic', () => {
  const verb = getVerb('كتب', 1)

  test.each([
    ['pronoun', '2fs', { pronoun: '2fs' }],
    ['arabic', '3ms', { arabic: 'كَتَبَ' }],
  ] as const)('%s field matches resolved value', (_, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(verb, 'active.past', pronoun)).toMatchObject(expected)
  })
})

// ── prefix / suffix extraction ─────────────────────────────────────────────

describe('resolveVerbExplanationLayers prefix and suffix extraction', () => {
  test.each([
    ['past 3ms has no prefix and no suffix (base form)', 1, 'active.past', '3ms', undefined, undefined],
    ['past 1s has suffix only', 1, 'active.past', '1s', undefined, 'ْتُ'],
    ['present indicative 3ms has fatha prefix and damma suffix', 1, 'active.present.indicative', '3ms', 'يَ', 'ُ'],
    [
      'future 3ms collapses seen and person prefix and keeps the indicative suffix',
      1,
      'active.future',
      '3ms',
      'سَيَ',
      'ُ',
    ],
    ['imperative 2ms Form II has no prefix and no suffix', 2, 'active.imperative', '2ms', undefined, undefined],
    ['imperative 2ms Form I has no prefix and no suffix', 1, 'active.imperative', '2ms', undefined, undefined],
    ['imperative 2fs Form II has suffix only', 2, 'active.imperative', '2fs', undefined, 'ِي'],
  ] as const)('%s', (_, form, tense, pronoun, prefix, suffix) => {
    expect(resolveVerbExplanationLayers(getVerb('كتب', form), tense, pronoun)).toMatchObject({
      prefix,
      suffix,
    })
  })
})

// ── elided prefix / suffix extraction ─────────────────────────────────────

describe('resolveVerbExplanationLayers elided extraction', () => {
  const kataba = getVerb('كتب', 1)

  test.each([
    [
      'imperative 2ms surfaces the dropped jussive prefix تَ, no suffix',
      'active.imperative',
      '2ms',
      { elidedPrefix: 'تَ' },
    ],
    ['jussive 3md surfaces the dropped dual noon نِ, no prefix', 'active.present.jussive', '3md', { elidedSuffix: 'نِ' }],
    ['subjunctive 2fs surfaces the dropped noon نَ', 'active.present.subjunctive', '2fs', { elidedSuffix: 'نَ' }],
    ['jussive 3mp surfaces the dropped plural noon نَ', 'active.present.jussive', '3mp', { elidedSuffix: 'نَ' }],
    ['subjunctive 2mp surfaces the dropped plural noon نَ', 'active.present.subjunctive', '2mp', { elidedSuffix: 'نَ' }],
    ['passive jussive 3mp surfaces the dropped plural noon نَ', 'passive.present.jussive', '3mp', { elidedSuffix: 'نَ' }],
    [
      'passive subjunctive 3md surfaces the dropped dual noon نِ',
      'passive.present.subjunctive',
      '3md',
      { elidedSuffix: 'نِ' },
    ],
  ] as const)('%s', (_, tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(kataba, tense, pronoun)).toMatchObject(expected)
  })
})

describe('renderExplanation elision prose', () => {
  const kataba = getVerb('كتب', 1)

  test('imperative 2ms explanation mentions the dropped prefix', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.imperative', '2ms')
    const rendered = renderExplanation(layers, localeT).flat()
    expect(rendered).toContainEqual(expect.objectContaining({ text: expect.stringContaining('prefix') }))
    expect(rendered).toContainEqual(expect.objectContaining({ text: expect.stringContaining('drop') }))
  })

  test('jussive 3md explanation mentions the dropped nūn ending', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.present.jussive', '3md')
    const rendered = renderExplanation(layers, localeT).flat()
    expect(rendered).toContainEqual(expect.objectContaining({ text: expect.stringContaining('nūn') }))
    expect(rendered).toContainEqual(expect.objectContaining({ text: expect.stringContaining('drop') }))
  })

  test.each([
    ['nun-final stem + past 3fp', 'سكن', 'active.past', '3fp'],
    ['nun-final stem + past 1p', 'سكن', 'active.past', '1p'],
    ['nun-final stem + present 2fp', 'سكن', 'active.present.indicative', '2fp'],
  ] as const)('%s explains the merged feminine/plural nūn', (_, root, tense, pronoun) => {
    const layers = resolveVerbExplanationLayers(getVerb(root, 1), tense, pronoun)
    expect(renderExplanation(layers, (key) => key).at(-1)).toContainEqual({
      text: 'explanation.pronoun.assimilated-nun',
      kind: 'elided',
    })
  })

  test.each([
    ['sound stem + past 3fp', 'كتب', 'active.past', '3fp'],
    ['nun-final stem + past 2fp keeps its own tā ending', 'سكن', 'active.past', '2fp'],
  ] as const)('%s renders the suffix sentence alone', (_, root, tense, pronoun) => {
    const layers = resolveVerbExplanationLayers(getVerb(root, 1), tense, pronoun)
    expect(renderExplanation(layers, (key) => key).at(-1)).toEqual([
      { text: 'explanation.pronoun.suffix-only', kind: 'agreement' },
    ])
  })

  test('defective jussive omits the nūn-elision sentence when the elided ending is a final vowel', () => {
    const layers = resolveVerbExplanationLayers(getVerb('ءذي', 5), 'active.present.jussive', '2ms')
    expect(renderExplanation(layers, (key) => key).at(-1)).toEqual([
      { text: 'explanation.pronoun.prefix-only', kind: 'agreement' },
    ])
  })

  test('sound jussive dual still explains the dropped nūn', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.present.jussive', '3md')
    expect(renderExplanation(layers, (key) => key).at(-1)).toEqual([
      { text: 'explanation.pronoun.prefix-and-suffix', kind: 'agreement' },
      { text: 'explanation.pronoun.dropped-suffix', kind: 'elided' },
    ])
  })

  test('imperative 2mp explanation does not repeat dropped-prefix prose', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.imperative', '2mp')
    const rendered = renderExplanation(layers, (key) => key).flat()
    expect(rendered).toContainEqual({ text: 'explanation.pronoun.suffix-only', kind: 'agreement' })
    expect(rendered).not.toContainEqual({ text: 'explanation.pronoun.dropped-prefix', kind: 'elided' })
  })

  test('imperative explanation mentions alif al-wasl', () => {
    const layers = resolveVerbExplanationLayers(getVerb('شكر', 1), 'active.imperative', '2ms')
    const rendered = renderExplanation(layers, localeT).flat()
    expect(rendered).toContainEqual(expect.objectContaining({ text: expect.stringContaining('alif al-wasl') }))
  })

  test('initial-hamza imperative explanation includes alif al-wasl', () => {
    const layers = resolveVerbExplanationLayers(getVerb('ءجر', 1), 'active.imperative', '2ms')
    const rendered = renderExplanation(layers, localeT).flat()
    expect(rendered).toContainEqual(expect.objectContaining({ text: expect.stringContaining('alif al-wasl') }))
  })

  test('form IV imperative explanation omits alif al-wasl', () => {
    const layers = resolveVerbExplanationLayers(getVerbById('bqy-4')!, 'active.imperative', '2ms')
    const rendered = renderExplanation(layers, localeT).flat()
    expect(rendered).not.toContainEqual(expect.objectContaining({ text: expect.stringContaining('alif al-wasl') }))
  })
})

describe('renderExplanation', () => {
  // Stub t() that echoes the key so we can assert key structure without locale files
  const t = (key: string) => key
  const sentences = (layers: ExplanationLayers) => renderExplanation(layers, t).flat()

  function testExplanationLayers(overrides?: Partial<VerbExplanationLayers>): VerbExplanationLayers {
    return {
      category: 'verb',
      paradigmRoots: ['ق', 'و', 'ل'],
      paradigmForm: 1,
      form: '1-action',
      arabic: 'قَالَ',
      rootType: ['hollow'],
      weakLetter: 'waw',
      vowels: 'a-u',
      tense: 'active.past',
      pronoun: '3ms',
      ...overrides,
    }
  }

  test('includes root sentence', () => {
    expect(sentences(testExplanationLayers({ rootType: [], weakLetter: undefined }))).toContainEqual({
      text: 'explanation.root.sound',
      kind: 'radical',
    })
  })

  test('leads the first paragraph with the formIPattern, then the form, then the root', () => {
    expect(
      renderExplanation(
        testExplanationLayers({ form: '1-action', rootType: [], weakLetter: undefined, vowels: 'a-u' }),
        t,
      ),
    ).toEqual([
      [
        { text: 'explanation.form-i-pattern.a-u', kind: 'measure' },
        { text: 'explanation.form.1-action', kind: 'measure' },
        { text: 'explanation.root.sound', kind: 'radical' },
      ],
      [
        { text: 'explanation.tense.active.past', kind: 'measure' },
        { text: 'explanation.tense.active.past.form-i', kind: 'measure' },
      ],
    ])
  })

  test('includes form description in first paragraph for non-form-I', () => {
    expect(renderExplanation(testExplanationLayers({ form: '3' }), t)[0]).toContainEqual({
      text: 'explanation.form.3',
      kind: 'measure',
    })
  })

  test('form I past tense paragraph keeps the citation sentence to the citation cell', () => {
    const layers = resolveVerbExplanationLayers(getVerb('كتب', 1), 'active.past', '3mp')
    expect(renderExplanation(layers, t)[1]).toEqual([{ text: 'explanation.tense.active.past', kind: 'measure' }])
  })

  test('includes form-i past pattern sentence for form I active.past', () => {
    expect(sentences(testExplanationLayers({ vowels: 'a-u', tense: 'active.past' }))).toContainEqual({
      text: 'explanation.tense.active.past.form-i',
      kind: 'measure',
    })
  })

  test('tags imperative elision sentence as elided', () => {
    expect(sentences(testExplanationLayers({ tense: 'active.imperative', pronoun: '2ms' }))).toContainEqual({
      text: 'explanation.tense.active.imperative.elision',
      kind: 'elided',
    })
  })

  test('tags imperative support-vowel sentence as measure', () => {
    expect(sentences(testExplanationLayers({ tense: 'active.imperative', pronoun: '2ms' }))).toContainEqual({
      text: 'explanation.tense.active.imperative.support',
      kind: 'measure',
    })
  })

  test('includes imperative support sentence for initial-hamza Form I roots', () => {
    expect(
      sentences({
        ...testExplanationLayers({ tense: 'active.imperative', pronoun: '2ms' }),
        paradigmRoots: ['ء', 'ج', 'ر'],
      }),
    ).toContainEqual({
      text: 'explanation.tense.active.imperative.support',
      kind: 'measure',
    })
  })

  test('contracted imperative tense paragraph contains only elision', () => {
    const layers = {
      ...testExplanationLayers({ tense: 'active.imperative', pronoun: '2ms' }),
      contractedImperative: true,
    }
    const [, tenseParagraph] = renderExplanation(layers, t)
    expect(tenseParagraph).toEqual([{ text: 'explanation.tense.active.imperative.elision', kind: 'elided' }])
  })

  test('omits imperative support sentence for form IV', () => {
    expect(
      sentences({
        ...testExplanationLayers({ tense: 'active.imperative', pronoun: '2ms' }),
        paradigmForm: 4,
      }),
    ).not.toContainEqual({
      text: 'explanation.tense.active.imperative.support',
      kind: 'agreement',
    })
  })

  test.each([
    [2 as const, '2' as const],
    [3 as const, '3' as const],
    [5 as const, '5' as const],
    [6 as const, '6' as const],
  ])('imperative tense paragraph for form %d contains only elision', (paradigmForm, form) => {
    const [, tenseParagraph] = renderExplanation(
      { ...testExplanationLayers({ tense: 'active.imperative', pronoun: '2ms' }), paradigmForm, form },
      t,
    )
    expect(tenseParagraph).toEqual([{ text: 'explanation.tense.active.imperative.elision', kind: 'elided' }])
  })

  test('imperative tense paragraph for form 7 includes support sentence', () => {
    const [, tenseParagraph] = renderExplanation(
      { ...testExplanationLayers({ tense: 'active.imperative', pronoun: '2ms' }), paradigmForm: 7, form: '7' },
      t,
    )
    expect(tenseParagraph).toContainEqual({ text: 'explanation.tense.active.imperative.support', kind: 'measure' })
  })

  test.each<VerbTense>([
    'passive.past',
    'passive.present.indicative',
    'passive.present.subjunctive',
    'passive.present.jussive',
    'passive.future',
  ])('includes %s tense sentence', (tense) => {
    expect(sentences(testExplanationLayers({ tense }))).toContainEqual({
      text: `explanation.voice.${tense}`,
      kind: 'measure',
    })
  })

  test('passive.past tense paragraph contains only the voice sentence', () => {
    const [, tenseParagraph] = renderExplanation(testExplanationLayers({ tense: 'passive.past', pronoun: '3ms' }), t)
    expect(tenseParagraph).toEqual([{ text: 'explanation.voice.passive.past', kind: 'measure' }])
  })

  test('includes tenseRoot sentence when non-null', () => {
    expect(
      sentences({
        category: 'verb',
        paradigmRoots: ['ق', 'و', 'ل'],
        paradigmForm: 1,
        form: '1-action',
        arabic: 'قَالَ',
        rootType: ['hollow'],
        weakLetter: 'waw',
        vowels: 'a-u',
        tense: 'active.past',
        tenseRoot: 'middle-lengthens-aa',
        pronoun: '3ms',
      }),
    ).toContainEqual({ text: 'explanation.tense-root.middle-lengthens-aa', kind: 'radical' })
  })

  test('groups root and formRoot in first paragraph', () => {
    expect(
      renderExplanation(
        {
          category: 'verb',
          paradigmRoots: ['ز', 'و', 'ج'],
          paradigmForm: 8,
          form: '8',
          arabic: 'اِزْدَوَجَ',
          rootType: ['hollow'],
          weakLetter: 'waw',
          formRoot: 'assimilation-voicing',
          tense: 'active.past',
          pronoun: '3ms',
        },
        t,
      ),
    ).toEqual([
      [
        { text: 'explanation.form.8', kind: 'measure' },
        { text: 'explanation.root.hollow-waw', kind: 'radical' },
        { text: 'explanation.form-root.assimilation-voicing', kind: 'radical' },
      ],
      [{ text: 'explanation.tense.active.past', kind: 'measure' }],
      [{ text: 'explanation.pronoun.base-form', kind: 'agreement' }],
    ])
  })

  test('active.past form-i base pattern renders past form for u-u pattern', () => {
    const verb = getVerbById('kbr-1')! // كَبُرَ, u-u
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms')
    const result = renderExplanation(layers, localeT)
    expect(result[1]).toContainEqual(expect.objectContaining({ text: expect.stringContaining('كَبُرَ') }))
  })

  test('active.past form-i base pattern renders ḍamma for u-u pattern', () => {
    const verb = getVerbById('kbr-1')! // كَبُرَ, u-u
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms')
    const result = renderExplanation(layers, localeT)
    expect(result[1]).toContainEqual(expect.objectContaining({ text: expect.stringContaining('ḍamma') }))
  })

  test('active.past form-i base pattern renders past form for a-u pattern', () => {
    const verb = getVerb('كتب', 1) // كَتَبَ, a-u
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms')
    const result = renderExplanation(layers, localeT)
    expect(result[1]).toContainEqual(expect.objectContaining({ text: expect.stringContaining('كَتَبَ') }))
  })

  test('active.past form-i base pattern renders past form for i-a pattern', () => {
    const verb = getVerbById('Elm-1')! // عَلِمَ, i-a, sound root
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms')
    const result = renderExplanation(layers, localeT)
    expect(result[1]).toContainEqual(expect.objectContaining({ text: expect.stringContaining('عَلِمَ') }))
  })
})

// ── renderExplanation: paragraph 3 template selection ─────────────────────

describe('renderExplanation paragraph 3 template selection', () => {
  const t = (key: string) => key
  const kataba = getVerb('كتب', 1)

  test('past 3ms renders base-form template', () => {
    const layers = resolveVerbExplanationLayers(getVerb('كتب', 2), 'active.past', '3ms')
    expect(renderExplanation(layers, t)[2]).toContainEqual({ text: 'explanation.pronoun.base-form', kind: 'agreement' })
  })

  test('form I past 3ms leaves the base form to the citation sentence', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.past', '3ms')
    expect(renderExplanation(layers, t)[2]).toBeUndefined()
  })

  test('past 1s renders suffix-only template', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.past', '1s')
    expect(renderExplanation(layers, t)[2]).toContainEqual({
      text: 'explanation.pronoun.suffix-only',
      kind: 'agreement',
    })
  })

  test('present indicative 1s renders prefix-and-suffix template', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.present.indicative', '1s')
    expect(renderExplanation(layers, t)[2]).toContainEqual({
      text: 'explanation.pronoun.prefix-and-suffix',
      kind: 'agreement',
    })
  })

  test('present indicative 3ms renders prefix-and-suffix template', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.present.indicative', '3ms')
    expect(renderExplanation(layers, t)[2]).toContainEqual({
      text: 'explanation.pronoun.prefix-and-suffix',
      kind: 'agreement',
    })
  })

  test('future 3ms renders prefix-and-suffix template', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.future', '3ms')
    expect(renderExplanation(layers, t)[2]).toContainEqual({
      text: 'explanation.pronoun.prefix-and-suffix',
      kind: 'agreement',
    })
  })

  test('past 1s paragraph 3 contains tatweel-prefixed suffix', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.past', '1s')
    const result = renderExplanation(layers, localeT)
    expect(result[2]).toContainEqual(expect.objectContaining({ text: expect.stringContaining('ـْتُ') }))
  })

  test('present indicative 1s paragraph 3 contains tatweel-suffixed prefix and tatweel-prefixed suffix', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.present.indicative', '1s')
    const result = renderExplanation(layers, localeT)
    expect(result[2]).toContainEqual(expect.objectContaining({ text: expect.stringContaining('أَـ') }))
    expect(result[2]).toContainEqual(expect.objectContaining({ text: expect.stringContaining('ـُ') }))
  })

  test('future 3ms paragraph 3 contains collapsed tatweel-suffixed prefix', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.future', '3ms')
    const result = renderExplanation(layers, localeT)
    expect(result[2]).toContainEqual(expect.objectContaining({ text: expect.stringContaining('سَيَـ') }))
  })

  test('Form III active present indicative 2fp contains damma prefix', () => {
    const verb = getVerb('كتب', 3)
    const layers = resolveVerbExplanationLayers(verb, 'active.present.indicative', '2fp')
    const result = renderExplanation(layers, localeT)
    expect(result[2]).toContainEqual(expect.objectContaining({ text: expect.stringContaining('تُـ') }))
  })

  test('Form I active present indicative 2fp contains fatha prefix', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.present.indicative', '2fp')
    const result = renderExplanation(layers, localeT)
    expect(result[2]).toContainEqual(expect.objectContaining({ text: expect.stringContaining('تَـ') }))
  })
})

// ── resolveNominalExplanationLayers ───────────────────────────────────────────

describe('resolveNominalExplanationLayers', () => {
  const verb = getVerb('كتب', 1)

  test('returns correct rootLetters', () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.paradigmRoots).toEqual(['ك', 'ت', 'ب'])
  })

  test('returns form number', () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.form).toBe('1-action')
  })

  test('returns nominal kind', () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.nominal).toBe('activeParticiple')
  })

  test('returns rootType [] for sound root', () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.rootType).toEqual([])
  })

  test('returns formIPattern for Form I verb', () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.vowels).toBe('a-u')
  })

  test('formIPattern is undefined for non-Form-I verb', () => {
    const verb2 = getVerb('كتب', 2)
    const layers = resolveNominalExplanationLayers(verb2, 'activeParticiple', 'مُكَتِّب')
    expect(layers.vowels).toBeUndefined()
  })

  test('arabic field matches passed arabic', () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.arabic).toBe('كَاتِب')
  })

  test('passiveParticiple nominal sets nominal to passiveParticiple', () => {
    const layers = resolveNominalExplanationLayers(verb, 'passiveParticiple', 'مَكْتُوب')
    expect(layers.nominal).toBe('passiveParticiple')
  })

  test('masdar sets nominal to masdar', () => {
    const layers = resolveNominalExplanationLayers(verb, 'masdar', 'كِتَابَة')
    expect(layers.nominal).toBe('masdar')
  })

  test('nominalMimiMasdar is true when selected masdar is mimi', () => {
    const wEd = getVerbById('wEd-1')!
    const layers = resolveNominalExplanationLayers(wEd, 'masdar', 'مَوْعِد')
    expect(layers.isMasdarMimi).toBe(true)
  })

  test('nominalMimiMasdar is false when selected masdar is not mimi', () => {
    const wEd = getVerbById('wEd-1')!
    const layers = resolveNominalExplanationLayers(wEd, 'masdar', 'وَعْد')
    expect(layers.isMasdarMimi).toBe(false)
  })

  test('nominalMimiMasdar is true for default Form I mimi masdar when no explicit masdars are stored', () => {
    const defaultMimi = getVerbById('jwy-1')!
    const layers = resolveNominalExplanationLayers(defaultMimi, 'masdar', 'مَجاي')
    expect(layers.isMasdarMimi).toBe(true)
  })

  test('activeParticipleKind is "lexical" for a lexical active participle in a non-فَعِيل pattern', () => {
    const zrq = getVerbById('zrq-1-i-a')!
    const layers = resolveNominalExplanationLayers(zrq, 'activeParticiple', 'أَزْرَق')
    expect(layers.activeParticipleKind).toBe('lexical')
  })

  test('activeParticipleKind is "faa3il" for a regularly derived verb', () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.activeParticipleKind).toBe('faa3il')
  })

  test('activeParticipleKind is "fa3iil" for a lexical active participle following the فَعِيل pattern', () => {
    const sEd = getVerbById('sEd-1')!
    const layers = resolveNominalExplanationLayers(sEd, 'activeParticiple', 'سَعِيد')
    expect(layers.activeParticipleKind).toBe('fa3iil')
  })
})

// ── renderExplanation: nominal ────────────────────────────────────────────────

describe('renderExplanation with nominal', () => {
  const t = (key: string) => key

  test('nominal activeParticiple appears in second paragraph', () => {
    const layers: ExplanationLayers = {
      category: 'nominal',
      paradigmRoots: ['ك', 'ت', 'ب'],
      paradigmForm: 1,
      form: '1-action',
      arabic: 'كَاتِب',
      rootType: [],
      nominal: 'activeParticiple',
      activeParticipleKind: 'faa3il',
    }
    expect(renderExplanation(layers, t)).toEqual([
      [
        { text: 'explanation.form.1-action', kind: 'measure' },
        { text: 'explanation.root.sound', kind: 'radical' },
      ],
      [{ text: 'explanation.nominal.activeParticiple', kind: 'measure' }],
    ])
  })

  test('lexical active participle explanation appears when activeParticipleKind is "lexical"', () => {
    const layers: ExplanationLayers = {
      category: 'nominal',
      paradigmRoots: ['ز', 'ر', 'ق'],
      paradigmForm: 1,
      form: '1-intermediate',
      arabic: 'أَزْرَق',
      rootType: [],
      nominal: 'activeParticiple',
      activeParticipleKind: 'lexical',
    }
    expect(renderExplanation(layers, t)).toEqual([
      [
        { text: 'explanation.form.1-intermediate', kind: 'measure' },
        { text: 'explanation.root.sound', kind: 'radical' },
      ],
      [{ text: 'explanation.nominal.activeParticiple.form-i-lexical', kind: 'measure' }],
    ])
  })

  test('fa3iil active participle explanation appears when activeParticipleKind is "fa3iil"', () => {
    const layers: ExplanationLayers = {
      category: 'nominal',
      paradigmRoots: ['س', 'ع', 'د'],
      paradigmForm: 1,
      form: '1-intermediate',
      arabic: 'سَعِيد',
      rootType: [],
      nominal: 'activeParticiple',
      activeParticipleKind: 'fa3iil',
    }
    expect(renderExplanation(layers, t)).toEqual([
      [
        { text: 'explanation.form.1-intermediate', kind: 'measure' },
        { text: 'explanation.root.sound', kind: 'radical' },
      ],
      [{ text: 'explanation.nominal.activeParticiple.form-i-fa3iil', kind: 'measure' }],
    ])
  })

  test('nominal passiveParticiple appears in second paragraph', () => {
    const layers: ExplanationLayers = {
      category: 'nominal',
      paradigmRoots: ['ك', 'ت', 'ب'],
      paradigmForm: 1,
      form: '1-action',
      arabic: 'مَكْتُوب',
      rootType: [],
      nominal: 'passiveParticiple',
    }
    expect(renderExplanation(layers, t)).toEqual([
      [
        { text: 'explanation.form.1-action', kind: 'measure' },
        { text: 'explanation.root.sound', kind: 'radical' },
      ],
      [{ text: 'explanation.nominal.passiveParticiple', kind: 'measure' }],
    ])
  })

  test('nominal masdar appears in second paragraph', () => {
    const layers: ExplanationLayers = {
      category: 'nominal',
      paradigmRoots: ['ك', 'ت', 'ب'],
      paradigmForm: 1,
      form: '1-action',
      arabic: 'كِتَابَة',
      rootType: [],
      nominal: 'masdar',
      isMasdarMimi: false,
    }
    expect(renderExplanation(layers, t)).toEqual([
      [
        { text: 'explanation.form.1-action', kind: 'measure' },
        { text: 'explanation.root.sound', kind: 'radical' },
      ],
      [{ text: 'explanation.nominal.masdar.form-i', kind: 'measure' }],
    ])
  })

  test('mimi masdar explanation appears when nominalMimiMasdar is true', () => {
    const layers: ExplanationLayers = {
      category: 'nominal',
      paradigmRoots: ['و', 'ع', 'د'],
      paradigmForm: 1,
      form: '1-action',
      arabic: ['وَعْد', 'مَوْعِد'],
      rootType: ['assimilated'],
      nominal: 'masdar',
      isMasdarMimi: true,
      masdarPattern: 'مَفْعِل',
    }
    expect(renderExplanation(layers, t)).toEqual([
      [
        { text: 'explanation.form.1-action', kind: 'measure' },
        { text: 'explanation.root.assimilated', kind: 'radical' },
      ],
      [{ text: 'explanation.nominal.masdar.form-i-mimi', kind: 'measure' }],
    ])
  })

  test('nominal with formIPattern includes pattern in first paragraph', () => {
    const layers: ExplanationLayers = {
      category: 'nominal',
      paradigmRoots: ['ك', 'ت', 'ب'],
      paradigmForm: 1,
      form: '1-action',
      arabic: 'كَاتِب',
      rootType: [],
      vowels: 'a-u',
      nominal: 'activeParticiple',
      activeParticipleKind: 'faa3il',
    }
    expect(renderExplanation(layers, t)[0]).toContainEqual({ text: 'explanation.form-i-pattern.a-u', kind: 'measure' })
  })

  test('nominal does not produce a pronoun paragraph', () => {
    const layers: ExplanationLayers = {
      category: 'nominal',
      paradigmRoots: ['ك', 'ت', 'ب'],
      paradigmForm: 1,
      form: '1-action',
      arabic: 'كَاتِب',
      rootType: [],
      nominal: 'activeParticiple',
      activeParticipleKind: 'faa3il',
    }
    expect(renderExplanation(layers, t)).toHaveLength(2)
  })

  test('localized Form II masdar explanation names applied pattern', () => {
    const [masdar] = deriveMasdar(getVerb('كتب', 2))

    const rendered = renderExplanation(
      resolveNominalExplanationLayers(getVerb('كتب', 2), 'masdar', masdar),
      localeT,
    ).flat()

    expect(rendered).toContainEqual(expect.objectContaining({ text: expect.stringContaining('تَفْعِيل') }))
  })

  test('localized Form I lexical masdar explanation says it must be memorized', () => {
    const [masdar] = deriveMasdar(getVerb('كتب', 1))

    const rendered = renderExplanation(resolveNominalExplanationLayers(getVerb('كتب', 1), 'masdar', masdar), localeT)

    expect(rendered.flat()).toContainEqual(
      expect.objectContaining({
        text: expect.stringContaining('memorize'),
        kind: 'measure',
      }),
    )
  })

  test('localized Form I mimi masdar explanation names mimi pattern', () => {
    const [, mimiMasdar] = deriveMasdar(getVerb('وعد', 1))

    const rendered = renderExplanation(
      resolveNominalExplanationLayers(getVerb('وعد', 1), 'masdar', mimiMasdar),
      localeT,
    ).flat()

    expect(rendered).toContainEqual(expect.objectContaining({ text: expect.stringContaining('مَفْعِل') }))
    expect(rendered).toContainEqual(expect.objectContaining({ text: expect.stringContaining('mīmī') }))
  })

  test('localized non-Form I masdar explanation says it must be memorized without naming pattern', () => {
    const [masdar] = deriveMasdar(getVerb('كتب', 1))

    const rendered = renderExplanation(
      resolveNominalExplanationLayers(getVerb('كتب', 2), 'masdar', masdar),
      localeT,
    ).flat()

    expect(rendered).toContainEqual(expect.objectContaining({ text: expect.stringContaining('تَفْعِيل') }))
  })

  test('BQI masdar explanation uses 1q-bd key distinct from generic Iq', () => {
    const bqi = getVerbById('zlzl-1')!
    const [masdar] = deriveMasdar(bqi)
    const rendered = renderExplanation(resolveNominalExplanationLayers(bqi, 'masdar', masdar), localeT).flat()
    expect(rendered).toContainEqual(expect.objectContaining({ text: expect.stringContaining('فَعْلَلَة') }))
  })

  test('BQI masdar key in renderExplanation is explanation.nominal.masdar.1q-bd not 1q', () => {
    const t = (key: string) => key
    const bqi = getVerbById('zlzl-1')!
    const [masdar] = deriveMasdar(bqi)
    expect(renderExplanation(resolveNominalExplanationLayers(bqi, 'masdar', masdar), t).flat()).toContainEqual({
      text: 'explanation.nominal.masdar.1q-bd',
      kind: 'measure',
    })
  })
})
