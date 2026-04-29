import { describe, expect, test } from 'vitest'
import enLocale from '../locales/en.json'
import type { ExplanationLayers } from './explanation'
import { renderExplanation, resolveNominalExplanationLayers, resolveVerbExplanationLayers } from './explanation'
import type { VerbTense } from './tense'
import { getVerb, getVerbById, synthesizeVerb } from './verbs'

const localeT = (key: string, params?: Record<string, string>): string => {
  const locale = enLocale as { strings: Record<string, string>; roots?: Record<string, string> }
  const template = locale.strings[key] ?? locale.roots?.[key] ?? key
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? `{${k}}`)
}

// ── rootType ──────────────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers rootType', () => {
  test('sound root → rootType sound', () => {
    const verb = getVerb('كتب', 1)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'كَتَبَ')
    expect(layers.rootType).toBe('sound')
  })

  test('hollow-waw root → rootType hollow-waw', () => {
    const verb = getVerb('قول', 1)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'قَالَ')
    expect(layers.rootType).toBe('hollow-waw')
  })

  test('hollow-yaa root → rootType hollow-yaa', () => {
    const verb = getVerb('بيع', 1)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'بَاعَ')
    expect(layers.rootType).toBe('hollow-yaa')
  })

  test('defective-waw root → rootType defective-waw', () => {
    const verb = getVerb('دعو', 1)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'دَعَا')
    expect(layers.rootType).toBe('defective-waw')
  })

  test('defective-yaa root → rootType defective-yaa', () => {
    const verb = getVerb('رمي', 1)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'رَمَى')
    expect(layers.rootType).toBe('defective-yaa')
  })

  test('assimilated root → rootType assimilated', () => {
    const verb = getVerb('وصل', 1)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'وَصَلَ')
    expect(layers.rootType).toBe('assimilated')
  })

  test('doubled root → rootType doubled', () => {
    const verb = getVerb('مدد', 1)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'مَدَّ')
    expect(layers.rootType).toBe('doubled')
  })
})

// ── formIPattern ─────────────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers formIPattern', () => {
  test('Form I verb → formIPattern is verb.formPattern', () => {
    const verb = getVerb('كتب', 1)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'كَتَبَ')
    expect(layers.vowels).toBe('a-u')
  })

  test('Form II verb → formIPattern is undefined', () => {
    const verb = getVerb('كتب', 2)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'كَتَّبَ')
    expect(layers.vowels).toBeUndefined()
  })
})

// ── tenseContext ─────────────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseContext', () => {
  const verb = getVerb('كتب', 1)

  test('active past → tense active.past', () => {
    expect(resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'x').tense).toBe('active.past')
  })

  test('active present indicative → tense active.present.indicative', () => {
    expect(resolveVerbExplanationLayers(verb, 'active.present.indicative', '3ms', 'x').tense).toBe(
      'active.present.indicative',
    )
  })

  test('active present jussive → tense active.present.jussive', () => {
    expect(resolveVerbExplanationLayers(verb, 'active.present.jussive', '3ms', 'x').tense).toBe(
      'active.present.jussive',
    )
  })

  test('active imperative → tense active.imperative', () => {
    expect(resolveVerbExplanationLayers(verb, 'active.imperative', '2ms', 'x').tense).toBe('active.imperative')
  })

  test('passive past → tense passive.past', () => {
    expect(resolveVerbExplanationLayers(verb, 'passive.past', '3ms', 'x').tense).toBe('passive.past')
  })

  test('passive present jussive → tense passive.present.jussive', () => {
    expect(resolveVerbExplanationLayers(verb, 'passive.present.jussive', '3ms', 'x').tense).toBe(
      'passive.present.jussive',
    )
  })
})

