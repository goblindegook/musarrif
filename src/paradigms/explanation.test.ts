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
    ['كتب', { rootType: ['sound'] }],
    ['قول', { rootType: ['hollow'], weakLetter: 'waw' }],
    ['بيع', { rootType: ['hollow'], weakLetter: 'yaa' }],
    ['دعو', { rootType: ['defective'], weakLetter: 'waw' }],
    ['رمي', { rootType: ['defective'], weakLetter: 'yaa' }],
    ['وصل', { rootType: ['assimilated'] }],
    ['مدد', { rootType: ['sound', 'doubled'] }],
  ] as const)('%s resolves root metadata', (root, expected) => {
    const verb = getVerb(root, 1)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms')
    expect(layers).toMatchObject(expected)
  })
})

// ── formIPattern ─────────────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers formIPattern', () => {
  test.each([
    [1, { vowels: 'a-u', pastForm: 'كَتَبَ', presentForm: 'يَكْتُبُ' }],
    [2, { vowels: undefined, pastForm: undefined, presentForm: undefined }],
  ] as const)('Form %d resolves Form I citation metadata', (form, expected) => {
    const verb = getVerb('كتب', form)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms')
    expect(layers).toMatchObject(expected)
  })

  test.each([['كَتَبَ'], ['يَكْتُبُ']] as const)('form-i-pattern sentence contains citation %s', (expected) => {
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
    ['active.past', '3ms'],
    ['active.present.indicative', '3ms'],
    ['active.present.jussive', '3ms'],
    ['active.imperative', '2ms'],
    ['passive.past', '3ms'],
    ['passive.present.jussive', '3ms'],
  ] as const)('%s + %s resolves tense', (tense, pronoun) => {
    expect(resolveVerbExplanationLayers(verb, tense, pronoun).tense).toBe(tense)
  })
})

// ── tenseRoot: hollow ────────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot hollow', () => {
  test.each([
    [2, 'active.present.indicative', '3ms', undefined],
    [2, 'active.past', '3ms', undefined],
    [3, 'active.present.indicative', '3ms', undefined],
    [3, 'active.past', '3ms', undefined],
    [4, 'active.present.indicative', '3ms', 'middle-lengthens-ii-derived'],
    [4, 'passive.present.indicative', '3ms', 'middle-passive-aa'],
    [4, 'active.past', '3ms', 'middle-lengthens-aa'],
    [4, 'active.present.subjunctive', '3ms', 'middle-lengthens-ii-derived'],
    [5, 'active.past', '3ms', undefined],
    [6, 'passive.present.indicative', '3ms', undefined],
    [6, 'active.past', '1s', undefined],
    [7, 'active.present.indicative', '3ms', 'middle-lengthens-aa-present'],
    [8, 'active.present.indicative', '3ms', 'middle-lengthens-aa-present'],
    [8, 'passive.past', '3ms', 'middle-passive-ii'],
    [10, 'active.future', '3ms', 'middle-lengthens-ii-derived'],
    [10, 'active.present.indicative', '3ms', 'middle-lengthens-ii-derived'],
    [1, 'active.future', '3fp', 'middle-shortens-consonant'],
    [1, 'active.imperative', '2fs', 'middle-lengthens-uu'],
    [1, 'active.imperative', '2ms', 'middle-shortens'],
    [1, 'active.present.indicative', '3fp', 'middle-shortens-consonant'],
    [1, 'active.present.indicative', '3mp', 'middle-lengthens-uu'],
    [1, 'active.present.indicative', '3ms', 'middle-lengthens-uu'],
    [1, 'active.present.jussive', '3mp', 'middle-lengthens-uu'],
    [1, 'active.present.jussive', '3ms', 'middle-shortens'],
    [1, 'passive.present.indicative', '3fp', 'middle-shortens-consonant'],
    [1, 'passive.present.indicative', '3ms', 'middle-passive-aa'],
    [1, 'passive.present.jussive', '3mp', 'middle-passive-aa'],
    [1, 'passive.present.jussive', '3ms', 'middle-shortens'],
    [1, 'passive.past', '1s', 'middle-shortens-consonant'],
    [1, 'passive.past', '3ms', 'middle-passive-ii'],
    [1, 'active.past', '2fs', 'middle-shortens-consonant'],
    [1, 'active.past', '3ms', 'middle-lengthens-aa'],
    [1, 'active.present.subjunctive', '2fp', 'middle-shortens-consonant'],
  ] as const)('hollow-waw + Form %d + %s + %s -> %s', (form, tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(getVerb('قول', form), tense, pronoun).tenseRoot).toBe(expected)
  })

  test.each([
    [1, 'active.past', '3ms', 'middle-lengthens-aa'],
    [4, 'active.present.indicative', '3ms', 'middle-lengthens-ii-derived'],
    [8, 'active.present.indicative', '3ms', 'middle-lengthens-aa-present'],
  ] as const)('hollow-yaa + Form %d + %s + %s -> %s', (form, tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(getVerb('بيع', form), tense, pronoun).tenseRoot).toBe(expected)
  })

  test.each([
    ['zwj-8', 'active.past', '3ms', undefined],
    ['zwj-8', 'active.present.indicative', '3ms', undefined],
    ['zwj-8', 'passive.past', '3ms', undefined],
    ['zyd-8', 'active.past', '3ms', 'middle-lengthens-aa'],
    ['zyd-8', 'active.present.indicative', '3ms', 'middle-lengthens-aa-present'],
  ] as const)('Form VIII %s %s %s -> %s', (id, tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(getVerbById(id)!, tense, pronoun).tenseRoot).toBe(expected)
  })

  test.each([
    ['active.past', '3ms'],
    ['active.present.indicative', '3ms'],
    ['active.present.jussive', '3ms'],
  ] as const)('hollow Form IX %s %s has no middle-vowel change', (tense, pronoun) => {
    expect(resolveVerbExplanationLayers(getVerbById('byD-9')!, tense, pronoun).tenseRoot).toBeUndefined()
  })

  test.each([
    ['qwl-1', 'middle-lengthens-uu'],
    ['byE-1', 'middle-lengthens-ii'],
    ['xwf-1', 'middle-lengthens-aa-present'],
    ['nwm-1', 'middle-lengthens-aa-present'],
    ['gyr-1', 'middle-lengthens-aa-present'],
    ['xyl-1', 'middle-lengthens-aa-present'],
  ] as const)('hollow Form I %s active present -> %s', (id, expected) => {
    expect(resolveVerbExplanationLayers(getVerbById(id)!, 'active.present.indicative', '3ms').tenseRoot).toBe(expected)
  })

  test.each([
    ['active.past', '3ms', undefined],
    ['active.past', '1s', undefined],
    ['active.present.indicative', '3ms', undefined],
    ['active.present.jussive', '3ms', undefined],
    ['passive.past', '3ms', undefined],
    ['passive.present.indicative', '3ms', undefined],
  ] as const)('uncontracted hollow + %s + %s -> %s', (tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(getVerbById('Ewz-1')!, tense, pronoun).tenseRoot).toBe(expected)
  })

  test.each([['Ewz-1'], ['xwr-1']])(
    '%s root note describes a lexically uncontracted hollow root, not a plain sound one',
    (id) => {
      const layers = resolveVerbExplanationLayers(getVerbById(id)!, 'active.past', '3ms')
      expect(renderExplanation(layers, (key) => key)[0]).toContainEqual({
        text: 'explanation.root.hollow-uncontracted-waw',
        kind: 'radical',
      })
    },
  )
})

