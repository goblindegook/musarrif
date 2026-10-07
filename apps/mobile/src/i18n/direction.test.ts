import { getLocaleDirection, getTextDirection } from './direction'

describe('text direction', () => {
  test('uses the first strong script for mixed Arabic and Latin text', () => {
    expect(getTextDirection('كتاب Muṣarrif', 'en')).toBe('rtl')
    expect(getTextDirection('Muṣarrif كتاب', 'ar')).toBe('ltr')
  })

  test('uses the selected interface locale when text has no strong script', () => {
    expect(getLocaleDirection('ar')).toBe('rtl')
    expect(getLocaleDirection('ar-EG')).toBe('rtl')
    expect(getLocaleDirection('en')).toBe('ltr')
    expect(getTextDirection('123 · 45', 'ar')).toBe('rtl')
  })
})