// ── tenseRoot: hollow ────────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot hollow', () => {
  const qawl = getVerb('قول', 1) // hollow-waw
  const bay3 = getVerb('بيع', 1) // hollow-yaa

  test('hollow-waw + active.past → middle-lengthens-aa', () => {
    expect(resolveVerbExplanationLayers(qawl, 'active.past', '3ms', 'قَالَ').tenseRoot).toBe('middle-lengthens-aa')
  })

  test('hollow-yaa + active.past → middle-lengthens-ii', () => {
    expect(resolveVerbExplanationLayers(bay3, 'active.past', '3ms', 'بَاعَ').tenseRoot).toBe('middle-lengthens-ii')
  })

  test('hollow-waw + active.present.indicative → middle-lengthens-uu', () => {
    expect(resolveVerbExplanationLayers(qawl, 'active.present.indicative', '3ms', 'يَقُولُ').tenseRoot).toBe(
      'middle-lengthens-uu',
    )
  })

  test('hollow-yaa + active.present.indicative → middle-lengthens-ii', () => {
    expect(resolveVerbExplanationLayers(bay3, 'active.present.indicative', '3ms', 'يَبِيعُ').tenseRoot).toBe(
      'middle-lengthens-ii',
    )
  })

  test('hollow-waw + active.present.jussive → middle-shortens', () => {
    expect(resolveVerbExplanationLayers(qawl, 'active.present.jussive', '3ms', 'يَقُلْ').tenseRoot).toBe('middle-shortens')
  })

  test('hollow + passive.past → middle-passive-ii', () => {
    expect(resolveVerbExplanationLayers(qawl, 'passive.past', '3ms', 'قِيلَ').tenseRoot).toBe('middle-passive-ii')
  })

  test('hollow + passive.present.indicative → middle-passive-aa', () => {
    expect(resolveVerbExplanationLayers(qawl, 'passive.present.indicative', '3ms', 'يُقَالُ').tenseRoot).toBe(
      'middle-passive-aa',
    )
  })

  test('hollow + active.imperative → middle-shortens', () => {
    expect(resolveVerbExplanationLayers(qawl, 'active.imperative', '2ms', 'قُلْ').tenseRoot).toBe('middle-shortens')
  })
})

// ── tenseRoot: defective ─────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot defective', () => {
  const da3a = getVerb('دعو', 1) // defective-waw
  const rama = getVerb('رمي', 1) // defective-yaa

  test('defective + active.past + 3ms → final-isolated', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.past', '3ms', 'دَعَا').tenseRoot).toBe('final-isolated')
  })

  test('defective + active.past + 3fs → final-isolated', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.past', '3fs', 'دَعَتْ').tenseRoot).toBe('final-isolated')
  })

  test('defective + active.past + 3mp → final-isolated', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.past', '3mp', 'دَعَوْا').tenseRoot).toBe('final-isolated')
  })

  test('defective + active.past + 3md → final-isolated', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.past', '3md', 'دَعَوَا').tenseRoot).toBe('final-isolated')
  })

  test('defective + active.past + 3fd → final-isolated', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.past', '3fd', 'دَعَتَا').tenseRoot).toBe('final-isolated')
  })

  test('defective + active.past + 1s → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.past', '1s', 'دَعَوْتُ').tenseRoot).toBe('final-resurfaces')
  })

  test('defective + active.past + 2ms → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.past', '2ms', 'دَعَوْتَ').tenseRoot).toBe('final-resurfaces')
  })

  test('defective + active.past + 3fp → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.past', '3fp', 'دَعَوْنَ').tenseRoot).toBe('final-resurfaces')
  })

  test('defective + active.past + 1p → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.past', '1p', 'دَعَوْنَا').tenseRoot).toBe('final-resurfaces')
  })

  test('defective + active.past + 2fs → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.past', '2fs', 'دَعَوْتِ').tenseRoot).toBe('final-resurfaces')
  })

  test('defective + active.past + 2d → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.past', '2d', 'دَعَوْتُمَا').tenseRoot).toBe('final-resurfaces')
  })

  test('defective + active.past + 2mp → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.past', '2mp', 'دَعَوْتُمْ').tenseRoot).toBe('final-resurfaces')
  })

  test('defective + active.past + 2fp → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.past', '2fp', 'دَعَوْتُنَّ').tenseRoot).toBe('final-resurfaces')
  })

  test('defective-waw + active.present.indicative → final-lengthens-uu', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.present.indicative', '3ms', 'يَدْعُو').tenseRoot).toBe(
      'final-lengthens-uu',
    )
  })

  test('defective-yaa + active.present.indicative → final-lengthens-ii', () => {
    expect(resolveVerbExplanationLayers(rama, 'active.present.indicative', '3ms', 'يَرْمِي').tenseRoot).toBe(
      'final-lengthens-ii',
    )
  })

  test('defective + active.present.jussive → final-drops', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.present.jussive', '3ms', 'يَدْعُ').tenseRoot).toBe('final-drops')
  })

  test('defective + active.imperative → final-drops', () => {
    expect(resolveVerbExplanationLayers(da3a, 'active.imperative', '2ms', 'اُدْعُ').tenseRoot).toBe('final-drops')
  })

  test('defective + passive.past → final-passive', () => {
    expect(resolveVerbExplanationLayers(da3a, 'passive.past', '3ms', 'دُعِيَ').tenseRoot).toBe('final-passive')
  })

  test('defective + passive.present.indicative → final-passive', () => {
    expect(resolveVerbExplanationLayers(da3a, 'passive.present.indicative', '3ms', 'يُدْعَى').tenseRoot).toBe(
      'final-passive',
    )
  })
})