// ── tenseRoot: defective ─────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot defective', () => {
  test.each([
    [1, 'active.past', '3ms', 'final-isolated'],
    [1, 'active.past', '3fs', 'final-elides'],
    [1, 'active.past', '3mp', 'final-resurfaces'],
    [1, 'active.past', '3md', 'final-resurfaces'],
    [1, 'active.past', '3fd', 'final-elides'],
    [1, 'active.past', '1s', 'final-resurfaces'],
    [1, 'active.past', '2ms', 'final-resurfaces'],
    [1, 'active.past', '3fp', 'final-resurfaces'],
    [1, 'active.past', '1p', 'final-resurfaces'],
    [1, 'active.past', '2fs', 'final-resurfaces'],
    [1, 'active.past', '2d', 'final-resurfaces'],
    [1, 'active.past', '2mp', 'final-resurfaces'],
    [1, 'active.past', '2fp', 'final-resurfaces'],
    [1, 'active.present.indicative', '3ms', 'final-lengthens-uu'],
    [1, 'active.present.subjunctive', '3ms', 'final-surfaces-consonant'],
    [1, 'active.present.jussive', '3ms', 'final-drops'],
    [1, 'active.imperative', '2ms', 'final-drops'],
    [1, 'passive.past', '3ms', 'final-passive-ya'],
    [1, 'passive.past', '1s', 'final-passive-ya'],
    [1, 'passive.past', '3mp', 'final-passive-uu'],
    [1, 'passive.present.indicative', '3ms', 'final-passive-aa'],
    [1, 'passive.present.indicative', '3mp', 'final-surfaces-consonant'],
    [1, 'passive.present.indicative', '3fp', 'final-surfaces-consonant'],
    [1, 'passive.present.subjunctive', '1p', 'final-passive-aa'],
    [1, 'passive.present.jussive', '3ms', 'final-drops'],
    [1, 'passive.present.jussive', '3mp', 'final-surfaces-consonant'],
  ] as const)('defective-waw + Form %d + %s + %s -> %s', (form, tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(getVerb('دعو', form), tense, pronoun).tenseRoot).toBe(expected)
  })

  test.each([
    [1, 'active.present.indicative', '3ms', 'final-lengthens-ii'],
    [1, 'active.present.indicative', '3mp', 'final-surfaces-consonant'],
    [1, 'active.present.indicative', '2fs', 'final-surfaces-consonant'],
    [1, 'active.present.indicative', '3md', 'final-surfaces-consonant'],
    [1, 'active.present.subjunctive', '3ms', 'final-surfaces-consonant'],
    [1, 'active.present.jussive', '3mp', 'final-surfaces-consonant'],
    [1, 'active.present.jussive', '2fs', 'final-surfaces-consonant'],
    [1, 'active.present.jussive', '3fp', 'final-surfaces-consonant'],
    [1, 'active.future', '3ms', 'final-lengthens-ii'],
    [1, 'active.imperative', '2mp', 'final-surfaces-consonant'],
    [1, 'passive.past', '3ms', 'final-passive-ya'],
    [1, 'passive.present.subjunctive', '3ms', 'final-passive-aa'],
    [1, 'passive.future', '3ms', 'final-passive-aa'],
  ] as const)('defective-yaa + Form %d + %s + %s -> %s', (form, tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(getVerb('رمي', form), tense, pronoun).tenseRoot).toBe(expected)
  })

  // The bare active present ends the same way the hollow middle lengthens: Form I follows its own
  // present vowel (يَدْعُو، يَرْمِي، يَبْقَى) and Forms V and VI always give ـَى (يَتَخَلَّى).
  test.each([
    ['دعو', 1, 'final-lengthens-uu'],
    ['رمي', 1, 'final-lengthens-ii'],
    ['بقي', 1, 'final-lengthens-aa'],
    ['سعي', 1, 'final-lengthens-aa'],
    ['خلو', 4, 'final-lengthens-ii'],
    ['ندي', 3, 'final-lengthens-ii'],
    ['خلو', 5, 'final-lengthens-aa'],
    ['عفو', 6, 'final-lengthens-aa'],
  ] as const)('defective %s Form %d bare active present -> %s', (root, form, expected) => {
    expect(resolveVerbExplanationLayers(getVerb(root, form), 'active.present.indicative', '3ms').tenseRoot).toBe(
      expected,
    )
  })

  test('renderExplanation explains the passive present ending of a defective verb', () => {
    const layers = resolveVerbExplanationLayers(getVerb('دعو', 1), 'passive.present.indicative', '3ms')
    expect(renderExplanation(layers, (key) => key)[1]).toContainEqual({
      text: 'explanation.tense-root.final-passive-aa',
      kind: 'radical',
    })
  })
})

