const FROM_ARABIC: Record<string, string> = {
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
}

const TO_ARABIC = Object.fromEntries(
  Object.entries(FROM_ARABIC).map(([arabic, transliterated]) => [transliterated, arabic]),
)

export function transliterate(text: string): string {
  return Array.from(text)
    .map((char) => FROM_ARABIC[char] ?? char)
    .join('')
}

export function detransliterate(buckwalter: string): string {
  return Array.from(buckwalter)
    .map((char) => TO_ARABIC[char] ?? char)
    .join('')
}
