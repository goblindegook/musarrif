import { transliterateReverse } from '@pacote/buckwalter'
import { conjugateFuture } from '../src/paradigms/active/future.ts'
import { conjugateImperative } from '../src/paradigms/active/imperative.ts'
import { conjugatePast } from '../src/paradigms/active/past.ts'
import { conjugatePresentMood } from '../src/paradigms/active/present.ts'
import {
  type ExplanationLayers,
  type NominalKind,
  renderExplanation,
  resolveNominalExplanationLayers,
  resolveVerbExplanationLayers,
} from '../src/paradigms/explanation.ts'
import { FORM_I_PATTERNS, type FormIPattern } from '../src/paradigms/form-i-vowels.ts'
import { deriveMasdar } from '../src/paradigms/nominal/masdar.ts'
import { deriveActiveParticiple, derivePassiveParticiple } from '../src/paradigms/nominal/participle.ts'
import { conjugatePassiveFuture } from '../src/paradigms/passive/future.ts'
import { conjugatePassivePast } from '../src/paradigms/passive/past.ts'
import { conjugatePassivePresentMood } from '../src/paradigms/passive/present.ts'
import { PRONOUN_IDS, type PronounId } from '../src/paradigms/pronouns.ts'
import { ALL_TENSES, type VerbParadigm, type VerbTense } from '../src/paradigms/tense.ts'
import {
  type DisplayVerb,
  FORMS,
  isTriliteralFormIDisplayVerb,
  synthesizeVerb,
  type VerbForm,
  verbs,
} from '../src/paradigms/verbs.ts'
import type { Word } from '../src/paradigms/word.ts'
import { toRoman } from '../src/primitives/numbers.ts'
import { mapRecord } from '../src/primitives/objects.ts'
import en from '../src/ui/locales/en.strings.json' with { type: 'json' }

const locale = en as Record<string, string>

type TranslationParams = Record<string, string>
type ConjugationForms = Record<PronounId, Word>

const ALL_PARADIGMS: readonly VerbParadigm[] = [...ALL_TENSES, 'active.participle', 'passive.participle', 'masdar']

const t = (key: string, params?: TranslationParams): string => {
  const template = locale[key] ?? key
  if (params == null) return template
  return template.replace(/\{(\w+)\}/g, (_: string, k: string) => params[k] ?? `{${k}}`)
}

function resolveRoot(input: string): string {
  const exact = verbs.find((verb) => verb.root === input)
  if (exact) return exact.root
  const byId = verbs.find((verb) => verb.rootId === input)
  if (byId) return byId.root
  return transliterateReverse(input)
}

function findVerb(rootInput: string, form: VerbForm, vowels: FormIPattern): DisplayVerb {
  const root = resolveRoot(rootInput)
  if (form === 1) {
    const existingFormI = verbs.find(
      (verb) => verb.root === root && isTriliteralFormIDisplayVerb(verb) && verb.vowels === vowels,
    )
    if (existingFormI) return existingFormI
    return synthesizeVerb(root, 1, vowels)
  }
  return verbs.find((verb) => verb.root === root && verb.form === form) ?? synthesizeVerb(root, form)
}

function formsForTense(verb: DisplayVerb, tense: VerbTense): ConjugationForms {
  if (tense === 'active.past') return conjugatePast(verb)
  if (tense === 'active.present.indicative') return conjugatePresentMood(verb, 'indicative')
  if (tense === 'active.present.subjunctive') return conjugatePresentMood(verb, 'subjunctive')
  if (tense === 'active.present.jussive') return conjugatePresentMood(verb, 'jussive')
  if (tense === 'active.future') return conjugateFuture(verb)
  if (tense === 'active.imperative') return conjugateImperative(verb)
  if (tense === 'passive.past') return conjugatePassivePast(verb)
  if (tense === 'passive.present.indicative') return conjugatePassivePresentMood(verb, 'indicative')
  if (tense === 'passive.present.subjunctive') return conjugatePassivePresentMood(verb, 'subjunctive')
  if (tense === 'passive.present.jussive') return conjugatePassivePresentMood(verb, 'jussive')
  return conjugatePassiveFuture(verb)
}

function printRendered(type: string, verb: DisplayVerb, derived: string, layers: ExplanationLayers): void {
  const explanation = renderExplanation(layers, t)
  const label = (verb as DisplayVerb & { label?: string }).label
  console.log('\n────────────────────────────────────────────')
  console.log(`Verb: ${label} (${verb.id})`)
  console.log(`Type: ${type}`)
  console.log(`Derived: ${derived}\n`)
  console.log('Layers:\n')
  console.table(layers)
  console.log('\nRendered:\n')
  for (const [index, paragraph] of explanation.entries()) {
    const text = paragraph.map((s) => s.text).join(' ')
    console.log(`  [${index + 1}] ${text}\n`)
  }
  console.log('────────────────────────────────────────────\n')
}

