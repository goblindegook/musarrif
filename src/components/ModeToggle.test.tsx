import { cleanup, fireEvent, render, screen } from '@testing-library/preact'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ModeToggle } from './ModeToggle'

const labels = ['Conjugate', 'Exercise'] as const
const icons = [<span>icon-a</span>, <span>icon-b</span>]

describe('ModeToggle', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders a button with the first label text', () => {
    render(<ModeToggle activeMode={0} labels={labels} icons={icons} onClick={vi.fn()} ariaLabel="Mode" />)
    expect(screen.getByText('Conjugate')).toBeInTheDocument()
  })

  it('renders a button with the second label text', () => {
    render(<ModeToggle activeMode={0} labels={labels} icons={icons} onClick={vi.fn()} />)
    expect(screen.getByText('Exercise')).toBeInTheDocument()
  })

  it('first button has aria-pressed="true" when activeMode is 0', () => {
    render(<ModeToggle activeMode={0} labels={labels} icons={icons} onClick={vi.fn()} />)
    expect(screen.getByText('Conjugate').closest('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('second button has aria-pressed="false" when activeMode is 0', () => {
    render(<ModeToggle activeMode={0} labels={labels} icons={icons} onClick={vi.fn()} />)
    expect(screen.getByText('Exercise').closest('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('second button has aria-pressed="true" when activeMode is 1', () => {
    render(<ModeToggle activeMode={1} labels={labels} icons={icons} onClick={vi.fn()} />)
    expect(screen.getByText('Exercise').closest('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('first button has aria-pressed="false" when activeMode is 1', () => {
    render(<ModeToggle activeMode={1} labels={labels} icons={icons} onClick={vi.fn()} />)
    expect(screen.getByText('Conjugate').closest('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('clicking the second button calls onClick with 1 when activeMode is 0', () => {
    const onClick = vi.fn()
    render(<ModeToggle activeMode={0} labels={labels} icons={icons} onClick={onClick} />)
    fireEvent.click(screen.getByText('Exercise').closest('button')!)
    expect(onClick).toHaveBeenCalledWith(1)
  })

  it('clicking the first button calls onClick with 0 when activeMode is 1', () => {
    const onClick = vi.fn()
    render(<ModeToggle activeMode={1} labels={labels} icons={icons} onClick={onClick} />)
    fireEvent.click(screen.getByText('Conjugate').closest('button')!)
    expect(onClick).toHaveBeenCalledWith(0)
  })

  it('clicking the active first button calls onClick with 0 (no guard)', () => {
    const onClick = vi.fn()
    render(<ModeToggle activeMode={0} labels={labels} icons={icons} onClick={onClick} />)
    fireEvent.click(screen.getByText('Conjugate').closest('button')!)
    expect(onClick).toHaveBeenCalledWith(0)
  })

  it('clicking the active second button calls onClick with 1 (no guard)', () => {
    const onClick = vi.fn()
    render(<ModeToggle activeMode={1} labels={labels} icons={icons} onClick={onClick} />)
    fireEvent.click(screen.getByText('Exercise').closest('button')!)
    expect(onClick).toHaveBeenCalledWith(1)
  })
})
