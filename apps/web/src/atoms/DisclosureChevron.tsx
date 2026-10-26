import { styled } from 'goober'
import type { HTMLAttributes } from 'preact'
import { ChevronIcon } from '../icons/ChevronIcon'

interface DisclosureChevronProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Pass this when the caller tracks open/closed itself. Omit it inside a native
   *  `<details>`, where the `details[open]` rule below reacts to the browser's own state. */
  open?: boolean
}

export function DisclosureChevron({ open, ...props }: DisclosureChevronProps) {
  return (
    <ChevronWrapper data-open={open} {...props}>
      <ChevronIcon />
    </ChevronWrapper>
  )
}

const ChevronWrapper = styled('span')`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
  transform: rotate(90deg);
  user-select: none;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  &[data-open='true'],
  details[open] & {
    transform: rotate(-90deg);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
