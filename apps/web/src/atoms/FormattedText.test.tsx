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
          'Read <em class="x">carefully</em> <a href="javascript:alert(1)" data-x="1">unsafe</a> ' +
          '<a href="/docs" data-x="2">safe</a>'
        }
      />,
    )

    const unsafe = screen.getByText('unsafe')
    const safe = screen.getByText('safe').closest('a')!

    expect(unsafe.closest('p')!.textContent).toBe('Read carefully unsafe safe')
    expect(unsafe.closest('a')).not.toHaveAttribute('href')
    expect(safe).toHaveAttribute('href', '/docs')
    expect(safe).not.toHaveAttribute('data-x')
  })

  test('renders span with a lang attribute and strips other attributes from it', () => {
    render(<FormattedText text={'See <span lang="ar" data-x="1">كتب</span> above'} />)

    const span = screen.getByText('كتب')

    expect(span.tagName).toBe('SPAN')
    expect(span).toHaveAttribute('lang', 'ar')
    expect(span).not.toHaveAttribute('data-x')
  })

  test('renders as a span for inline usage', () => {
    render(<FormattedText as="span" text="inline text" />)

    expect(screen.getByText('inline text').tagName).toBe('SPAN')
  })
})
