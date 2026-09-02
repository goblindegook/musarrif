import { cleanup, screen } from '@testing-library/preact'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import type { ExplanationSentence } from '../../paradigms/explanation'
import { renderWithProviders } from '../../test/fixtures'
import { ExplanationText } from './ExplanationText'

beforeEach(() => cleanup())
afterEach(() => cleanup())

describe('ExplanationText', () => {
  test('renders each paragraph as its own block', () => {
    const paragraphs: ExplanationSentence[][] = [
      [{ text: 'All consonants are stable.', kind: 'radical' }],
      [{ text: 'Use the active past.', kind: 'measure' }],
    ]
    renderWithProviders(<ExplanationText paragraphs={paragraphs} showMorphemeMarkers />)

    expect(screen.getByText('All consonants are stable.').closest('p')).not.toBe(
      screen.getByText('Use the active past.').closest('p'),
    )
  })

  test('marks the start of each kind run with that kind colour', () => {
    const paragraphs: ExplanationSentence[][] = [
      [
        { text: 'Root is sound.', kind: 'radical' },
        { text: 'Form I applies.', kind: 'measure' },
      ],
    ]
    renderWithProviders(<ExplanationText paragraphs={paragraphs} showMorphemeMarkers />)

    const markers = screen.getAllByText('●', { exact: false })
    expect(markers.map((m) => m.style.color)).toEqual(['var(--color-insight-root)', 'var(--color-insight-form)'])
  })

  test('marks a run once, not once per sentence', () => {
    const paragraphs: ExplanationSentence[][] = [
      [
        { text: 'Root is sound.', kind: 'radical' },
        { text: 'Radicals are stable.', kind: 'radical' },
        { text: 'Form I applies.', kind: 'measure' },
      ],
    ]
    renderWithProviders(<ExplanationText paragraphs={paragraphs} showMorphemeMarkers />)

    expect(screen.getAllByText('●', { exact: false })).toHaveLength(2)
  })

  test('omits the morpheme markers when they have no breakdown to refer to', () => {
    const paragraphs: ExplanationSentence[][] = [
      [
        { text: 'Root is sound.', kind: 'radical' },
        { text: 'Form I applies.', kind: 'measure' },
      ],
    ]
    renderWithProviders(<ExplanationText paragraphs={paragraphs} />)

    expect(screen.queryAllByText('●', { exact: false })).toHaveLength(0)
    expect(document.body).toHaveTextContent('Root is sound.')
    expect(document.body).toHaveTextContent('Form I applies.')
  })

  test('renders every sentence text', () => {
    const paragraphs: ExplanationSentence[][] = [
      [
        { text: 'Root is sound.', kind: 'radical' },
        { text: 'Form I applies.', kind: 'measure' },
      ],
    ]
    renderWithProviders(<ExplanationText paragraphs={paragraphs} showMorphemeMarkers />)

    expect(document.body).toHaveTextContent('Root is sound.')
    expect(document.body).toHaveTextContent('Form I applies.')
  })
})