describe('resolveVerbExplanationLayers laysa', () => {
  const laysa = getVerb('ليس', 1)

  test.each([
    ['active.past', '3ms'],
    ['active.past', '1s'],
    ['active.past', '3fp'],
  ] as const)('%s %s claims no Form I vowel class or hollow contraction', (tense, pronoun) => {
    expect(resolveVerbExplanationLayers(laysa, tense, pronoun)).toMatchObject({
      tenseRoot: undefined,
      vowels: undefined,
      pastForm: undefined,
      presentForm: undefined,
    })
  })

  test('3ms renders the frozen-verb prose in place of the Form I pattern prose', () => {
    expect(renderExplanation(resolveVerbExplanationLayers(laysa, 'active.past', '3ms'), (key) => key)).toEqual([
      [
        { text: 'explanation.laysa.frozen', kind: 'measure' },
        { text: 'explanation.laysa.radical', kind: 'radical' },
      ],
      [{ text: 'explanation.laysa.meaning', kind: 'measure' }],
    ])
  })

  test('1s keeps its own affix sentence after the frozen-verb prose', () => {
    expect(renderExplanation(resolveVerbExplanationLayers(laysa, 'active.past', '1s'), (key) => key).at(-1)).toEqual([
      { text: 'explanation.pronoun.suffix-only', kind: 'agreement' },
    ])
  })
})

// ── tenseRoot: assimilated ───────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot assimilated', () => {
  // Only a wāw drops: يَبِسَ keeps its yāʾ right through the present (يَيْبَسُ).
  test.each([
    ['يبس', 'active.present.indicative', undefined],
    ['يسر', 'active.present.indicative', undefined],
    ['يبس', 'active.future', undefined],
    ['وصل', 'active.present.indicative', 'initial-drops'],
  ] as const)('yaa-initial %s %s -> %s', (root, tense, expected) => {
    expect(resolveVerbExplanationLayers(getVerb(root, 1), tense, '3ms').tenseRoot).toBe(expected)
  })

  test.each([
    [1, 'active.present.indicative', 'initial-drops'],
    [1, 'active.present.subjunctive', 'initial-drops'],
    [1, 'active.present.jussive', 'initial-drops'],
    [1, 'active.future', 'initial-drops'],
    [1, 'active.past', undefined],
    [2, 'active.present.indicative', undefined],
  ] as const)('assimilated + Form %d + %s -> %s', (form, tense, expected) => {
    expect(resolveVerbExplanationLayers(getVerb('وصل', form), tense, '3ms').tenseRoot).toBe(expected)
  })

  test.each([
    ['wjz-1', 'initial-retained'],
    ['wvq-1', 'initial-retained'],
    ['wdd-1', 'geminate-contracts'],
  ] as const)('%s keeps its wāw in the present -> %s', (id, expected) => {
    expect(resolveVerbExplanationLayers(getVerbById(id)!, 'active.present.indicative', '3ms').tenseRoot).toBe(expected)
  })
})