function usage(): never {
  const forms = FORMS.map((f) => toRoman(f)).join('|')
  console.error(`Usage:
  debug-explain <root> 1 <vowels> <paradigm> [<pronoun>]
  debug-explain <root> <form> <paradigm> [<pronoun>]

  root      Arabic letters or transliteration (e.g. كتب or ktb)
  form      ${forms}
  vowels    Form I only: ${FORM_I_PATTERNS.join('|')}
  paradigm  ${ALL_PARADIGMS.join(' | ')}
  pronoun   Required for verb tenses: ${PRONOUN_IDS.join('|')}

Examples:
  debug-explain كتب 1 a-u active.past 3ms
  debug-explain كتب 1 a-u active.participle
  debug-explain كتب 2 masdar`)
  process.exit(1)
}

const args = process.argv.slice(2)
if (args.length < 3) usage()

const [rootArg, formArg, ...rest] = args

const form = parseInt(formArg ?? '', 10) as VerbForm
if (!FORMS.includes(form)) {
  console.error(`Invalid form: ${formArg}. Must be 1–${FORMS[FORMS.length - 1]}.`)
  process.exit(1)
}

let vowels: FormIPattern = 'a-a'
let paradigmArg: string | undefined
let pronounArg: string | undefined

if (form === 1) {
  const [vowelsArg, p, pr] = rest
  if (vowelsArg == null || !FORM_I_PATTERNS.includes(vowelsArg as FormIPattern)) {
    console.error(`Form I requires a vowel pattern as the third argument: ${FORM_I_PATTERNS.join('|')}`)
    process.exit(1)
  }
  vowels = vowelsArg as FormIPattern
  paradigmArg = p
  pronounArg = pr
} else {
  const [p, pr] = rest
  paradigmArg = p
  pronounArg = pr
}

const paradigm = paradigmArg as VerbParadigm
if (!ALL_PARADIGMS.includes(paradigm)) {
  console.error(`Invalid paradigm: ${paradigmArg}\nValid: ${ALL_PARADIGMS.join(', ')}`)
  process.exit(1)
}

const isVerbTense = !['active.participle', 'passive.participle', 'masdar'].includes(paradigm)

if (isVerbTense && pronounArg == null) {
  console.error(`Pronoun is required for verb tense paradigms: ${PRONOUN_IDS.join('|')}`)
  process.exit(1)
}

const verb = findVerb(rootArg ?? '', form, vowels)

const NOMINAL_PARADIGM_MAP: Record<string, NominalKind> = {
  'active.participle': 'activeParticiple',
  'passive.participle': 'passiveParticiple',
  masdar: 'masdar',
}

const nominalKind = NOMINAL_PARADIGM_MAP[paradigm]
if (nominalKind != null) {
  if (nominalKind === 'activeParticiple') {
    const derived = String(deriveActiveParticiple(verb))
    printRendered(
      'active participle',
      verb,
      derived,
      resolveNominalExplanationLayers(verb, 'activeParticiple', derived),
    )
  } else if (nominalKind === 'passiveParticiple') {
    const derived = String(derivePassiveParticiple(verb))
    if (!derived) {
      console.error('No passive participle is produced for this verb.')
      process.exit(1)
    }
    printRendered(
      'passive participle',
      verb,
      derived,
      resolveNominalExplanationLayers(verb, 'passiveParticiple', derived),
    )
  } else {
    const masdars = deriveMasdar(verb).map(String)
    const masdar = masdars.at(0)
    if (!masdar) {
      console.error('No masdar was produced for this verb.')
      process.exit(1)
    }
    printRendered(
      `masdar (${masdars.join(', ')})`,
      verb,
      masdar,
      resolveNominalExplanationLayers(verb, 'masdar', masdar),
    )
  }
} else {
  const tense = paradigm as VerbTense
  const pronoun = pronounArg as PronounId
  const derived = mapRecord(formsForTense(verb, tense), String)[pronoun]
  if (!derived?.length) {
    console.error(`No form produced for ${tense} / ${pronoun}.`)
    process.exit(1)
  }
  printRendered(
    `verb (${tense} / ${pronoun})`,
    verb,
    derived,
    resolveVerbExplanationLayers(verb, tense, pronoun, derived),
  )
}
