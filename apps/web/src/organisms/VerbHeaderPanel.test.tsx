import { cleanup, render, screen } from '@testing-library/preact'
import { afterEach, describe, expect, test } from 'vitest'
import { getVerb, getVerbById } from '../../../../src/paradigms/verbs'
import { I18nProvider } from '../hooks/useI18n'
import { VerbHeaderPanel, type VerbHeaderPanelProps } from './VerbHeaderPanel'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

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
  test('marks prepositions that attach to their complement with an extension line', () => {
    localStorage.setItem('conjugator:diacriticsPreference', JSON.stringify('all'))
    renderVerbHeaderPanel({
      verb: {
        ...getVerb('كتب', 1),
        prepositions: ['bi', 'li', 'ka', 'mino'],
      },
    })
    expect(screen.getByText('بِـ، لِـ، كَـ، مِنْ')).toBeInTheDocument()
  })

  test('shows a comma-separated list in annotation order', () => {
    localStorage.setItem('conjugator:diacriticsPreference', JSON.stringify('all'))
    renderVerbHeaderPanel({
      verb: { ...getVerb('كتب', 1), prepositions: ['Eano', 'fiy'] },
    })
    const prepositions = screen.getByText('عَنْ، فِي')
    expect(prepositions).toHaveAttribute('lang', 'ar')
    expect(prepositions).toHaveAttribute('dir', 'rtl')
  })

  test('uses the saved diacritics preference for prepositions', () => {
    localStorage.setItem('conjugator:diacriticsPreference', JSON.stringify('none'))
    renderVerbHeaderPanel({
      verb: { ...getVerb('كتب', 1), prepositions: ['Eano', 'fiy'] },
    })
    expect(screen.getByText('عن، في')).toBeInTheDocument()
  })

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
    renderVerbHeaderPanel({ verb: getVerb('كتب', 9) })
    expect(document.querySelector('h2')?.textContent).toContain('*')
  })

  test('shows a generated-form notice in place of the translation for a synthetic verb', () => {
    renderVerbHeaderPanel({ verb: getVerb('فعل', 1, 'a-u') })
    expect(screen.getByText('generated form not attested in the lexicon')).toBeInTheDocument()
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
    renderVerbHeaderPanel({ verb: { ...getVerbById('ktb-1')!, valency: [3, 2] } })
    expect(screen.getByText('Transitive · Ditransitive')).toBeInTheDocument()
  })

  test('hides the valency indicator when unset', () => {
    renderVerbHeaderPanel({ verb: getVerbById('sfr-1')! })
    expect(screen.queryByText('Intransitive')).not.toBeInTheDocument()
  })
})