// ── tenseRoot: assimilated ───────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot assimilated', () => {
  const waSala = getVerb('وصل', 1)

  test('assimilated + Form I + active.present.indicative → initial-drops', () => {
    expect(resolveVerbExplanationLayers(waSala, 'active.present.indicative', '3ms', 'يَصِلُ').tenseRoot).toBe(
      'initial-drops',
    )
  })

  test('assimilated + Form I + active.present.subjunctive → initial-drops', () => {
    expect(resolveVerbExplanationLayers(waSala, 'active.present.subjunctive', '3ms', 'يَصِلَ').tenseRoot).toBe(
      'initial-drops',
    )
  })

  test('assimilated + Form I + active.present.jussive → initial-drops', () => {
    expect(resolveVerbExplanationLayers(waSala, 'active.present.jussive', '3ms', 'يَصِلْ').tenseRoot).toBe('initial-drops')
  })

  test('assimilated + Form I + active.past → undefined', () => {
    expect(resolveVerbExplanationLayers(waSala, 'active.past', '3ms', 'وَصَلَ').tenseRoot).toBeUndefined()
  })

  test('assimilated + Form II + active.present.indicative → undefined', () => {
    expect(
      resolveVerbExplanationLayers(getVerb('وصل', 2), 'active.present.indicative', '3ms', 'يُوَصِّلُ').tenseRoot,
    ).toBeUndefined()
  })
})

// ── formRoot: form VIII assimilation by first radical ───────────────────────

describe('resolveVerbExplanationLayers formRoot form VIII assimilation', () => {
  test('Form VIII with ز as first radical → voicing assimilation', () => {
    const verb = synthesizeVerb('زوج', 8)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'اِزْدَوَجَ')
    expect(layers.formRoot).toBe('assimilation-voicing')
  })

  test('Form VIII with د as first radical → complete assimilation', () => {
    const verb = synthesizeVerb('دخل', 8)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'اِدَّخَلَ')
    expect(layers.formRoot).toBe('assimilation-complete')
  })

  test('Form VIII with ص as first radical → emphasis assimilation', () => {
    const verb = synthesizeVerb('صبر', 8)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'اِصْطَبَرَ')
    expect(layers.formRoot).toBe('assimilation-emphasis')
  })

  test('renderExplanation includes voicing assimilation sentence', () => {
    const verb = synthesizeVerb('زوج', 8)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'اِزْدَوَجَ')
    const rendered = renderExplanation(layers, (key) => key)
    expect(rendered[0]).toContain('explanation.form-root.assimilation-voicing')
  })

  test('Form VIII with default infix keeps no extra first-radical assimilation sentence', () => {
    const verb = synthesizeVerb('كتب', 8)
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'اِكْتَتَبَ')
    expect(layers.formRoot).toBeUndefined()
  })
})

