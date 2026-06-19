import { input, select } from '@inquirer/prompts'
import { transliterateReverse } from '@pacote/buckwalter'
import { conjugateFuture } from '../src/paradigms/active/future.ts'
import { conjugateImperative } from '../src/paradigms/active/imperative.ts'
import { conjugatePast } from '../src/paradigms/active/past.ts'
import { conjugatePresentMood } from '../src/paradigms/active/present.ts'
import {
  type ExplanationLayers,
  renderExplanation,
  resolveNominalExplanationLayers,
  resolveVerbExplanationLayers,
} from '../src/paradigms/explanation.ts'
import { FORM_I_PATTERNS, type FormIPattern } from '../src/paradigms/form-i-vowels.ts'
import { deriveMasdar } from '../src/paradigms/nominal/masdar.ts'
import { deriveActiveParticiple } from '../src/paradigms/nominal/participle-active.ts'
import { derivePassiveParticiple } from '../src/paradigms/nominal/participle-passive.ts'
import { conjugatePassiveFuture } from '../src/paradigms/passive/future.ts'
import { conjugatePassivePast } from '../src/paradigms/passive/past.ts'
import { conjugatePassivePresentMood } from '../src/paradigms/passive/present.ts'
import { PRONOUN_IDS, type PronounId } from '../src/paradigms/pronouns.ts'
import type { VerbTense } from '../src/paradigms/tense.ts'
import {
  type DisplayVerb,
  FORMS,
  getAvailableParadigms,
  synthesizeVerb,
  type VerbForm,
  verbs,
} from '../src/paradigms/verbs.ts'
import { toRoman } from '../src/primitives/numbers.ts'
import { mapRecord } from '../src/primitives/objects.ts'
import en from '../src/ui/locales/en.json' with { type: 'json' }

const locale = en
const localeStrings = locale.strings as Record<string, string>
const localeRoots = locale.roots as Record<string, string>

type Back = typeof BACK
type DerivationKind = 'verb' | 'activeParticiple' | 'passiveParticiple' | 'masdar'
type NextAction = 'again' | 'kind' | 'root' | 'exit'
type TranslationParams = Record<string, string>
type ConjugationForms = Partial<Record<PronounId, string>>

interface WizardState {
  root: string
  form: VerbForm
  vowels: FormIPattern
  kind: DerivationKind
  tense: VerbTense
  pronoun: PronounId
}

const t = (key: string, params?: TranslationParams): string => {
  const template = localeStrings[key] ?? localeRoots[key] ?? key
  if (params == null) return template
  return template.replace(/\{(\w+)\}/g, (_: string, k: string) => params[k] ?? `{${k}}`)
}

const BACK = Symbol('back')

const VERB_TENSE_CHOICES: readonly { name: VerbTense; value: VerbTense }[] = [
  { name: 'active.past', value: 'active.past' },
  { name: 'active.present.indicative', value: 'active.present.indicative' },
  { name: 'active.present.subjunctive', value: 'active.present.subjunctive' },
  { name: 'active.present.jussive', value: 'active.present.jussive' },
  { name: 'active.future', value: 'active.future' },
  { name: 'active.imperative', value: 'active.imperative' },
  { name: 'passive.past', value: 'passive.past' },
  { name: 'passive.present.indicative', value: 'passive.present.indicative' },
  { name: 'passive.present.subjunctive', value: 'passive.present.subjunctive' },
  { name: 'passive.present.jussive', value: 'passive.present.jussive' },
  { name: 'passive.future', value: 'passive.future' },
]

async function inputWithBack(message: string, defaultValue = ''): Promise<string | Back> {
  const value = (await input({ message: `${message} (type /back to go back):`, default: defaultValue })).trim()
  if (value === '/back') return BACK
  return value
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
    const existingFormI = verbs.find((verb) => verb.root === root && verb.form === 1 && verb.vowels === vowels)
    if (existingFormI) return existingFormI
    return synthesizeVerb(root, 1, vowels)
  }
  return verbs.find((verb) => verb.root === root && verb.form === form) ?? synthesizeVerb(root, form)
}

function formsForTense(verb: DisplayVerb, tense: VerbTense): ConjugationForms {
  if (tense === 'active.past') return mapRecord(conjugatePast(verb), String)
  if (tense === 'active.present.indicative') return mapRecord(conjugatePresentMood(verb, 'indicative'), String)
  if (tense === 'active.present.subjunctive') return mapRecord(conjugatePresentMood(verb, 'subjunctive'), String)
  if (tense === 'active.present.jussive') return mapRecord(conjugatePresentMood(verb, 'jussive'), String)
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
  const rootLetters = (layers as ExplanationLayers & { rootLetters: readonly string[] }).rootLetters
  const label = (verb as DisplayVerb & { label?: string }).label
  console.log('\n────────────────────────────────────────────')
  console.log(`Verb: ${label} (${verb.id})`)
  console.log(`Type: ${type}`)
  console.log(`Derived: ${derived}\n`)
  console.log('Layers:\n')
  console.table({ ...layers, rootLetters: rootLetters.join(' ') })
  console.log('\nRendered:\n')
  for (const [index, paragraph] of explanation.entries()) {
    console.log(`  [${index + 1}] ${paragraph}\n`)
  }
  console.log('────────────────────────────────────────────\n')
}

function tenseAllowed(verb: DisplayVerb, tense: VerbTense): boolean {
  return getAvailableParadigms(verb).includes(tense)
}

function pronounsForTense(verb: DisplayVerb, tense: VerbTense): readonly PronounId[] {
  if (tense === 'active.imperative') return PRONOUN_IDS.filter((pronoun) => pronoun.startsWith('2'))
  if (tense.startsWith('passive') && verb.passiveVoice === 'impersonal') return ['3ms']
  return PRONOUN_IDS
}

