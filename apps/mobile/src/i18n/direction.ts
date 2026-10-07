type TextDirection = 'ltr' | 'rtl'

const RTL_LOCALES = new Set(['ar', 'fa', 'he', 'ps', 'sd', 'ug', 'ur', 'yi'])
const ARABIC_LETTER = /[\u0621-\u063a\u0641-\u064a\u066e-\u06d3\u06fa-\u06fc\u0750-\u077f\u08a0-\u08c9]/u
const LATIN_LETTER = /\p{Script=Latin}/u

export function getLocaleDirection(locale: string): TextDirection {
  const language = locale.trim().toLowerCase().split(/[-_]/u)[0]
  return RTL_LOCALES.has(language) ? 'rtl' : 'ltr'
}

export function getTextDirection(text: string, locale: string): TextDirection {
  for (const character of text) {
    if (ARABIC_LETTER.test(character)) return 'rtl'
    if (LATIN_LETTER.test(character)) return 'ltr'
  }
  return getLocaleDirection(locale)
}