// ── tenseRoot: geminate ──────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot geminate', () => {
  const madda = getVerb('مدد', 1)

  test('doubled + Form I + active.past → geminate-contracts', () => {
    expect(resolveVerbExplanationLayers(madda, 'active.past', '3ms', 'مَدَّ').tenseRoot).toBe('geminate-contracts')
  })

  test('doubled + Form I + active.present.indicative → geminate-contracts', () => {
    expect(resolveVerbExplanationLayers(madda, 'active.present.indicative', '3ms', 'يَمُدُّ').tenseRoot).toBe(
      'geminate-contracts',
    )
  })

  test('doubled + Form I + active.present.jussive → geminate-jussive', () => {
    expect(resolveVerbExplanationLayers(madda, 'active.present.jussive', '3ms', 'يَمُدَّ').tenseRoot).toBe(
      'geminate-jussive',
    )
  })

  test('doubled + Form I + active.imperative → geminate-jussive', () => {
    expect(resolveVerbExplanationLayers(madda, 'active.imperative', '2ms', 'مُدَّ').tenseRoot).toBe('geminate-jussive')
  })

  test('doubled + Form II + active.past → undefined', () => {
    const verb2 = getVerb('مدد', 2)
    expect(resolveVerbExplanationLayers(verb2, 'active.past', '3ms', 'مَدَّدَ').tenseRoot).toBeUndefined()
  })

  test('doubled + Form V + active.past → undefined', () => {
    const verb5 = getVerb('مدد', 5)
    expect(resolveVerbExplanationLayers(verb5, 'active.past', '3ms', 'تَمَدَّدَ').tenseRoot).toBeUndefined()
  })
})

// ── pronoun / arabic fields ───────────────────────────────────────────────────

describe('resolveVerbExplanationLayers pronoun and arabic', () => {
  const verb = getVerb('كتب', 1)

  test('pronoun matches passed pronoun', () => {
    expect(resolveVerbExplanationLayers(verb, 'active.past', '2fs', 'كَتَبْتِ').pronoun).toBe('2fs')
  })

  test('arabic field matches passed arabic', () => {
    expect(resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'كَتَبَ').arabic).toBe('كَتَبَ')
  })
})

// ── prefix / suffix extraction ─────────────────────────────────────────────

describe('resolveVerbExplanationLayers prefix and suffix extraction', () => {
  const kataba = getVerb('كتب', 1)
  const katabaF2 = getVerb('كتب', 2)

  test('past 3ms has no prefix and no suffix (base form)', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.past', '3ms', 'كَتَبَ')
    expect(layers.prefix).toBeUndefined()
    expect(layers.suffix).toBeUndefined()
  })

  test('past 1s has suffix only', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.past', '1s', 'كَتَبْتُ')
    expect(layers.prefix).toBeUndefined()
    expect(layers.suffix).toBe('ْتُ')
  })

  test('present indicative 3ms has fatha prefix and no suffix', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.present.indicative', '3ms', 'يَكْتُبُ')
    expect(layers.prefix).toBe('يَ')
    expect(layers.suffix).toBeUndefined()
  })

  test('future 3ms collapses seen and person prefix, no suffix', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.future', '3ms', 'سَيَكْتُبُ')
    expect(layers.prefix).toBe('سَيَ')
    expect(layers.suffix).toBeUndefined()
  })

  test('imperative 2ms Form II has no prefix and no suffix', () => {
    const layers = resolveVerbExplanationLayers(katabaF2, 'active.imperative', '2ms', 'كَتِّبْ')
    expect(layers.prefix).toBeUndefined()
    expect(layers.suffix).toBeUndefined()
  })

  test('imperative 2ms Form I has alif prefix and no suffix', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.imperative', '2ms', 'اُكْتُبْ')
    expect(layers.prefix).toBe('اُ')
    expect(layers.suffix).toBeUndefined()
  })

  test('imperative 2fs Form II has suffix only', () => {
    const layers = resolveVerbExplanationLayers(katabaF2, 'active.imperative', '2fs', 'كَتِّبِي')
    expect(layers.prefix).toBeUndefined()
    expect(layers.suffix).toBe('ِي')
  })
})