// ── tenseRoot: combined irregularities ───────────────────────────────────────
// A root can carry two irregular shapes at once (e.g. assimilated + defective). toTenseRoot picks
// one dominant behavior to describe rather than showing nothing, using the same defective > hollow >
// assimilated priority the conjugation itself follows for these roots.

describe('resolveVerbExplanationLayers tenseRoot combined irregularities', () => {
  test('assimilated + defective root → defective behavior wins over assimilated', () => {
    expect(resolveVerbExplanationLayers(getVerbById('wqy-1')!, 'active.present.indicative', '3ms').tenseRoot).toBe(
      'final-lengthens-ii',
    )
  })

  test.each([
    ['active.past', '3ms', 'final-isolated'],
    ['active.present.indicative', '3ms', 'final-lengthens-ii'],
    ['active.present.jussive', '3ms', 'final-drops'],
  ] as const)('hollow + defective root + %s + %s -> %s', (tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(getVerbById('rwy-1')!, tense, pronoun).tenseRoot).toBe(expected)
  })

  test('assimilated + hollow root → hollow behavior wins over assimilated', () => {
    expect(resolveVerbExplanationLayers(getVerbById('wyl-1')!, 'active.past', '3ms').tenseRoot).toBe(
      'middle-lengthens-aa',
    )
  })

  test('wāw-defective root above Form I builds on yāʾ', () => {
    expect(resolveVerbExplanationLayers(getVerb('خلو', 4), 'active.present.indicative', '3ms').tenseRoot).toBe(
      'final-lengthens-ii',
    )
  })
})

// ── formRoot: form VIII assimilation by first radical ───────────────────────

describe('resolveVerbExplanationLayers formRoot form VIII assimilation', () => {
  test.each([
    ['زوج', 'assimilation-voicing'],
    ['دخل', 'assimilation-complete'],
    ['صبر', 'assimilation-emphasis'],
    ['وحد', 'assimilation-weak-initial'],
    ['أخذ', 'assimilation-hamza-initial'],
    ['كتب', undefined],
  ] as const)('Form VIII root %s -> %s', (root, expected) => {
    const verb = getVerb(root, 8)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms')
    expect(layers.formRoot).toBe(expected)
  })

  test('renderExplanation turns formRoot into its explanation.form-root.<key> sentence', () => {
    const layers = resolveVerbExplanationLayers(getVerb('زوج', 8), 'active.past', '3ms')
    const rendered = renderExplanation(layers, (key) => key)
    expect(rendered[0]).toContainEqual({ text: 'explanation.form-root.assimilation-voicing', kind: 'radical' })
  })
})

// ── tenseRoot: hamzated ──────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot hamzated', () => {
  test.each([
    ['ءمن', 4, 'active.past', '3ms', 'hamza-madda'],
    ['ءمن', 4, 'active.past', '2d', 'hamza-madda'],
    ['ءمن', 4, 'active.present.indicative', '3ms', 'hamza-seat'],
    ['ءمن', 4, 'passive.past', '3ms', 'hamza-seat'],
    ['قرء', 7, 'active.past', '3fd', 'hamza-seat'],
  ] as const)('%s Form %d + %s + %s -> %s', (root, form, tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(getVerb(root, form), tense, pronoun).tenseRoot).toBe(expected)
  })

  test.each([
    ['kl-1', '2ms'],
    ['x*-1', '2fp'],
    ['mr-1', '2ms'],
  ] as const)("'%s imperative %s -> hamza-elides", (id, pronoun) => {
    expect(resolveVerbExplanationLayers(getVerbById(`'${id}`)!, 'active.imperative', pronoun).tenseRoot).toBe(
      'hamza-elides',
    )
  })
})

// ── root note: form sensitivity ──────────────────────────────────────────────

