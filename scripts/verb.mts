import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { confirm, input, select } from '@inquirer/prompts'
import { transliterate } from '@pacote/buckwalter'
import { FORM_I_PATTERNS, type FormIPattern } from '../src/paradigms/form-i-vowels.ts'
import { MASDAR_PATTERNS, type MasdarPattern, type PassiveVoice, type VerbForm } from '../src/paradigms/verbs.ts'
import { toRoman } from '../src/primitives/numbers.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const ROOTS_PATH = join(ROOT, 'src/data/roots.json')
const LOCALE_PATHS = {
  en: join(ROOT, 'src/ui/locales/en.verbs.json'),
  it: join(ROOT, 'src/ui/locales/it.verbs.json'),
  pt: join(ROOT, 'src/ui/locales/pt.verbs.json'),
} as const

const LANGUAGE_CODES = ['en', 'it', 'pt'] as const

const BACK = Symbol('back')

type Back = typeof BACK
type LanguageCode = (typeof LANGUAGE_CODES)[number]
type MasdarPatternChoice = MasdarPattern

interface RootEntry {
  root: string
  form: VerbForm
  vowels?: FormIPattern
  masdars?: readonly MasdarPattern[]
  lexicalizedMasdars?: readonly string[]
  passiveVoice?: PassiveVoice
  noPassiveParticiple?: boolean
  contractedImperative?: boolean
}

interface LocaleData {
  verbs: Record<string, string>
  roots: Record<string, string>
}

type LocaleMap = Record<LanguageCode, LocaleData>
type Translations = Record<LanguageCode, string>
type PassiveVoiceSelection = 'full' | PassiveVoice

interface WizardState {
  rootStr: string
  existing: RootEntry[]
  editEntry: RootEntry | null
  form: VerbForm | null
  vowels?: FormIPattern
  passiveVoice?: PassiveVoice
  masdars?: MasdarPatternChoice[]
  lexicalizedMasdars?: string[]
  noPassiveParticiple?: true
  isNewRoot: boolean
  rootGloss: Translations
  vid: string
  verbTranslations: Translations
}

function normalizeArabic(value = ''): string {
  const trimmed = value.trim()
  return /[\u0600-\u06FF]/.test(trimmed) ? transliterate(trimmed) : trimmed
}

function readRoots(): RootEntry[] {
  return JSON.parse(readFileSync(ROOTS_PATH, 'utf8')) as RootEntry[]
}

function readLocale(lang: LanguageCode): LocaleData {
  return JSON.parse(readFileSync(LOCALE_PATHS[lang], 'utf8')) as LocaleData
}

function writeRoots(roots: readonly RootEntry[]): void {
  const sorted = [...roots].sort((a, b) => (a.root < b.root ? -1 : a.root > b.root ? 1 : a.form - b.form))
  writeFileSync(ROOTS_PATH, `${JSON.stringify(sorted, null, 2)}\n`)
}

function sortKeys(obj: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => (a < b ? -1 : 1)))
}

function writeLocale(lang: LanguageCode, data: LocaleData): void {
  const out = { ...data, verbs: sortKeys(data.verbs), roots: sortKeys(data.roots) }
  writeFileSync(LOCALE_PATHS[lang], `${JSON.stringify(out, null, 2)}\n`)
}

function verbId(root: string, form: VerbForm): string {
  return `${root}-${form}`
}

async function inputWithBack(message: string, defaultValue = ''): Promise<string | Back> {
  const value = (await input({ message: `${message} (type /back to go back):`, default: defaultValue })).trim()
  if (value === '/back') return BACK
  return value
}

async function confirmWithBack(message: string, defaultValue = true): Promise<boolean | Back> {
  return select<boolean | Back>({
    message,
    choices: [
      { name: 'Yes', value: true },
      { name: 'No', value: false },
      { name: '← Back', value: BACK },
    ],
    default: defaultValue,
  })
}