describe('renderExplanation', () => {
  // Stub t() that echoes the key so we can assert key structure without locale files
  const t = (key: string) => key
  const joined = (layers: ExplanationLayers) => renderExplanation(layers, t).join(' ')

  function testExplanationLayers(overrides?: Partial<ExplanationLayers>): ExplanationLayers {
    return {
      rootLetters: ['ق', 'و', 'ل'],
      form: 1,
      arabic: 'قَالَ',
      rootType: 'hollow-waw',
      vowels: 'a-u',
      tense: 'active.past',
      pronoun: '3ms',
      ...overrides,
    }
  }

  test('includes root sentence', () => {
    const layers = testExplanationLayers({ rootType: 'sound' })
    expect(joined(layers)).toContain('explanation.root.sound')
  })

  test('groups root, form description, and formIPattern in first paragraph', () => {
    const layers = testExplanationLayers({ form: 1, rootType: 'sound', vowels: 'a-u' })
    expect(renderExplanation(layers, t)).toEqual([
      'explanation.root.sound explanation.form.1 explanation.form-i-pattern.a-u',
      'explanation.tense.active.past explanation.tense.active.past.form-i',
      'explanation.pronoun.base-form',
    ])
  })

  test('includes form description in first paragraph for non-form-I', () => {
    const layers = testExplanationLayers({ form: 3 })
    expect(renderExplanation(layers, t)[0]).toContain('explanation.form.3')
  })

  test('includes form-i past pattern sentence for form I active.past', () => {
    const layers = testExplanationLayers({ form: 1, vowels: 'a-u', tense: 'active.past' })
    expect(joined(layers)).toContain('explanation.tense.active.past.form-i')
  })

  test.each<VerbTense>([
    'passive.past',
    'passive.present.indicative',
    'passive.present.subjunctive',
    'passive.present.jussive',
    'passive.future',
  ])('includes %s tense sentence', (tense) => {
    const layers = testExplanationLayers({ tense })
    expect(joined(layers)).toContain(`explanation.voice.${tense}`)
  })

  test('omits voice sentence for active tenses', () => {
    const layers = testExplanationLayers({ tense: 'active.past' })
    expect(joined(layers)).not.toContain('explanation.voice')
  })

  test('includes tenseRoot sentence when non-null', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ق', 'و', 'ل'],
      form: 1,
      arabic: 'قَالَ',
      rootType: 'hollow-waw',
      vowels: 'a-u',
      tense: 'active.past',
      tenseRoot: 'middle-lengthens-aa',
      pronoun: '3ms',
    }
    expect(joined(layers)).toContain('explanation.tense-root.middle-lengthens-aa')
  })

  test('groups root and formRoot in first paragraph', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ز', 'و', 'ج'],
      form: 8,
      arabic: 'اِزْدَوَجَ',
      rootType: 'hollow-waw',
      formRoot: 'assimilation-voicing',
      tense: 'active.past',
      pronoun: '3ms',
    }
    expect(renderExplanation(layers, t)).toEqual([
      'explanation.root.hollow-waw explanation.form.8 explanation.form-root.assimilation-voicing',
      'explanation.tense.active.past',
      'explanation.pronoun.base-form',
    ])
  })

  test('active.past form-i base pattern renders faʿula for u-u pattern', () => {
    const verb = getVerbById('kbr-1')! // كَبُرَ, u-u
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'كَبُرَ')
    const result = renderExplanation(layers, localeT)
    expect(result[1]).toContain('faʿula')
  })

  test('active.past form-i base pattern renders ḍamma for u-u pattern', () => {
    const verb = getVerbById('kbr-1')! // كَبُرَ, u-u
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'كَبُرَ')
    const result = renderExplanation(layers, localeT)
    expect(result[1]).toContain('ḍamma')
  })

  test('active.past form-i base pattern renders faʿala for a-u pattern', () => {
    const verb = getVerb('كتب', 1) // كَتَبَ, a-u
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', 'كَتَبَ')
    const result = renderExplanation(layers, localeT)
    expect(result[1]).toContain('faʿala')
  })

  test('active.past form-i base pattern renders faʿila for i-a pattern', () => {
    const verb = getVerbById('Elm-1')! // عَلِمَ, i-a, sound root
    const layers = resolveVerbExplanationLayers(verb, 'active.past', '3ms', verb.label)
    const result = renderExplanation(layers, localeT)
    expect(result[1]).toContain('faʿila')
  })
})

