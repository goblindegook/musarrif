import { fireEvent, render, screen } from '@testing-library/preact'
import { describe, expect, test } from 'vitest'
import { Panel } from './Panel'

describe('Panel', () => {
  test('renders children by default', () => {
    render(
      <Panel title="Test">
        <p>Content</p>
      </Panel>,
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  test('does not render arrow indicator when not collapsible', () => {
    render(
      <Panel title="Test">
        <p>Content</p>
      </Panel>,
    )
    expect(document.querySelector('button')).not.toBeInTheDocument()
  })

  describe('collapsible', () => {
    test('renders arrow indicator in title when collapsible', () => {
      render(
        <Panel title="Test" collapsible>
          <p>Content</p>
        </Panel>,
      )
      expect(screen.getByText(/test/i).closest('button')).toBeInTheDocument()
    })

    test('children are visible when collapsible but not defaultCollapsed', () => {
      render(
        <Panel title="Test" collapsible>
          <p>Content</p>
        </Panel>,
      )
      expect(screen.getByText('Content')).toBeVisible()
    })

    test('children are hidden when defaultCollapsed', () => {
      render(
        <Panel title="Test" collapsible defaultCollapsed>
          <p>Content</p>
        </Panel>,
      )
      expect(screen.queryByText('Content')).not.toBeVisible()
    })

    test('clicking title expands a collapsed panel', () => {
      render(
        <Panel title="Test" collapsible defaultCollapsed>
          <p>Content</p>
        </Panel>,
      )
      fireEvent.click(screen.getByText(/test/i).closest('button')!)
      expect(screen.getByText('Content')).toBeVisible()
    })

    test('clicking title collapses an expanded panel', () => {
      render(
        <Panel title="Test" collapsible>
          <p>Content</p>
        </Panel>,
      )
      fireEvent.click(screen.getByText(/test/i).closest('button')!)
      expect(screen.queryByText('Content')).not.toBeVisible()
    })

    test('shows collapsed hint next to chevron when collapsed', () => {
      render(
        <Panel title="Test" collapsible defaultCollapsed hint="Summary hint">
          <p>Content</p>
        </Panel>,
      )

      expect(screen.getByText('Summary hint')).toBeInTheDocument()
    })

    test('hides collapsed hint when expanded', () => {
      render(
        <Panel title="Test" collapsible defaultCollapsed hint="Summary hint">
          <p>Content</p>
        </Panel>,
      )

      fireEvent.click(screen.getByText(/test/i).closest('button')!)
      expect(screen.queryByText('Summary hint')).not.toBeInTheDocument()
    })
  })
})
