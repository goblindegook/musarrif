import { cleanup, render, screen, waitFor } from '@testing-library/preact'
import { afterEach, describe, expect, test } from 'vitest'
import { I18nProvider, useI18n } from './useI18n'

function TranslationProbe() {
  const { t } = useI18n()

  return (
    <div data-testid="translation-output">
      {t('exercise.prompt.conjugation', {
        tense: 'X',
        pronoun: 'Y',
      })}
    </div>
  )
}

describe('i18n', () => {
  afterEach(() => {
    cleanup()
    window.localStorage.clear()
  })

  test('t() applies diacritics preference before returning translated strings', async () => {
    window.localStorage.setItem('conjugator:language', JSON.stringify('ar'))
    window.localStorage.setItem('conjugator:diacriticsPreference', JSON.stringify('none'))

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
