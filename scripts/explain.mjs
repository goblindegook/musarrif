import { input, select } from '@inquirer/prompts'
import { transliterateReverse } from '@pacote/buckwalter'
import en from '../src/locales/en.json' with { type: 'json' }
import { conjugateFuture } from '../src/paradigms/active/future.ts'
import { conjugateImperative } from '../src/paradigms/active/imperative.ts'
import { conjugatePast } from '../src/paradigms/active/past.ts'
import { conjugatePresentMood } from '../src/paradigms/active/present.ts'
import {
  renderExplanation,
  resolveNominalExplanationLayers,
  resolveVerbExplanationLayers,
} from '../src/paradigms/explanation.ts'
import { deriveMasdar } from '../src/paradigms/nominal/masdar.ts'
import { deriveActiveParticiple } from '../src/paradigms/nominal/participle-active.ts'
import { derivePassiveParticiple } from '../src/paradigms/nominal/participle-passive.ts'
import { conjugatePassiveFuture } from '../src/paradigms/passive/future.ts'
import { conjugatePassivePast } from '../src/paradigms/passive/past.ts'
import { conjugatePassivePresentMood } from '../src/paradigms/passive/present.ts'
import { PRONOUN_IDS } from '../src/paradigms/pronouns.ts'
import { FORMS, getAvailableParadigms, synthesizeVerb, verbs } from '../src/paradigms/verbs.ts'

const locale = en
const t = (key, params) => {
  const template = locale.strings?.[key] ?? locale.roots?.[key] ?? key
  if (params == null) return template
  return template.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? `{${k}}`)
}

const BACK = Symbol('back')

const PRONOUNS = [...PRONOUN_IDS]

const VERB_TENSE_CHOICES = [
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

const VOWEL_PATTERNS = ['a-a', 'a-i', 'a-u', 'i-a', 'i-i', 'i-u', 'u-a', 'u-i', 'u-u']

async function inputWithBack(message, defaultValue = '') {
  const value = (await input({ message: `${message} (type /back to go back):`, default: defaultValue })).trim()
  if (value === '/back') return BACK
  return value
}

function toRoman(num) {
  const table = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]
  let value = num
  let out = ''
  for (const [n, sym] of table) {
    while (value >= n) {
      out += sym
      value -= n
    }
  }
  return out
}

function resolveRoot(input) {
  const exact = verbs.find((verb) => verb.root === input)
  if (exact) return exact.root
  const byId = verbs.find((verb) => verb.rootId === input)
  if (byId) return byId.root
  return transliterateReverse(input)
}

function findVerb(rootInput, form, vowels) {
  const root = resolveRoot(rootInput)
  if (form === 1) {
    const existingFormI = verbs.find((verb) => verb.root === root && verb.form === 1 && verb.vowels === vowels)
    if (existingFormI) return existingFormI
    return synthesizeVerb(root, 1, vowels)
  }
  return verbs.find((verb) => verb.root === root && verb.form === form) ?? synthesizeVerb(root, form)
}

function formsForTense(verb, tense) {
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

function printRendered(type, verb, derived, layers) {
  const explanation = renderExplanation(layers, t)
  console.log('\n────────────────────────────────────────────')
  console.log(`Verb: ${verb.label} (${verb.id})`)
  console.log(`Type: ${type}`)
  console.log(`Derived: ${derived}\n`)
  console.log('Layers:\n')
  console.table({ ...layers, rootLetters: layers.rootLetters.join(' ') })
  console.log('\nRendered:\n')
  for (const [index, paragraph] of explanation.entries()) {
    console.log(`  [${index + 1}] ${paragraph}\n`)
  }
  console.log('────────────────────────────────────────────\n')
}

function tenseAllowed(verb, tense) {
  return getAvailableParadigms(verb).includes(tense)
}

function pronounsForTense(verb, tense) {
  if (tense === 'active.imperative') return PRONOUNS.filter((pronoun) => pronoun.startsWith('2'))
  if (tense.startsWith('passive') && verb.passiveVoice === 'impersonal') return ['3ms']
  return PRONOUNS
}

async function wizard() {
  const state = {
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
      const form = await select({
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
      const vowels = await select({
        message: 'Select vowel pattern:',
        choices: [{ name: '← Back', value: BACK }, ...VOWEL_PATTERNS.map((value) => ({ name: value, value }))],
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
      const kind = await select({
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
      const tense = await select({
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
      const pronoun = await select({
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

    const next = await select({
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
wizard().catch((error) => {
  console.error(error)
  process.exit(1)
})