async function wizard() {
  const state: WizardState = {
    root: '',
    form: 1,
    vowels: 'a-a',
    kind: 'verb',
    tense: 'active.past',
    pronoun: '3ms',
  }

  let step = 0
  while (step < 7) {
    if (step === 0) {
      const root = await inputWithBack('Enter root (Arabic or transliterated):', state.root)
      if (root === BACK) continue
      if (!root) {
        console.log('Root is required.')
        continue
      }
      state.root = root
      step += 1
      continue
    }

    if (step === 1) {
      const form = await select<VerbForm | Back>({
        message: 'Select form:',
        choices: [
          { name: '← Back', value: BACK },
          ...FORMS.map((value) => ({ name: `Form ${toRoman(value)}`, value })),
        ],
        default: state.form,
      })
      if (form === BACK) {
        step -= 1
        continue
      }
      state.form = form
      if (form !== 1) state.vowels = 'a-a'
      step += 1
      continue
    }

    if (step === 2) {
      if (state.form !== 1) {
        step += 1
        continue
      }
      const vowels = await select<FormIPattern | Back>({
        message: 'Select vowel pattern:',
        choices: [{ name: '← Back', value: BACK }, ...FORM_I_PATTERNS.map((value) => ({ name: value, value }))],
        default: state.vowels,
      })
      if (vowels === BACK) {
        step -= 1
        continue
      }
      state.vowels = vowels
      step += 1
      continue
    }

    const verb = findVerb(state.root, state.form, state.vowels)
    if (verb == null) {
      console.log(`No verb found for ${state.root}-${state.form}.`)
      step = 0
      continue
    }

    if (step === 3) {
      const kind = await select<DerivationKind | Back>({
        message: 'What do you want to explain?',
        choices: [
          { name: '← Back', value: BACK },
          { name: 'Verb conjugation', value: 'verb' },
          { name: 'Active participle', value: 'activeParticiple' },
          {
            name: 'Passive participle',
            value: 'passiveParticiple',
            disabled: getAvailableParadigms(verb).includes('passive.participle')
              ? false
              : 'Not available for this verb',
          },
          { name: 'Masdar', value: 'masdar' },
        ],
        default: state.kind,
      })
      if (kind === BACK) {
        step -= 1
        continue
      }
      state.kind = kind
      step += 1
      continue
    }

    if (step === 4 && state.kind === 'verb') {
      const tense = await select<VerbTense | Back>({
        message: 'Select tense:',
        choices: [
          { name: '← Back', value: BACK },
          ...VERB_TENSE_CHOICES.map((choice) => ({
            name: t(`tense.${choice.value}`),
            value: choice.value,
            disabled: tenseAllowed(verb, choice.value) ? false : 'Not available for this verb',
          })),
        ],
        default: state.tense,
      })
      if (tense === BACK) {
        step -= 1
        continue
      }
      state.tense = tense
      step += 1
      continue
    }

    if (step === 5 && state.kind === 'verb') {
      const availablePronouns = pronounsForTense(verb, state.tense)
      const pronoun = await select<PronounId | Back>({
        message: 'Select pronoun:',
        choices: [
          { name: '← Back', value: BACK },
          ...availablePronouns.map((value) => ({ name: t(`pronoun.${value}`), value })),
        ],
        default: availablePronouns.includes(state.pronoun) ? state.pronoun : availablePronouns[0],
      })
      if (pronoun === BACK) {
        step -= 1
        continue
      }
      state.pronoun = pronoun
      step += 1
      continue
    }

    if (state.kind === 'verb') {
      const forms = formsForTense(verb, state.tense)
      const derived = forms[state.pronoun]
      if (!derived?.length) {
        console.log(`No form produced for ${state.tense} / ${state.pronoun}.`)
      } else {
        printRendered(
          `verb (${state.tense} / ${state.pronoun})`,
          verb,
          derived,
          resolveVerbExplanationLayers(verb, state.tense, state.pronoun, derived),
        )
      }
    } else if (state.kind === 'activeParticiple') {
      printRendered(
        'active participle',
        verb,
        deriveActiveParticiple(verb),
        resolveNominalExplanationLayers(verb, 'activeParticiple', deriveActiveParticiple(verb)),
      )
    } else if (state.kind === 'passiveParticiple') {
      const derived = derivePassiveParticiple(verb)
      if (!derived) console.log('No passive participle is produced for this verb.')
      else {
        printRendered(
          'passive participle',
          verb,
          derived,
          resolveNominalExplanationLayers(verb, 'passiveParticiple', derived),
        )
      }
    } else {
      const masdars = deriveMasdar(verb)
      const masdar = masdars.at(0)
      if (!masdar) console.log('No masdar was produced for this verb.')
      else {
        printRendered(
          `masdar (${masdars.join(', ')})`,
          verb,
          masdar,
          resolveNominalExplanationLayers(verb, 'masdar', masdar),
        )
      }
    }

    const next = await select<NextAction>({
      message: 'Next:',
      choices: [
        { name: 'Check another explanation', value: 'again' },
        { name: 'Change derivation kind/tense/pronoun', value: 'kind' },
        { name: 'Change root/form', value: 'root' },
        { name: 'Exit', value: 'exit' },
      ],
      default: 'again',
    })

    if (next === 'exit') return
    if (next === 'root') {
      step = 0
      continue
    }
    if (next === 'kind') {
      step = 3
      continue
    }
    step = state.kind === 'verb' ? 4 : 3
  }
}

console.log('Explanation wizard — Ctrl+C to abort.\n')
wizard().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
