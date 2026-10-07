import { useLocales } from 'expo-localization'

export type Language = 'en' | 'it' | 'pt' | 'ar'

const LANGUAGES: readonly Language[] = ['en', 'it', 'pt', 'ar']

export function useSystemLanguage(): Language {
  const locales = useLocales()
  const language = locales.find(({ languageCode }) =>
    LANGUAGES.some((candidate) => candidate === languageCode),
  )?.languageCode
  return language === 'it' || language === 'pt' || language === 'ar' ? language : 'en'
}

type Dictionary = Record<string, string>
type VerbDictionary = { verbs?: Dictionary; roots?: Dictionary }
type Copy = (key: string, values?: Record<string, string>) => string
type LanguageCopy = {
  t: Copy
  translate: (key: string) => string | undefined
  translateRoot: (key: string) => string | undefined
}

// Metro bundles every locale file, but a lazy require only parses the ones in use.
// Strings the app owns live beside this file; the shared web strings and verb glosses come from src/ui/locales.
function loadAppStrings(language: Language): Dictionary {
  switch (language) {
    case 'it':
      return require('./it.json')
    case 'pt':
      return require('./pt.json')
    case 'ar':
      return require('./ar.json')
    case 'en':
      return require('./en.json')
  }
}

function loadSharedStrings(language: Language): Dictionary {
  switch (language) {
    case 'it':
      return require('../../../../src/ui/locales/it.strings.json')
    case 'pt':
      return require('../../../../src/ui/locales/pt.strings.json')
    case 'ar':
      return require('../../../../src/ui/locales/ar.strings.json')
    case 'en':
      return require('../../../../src/ui/locales/en.strings.json')
  }
}

function loadVerbs(language: Language): VerbDictionary {
  switch (language) {
    case 'it':
      return require('../../../../src/ui/locales/it.verbs.json')
    case 'pt':
      return require('../../../../src/ui/locales/pt.verbs.json')
    case 'ar':
      return require('../../../../src/ui/locales/ar.verbs.json')
    case 'en':
      return require('../../../../src/ui/locales/en.verbs.json')
  }
}

const copyByLanguage = new Map<Language, LanguageCopy>()

// Stable identities: consumers list these translators in memo and callback dependencies.
export function getCopy(language: Language): LanguageCopy {
  const cached = copyByLanguage.get(language)
  if (cached) return cached
  const copy = createCopy(language)
  copyByLanguage.set(language, copy)
  return copy
}

function createCopy(language: Language): LanguageCopy {
  const app = loadAppStrings(language)
  const shared = loadSharedStrings(language)
  const english = { app: loadAppStrings('en'), shared: loadSharedStrings('en') }
  const verbs = loadVerbs(language)
  const t: Copy = (key, values = {}) => {
    const template = app[key] ?? shared[key] ?? english.app[key] ?? english.shared[key] ?? key
    return template.replace(/\{([^}]+)\}/gu, (_match, name: string) => values[name] ?? `{${name}}`)
  }
  return { t, translate: (key) => verbs.verbs?.[key], translateRoot: (key) => verbs.roots?.[key] }
}
