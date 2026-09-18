export interface LocaleVerbFile {
  verbs: Record<string, string>
  roots: Record<string, string>
}

export interface MissingTranslations {
  verbs: Array<{ id: string; missingIn: string[] }>
  roots: Array<{ rootId: string; missingIn: string[] }>
}

const VERB_LOCALES = ['en', 'it', 'pt'] as const
const ROOT_LOCALES = ['en', 'it', 'pt', 'ar'] as const

export function findMissingTranslations(
  verbs: readonly { id: string; rootId: string }[],
  locales: {
    en: LocaleVerbFile
    it: LocaleVerbFile
    pt: LocaleVerbFile
    ar: { roots: Record<string, string> }
  },
): MissingTranslations {
  const missingVerbs = verbs
    .map((verb) => ({
      id: verb.id,
      missingIn: VERB_LOCALES.filter((locale) => !(verb.id in locales[locale].verbs)),
    }))
    .filter((entry) => entry.missingIn.length > 0)

  const rootIds = [...new Set(verbs.map((verb) => verb.rootId))]
  const missingRoots = rootIds
    .map((rootId) => ({
      rootId,
      missingIn: ROOT_LOCALES.filter((locale) => !(rootId in locales[locale].roots)),
    }))
    .filter((entry) => entry.missingIn.length > 0)

  return { verbs: missingVerbs, roots: missingRoots }
}
