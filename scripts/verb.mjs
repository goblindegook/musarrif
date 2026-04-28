import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { confirm, input, select } from '@inquirer/prompts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const ROOTS_PATH = join(ROOT, 'src/data/roots.json')
const LOCALE_PATHS = {
  en: join(ROOT, 'src/locales/en.json'),
  it: join(ROOT, 'src/locales/it.json'),
  pt: join(ROOT, 'src/locales/pt.json'),
}

const VOWEL_PATTERNS = ['a-a', 'a-i', 'a-u', 'i-a', 'i-i', 'i-u', 'u-a', 'u-i', 'u-u']

const MASDAR_PATTERNS = [
  'fa3aal',
  'fa3aala',
  'fa3al',
  'fa3iil',
  'fa3l',
  'fa3lala',
  'fa3lan',
  'fi3aal',
  'fi3aala',
  'fi3al',
  'fi3an',
  'fi3iil',
  'fi3l',
  'fi3la',
  'fu3aal',
  'fu3l',
  'fu3la',
  'fu3ool',
  'fu3ul',
  'mimi',
]

const BACK = Symbol('back')

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

function readRoots() {
  return JSON.parse(readFileSync(ROOTS_PATH, 'utf8'))
}

function readLocale(lang) {
  return JSON.parse(readFileSync(LOCALE_PATHS[lang], 'utf8'))
}

function writeRoots(roots) {
  const sorted = [...roots].sort((a, b) => (a.root < b.root ? -1 : a.root > b.root ? 1 : a.form - b.form))
  writeFileSync(ROOTS_PATH, `${JSON.stringify(sorted, null, 2)}\n`)
}

function sortKeys(obj) {
  return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => (a < b ? -1 : 1)))
}

function writeLocale(lang, data) {
  const out = { ...data, verbs: sortKeys(data.verbs), roots: sortKeys(data.roots) }
  writeFileSync(LOCALE_PATHS[lang], `${JSON.stringify(out, null, 2)}\n`)
}

function verbId(root, form) {
  return `${root}-${form}`
}

async function inputWithBack(message, defaultValue = '') {
  const value = (await input({ message: `${message} (type /back to go back):`, default: defaultValue })).trim()
  if (value === '/back') return BACK
  return value
}

async function confirmWithBack(message, defaultValue = true) {
  return select({
    message,
    choices: [
      { name: 'Yes', value: true },
      { name: 'No', value: false },
      { name: '← Back', value: BACK },
    ],
    default: defaultValue,
  })
}

async function pickMasdars(existing = []) {
  const chosen = [...existing]

  while (true) {
    const remaining = MASDAR_PATTERNS.filter((m) => !chosen.includes(m))
    if (chosen.length > 0) console.log(`  Selected so far: ${chosen.join(', ')}`)

    const pick = await select({
      message: 'Add a masdar pattern:',
      choices: [
        { name: '— Done (no more masdars) —', value: null },
        { name: '← Back', value: BACK },
        ...remaining.map((m) => ({ name: m, value: m })),
      ],
    })

    if (pick === BACK) return BACK
    if (pick === null) break
    chosen.push(pick)
  }

  return chosen
}