async function pickMasdars(existing: readonly MasdarPatternChoice[] = []): Promise<MasdarPatternChoice[] | Back> {
  const chosen = [...existing]

  while (true) {
    const remaining = MASDAR_PATTERNS.filter((m) => !chosen.includes(m))
    if (chosen.length > 0) console.log(`  Selected so far: ${chosen.join(', ')}`)

    const pick = await select<MasdarPatternChoice | null | Back>({
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

async function pickLexicalizedMasdars(existing: readonly string[] = []): Promise<string[] | Back> {
  const chosen = [...existing]

  while (true) {
    if (chosen.length > 0) console.log(`  Selected so far: ${chosen.join(', ')}`)
    const value = await inputWithBack('Add a lexicalized masdar (Arabic or transliterated, blank when done):')
    if (value === BACK) return BACK
    const normalized = normalizeArabic(value)
    if (!normalized) break
    if (chosen.includes(normalized)) {
      console.log('  Already added.')
      continue
    }
    chosen.push(normalized)
  }

  return chosen
}

async function runSingle(roots: RootEntry[], locales: LocaleMap): Promise<boolean> {
  const state: WizardState = {
    rootStr: '',
    existing: [],
    editEntry: null,
    form: null,
    vowels: undefined,
    passiveVoice: undefined,
    masdars: undefined,
    lexicalizedMasdars: undefined,
    noPassiveParticiple: undefined,
    isNewRoot: false,
    rootGloss: { en: '', it: '', pt: '' },
    vid: '',
    verbTranslations: { en: '', it: '', pt: '' },
  }

  let step = 0

  while (step < 11) {
    if (step === 0) {
      const rootStr = (
        await input({ message: 'Enter verb root (Arabic or transliterated):', default: state.rootStr })
      ).trim()
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
      state.lexicalizedMasdars = undefined
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
          if (e.lexicalizedMasdars?.length) parts.push(`lexicalizedMasdars: [${e.lexicalizedMasdars.join(', ')}]`)
          if (e.passiveVoice) parts.push(`passive: ${e.passiveVoice}`)
          if (e.noPassiveParticiple) parts.push('no passive participle')
          console.log(`  ${e.root}-${e.form}: ${parts.join(', ')}`)
        }
        console.log()
      }

      const form = await select<VerbForm | Back>({
        message: 'Select form:',
        choices: [
          { name: '← Back', value: BACK },
          ...([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const).map((n) => {
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
      state.lexicalizedMasdars = undefined
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

      const vowels = await select<FormIPattern | Back>({
        message: 'Select vowel pattern:',
        choices: [{ name: '← Back', value: BACK }, ...FORM_I_PATTERNS.map((v) => ({ name: v, value: v }))],
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

      const passiveVoice = await select<PassiveVoiceSelection | Back>({
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
      console.log()
      const lexicalizedMasdars = await pickLexicalizedMasdars(state.editEntry?.lexicalizedMasdars ?? [])
      if (lexicalizedMasdars === BACK) {
        step -= 1
        continue
      }

      state.lexicalizedMasdars = lexicalizedMasdars.length === 0 ? undefined : lexicalizedMasdars
      step += 1
      continue
    }

    if (step === 6) {
      if (state.form === 9) {
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

    if (step === 7) {
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

    if (step === 8) {
      console.log()
      const enVerb = await inputWithBack(
        'Verb translation (EN, e.g. "to write"):',
        locales.en.verbs[state.vid] ?? state.verbTranslations.en,
      )
      if (enVerb === BACK) {
        step -= 1
        continue
      }
      state.verbTranslations.en = enVerb

      const itVerb = await inputWithBack(
        'Verb translation (IT, e.g. "scrivere"):',
        locales.it.verbs[state.vid] ?? state.verbTranslations.it,
      )
      if (itVerb === BACK) {
        continue
      }
      state.verbTranslations.it = itVerb

      const ptVerb = await inputWithBack(
        'Verb translation (PT, e.g. "escrever"):',
        locales.pt.verbs[state.vid] ?? state.verbTranslations.pt,
      )
      if (ptVerb === BACK) {
        continue
      }
      state.verbTranslations.pt = ptVerb

      step += 1
      continue
    }

    if (step === 9) {
      const entry: RootEntry = { root: state.rootStr, form: state.form as VerbForm }
      if (state.vowels != null) entry.vowels = state.vowels
      if (state.masdars != null) entry.masdars = state.masdars

      const lexicalizedMasdars = [...new Set((state.lexicalizedMasdars ?? []).map((value) => normalizeArabic(value)))]
      if (lexicalizedMasdars.length > 0) entry.lexicalizedMasdars = lexicalizedMasdars

      if (state.passiveVoice != null) entry.passiveVoice = state.passiveVoice
      if (state.noPassiveParticiple) entry.noPassiveParticiple = true
      if (state.editEntry?.contractedImperative) entry.contractedImperative = true

      console.log('\n─── Summary ───────────────────────────────')
      console.log('roots.json entry:')
      console.log(JSON.stringify(entry, null, 2))
      if (state.isNewRoot) {
        console.log('\nNew root gloss:')
        for (const lang of LANGUAGE_CODES) console.log(`  ${lang}: ${state.rootGloss[lang]}`)
      }
      console.log('\nVerb translations:')
      for (const lang of LANGUAGE_CODES) console.log(`  ${state.vid} (${lang}): ${state.verbTranslations[lang]}`)
      console.log('────────────────────────────────────────────\n')

      const ok = await confirmWithBack('Write changes?', true)
      if (ok === BACK) {
        step -= 1
        continue
      }
      if (!ok) return false

      const editEntry = state.editEntry
      const newRoots = editEntry
        ? roots.map((r) => (r.root === state.rootStr && r.form === editEntry.form ? entry : r))
        : [...roots, entry]
      writeRoots(newRoots)
      roots.splice(0, roots.length, ...newRoots)

      for (const lang of LANGUAGE_CODES) {
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
  const locales: LocaleMap = {
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

run().catch((err: unknown) => {
  console.error(err)
  process.exit(1)
})
