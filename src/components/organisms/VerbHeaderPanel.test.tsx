import { cleanup, render, screen } from '@testing-library/preact'
import { describe, expect, test } from 'vitest'
import { I18nProvider } from '../../hooks/i18n'
import { getVerbById, synthesizeVerb } from '../../paradigms/verbs'
import { VerbHeaderPanel, type VerbHeaderPanelProps } from './VerbHeaderPanel'

const renderVerbHeaderPanel = ({ verb, actions, children }: VerbHeaderPanelProps) => {
  cleanup()
  window.history.replaceState({}, '', '/')
  render(
    <I18nProvider>
      <VerbHeaderPanel verb={verb} actions={actions}>
        {children}
      </VerbHeaderPanel>
    </I18nProvider>,
  )
}

describe('VerbHeaderPanel', () => {
  test('renders verb, translation, actions, and content', () => {
    renderVerbHeaderPanel({
      verb: getVerbById('ktb-1')!,
      actions: <button type="button">Share</button>,
      children: <p>Details</p>,
    })

    expect(screen.getByText('كَتَبَ')).toBeInTheDocument()
    const subtitle = screen.getByText('to write')
    expect(subtitle).toHaveAttribute('dir', 'ltr')
    expect(subtitle).toHaveAttribute('lang', 'en')
    expect(screen.getByText('Share')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  test('does not show asterisk for corpus verb', () => {
    renderVerbHeaderPanel({ verb: getVerbById('ktb-1')! })
    expect(screen.getByRole('heading', { level: 2 }).textContent).not.toContain('*')
  })

  test('prepends asterisk to verb for synthetic verb', () => {
    renderVerbHeaderPanel({ verb: synthesizeVerb('كتب', 9) })
    expect(screen.getByRole('heading', { level: 2 }).textContent).toContain('*')
  })

  test('hides translation for synthetic verb', () => {
    renderVerbHeaderPanel({ verb: synthesizeVerb('فعل', 1, 'fa3ala-yaf3ulu') })
    expect(screen.queryByText('to do')).not.toBeInTheDocument()
  })
})