async function runSingle(roots, locales) {
  const state = {
    rootStr: '',
    existing: [],
    editEntry: null,
    form: null,
    vowels: undefined,
    passiveVoice: undefined,
    masdars: undefined,
    noPassiveParticiple: undefined,
    isNewRoot: false,
    rootGloss: { en: '', it: '', pt: '' },
    vid: '',
    verbTranslations: { en: '', it: '', pt: '' },
  }

  let step = 0

  while (step < 10) {
    if (step === 0) {
      const rootStr = (await input({ message: 'Enter verb root (Arabic or transliterated):', default: state.rootStr })).trim()
      if (!rootStr) {
        console.log('Root required.')
        continue
      }

      state.rootStr = rootStr
      state.existing = roots.filter((r) => r.root === rootStr)
      state.editEntry = null
      state.form = null
      state.vowels = undefined
      state.passiveVoice = undefined
      state.masdars = undefined
      state.noPassiveParticiple = undefined
      state.isNewRoot = !locales.en.roots[rootStr]
      state.vid = ''
      state.verbTranslations = { en: '', it: '', pt: '' }
      step += 1
      continue
    }

    if (step === 1) {
      if (state.existing.length > 0) {
        console.log('\nExisting entries for this root:')
        for (const e of state.existing) {
          const parts = [`Form ${toRoman(e.form)}`]
          if (e.vowels) parts.push(`vowels: ${e.vowels}`)
          if (e.masdars?.length) parts.push(`masdars: [${e.masdars.join(', ')}]`)
          if (e.passiveVoice) parts.push(`passive: ${e.passiveVoice}`)
          if (e.noPassiveParticiple) parts.push('no passive participle')
          console.log(`  ${e.root}-${e.form}: ${parts.join(', ')}`)
        }
        console.log()
      }

      const form = await select({
        message: 'Select form:',
        choices: [
          { name: '← Back', value: BACK },
          ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
            const existingForForm = state.existing.find((e) => e.form === n)
            return {
              name: existingForForm ? `Form ${toRoman(n)} (existing)` : `Form ${toRoman(n)}`,
              value: n,
            }
          }),
        ],
        default: state.form ?? 1,
      })

      if (form === BACK) {
        step -= 1
        continue
      }

      state.form = form
      state.editEntry = state.existing.find((e) => e.form === form) ?? null
      state.vid = verbId(state.rootStr, form)
      state.vowels = undefined
      state.passiveVoice = undefined
      state.masdars = undefined
      state.noPassiveParticiple = undefined
      step += 1
      continue
    }

    if (step === 2) {
      if (state.form !== 1) {
        state.vowels = undefined
        step += 1
        continue
      }

      const vowels = await select({
        message: 'Select vowel pattern:',
        choices: [{ name: '← Back', value: BACK }, ...VOWEL_PATTERNS.map((v) => ({ name: v, value: v }))],
        default: state.editEntry?.vowels ?? 'a-a',
      })

      if (vowels === BACK) {
        step -= 1
        continue
      }

      state.vowels = vowels
      step += 1
      continue
    }

    if (step === 3) {
      if (state.form === 9) {
        state.passiveVoice = undefined
        step += 1
        continue
      }

      const passiveVoice = await select({
        message: 'Passive voice support:',
        choices: [
          { name: '← Back', value: BACK },
          { name: 'full — complete passive conjugation (default)', value: 'full' },
          { name: 'impersonal — 3ms only', value: 'impersonal' },
          { name: 'none — no passive voice', value: 'none' },
        ],
        default: state.editEntry?.passiveVoice ?? 'full',
      })

      if (passiveVoice === BACK) {
        step -= 1
        continue
      }

      state.passiveVoice = passiveVoice === 'full' ? undefined : passiveVoice
      step += 1
      continue
    }

    if (step === 4) {
      if (state.form !== 1) {
        state.masdars = undefined
        step += 1
        continue
      }

      console.log()
      const masdars = await pickMasdars(state.editEntry?.masdars ?? [])
      if (masdars === BACK) {
        step -= 1
        continue
      }

      state.masdars = masdars.length === 0 ? undefined : masdars
      step += 1
      continue
    }

    if (step === 5) {
      if (state.form === 9 || state.passiveVoice === 'none') {
        state.noPassiveParticiple = undefined
        step += 1
        continue
      }

      const supported = await confirmWithBack(
        'Passive participle supported?',
        state.editEntry ? !state.editEntry.noPassiveParticiple : true,
      )

      if (supported === BACK) {
        step -= 1
        continue
      }

      state.noPassiveParticiple = supported ? undefined : true
      step += 1
      continue
    }

    if (step === 6) {
      if (!state.isNewRoot) {
        step += 1
        continue
      }

      console.log('\nNew root — enter semantic gloss (nominal/gerundive form, e.g. "writing"):')
      const enGloss = await inputWithBack('Root gloss (EN):', state.rootGloss.en)
      if (enGloss === BACK) {
        step -= 1
        continue
      }
      state.rootGloss.en = enGloss

      const itGloss = await inputWithBack('Root gloss (IT):', state.rootGloss.it)
      if (itGloss === BACK) {
        continue
      }
      state.rootGloss.it = itGloss

      const ptGloss = await inputWithBack('Root gloss (PT):', state.rootGloss.pt)
      if (ptGloss === BACK) {
        continue
      }
      state.rootGloss.pt = ptGloss

      step += 1
      continue
    }

    if (step === 7) {
      console.log()
      const enVerb = await inputWithBack('Verb translation (EN, e.g. "to write"):', locales.en.verbs[state.vid] ?? state.verbTranslations.en)
      if (enVerb === BACK) {
        step -= 1
        continue
      }
      state.verbTranslations.en = enVerb

      const itVerb = await inputWithBack('Verb translation (IT, e.g. "scrivere"):', locales.it.verbs[state.vid] ?? state.verbTranslations.it)
      if (itVerb === BACK) {
        continue
      }
      state.verbTranslations.it = itVerb

      const ptVerb = await inputWithBack('Verb translation (PT, e.g. "escrever"):', locales.pt.verbs[state.vid] ?? state.verbTranslations.pt)
      if (ptVerb === BACK) {
        continue
      }
      state.verbTranslations.pt = ptVerb

      step += 1
      continue
    }

    if (step === 8) {
      const entry = { root: state.rootStr, form: state.form }
      if (state.vowels != null) entry.vowels = state.vowels
      if (state.masdars != null) entry.masdars = state.masdars
      if (state.passiveVoice != null) entry.passiveVoice = state.passiveVoice
      if (state.noPassiveParticiple) entry.noPassiveParticiple = true
      if (state.editEntry?.contractedImperative) entry.contractedImperative = true

      console.log('\n─── Summary ───────────────────────────────')
      console.log('roots.json entry:')
      console.log(JSON.stringify(entry, null, 2))
      if (state.isNewRoot) {
        console.log('\nNew root gloss:')
        for (const lang of ['en', 'it', 'pt']) console.log(`  ${lang}: ${state.rootGloss[lang]}`)
      }
      console.log('\nVerb translations:')
      for (const lang of ['en', 'it', 'pt']) console.log(`  ${state.vid} (${lang}): ${state.verbTranslations[lang]}`)
      console.log('────────────────────────────────────────────\n')

      const ok = await confirmWithBack('Write changes?', true)
      if (ok === BACK) {
        step -= 1
        continue
      }
      if (!ok) return false

      const newRoots = state.editEntry
        ? roots.map((r) => (r.root === state.rootStr && r.form === state.editEntry.form ? entry : r))
        : [...roots, entry]
      writeRoots(newRoots)
      roots.splice(0, roots.length, ...newRoots)

      for (const lang of ['en', 'it', 'pt']) {
        if (state.isNewRoot) locales[lang].roots[state.rootStr] = state.rootGloss[lang]
        locales[lang].verbs[state.vid] = state.verbTranslations[lang]
        writeLocale(lang, locales[lang])
      }

      console.log('Done.')
      return true
    }
  }

  return false
}

async function run() {
  console.log('Verb wizard — Ctrl+C to abort at any time.\n')

  const roots = readRoots()
  const locales = {
    en: readLocale('en'),
    it: readLocale('it'),
    pt: readLocale('pt'),
  }

  while (true) {
    const wrote = await runSingle(roots, locales)
    if (!wrote) {
      console.log('Aborted.')
      return
    }

    const again = await confirm({ message: 'Add another verb?', default: true })
    if (!again) return
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
