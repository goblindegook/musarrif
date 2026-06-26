import { cleanup, render, screen, waitFor } from '@testing-library/preact'
import { afterEach, describe, expect, test } from 'vitest'
import { I18nProvider, useI18n } from './useI18n'

function TranslationProbe({ translationKey = 'exercise.prompt.conjugation' }: { translationKey?: string }) {
  const { t } = useI18n()

  return (
    <div data-testid="translation-output">
      {t(translationKey, {
        tense: 'X',
        pronoun: 'Y',
      })}
    </div>
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
        <TranslationProbe translationKey="title" />
      </I18nProvider>,
    )

    expect(screen.getByTestId('translation-output').textContent).toBe('Muṣarrif')
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
      expect(screen.getByTestId('translation-output').textContent).toBe(
        'صرف هذا الفعل في <strong>X</strong> للضمير <strong>Y</strong>.',
      )
    })
  })
})