describe('renderExplanation root note by form', () => {
  test.each([
    [1, '3ms', 'explanation.root.hollow-waw'],
    [3, '3ms', 'explanation.root.hollow-sound-form'],
    [6, '1s', 'explanation.root.hollow-sound-form'],
  ] as const)('hollow root Form %d + active.past + %s -> %s', (form, pronoun, text) => {
    const layers = resolveVerbExplanationLayers(getVerb('قول', form), 'active.past', pronoun)
    expect(renderExplanation(layers, (key) => key)[0]).toContainEqual({ text, kind: 'radical' })
  })

  test.each([
    [1, '3ms', 'explanation.root.doubled'],
    [2, '3ms', 'explanation.root.doubled-sound-form'],
    [3, '3ms', 'explanation.root.doubled'],
    [5, '1s', 'explanation.root.doubled-sound-form'],
  ] as const)('doubled root Form %d + active.past + %s -> %s', (form, pronoun, text) => {
    const layers = resolveVerbExplanationLayers(getVerb('مدد', form), 'active.past', pronoun)
    expect(renderExplanation(layers, (key) => key)[0]).toContainEqual({ text, kind: 'radical' })
  })

  test.each([
    ['لوي', 1, 'explanation.root.hollow-defective-waw'],
    ['لوي', 3, 'explanation.root.defective-yaa'],
    ['ءسس', 1, 'explanation.root.hamzated-doubled'],
    ['ءسس', 2, 'explanation.root.hamzated'],
    ['ءول', 3, 'explanation.root.hamzated'],
    ['حيو', 4, 'explanation.root.hollow-defective-yaa'],
    ['وصل', 1, 'explanation.root.assimilated'],
    ['وصل', 2, 'explanation.root.assimilated-sound-form'],
    ['وصل', 4, 'explanation.root.assimilated-sound-form'],
    ['وصل', 10, 'explanation.root.assimilated-sound-form'],
  ] as const)('%s Form %d -> %s', (root, form, expected) => {
    const layers = resolveVerbExplanationLayers(getVerb(root, form), 'active.past', '3ms')
    expect(renderExplanation(layers, (key) => key)[0]).toContainEqual({ text: expected, kind: 'radical' })
  })

  test('form VIII past explains the waṣl alif it opens on', () => {
    const layers = resolveVerbExplanationLayers(getVerb('سلم', 8), 'active.past', '3ms')
    expect(renderExplanation(layers, (key) => key)[0]).toContainEqual({
      text: 'explanation.form.8-wasl',
      kind: 'measure',
    })
  })

  test.each([
    ['active.present.jussive', '3fs'],
    ['active.present.indicative', '1s'],
  ] as const)('form VIII %s %s carries the form sentence alone', (tense, pronoun) => {
    const layers = resolveVerbExplanationLayers(getVerb('كشف', 8), tense, pronoun)
    expect(renderExplanation(layers, (key) => key)[0]).toEqual([
      { text: 'explanation.form.8', kind: 'measure' },
      { text: 'explanation.root.sound', kind: 'radical' },
    ])
  })

  test.each([
    ['وصل', 10, 'و'],
    ['يقظ', 10, 'ي'],
    ['يود', 2, 'ي'],
  ] as const)('assimilated %s in Form %d names its own initial radical %s', (root, form, initialRadical) => {
    const layers = resolveVerbExplanationLayers(getVerb(root, form), 'active.past', '3ms')
    const echoParams = (key: string, params?: Record<string, string>) => `${key}|${params?.initialRadical}`
    expect(renderExplanation(layers, echoParams)[0]).toContainEqual({
      text: `explanation.root.assimilated-sound-form|${initialRadical}`,
      kind: 'radical',
    })
  })

  // A weak radical inside a quadriliteral root is inert, so no cell has a change to describe.
  test.each([
    ['سيطر', 1, 'active.imperative', '2mp'],
    ['كلور', 1, 'passive.present.indicative', '3ms'],
    ['بلور', 2, 'active.present.jussive', '1p'],
    ['وسوس', 1, 'active.present.indicative', '1s'],
  ] as const)('quadriliteral %s Form %d %s %s has no tenseRoot', (root, form, tense, pronoun) => {
    const layers = resolveVerbExplanationLayers(getVerb(root, form), tense, pronoun)
    expect(layers.tenseRoot).toBeUndefined()
    expect(renderExplanation(layers, (key) => key)[0]).toContainEqual({
      text: 'explanation.root.sound',
      kind: 'radical',
    })
  })

  test('assimilated root in Form VIII replaces the Form I note with the infix assimilation', () => {
    const layers = resolveVerbExplanationLayers(getVerb('وحد', 8), 'active.past', '3ms')
    expect(renderExplanation(layers, (key) => key)[0]).toEqual([
      { text: 'explanation.form.8', kind: 'measure' },
      { text: 'explanation.form.8-wasl', kind: 'measure' },
      { text: 'explanation.form-root.assimilation-weak-initial', kind: 'radical' },
    ])
  })
})

// ── paradigms the verb does not have ─────────────────────────────────────────

describe('renderExplanation for a paradigm the verb does not have', () => {
  test.each([
    ['Sfr-9', 'passive.past', '3ms'],
    ['Sfr-9', 'passive.present.indicative', '3fp'],
    ['Hrb-1', 'passive.future', '2mp'],
    ['qsm-6', 'passive.present.jussive', '3mp'],
  ] as const)('%s %s %s renders no explanation at all', (id, tense, pronoun) => {
    const layers = resolveVerbExplanationLayers(getVerbById(id)!, tense, pronoun)
    expect(renderExplanation(layers, (key) => key)).toEqual([])
  })
})

