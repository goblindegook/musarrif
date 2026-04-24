import { render, screen } from '@testing-library/preact'
import { describe, expect, test } from 'vitest'
import { VerbHeaderPanel } from './VerbHeaderPanel'

describe('VerbHeaderPanel', () => {
  test('renders title, subtitle, actions, and content', () => {
    render(
      <VerbHeaderPanel
        title="كَتَبَ"
        subtitle="to write"
        subtitleDir="ltr"
        subtitleLang="en"
        actions={<button type="button">Share</button>}
      >
        <p>Details</p>
      </VerbHeaderPanel>,
    )

    expect(screen.getByText('كَتَبَ')).toBeInTheDocument()
    expect(screen.getByText('to write')).toBeInTheDocument()
    expect(screen.getByText('Share')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  test('does not show asterisk for corpus verb', () => {
    render(<VerbHeaderPanel title="كَتَبَ" />)
    expect(screen.getByRole('heading', { level: 2 }).textContent).not.toContain('*')
  })

  test('prepends asterisk to title for synthetic verb', () => {
    render(<VerbHeaderPanel title="كَتَبَ" synthetic />)
    expect(screen.getByRole('heading', { level: 2 }).textContent).toContain('*')
  })

  test('applies subtitle language metadata', () => {
    render(<VerbHeaderPanel title="كَتَبَ" subtitle="to write" subtitleDir="ltr" subtitleLang="en" />)

    const subtitle = screen.getByText('to write')
    expect(subtitle).toHaveAttribute('dir', 'ltr')
    expect(subtitle).toHaveAttribute('lang', 'en')
  })
})
