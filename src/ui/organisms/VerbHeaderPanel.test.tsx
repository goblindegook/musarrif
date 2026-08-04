import { cleanup, render, screen } from '@testing-library/preact'
import { describe, expect, test } from 'vitest'
import { getVerbById, synthesizeVerb } from '../../paradigms/verbs'
import { I18nProvider } from '../hooks/useI18n'
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
  test('renders verb, translation, actions, and content', async () => {
    renderVerbHeaderPanel({
      verb: getVerbById('ktb-1')!,
      actions: <button type="button">Share</button>,
      children: <p>Details</p>,
    })

    expect(screen.getByText('كَتَبَ')).toBeInTheDocument()
    const subtitle = await screen.findByText('to write')
    expect(subtitle).toHaveAttribute('dir', 'ltr')
    expect(subtitle).toHaveAttribute('lang', 'en')
    expect(screen.getByText('Share')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  test('does not show asterisk for corpus verb', () => {
    renderVerbHeaderPanel({ verb: getVerbById('ktb-1')! })
    expect(document.querySelector('h2')?.textContent).not.toContain('*')
  })

  test('prepends asterisk to verb for synthetic verb', () => {
    renderVerbHeaderPanel({ verb: synthesizeVerb('كتب', 9) })
    expect(document.querySelector('h2')?.textContent).toContain('*')
  })

  test('hides translation for synthetic verb', () => {
    renderVerbHeaderPanel({ verb: synthesizeVerb('فعل', 1, 'a-u') })
    expect(screen.queryByText('to do')).not.toBeInTheDocument()
  })

  test('shows a single valency value', () => {
    renderVerbHeaderPanel({ verb: getVerbById('ksr-1')! })
    expect(screen.getByText('Transitive')).toBeInTheDocument()
  })

  test('shows a labile verb valency as sorted, joined values', () => {
    renderVerbHeaderPanel({ verb: getVerbById("'kl-1")! })
    expect(screen.getByText('Intransitive · Transitive')).toBeInTheDocument()
  })

  test('shows both readings for a verb labile between transitive and ditransitive', () => {
    renderVerbHeaderPanel({ verb: getVerbById('ktb-1')! })
    expect(screen.getByText('Transitive · Ditransitive')).toBeInTheDocument()
  })

  test('hides the valency indicator when unset', () => {
    renderVerbHeaderPanel({ verb: getVerbById('sfr-1')! })
    expect(screen.queryByText('Intransitive')).not.toBeInTheDocument()
  })
})