// ── tenseRoot: geminate ──────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot geminate', () => {
  test.each([
    [1, 'active.past', '3ms', 'geminate-contracts'],
    [1, 'active.present.indicative', '3ms', 'geminate-contracts'],
    [1, 'active.present.jussive', '3ms', 'geminate-jussive'],
    [1, 'active.imperative', '2ms', 'geminate-jussive'],
    [2, 'active.past', '3ms', undefined],
    [5, 'active.past', '3ms', undefined],
    [1, 'active.past', '3mp', 'geminate-contracts'],
    [1, 'active.past', '1s', 'geminate-separates'],
    [1, 'active.past', '2ms', 'geminate-separates'],
    [1, 'active.past', '3fp', 'geminate-separates'],
    [1, 'active.present.indicative', '3mp', 'geminate-contracts'],
    [1, 'active.present.indicative', '2fp', 'geminate-separates'],
    [1, 'active.future', '3fp', 'geminate-separates'],
    [1, 'passive.past', '1s', 'geminate-separates'],
    [1, 'passive.past', '3ms', 'geminate-contracts'],
    [1, 'passive.present.indicative', '3fp', 'geminate-separates'],
    [1, 'active.present.jussive', '3mp', 'geminate-contracts'],
    [1, 'active.present.jussive', '2fs', 'geminate-contracts'],
    [1, 'active.imperative', '2fs', 'geminate-contracts'],
    [1, 'active.imperative', '2mp', 'geminate-contracts'],
    [1, 'active.present.jussive', '3fp', 'geminate-separates'],
    [1, 'active.imperative', '2fp', 'geminate-separates'],
  ] as const)('doubled root Form %d + %s + %s -> %s', (form, tense, pronoun, expected) => {
    expect(resolveVerbExplanationLayers(getVerb('مدد', form), tense, pronoun).tenseRoot).toBe(expected)
  })
})

// ── nominalRoot: geminate ────────────────────────────────────────────────────

describe('resolveNominalExplanationLayers nominalRoot', () => {
  test.each([
    [1, 'masdar', 'مَدّ', 'geminate-contracts'],
    [1, 'activeParticiple', 'مَادّ', 'geminate-contracts'],
    [1, 'passiveParticiple', 'مَمْدُود', 'geminate-separates'],
    [8, 'masdar', 'اِمْتِدَاد', 'geminate-separates'],
    [8, 'activeParticiple', 'مُمْتَدّ', 'geminate-contracts'],
    [3, 'masdar', 'مُمَادَّة', 'geminate-contracts'],
    [2, 'masdar', 'تَمْدِيد', undefined],
    [2, 'activeParticiple', 'مُمَدِّد', undefined],
  ] as const)('doubled root Form %d + %s -> %s', (form, nominal, arabic, expected) => {
    expect(resolveNominalExplanationLayers(getVerb('مدد', form), nominal, arabic).nominalRoot).toBe(expected)
  })

  test('sound root has no identical pair to describe', () => {
    expect(resolveNominalExplanationLayers(getVerb('كتب', 1), 'masdar', 'كِتَابَة').nominalRoot).toBeUndefined()
  })

  test('masdar list that splits on the pair describes neither outcome', () => {
    expect(resolveNominalExplanationLayers(getVerb('ضرر', 1), 'masdar', ['ضَرّ', 'ضَرَر']).nominalRoot).toBeUndefined()
  })

  test('renderExplanation puts the nominal geminate sentence in the nominal paragraph', () => {
    const layers = resolveNominalExplanationLayers(getVerb('مدد', 1), 'passiveParticiple', 'مَمْدُود')
    expect(renderExplanation(layers, (key) => key)[1]).toContainEqual({
      text: 'explanation.nominal-root.geminate-separates',
      kind: 'radical',
    })
  })
})

// ── pronoun / arabic fields ───────────────────────────────────────────────────

describe('resolveVerbExplanationLayers pronoun and arabic', () => {
  const verb = getVerb('كتب', 1)

  test.each([
    ['2fs', { pronoun: '2fs' }],
    ['3ms', { arabic: 'كَتَبَ' }],
  ] as const)('active.past + %s matches resolved fields', (pronoun, expected) => {
    expect(resolveVerbExplanationLayers(verb, 'active.past', pronoun)).toMatchObject(expected)
  })
})

// ── prefix / suffix extraction ─────────────────────────────────────────────