// ── renderExplanation: paragraph 3 template selection ─────────────────────

describe('renderExplanation paragraph 3 template selection', () => {
  const t = (key: string) => key
  const kataba = getVerb('كتب', 1)

  test('past 3ms renders base-form template', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.past', '3ms', 'كَتَبَ')
    expect(renderExplanation(layers, t)[2]).toBe('explanation.pronoun.base-form')
  })

  test('past 1s renders suffix-only template', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.past', '1s', 'كَتَبْتُ')
    expect(renderExplanation(layers, t)[2]).toBe('explanation.pronoun.suffix-only')
  })

  test('present indicative 1s renders prefix-and-suffix template', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.present.indicative', '1s', 'أَكْتُبُ')
    expect(renderExplanation(layers, t)[2]).toBe('explanation.pronoun.prefix-and-suffix')
  })

  test('present indicative 3ms renders prefix-only template', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.present.indicative', '3ms', 'يَكْتُبُ')
    expect(renderExplanation(layers, t)[2]).toBe('explanation.pronoun.prefix-only')
  })

  test('future 3ms renders prefix-only template', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.future', '3ms', 'سَيَكْتُبُ')
    expect(renderExplanation(layers, t)[2]).toBe('explanation.pronoun.prefix-only')
  })

  test('past 1s paragraph 3 contains tatweel-prefixed suffix', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.past', '1s', 'كَتَبْتُ')
    const result = renderExplanation(layers, localeT)
    expect(result[2]).toContain('ـْتُ')
  })

  test('present indicative 1s paragraph 3 contains tatweel-suffixed prefix and tatweel-prefixed suffix', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.present.indicative', '1s', 'أَكْتُبُ')
    const result = renderExplanation(layers, localeT)
    expect(result[2]).toContain('أَـ')
    expect(result[2]).toContain('ـُ')
  })

  test('future 3ms paragraph 3 contains collapsed tatweel-suffixed prefix', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.future', '3ms', 'سَيَكْتُبُ')
    const result = renderExplanation(layers, localeT)
    expect(result[2]).toContain('سَيَـ')
  })

  test('Form III active present indicative 2fp contains damma prefix', () => {
    const verb = getVerb('كتب', 3)
    const layers = resolveVerbExplanationLayers(verb, 'active.present.indicative', '2fp', 'تُكَاتِبْنَ')
    const result = renderExplanation(layers, localeT)
    expect(result[2]).toContain('تُـ')
    expect(result[2]).not.toContain('تَـ')
  })

  test('Form I active present indicative 2fp contains fatha prefix', () => {
    const layers = resolveVerbExplanationLayers(kataba, 'active.present.indicative', '2fp', 'تَكْتُبْنَ')
    const result = renderExplanation(layers, localeT)
    expect(result[2]).toContain('تَـ')
    expect(result[2]).not.toContain('تُـ')
  })
})

// ── resolveNominalExplanationLayers ───────────────────────────────────────────

