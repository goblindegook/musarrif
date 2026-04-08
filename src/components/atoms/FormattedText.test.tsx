import { cleanup, render, screen } from '@testing-library/preact'
import { afterEach, describe, expect, test } from 'vitest'
import { FormattedText } from './FormattedText'

afterEach(() => {
  cleanup()
})

describe('FormattedText', () => {
  test('renders allowed inline html tags', () => {
    render(<FormattedText text={'Use <strong>bold</strong> and <em>emphasis</em><br>now'} />)

    expect(screen.getByText('bold').tagName).toBe('STRONG')
    expect(screen.getByText('emphasis').tagName).toBe('EM')
    expect(document.querySelectorAll('br')).toHaveLength(1)
  })

  test('sanitizes disallowed tags and unsafe attributes', () => {
    render(
      <FormattedText
        text={
          'Read <span>carefully</span> <a href="javascript:alert(1)" data-x="1">unsafe</a> ' +
          '<a href="/docs" data-x="2">safe</a>'
        }
      />,
    )

    const unsafeLink = screen.getByText('unsafe').closest('a')
    const safeLink = screen.getByText('safe').closest('a')
    const text = screen.getByText('unsafe').closest('p')?.textContent?.replace(/\s+/g, ' ').trim()

    expect(text).toBe('Read carefully unsafe safe')
    expect(unsafeLink?.getAttribute('href')).toBeNull()
    expect(safeLink?.getAttribute('href')).toBe('/docs')
    expect(safeLink?.getAttribute('data-x')).toBeNull()
  })
})