describe('resolveVerbExplanationLayers prefix and suffix extraction', () => {
  test.each([
    [1, 'active.past', '3ms', undefined, undefined],
    [1, 'active.past', '1s', undefined, 'ْتُ'],
    [1, 'active.present.indicative', '3ms', 'يَ', 'ُ'],
    [1, 'active.future', '3ms', 'سَيَ', 'ُ'],
    [2, 'active.imperative', '2ms', undefined, undefined],
    [1, 'active.imperative', '2ms', undefined, undefined],
    [2, 'active.imperative', '2fs', undefined, 'ِي'],
  ] as const)('Form %d + %s + %s -> prefix %s, suffix %s', (form, tense, pronoun, prefix, suffix) => {
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
    ['active.imperative', '2ms', { elidedPrefix: 'تَ' }],
    ['active.present.jussive', '3md', { elidedSuffix: 'نِ' }],
    ['active.present.subjunctive', '2fs', { elidedSuffix: 'نَ' }],
    ['active.present.jussive', '3mp', { elidedSuffix: 'نَ' }],
    ['active.present.subjunctive', '2mp', { elidedSuffix: 'نَ' }],
    ['passive.present.jussive', '3mp', { elidedSuffix: 'نَ' }],
    ['passive.present.subjunctive', '3md', { elidedSuffix: 'نِ' }],
  ] as const)('%s + %s resolves elided prefix/suffix', (tense, pronoun, expected) => {
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
    ['سكن', 'active.past', '3fp', 'explanation.pronoun.suffix-only', 'ـنَ'],
    ['سكن', 'active.past', '1p', 'explanation.pronoun.suffix-only', 'ـنَا'],
    ['سكن', 'active.present.indicative', '2fp', 'explanation.pronoun.prefix-and-suffix', 'ـنَ'],
    ['قرء', 'active.present.indicative', '3md', 'explanation.pronoun.prefix-and-suffix', 'ـَانِ'],
    ['قرء', 'active.present.subjunctive', '3fd', 'explanation.pronoun.prefix-and-suffix', 'ـَا'],
    ['قرء', 'active.past', '3md', 'explanation.pronoun.suffix-only', 'ـَا'],
  ] as const)('%s + %s + %s names the whole ending in its %s sentence: %s', (root, tense, pronoun, key, suffix) => {
    const layers = resolveVerbExplanationLayers(getVerb(root, 1), tense, pronoun)
    const echoSuffix = (key: string, params?: Record<string, string>) => `${key}|${params?.suffix}`
    expect(renderExplanation(layers, echoSuffix).at(-1)).toContainEqual({
      text: `${key}|${suffix}`,
      kind: 'agreement',
    })
  })

  test.each([
    ['علي', 4, 'passive.present.indicative', '2fp'],
    ['علي', 4, 'passive.present.indicative', '3fp'],
  ] as const)('%s Form %d %s %s keeps the final radical out of the ending', (root, form, tense, pronoun) => {
    const layers = resolveVerbExplanationLayers(getVerb(root, form), tense, pronoun)
    const echoSuffix = (key: string, params?: Record<string, string>) => `${key}|${params?.suffix}`
    expect(renderExplanation(layers, echoSuffix).at(-1)).toContainEqual({
      text: 'explanation.pronoun.prefix-and-suffix|ـْنَ',
      kind: 'agreement',
    })
  })

  test('form IV madda stem keeps the dual ending it already carries', () => {
    const layers = resolveVerbExplanationLayers(getVerb('ءمن', 4), 'active.past', '3md')
    const echoSuffix = (key: string, params?: Record<string, string>) => `${key}|${params?.suffix}`
    expect(renderExplanation(layers, echoSuffix).at(-1)).toContainEqual({
      text: 'explanation.pronoun.suffix-only|ـَا',
      kind: 'agreement',
    })
  })

  test.each([
    ['سكن', 'active.past', '3fp'],
    ['سكن', 'active.past', '1p'],
    ['سكن', 'active.present.indicative', '2fp'],
  ] as const)('%s + %s + %s explains the merged feminine/plural nūn', (root, tense, pronoun) => {
    const layers = resolveVerbExplanationLayers(getVerb(root, 1), tense, pronoun)
    expect(renderExplanation(layers, (key) => key).at(-1)).toContainEqual({
      text: 'explanation.pronoun.assimilated-nun',
      kind: 'elided',
    })
  })

  test.each([
    ['كتب', 'active.past', '3fp'],
    ['سكن', 'active.past', '2fp'],
  ] as const)('%s + %s + %s renders the suffix sentence alone', (root, tense, pronoun) => {
    const layers = resolveVerbExplanationLayers(getVerb(root, 1), tense, pronoun)
    expect(renderExplanation(layers, (key) => key).at(-1)).toEqual([
      { text: 'explanation.pronoun.suffix-only', kind: 'agreement' },
    ])
  })

  test.each([
    ['1p', 'active.present.indicative'],
    ['1p', 'active.present.subjunctive'],
    ['1p', 'active.future'],
  ] as const)('%s + %s has no nūn-initial ending to merge', (pronoun, tense) => {
    const layers = resolveVerbExplanationLayers(kataba, tense, pronoun)
    expect(renderExplanation(layers, (key) => key).at(-1)).toEqual([
      { text: 'explanation.pronoun.prefix-and-suffix', kind: 'agreement' },
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

  test.each([
    ['2ms', 'geminate-jussive'],
    ['2fs', 'geminate-contracts'],
    ['2d', 'geminate-contracts'],
    ['2mp', 'geminate-contracts'],
  ] as const)('contracted geminate imperative %s explains %s without alif al-wasl', (pronoun, tenseRoot) => {
    const layers = resolveVerbExplanationLayers(getVerb('ذمم', 1), 'active.imperative', pronoun)
    expect(renderExplanation(layers, (key) => key)[1]).toEqual([
      { text: 'explanation.tense.active.imperative.elision', kind: 'elided' },
      { text: `explanation.tense-root.${tenseRoot}`, kind: 'radical' },
    ])
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
    expect(sentences(testExplanationLayers({ rootType: ['sound'], weakLetter: undefined }))).toContainEqual({
      text: 'explanation.root.sound',
      kind: 'radical',
    })
  })

  test('leads the first paragraph with the formIPattern, then the form, then the root', () => {
    expect(
      renderExplanation(
        testExplanationLayers({ form: '1-action', rootType: ['sound'], weakLetter: undefined, vowels: 'a-u' }),
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

  test.each([
    ['اُشْكُرْ', 1],
    ['اُؤْجُرْ', 1],
    ['اِنْقَصَّ', 7],
  ] as const)('imperative %s (form %d) explains its alif al-wasl', (arabic, paradigmForm) => {
    expect(
      sentences(testExplanationLayers({ tense: 'active.imperative', pronoun: '2ms', arabic, paradigmForm })),
    ).toContainEqual({
      text: 'explanation.tense.active.imperative.support',
      kind: 'measure',
    })
  })

  test.each([
    ['ذُمَّ', 1],
    ['أَبْقِ', 4],
    ['سَيْطِرْ', 1],
  ] as const)('imperative %s (form %d) has no alif al-wasl to explain', (arabic, paradigmForm) => {
    const layers = testExplanationLayers({ tense: 'active.imperative', pronoun: '2ms', arabic, paradigmForm })
    const [, tenseParagraph] = renderExplanation(layers, t)
    expect(tenseParagraph).toEqual([{ text: 'explanation.tense.active.imperative.elision', kind: 'elided' }])
  })

  test.each([[2, '2'] as const, [3, '3'] as const, [5, '5'] as const, [6, '6'] as const])(
    'imperative tense paragraph for form %d contains only elision',
    (paradigmForm, form) => {
      const [, tenseParagraph] = renderExplanation(
        { ...testExplanationLayers({ tense: 'active.imperative', pronoun: '2ms' }), paradigmForm, form },
        t,
      )
      expect(tenseParagraph).toEqual([{ text: 'explanation.tense.active.imperative.elision', kind: 'elided' }])
    },
  )

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
        { text: 'explanation.form.8-wasl', kind: 'measure' },
        { text: 'explanation.root.hollow-waw', kind: 'radical' },
        { text: 'explanation.form-root.assimilation-voicing', kind: 'radical' },
      ],
      [{ text: 'explanation.tense.active.past', kind: 'measure' }],
      [{ text: 'explanation.pronoun.base-form', kind: 'agreement' }],
    ])
  })

  test('active.past form-i base pattern renders past form for u-u pattern', () => {
    const verb = getVerbById('kbr-1-u-u')!
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms')
    const result = renderExplanation(layers, localeT)
    expect(result[1]).toContainEqual(expect.objectContaining({ text: expect.stringContaining('كَبُرَ') }))
  })

  test('active.past form-i base pattern renders ḍamma for u-u pattern', () => {
    const verb = getVerbById('kbr-1-u-u')!
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

  test("returns rootType ['sound'] for a sound root", () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.rootType).toEqual(['sound'])
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
      rootType: ['sound'],
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
      rootType: ['sound'],
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
      rootType: ['sound'],
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
      rootType: ['sound'],
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
      rootType: ['sound'],
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
      rootType: ['sound'],
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
      rootType: ['sound'],
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

  test('biliteral quadriliteral masdar explanation names the فَعْلَلَة pattern', () => {
    const bqi = getVerbById('zlzl-1')!
    const [masdar] = deriveMasdar(bqi)
    const rendered = renderExplanation(resolveNominalExplanationLayers(bqi, 'masdar', masdar), localeT).flat()
    expect(rendered).toContainEqual(expect.objectContaining({ text: expect.stringContaining('فَعْلَلَة') }))
  })

  test('biliteral quadriliteral masdar takes the Form Iq key, since reduplication is a root property', () => {
    const t = (key: string) => key
    const bqi = getVerbById('zlzl-1')!
    const [masdar] = deriveMasdar(bqi)
    expect(renderExplanation(resolveNominalExplanationLayers(bqi, 'masdar', masdar), t).flat()).toContainEqual({
      text: 'explanation.nominal.masdar.1q',
      kind: 'measure',
    })
  })
})

describe('renderExplanation biliteral roots', () => {
  const t = (key: string) => key

  test('a reduplicated quadriliteral gets its own root sentence', () => {
    const bqi = getVerbById('zlzl-1')!
    expect(renderExplanation(resolveVerbExplanationLayers(bqi, 'active.past', '3ms'), t).flat()).toContainEqual({
      text: 'explanation.root.biliteral',
      kind: 'radical',
    })
  })

  test('a reduplicated quadriliteral keeps the sound-root note alongside it', () => {
    const bqi = getVerbById('zlzl-1')!
    expect(renderExplanation(resolveVerbExplanationLayers(bqi, 'active.past', '3ms'), t).flat()).toContainEqual({
      text: 'explanation.root.sound',
      kind: 'radical',
    })
  })

  test('a reduplicated quadriliteral takes the Form Iq measure sentence', () => {
    const bqi = getVerbById('zlzl-1')!
    expect(renderExplanation(resolveVerbExplanationLayers(bqi, 'active.past', '3ms'), t).flat()).toContainEqual({
      text: 'explanation.form.1q',
      kind: 'measure',
    })
  })

  test('a plain quadriliteral has no biliteral root sentence', () => {
    const quad = getVerb('عرقل', 1)
    const texts = renderExplanation(resolveVerbExplanationLayers(quad, 'active.past', '3ms'), t)
      .flat()
      .map((sentence) => sentence.text)
    expect(texts.filter((text) => text === 'explanation.root.biliteral')).toEqual([])
  })
})