describe('resolveNominalExplanationLayers', () => {
  const verb = getVerb('كتب', 1)

  test('returns correct rootLetters', () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.rootLetters).toEqual(['ك', 'ت', 'ب'])
  })

  test('returns form number', () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.form).toBe(1)
  })

  test('returns nominal kind', () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.nominal).toBe('activeParticiple')
  })

  test('returns rootType sound for sound root', () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.rootType).toBe('sound')
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

  test('tense is undefined', () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.tense).toBeUndefined()
  })

  test('pronoun is undefined', () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.pronoun).toBeUndefined()
  })

  test('arabic field matches passed arabic', () => {
    const layers = resolveNominalExplanationLayers(verb, 'activeParticiple', 'كَاتِب')
    expect(layers.arabic).toBe('كَاتِب')
  })

  test('passiveParticiple nominal sets nominal to passiveParticiple', () => {
    const layers = resolveNominalExplanationLayers(verb, 'passiveParticiple', 'مَكْتُوب')
    expect(layers.nominal).toBe('passiveParticiple')
  })

  test('masdar nominal sets nominal to masdar', () => {
    const layers = resolveNominalExplanationLayers(verb, 'masdar', 'كِتَابَة')
    expect(layers.nominal).toBe('masdar')
  })

  test('nominalMimiMasdar is true when selected masdar is mimi', () => {
    const wEd = getVerbById('wEd-1')!
    const layers = resolveNominalExplanationLayers(wEd, 'masdar', 'مَوْعِد')
    expect(layers.nominalMimiMasdar).toBe(true)
  })

  test('nominalMimiMasdar is false when selected masdar is not mimi', () => {
    const wEd = getVerbById('wEd-1')!
    const layers = resolveNominalExplanationLayers(wEd, 'masdar', 'وَعْد')
    expect(layers.nominalMimiMasdar).toBe(false)
  })

  test('nominalMimiMasdar is true for default Form I mimi masdar when no explicit masdars are stored', () => {
    const defaultMimi = getVerbById('$Er-1')!
    const layers = resolveNominalExplanationLayers(defaultMimi, 'masdar', 'مَشْعَر')
    expect(layers.nominalMimiMasdar).toBe(true)
  })
})

// ── renderExplanation: nominal ────────────────────────────────────────────────

describe('renderExplanation with nominal', () => {
  const t = (key: string) => key

  test('nominal activeParticiple appears in second paragraph', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'كَاتِب',
      rootType: 'sound',
      nominal: 'activeParticiple',
    }
    expect(renderExplanation(layers, t)).toEqual([
      'explanation.root.sound explanation.form.1',
      'explanation.nominal.activeParticiple',
    ])
  })

  test('nominal passiveParticiple appears in second paragraph', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'مَكْتُوب',
      rootType: 'sound',
      nominal: 'passiveParticiple',
    }
    expect(renderExplanation(layers, t)).toEqual([
      'explanation.root.sound explanation.form.1',
      'explanation.nominal.passiveParticiple',
    ])
  })

  test('nominal masdar appears in second paragraph', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'كِتَابَة',
      rootType: 'sound',
      nominal: 'masdar',
    }
    expect(renderExplanation(layers, t)).toEqual([
      'explanation.root.sound explanation.form.1',
      'explanation.nominal.masdar',
    ])
  })

  test('mimi masdar explanation appears when nominalMimiMasdar is true', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['و', 'ع', 'د'],
      form: 1,
      arabic: ['وَعْد', 'مَوْعِد'],
      rootType: 'assimilated',
      nominal: 'masdar',
      nominalMimiMasdar: true,
    }
    expect(renderExplanation(layers, t)).toEqual([
      'explanation.root.assimilated explanation.form.1',
      'explanation.nominal.masdar explanation.nominal.mimiMasdar',
    ])
  })

  test('nominal with formIPattern includes pattern in first paragraph', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'كَاتِب',
      rootType: 'sound',
      vowels: 'a-u',
      nominal: 'activeParticiple',
    }
    expect(renderExplanation(layers, t)[0]).toContain('explanation.form-i-pattern.a-u')
  })

  test('nominal does not produce a pronoun paragraph', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'كَاتِب',
      rootType: 'sound',
      nominal: 'activeParticiple',
    }
    expect(renderExplanation(layers, t)).toHaveLength(2)
  })
})
