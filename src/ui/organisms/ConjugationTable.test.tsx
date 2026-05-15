import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { getVerbById } from '../../paradigms/verbs'
import { I18nProvider } from '../hooks/useI18n'
import { ConjugationTable, type ConjugationTableProps } from './ConjugationTable'

function renderTable(overrides: Partial<ConjugationTableProps>) {
  const props = {
    onMoodChange: vi.fn(),
    onTenseChange: vi.fn(),
    onVoiceChange: vi.fn(),
    verb: getVerbById('ktb-1')!,
    voice: 'active' as const,
    tense: 'past' as const,
    ...overrides,
  }
  render(
    <I18nProvider>
      <ConjugationTable {...(props as ConjugationTableProps)} />
    </I18nProvider>,
  )
  return props
}

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('tense tab keyboard navigation', () => {
  it('ArrowRight advances to the next tense', () => {
    const { onTenseChange } = renderTable({ tense: 'past' })
    fireEvent.keyDown(screen.getByText('Past', { selector: 'button' }), { key: 'ArrowRight' })
    expect(onTenseChange).toHaveBeenCalledWith('present')
  })

  it('ArrowRight moves focus to the next tab', () => {
    renderTable({ tense: 'past' })
    fireEvent.keyDown(screen.getByText('Past', { selector: 'button' }), { key: 'ArrowRight' })
    expect(document.activeElement).toBe(screen.getByText('Present', { selector: 'button' }))
  })

  it('ArrowDown advances to the next tense', () => {
    const { onTenseChange } = renderTable({ tense: 'past' })
    fireEvent.keyDown(screen.getByText('Past', { selector: 'button' }), { key: 'ArrowDown' })
    expect(onTenseChange).toHaveBeenCalledWith('present')
  })

  it('ArrowLeft retreats to the previous tense', () => {
    const { onTenseChange } = renderTable({ tense: 'present', mood: 'indicative' })
    fireEvent.keyDown(screen.getByText('Present', { selector: 'button' }), { key: 'ArrowLeft' })
    expect(onTenseChange).toHaveBeenCalledWith('past')
  })

  it('ArrowRight wraps from last tense to first', () => {
    const { onTenseChange } = renderTable({ tense: 'imperative' })
    fireEvent.keyDown(screen.getByText('Imperative', { selector: 'button' }), { key: 'ArrowRight' })
    expect(onTenseChange).toHaveBeenCalledWith('past')
  })

  it('ArrowLeft wraps from first tense to last', () => {
    const { onTenseChange } = renderTable({ tense: 'past' })
    fireEvent.keyDown(screen.getByText('Past', { selector: 'button' }), { key: 'ArrowLeft' })
    expect(onTenseChange).toHaveBeenCalledWith('imperative')
  })

  it('Home moves to the first tense', () => {
    const { onTenseChange } = renderTable({ tense: 'future' })
    fireEvent.keyDown(screen.getByText('Future', { selector: 'button' }), { key: 'Home' })
    expect(onTenseChange).toHaveBeenCalledWith('past')
  })

  it('End moves to the last tense', () => {
    const { onTenseChange } = renderTable({ tense: 'past' })
    fireEvent.keyDown(screen.getByText('Past', { selector: 'button' }), { key: 'End' })
    expect(onTenseChange).toHaveBeenCalledWith('imperative')
  })

  it('unrelated keys do not trigger navigation', () => {
    const { onTenseChange } = renderTable({ tense: 'past' })
    fireEvent.keyDown(screen.getByText('Past', { selector: 'button' }), { key: 'Enter' })
    expect(onTenseChange).not.toHaveBeenCalled()
  })
})

describe('voice tab keyboard navigation', () => {
  it('ArrowRight moves from active to passive', () => {
    const { onVoiceChange } = renderTable({ voice: 'active', tense: 'past' })
    fireEvent.keyDown(screen.getByText('Active', { selector: 'button' }), { key: 'ArrowRight' })
    expect(onVoiceChange).toHaveBeenCalledWith('passive')
  })

  it('ArrowRight wraps from passive back to active', () => {
    const { onVoiceChange } = renderTable({ voice: 'passive', tense: 'past' })
    fireEvent.keyDown(screen.getByText('Passive', { selector: 'button' }), { key: 'ArrowRight' })
    expect(onVoiceChange).toHaveBeenCalledWith('active')
  })

  it('ArrowLeft wraps from active to passive', () => {
    const { onVoiceChange } = renderTable({ voice: 'active', tense: 'past' })
    fireEvent.keyDown(screen.getByText('Active', { selector: 'button' }), { key: 'ArrowLeft' })
    expect(onVoiceChange).toHaveBeenCalledWith('passive')
  })
})

describe('mood tab keyboard navigation', () => {
  it('ArrowRight advances from indicative to subjunctive', () => {
    const { onMoodChange } = renderTable({ tense: 'present', mood: 'indicative' })
    fireEvent.keyDown(screen.getByText('Indicative', { selector: 'button' }), { key: 'ArrowRight' })
    expect(onMoodChange).toHaveBeenCalledWith('subjunctive')
  })

  it('ArrowRight wraps from jussive to indicative', () => {
    const { onMoodChange } = renderTable({ tense: 'present', mood: 'jussive' })
    fireEvent.keyDown(screen.getByText('Jussive', { selector: 'button' }), { key: 'ArrowRight' })
    expect(onMoodChange).toHaveBeenCalledWith('indicative')
  })

  it('ArrowLeft wraps from indicative to jussive', () => {
    const { onMoodChange } = renderTable({ tense: 'present', mood: 'indicative' })
    fireEvent.keyDown(screen.getByText('Indicative', { selector: 'button' }), { key: 'ArrowLeft' })
    expect(onMoodChange).toHaveBeenCalledWith('jussive')
  })
})
