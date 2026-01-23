const TRANSLITERATION_MAP: Record<string, string> = {
  آ: '|',
  أ: '>',
  إ: '<',
  ٱ: '{',
  ا: 'A',
  ب: 'b',
  ت: 't',
  ث: 'v',
  ج: 'j',
  ح: 'H',
  خ: 'x',
  د: 'd',
  ذ: '*',
  ر: 'r',
  ز: 'z',
  س: 's',
  ش: '$',
  ص: 'S',
  ض: 'D',
  ط: 'T',
  ظ: 'Z',
  ع: 'E',
  غ: 'g',
  ف: 'f',
  ق: 'q',
  ك: 'k',
  ل: 'l',
  م: 'm',
  ن: 'n',
  ه: 'h',
  و: 'w',
  ي: 'y',
  ة: 'p',
  ى: 'Y',
  ء: "'",
  ؤ: '&',
  ئ: '}',
  ـ: '_',
  'ً': 'F',
  'ٌ': 'N',
  'ٍ': 'K',
  'َ': 'a',
  'ُ': 'u',
  'ِ': 'i',
  'ّ': '~',
  'ْ': 'o',
  'ٰ': '`',
}

const transliterateString = (value: string): string =>
  Array.from(value)
    .map((char) => TRANSLITERATION_MAP[char] ?? char)
    .join('')

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  value != null && typeof value === 'object' && value.constructor === Object

export const transliterateValue = (value: unknown): unknown => {
  if (typeof value === 'string') return transliterateString(value)
  if (Array.isArray(value)) return value.map(transliterateValue)
  if (value instanceof Map)
    return new Map(
      Array.from(value.entries()).map(([key, entry]) => [transliterateValue(key), transliterateValue(entry)]),
    )
  if (value instanceof Set) return new Set(Array.from(value.values()).map(transliterateValue))
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [transliterateString(key), transliterateValue(entry)]),
    )
  }
  return value
}
