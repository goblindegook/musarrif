import { cleanup, render, screen, waitFor } from '@testing-library/preact'
import { afterEach, describe, expect, test } from 'vitest'
import { I18nProvider, useI18n } from './useI18n'

function TranslationProbe() {
  const { t } = useI18n()

  return (
    <>
      <div data-testid="title">{t('title')}</div>
      <div data-testid="prompt">{t('exercise.prompt.conjugation', { tense: 'X', pronoun: 'Y' })}</div>
    </>
  )
}

describe('i18n', () => {
  afterEach(() => {
    cleanup()
    localStorage.clear()
  })

  test('english strings are available on the initial render', () => {
    render(
      <I18nProvider>
        <TranslationProbe />
      </I18nProvider>,
    )

    expect(screen.getByTestId('title').textContent).toBe('Muṣarrif')
  })

  test('t() applies diacritics preference before returning translated strings', async () => {
    localStorage.setItem('conjugator:language', JSON.stringify('ar'))
    localStorage.setItem('conjugator:diacriticsPreference', JSON.stringify('none'))

    render(
      <I18nProvider>
        <TranslationProbe />
      </I18nProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('prompt').textContent).toBe(
        'صرف هذا ٱلفعل في <strong>X</strong> للضمير <strong>Y</strong>.',
      )
    })
  })
})
